const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { query } = require("../config/db");

const reportController = {
  summary: asyncHandler(async (_req, res) => {
    const sales = await query(
      `SELECT DATE(invoice_date) AS date, IFNULL(SUM(grand_total),0) AS total
       FROM invoices
       GROUP BY DATE(invoice_date)
       ORDER BY DATE(invoice_date) DESC
       LIMIT 30`
    );

    const expense = await query(
      `SELECT DATE(expense_date) AS date, IFNULL(SUM(amount),0) AS total
       FROM expenses
       GROUP BY DATE(expense_date)
       ORDER BY DATE(expense_date) DESC
       LIMIT 30`
    );

    const salesTotal = sales.reduce((acc, row) => acc + Number(row.total || 0), 0);
    const expenseTotal = expense.reduce((acc, row) => acc + Number(row.total || 0), 0);
    const profit = salesTotal - expenseTotal;

    res.json(
      new ApiResponse("Report summary fetched", {
        sales,
        expense,
        profit,
      })
    );
  }),

  sales: asyncHandler(async (_req, res) => {
    const rows = await query(
      `SELECT i.invoice_no, i.invoice_date, i.grand_total, o.order_no
       FROM invoices i
       INNER JOIN orders o ON o.id = i.order_id
       ORDER BY i.invoice_date DESC`
    );

    res.json(new ApiResponse("Sales report fetched", rows));
  }),

  stock: asyncHandler(async (_req, res) => {
    const rows = await query(
      `SELECT id, item_code, name, unit, current_stock, reorder_level
       FROM raw_materials
       ORDER BY name ASC`
    );
    res.json(new ApiResponse("Stock report fetched", rows));
  }),
};

module.exports = reportController;
