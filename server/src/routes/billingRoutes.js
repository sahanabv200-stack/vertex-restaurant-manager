const express = require("express");
const billingController = require("../controllers/billingController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/invoices", authenticate, billingController.listInvoices);
router.get("/invoices/:id", authenticate, billingController.getInvoice);
router.post("/invoices", authenticate, authorize("owner", "manager", "cashier"), billingController.createInvoice);
router.put("/invoices/:id", authenticate, authorize("owner", "manager", "cashier"), billingController.updateInvoice);
router.delete("/invoices/:id", authenticate, authorize("owner", "manager"), billingController.deleteInvoice);

router.get("/payments", authenticate, billingController.listPayments);
router.get("/payments/:id", authenticate, billingController.getPayment);
router.post("/payments", authenticate, authorize("owner", "manager", "cashier", "accounts_manager"), billingController.createPayment);
router.put("/payments/:id", authenticate, authorize("owner", "manager", "cashier", "accounts_manager"), billingController.updatePayment);
router.delete("/payments/:id", authenticate, authorize("owner", "manager"), billingController.deletePayment);
router.post("/collect", authenticate, authorize("owner", "manager", "cashier", "accounts_manager"), billingController.collectPayment);

module.exports = router;
