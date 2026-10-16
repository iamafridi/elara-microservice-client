"use client";

import { useState } from "react";
import Link from "next/link";

interface MerchantApplicant {
  id: string;
  businessName: string;
  ownerName: string;
  zone: string;
  tradeLicense: string;
  binNumber: string;
  bfsaGrade: string;
  status: "VERIFIED" | "PENDING_REVIEW" | "REJECTED";
}

const APPLICANTS: MerchantApplicant[] = [
  { id: "m1", businessName: "Kacchi Bhai — Banani Hub", ownerName: "Rahim Kacchi Group", zone: "Dhaka North", tradeLicense: "TRAD/DNCC/004819/2026", binNumber: "004829104-0101", bfsaGrade: "Grade-A", status: "VERIFIED" },
  { id: "m2", businessName: "Sultan's Dine — Gulshan 2", ownerName: "Faizul Alam", zone: "Dhaka North", tradeLicense: "TRAD/DNCC/009182/2026", binNumber: "001827491-0102", bfsaGrade: "Grade-A", status: "VERIFIED" },
  { id: "m3", businessName: "Al-Razzak Old Dhaka Tehari", ownerName: "Haji Shamsul", zone: "Old Dhaka", tradeLicense: "TRAD/DSCC/012948/2026", binNumber: "009281741-0101", bfsaGrade: "Grade-B", status: "PENDING_REVIEW" },
  { id: "m4", businessName: "Chittagong Mezban House", ownerName: "Kamrul Islam", zone: "Agrabad Metro", tradeLicense: "TRAD/CCC/003819/2026", binNumber: "004918201-0101", bfsaGrade: "Pending Audit", status: "PENDING_REVIEW" },
];

export default function AdminMerchantsPage() {
  const [merchants, setMerchants] = useState<MerchantApplicant[]>(APPLICANTS);
  const [toast, setToast] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setMerchants((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "VERIFIED" as const } : m))
    );
    setToast(`Approved ${name}! Instant Dokan activation notification dispatched via SMS & Email.`);
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
            <span>KYC Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Merchant Approvals &amp; Dokan KYC
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            NBR Tax BIN, City Corporation Trade License, and BFSA hygiene audit verification pipeline
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs font-bold">
            2 Pending Audits
          </span>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Merchants Table */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Dokan / Trade Name</span>
          <span>Compliance Credentials</span>
          <span>Hygiene Audit</span>
          <span className="text-right">Action</span>
        </div>

        {merchants.map((m) => (
          <div key={m.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{m.businessName}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  m.status === "VERIFIED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-300"
                }`}>
                  {m.status}
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Owner: {m.ownerName} • Zone: <strong className="text-slate-300">{m.zone}</strong>
              </div>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              <div className="text-slate-300">License: {m.tradeLicense}</div>
              <div className="text-slate-400">NBR BIN: {m.binNumber}</div>
            </div>

            <div className="font-mono text-xs">
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-purple-300 border border-white/10">
                {m.bfsaGrade}
              </span>
            </div>

            <div className="text-right">
              {m.status === "PENDING_REVIEW" ? (
                <button
                  type="button"
                  onClick={() => handleApprove(m.id, m.businessName)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-xs transition"
                >
                  Approve Dokan &rarr;
                </button>
              ) : (
                <span className="text-slate-500 font-mono text-[11px]">Fully Verified</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
