export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      <span>{text}</span>
    </div>
  );
}
