"use client";

import { useState } from "react";
import Link from "next/link";

interface PlatformReview {
  id: string;
  vertical: "ORDER" | "RIDER" | "MERCHANT" | "TASKER";
  author: string;
  target: string;
  rating: number;
  date: string;
  comment: string;
  status: "APPROVED" | "FLAGGED" | "REJECTED";
}

const INITIAL_REVIEWS: PlatformReview[] = [
  {
    id: "RV-8841",
    vertical: "ORDER",
    author: "Farhana Anjum",
    target: "Kacchi Bhai Banani",
    rating: 5,
    date: "Today, 1:45 PM",
    comment: "Kacchi was piping hot, rider arrived early. Outstanding food quality!",
    status: "APPROVED"
  },
  {
    id: "RV-8840",
    vertical: "TASKER",
    author: "Imran Kabir",
    target: "Kamrul Hassan (HVAC)",
    rating: 1,
    date: "Yesterday",
    comment: "Gas leaked again the next morning — dispute case opened with support.",
    status: "FLAGGED"
  },
  {
    id: "RV-8839",
    vertical: "RIDER",
    author: "Nusrat Jahan",
    target: "Tanvir Hossain (Rider)",
    rating: 5,
    date: "14 Oct",
    comment: "Extremely careful with parcels and very polite demeanor at the gate.",
    status: "APPROVED"
  },
  {
    id: "RV-8838",
    vertical: "MERCHANT",
    author: "Sadman Rahman",
    target: "Shwapno Daily Superstore",
    rating: 2,
    date: "12 Oct",
    comment: "One item had broken packaging, though refund was issued quickly by rider.",
    status: "FLAGGED"
  },
  {
    id: "RV-8837",
    vertical: "ORDER",
    author: "Suspicious User 99",
    target: "Pizza Guyz Banani",
    rating: 1,
    date: "10 Oct",
    comment: "Visit my fake gambling website to win free cash prizes now!!!",
    status: "REJECTED"
  }
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<PlatformReview[]>(INITIAL_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: "APPROVED" | "FLAGGED" | "REJECTED") => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setToastMessage(`Review ${id} status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = reviews.filter((r) => {
    if (selectedFilter === "ALL") return true;
    return r.status === selectedFilter;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Quality Assurance & Content Trust
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold border border-white/10">
              Cross-Vertical Moderation
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Reviews & Reputation Moderation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit customer ratings, quarantine abusive or fraudulent spam, and maintain platform trust scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            {reviews.filter((r) => r.status === "FLAGGED").length} Pending Quarantine
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">30-Day Platform Reviews</span>
          <div className="text-2xl font-black text-purple-400 font-mono">41,208</div>
          <p className="text-[10px] text-emerald-400 font-mono">Avg 4.62★ across Dhaka</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Flagged for Abuse</span>
          <div className="text-2xl font-black text-amber-400 font-mono">186</div>
          <p className="text-[10px] text-slate-400 font-mono">Quarantined from public</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Spam Bots Rejected</span>
          <div className="text-2xl font-black text-rose-400 font-mono">74</div>
          <p className="text-[10px] text-slate-400 font-mono">Automated heuristics</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Merchant Response Rate</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">68%</div>
          <p className="text-[10px] text-slate-400 font-mono">Target: 80%</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-[#0D121F] p-1 rounded-xl border border-white/10 text-xs font-mono">
        {["ALL", "FLAGGED", "APPROVED", "REJECTED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedFilter === tab
                ? "bg-purple-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reviews Table */}
      <div className="bg-[#0D121F] border border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#131927] text-slate-400 font-mono text-[11px] uppercase border-b border-white/10">
                <th className="py-3 px-4 font-bold">Review ID & Target</th>
                <th className="py-3 px-4 font-bold">Author</th>
                <th className="py-3 px-4 font-bold text-center">Score</th>
                <th className="py-3 px-4 font-bold">Comment</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
                <th className="py-3 px-4 font-bold text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{rev.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                        {rev.vertical}
                      </span>
                    </div>
                    <div className="text-[11px] text-purple-400 font-bold mt-0.5">{rev.target}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <div>{rev.author}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{rev.date}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-amber-400 font-mono text-sm">{rev.rating}★</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-sm truncate font-sans">
                    &ldquo;{rev.comment}&rdquo;
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {rev.status === "APPROVED" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Approved
                      </span>
                    )}
                    {rev.status === "FLAGGED" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Flagged
                      </span>
                    )}
                    {rev.status === "REJECTED" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        Rejected
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(rev.id, "APPROVED")}
                        className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition"
                        title="Approve Review"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(rev.id, "REJECTED")}
                        className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition"
                        title="Reject / Quarantine Review"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-216 */
