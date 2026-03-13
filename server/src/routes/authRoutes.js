const express = require("express");
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.get("/me", authenticate, authController.me);
router.post("/register", authenticate, authorize("owner", "manager"), authController.register);

module.exports = router;
