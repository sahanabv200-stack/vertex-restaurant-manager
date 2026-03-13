import { NAV_ITEMS } from "../../utils/constants";
import { ROLE_LABELS } from "../../utils/permissions";

const RESTRICTED_ROLES = {
  owner: [],
  manager: ["settings"],
  cashier: ["users", "roles", "branches", "staff", "reports", "settings"],
  waiter: ["users", "roles", "branches", "vendors", "purchases", "expenses", "reports", "settings"],
  chef: ["users", "roles", "branches", "vendors", "purchases", "expenses", "settings"],
  inventory_manager: ["users", "roles", "billing", "settings"],
  purchase_manager: ["users", "roles", "orders", "kitchen", "billing", "settings"],
  accounts_manager: ["users", "roles", "kitchen", "settings"],
  delivery_staff: [
    "users",
    "roles",
    "branches",
    "tables",
    "menuCategories",
    "menuItems",
    "customers",
    "orders",
    "kitchen",
    "invoices",
    "payments",
    "rawMaterials",
    "vendors",
    "purchases",
    "expenses",
    "staff",
    "reports",
    "settings",
  ],
};

export default function PermissionMatrix() {
  return (
    <div className="card overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Accessible Modules</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {Object.entries(ROLE_LABELS).map(([roleKey, roleLabel]) => {
            const restricted = RESTRICTED_ROLES[roleKey] || [];
            const allowed = NAV_ITEMS.filter((item) => !restricted.includes(item.key)).map((item) => item.label);

            return (
              <tr key={roleKey}>
                <td className="px-4 py-3 font-medium text-slate-700">{roleLabel}</td>
                <td className="px-4 py-3 text-slate-600">{allowed.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
