"use client";

import { useState } from "react";
import { useWorkflow } from "@/context/WorkflowContext";

interface RefundTicket {
  id: string;
  orderId: string;
  merchantName: string;
  amountBDT: number;
  reason: string;
  method: "bKash Instant" | "Elara Pay Wallet";
  status: "CREDITED_TO_BKASH" | "UNDER_REVIEW" | "APPROVED";
  date: string;
  taxCreditNote: string;
}

const INITIAL_REFUNDS: RefundTicket[] = [
  {
    id: "REF-BD-9182",
    orderId: "ord-banani-098",
    merchantName: "Daily Bazaar — Gulshan Hub",
    amountBDT: 320,
    reason: "Damaged packaging during monsoon transit",
    method: "bKash Instant",
    status: "CREDITED_TO_BKASH",
    date: "11 Oct 2026",
    taxCreditNote: "NBR-CN-9182-01",
  },
  {
    id: "REF-BD-8904",
    orderId: "ord-banani-087",
    merchantName: "Kacchi Bhai — Banani Hub",
    amountBDT: 180,
    reason: "Missing 1x Borhani in order packet",
    method: "Elara Pay Wallet",
    status: "APPROVED",
    date: "04 Oct 2026",
    taxCreditNote: "NBR-CN-8904-02",
  },
];

export default function CustomerRefundsPage() {
  const { liveOrders } = useWorkflow();
  const [refunds, setRefunds] = useState<RefundTicket[]>(INITIAL_REFUNDS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(liveOrders[0]?.id || "ord-banani-101");
  const [reason, setReason] = useState<string>("Damaged or spilled during transit");
  const [refundChannel, setRefundChannel] = useState<"bKash Instant" | "Elara Pay Wallet">("bKash Instant");
  const [notes, setNotes] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedOrder = liveOrders.find((o) => o.id === selectedOrderId) || liveOrders[0];
      const newTicket: RefundTicket = {
        id: `REF-BD-${Math.floor(1000 + Math.random() * 9000)}`,
        orderId: selectedOrderId,
        merchantName: selectedOrder?.merchantName || "Kacchi Bhai — Banani",
        amountBDT: Math.min(selectedOrder?.total || 450, 450),
        reason,
        method: refundChannel,
        status: "CREDITED_TO_BKASH",
        date: "Just now",
        taxCreditNote: `NBR-CN-${Math.floor(1000 + Math.random() * 9000)}-01`,
      };

      setRefunds([newTicket, ...refunds]);
      setIsSubmitting(false);
      setToast(`Refund ticket #${newTicket.id} created! ৳ ${newTicket.amountBDT} BDT processed to ${refundChannel}.`);
      setNotes("");
      setTimeout(() => setToast(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
          Refunds &amp; Consumer Protection
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Guaranteed instant resolutions compliant with the Directorate of National Consumer Rights Protection (DNCRP)
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-white hover:text-emerald-100">✕</button>
        </div>
      )}

      {/* DNCRP Guarantee Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-emerald-950">Elara 15-Minute Instant Refund Guarantee</h3>
            <p className="text-xs text-emerald-800 mt-0.5 font-sans">
              Spilled items, missing dishes, or incorrect grocery items qualify for immediate 100% reimbursement to your bKash or Elara Pay wallet.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-200/60 text-emerald-900 font-mono text-[10px] font-bold shrink-0">
          NBR Credit Note Enforced
        </span>
      </div>

      {/* Refund Request Form & Past Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Initiate a Refund Claim</h3>
            <p className="text-xs text-slate-400">Select order and explain the problem</p>
          </div>

          <form onSubmit={handleSubmitRefund} className="space-y-4 text-xs font-sans">
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Select Order
              </label>
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-hidden focus:border-primary bg-white"
              >
                {liveOrders.map((ord) => (
                  <option key={ord.id} value={ord.id}>
                    #{ord.id} — {ord.merchantName} (৳ {ord.total})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Reason for Refund
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-primary bg-white"
              >
                <option value="Damaged or spilled during transit">Damaged or spilled food container</option>
                <option value="Missing dish or item from packet">Missing dish or item from packet</option>
                <option value="Incorrect dish delivered">Incorrect dish delivered</option>
                <option value="Rider delayed delivery by over 45 minutes">Rider delayed delivery by over 45 minutes</option>
                <option value="Spoiled or expired grocery item">Spoiled or expired grocery item</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Refund Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRefundChannel("bKash Instant")}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition ${
                    refundChannel === "bKash Instant"
                      ? "bg-pink-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  bKash Direct
                </button>
                <button
                  type="button"
                  onClick={() => setRefundChannel("Elara Pay Wallet")}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition ${
                    refundChannel === "Elara Pay Wallet"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Elara Wallet
                </button>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Additional Details
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what went wrong with the delivery..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-sans focus:outline-hidden focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Claim..." : "Submit Refund Claim &rarr;"}
            </button>
          </form>
        </div>

        {/* Past Claims Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Refund Claims History</h3>
              <p className="text-xs text-slate-400">Audit trail of claims with official NBR Credit Notes</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">100% Resolution Rate</span>
          </div>

          <div className="space-y-3">
            {refunds.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Claim #{ref.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">Order #{ref.orderId}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {ref.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-700">
                  <span>Merchant: <strong className="text-slate-900 font-sans">{ref.merchantName}</strong></span>
                  <span className="font-black text-sm text-emerald-600">৳ {ref.amountBDT} BDT</span>
                </div>

                <p className="text-slate-500 text-[11px] font-sans italic">
                  &ldquo;{ref.reason}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Method: {ref.method}</span>
                  <span>Credit Note: {ref.taxCreditNote}</span>
                  <span>{ref.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-170 */
