import BaseBarChart from "./BaseBarChart";

export default function SalesChart({ data = [] }) {
  return <BaseBarChart title="Sales Trend" data={data} labelKey="date" valueKey="total" colorClass="bg-brand-500" />;
}
