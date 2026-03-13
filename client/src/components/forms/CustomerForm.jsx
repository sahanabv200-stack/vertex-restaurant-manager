import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "full_name", label: "Customer Name", required: true },
  { name: "phone", label: "Phone", required: true },
  { name: "email", label: "Email", type: "email" },
  {
    name: "customer_type",
    label: "Type",
    options: [
      { value: "walkin", label: "Walk-in" },
      { value: "regular", label: "Regular" },
      { value: "corporate", label: "Corporate" },
    ],
  },
];

export default function CustomerForm(props) {
  return <EntityForm title="Customer" fields={fields} {...props} />;
}
