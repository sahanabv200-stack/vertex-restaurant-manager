const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { query } = require("../config/db");

const dashboardController = {
  summary: asyncHandler(async (_req, res) => {
    const [users] = await Promise.all([
      query("SELECT COUNT(*) AS total_users FROM users"),
    ]);

    const [roles] = await Promise.all([
      query("SELECT COUNT(*) AS total_roles FROM roles"),
    ]);

    const [branches] = await Promise.all([
      query("SELECT COUNT(*) AS total_branches FROM branches"),
    ]);

    const [orders] = await Promise.all([
      query("SELECT COUNT(*) AS total_orders, IFNULL(SUM(grand_total),0) AS total_order_value FROM orders"),
    ]);

    const [invoices] = await Promise.all([
      query("SELECT COUNT(*) AS total_invoices, IFNULL(SUM(grand_total),0) AS total_invoice_value FROM invoices"),
    ]);

    const [payments] = await Promise.all([
      query("SELECT IFNULL(SUM(amount),0) AS total_received FROM payments"),
    ]);

    const [expenses] = await Promise.all([
      query("SELECT IFNULL(SUM(amount),0) AS total_expense FROM expenses"),
    ]);

    const [topItems] = await Promise.all([
      query(
        `SELECT mi.name, SUM(oi.quantity) AS qty
         FROM order_items oi
         INNER JOIN menu_items mi ON mi.id = oi.menu_item_id
         GROUP BY mi.id, mi.name
         ORDER BY qty DESC
         LIMIT 5`
      ),
    ]);

    const summary = {
      users: users[0],
      roles: roles[0],
      branches: branches[0],
      orders: orders[0],
      invoices: invoices[0],
      payments: payments[0],
      expenses: expenses[0],
      topItems,
    };

    res.json(new ApiResponse("Dashboard summary fetched", summary));
  }),
};

module.exports = dashboardController;
