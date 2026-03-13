const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", authenticate, dashboardController.summary);

module.exports = router;
