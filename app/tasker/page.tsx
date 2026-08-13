"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";
import { useAuth } from "@/context/AuthContext";

export default function TaskerPage() {
  const { user } = useAuth();
  const { shebaJobs, taskerAcceptJob, taskerCompleteJob, currentUser } = useWorkflow();
  const [filter, setFilter] = useState<string>("all");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredJobs = shebaJobs.filter((j) => {
    if (filter === "active") return j.status === "ACCEPTED" || j.status === "IN_PROGRESS";
    if (filter === "completed") return j.status === "COMPLETED";
    if (filter === "new") return j.status === "NEW";
    return true;
  });

  const handleComplete = (jobId: string, title: string) => {
    taskerCompleteJob(jobId);
    setActionMessage(`Job "${title}" completed! 30% platform escrow released to your wallet.`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleAccept = (jobId: string, title: string) => {
    taskerAcceptJob(jobId);
    setActionMessage(`Job "${title}" accepted! 30% client escrow locked. Navigation route ready.`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary */}
      <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-indigo-600/30 shrink-0">
            SM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-sans text-white">
                Job Radar &amp; Sheba Dispatch
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                ● Live 15km Radius
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              HVAC Master Tech &amp; Certified Electrician • 148 Verified Jobs • 4.9 ★ Rating
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Escrow &amp; Available Balance</span>
            <span className="font-black text-indigo-400 text-sm">৳ {currentUser.balanceBDT.toLocaleString()} BDT</span>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gulshan / Banani Hub Radar</span>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-xl bg-indigo-600/90 border border-indigo-400/30 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-white/80 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Escrow Shield Notice */}
      <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-indigo-200 font-medium">
          <span className="material-symbols-outlined text-indigo-400 text-lg">shield</span>
          <span>
            <strong className="text-white">JobTap 30% Escrow Shield:</strong> Every home sheba booking is backed by upfront client escrow before travel.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/tasker/quotes"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs transition"
          >
            Custom Quotes &rarr;
          </Link>
          <Link
            href="/tasker/jobs"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono font-bold text-xs transition"
          >
            Active Orders ({filteredJobs.length}) &rarr;
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-white/10 gap-3 text-xs font-mono font-bold">
        {[
          { id: "all", label: `All Bookings (${shebaJobs.length})` },
          { id: "new", label: `New Radar Leads (${shebaJobs.filter((j) => j.status === "NEW").length})` },
          { id: "active", label: `In Progress (${shebaJobs.filter((j) => j.status === "ACCEPTED" || j.status === "IN_PROGRESS").length})` },
          { id: "completed", label: `Completed (${shebaJobs.filter((j) => j.status === "COMPLETED").length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`pb-3 transition border-b-2 min-h-[40px] px-1 ${
              filter === tab.id
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const isNew = job.status === "NEW";
          const isActive = job.status === "ACCEPTED" || job.status === "IN_PROGRESS";
          const isDone = job.status === "COMPLETED";

          return (
            <div
              key={job.id}
              className="bg-[#0E1322] rounded-2xl border border-white/10 p-5 shadow-xs space-y-4 flex flex-col justify-between hover:border-indigo-500/30 transition"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-mono font-bold">
                    {job.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : isActive
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                        : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {job.category}
                  </span>
                  <h3 className="font-bold text-base font-sans text-white leading-snug mt-0.5">
                    {job.serviceTitle}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer:</span>
                    <span className="font-bold text-white">{job.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200">{job.customerLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Slot:</span>
                    <span className="text-indigo-400 font-bold">{job.scheduledTime}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/10">
                    <span className="text-slate-400">Job Fee:</span>
                    <span className="text-sm font-black text-white">৳ {job.priceBDT} BDT</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Escrow Shield: 30% (৳ {Math.round(job.priceBDT * 0.3)}) Protected</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10">
                {isNew && (
                  <button
                    type="button"
                    onClick={() => handleAccept(job.id, job.serviceTitle)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-md min-h-[44px]"
                  >
                    Accept Sheba Booking &rarr;
                  </button>
                )}

                {isActive && (
                  <button
                    type="button"
                    onClick={() => handleComplete(job.id, job.serviceTitle)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-md min-h-[44px]"
                  >
                    Complete Service &amp; Release Escrow &rarr;
                  </button>
                )}

                {isDone && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold text-center">
                    ✓ Job Completed &amp; Escrow Released
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* elara-stage-128 */
