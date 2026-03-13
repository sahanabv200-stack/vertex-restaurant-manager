import Header from "../components/layout/Header";

export default function Settings() {
  return (
    <div className="space-y-4">
      <Header title="Settings" subtitle="Company and application preferences" />
      <div className="card p-4">
        <p className="text-sm text-slate-600">
          Configure GST, branch preferences, and integrations in future iterations. This section is ready for extension.
        </p>
      </div>
    </div>
  );
}
