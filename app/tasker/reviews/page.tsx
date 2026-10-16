"use client";

import { useState } from "react";
import Link from "next/link";

interface ShebaReview {
  id: string;
  jobTitle: string;
  client: string;
  zone: string;
  rating: number;
  date: string;
  comment: string;
  payout: number;
  badge?: string;
}

const REVIEWS: ShebaReview[] = [
  {
    id: "SR-101",
    jobTitle: "1.5 Ton Gree AC Master Jet Wash",
    client: "Dr. Farhad Hossain",
    zone: "Banani DOHS",
    rating: 5,
    date: "14 Oct 2026",
    comment: "Suman bhai came right on time with full manifold gauge and pressure washer. Solved the water dripping issue in 40 minutes. Extremely neat and clean work.",
    payout: 1250,
    badge: "Master Karigor"
  },
  {
    id: "SR-102",
    jobTitle: "Sub-Distribution Board (DB) Breaker Trip Repair",
    client: "Tanzeem Akhtar",
    zone: "Gulshan-1",
    rating: 5,
    date: "12 Oct 2026",
    comment: "Found the short circuit in the kitchen circuit that two other electricians failed to locate. Very honest and polite.",
    payout: 850,
    badge: "Fast Troubleshooter"
  },
  {
    id: "SR-103",
    jobTitle: "Washing Machine Inlet Valve Replacement",
    client: "Sabrina Kabir",
    zone: "Dhanmondi 8/A",
    rating: 4,
    date: "10 Oct 2026",
    comment: "Fixed the LG washing machine water error. Had to fetch replacement parts from Elephant Road so took slightly longer, but works perfectly now.",
    payout: 1100
  },
  {
    id: "SR-104",
    jobTitle: "Commercial Fridge Gas Topup (Bakery)",
    client: "Bake Story Cafe",
    zone: "Banani Rd 11",
    rating: 5,
    date: "08 Oct 2026",
    comment: "Emergency service at 10 PM. Saved our entire cake inventory from spoiling. Top notch technician!",
    payout: 2200,
    badge: "Emergency Hero"
  }
];

export default function TaskerReviewsPage() {
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Customer Commendations
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
              Smart NID Verified Karigor
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Client Reviews & Verified Portfolio
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/tasker/profile"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#131927] hover:bg-white/10 text-slate-200 border border-white/10 transition"
          >
            Public Karigor Profile &rarr;
          </Link>
        </div>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Client Rating</span>
          <div className="text-3xl font-black text-amber-400 font-mono flex items-center gap-1">
            <span>{avgRating}</span>
            <span className="material-symbols-outlined text-2xl">star</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-mono">100% positive satisfaction</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Sheba Jobs</span>
          <div className="text-2xl font-black text-white font-mono">148</div>
          <p className="text-[10px] text-slate-400 font-mono">Completed without dispute</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Repeat Customers</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">38%</div>
          <p className="text-[10px] text-slate-400 font-mono">Banani & Gulshan households</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Escrow Guarantee</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">৳ 0</div>
          <p className="text-[10px] text-slate-400 font-mono">Zero disputed clawbacks</p>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-3">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#131927] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 hover:border-white/20 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{rev.client}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                    {rev.zone}
                  </span>
                  {rev.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {rev.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-indigo-400 font-bold mt-0.5">{rev.jobTitle}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">{rev.date}</span>
                <span className="text-sm font-black text-amber-400 font-mono flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-base">star</span>
                  {rev.rating}.0
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0F19] p-3 rounded-xl border border-white/5">
              &ldquo;{rev.comment}&rdquo;
            </p>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Escrow Released: <strong className="text-emerald-400">৳ {rev.payout}</strong></span>
              <span className="text-slate-500">Verified Client Review • Order #{rev.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
