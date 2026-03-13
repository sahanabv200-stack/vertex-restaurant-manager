const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/orders/list", authenticate, purchaseController.listPurchaseOrders);
router.post("/orders", authenticate, authorize("owner", "manager", "purchase_manager"), purchaseController.createPurchaseOrder);
router.put("/orders/:id", authenticate, authorize("owner", "manager", "purchase_manager"), purchaseController.updatePurchaseOrder);
router.delete("/orders/:id", authenticate, authorize("owner", "manager"), purchaseController.deletePurchaseOrder);

router.get("/returns/list", authenticate, purchaseController.listPurchaseReturns);
router.post("/returns", authenticate, authorize("owner", "manager", "purchase_manager"), purchaseController.createPurchaseReturn);
router.put("/returns/:id", authenticate, authorize("owner", "manager", "purchase_manager"), purchaseController.updatePurchaseReturn);
router.delete("/returns/:id", authenticate, authorize("owner", "manager"), purchaseController.deletePurchaseReturn);

router.get("/", authenticate, purchaseController.listPurchases);
router.get("/:id", authenticate, purchaseController.getPurchase);
router.post("/", authenticate, authorize("owner", "manager", "purchase_manager"), purchaseController.createPurchase);
router.put("/:id", authenticate, authorize("owner", "manager", "purchase_manager"), purchaseController.updatePurchase);
router.delete("/:id", authenticate, authorize("owner", "manager"), purchaseController.deletePurchase);

module.exports = router;
