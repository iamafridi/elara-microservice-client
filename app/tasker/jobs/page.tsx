"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, ShebaJob } from "@/context/WorkflowContext";

export default function TaskerJobsPage() {
  const { shebaJobs, taskerCompleteJob } = useWorkflow();
  const [toast, setToast] = useState<string | null>(null);

  const handleComplete = (jobId: string, title: string) => {
    taskerCompleteJob(jobId);
    setToast(`Job "${title}" marked completed! Remaining 70% escrow released to your wallet.`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
          My Active &amp; Scheduled Jobs
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Track customer address, service milestones, and 30% upfront escrow protection
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Jobs Stream */}
      <div className="space-y-4">
        {shebaJobs.map((job) => (
          <div key={job.id} className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="font-bold text-white text-base">{job.title}</span>
                <span className="text-xs text-slate-400 block mt-0.5">{job.category} • Client: {job.customerName}</span>
              </div>
              <div className="text-right">
                <div className="font-mono font-black text-sm text-white">৳ {job.budget}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  job.status === "COMPLETED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-indigo-500/20 text-indigo-300"
                }`}>
                  {job.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {job.description}
            </p>

            {/* Escrow Progress Bar */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Escrow Security Guarantee:</span>
                <span className="text-indigo-300 font-bold">
                  {job.status === "COMPLETED" ? "100% Fully Released" : "30% Advance Locked in Escrow"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    job.status === "COMPLETED" ? "bg-emerald-500 w-full" : "bg-indigo-500 w-[30%]"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="material-symbols-outlined text-sm text-indigo-400">location_on</span>
                <span>{job.location}</span>
              </div>

              {job.status !== "COMPLETED" && (
                <button
                  type="button"
                  onClick={() => handleComplete(job.id, job.serviceTitle || job.title || "")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-xs transition"
                >
                  ✓ Mark Work Finished &rarr;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
