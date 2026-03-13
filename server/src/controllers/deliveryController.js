const { createEntityController } = require("./crudFactory");
const asyncHandler = require("../utils/asyncHandler");

const deliveriesCrud = createEntityController("deliveries");
const deliveryStaffCrud = createEntityController("deliveryStaff");

module.exports = {
  listDeliveries: asyncHandler(async (req, res) => deliveriesCrud.list(req, res)),
  getDelivery: asyncHandler(async (req, res) => deliveriesCrud.getById(req, res)),
  createDelivery: asyncHandler(async (req, res) => deliveriesCrud.create(req, res)),
  updateDelivery: asyncHandler(async (req, res) => deliveriesCrud.update(req, res)),
  deleteDelivery: asyncHandler(async (req, res) => deliveriesCrud.remove(req, res)),

  listDeliveryStaff: asyncHandler(async (req, res) => deliveryStaffCrud.list(req, res)),
  createDeliveryStaff: asyncHandler(async (req, res) => deliveryStaffCrud.create(req, res)),
  updateDeliveryStaff: asyncHandler(async (req, res) => deliveryStaffCrud.update(req, res)),
  deleteDeliveryStaff: asyncHandler(async (req, res) => deliveryStaffCrud.remove(req, res)),
};
