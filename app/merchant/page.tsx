"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";

export default function MerchantDashboardPage() {
  const { orders } = useWorkflow();
  const [holidayMode, setHolidayMode] = useState(false);
  const [reprintNotice, setReprintNotice] = useState<string | null>(null);

  const activeOrdersCount = orders.filter(
    (o) => o.status === "PLACED" || o.status === "PREPARING" || o.status === "READY_FOR_PICKUP"
  ).length;

  const handleReprint = () => {
    setReprintNotice("Dispatched print job to ESC/POS 80mm Thermal Printer (#EL-98241)...");
    setTimeout(() => setReprintNotice(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Home Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Elara Dokan — Merchant Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Today&apos;s kitchen performance at a glance with quick actions &amp; Bangladesh Bank BEFTN rails
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/merchant/kds"
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center gap-2 transition"
          >
            <span className="material-symbols-outlined text-sm">point_of_sale</span>
            <span>Open Kitchen KDS ({activeOrdersCount})</span>
          </Link>
        </div>
      </div>

      {reprintNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-base">print</span>
          <span>{reprintNotice}</span>
        </div>
      )}

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Today&apos;s Orders</span>
            <span className="material-symbols-outlined text-orange-600 text-lg">receipt_long</span>
          </div>
          <div className="text-3xl font-black font-sans text-slate-900 mt-2">
            52
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">▲ 8 vs yesterday (Banani Hub)</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Today&apos;s Gross Sales</span>
            <span className="material-symbols-outlined text-emerald-600 text-lg">payments</span>
          </div>
          <div className="text-3xl font-black font-sans text-slate-900 mt-2">
            ৳ 48,250
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Net ৳ 41,012 (after 15% commission)</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Avg Kitchen Prep Time</span>
            <span className="material-symbols-outlined text-sky-600 text-lg">timer</span>
          </div>
          <div className="text-3xl font-black font-sans text-slate-900 mt-2">
            14 min
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Target ≤ 15 min (Optimal)</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Store Status</span>
            <span className="material-symbols-outlined text-purple-600 text-lg">storefront</span>
          </div>
          <div className="text-3xl font-black font-sans text-emerald-600 mt-2">
            {holidayMode ? "HOLIDAY" : "OPEN"}
          </div>
          <span className="text-[11px] text-slate-500">Closes at 11:30 PM tonight</span>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/merchant/kds"
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/50 hover:shadow-md transition group text-left space-y-1.5"
        >
          <span className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">point_of_sale</span>
          </span>
          <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
            Kitchen KDS POS
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">Live Kanban order columns</p>
        </Link>

        <Link
          href="/merchant/menu"
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/50 hover:shadow-md transition group text-left space-y-1.5"
        >
          <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">restaurant_menu</span>
          </span>
          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
            Menu &amp; 86 Stock
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">Instant out-of-stock toggle</p>
        </Link>

        <Link
          href="/merchant/settlements"
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/50 hover:shadow-md transition group text-left space-y-1.5"
        >
          <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">account_balance</span>
          </span>
          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Settlements &amp; BEFTN
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">৳ 37,532 ready for withdrawal</p>
        </Link>

        <Link
          href="/merchant/printer"
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/50 hover:shadow-md transition group text-left space-y-1.5"
        >
          <span className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-xl">print</span>
          </span>
          <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
            Thermal Printer
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">ESC/POS 80mm driver settings</p>
        </Link>
      </div>

      {/* Quick Actions & Live Kitchen Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-base text-slate-900">Operational Quick Actions</h2>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">Holiday Mode / Close Store</div>
                <div className="text-[11px] text-slate-500">Pause all incoming orders instantly without deleting catalog</div>
              </div>
              <button
                type="button"
                onClick={() => setHolidayMode(!holidayMode)}
                className={`px-3 py-1.5 rounded-xl font-bold font-mono transition text-[11px] ${
                  holidayMode
                    ? "bg-rose-100 text-rose-800"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {holidayMode ? "Store Paused" : "Activate 86"}
              </button>
            </div>

            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">Reprint Last Customer Receipt</div>
                <div className="text-[11px] text-slate-500">#EL-98241 • Basmati Kacchi Platter • ESC/POS 80mm</div>
              </div>
              <button
                type="button"
                onClick={handleReprint}
                className="px-3 py-1.5 rounded-xl font-bold font-mono bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-[11px]"
              >
                Reprint Docket
              </button>
            </div>

            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">Add Today&apos;s Special Dish</div>
                <div className="text-[11px] text-slate-500">Pin dish to top of Gulshan / Banani discovery feed (৳0)</div>
              </div>
              <Link
                href="/merchant/menu/new"
                className="px-3 py-1.5 rounded-xl font-bold font-mono bg-orange-50 text-orange-600 hover:bg-orange-100 transition text-[11px]"
              >
                Create Dish &rarr;
              </Link>
            </div>

            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">Merchant Partner Priority Chat</div>
                <div className="text-[11px] text-slate-500">Dedicated Bangladesh support team • Avg reply 2 min</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Online Now
              </span>
            </div>
          </div>
        </div>

        {/* Live Active Kitchen Queue Preview */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900">Active Kitchen Stream</h2>
              <p className="text-xs text-slate-500">Live order queue synced with rider dispatch</p>
            </div>
            <Link
              href="/merchant/kds"
              className="text-xs font-mono font-bold text-orange-600 hover:underline"
            >
              Full KDS &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-slate-900">{order.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-100 text-orange-800">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-slate-500 truncate mt-0.5">
                    {order.items.map((i) => `${i.name} (x${i.qty})`).join(", ")}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900">৳ {order.total}</div>
                  <div className="text-[10px] font-mono text-slate-400">{order.items.length} items</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/merchant/orders"
              className="text-xs font-mono font-bold text-slate-600 hover:text-slate-900 hover:underline"
            >
              View all orders &amp; customer addresses &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Offline Resiliency Banner */}
      <div className="p-4 rounded-2xl border-l-4 border-l-indigo-600 bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-indigo-600 text-xl">cloud_sync</span>
          <div>
            <span className="font-bold text-slate-900">Local-First Kitchen Buffer Active:</span>{" "}
            <span className="text-slate-600">
              Orders continue to chime, print dockets, and buffer locally during broadband fluctuations, synchronizing to PostgreSQL 15 automatically when the socket reconnects.
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full shrink-0">
          Sync Engine v2.4
        </span>
      </div>
    </div>
  );
}

/* elara-stage-206 */
