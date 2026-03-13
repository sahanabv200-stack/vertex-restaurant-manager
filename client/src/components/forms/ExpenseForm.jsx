import EntityForm from "./EntityForm";

const fields = [
  { name: "branch_id", label: "Branch ID", type: "number", required: true },
  { name: "category_id", label: "Category ID", type: "number", required: true },
  { name: "expense_date", label: "Expense Date", type: "date", required: true },
  { name: "description", label: "Description", required: true },
  { name: "amount", label: "Amount", type: "number", required: true },
  {
    name: "payment_mode",
    label: "Payment Mode",
    options: [
      { value: "cash", label: "Cash" },
      { value: "upi", label: "UPI" },
      { value: "card", label: "Card" },
      { value: "bank", label: "Bank" },
    ],
  },
];

export default function ExpenseForm(props) {
  return <EntityForm title="Expense" fields={fields} {...props} />;
}
