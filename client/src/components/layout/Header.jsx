export default function Header({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
