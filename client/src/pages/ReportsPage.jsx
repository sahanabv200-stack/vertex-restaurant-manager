import { useEffect, useState } from "react";
import reportApi from "../api/reportApi";
import Header from "../components/layout/Header";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";

export default function ReportsPage() {
  const [summary, setSummary] = useState({ sales: [], expense: [], profit: 0 });

  useEffect(() => {
    reportApi.summary().then((response) => setSummary(response.data.data));
  }, []);

  return (
    <div className="space-y-4">
      <Header title="Reports & Analytics" subtitle="Sales, expense and stock snapshots" />

      <div className="card p-4">
        <p className="text-sm text-slate-500">Estimated Profit (current report window)</p>
        <p className="mt-2 text-2xl font-bold text-emerald-700">{formatCurrency(summary.profit)}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h4 className="text-base font-semibold text-slate-800">Recent Sales</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {(summary.sales || []).slice(0, 10).map((item, index) => (
              <li key={`sale-${index}`} className="flex items-center justify-between">
                <span>{formatDate(item.date)}</span>
                <span className="font-semibold">{formatCurrency(item.total)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h4 className="text-base font-semibold text-slate-800">Recent Expenses</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {(summary.expense || []).slice(0, 10).map((item, index) => (
              <li key={`expense-${index}`} className="flex items-center justify-between">
                <span>{formatDate(item.date)}</span>
                <span className="font-semibold">{formatCurrency(item.total)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
