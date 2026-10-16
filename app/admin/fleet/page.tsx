"use client";

import { useState } from "react";
import Link from "next/link";

interface FleetRider {
  id: string;
  name: string;
  bike: string;
  phone: string;
  zone: string;
  status: "IN_TRANSIT" | "IDLE_AVAILABLE" | "AT_STORE";
  orderAssigned?: string;
  batteryOrFuel: string;
}

const FLEET: FleetRider[] = [
  { id: "rd1", name: "Tanvir Hossain", bike: "Yamaha FZ-X (Dhaka Metro-Ha 48-1920)", phone: "+880 1911-778899", zone: "Dhaka North (Banani)", status: "IN_TRANSIT", orderAssigned: "#ORD-4821", batteryOrFuel: "85%" },
  { id: "rd2", name: "Suman Ahmed", bike: "Honda CB Shine (Dhaka Metro-La 12-4019)", phone: "+880 1812-334455", zone: "Gulshan-2 Circle", status: "IDLE_AVAILABLE", batteryOrFuel: "92%" },
  { id: "rd3", name: "Tariqul Islam", bike: "TVS Apache RTR (Dhaka Metro-Ba 91-8201)", phone: "+880 1715-667788", zone: "Old Dhaka / Lalbagh", status: "AT_STORE", orderAssigned: "#ORD-4825", batteryOrFuel: "74%" },
  { id: "rd4", name: "Mahbubur Rahman", bike: "Suzuki Gixxer (Dhaka Metro-Kha 38-1928)", phone: "+880 1611-443322", zone: "Uttara Sector 7", status: "IDLE_AVAILABLE", batteryOrFuel: "68%" },
];

export default function AdminFleetPage() {
  const [filterZone, setFilterZone] = useState("all");

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>Logistics Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Live Fleet Dispatch &amp; Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time GPS coordinates, batch dispatching, and turn-by-turn routing telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Mapbox GPS Active</span>
          </span>
        </div>
      </div>

      {/* Fleet KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Riders On Duty</span>
          <div className="text-2xl font-black font-mono text-white mt-1">142</div>
          <span className="text-[11px] text-emerald-400">98 in active delivery</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Avg Delivery Time</span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">22.4 m</div>
          <span className="text-[11px] text-slate-400">Target ≤ 25 min</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">SLA Compliance</span>
          <div className="text-2xl font-black font-mono text-purple-400 mt-1">98.6%</div>
          <span className="text-[11px] text-emerald-400">Dhaka North Hub</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Active Batches</span>
          <div className="text-2xl font-black font-mono text-white mt-1">68</div>
          <span className="text-[11px] text-slate-400">Dynamic route clustering</span>
        </div>
      </div>

      {/* Fleet Telemetry Table */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Rider &amp; Vehicle</span>
          <span>Zone &amp; Current Location</span>
          <span>Status &amp; Assigned Trip</span>
          <span className="text-right">Contact</span>
        </div>

        {FLEET.map((rider) => (
          <div key={rider.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-300 font-black flex items-center justify-center text-xs shrink-0">
                <span className="material-symbols-outlined text-lg">two_wheeler</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">{rider.name}</div>
                <div className="text-slate-400 text-[11px] font-mono mt-0.5">{rider.bike}</div>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="font-semibold text-slate-200">{rider.zone}</div>
              <div className="text-slate-500 text-[11px] font-mono">Battery: {rider.batteryOrFuel}</div>
            </div>

            <div className="space-y-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                rider.status === "IN_TRANSIT"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : rider.status === "AT_STORE"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-white/10 text-slate-300"
              }`}>
                {rider.status}
              </span>
              {rider.orderAssigned && (
                <div className="text-[11px] text-purple-300 font-mono">
                  Trip: {rider.orderAssigned}
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="font-mono text-slate-400 text-[11px] block">{rider.phone}</span>
              <button
                type="button"
                onClick={() => alert(`Calling ${rider.name} at ${rider.phone}...`)}
                className="text-purple-400 hover:text-purple-300 text-[10px] font-mono font-bold hover:underline"
              >
                Dispatch Ping &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
