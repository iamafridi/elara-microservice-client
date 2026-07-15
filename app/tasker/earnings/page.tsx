"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";

export default function TaskerEarningsPage() {
  const { currentUser } = useWorkflow();
  const [balance, setBalance] = useState(currentUser.balanceBDT || 3450);
  const [withdrawing, setWithdrawing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleCashout = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setToast(`Dispatched ৳ ${balance} withdrawal to your linked bKash wallet (+880 1711-000004)!`);
      setBalance(0);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            Tasker Escrow Wallet &amp; Payouts
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Instant withdrawal for completed jobs • 30% advance escrow guaranteed by Elara Shield
          </p>
        </div>

        <button
          type="button"
          onClick={handleCashout}
          disabled={withdrawing || balance === 0}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition flex items-center gap-2 self-start sm:self-auto font-mono"
        >
          <span>{withdrawing ? "Connecting to bKash..." : "Cashout Escrow Balance &rarr;"}</span>
        </button>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Available Wallet Balance</span>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-1">৳ {balance}</div>
          <span className="text-[11px] text-slate-400 font-mono">100% unlocked funds</span>
        </div>

        <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Active Escrow Float</span>
          <div className="text-3xl font-black font-mono text-indigo-400 mt-1">৳ 2,100</div>
          <span className="text-[11px] text-slate-400 font-mono">Held in 2 ongoing jobs</span>
        </div>

        <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Total Lifetime Earnings</span>
          <div className="text-3xl font-black font-mono text-white mt-1">৳ 94,800</div>
          <span className="text-[11px] text-emerald-400 font-mono">148 completed jobs</span>
        </div>
      </div>
    </div>
  );
}
