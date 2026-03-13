import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h2 className="text-base font-semibold text-slate-800">{user?.full_name || "User"}</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase text-brand-700">
          {user?.role || "guest"}
        </span>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
