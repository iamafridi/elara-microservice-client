"use client";

import { useState } from "react";
import Link from "next/link";

interface TripEarning {
  id: string;
  time: string;
  orderId: string;
  baseFare: number;
  surge: number;
  tip: number;
  total: number;
}

const TRIPS: TripEarning[] = [
  { id: "t1", time: "01:45 PM", orderId: "#ORD-4821", baseFare: 90, surge: 35, tip: 20, total: 145 },
  { id: "t2", time: "12:30 PM", orderId: "#ORD-4819", baseFare: 80, surge: 25, tip: 0, total: 105 },
  { id: "t3", time: "11:15 AM", orderId: "#ORD-4815", baseFare: 95, surge: 0, tip: 50, total: 145 },
  { id: "t4", time: "10:05 AM", orderId: "#ORD-4810", baseFare: 75, surge: 20, tip: 10, total: 105 },
];

export default function RiderEarningsPage() {
  const [balance, setBalance] = useState(1850);
  const [withdrawing, setWithdrawing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleCashout = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setToast(`Successfully transferred ৳ ${balance} to your bKash wallet (+880 1911-778899)! TrxID: BK-261016-89412`);
      setBalance(0);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            Daily Earnings &amp; Instant Cashout
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            1-tap instant payout to your verified bKash or Nagad wallet • Zero cashout deduction
          </p>
        </div>

        <button
          type="button"
          onClick={handleCashout}
          disabled={withdrawing || balance === 0}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-pink-600/30 transition flex items-center gap-2 self-start sm:self-auto font-mono"
        >
          <span>{withdrawing ? "Transferring via bKash API..." : "Instant bKash Cashout &rarr;"}</span>
        </button>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Earnings Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Available Balance</span>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-1">৳ {balance}</div>
          <span className="text-[11px] text-slate-400 font-mono">Linked bKash: +880 1911-778899</span>
        </div>

        <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Today&apos;s Completed Trips</span>
          <div className="text-3xl font-black font-mono text-white mt-1">12 Trips</div>
          <span className="text-[11px] text-emerald-400 font-mono">▲ ৳ 350 Surge bonus earned</span>
        </div>

        <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Customer Tips</span>
          <div className="text-3xl font-black font-mono text-amber-400 mt-1">৳ 180</div>
          <span className="text-[11px] text-slate-400 font-mono">100% credited to rider</span>
        </div>
      </div>

      {/* Trips Ledger */}
      <div className="bg-[#0F1422] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Trip Time &amp; Order</span>
          <span>Fare + Surge + Tip</span>
          <span className="text-right">Rider Net Earning</span>
        </div>

        {TRIPS.map((trip) => (
          <div key={trip.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition text-xs font-mono">
            <div>
              <div className="font-bold text-white">{trip.orderId}</div>
              <div className="text-slate-400 text-[11px]">{trip.time}</div>
            </div>

            <div className="text-slate-300">
              ৳ {trip.baseFare} + <span className="text-purple-400">৳ {trip.surge} surge</span> {trip.tip > 0 && <span className="text-amber-400">+ ৳ {trip.tip} tip</span>}
            </div>

            <div className="font-bold text-sm text-emerald-400 text-right">
              ৳ {trip.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
