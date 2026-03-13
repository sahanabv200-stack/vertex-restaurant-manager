import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-rose-700">Access Denied</h1>
      <p className="mt-2 text-slate-600">You do not have permission to access this page.</p>
      <Link className="mt-4 text-brand-700 hover:underline" to="/dashboard">
        Back to dashboard
      </Link>
    </div>
  );
}
