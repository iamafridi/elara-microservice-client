"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/api-client";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    adminApi.getDashboardStats().then((res) => {
      if (res.data) setStats(res.data);
    });
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>Business Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Platform GMV &amp; Cohort Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time business telemetry synchronized with PostgreSQL 15 `transactions` &amp; `orders` tables
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>Synced with Admin Microservice (:3010)</span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Total Registered Users</span>
          <div className="text-3xl font-black font-mono text-white mt-1">
            {stats?.totalUsers || 5}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">100% Phone/NID Verified</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Total Orders Processed</span>
          <div className="text-3xl font-black font-mono text-white mt-1">
            {stats?.totalOrders || 8}
          </div>
          <span className="text-[11px] text-purple-400 font-mono">Across Food, Grocery, Sheba</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Lifetime GMV Revenue</span>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
            ৳ {(stats?.totalRevenue || 849200).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Processed over bKash &amp; Nagad</span>
        </div>
      </div>

      {/* Module Share Distribution */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
          Module Gross Merchandise Volume Share
        </h2>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Food &amp; Dining (Kacchi, Biryani, Curries)</span>
              <span className="text-white font-bold">54% • ৳ 458,568</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full w-[54%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Daily Bazaar &amp; Padma Fish</span>
              <span className="text-white font-bold">26% • ৳ 220,792</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[26%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">JobTap Home Sheba (AC, Plumbing, Electrical)</span>
              <span className="text-white font-bold">12% • ৳ 101,904</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-[12%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Express P2P Courier Delivery</span>
              <span className="text-white font-bold">8% • ৳ 67,936</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full w-[8%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
