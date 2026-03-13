const { createEntityController } = require("./crudFactory");
const asyncHandler = require("../utils/asyncHandler");

const staffCrud = createEntityController("staff");
const shiftsCrud = createEntityController("shifts");

module.exports = {
  listStaff: asyncHandler(async (req, res) => staffCrud.list(req, res)),
  getStaff: asyncHandler(async (req, res) => staffCrud.getById(req, res)),
  createStaff: asyncHandler(async (req, res) => staffCrud.create(req, res)),
  updateStaff: asyncHandler(async (req, res) => staffCrud.update(req, res)),
  deleteStaff: asyncHandler(async (req, res) => staffCrud.remove(req, res)),

  listShifts: asyncHandler(async (req, res) => shiftsCrud.list(req, res)),
  createShift: asyncHandler(async (req, res) => shiftsCrud.create(req, res)),
  updateShift: asyncHandler(async (req, res) => shiftsCrud.update(req, res)),
  deleteShift: asyncHandler(async (req, res) => shiftsCrud.remove(req, res)),
};
