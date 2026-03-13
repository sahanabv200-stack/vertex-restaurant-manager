const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { query } = require("../config/db");

const kitchenController = {
  listKots: asyncHandler(async (req, res) => {
    const status = req.query.status;
    const params = [];
    let statusClause = "";

    if (status) {
      statusClause = "WHERE k.status = ?";
      params.push(status);
    }

    const rows = await query(
      `SELECT k.*, o.order_no, o.order_type, o.special_note
       FROM kots k
       INNER JOIN orders o ON o.id = k.order_id
       ${statusClause}
       ORDER BY k.id DESC`,
      params
    );

    res.json(new ApiResponse("KOT list fetched", rows));
  }),

  getKotDetails: asyncHandler(async (req, res) => {
    const [kot] = await query("SELECT * FROM kots WHERE id = ?", [req.params.id]);
    if (!kot) throw new ApiError(404, "KOT not found");

    const items = await query(
      `SELECT ki.*, oi.quantity, oi.item_note, mi.name AS menu_item_name
       FROM kot_items ki
       INNER JOIN order_items oi ON oi.id = ki.order_item_id
       INNER JOIN menu_items mi ON mi.id = oi.menu_item_id
       WHERE ki.kot_id = ?`,
      [req.params.id]
    );

    res.json(new ApiResponse("KOT details fetched", { ...kot, items }));
  }),

  updateKotStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    await query("UPDATE kots SET status = ? WHERE id = ?", [status, req.params.id]);
    const [updated] = await query("SELECT * FROM kots WHERE id = ?", [req.params.id]);
    if (!updated) throw new ApiError(404, "KOT not found");
    res.json(new ApiResponse("KOT status updated", updated));
  }),

  updateKotItemStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    await query("UPDATE kot_items SET status = ? WHERE id = ?", [status, req.params.itemId]);
    const [updated] = await query("SELECT * FROM kot_items WHERE id = ?", [req.params.itemId]);
    if (!updated) throw new ApiError(404, "KOT item not found");
    res.json(new ApiResponse("KOT item status updated", updated));
  }),
};

module.exports = kitchenController;
