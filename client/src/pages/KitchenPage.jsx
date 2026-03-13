import { useEffect, useState } from "react";
import kitchenApi from "../api/kitchenApi";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";

const statuses = ["pending", "accepted", "preparing", "ready", "served", "cancelled"];

function toneForStatus(status) {
  if (status === "ready" || status === "served") return "green";
  if (status === "cancelled") return "red";
  if (status === "preparing" || status === "accepted") return "blue";
  return "amber";
}

export default function KitchenPage() {
  const [kots, setKots] = useState([]);

  const loadKots = async () => {
    const response = await kitchenApi.listKots();
    setKots(response.data.data || []);
  };

  useEffect(() => {
    loadKots();
  }, []);

  const updateStatus = async (id, status) => {
    await kitchenApi.updateKotStatus(id, status);
    loadKots();
  };

  return (
    <div className="space-y-4">
      <Header title="Kitchen / KOT" subtitle="Track and update kitchen order tickets" />
      <div className="grid grid-cols-1 gap-4">
        {kots.map((kot) => (
          <div key={kot.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-800">{kot.kot_no}</p>
                <p className="text-xs text-slate-500">Order #{kot.order_no}</p>
              </div>
              <Badge tone={toneForStatus(kot.status)}>{kot.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600">{kot.kitchen_note || "No kitchen note"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={`${kot.id}-${status}`}
                  variant={status === kot.status ? "primary" : "secondary"}
                  className="px-2 py-1 text-xs"
                  onClick={() => updateStatus(kot.id, status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        ))}
        {!kots.length ? <div className="card p-4 text-sm text-slate-500">No KOTs available.</div> : null}
      </div>
    </div>
  );
}
