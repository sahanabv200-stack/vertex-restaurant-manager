const { createEntityController } = require("./crudFactory");
const asyncHandler = require("../utils/asyncHandler");

const rawMaterialsCrud = createEntityController("rawMaterials");
const stockEntriesCrud = createEntityController("stockEntries");
const stockIssuesCrud = createEntityController("stockIssues");
const stockAdjustmentsCrud = createEntityController("stockAdjustments");
const wastageCrud = createEntityController("wastageEntries");

module.exports = {
  listRawMaterials: asyncHandler(async (req, res) => rawMaterialsCrud.list(req, res)),
  getRawMaterial: asyncHandler(async (req, res) => rawMaterialsCrud.getById(req, res)),
  createRawMaterial: asyncHandler(async (req, res) => rawMaterialsCrud.create(req, res)),
  updateRawMaterial: asyncHandler(async (req, res) => rawMaterialsCrud.update(req, res)),
  deleteRawMaterial: asyncHandler(async (req, res) => rawMaterialsCrud.remove(req, res)),

  listStockEntries: asyncHandler(async (req, res) => stockEntriesCrud.list(req, res)),
  createStockEntry: asyncHandler(async (req, res) => stockEntriesCrud.create(req, res)),
  updateStockEntry: asyncHandler(async (req, res) => stockEntriesCrud.update(req, res)),
  deleteStockEntry: asyncHandler(async (req, res) => stockEntriesCrud.remove(req, res)),

  listStockIssues: asyncHandler(async (req, res) => stockIssuesCrud.list(req, res)),
  createStockIssue: asyncHandler(async (req, res) => stockIssuesCrud.create(req, res)),
  updateStockIssue: asyncHandler(async (req, res) => stockIssuesCrud.update(req, res)),
  deleteStockIssue: asyncHandler(async (req, res) => stockIssuesCrud.remove(req, res)),

  listStockAdjustments: asyncHandler(async (req, res) => stockAdjustmentsCrud.list(req, res)),
  createStockAdjustment: asyncHandler(async (req, res) => stockAdjustmentsCrud.create(req, res)),
  updateStockAdjustment: asyncHandler(async (req, res) => stockAdjustmentsCrud.update(req, res)),
  deleteStockAdjustment: asyncHandler(async (req, res) => stockAdjustmentsCrud.remove(req, res)),

  listWastageEntries: asyncHandler(async (req, res) => wastageCrud.list(req, res)),
  createWastageEntry: asyncHandler(async (req, res) => wastageCrud.create(req, res)),
  updateWastageEntry: asyncHandler(async (req, res) => wastageCrud.update(req, res)),
  deleteWastageEntry: asyncHandler(async (req, res) => wastageCrud.remove(req, res)),
};
