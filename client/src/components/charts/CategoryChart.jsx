import BaseBarChart from "./BaseBarChart";

export default function CategoryChart({ data = [] }) {
  return (
    <BaseBarChart
      title="Sales by Category"
      data={data}
      labelKey="category"
      valueKey="total"
      colorClass="bg-amber-500"
    />
  );
}
