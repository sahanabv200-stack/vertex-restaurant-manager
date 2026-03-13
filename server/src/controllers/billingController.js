const { createEntityController } = require("./crudFactory");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { query } = require("../config/db");

const invoicesCrud = createEntityController("invoices");
const paymentsCrud = createEntityController("payments");

module.exports = {
  listInvoices: asyncHandler(async (req, res) => invoicesCrud.list(req, res)),
  getInvoice: asyncHandler(async (req, res) => invoicesCrud.getById(req, res)),
  createInvoice: asyncHandler(async (req, res) => invoicesCrud.create(req, res)),
  updateInvoice: asyncHandler(async (req, res) => invoicesCrud.update(req, res)),
  deleteInvoice: asyncHandler(async (req, res) => invoicesCrud.remove(req, res)),

  listPayments: asyncHandler(async (req, res) => paymentsCrud.list(req, res)),
  getPayment: asyncHandler(async (req, res) => paymentsCrud.getById(req, res)),
  createPayment: asyncHandler(async (req, res) => {
    return paymentsCrud.create(req, res);
  }),
  updatePayment: asyncHandler(async (req, res) => paymentsCrud.update(req, res)),
  deletePayment: asyncHandler(async (req, res) => paymentsCrud.remove(req, res)),

  collectPayment: asyncHandler(async (req, res) => {
    const { invoice_id, payment_mode, amount, reference_no, note } = req.body;

    const paymentResult = await query(
      `INSERT INTO payments (invoice_id, payment_mode, reference_no, amount, paid_at, note)
       VALUES (?, ?, ?, ?, NOW(), ?)`,
      [invoice_id, payment_mode, reference_no || null, amount, note || null]
    );

    const paidRows = await query("SELECT IFNULL(SUM(amount),0) AS paid FROM payments WHERE invoice_id = ?", [invoice_id]);
    const [invoice] = await query("SELECT grand_total FROM invoices WHERE id = ?", [invoice_id]);
    if (!invoice) {
      return res.status(404).json(new ApiResponse("Invoice not found"));
    }

    let status = "unpaid";
    if (paidRows[0].paid >= invoice.grand_total) {
      status = "paid";
    } else if (paidRows[0].paid > 0) {
      status = "partial";
    }

    await query("UPDATE invoices SET payment_status = ? WHERE id = ?", [status, invoice_id]);

    const [payment] = await query("SELECT * FROM payments WHERE id = ?", [paymentResult.insertId]);
    res.status(201).json(new ApiResponse("Payment collected", payment));
  }),
};
