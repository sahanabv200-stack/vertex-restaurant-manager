import { useEffect, useState } from "react";
import dashboardApi from "../api/dashboardApi";
import Header from "../components/layout/Header";
import formatCurrency from "../utils/formatCurrency";

const CARD_CONFIG = [
  { key: "users", label: "Users", value: (summary) => summary?.users?.total_users || 0 },
  { key: "branches", label: "Branches", value: (summary) => summary?.branches?.total_branches || 0 },
  { key: "orders", label: "Orders", value: (summary) => summary?.orders?.total_orders || 0 },
  { key: "sales", label: "Sales", value: (summary) => formatCurrency(summary?.invoices?.total_invoice_value || 0) },
  { key: "received", label: "Received", value: (summary) => formatCurrency(summary?.payments?.total_received || 0) },
  { key: "expenses", label: "Expenses", value: (summary) => formatCurrency(summary?.expenses?.total_expense || 0) },
];

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    dashboardApi.summary().then((response) => setSummary(response.data.data));
  }, []);

  return (
    <div className="space-y-4">
      <Header title="Dashboard" subtitle="Business overview for Vertex Restaurant Manager" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CARD_CONFIG.map((card) => (
          <div key={card.key} className="card p-4">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{card.value(summary)}</p>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <h4 className="text-base font-semibold text-slate-800">Top Menu Items</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {(summary?.topItems || []).map((item) => (
            <li key={item.name} className="flex items-center justify-between">
              <span>{item.name}</span>
              <span className="font-semibold">{item.qty}</span>
            </li>
          ))}
          {!summary?.topItems?.length ? <li className="text-slate-500">No data yet.</li> : null}
        </ul>
      </div>
    </div>
  );
}
