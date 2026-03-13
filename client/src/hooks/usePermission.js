import useAuth from "./useAuth";

export default function usePermission(...roles) {
  const { user } = useAuth();
  if (!roles.length) return true;
  const current = (user?.role || "").toLowerCase();
  return roles.map((role) => role.toLowerCase()).includes(current);
}
