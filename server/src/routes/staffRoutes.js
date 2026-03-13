const express = require("express");
const staffController = require("../controllers/staffController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/shifts/list", authenticate, staffController.listShifts);
router.post("/shifts", authenticate, authorize("owner", "manager"), staffController.createShift);
router.put("/shifts/:id", authenticate, authorize("owner", "manager"), staffController.updateShift);
router.delete("/shifts/:id", authenticate, authorize("owner", "manager"), staffController.deleteShift);

router.get("/", authenticate, staffController.listStaff);
router.get("/:id", authenticate, staffController.getStaff);
router.post("/", authenticate, authorize("owner", "manager"), staffController.createStaff);
router.put("/:id", authenticate, authorize("owner", "manager"), staffController.updateStaff);
router.delete("/:id", authenticate, authorize("owner", "manager"), staffController.deleteStaff);

module.exports = router;
