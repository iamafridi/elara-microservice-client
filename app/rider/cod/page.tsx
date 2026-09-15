"use client";

import { useState } from "react";
import Link from "next/link";

export default function RiderCodPage() {
  const [cashInHand, setCashInHand] = useState(4650);
  const [depositCode, setDepositCode] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const maxCodLimit = 8000;
  const percentage = (cashInHand / maxCodLimit) * 100;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(`Deposit token ${depositCode} verified by Banani Hub Cashier! ৳ ${cashInHand} reconciled.`);
    setCashInHand(0);
    setDepositCode("");
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
          COD Cash-in-Hand &amp; Hub Deposits
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Track collected Cash on Delivery payments and deposit at Dhaka Zonal Hubs
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* COD Limit Gauge */}
      <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider">Cash-in-Hand Floating:</span>
          <span className="text-white font-bold text-sm">৳ {cashInHand.toLocaleString()} / ৳ {maxCodLimit.toLocaleString()}</span>
        </div>

        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 80 ? "bg-rose-500" : percentage > 50 ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400">
          When cash-in-hand reaches ৳ 8,000, new COD trips pause until physical deposit at a Zonal Hub.
        </p>
      </div>

      {/* Zonal Hub Deposit Form */}
      <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
          Reconcile Physical Cash Deposit at Dhaka Hub
        </h2>

        <form onSubmit={handleDeposit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 block">Select Receiving Hub</label>
            <select className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500">
              <option value="banani" className="bg-slate-900">Banani Hub — Plot 42, Road 11 (Open until 11 PM)</option>
              <option value="gulshan" className="bg-slate-900">Gulshan-2 Hub — Pink City B1 (Open 24/7)</option>
              <option value="old_dhaka" className="bg-slate-900">Old Dhaka Hub — Nazimuddin Road (Open until 10 PM)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 block">Hub Cashier 6-Digit Verification Token</label>
            <input
              type="text"
              required
              maxLength={6}
              value={depositCode}
              onChange={(e) => setDepositCode(e.target.value)}
              placeholder="e.g. 849102"
              className="w-full h-10 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={cashInHand === 0}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition font-mono"
          >
            Confirm Physical Deposit &amp; Clear COD Balance &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}

/* elara-stage-175 */
