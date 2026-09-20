"use client";

import { useState } from "react";
import Link from "next/link";

interface DisputeCase {
  id: string;
  orderNumber: string;
  type: "JOBTAP_ESCROW" | "FOOD_MERCHANT" | "COURIER_LOSS";
  claimant: string;
  respondent: string;
  zone: string;
  claimAmount: number;
  totalOrderValue: number;
  complaintTitle: string;
  customerStatement: string;
  partnerStatement: string;
  status: "OPEN" | "REFUNDED_TO_CUSTOMER" | "RELEASED_TO_PARTNER";
}

const INITIAL_DISPUTES: DisputeCase[] = [
  {
    id: "DISP-2026-0814",
    orderNumber: "J-3312",
    type: "JOBTAP_ESCROW",
    claimant: "Farhana Anjum (Consumer)",
    respondent: "Kamrul Hassan (HVAC Sheba)",
    zone: "Banani Rd 11",
    claimAmount: 840,
    totalOrderValue: 2800,
    complaintTitle: "AC cooling ceased 4 hours post servicing (Leaking Schrader Valve)",
    customerStatement: "Technician charged ৳840 for Freon gas refill. By 9 PM the room temperature rose back to 31°C and the copper pipe showed oil leakage. Requesting refund of the 30% escrow holdback.",
    partnerStatement: "I topped up R32 gas and showed 18°C temperature test on thermometer. The customer's compressor has a hairline crack on outdoor coil which was already pre-existing.",
    status: "OPEN"
  },
  {
    id: "DISP-2026-0812",
    orderNumber: "EL-98198",
    claimant: "Nusrat Jahan (Consumer)",
    respondent: "Kacchi Bhai Banani",
    zone: "Baridhara J-Block",
    type: "FOOD_MERCHANT",
    claimAmount: 320,
    totalOrderValue: 1450,
    complaintTitle: "Shahi Jorda dessert missing from wedding combo box",
    customerStatement: "Paid for 2 combo meals with dessert. The box tamper seal was unbroken, indicating Dokan packed only main dishes.",
    partnerStatement: "Packaging supervisor admits packer missed the dessert bowl due to lunch rush hour. Dokan agrees to reimburse.",
    status: "REFUNDED_TO_CUSTOMER"
  }
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeCase[]>(INITIAL_DISPUTES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleResolve = (id: string, resolution: "REFUNDED_TO_CUSTOMER" | "RELEASED_TO_PARTNER") => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: resolution } : d))
    );
    const text =
      resolution === "REFUNDED_TO_CUSTOMER"
        ? "Arbitration Verdict: Escrow refunded back to consumer's MFS wallet."
        : "Arbitration Verdict: Escrow released to service partner.";
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">gavel</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              DNCRP Consumer Arbitration Desk
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/30">
              Escrow Protection Rails
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Support & Escrow Dispute Tribunal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Arbitrate customer grievances under Bangladesh Consumer Rights Protection Act, 2009.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>{disputes.filter((d) => d.status === "OPEN").length} Active Claims</span>
          </span>
        </div>
      </div>

      {/* Disputes Stream */}
      <div className="space-y-4">
        {disputes.map((caseItem) => (
          <div
            key={caseItem.id}
            className="bg-[#0D121F] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {caseItem.type.replace("_", " ")}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">{caseItem.id}</span>
                  <span className="text-xs text-slate-500 font-mono">• Order #{caseItem.orderNumber}</span>
                  <span className="text-xs text-slate-500 font-mono">• {caseItem.zone}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{caseItem.complaintTitle}</h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Disputed Amount</span>
                <span className="text-xl font-black text-rose-400 font-mono">
                  ৳ {caseItem.claimAmount}{" "}
                  <span className="text-xs text-slate-500 font-normal">of ৳{caseItem.totalOrderValue}</span>
                </span>
              </div>
            </div>

            {/* Bilateral Statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Customer Side */}
              <div className="bg-[#07090E] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>{caseItem.claimant}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Complainant</span>
                </div>
                <p className="text-slate-300 leading-relaxed italic bg-[#0D121F] p-3 rounded-xl border border-white/5">
                  &ldquo;{caseItem.customerStatement}&rdquo;
                </p>
              </div>

              {/* Partner Side */}
              <div className="bg-[#07090E] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">handyman</span>
                    <span>{caseItem.respondent}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Service Partner</span>
                </div>
                <p className="text-slate-300 leading-relaxed italic bg-[#0D121F] p-3 rounded-xl border border-white/5">
                  &ldquo;{caseItem.partnerStatement}&rdquo;
                </p>
              </div>
            </div>

            {/* Arbitration Verdict Controls */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-mono text-slate-400">
                Current Case Status:{" "}
                <span className="font-bold text-white">
                  {caseItem.status === "OPEN"
                    ? "Under Administrative Review"
                    : caseItem.status === "REFUNDED_TO_CUSTOMER"
                    ? "Verdict: Refunded to Consumer"
                    : "Verdict: Released to Partner"}
                </span>
              </div>

              {caseItem.status === "OPEN" ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleResolve(caseItem.id, "REFUNDED_TO_CUSTOMER")}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">undo</span>
                    <span>Refund ৳{caseItem.claimAmount} to Consumer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleResolve(caseItem.id, "RELEASED_TO_PARTNER")}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Release ৳{caseItem.claimAmount} to Partner</span>
                  </button>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                  Tribunal Case Closed & Enforced
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-182 */
