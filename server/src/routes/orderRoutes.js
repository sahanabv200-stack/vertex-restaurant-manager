const express = require("express");
const orderController = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authenticate, orderController.list);
router.get("/:id", authenticate, orderController.getById);
router.post("/", authenticate, authorize("owner", "manager", "cashier", "waiter", "captain"), orderController.create);
router.post("/:id/items", authenticate, authorize("owner", "manager", "cashier", "waiter", "captain"), orderController.addItem);
router.delete("/:id/items/:itemId", authenticate, authorize("owner", "manager", "cashier", "waiter", "captain"), orderController.removeItem);
router.patch("/:id/status", authenticate, authorize("owner", "manager", "cashier", "chef"), orderController.updateStatus);
router.delete("/:id", authenticate, authorize("owner", "manager"), orderController.remove);

module.exports = router;
