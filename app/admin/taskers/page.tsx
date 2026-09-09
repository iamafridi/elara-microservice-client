"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";

interface TaskerItem {
  id: string;
  name: string;
  skills: string;
  rating: number;
  completedJobs: number;
  nidVerified: boolean;
  status: "ACTIVE" | "PENDING_NID" | "SUSPENDED";
}

const TASKERS: TaskerItem[] = [
  { id: "t1", name: "Suman Miah", skills: "HVAC Master Tech & Electrician", rating: 4.9, completedJobs: 148, nidVerified: true, status: "ACTIVE" },
  { id: "t2", name: "Habibur Rahman", skills: "Master Plumber & Pipefitter", rating: 4.8, completedJobs: 92, nidVerified: true, status: "ACTIVE" },
  { id: "t3", name: "Faruk Hossain", skills: "Home Deep Cleaning Specialist", rating: 4.7, completedJobs: 64, nidVerified: true, status: "ACTIVE" },
  { id: "t4", name: "Biplob Chandra", skills: "Appliance & Washing Machine Repair", rating: 4.6, completedJobs: 31, nidVerified: false, status: "PENDING_NID" },
];

export default function AdminTaskersPage() {
  const { shebaJobs } = useWorkflow();

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>JobTap Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Taskers &amp; JobTap Sheba Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Smart NID validation, BTEB vocational verification, and 30% advance escrow tribunal mediation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
            30% Escrow Protection Active
          </span>
        </div>
      </div>

      {/* Taskers Directory */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Tasker Professional</span>
          <span>Trade Skills</span>
          <span>Performance &amp; NID</span>
          <span className="text-right">Account Status</span>
        </div>

        {TASKERS.map((t) => (
          <div key={t.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 font-black flex items-center justify-center text-xs shrink-0">
                <span className="material-symbols-outlined text-lg">handyman</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-slate-400 text-[11px] font-mono">{t.completedJobs} jobs done</div>
              </div>
            </div>

            <div className="text-slate-300 font-medium">
              {t.skills}
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-amber-400 font-bold">★ {t.rating}</span>
              <span>•</span>
              <span className={t.nidVerified ? "text-emerald-400 font-bold" : "text-amber-400"}>
                {t.nidVerified ? "✓ Smart NID Verified" : "Pending NID"}
              </span>
            </div>

            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                t.status === "ACTIVE"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-300"
              }`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-167 */
