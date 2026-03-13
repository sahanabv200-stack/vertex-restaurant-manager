const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { getConnection, query } = require("../config/db");

const orderController = {
  list: asyncHandler(async (_req, res) => {
    const rows = await query(
      `SELECT o.*, c.full_name AS customer_name, rt.table_number
       FROM orders o
       LEFT JOIN customers c ON c.id = o.customer_id
       LEFT JOIN restaurant_tables rt ON rt.id = o.table_id
       ORDER BY o.id DESC`
    );
    res.json(new ApiResponse("Order list fetched", rows));
  }),

  getById: asyncHandler(async (req, res) => {
    const [order] = await query("SELECT * FROM orders WHERE id = ?", [req.params.id]);
    if (!order) throw new ApiError(404, "Order not found");

    const items = await query(
      `SELECT oi.*, mi.name AS menu_item_name
       FROM order_items oi
       INNER JOIN menu_items mi ON mi.id = oi.menu_item_id
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    res.json(new ApiResponse("Order fetched", { ...order, items }));
  }),

  create: asyncHandler(async (req, res) => {
    const {
      branch_id,
      customer_id,
      table_id,
      order_type = "dine_in",
      guest_count = 1,
      special_note,
      items = [],
    } = req.body;

    if (!branch_id) {
      throw new ApiError(400, "branch_id is required");
    }

    if (items.length === 0) {
      const orderNo = req.body.order_no || `ORD-${Date.now()}`;
      const subtotal = Number(req.body.subtotal || 0);
      const taxAmount = Number(req.body.tax_amount || 0);
      const discountAmount = Number(req.body.discount_amount || 0);
      const grandTotal = Number(req.body.grand_total || subtotal + taxAmount - discountAmount);

      const result = await query(
        `INSERT INTO orders
         (branch_id, customer_id, table_id, order_no, order_type, order_status, guest_count, special_note, subtotal, tax_amount, discount_amount, grand_total, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          branch_id,
          customer_id || null,
          table_id || null,
          orderNo,
          order_type,
          req.body.order_status || "pending",
          guest_count,
          special_note || null,
          subtotal,
          taxAmount,
          discountAmount,
          grandTotal,
          req.user.id,
        ]
      );

      const [created] = await query("SELECT * FROM orders WHERE id = ?", [result.insertId]);
      return res.status(201).json(new ApiResponse("Order created", created));
    }

    const connection = await getConnection();

    try {
      await connection.beginTransaction();

      const orderNo = `ORD-${Date.now()}`;
      let subtotal = 0;
      let taxAmount = 0;

      for (const item of items) {
        const [menuRows] = await connection.execute("SELECT price, tax_percent FROM menu_items WHERE id = ?", [item.menu_item_id]);
        if (menuRows.length === 0) {
          throw new ApiError(400, `Menu item not found: ${item.menu_item_id}`);
        }

        const price = Number(menuRows[0].price);
        const taxPercent = Number(menuRows[0].tax_percent);
        const qty = Number(item.quantity || 1);

        subtotal += price * qty;
        taxAmount += (price * qty * taxPercent) / 100;
      }

      const grandTotal = subtotal + taxAmount;

      const [orderResult] = await connection.execute(
        `INSERT INTO orders
         (branch_id, customer_id, table_id, order_no, order_type, order_status, guest_count, special_note, subtotal, tax_amount, discount_amount, grand_total, created_by)
         VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, 0, ?, ?)`,
        [
          branch_id,
          customer_id || null,
          table_id || null,
          orderNo,
          order_type,
          guest_count,
          special_note || null,
          subtotal,
          taxAmount,
          grandTotal,
          req.user.id,
        ]
      );

      const orderId = orderResult.insertId;

      for (const item of items) {
        const [menuRows] = await connection.execute("SELECT price, tax_percent FROM menu_items WHERE id = ?", [item.menu_item_id]);
        const price = Number(menuRows[0].price);
        const taxPercent = Number(menuRows[0].tax_percent);
        const qty = Number(item.quantity || 1);
        const lineTotal = price * qty + (price * qty * taxPercent) / 100;

        await connection.execute(
          `INSERT INTO order_items
           (order_id, menu_item_id, quantity, unit_price, tax_percent, item_note, item_status, line_total)
           VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`,
          [orderId, item.menu_item_id, qty, price, taxPercent, item.item_note || null, lineTotal]
        );
      }

      const kotNo = `KOT-${Date.now()}`;
      const [kotResult] = await connection.execute(
        "INSERT INTO kots (order_id, kot_no, status, kitchen_note) VALUES (?, ?, 'pending', ?)",
        [orderId, kotNo, special_note || null]
      );

      const [orderItems] = await connection.execute("SELECT id FROM order_items WHERE order_id = ?", [orderId]);
      for (const oi of orderItems) {
        await connection.execute(
          "INSERT INTO kot_items (kot_id, order_item_id, status) VALUES (?, ?, 'pending')",
          [kotResult.insertId, oi.id]
        );
      }

      await connection.commit();
      const [createdOrder] = await connection.execute("SELECT * FROM orders WHERE id = ?", [orderId]);

      res.status(201).json(new ApiResponse("Order created", createdOrder[0]));
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }),

  addItem: asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const { menu_item_id, quantity = 1, item_note } = req.body;

    const [menuRows] = await query("SELECT price, tax_percent FROM menu_items WHERE id = ?", [menu_item_id]);
    if (menuRows.length === 0) {
      throw new ApiError(400, "Menu item not found");
    }

    const price = Number(menuRows[0].price);
    const taxPercent = Number(menuRows[0].tax_percent);
    const qty = Number(quantity);
    const lineTotal = price * qty + (price * qty * taxPercent) / 100;

    const result = await query(
      `INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, tax_percent, item_note, item_status, line_total)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [orderId, menu_item_id, qty, price, taxPercent, item_note || null, lineTotal]
    );

    await query(
      `UPDATE orders
       SET subtotal = subtotal + ?, tax_amount = tax_amount + ?, grand_total = grand_total + ?
       WHERE id = ?`,
      [price * qty, (price * qty * taxPercent) / 100, lineTotal, orderId]
    );

    const [created] = await query("SELECT * FROM order_items WHERE id = ?", [result.insertId]);
    res.status(201).json(new ApiResponse("Item added to order", created));
  }),

  removeItem: asyncHandler(async (req, res) => {
    const { id, itemId } = req.params;
    const [item] = await query("SELECT * FROM order_items WHERE id = ? AND order_id = ?", [itemId, id]);
    if (!item) throw new ApiError(404, "Order item not found");

    await query("DELETE FROM order_items WHERE id = ?", [itemId]);
    await query(
      `UPDATE orders
       SET subtotal = subtotal - ?, tax_amount = tax_amount - ?, grand_total = grand_total - ?
       WHERE id = ?`,
      [item.unit_price * item.quantity, (item.unit_price * item.quantity * item.tax_percent) / 100, item.line_total, id]
    );

    res.json(new ApiResponse("Order item removed"));
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    await query("UPDATE orders SET order_status = ? WHERE id = ?", [status, req.params.id]);
    const [updated] = await query("SELECT * FROM orders WHERE id = ?", [req.params.id]);
    if (!updated) throw new ApiError(404, "Order not found");
    res.json(new ApiResponse("Order status updated", updated));
  }),

  remove: asyncHandler(async (req, res) => {
    await query("DELETE FROM orders WHERE id = ?", [req.params.id]);
    res.json(new ApiResponse("Order deleted"));
  }),
};

module.exports = orderController;
