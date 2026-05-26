"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";
import { adminApi } from "@/lib/api-client";

export default function AdminPage() {
  const { orders, shebaJobs, switchRole, resetDemoData, currentUser } = useWorkflow();
  const [selectedZone, setSelectedZone] = useState("all");
  const [adminNotice, setAdminNotice] = useState<string | null>(null);
  const [backendStats, setBackendStats] = useState<{
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalMerchants: number;
    totalJobs: number;
    totalRevenue: number;
  } | null>(null);
  const [loadingBackend, setLoadingBackend] = useState(true);

  useEffect(() => {
    adminApi.getDashboardStats().then((res) => {
      setLoadingBackend(false);
      if (res.data) {
        setBackendStats(res.data);
      }
    });
  }, []);

  const totalGMV = backendStats?.totalRevenue
    ? backendStats.totalRevenue + orders.reduce((acc, o) => acc + o.total, 0)
    : orders.reduce((acc, o) => acc + o.total, 849200);

  const zones = [
    { name: "Dhaka North (Banani, Gulshan)", count: 182, status: "Optimal" },
    { name: "Dhaka South (Dhanmondi, Old Dhaka)", count: 94, status: "Surging" },
    { name: "Uttara & Airport Cluster", count: 48, status: "Optimal" },
    { name: "Mirpur DOHS & Metro", count: 36, status: "Optimal" },
    { name: "Chittagong Metro (Agrabad)", count: 24, status: "Optimal" },
  ];

  return (
    <div className="shell py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/40 px-3 py-1 text-xs font-mono text-purple-300 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>National Telemetry Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
            Elara Central Command &amp; Control Ops
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Live PostGIS spatial dispatch mesh, bKash &amp; Nagad MFS payment reconciliation, and multi-vertical order orchestration.
          </p>

          {/* Backend Connection Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {loadingBackend ? "CONNECTING TO NESTJS ADMIN-SERVICE..." : `LIVE DB TELEMETRY: ${backendStats?.totalUsers || 0} USERS • ${backendStats?.totalProducts || 0} PRODUCTS • ${backendStats?.totalMerchants || 0} MERCHANTS`}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={resetDemoData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold transition flex items-center gap-1.5 min-h-[40px]"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Reset Seed Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAdminNotice("Emergency Fleet Weather Alert broadcast to 384 active riders across Dhaka North!");
              setTimeout(() => setAdminNotice(null), 4000);
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold transition shadow-md min-h-[40px]"
          >
            Broadcast Fleet Alert
          </button>
        </div>
      </div>

      {adminNotice && (
        <div className="p-4 rounded-2xl bg-purple-900/90 text-purple-100 border border-purple-700 text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>📢 {adminNotice}</span>
          <button onClick={() => setAdminNotice(null)} className="text-purple-300 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-ink/10 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total GMV (Today)</span>
          <div className="text-2xl sm:text-3xl font-black font-sans text-ink">
            ৳ {totalGMV.toLocaleString()}
          </div>
          <span className="text-xs font-mono text-emerald-600 font-bold">↑ 18.4% vs last week</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-ink/10 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Active Pipeline Orders</span>
          <div className="text-2xl sm:text-3xl font-black font-sans text-ink">
            {orders.length} Live
          </div>
          <span className="text-xs font-mono text-primary font-bold">100% on-time SLA</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-ink/10 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Fleet On Road</span>
          <div className="text-2xl sm:text-3xl font-black font-sans text-ink">
            384 Riders
          </div>
          <span className="text-xs font-mono text-emerald-600 font-bold">94% Fleet Utilization</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-ink/10 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">MFS Gateway Uptime</span>
          <div className="text-2xl sm:text-3xl font-black font-sans text-ink">
            99.98%
          </div>
          <span className="text-xs font-mono text-bkash font-bold">bKash &amp; Nagad Active</span>
        </div>
      </div>

      {/* Main Content: Orders Stream & PostGIS Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Orders Stream */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-ink/10 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Live Transaction Mesh
              </span>
              <h2 className="text-lg font-black font-sans text-ink">
                Super App Cross-Vertical Activity Feed
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Filter:</span>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-ink/15 text-xs font-mono font-bold bg-surface-low text-ink focus:outline-none focus:ring-1 focus:ring-primary min-h-[36px]"
              >
                <option value="all">All Zones (Dhaka + CTG)</option>
                <option value="dhaka-north">Dhaka North</option>
                <option value="dhaka-south">Dhaka South</option>
                <option value="chittagong">Chittagong</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-ink/10 hover:border-ink/20 bg-surface-low/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 border border-purple-500/20 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {order.id.split("-")[1]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-ink">{order.customerName}</span>
                      <span className="text-xs text-slate-500 font-mono">&bull; {order.merchantName}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "ON_THE_WAY"
                            ? "bg-blue-100 text-blue-800 animate-pulse"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                      <span>{order.items.map((i) => `${i.name} (x${i.qty})`).join(", ")}</span>
                      <span className="font-mono text-slate-400">&bull;</span>
                      <span className="font-mono font-bold text-ink">৳ {order.total.toLocaleString()}</span>
                      <span className="font-mono text-slate-400">&bull;</span>
                      <span className="text-[11px] font-mono text-slate-500">MFS: {order.paymentMethod.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/customer/track?orderId=${order.id}`}
                    className="px-3 py-1.5 rounded-xl border border-ink/15 hover:bg-white text-xs font-mono font-bold text-ink transition min-h-[36px] flex items-center gap-1"
                  >
                    <span>Telemetry</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: PostGIS Zones & Fleet Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-ink/10 p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                PostGIS Spatial Mesh
              </span>
              <h2 className="text-lg font-black font-sans text-ink">
                Dynamic Geofenced Clusters
              </h2>
            </div>

            <div className="space-y-3">
              {zones.map((zone, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-surface-low border border-ink/5 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-ink">{zone.name}</h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      {zone.count} Active Couriers in Mesh
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      zone.status === "Surging"
                        ? "bg-amber-100 text-amber-800 animate-pulse"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Projection: EPSG:4326</span>
              <span className="text-primary font-bold">10 Active Hubs</span>
            </div>
          </div>

          {/* Quick Workstation Jump for Demo Pair Programming */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
              Quick Role Simulation
            </span>
            <h3 className="text-base font-bold font-sans">
              Switch Workstation Context
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test how an order created by Rahim Ahmed in Marketplace flows instantly through Kacchi Bhai Kitchen KDS, Tanvir Hossain Rider radar, and Customer Telemetry.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/merchant"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-center border border-slate-700 transition"
              >
                🏪 Merchant KDS
              </Link>
              <Link
                href="/rider"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-center border border-slate-700 transition"
              >
                🛵 Rider Radar
              </Link>
              <Link
                href="/tasker"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-center border border-slate-700 transition"
              >
                🛠️ Tasker Suite
              </Link>
              <Link
                href="/customer/track"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-center border border-slate-700 transition"
              >
                📱 Live Telemetry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
