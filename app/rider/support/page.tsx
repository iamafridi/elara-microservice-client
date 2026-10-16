"use client";

import { useState } from "react";
import Link from "next/link";

interface HelpArticle {
  title: string;
  desc: string;
  icon: string;
}

const COMMON_ISSUES: HelpArticle[] = [
  {
    title: "Customer Not Answering Door / Phone",
    desc: "Wait 10 minutes at gate, ring doorbell twice, then trigger Elara Dispatcher auto-call in app.",
    icon: "ring_volume"
  },
  {
    title: "Damaged / Spilled Food on Road",
    desc: "Take photo immediately, do not hand over to customer. Call Banani Hub dispatch to re-order dish.",
    icon: "soup_kitchen"
  },
  {
    title: "Wrong Dropoff Address Entered by Diner",
    desc: "If extra distance exceeds 2 km, dispatcher adds automatic ৳ 40 re-routing fare bonus.",
    icon: "wrong_location"
  },
  {
    title: "Motorcycle Breakdown or Flat Tyre",
    desc: "Tap SOS Breakdown below. A backup rider nearby will intercept the package within 10 minutes.",
    icon: "build"
  }
];

export default function RiderSupportPage() {
  const [sosTriggered, setSosTriggered] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Fleet Care & Safety Desk
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              24/7 Roadside Assist
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Rider Support & Emergency SOS
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:999"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1.5 shadow-md shadow-rose-950/40"
          >
            <span className="material-symbols-outlined text-sm">emergency</span>
            <span>National Emergency 999</span>
          </a>
        </div>
      </div>

      {/* Emergency Roadside SOS Banner */}
      <div className="bg-gradient-to-r from-rose-950/80 to-[#131927] border border-rose-500/40 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <h2 className="text-base font-black text-white">Emergency Roadside Assistance</h2>
            </div>
            <p className="text-xs text-rose-200/80 leading-relaxed max-w-xl">
              In case of a traffic accident, bike puncture, or hostile situation during transit, alert the dispatch center instantly. Your GPS coordinates will be sent to the nearest patrol supervisor.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSosTriggered(true);
              alert("EMERGENCY SIGNAL SENT: Dispatcher and nearby Banani patrol alerted. Keep phone line open!");
            }}
            className={`px-5 py-3 rounded-2xl font-black text-xs font-mono transition flex items-center gap-2 shrink-0 shadow-lg ${
              sosTriggered
                ? "bg-rose-500 text-white animate-bounce"
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50"
            }`}
          >
            <span className="material-symbols-outlined text-lg">crisis_alert</span>
            <span>{sosTriggered ? "SOS DISPATCH SENT!" : "TRIGGER ROADSIDE SOS"}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-rose-500/20 flex flex-wrap items-center gap-4 text-xs font-mono text-rose-300">
          <span>Banani Hub Dispatch: <strong className="text-white">01711-223344</strong></span>
          <span>•</span>
          <span>Dhanmondi Hub: <strong className="text-white">01811-334455</strong></span>
          <span>•</span>
          <span>Uttara Hub: <strong className="text-white">01911-445566</strong></span>
        </div>
      </div>

      {/* Common On-Trip Scenarios */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Quick Incident Resolution Guide
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {COMMON_ISSUES.map((issue, idx) => (
            <div
              key={idx}
              className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-2 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">{issue.icon}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{issue.title}</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-10.5">
                {issue.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Welfare & Medical Benefits */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-base">health_and_safety</span>
          <span>Elara Rider Welfare & Hospitalization Network</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          All active Elara fleet riders are covered under our cashless trauma insurance network across United Hospital Gulshan, Evercare Hospital Bashundhara, and Square Hospital Panthapath.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="tel:+8809612000300"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#0B0F19] hover:bg-white/10 text-emerald-400 border border-emerald-500/30 transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <span>Rider Helpline: 09612-000300</span>
          </a>
          <Link
            href="/rider/feed"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#0B0F19] hover:bg-white/10 text-slate-300 border border-white/10 transition"
          >
            Rider Community Feed &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
