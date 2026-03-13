const express = require("express");

const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const reportRoutes = require("./reportRoutes");
const roleRoutes = require("./roleRoutes");
const userRoutes = require("./userRoutes");
const branchRoutes = require("./branchRoutes");
const tableRoutes = require("./tableRoutes");
const menuCategoryRoutes = require("./menuCategoryRoutes");
const menuItemRoutes = require("./menuItemRoutes");
const customerRoutes = require("./customerRoutes");
const orderRoutes = require("./orderRoutes");
const kitchenRoutes = require("./kitchenRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const paymentRoutes = require("./paymentRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const rawMaterialRoutes = require("./rawMaterialRoutes");
const vendorRoutes = require("./vendorRoutes");
const purchaseRoutes = require("./purchaseRoutes");
const expenseRoutes = require("./expenseRoutes");
const staffRoutes = require("./staffRoutes");
const deliveryRoutes = require("./deliveryRoutes");
const billingRoutes = require("./billingRoutes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Vertex Restaurant Manager API" });
});

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/reports", reportRoutes);
router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/branches", branchRoutes);
router.use("/tables", tableRoutes);
router.use("/menu-categories", menuCategoryRoutes);
router.use("/menu-items", menuItemRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/kitchen", kitchenRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/payments", paymentRoutes);
router.use("/raw-materials", rawMaterialRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/vendors", vendorRoutes);
router.use("/purchases", purchaseRoutes);
router.use("/expenses", expenseRoutes);
router.use("/staff", staffRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/billing", billingRoutes);

module.exports = router;
