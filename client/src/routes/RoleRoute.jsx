import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RoleRoute({ roles = [] }) {
  const { user } = useAuth();
  const allowed = roles.map((role) => role.toLowerCase()).includes((user?.role || "").toLowerCase());
  if (!allowed) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}
