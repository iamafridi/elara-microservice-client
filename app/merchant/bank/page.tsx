"use client";

import { useState } from "react";
import Link from "next/link";

export default function MerchantBankPage() {
  const [bankName, setBankName] = useState("BRAC Bank Limited");
  const [branchName, setBranchName] = useState("Banani Branch, Road 11");
  const [accountName, setAccountName] = useState("Kacchi Bhai Banani Catering Ltd.");
  const [accountNumber, setAccountNumber] = useState("1501-2048-9104-0001");
  const [routingNumber, setRoutingNumber] = useState("060260481");
  const [otpCode, setOtpCode] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpModal(true);
    setToast("Security OTP sent to merchant registered mobile (01819-***567)");
    setTimeout(() => setToast(null), 3500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpModal(false);
    setToast("BEFTN Settlement Bank details updated successfully! Test ৳ 1 credit dispatched.");
    setOtpCode("");
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/merchant/settlements" className="hover:text-orange-600">Finance &amp; Settlements</Link>
            <span>/</span>
            <span className="text-orange-600 font-bold">Bank Rails</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            BEFTN Settlement Bank Account
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure direct clearing bank details via Bangladesh Bank Electronic Funds Transfer Network (BEFTN)
          </p>
        </div>

        <Link
          href="/merchant/settlements"
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition self-start sm:self-auto"
        >
          &larr; Settlement Ledger
        </Link>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Current Linked Bank Account Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md space-y-4 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center font-bold text-xl">
              <span className="material-symbols-outlined text-2xl">account_balance</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                Primary BEFTN Clearing Account
              </span>
              <h2 className="text-lg font-bold text-white">{bankName}</h2>
              <p className="text-xs text-slate-300 font-mono">{branchName}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
            Active for Payouts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2 border-t border-white/10">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Account Title</span>
            <span className="font-bold text-white">{accountName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Account Number</span>
            <span className="font-bold text-emerald-300">{accountNumber}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Bangladesh Bank Routing No.</span>
            <span className="font-bold text-white">{routingNumber}</span>
          </div>
        </div>
      </div>

      {/* Update Account Form */}
      <form onSubmit={handleRequestOtp} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Modify Settlement Bank Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Bank Name (Scheduled Commercial)</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            >
              <option value="BRAC Bank Limited">BRAC Bank Limited</option>
              <option value="The City Bank Limited">The City Bank Limited</option>
              <option value="Eastern Bank PLC (EBL)">Eastern Bank PLC (EBL)</option>
              <option value="Islami Bank Bangladesh PLC">Islami Bank Bangladesh PLC</option>
              <option value="Dutch-Bangla Bank PLC">Dutch-Bangla Bank PLC</option>
              <option value="Mutual Trust Bank Limited">Mutual Trust Bank Limited</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Branch Name</label>
            <input
              type="text"
              required
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Account Holder Title (Exact Match with Trade License)</label>
            <input
              type="text"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Bank Account Number (13–17 Digits)</label>
            <input
              type="text"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-bold text-slate-700 block">Bangladesh Bank 9-Digit Routing Number</label>
            <input
              type="text"
              required
              maxLength={9}
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
            <span className="text-[10px] text-slate-400">Required for automated midnight BEFTN clearing.</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Authorize Bank Change &rarr;
          </button>
        </div>
      </form>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">lock_clock</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Security Verification</h3>
              <p className="text-xs text-slate-500">
                Enter the 6-digit verification code sent to your registered partner phone.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="e.g. 849102"
                className="w-full h-12 text-center font-mono font-black text-xl tracking-widest rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-orange-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-bold"
                >
                  Confirm Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
