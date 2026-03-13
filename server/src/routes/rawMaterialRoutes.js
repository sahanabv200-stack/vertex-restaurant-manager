const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authenticate, inventoryController.listRawMaterials);
router.get("/:id", authenticate, inventoryController.getRawMaterial);
router.post("/", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.createRawMaterial);
router.put("/:id", authenticate, authorize("owner", "manager", "inventory_manager"), inventoryController.updateRawMaterial);
router.delete("/:id", authenticate, authorize("owner", "manager"), inventoryController.deleteRawMaterial);

module.exports = router;
