import EntityForm from "./EntityForm";

const fields = [
  { name: "user_id", label: "User ID", type: "number" },
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "employee_code", label: "Employee Code", required: true },
  { name: "designation", label: "Designation", required: true },
  { name: "salary", label: "Salary", type: "number" },
  {
    name: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
];

export default function StaffForm(props) {
  return <EntityForm title="Staff" fields={fields} {...props} />;
}
