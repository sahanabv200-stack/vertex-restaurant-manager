const { createEntityController } = require("./crudFactory");
const hashPassword = require("../utils/hashPassword");
const asyncHandler = require("../utils/asyncHandler");

const base = createEntityController("users");

module.exports = {
  ...base,
  create: asyncHandler(async (req, res, next) => {
    if (req.body.password && !req.body.password_hash) {
      req.body.password_hash = await hashPassword(req.body.password);
      delete req.body.password;
    }
    return base.create(req, res, next);
  }),
  update: asyncHandler(async (req, res, next) => {
    if (req.body.password) {
      req.body.password_hash = await hashPassword(req.body.password);
      delete req.body.password;
    }
    return base.update(req, res, next);
  }),
};
