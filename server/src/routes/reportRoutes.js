const express = require("express");
const reportController = require("../controllers/reportController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", authenticate, reportController.summary);
router.get("/sales", authenticate, reportController.sales);
router.get("/stock", authenticate, reportController.stock);

module.exports = router;
