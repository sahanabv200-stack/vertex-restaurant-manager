import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-600">Page not found.</p>
      <Link className="mt-4 text-brand-700 hover:underline" to="/dashboard">
        Go to dashboard
      </Link>
    </div>
  );
}
