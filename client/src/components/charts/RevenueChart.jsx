import BaseBarChart from "./BaseBarChart";

export default function RevenueChart({ data = [] }) {
  return <BaseBarChart title="Revenue Trend" data={data} labelKey="date" valueKey="total" colorClass="bg-emerald-500" />;
}
