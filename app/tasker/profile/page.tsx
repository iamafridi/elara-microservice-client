"use client";

import { useState } from "react";
import Link from "next/link";

export default function TaskerProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
          Tasker Portfolio &amp; NID Trade Certification
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Government Smart NID and Bangladesh Technical Education Board (BTEB) verified credentials
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-xl shrink-0 shadow-md shadow-indigo-600/30">
            SM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Karigor Suman Miah</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                ✓ Master Pro Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              +880 1711-000004 • HVAC &amp; Electrical Specialist • Banani / Gulshan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Client Rating</span>
            <span className="font-bold text-amber-400">★ 4.9 (148 Reviews)</span>
          </div>
        </div>
      </div>

      {/* Verified Credentials */}
      <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
          Accredited Certifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Smart National ID (NID)</span>
            <div className="font-bold text-white font-mono">1988-2691-0492-0192</div>
            <span className="text-[10px] text-emerald-400 font-bold block">Election Commission Verified</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">BTEB Trade Diploma</span>
            <div className="font-bold text-white">Refrigeration &amp; Air Conditioning</div>
            <span className="text-[10px] text-indigo-300 font-bold block">Vocational Grade-1 (Dhaka Poly)</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Electrical License Board</span>
            <div className="font-bold text-white font-mono">ELB-ABC-84920</div>
            <span className="text-[10px] text-emerald-400 font-bold block">High Voltage Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-161 */
