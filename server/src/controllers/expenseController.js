const { createEntityController } = require("./crudFactory");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const expenseController = {
  expenses: createEntityController("expenses"),
  categories: createEntityController("expenseCategories"),

  listCategories: asyncHandler(async (req, res) => {
    return expenseController.categories.list(req, res);
  }),
  createCategory: asyncHandler(async (req, res) => {
    return expenseController.categories.create(req, res);
  }),
  updateCategory: asyncHandler(async (req, res) => {
    return expenseController.categories.update(req, res);
  }),
  deleteCategory: asyncHandler(async (req, res) => {
    return expenseController.categories.remove(req, res);
  }),

  listExpenses: asyncHandler(async (req, res) => expenseController.expenses.list(req, res)),
  getExpense: asyncHandler(async (req, res) => expenseController.expenses.getById(req, res)),
  createExpense: asyncHandler(async (req, res) => expenseController.expenses.create(req, res)),
  updateExpense: asyncHandler(async (req, res) => expenseController.expenses.update(req, res)),
  deleteExpense: asyncHandler(async (req, res) => expenseController.expenses.remove(req, res)),

  health: asyncHandler(async (_req, res) => {
    res.json(new ApiResponse("Expense module healthy"));
  }),
};

module.exports = expenseController;
