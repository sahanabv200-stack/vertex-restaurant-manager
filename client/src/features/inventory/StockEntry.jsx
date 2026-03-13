import { useEffect, useState } from "react";
import api from "../../api/axios";
import Header from "../../components/layout/Header";

export default function StockEntry() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/inventory/stock-entries").then((response) => setRows(response.data.data || []));
  }, []);

  return (
    <div className="space-y-4">
      <Header title="Stock Entries" subtitle="Inbound stock entry records" />
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Entry No</th>
              <th className="px-4 py-3">Vendor ID</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.id}</td>
                <td className="px-4 py-3">{row.entry_no}</td>
                <td className="px-4 py-3">{row.vendor_id ?? "-"}</td>
                <td className="px-4 py-3">{row.entry_date}</td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td className="px-4 py-3 text-slate-500" colSpan={4}>
                  No stock entries found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
