import BaseBarChart from "./BaseBarChart";

export default function ExpenseChart({ data = [] }) {
  return <BaseBarChart title="Expense Trend" data={data} labelKey="date" valueKey="total" colorClass="bg-rose-500" />;
}
