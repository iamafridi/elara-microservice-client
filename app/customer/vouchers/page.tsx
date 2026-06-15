"use client";

import { useState } from "react";
import Link from "next/link";

interface Voucher {
  id: string;
  code: string;
  title: string;
  discount: string;
  minSpend: number;
  category: string;
  expiry: string;
  terms: string;
}

const AVAILABLE_VOUCHERS: Voucher[] = [
  {
    id: "v1",
    code: "ELARA100",
    title: "1-Tap Welcome Gift",
    discount: "৳ 100 OFF",
    minSpend: 500,
    category: "All Food & Bazaar",
    expiry: "Valid till 30 Nov 2026",
    terms: "Applicable on orders above ৳ 500 with bKash/Nagad/COD.",
  },
  {
    id: "v2",
    code: "EIDMUBARAK",
    title: "Festive Feast Discount",
    discount: "৳ 150 OFF",
    minSpend: 800,
    category: "Biryani & Catering",
    expiry: "Valid till 25 Oct 2026",
    terms: "Valid on Sultan's Dine, Kacchi Bhai, and Grand Nawab orders.",
  },
  {
    id: "v3",
    code: "FREESHIP",
    title: "Zero Delivery Fee",
    discount: "FREE DELIVERY",
    minSpend: 400,
    category: "Daily Bazaar Fresh",
    expiry: "Valid till 15 Nov 2026",
    terms: "Waives ৳ 60 delivery charge across Gulshan, Banani, and Baridhara.",
  },
  {
    id: "v4",
    code: "SHEBA50",
    title: "Home Appliance Repair Bonus",
    discount: "৳ 200 OFF",
    minSpend: 1000,
    category: "JobTap Home Sheba",
    expiry: "Valid till 31 Dec 2026",
    terms: "Valid on AC Servicing, Electrical, and Plumbing work.",
  },
];

export default function CustomerVouchersPage() {
  const [vouchers] = useState<Voucher[]>(AVAILABLE_VOUCHERS);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemInput, setRedeemInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setToast(`Coupon code ${code} copied to clipboard! Paste at checkout.`);
    setTimeout(() => {
      setCopiedCode(null);
      setToast(null);
    }, 3000);
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemInput.trim()) return;
    setToast(`Code "${redeemInput.toUpperCase()}" added to your saved coupon wallet!`);
    setRedeemInput("");
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
          Vouchers &amp; Promo Discounts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Save on food delivery, fresh fish bazaar, and JobTap home sheba across Dhaka metro
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Redeem Voucher Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Redeem Gift Card or Corporate Promo Code
        </h2>
        <form onSubmit={handleRedeem} className="flex gap-2">
          <input
            type="text"
            required
            value={redeemInput}
            onChange={(e) => setRedeemInput(e.target.value)}
            placeholder="Enter promotional or corporate code..."
            className="flex-1 h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs uppercase placeholder-slate-400 focus:bg-white focus:outline-none focus:border-primary transition"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Redeem to Wallet
          </button>
        </form>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vouchers.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-200 transition relative overflow-hidden"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200">
                  {v.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{v.expiry}</span>
              </div>

              <div>
                <div className="text-2xl font-black font-sans text-slate-900">{v.discount}</div>
                <h3 className="font-bold text-sm text-slate-800 mt-0.5">{v.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{v.terms}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between">
              <div className="font-mono font-bold text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-800 border border-slate-200">
                {v.code}
              </div>
              <button
                type="button"
                onClick={() => handleCopy(v.code)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-xs">
                  {copiedCode === v.code ? "done" : "content_copy"}
                </span>
                <span>{copiedCode === v.code ? "Copied" : "Copy Code"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
