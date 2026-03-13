import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "name", label: "Vendor Name", required: true },
  { name: "contact_person", label: "Contact Person" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email", type: "email" },
  { name: "gst_number", label: "GST Number" },
];

export default function VendorForm(props) {
  return <EntityForm title="Vendor" fields={fields} {...props} />;
}
