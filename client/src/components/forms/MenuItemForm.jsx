import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "category_id", label: "Category ID", type: "number", required: true },
  { name: "item_code", label: "Item Code", required: true },
  { name: "name", label: "Item Name", required: true },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "tax_percent", label: "GST %", type: "number" },
  {
    name: "is_available",
    label: "Available",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
];

export default function MenuItemForm(props) {
  return <EntityForm title="Menu Item" fields={fields} {...props} />;
}
