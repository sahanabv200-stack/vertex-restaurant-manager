const express = require("express");
const kitchenController = require("../controllers/kitchenController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/kots", authenticate, kitchenController.listKots);
router.get("/kots/:id", authenticate, kitchenController.getKotDetails);
router.patch("/kots/:id/status", authenticate, authorize("owner", "manager", "chef"), kitchenController.updateKotStatus);
router.patch("/kots/items/:itemId/status", authenticate, authorize("owner", "manager", "chef"), kitchenController.updateKotItemStatus);

module.exports = router;
