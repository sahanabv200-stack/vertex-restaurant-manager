import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

export default function EntityForm({
  title,
  fields = [],
  value = {},
  onChange,
  onSubmit,
  submitLabel = "Save",
  busy = false,
}) {
  const handleChange = (name, fieldValue) => {
    if (onChange) onChange({ ...value, [name]: fieldValue });
  };

  return (
    <form className="card space-y-4 p-4" onSubmit={onSubmit}>
      {title ? <h3 className="text-lg font-semibold text-slate-800">{title}</h3> : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {fields.map((field) => {
          if (field.options) {
            return (
              <Select
                key={field.name}
                label={field.label}
                name={field.name}
                required={Boolean(field.required)}
                value={value[field.name] ?? ""}
                options={field.options}
                onChange={(event) => handleChange(field.name, event.target.value)}
              />
            );
          }

          return (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              required={Boolean(field.required)}
              placeholder={field.placeholder}
              value={value[field.name] ?? ""}
              onChange={(event) => handleChange(field.name, event.target.value)}
            />
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
