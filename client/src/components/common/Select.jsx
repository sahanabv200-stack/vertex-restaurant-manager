export default function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label ? <span className="font-medium text-slate-700">{label}</span> : null}
      <select
        className={`rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
