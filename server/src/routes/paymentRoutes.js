const express = require("express");
const billingController = require("../controllers/billingController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authenticate, billingController.listPayments);
router.get("/:id", authenticate, billingController.getPayment);
router.post("/", authenticate, authorize("owner", "manager", "cashier", "accounts_manager"), billingController.createPayment);
router.put("/:id", authenticate, authorize("owner", "manager", "cashier", "accounts_manager"), billingController.updatePayment);
router.delete("/:id", authenticate, authorize("owner", "manager"), billingController.deletePayment);

module.exports = router;
