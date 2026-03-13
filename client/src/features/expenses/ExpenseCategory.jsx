import { useEffect, useState } from "react";
import api from "../../api/axios";
import Header from "../../components/layout/Header";

export default function ExpenseCategory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/expenses/categories/list").then((response) => setRows(response.data.data || []));
  }, []);

  return (
    <div className="space-y-4">
      <Header title="Expense Categories" subtitle="Configured expense category list" />
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.id}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.description || "-"}</td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td className="px-4 py-3 text-slate-500" colSpan={3}>
                  No categories found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
