"use client";

import { useState } from "react";
import Link from "next/link";

export default function TaskerWithdrawPage() {
  const [balance, setBalance] = useState<number>(8420);
  const [amount, setAmount] = useState<string>("3000");
  const [method, setMethod] = useState<"BKASH" | "NAGAD" | "BANK">("BKASH");
  const [accountNumber, setAccountNumber] = useState<string>("01712-489201");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successTx, setSuccessTx] = useState<string | null>(null);

  const withdrawAmountNum = Number(amount) || 0;
  const flatFee = method === "BANK" ? 0 : 10;
  const netDisbursed = Math.max(0, withdrawAmountNum - flatFee);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmountNum < 500) {
      alert("Minimum withdrawal is ৳ 500.");
      return;
    }
    if (withdrawAmountNum > balance) {
      alert("Withdrawal amount cannot exceed available wallet balance.");
      return;
    }

    setOtpSent(true);
  };

  const handleConfirmWithdraw = () => {
    if (enteredOtp.length !== 4) {
      alert("Please enter the 4-digit SMS OTP.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBalance((prev) => prev - withdrawAmountNum);
      setSuccessTx(`TXN-BD-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Karigor Escrow Treasury
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              Instant MFS Cashout
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Withdraw JobTap Earnings
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/tasker/earnings"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#131927] hover:bg-white/10 text-slate-200 border border-white/10 transition"
          >
            Escrow Ledger &rarr;
          </Link>
        </div>
      </div>

      {/* Balance Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Available to Cash Out</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">৳ {balance.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 font-mono">Released from completed jobs</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">MFS Cashout Fee</span>
          <div className="text-2xl font-black text-white font-mono">৳ 10</div>
          <p className="text-[10px] text-slate-400 font-mono">Flat instant fee (Free for Bank)</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Daily Limit</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">৳ 25,000</div>
          <p className="text-[10px] text-slate-400 font-mono">2 withdrawals remaining today</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Linked MFS Account</span>
          <div className="text-sm font-bold text-white truncate mt-1">bKash 01712-***201</div>
          <p className="text-[10px] text-emerald-400 font-mono">Smart NID Verified</p>
        </div>
      </div>

      {!successTx ? (
        <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-white">Disbursement Channel & Amount</h2>

          {/* MFS Method Selection */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setMethod("BKASH");
                setAccountNumber("01712-489201");
              }}
              className={`p-3 rounded-2xl border text-center transition ${
                method === "BKASH"
                  ? "bg-[#D12053]/20 border-[#D12053] text-white"
                  : "bg-[#0B0F19] border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-bold text-xs">bKash MFS</div>
              <div className="text-[10px] text-slate-400 font-mono">Instant (৳10 fee)</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setMethod("NAGAD");
                setAccountNumber("01819-204918");
              }}
              className={`p-3 rounded-2xl border text-center transition ${
                method === "NAGAD"
                  ? "bg-[#F97316]/20 border-[#F97316] text-white"
                  : "bg-[#0B0F19] border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-bold text-xs">Nagad Pay</div>
              <div className="text-[10px] text-slate-400 font-mono">Instant (৳10 fee)</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setMethod("BANK");
                setAccountNumber("1501204892019 (BRAC Bank)");
              }}
              className={`p-3 rounded-2xl border text-center transition ${
                method === "BANK"
                  ? "bg-indigo-600/20 border-indigo-500 text-white"
                  : "bg-[#0B0F19] border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-bold text-xs">BEFTN Bank</div>
              <div className="text-[10px] text-slate-400 font-mono">Free (Next Bank Day)</div>
            </button>
          </div>

          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Withdrawal Amount (৳ BDT)
                </label>
                <input
                  type="number"
                  min={500}
                  max={balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-500 font-mono">Min ৳ 500 • Max ৳ 25,000</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Destination Number / Account
                </label>
                <input
                  type="text"
                  readOnly
                  value={accountNumber}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-slate-300 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono">Linked to your verified Smart NID</span>
              </div>
            </div>

            {/* Fee summary block */}
            <div className="p-3 bg-[#0B0F19] rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Total Net Disbursed to {method}:</span>
              <span className="text-emerald-400 font-bold text-sm">
                ৳ {netDisbursed.toLocaleString()} (After ৳{flatFee} fee)
              </span>
            </div>

            {!otpSent ? (
              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white rounded-xl font-black text-xs font-mono tracking-wide transition shadow-lg shadow-indigo-950/40"
              >
                REQUEST WITHDRAWAL OTP &rarr;
              </button>
            ) : (
              <div className="p-4 bg-[#0B0F19] rounded-2xl border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-300 font-bold font-mono">Enter 4-Digit Security SMS OTP</span>
                  <span className="text-slate-400 font-mono">Sent to 01712-***201</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••"
                    className="w-32 bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-center text-lg font-mono tracking-widest text-emerald-400 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleConfirmWithdraw}
                    disabled={enteredOtp.length !== 4 || isProcessing}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition disabled:opacity-50"
                  >
                    {isProcessing ? "Connecting MFS Rails..." : "AUTHORIZE CASH DISBURSEMENT"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="bg-[#131927] border border-emerald-500/30 rounded-3xl p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h2 className="text-lg font-black text-white">Withdrawal Processed Successfully!</h2>
          <p className="text-xs text-slate-300 font-mono">
            ৳ {netDisbursed} sent to your {method} ({accountNumber}). Reference: {successTx}
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSuccessTx(null);
                setOtpSent(false);
                setEnteredOtp("");
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-bold"
            >
              Done & Make Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
