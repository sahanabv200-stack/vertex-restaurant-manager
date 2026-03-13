const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/raw-materials", authenticate, inventoryController.listRawMaterials);
router.get("/raw-materials/:id", authenticate, inventoryController.getRawMaterial);
router.post("/raw-materials", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.createRawMaterial);
router.put("/raw-materials/:id", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.updateRawMaterial);
router.delete("/raw-materials/:id", authenticate, authorize("owner", "manager"), inventoryController.deleteRawMaterial);

router.get("/stock-entries", authenticate, inventoryController.listStockEntries);
router.post("/stock-entries", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.createStockEntry);
router.put("/stock-entries/:id", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.updateStockEntry);
router.delete("/stock-entries/:id", authenticate, authorize("owner", "manager"), inventoryController.deleteStockEntry);

router.get("/stock-issues", authenticate, inventoryController.listStockIssues);
router.post("/stock-issues", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.createStockIssue);
router.put("/stock-issues/:id", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.updateStockIssue);
router.delete("/stock-issues/:id", authenticate, authorize("owner", "manager"), inventoryController.deleteStockIssue);

router.get("/stock-adjustments", authenticate, inventoryController.listStockAdjustments);
router.post("/stock-adjustments", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.createStockAdjustment);
router.put("/stock-adjustments/:id", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.updateStockAdjustment);
router.delete("/stock-adjustments/:id", authenticate, authorize("owner", "manager"), inventoryController.deleteStockAdjustment);

router.get("/wastage", authenticate, inventoryController.listWastageEntries);
router.post("/wastage", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.createWastageEntry);
router.put("/wastage/:id", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.updateWastageEntry);
router.delete("/wastage/:id", authenticate, authorize("owner", "manager"), inventoryController.deleteWastageEntry);

module.exports = router;
