"use client";

import { useState } from "react";
import Link from "next/link";

interface PayoutBatch {
  id: string;
  recipientType: "MERCHANT" | "RIDER" | "TASKER";
  recipientName: string;
  amount: number;
  bankOrMfs: string;
  clearingRail: "BEFTN" | "BKASH_DISBURSE" | "NAGAD_DISBURSE";
  status: "APPROVED" | "PENDING_APPROVAL";
}

const BATCHES: PayoutBatch[] = [
  { id: "pb1", recipientType: "MERCHANT", recipientName: "Kacchi Bhai — Banani Dokan", amount: 37532, bankOrMfs: "BRAC Bank (..4001)", clearingRail: "BEFTN", status: "PENDING_APPROVAL" },
  { id: "pb2", recipientType: "RIDER", recipientName: "Tanvir Hossain (Rider)", amount: 1850, bankOrMfs: "bKash (+880 1911-778899)", clearingRail: "BKASH_DISBURSE", status: "APPROVED" },
  { id: "pb3", recipientType: "MERCHANT", recipientName: "Sultan's Dine — Gulshan 2", amount: 64200, bankOrMfs: "City Bank (..8102)", clearingRail: "BEFTN", status: "PENDING_APPROVAL" },
  { id: "pb4", recipientType: "TASKER", recipientName: "Suman Miah (AC Service)", amount: 2400, bankOrMfs: "Nagad (+880 1711-000004)", clearingRail: "NAGAD_DISBURSE", status: "APPROVED" },
];

export default function AdminFinancePage() {
  const [batches, setBatches] = useState<PayoutBatch[]>(BATCHES);
  const [toast, setToast] = useState<string | null>(null);

  const handleApprove = (id: string, name: string, amount: number) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "APPROVED" as const } : b))
    );
    setToast(`Approved ৳ ${amount.toLocaleString()} payout for ${name}. Dispatched to Bangladesh Bank BEFTN clearing batch.`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>Finance &amp; Treasury</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Finance &amp; Automated BEFTN Payouts
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Bangladesh Bank BEFTN batch approvals, bKash bulk disbursement, and 15% platform commission ledger
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
            BEFTN Clearing Window: 02:00 AM
          </span>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Finance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Pending BEFTN Batches</span>
          <div className="text-3xl font-black font-mono text-white mt-1">৳ 101,732</div>
          <span className="text-[11px] text-amber-400 font-mono">2 batches awaiting sign-off</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Platform Net Commission (15%)</span>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-1">৳ 127,380</div>
          <span className="text-[11px] text-slate-400">Month-to-date treasury revenue</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">30% Escrow Float Held</span>
          <div className="text-3xl font-black font-mono text-purple-400 mt-1">৳ 48,900</div>
          <span className="text-[11px] text-slate-400">Locked in JobTap escrow contract</span>
        </div>
      </div>

      {/* Payout Batches Table */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Beneficiary &amp; Entity</span>
          <span>Destination &amp; Rail</span>
          <span>Amount (BDT)</span>
          <span className="text-right">Action</span>
        </div>

        {batches.map((b) => (
          <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{b.recipientName}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-slate-300">
                  {b.recipientType}
                </span>
              </div>
              <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                Batch: {b.id}
              </div>
            </div>

            <div className="space-y-0.5 font-mono text-[11px]">
              <div className="text-slate-200">{b.bankOrMfs}</div>
              <div className="text-purple-400 font-bold">{b.clearingRail}</div>
            </div>

            <div className="font-mono font-bold text-sm text-white">
              ৳ {b.amount.toLocaleString()}
            </div>

            <div className="text-right">
              {b.status === "PENDING_APPROVAL" ? (
                <button
                  type="button"
                  onClick={() => handleApprove(b.id, b.recipientName, b.amount)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs shadow-xs transition"
                >
                  Authorize BEFTN &rarr;
                </button>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ✓ Transferred
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-215 */
