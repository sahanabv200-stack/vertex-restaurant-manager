import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Settings from "../pages/Settings";
import DashboardPage from "../pages/DashboardPage";
import ModuleCrudPage from "../pages/ModuleCrudPage";
import ReportsPage from "../pages/ReportsPage";
import KitchenPage from "../pages/KitchenPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roles" element={<ModuleCrudPage moduleKey="roles" />} />
          <Route path="/users" element={<ModuleCrudPage moduleKey="users" />} />
          <Route path="/branches" element={<ModuleCrudPage moduleKey="branches" />} />
          <Route path="/tables" element={<ModuleCrudPage moduleKey="tables" />} />
          <Route path="/menu-categories" element={<ModuleCrudPage moduleKey="menuCategories" />} />
          <Route path="/menu-items" element={<ModuleCrudPage moduleKey="menuItems" />} />
          <Route path="/customers" element={<ModuleCrudPage moduleKey="customers" />} />
          <Route path="/orders" element={<ModuleCrudPage moduleKey="orders" />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/invoices" element={<ModuleCrudPage moduleKey="invoices" />} />
          <Route path="/payments" element={<ModuleCrudPage moduleKey="payments" />} />
          <Route path="/raw-materials" element={<ModuleCrudPage moduleKey="rawMaterials" />} />
          <Route path="/vendors" element={<ModuleCrudPage moduleKey="vendors" />} />
          <Route path="/purchases" element={<ModuleCrudPage moduleKey="purchases" />} />
          <Route path="/expenses" element={<ModuleCrudPage moduleKey="expenses" />} />
          <Route path="/staff" element={<ModuleCrudPage moduleKey="staff" />} />
          <Route path="/delivery" element={<ModuleCrudPage moduleKey="delivery" />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
