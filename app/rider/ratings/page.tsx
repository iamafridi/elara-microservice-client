"use client";

import { useState } from "react";
import Link from "next/link";

interface RatingBreakdown {
  stars: number;
  count: number;
  pct: number;
}

const RATING_DISTRIBUTION: RatingBreakdown[] = [
  { stars: 5, count: 1340, pct: 94 },
  { stars: 4, count: 68, pct: 5 },
  { stars: 3, count: 10, pct: 1 },
  { stars: 2, count: 2, pct: 0 },
  { stars: 1, count: 0, pct: 0 },
];

const COMPLIMENTS = [
  { title: "Friendly & Polite", icon: "sentiment_satisfied", count: 842 },
  { title: "Piping Hot & Fast", icon: "bolt", count: 720 },
  { title: "Tamper Seal Intact", icon: "verified", count: 615 },
  { title: "Careful Driving", icon: "two_wheeler", count: 490 },
  { title: "Monsoon Hero", icon: "rainy", count: 310 },
];

const RECENT_CUSTOMER_NOTES = [
  {
    customer: "Tahsin R., Banani DOHS",
    date: "16 Oct",
    rating: 5,
    tip: 50,
    text: "Delivered kacchi hot in heavy rain without a single drop on the food box. Outstanding rider!"
  },
  {
    customer: "Nafisa K., Gulshan-2",
    date: "15 Oct",
    rating: 5,
    tip: 30,
    text: "Very polite brother. Called ahead before reaching gate."
  },
  {
    customer: "Sabbir M., Niketan",
    date: "14 Oct",
    rating: 5,
    tip: 25,
    text: "Quick OTP verification and had exact change for cash payment."
  }
];

export default function RiderRatingsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Fleet Performance & Reputation
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              Top 1% Dhaka Fleet
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Rider Scorecard & Compliments
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/rider/earnings"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#131927] hover:bg-white/10 text-slate-200 border border-white/10 transition"
          >
            Tip Earnings Ledger &rarr;
          </Link>
        </div>
      </div>

      {/* Main Scorecard Header Card */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Star Score */}
        <div className="text-center md:text-left space-y-1 md:border-r md:border-white/10 md:pr-6">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Overall Rating</span>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">4.93</span>
            <span className="material-symbols-outlined text-amber-400 text-3xl">star</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">Based on 1,420 customer ratings</p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              Eligible for ৳ 2,500 Weekly Fleet Bonus
            </span>
          </div>
        </div>

        {/* Center: Rating Distribution */}
        <div className="space-y-1.5 md:border-r md:border-white/10 md:pr-6">
          {RATING_DISTRIBUTION.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-xs font-mono">
              <span className="w-6 text-slate-400 font-bold text-right">{row.stars}★</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-10 text-[11px] text-slate-500 text-right">{row.count}</span>
            </div>
          ))}
        </div>

        {/* Right: Key Milestones */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Acceptance Rate</span>
            <span className="text-white font-black font-mono">99.4%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Completion Rate</span>
            <span className="text-white font-black font-mono">100.0%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">On-Time Gate Delivery</span>
            <span className="text-emerald-400 font-black font-mono">98.2%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Customer Tips Received</span>
            <span className="text-emerald-400 font-black font-mono">৳ 18,450 Total</span>
          </div>
        </div>
      </div>

      {/* Badges & Compliments Grid */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Earned Customer Compliment Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COMPLIMENTS.map((badge, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F19] border border-white/10 rounded-2xl p-3 text-center space-y-1.5 hover:border-emerald-500/40 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-xl">{badge.icon}</span>
              </div>
              <div className="font-bold text-xs text-white leading-tight">{badge.title}</div>
              <div className="text-[11px] text-emerald-400 font-mono font-bold">{badge.count} Diners</div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Feedback Notes Stream */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Recent Customer Commendations
        </h3>

        <div className="space-y-3">
          {RECENT_CUSTOMER_NOTES.map((note, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0B0F19] border border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{note.customer}</span>
                  <span className="text-[10px] text-slate-500 font-mono">• {note.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400 font-bold font-mono">{note.rating}★</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    +৳{note.tip} Tip
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic">&ldquo;{note.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
