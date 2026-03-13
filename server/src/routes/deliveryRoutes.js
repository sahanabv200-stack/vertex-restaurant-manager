const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/staff/list", authenticate, deliveryController.listDeliveryStaff);
router.post("/staff", authenticate, authorize("owner", "manager"), deliveryController.createDeliveryStaff);
router.put("/staff/:id", authenticate, authorize("owner", "manager"), deliveryController.updateDeliveryStaff);
router.delete("/staff/:id", authenticate, authorize("owner", "manager"), deliveryController.deleteDeliveryStaff);

router.get("/", authenticate, deliveryController.listDeliveries);
router.get("/:id", authenticate, deliveryController.getDelivery);
router.post("/", authenticate, authorize("owner", "manager", "delivery_staff"), deliveryController.createDelivery);
router.put("/:id", authenticate, authorize("owner", "manager", "delivery_staff"), deliveryController.updateDelivery);
router.delete("/:id", authenticate, authorize("owner", "manager"), deliveryController.deleteDelivery);

module.exports = router;
