const express = require("express");
const expenseController = require("../controllers/expenseController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/categories/list", authenticate, expenseController.listCategories);
router.post("/categories", authenticate, authorize("owner", "manager", "accounts_manager"), expenseController.createCategory);
router.put("/categories/:id", authenticate, authorize("owner", "manager", "accounts_manager"), expenseController.updateCategory);
router.delete("/categories/:id", authenticate, authorize("owner", "manager"), expenseController.deleteCategory);

router.get("/", authenticate, expenseController.listExpenses);
router.get("/:id", authenticate, expenseController.getExpense);
router.post("/", authenticate, authorize("owner", "manager", "accounts_manager"), expenseController.createExpense);
router.put("/:id", authenticate, authorize("owner", "manager", "accounts_manager"), expenseController.updateExpense);
router.delete("/:id", authenticate, authorize("owner", "manager"), expenseController.deleteExpense);

module.exports = router;
