"use client";

import { useState } from "react";
import Link from "next/link";

export default function CustomerLoyaltyPage() {
  const [stars, setStars] = useState(1420);
  const nextTierStars = 2000;
  const progress = (stars / nextTierStars) * 100;

  const [toast, setToast] = useState<string | null>(null);

  const handleConvertCashback = () => {
    if (stars < 500) return;
    const bdtAmount = Math.floor(stars / 10);
    setStars((prev) => prev - bdtAmount * 10);
    setToast(`Successfully converted ${bdtAmount * 10} Stars into ৳ ${bdtAmount.toLocaleString()} BDT Elara Pay wallet balance!`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
          Elara Stars &amp; VIP Loyalty Club
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Earn Stars on every food, fresh bazaar, courier, and sheba order. Redeem for instant BDT wallet credits.
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* VIP Tier Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-6 relative overflow-hidden border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
              <span>★ Gold Tier Member</span>
              <span className="opacity-60">•</span>
              <span>2.5% Cashback Multiplier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white">
              {stars.toLocaleString()} <span className="text-amber-400 text-xl font-mono">Stars</span>
            </h2>
            <p className="text-xs text-slate-400">
              Equivalent to <span className="font-mono text-emerald-400 font-bold">৳ {Math.floor(stars / 10).toLocaleString()} BDT</span> in direct wallet balance
            </p>
          </div>

          <button
            type="button"
            onClick={handleConvertCashback}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition shadow-md self-start sm:self-auto"
          >
            Convert Stars to ৳ BDT &rarr;
          </button>
        </div>

        {/* Progress to Platinum Tier */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Progress to Platinum VIP Tier:</span>
            <span className="text-white font-bold">{stars} / {nextTierStars} Stars</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Earn 580 more stars to unlock 0% delivery fees on all orders and Priority Zonal Dispatch.
          </p>
        </div>
      </div>

      {/* Tier Perks Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            tier: "Silver Club",
            stars: "0 - 999",
            cashback: "1% on all orders",
            delivery: "Standard dispatch fee",
            support: "Standard helpdesk",
            active: false,
          },
          {
            tier: "Gold VIP",
            stars: "1,000 - 1,999",
            cashback: "2.5% on all orders",
            delivery: "50% off courier fee",
            support: "Priority phone desk",
            active: true,
          },
          {
            tier: "Platinum Elite",
            stars: "2,000+",
            cashback: "5% on all orders",
            delivery: "100% Free Delivery",
            support: "24/7 Dedicated Account Rep",
            active: false,
          },
        ].map((t) => (
          <div
            key={t.tier}
            className={`p-5 rounded-2xl border transition space-y-4 ${
              t.active
                ? "bg-white border-amber-300 shadow-md ring-2 ring-amber-200"
                : "bg-white border-slate-200 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">{t.tier}</h3>
              {t.active && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                  Current
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Qualification:</span>
                <span className="font-mono font-bold text-slate-800">{t.stars} Stars</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">MFS Cashback:</span>
                <span className="font-bold text-emerald-600">{t.cashback}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Delivery Perk:</span>
                <span className="font-bold text-slate-800">{t.delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Support Desk:</span>
                <span className="text-slate-800">{t.support}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
