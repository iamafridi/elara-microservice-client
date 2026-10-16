"use client";

import { useState } from "react";
import Link from "next/link";

export default function RiderProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
          Rider Profile &amp; BRTA Fleet KYC
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Verified Bangladesh Road Transport Authority (BRTA) license &amp; motorcycle bluebook documentation
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center text-xl shrink-0 shadow-md shadow-emerald-600/30">
            TH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Tanvir Hossain</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                ✓ Tier-1 Fleet Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              +880 1911-778899 • Member since May 2025 • Banani Zonal Hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Lifetime Trips</span>
            <span className="font-bold text-white">542</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Rider Rating</span>
            <span className="font-bold text-amber-400">★ 4.9</span>
          </div>
        </div>
      </div>

      {/* Vehicle & BRTA Documentation */}
      <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
          Verified Fleet Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">BRTA Motorcycle License</span>
            <div className="font-bold text-white">DL-DH-0918294</div>
            <span className="text-[10px] text-emerald-400 font-bold block">Valid until 2030</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Vehicle Bluebook</span>
            <div className="font-bold text-white font-mono">Dhaka Metro-Ha 48-1920</div>
            <span className="text-[10px] text-slate-400 font-mono block">Yamaha FZ-X (149cc)</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Smart NID Verification</span>
            <div className="font-bold text-white font-mono">9812-4019-2810</div>
            <span className="text-[10px] text-emerald-400 font-bold block">Verified on EC Server</span>
          </div>
        </div>
      </div>
    </div>
  );
}
