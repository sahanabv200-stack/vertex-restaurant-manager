const express = require("express");
const billingController = require("../controllers/billingController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authenticate, billingController.listInvoices);
router.get("/:id", authenticate, billingController.getInvoice);
router.post("/", authenticate, authorize("owner", "manager", "cashier"), billingController.createInvoice);
router.put("/:id", authenticate, authorize("owner", "manager", "cashier"), billingController.updateInvoice);
router.delete("/:id", authenticate, authorize("owner", "manager"), billingController.deleteInvoice);

module.exports = router;
