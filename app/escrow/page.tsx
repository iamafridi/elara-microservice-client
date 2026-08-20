"use client";

import { useState } from "react";
import Link from "next/link";

export default function EscrowPolicyPage() {
  const [jobAmount, setJobAmount] = useState<number>(3500);

  const deposit30 = Math.round(jobAmount * 0.3);
  const completion70 = jobAmount - deposit30;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white pt-14 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-emerald-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Bangladesh Bank Escrow Architecture • Consumer Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight">
            The 30% Escrow Shield
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminating upfront fraud and service disputes across Bangladesh. Your funds are secured in a Bangladesh Bank-regulated settlement account and released strictly upon your verified approval.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-8">
        {/* Interactive Escrow Simulator Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-sans">
                Interactive Milestone Escrow Calculator
              </h2>
              <p className="text-xs text-slate-500">
                See how funds are segregated between initial booking deposit and final completion
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold self-start sm:self-auto">
              Automated Release
            </span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono uppercase font-bold text-slate-700 block">
              Estimated Job / Service Budget (৳ BDT)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 font-mono font-bold text-slate-400 text-base">৳</span>
              <input
                type="number"
                min="500"
                step="100"
                value={jobAmount}
                onChange={(e) => setJobAmount(Math.max(100, Number(e.target.value) || 0))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-lg font-black font-mono text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 30% Milestone Card */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 tracking-wider">
                  Phase 1: Booking Milestone
                </span>
                <span className="text-xs font-mono font-black text-emerald-700">30%</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-900">৳{deposit30} BDT</div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Locked in escrow when the Sheba Karigor accepts your quote. The professional is dispatched knowing funds are guaranteed.
              </p>
            </div>

            {/* 70% Completion Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                  Phase 2: Handover Release
                </span>
                <span className="text-xs font-mono font-black text-emerald-400">70%</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-300">৳{completion70} BDT</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Held until you inspect the work and provide the 4-digit handover OTP. If unsatisfied, funds are instantly frozen for dispute review.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Escrow Protection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero Advance Risk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never wire 100% upfront to unknown technicians. Even if a tasker fails to show up, your funds are safely refunded to your bKash or Elara Wallet within 15 minutes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">lock_clock</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">Guaranteed Tasker Pay</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Service professionals know they will get paid fairly once the job is completed properly. No haggling or late client payment excuses.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">gavel</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">DNCRP Legal Arbitration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every job agreement is legally binding under the Consumer Rights Protection Act, 2009. Our senior Dhaka mediation desk settles claims with zero bias.
            </p>
          </div>
        </div>

        {/* Step-by-Step Flow */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-sans">
            How the Escrow Process Works
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary text-white font-black flex items-center justify-center shrink-0">
                1
              </span>
              <div className="space-y-1">
                <span className="font-bold text-sm text-slate-900 block font-sans">Job Posted &amp; Quotes Received</span>
                <p className="text-slate-600 font-sans leading-relaxed">
                  Customer posts AC repair, plumbing, or electrical task. Verified pros submit competitive fixed-price bids.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary text-white font-black flex items-center justify-center shrink-0">
                2
              </span>
              <div className="space-y-1">
                <span className="font-bold text-sm text-slate-900 block font-sans">30% Escrow Fund Locked</span>
                <p className="text-slate-600 font-sans leading-relaxed">
                  Upon accepting a quote, customer authorizes the 30% deposit via bKash or Elara Wallet. Funds are isolated in our Bangladesh Bank trust pool.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary text-white font-black flex items-center justify-center shrink-0">
                3
              </span>
              <div className="space-y-1">
                <span className="font-bold text-sm text-slate-900 block font-sans">Inspection &amp; OTP Handover</span>
                <p className="text-slate-600 font-sans leading-relaxed">
                  After service delivery and quality check, the customer shares the 4-digit handover OTP. The full amount is instantly disbursed to the tasker&apos;s bank / MFS account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs font-mono transition shadow-md"
          >
            <span className="material-symbols-outlined text-sm">handyman</span>
            <span>Browse JobTap Sheba Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-138 */
