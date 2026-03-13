import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "name", label: "Category Name", required: true },
  { name: "description", label: "Description" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  {
    name: "is_active",
    label: "Active",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
];

export default function MenuCategoryForm(props) {
  return <EntityForm title="Menu Category" fields={fields} {...props} />;
}
