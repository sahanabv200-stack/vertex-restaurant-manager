import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold text-slate-800">Profile</h3>
      <p className="mt-2 text-sm text-slate-600">{user?.full_name}</p>
      <p className="text-sm text-slate-500">{user?.email}</p>
      <p className="text-sm text-slate-500">Role: {user?.role}</p>
    </div>
  );
}
