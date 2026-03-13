import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "customer_id", label: "Customer ID", type: "number" },
  { name: "table_id", label: "Table ID", type: "number" },
  { name: "order_no", label: "Order No", required: true },
  {
    name: "order_type",
    label: "Order Type",
    options: [
      { value: "dine_in", label: "Dine In" },
      { value: "takeaway", label: "Takeaway" },
      { value: "delivery", label: "Delivery" },
    ],
  },
  {
    name: "order_status",
    label: "Status",
    options: [
      { value: "pending", label: "Pending" },
      { value: "confirmed", label: "Confirmed" },
      { value: "preparing", label: "Preparing" },
      { value: "ready", label: "Ready" },
      { value: "served", label: "Served" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
];

export default function OrderForm(props) {
  return <EntityForm title="Order" fields={fields} {...props} />;
}
