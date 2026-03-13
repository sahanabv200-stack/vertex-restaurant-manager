import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/tables/DataTable";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Header from "../components/layout/Header";
import ConfirmDialog from "../components/common/ConfirmDialog";
import useDebounce from "../hooks/useDebounce";
import { MODULE_CONFIGS } from "../utils/constants";

function toPayloadValue(field, value) {
  if (field.type === "number") {
    return value === "" ? null : Number(value);
  }
  return value;
}

export default function ModuleCrudPage({ moduleKey }) {
  const config = MODULE_CONFIGS[moduleKey];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });

  const columns = useMemo(() => {
    const baseFields = config.fields.slice(0, 5).map((field) => ({
      key: field.name,
      label: field.label,
    }));
    return [
      { key: "id", label: "ID" },
      ...baseFields,
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div className="flex gap-2">
            <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => onEdit(row)}>
              Edit
            </Button>
            <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => setConfirmDelete(row)}>
              Delete
            </Button>
          </div>
        ),
      },
    ];
  }, [config.fields]);

  const fetchRows = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(config.endpoint, {
        params: {
          page,
          limit: pagination.limit,
          q: debouncedSearch || undefined,
        },
      });
      setRows(response.data.data || []);
      setPagination(response.data.meta || pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, config.endpoint]);

  const onOpenCreate = () => {
    setEditing(null);
    setForm({});
    setOpen(true);
  };

  const onEdit = (row) => {
    setEditing(row);
    const next = {};
    config.fields.forEach((field) => {
      next[field.name] = row[field.name] ?? "";
    });
    setForm(next);
    setOpen(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {};
    config.fields.forEach((field) => {
      if (form[field.name] !== undefined) {
        payload[field.name] = toPayloadValue(field, form[field.name]);
      }
    });

    if (editing) {
      await api.put(`${config.endpoint}/${editing.id}`, payload);
    } else {
      await api.post(config.endpoint, payload);
    }

    setOpen(false);
    fetchRows(pagination.page || 1);
  };

  const onDelete = async () => {
    if (!confirmDelete) return;
    await api.delete(`${config.endpoint}/${confirmDelete.id}`);
    setConfirmDelete(null);
    fetchRows(1);
  };

  return (
    <div className="space-y-4">
      <Header title={config.title} subtitle="List, create, update and delete records" />

      <div className="card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder={`Search ${config.title.toLowerCase()}...`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="md:w-80"
          />
          <Button onClick={onOpenCreate}>Add New</Button>
        </div>
      </div>

      <DataTable columns={columns} rows={rows} loading={loading} />

      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Page {pagination.page || 1} of {pagination.totalPages || 1}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={(pagination.page || 1) <= 1}
            onClick={() => fetchRows((pagination.page || 1) - 1)}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            disabled={(pagination.page || 1) >= (pagination.totalPages || 1)}
            onClick={() => fetchRows((pagination.page || 1) + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <Modal open={open} title={editing ? `Edit ${config.title}` : `Add ${config.title}`} onClose={() => setOpen(false)}>
        <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={onSubmit}>
          {config.fields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              required={Boolean(field.required)}
              value={form[field.name] ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, [field.name]: event.target.value }))}
            />
          ))}
          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        title="Delete Record"
        message={`Are you sure you want to delete ID ${confirmDelete?.id}?`}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={onDelete}
      />
    </div>
  );
}
