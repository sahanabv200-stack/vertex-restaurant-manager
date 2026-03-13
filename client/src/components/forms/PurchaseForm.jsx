import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "vendor_id", label: "Vendor ID", type: "number", required: true },
  { name: "purchase_no", label: "Purchase No", required: true },
  { name: "purchase_date", label: "Purchase Date", type: "date", required: true },
  { name: "invoice_no", label: "Invoice No" },
  { name: "subtotal", label: "Subtotal", type: "number", required: true },
  { name: "tax_amount", label: "Tax Amount", type: "number" },
  { name: "grand_total", label: "Grand Total", type: "number", required: true },
];

export default function PurchaseForm(props) {
  return <EntityForm title="Purchase" fields={fields} {...props} />;
}
