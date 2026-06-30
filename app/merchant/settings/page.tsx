"use client";

import { useState } from "react";
import Link from "next/link";

export default function MerchantSettingsPage() {
  const [storeName, setStoreName] = useState("Kacchi Bhai Hospitality Group Ltd.");
  const [openTime, setOpenTime] = useState("10:00");
  const [closeTime, setCloseTime] = useState("23:30");
  const [holidayMode, setHolidayMode] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Store Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Store Settings &amp; Trade License KYC
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure kitchen operating hours, holiday mode, and NBR BIN / Trade License compliance
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition self-start sm:self-auto"
        >
          Save Changes
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2 shadow-xs">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>Store settings and operating hours updated successfully!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Dokan Info */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
            1. Kitchen &amp; Dokan Identity
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Dokan Trade Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Physical Address &amp; Hub</label>
              <input
                type="text"
                readOnly
                value="Plot 67/A, Kemal Ataturk Ave, Banani, Dhaka-1213 (Dhaka North Geofence)"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours & Holiday Mode */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
              2. Kitchen Hours &amp; Holiday Mode
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">Holiday Mode:</span>
              <button
                type="button"
                onClick={() => setHolidayMode(!holidayMode)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold transition ${
                  holidayMode ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {holidayMode ? "Store Closed" : "Open Daily"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Opening Time (Morning)</label>
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Closing Time (Night)</label>
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Verified Compliance & KYC */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
              3. Regulatory Compliance &amp; KYC
            </h2>
            <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
              ✓ Fully Verified Tier-1
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Trade License</span>
              <div className="font-bold text-slate-900">TRAD/DNCC/004819/2026</div>
              <span className="text-[10px] text-emerald-700 font-bold block">DNCC Valid until 2027</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">NBR VAT BIN</span>
              <div className="font-bold text-slate-900 font-mono">004829104-0101</div>
              <span className="text-[10px] text-emerald-700 font-bold block">Mushak-6.3 Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Food Safety (BFSA)</span>
              <div className="font-bold text-slate-900">Grade-A Certified</div>
              <span className="text-[10px] text-emerald-700 font-bold block">Hygiene Audit Passed</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
