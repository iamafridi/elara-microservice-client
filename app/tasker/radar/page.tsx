"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";

export default function TaskerRadarPage() {
  const { shebaJobs } = useWorkflow();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [activeBidJob, setActiveBidJob] = useState<any | null>(null);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [bidMessage, setBidMessage] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: "ALL", label: "All Trades" },
    { id: "AC", label: "AC & HVAC" },
    { id: "ELECTRIC", label: "Electrician" },
    { id: "PLUMBING", label: "Plumbing" },
    { id: "CLEANING", label: "Deep Clean" },
  ];

  const handleOpenBid = (job: any) => {
    setActiveBidJob(job);
    setBidAmount(String(job.budget || 850));
    setBidMessage("I have the right tools and can reach your address in 30 minutes.");
  };

  const handleSubmitBid = () => {
    if (!activeBidJob) return;
    setToastMessage(`Offer of ৳ ${bidAmount} sent for "${activeBidJob.title || activeBidJob.serviceTitle}"`);
    setActiveBidJob(null);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              15 km Hyper-Local Job Lead Radar
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
              Live Escrow Guaranteed
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Dhaka Job Leads Radar
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Radar Scan Radius:</span>
          <select
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="bg-[#131927] border border-white/10 text-white text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value={5}>5 km (Local Ward)</option>
            <option value={10}>10 km (Standard)</option>
            <option value={15}>15 km (Extended Dhaka)</option>
          </select>
        </div>
      </div>

      {/* Radar Map Graphic Simulation */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F19] h-52 flex items-center justify-center">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Concentric Radar Rings */}
        <div className="absolute w-40 h-40 rounded-full border border-indigo-500/20 animate-ping"></div>
        <div className="absolute w-72 h-72 rounded-full border border-indigo-500/30"></div>
        <div className="absolute w-96 h-96 rounded-full border border-indigo-500/20"></div>

        {/* Center Karigor Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-600/40">
            SM
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-300 mt-1 bg-black/70 px-2 py-0.5 rounded-full border border-white/10">
            Your GPS: Banani Rd 11
          </span>
        </div>

        {/* Surrounding Lead Markers */}
        <div className="absolute top-8 left-1/4 bg-indigo-500/20 border border-indigo-400/40 px-2 py-1 rounded-xl text-[10px] font-mono text-indigo-300 flex items-center gap-1 shadow-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>AC Gas • Gulshan-2 (2.1 km) • ৳850</span>
        </div>
        <div className="absolute bottom-6 right-1/4 bg-emerald-500/20 border border-emerald-400/40 px-2 py-1 rounded-xl text-[10px] font-mono text-emerald-300 flex items-center gap-1 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Plumbing • Banani DOHS (1.4 km) • ৳650</span>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === c.id
                ? "bg-indigo-600 text-white shadow-xs shadow-indigo-600/30"
                : "bg-[#131927] text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Job Lead Cards */}
      <div className="space-y-3">
        {shebaJobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#131927] border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-white/20 transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    Lead #{job.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Escrow Locked
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    • Posted 12 mins ago
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {job.title || job.serviceTitle}
                </h3>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    ৳ {job.budget || 850}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Client Budget</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {job.description || "Customer requested certified service technician with diagnosis tools."}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs font-mono">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="material-symbols-outlined text-sm text-indigo-400">location_on</span>
                  {job.location || "Banani Rd 11, Dhaka"}
                </span>
                <span>•</span>
                <span>Est. Time: 1.5 Hours</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/tasker/jobs/${job.id}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  View Brief & Media
                </Link>
                <button
                  type="button"
                  onClick={() => handleOpenBid(job)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-xs"
                >
                  Send Quotation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Submission Modal */}
      {activeBidJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#131927] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">
                Submit Quote for #{activeBidJob.id}
              </h3>
              <button
                onClick={() => setActiveBidJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-3 bg-[#0B0F19] rounded-xl border border-white/5 space-y-1">
              <div className="text-xs font-bold text-white">
                {activeBidJob.title || activeBidJob.serviceTitle}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Location: {activeBidJob.location || "Banani Rd 11"} • Client Budget: ৳{activeBidJob.budget || 850}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                Your Proposed Service Charge (৳ BDT)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                Note to Customer (Tools, Estimated arrival)
              </label>
              <textarea
                rows={3}
                value={bidMessage}
                onChange={(e) => setBidMessage(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveBidJob(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitBid}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Send Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
