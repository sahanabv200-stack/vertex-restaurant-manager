import { useEffect, useState } from "react";
import api from "../../api/axios";
import Header from "../../components/layout/Header";

export default function StockAdjustment() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/inventory/stock-adjustments").then((response) => setRows(response.data.data || []));
  }, []);

  return (
    <div className="space-y-4">
      <Header title="Stock Adjustments" subtitle="Inventory add/subtract adjustment history" />
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.id}</td>
                <td className="px-4 py-3">{row.raw_material_id}</td>
                <td className="px-4 py-3">{row.adjustment_type}</td>
                <td className="px-4 py-3">{row.quantity}</td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td className="px-4 py-3 text-slate-500" colSpan={4}>
                  No adjustments found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
