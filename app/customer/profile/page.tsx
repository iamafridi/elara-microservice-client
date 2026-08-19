"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { maskNID, maskPhone } from "@/lib/privacy";

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.fullName || user?.name || "Rahim Ahmed");
  const [bengaliName, setBengaliName] = useState("রহিম আহমেদ");
  const [email, setEmail] = useState(user?.email || "rahim.ahmed@elara.com.bd");
  const [phone, setPhone] = useState(user?.phone || "01712-849201");
  const [zone, setZone] = useState("Banani, Dhaka-1213");
  const [toast, setToast] = useState<string | null>(null);
  const [showNid, setShowNid] = useState(false);

  const rawNid = "5910 8294 10";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Profile and delivery preferences updated successfully!");
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
          Customer Profile &amp; Smart NID Verification
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal details, verified Bangladeshi phone, and Election Commission Smart NID
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary text-white font-black flex items-center justify-center text-2xl shadow-md shadow-primary/20 shrink-0">
            {(name || "RA").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold border border-amber-200">
                ★ VIP Member
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {maskPhone(phone)} • {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
            <span className="text-[10px] text-slate-400 block uppercase">Dhaka Zone</span>
            <span className="font-bold text-slate-800">Banani Cluster</span>
          </div>
        </div>
      </div>

      {/* Verified Government Smart NID Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-2xl">verified</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                Smart National Identity (NID) Status
              </h3>
              <p className="text-xs text-slate-500">
                Verified with Bangladesh Election Commission Porichoy Verification Gateway • 🔒 PII Protected
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowNid(!showNid)}
              className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition"
            >
              <span className="material-symbols-outlined text-sm">{showNid ? "visibility_off" : "visibility"}</span>
              <span>{showNid ? "Hide NID" : "Reveal NID"}</span>
            </button>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
              Verified Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-[10px] text-slate-400 block uppercase">10-Digit Smart NID</span>
            <span className="font-bold text-slate-800">{maskNID(rawNid, showNid)}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-[10px] text-slate-400 block uppercase">Date of Birth</span>
            <span className="font-bold text-slate-800">14 August 1992</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <span className="text-[10px] text-slate-400 block uppercase">NID Match Score</span>
            <span className="font-bold text-emerald-600">99.8% Match</span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Personal Information &amp; Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Full Name (English)</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">নাম (বাংলা)</label>
            <input
              type="text"
              value={bengaliName}
              onChange={(e) => setBengaliName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Bangladeshi Phone (MFS linked)</label>
            <input
              type="tel"
              required
              disabled
              value={phone}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-mono cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-400">Linked to bKash / Nagad wallet (Locked)</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* elara-stage-137 */
