export default function BaseBarChart({
  title,
  data = [],
  valueKey = "value",
  labelKey = "label",
  colorClass = "bg-brand-500",
}) {
  const max = Math.max(...data.map((item) => Number(item[valueKey]) || 0), 1);

  return (
    <div className="card space-y-3 p-4">
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      {!data.length ? <p className="text-sm text-slate-500">No chart data available.</p> : null}
      <div className="space-y-2">
        {data.map((item, index) => {
          const value = Number(item[valueKey]) || 0;
          const width = `${Math.max((value / max) * 100, 4)}%`;
          return (
            <div key={`${item[labelKey]}-${index}`} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{item[labelKey]}</span>
                <span>{value}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${colorClass}`} style={{ width }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
