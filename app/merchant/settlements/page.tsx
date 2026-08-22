"use client";

import { useState } from "react";
import Link from "next/link";

interface SettlementRecord {
  id: string;
  date: string;
  amount: number;
  orderCount: number;
  bankAccount: string;
  status: "SETTLED" | "PROCESSING";
  reference: string;
}

const SETTLEMENT_HISTORY: SettlementRecord[] = [
  { id: "s1", date: "15 Oct 2026", amount: 42150, orderCount: 48, bankAccount: "BRAC Bank (..4001)", status: "SETTLED", reference: "BEFTN-261015-8941" },
  { id: "s2", date: "14 Oct 2026", amount: 39800, orderCount: 44, bankAccount: "BRAC Bank (..4001)", status: "SETTLED", reference: "BEFTN-261014-7820" },
  { id: "s3", date: "13 Oct 2026", amount: 51200, orderCount: 59, bankAccount: "BRAC Bank (..4001)", status: "SETTLED", reference: "BEFTN-261013-6490" },
  { id: "s4", date: "12 Oct 2026", amount: 36700, orderCount: 41, bankAccount: "BRAC Bank (..4001)", status: "SETTLED", reference: "BEFTN-261012-5120" },
  { id: "s5", date: "11 Oct 2026", amount: 48900, orderCount: 54, bankAccount: "BRAC Bank (..4001)", status: "SETTLED", reference: "BEFTN-261011-3891" },
];

export default function MerchantSettlementsPage() {
  const [balance, setBalance] = useState(37532);
  const [withdrawing, setWithdrawing] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleWithdrawal = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setSuccessNotice(`Dispatched instant BEFTN withdrawal request for ৳ ${balance.toLocaleString()} to Bangladesh Bank rails! Funds reflect in BRAC Bank account within 4 hours.`);
      setBalance(0);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Finance &amp; Settlements</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Daily Settlements &amp; BEFTN Bank Transfer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automatic clearing via Bangladesh Bank BEFTN rails • Zero settlement deduction fee
          </p>
        </div>

        <button
          type="button"
          onClick={handleWithdrawal}
          disabled={withdrawing || balance === 0}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
          <span>{withdrawing ? "Connecting to BEFTN..." : "Initiate Instant BEFTN Withdrawal &rarr;"}</span>
        </button>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {successNotice}</span>
          <button onClick={() => setSuccessNotice(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
            Available for Withdrawal
          </span>
          <div className="text-3xl font-black font-sans text-emerald-900">
            ৳ {balance.toLocaleString()}
          </div>
          <span className="text-xs font-mono text-emerald-700">Ready for BEFTN Transfer</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Today&apos;s Gross Volume
          </span>
          <div className="text-3xl font-black font-sans text-slate-900">
            ৳ 48,250
          </div>
          <span className="text-xs font-mono text-slate-500">52 orders completed today</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Next Automatic Batch
          </span>
          <div className="text-3xl font-black font-sans text-indigo-600">
            02:00 AM
          </div>
          <span className="text-xs font-mono text-slate-500">Nightly automated clearing</span>
        </div>
      </div>

      {/* Linked Bank Account Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Linked Bangladesh Bank &amp; MFS Account</h2>
            <p className="text-xs text-slate-500">Settlements clear directly to your principal business account</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200">
            ✓ Verified Active
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Bank Name:</span>
            <span className="font-bold text-slate-900">BRAC Bank Ltd. (Gulshan Branch)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Account Name:</span>
            <span className="font-bold text-slate-900">Kacchi Bhai Hospitality Group Ltd.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Account Number:</span>
            <span className="font-bold text-slate-900">1502-204918204-001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Routing Number:</span>
            <span className="font-bold text-slate-900">060271829</span>
          </div>
        </div>
      </div>

      {/* Settlement History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
            Recent Settlement Payout History
          </h2>
          <span className="text-xs text-slate-400 font-mono">Last 5 banking days</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {SETTLEMENT_HISTORY.map((rec) => (
            <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{rec.date}</span>
                  <span className="font-mono text-[10px] text-slate-400">({rec.reference})</span>
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {rec.orderCount} orders • Deposited to {rec.bankAccount}
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-sm text-slate-900 font-sans">৳ {rec.amount.toLocaleString()}</div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700">
                  {rec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* elara-stage-141 */
