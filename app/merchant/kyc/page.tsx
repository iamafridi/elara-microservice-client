"use client";

import { useState } from "react";
import Link from "next/link";

export default function MerchantKycPage() {
  const [tradeLicense, setTradeLicense] = useState("TRAD/DNCC/014298/2026");
  const [binNumber, setBinNumber] = useState("004829104-0101");
  const [tinNumber, setTinNumber] = useState("729104829101");
  const [ownerNid, setOwnerNid] = useState("1982-2691-0492-0482");
  const [sanitaryCertificate, setSanitaryCertificate] = useState("DCC-FS-2026-8941");
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Legal certificates and trade license uploaded for DNCC annual review!");
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Compliance &amp; KYC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Trade License &amp; Government Accreditation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            City Corporation Trade License, NBR VAT BIN certificate, and food safety compliance
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200 self-start sm:self-auto">
          ✓ Verified Merchant Status
        </span>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Verified Status Banner */}
      <div className="bg-[#0F1422] border border-white/10 rounded-2xl p-6 text-white shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">gavel</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Dhaka North City Corporation (DNCC) Vetted
              </h2>
              <p className="text-xs text-slate-400">
                Annual commercial license active through 30 June 2027
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">100% Compliant</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">Trade License</span>
            <span className="font-bold text-white">{tradeLicense}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">VAT BIN (11 Digits)</span>
            <span className="font-bold text-emerald-400">{binNumber}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">Food Safety Reg</span>
            <span className="font-bold text-amber-400">{sanitaryCertificate}</span>
          </div>
        </div>
      </div>

      {/* Document Modification Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Upload Renewal Documents
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Trade License Number (DNCC/DSCC)</label>
            <input
              type="text"
              required
              value={tradeLicense}
              onChange={(e) => setTradeLicense(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">NBR 11-Digit BIN Certificate</label>
            <input
              type="text"
              required
              value={binNumber}
              onChange={(e) => setBinNumber(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Managing Partner Smart NID</label>
            <input
              type="text"
              required
              value={ownerNid}
              onChange={(e) => setOwnerNid(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Sanitary Food Inspection Docket</label>
            <input
              type="text"
              required
              value={sanitaryCertificate}
              onChange={(e) => setSanitaryCertificate(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Submit KYC Update
          </button>
        </div>
      </form>
    </div>
  );
}

/* elara-stage-172 */
