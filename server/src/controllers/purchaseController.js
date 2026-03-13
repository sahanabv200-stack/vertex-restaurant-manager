const { createEntityController } = require("./crudFactory");
const asyncHandler = require("../utils/asyncHandler");

const purchasesCrud = createEntityController("purchases");
const purchaseOrdersCrud = createEntityController("purchaseOrders");
const purchaseReturnsCrud = createEntityController("purchaseReturns");

module.exports = {
  listPurchases: asyncHandler(async (req, res) => purchasesCrud.list(req, res)),
  getPurchase: asyncHandler(async (req, res) => purchasesCrud.getById(req, res)),
  createPurchase: asyncHandler(async (req, res) => purchasesCrud.create(req, res)),
  updatePurchase: asyncHandler(async (req, res) => purchasesCrud.update(req, res)),
  deletePurchase: asyncHandler(async (req, res) => purchasesCrud.remove(req, res)),

  listPurchaseOrders: asyncHandler(async (req, res) => purchaseOrdersCrud.list(req, res)),
  createPurchaseOrder: asyncHandler(async (req, res) => purchaseOrdersCrud.create(req, res)),
  updatePurchaseOrder: asyncHandler(async (req, res) => purchaseOrdersCrud.update(req, res)),
  deletePurchaseOrder: asyncHandler(async (req, res) => purchaseOrdersCrud.remove(req, res)),

  listPurchaseReturns: asyncHandler(async (req, res) => purchaseReturnsCrud.list(req, res)),
  createPurchaseReturn: asyncHandler(async (req, res) => purchaseReturnsCrud.create(req, res)),
  updatePurchaseReturn: asyncHandler(async (req, res) => purchaseReturnsCrud.update(req, res)),
  deletePurchaseReturn: asyncHandler(async (req, res) => purchaseReturnsCrud.remove(req, res)),
};
