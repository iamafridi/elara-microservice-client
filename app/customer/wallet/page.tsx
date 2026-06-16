"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  title: string;
  method: string;
  amount: number;
  date: string;
  status: "COMPLETED" | "PENDING";
}

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "TXN-829104",
    type: "credit",
    title: "bKash Instant Reload",
    method: "bKash (01712-***201)",
    amount: 3000,
    date: "Today, 01:15 PM",
    status: "COMPLETED",
  },
  {
    id: "TXN-829098",
    type: "debit",
    title: "Kacchi Bhai Banani Order #ord-banani-101",
    method: "Elara Pay 1-Tap",
    amount: 885,
    date: "Today, 12:40 PM",
    status: "COMPLETED",
  },
  {
    id: "TXN-828941",
    type: "credit",
    title: "10% Eid-ul-Fitr Cashback",
    method: "Elara Promotion Bonus",
    amount: 150,
    date: "14 Oct 2026",
    status: "COMPLETED",
  },
  {
    id: "TXN-828710",
    type: "debit",
    title: "Daily Bazaar — Fresh River Hilsa",
    method: "Elara Pay 1-Tap",
    amount: 1450,
    date: "12 Oct 2026",
    status: "COMPLETED",
  },
  {
    id: "TXN-828503",
    type: "credit",
    title: "Nagad Wallet Transfer",
    method: "Nagad (01819-***567)",
    amount: 2500,
    date: "10 Oct 2026",
    status: "COMPLETED",
  },
];

export default function CustomerWalletPage() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(4850);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [topupAmount, setTopupAmount] = useState<number>(1000);
  const [selectedGateway, setSelectedGateway] = useState<"bkash" | "nagad" | "card">("bkash");
  const [toast, setToast] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Send Money State
  const [sendRecipient, setSendRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendNotes, setSendNotes] = useState("");

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    if (topupAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newTxn: WalletTransaction = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        type: "credit",
        title: `${selectedGateway.toUpperCase()} Top-Up`,
        method: selectedGateway === "bkash" ? "bKash Direct" : selectedGateway === "nagad" ? "Nagad Direct" : "BRAC Bank Card",
        amount: topupAmount,
        date: "Just now",
        status: "COMPLETED",
      };

      setBalance((prev) => prev + topupAmount);
      setTransactions([newTxn, ...transactions]);
      setIsProcessing(false);
      setToast(`৳ ${topupAmount.toLocaleString()} BDT successfully loaded via ${selectedGateway.toUpperCase()}!`);
      setTimeout(() => setToast(null), 4000);
    }, 1000);
  };

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(sendAmount);
    if (!amountNum || amountNum <= 0 || amountNum > balance) {
      alert("Invalid transfer amount or insufficient wallet balance!");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const newTxn: WalletTransaction = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        type: "debit",
        title: `P2P Transfer to ${sendRecipient}`,
        method: "Elara Contact Transfer",
        amount: amountNum,
        date: "Just now",
        status: "COMPLETED",
      };

      setBalance((prev) => prev - amountNum);
      setTransactions([newTxn, ...transactions]);
      setIsProcessing(false);
      setToast(`৳ ${amountNum.toLocaleString()} BDT sent instantly to ${sendRecipient}!`);
      setSendRecipient("");
      setSendAmount("");
      setSendNotes("");
      setTimeout(() => setToast(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
          Elara Pay &amp; Digital BDT Wallet
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Zero-fee bKash and Nagad reload, instant 1-tap checkout, and peer-to-peer transfers
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-white hover:text-emerald-100">✕</button>
        </div>
      )}

      {/* Main Balance Card & Quick Top-Up */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Card display */}
        <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase font-bold">
                Elara SuperApp Wallet
              </span>
              <h2 className="text-lg font-black font-sans mt-0.5 text-white">Rahim Ahmed</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
              Active • Bangladesh
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono">Available Balance</span>
            <div className="text-3xl font-black font-mono tracking-tight text-white">
              ৳ {balance.toLocaleString()} <span className="text-sm font-sans font-normal text-indigo-300">BDT</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span>Linked: bKash 01712-***201</span>
            <span className="text-emerald-400 font-bold">● NBR BIN Verified</span>
          </div>
        </div>

        {/* Right: Quick Add Money */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Add Money to Elara Pay</h3>
            <span className="text-[11px] text-emerald-600 font-mono font-bold">0% Transaction Fee</span>
          </div>

          {/* Gateway selector */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "bkash", name: "bKash", color: "border-pink-500 bg-pink-50/50 text-pink-700" },
              { id: "nagad", name: "Nagad", color: "border-orange-500 bg-orange-50/50 text-orange-700" },
              { id: "card", name: "BRAC Card", color: "border-blue-500 bg-blue-50/50 text-blue-700" },
            ].map((gw) => (
              <button
                key={gw.id}
                type="button"
                onClick={() => setSelectedGateway(gw.id as any)}
                className={`p-3 rounded-2xl border text-center transition ${
                  selectedGateway === gw.id
                    ? `${gw.color} font-bold shadow-xs ring-2 ring-primary/20`
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <div className="text-xs font-bold">{gw.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Instant Deposit</div>
              </button>
            ))}
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Select Amount</span>
            <div className="grid grid-cols-4 gap-2">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopupAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition ${
                    topupAmount === amt
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  ৳ {amt}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleTopup} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm font-bold">
                ৳
              </span>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-hidden focus:border-primary"
                placeholder="Enter custom amount"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : `Load with ${selectedGateway.toUpperCase()}`}
            </button>
          </form>
        </div>
      </div>

      {/* Peer-to-Peer Transfer Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">send</span>
          <h3 className="font-bold text-sm text-slate-900">Send Money to Contact (Bangladesh Mobile)</h3>
        </div>
        <p className="text-xs text-slate-400">
          Transfer Elara Pay balance directly to another user&apos;s account in Dhaka, Chattogram, or Sylhet without any transaction fee.
        </p>

        <form onSubmit={handleSendMoney} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="tel"
            required
            value={sendRecipient}
            onChange={(e) => setSendRecipient(e.target.value)}
            placeholder="Recipient Mobile (e.g. 01712-849201)"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-primary"
          />
          <input
            type="number"
            required
            min="10"
            max={balance}
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            placeholder="Amount (৳ BDT)"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-primary"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider transition disabled:opacity-50"
          >
            {isProcessing ? "Sending..." : "Send BDT Instantly"}
          </button>
        </form>
      </div>

      {/* Ledger of Transactions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Wallet Activity &amp; Audit Trail</h3>
            <p className="text-xs text-slate-400">Complete itemized record of digital payments and deposits</p>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">NBR Audited</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((txn) => {
            const isCredit = txn.type === "credit";
            return (
              <div key={txn.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                      isCredit ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isCredit ? "south_west" : "north_east"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{txn.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {txn.method} • {txn.id} • {txn.date}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs font-mono font-black ${
                      isCredit ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {isCredit ? "+" : "-"}৳ {txn.amount.toLocaleString()} BDT
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{txn.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
