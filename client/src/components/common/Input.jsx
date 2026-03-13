export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label ? <span className="font-medium text-slate-700">{label}</span> : null}
      <input
        className={`rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
