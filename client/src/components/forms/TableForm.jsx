import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "table_number", label: "Table Number", required: true },
  { name: "seating_capacity", label: "Seating Capacity", type: "number", required: true },
  { name: "area", label: "Area" },
  {
    name: "status",
    label: "Status",
    options: [
      { value: "available", label: "Available" },
      { value: "occupied", label: "Occupied" },
      { value: "reserved", label: "Reserved" },
      { value: "cleaning", label: "Cleaning" },
    ],
  },
];

export default function TableForm(props) {
  return <EntityForm title="Restaurant Table" fields={fields} {...props} />;
}
