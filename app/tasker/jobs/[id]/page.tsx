"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useWorkflow } from "@/context/WorkflowContext";

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export default function TaskerJobDetailPage() {
  const params = useParams();
  const { shebaJobs } = useWorkflow();
  const jobId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || "1";

  // Find job or fallback
  const job = shebaJobs.find((j) => String(j.id) === String(jobId)) || {
    id: jobId,
    title: "1.5 Ton Inverter AC Master Service & Freon Topup",
    serviceTitle: "1.5 Ton Inverter AC Master Service",
    budget: 1250,
    location: "House 24, Road 7, Block F, Banani",
    description: "Indoor unit is leaking condensation water and blower speed is sluggish. Please bring jet wash pump and manifold gauge.",
    status: "IN_PROGRESS",
    customerName: "Mrs. Shahnaz Parveen",
    customerPhone: "+880 1712-492019"
  };

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "c1", label: "Perform electrical safety check & switch off breaker", done: true },
    { id: "c2", label: "Check manifold pressure & top up R32 / R410a Freon gas", done: true },
    { id: "c3", label: "High-pressure jet wash outdoor condenser fins", done: false },
    { id: "c4", label: "Clear indoor drainage tray & test condensation drain pipe", done: false },
    { id: "c5", label: "Customer inspection & air temperature test (18°C achieved)", done: false },
  ]);

  const [otpCode, setOtpCode] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const allTasksDone = checklist.every((c) => c.done);

  const handleCompleteJob = () => {
    if (!allTasksDone) {
      alert("Please complete all technical checklist items before requesting escrow release.");
      return;
    }
    if (otpCode.length !== 4) {
      alert("Please enter the 4-digit client completion OTP.");
      return;
    }

    setIsCompleted(true);
    setToastMessage(`Job completed! ৳ ${job.budget || 1250} released from Escrow into your Karigor wallet.`);
    setTimeout(() => setToastMessage(null), 4000);
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

      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <Link
          href="/tasker/jobs"
          className="text-slate-400 hover:text-white flex items-center gap-1 transition"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Active Jobs</span>
        </Link>
        <span className="text-indigo-400 font-bold">Job #{job.id}</span>
      </div>

      {/* Main Job Hero Header */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                {isCompleted ? "COMPLETED & ESCROW RELEASED" : "ACTIVE IN-PROGRESS"}
              </span>
              <span className="text-xs text-slate-400 font-mono">Banani Ward 19</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              {job.title || job.serviceTitle}
            </h1>
          </div>

          <div className="text-right sm:border-l sm:border-white/10 sm:pl-6">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              ৳ {job.budget || 1250}
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              Protected in Bangladesh Bank Escrow
            </span>
          </div>
        </div>

        {/* Customer Address & Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 bg-[#0B0F19] rounded-2xl border border-white/5 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Service Address</span>
            <div className="text-white font-bold">{job.location || "Banani Rd 11"}</div>
            <div className="text-[11px] text-slate-400">Dhaka North City Corporation</div>
          </div>

          <div className="p-3 bg-[#0B0F19] rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Client Contact</span>
              <div className="text-white font-bold">{job.customerName || "Customer"}</div>
              <div className="text-[11px] text-slate-400">{job.customerPhone || "+880 1712-492019"}</div>
            </div>
            <a
              href="tel:+8801712492019"
              className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
            >
              <span className="material-symbols-outlined text-base">call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Customer Diagnostic Brief & Media */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Client Fault Description
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0F19] p-4 rounded-2xl border border-white/5">
          &ldquo;{job.description || "Indoor unit is leaking condensation water and blower speed is sluggish. Please bring jet wash pump and manifold gauge."}&rdquo;
        </p>

        {/* Customer Voice Note & Photos */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="px-3 py-2 bg-[#0B0F19] border border-white/10 rounded-xl text-xs font-mono text-indigo-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-indigo-400">mic</span>
            <span>Customer Voice Note (0:42 mins)</span>
          </div>
          <div className="px-3 py-2 bg-[#0B0F19] border border-white/10 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-slate-400">photo_library</span>
            <span>2 AC Unit Photos Attached</span>
          </div>
        </div>
      </div>

      {/* Technical Checklist */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Job Execution Checklist
          </h3>
          <span className="text-xs font-mono text-indigo-300">
            {checklist.filter((c) => c.done).length} / {checklist.length} Completed
          </span>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#0B0F19] border border-white/5 cursor-pointer hover:border-white/15 transition select-none text-xs"
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => {}}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 focus:ring-0"
              />
              <span className={item.done ? "line-through text-slate-500" : "text-white font-medium"}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Completion & Escrow Handshake */}
      {!isCompleted ? (
        <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-base">verified_user</span>
            <span>Client Completion Handshake & Escrow Payout</span>
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Upon finishing work and demonstrating the appliance to the customer, ask the customer for their 4-digit Sheba Completion OTP to trigger instant escrow release.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                4-Digit Completion OTP
              </label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 7831"
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-emerald-400 placeholder:text-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleCompleteJob}
                disabled={!allTasksDone || otpCode.length !== 4}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white rounded-xl font-black text-xs font-mono tracking-wide transition shadow-lg shadow-indigo-950/40 flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-base">lock_open</span>
                <span>VERIFY & RELEASE ৳ {job.budget || 1250}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#131927] border border-emerald-500/30 rounded-3xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>
          <h3 className="text-lg font-black text-white">Escrow Released Successfully!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            ৳ {job.budget || 1250} has been transferred into your Karigor wallet. You can withdraw instantly to bKash or Nagad.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/tasker/withdraw"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-mono"
            >
              Withdraw to bKash / Nagad
            </Link>
            <Link
              href="/tasker/jobs"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold font-mono"
            >
              Back to Active Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
