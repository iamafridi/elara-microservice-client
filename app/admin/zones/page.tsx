"use client";

import { useState } from "react";
import Link from "next/link";

interface PostGISZone {
  id: string;
  name: string;
  baseDeliveryFee: number;
  surgeMultiplier: number;
  rainMode: boolean;
  activeOrders: number;
  status: "OPTIMAL" | "SURGING" | "RAIN_MODE";
}

const INITIAL_ZONES: PostGISZone[] = [
  { id: "z1", name: "Dhaka North (Banani, Gulshan-2, Baridhara)", baseDeliveryFee: 50, surgeMultiplier: 1.1, rainMode: false, activeOrders: 182, status: "OPTIMAL" },
  { id: "z2", name: "Dhaka South (Dhanmondi, Old Dhaka, Lalbagh)", baseDeliveryFee: 60, surgeMultiplier: 1.4, rainMode: true, activeOrders: 94, status: "RAIN_MODE" },
  { id: "z3", name: "Uttara Sector Cluster (Sectors 1-14)", baseDeliveryFee: 55, surgeMultiplier: 1.0, rainMode: false, activeOrders: 48, status: "OPTIMAL" },
  { id: "z4", name: "Mirpur DOHS & Metro Corridor", baseDeliveryFee: 50, surgeMultiplier: 1.0, rainMode: false, activeOrders: 36, status: "OPTIMAL" },
  { id: "z5", name: "Chittagong Metro (Agrabad, GEC Circle)", baseDeliveryFee: 45, surgeMultiplier: 1.0, rainMode: false, activeOrders: 24, status: "OPTIMAL" },
  { id: "z6", name: "Sylhet Sadar & Shahjalal Upazila", baseDeliveryFee: 40, surgeMultiplier: 1.0, rainMode: false, activeOrders: 18, status: "OPTIMAL" },
];

export default function AdminZonesPage() {
  const [zones, setZones] = useState<PostGISZone[]>(INITIAL_ZONES);
  const [toast, setToast] = useState<string | null>(null);

  const toggleRainMode = (id: string, name: string, current: boolean) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === id
          ? {
              ...z,
              rainMode: !current,
              surgeMultiplier: !current ? 1.5 : 1.0,
              status: !current ? ("RAIN_MODE" as const) : ("OPTIMAL" as const),
            }
          : z
      )
    );
    setToast(
      !current
        ? `Activated Rain Surge Mode (1.5x) for ${name}. Rider hazard allowance bonus added.`
        : `Deactivated Rain Surge for ${name}. Returned to normal PostGIS base pricing.`
    );
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>Geofencing &amp; Tariffs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            PostGIS Geofenced Zones &amp; Dynamic Pricing
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage polygon delivery zones, monsoon rain surges, and lunch rush surge multipliers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>PostGIS Polygon Engine Active</span>
          </span>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-purple-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Zones Table */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Geofenced Zone Polygon</span>
          <span>Base Fee (৳)</span>
          <span>Surge Factor</span>
          <span>Active Orders</span>
          <span className="text-right">Monsoon Rain Mode</span>
        </div>

        {zones.map((zone) => (
          <div key={zone.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{zone.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  zone.status === "RAIN_MODE"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : zone.status === "SURGING"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {zone.status}
                </span>
              </div>
              <div className="text-slate-500 text-[11px] font-mono">
                Polygon: PostGIS GeoJSON stored in elara_db.zones
              </div>
            </div>

            <div className="font-mono font-bold text-white text-sm">
              ৳ {zone.baseDeliveryFee}
            </div>

            <div className="font-mono text-purple-300 font-bold">
              {zone.surgeMultiplier}x
            </div>

            <div className="font-mono text-slate-300">
              {zone.activeOrders} orders
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => toggleRainMode(zone.id, zone.name, zone.rainMode)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition ${
                  zone.rainMode
                    ? "bg-rose-600 hover:bg-rose-500 text-white shadow-xs shadow-rose-600/30"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
              >
                {zone.rainMode ? "🌧️ Rain Surge ON" : "Normal Mode"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-118 */
