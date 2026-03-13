import EntityForm from "./EntityForm";

const fields = [
  { name: "name", label: "Branch Name", required: true },
  { name: "code", label: "Code", required: true },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email", type: "email" },
];

export default function BranchForm(props) {
  return <EntityForm title="Branch" fields={fields} {...props} />;
}
