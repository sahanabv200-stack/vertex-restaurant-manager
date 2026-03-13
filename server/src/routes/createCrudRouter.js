const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createEntityController } = require("../controllers/crudFactory");

function buildCrudRouter(entityKey, options = {}) {
  const controller = createEntityController(entityKey);
  const router = express.Router();

  const readRoles = options.readRoles || [];
  const writeRoles = options.writeRoles || [
    "owner",
    "manager",
    "inventory_manager",
    "purchase_manager",
    "accounts_manager",
  ];
  const deleteRoles = options.deleteRoles || ["owner", "manager"];

  const readGuard = readRoles.length ? [authorize(...readRoles)] : [];

  router.get("/", authenticate, ...readGuard, controller.list);
  router.get("/:id", authenticate, ...readGuard, controller.getById);
  router.post("/", authenticate, authorize(...writeRoles), controller.create);
  router.put("/:id", authenticate, authorize(...writeRoles), controller.update);
  router.delete("/:id", authenticate, authorize(...deleteRoles), controller.remove);

  return router;
}

module.exports = {
  buildCrudRouter,
};
