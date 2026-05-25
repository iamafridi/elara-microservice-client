"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";

export default function AdminOrdersPage() {
  const { orders } = useWorkflow();
  const [filterModule, setFilterModule] = useState("all");
  const [search, setSearch] = useState("");

  const modules = ["all", "Food & Dining", "Daily Bazaar", "Express Courier", "JobTap Sheba"];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>Orders Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Unified Orders Stream
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time cross-module order aggregation across Dhaka, Chittagong, and Sylhet
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live WebSockets Connected</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {modules.map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => setFilterModule(mod)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                filterModule === mod
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {mod === "all" ? `All Streams (${orders.length})` : mod}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by Order ID or Zone..."
          className="w-full sm:w-64 h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition font-mono"
        />
      </div>

      {/* Orders Stream Table */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Order &amp; Module</span>
          <span>Customer &amp; Zone</span>
          <span>Assigned Rider / Status</span>
          <span className="text-right">Total (BDT)</span>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white text-sm">{order.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Food
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">
                {order.items.map((i) => `${i.name} (x${i.qty})`).join(", ")}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="font-bold text-slate-200">{order.customerName}</div>
              <div className="text-slate-500 text-[11px] font-mono">{order.customerAddress}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                <span className="material-symbols-outlined text-sm text-purple-400">two_wheeler</span>
                <span>{order.riderName || "Auto-dispatching..."}</span>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                order.status === "DELIVERED"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-purple-500/20 text-purple-300"
              }`}>
                {order.status}
              </span>
            </div>

            <div className="text-right sm:pl-4">
              <div className="font-mono font-bold text-sm text-white">৳ {order.total}</div>
              <span className="text-[10px] text-emerald-400 font-mono">bKash MFS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
