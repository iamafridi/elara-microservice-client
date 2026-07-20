"use client";

import { useState } from "react";
import Link from "next/link";

interface QuoteItem {
  id: string;
  customerName: string;
  category: string;
  proposedPrice: number;
  initialEstimate: number;
  status: "ACCEPTED" | "AWAITING_CLIENT_RESPONSE";
  lastMessage: string;
}

const QUOTES: QuoteItem[] = [
  { id: "q1", customerName: "Rahim Ahmed", category: "AC Master Servicing (Inverter)", proposedPrice: 1200, initialEstimate: 1400, status: "ACCEPTED", lastMessage: "Agreed to ৳ 1,200. Client locked 30% advance in escrow." },
  { id: "q2", customerName: "Nazmul Huda", category: "Distribution Board Short Circuit Fix", proposedPrice: 1500, initialEstimate: 1800, status: "AWAITING_CLIENT_RESPONSE", lastMessage: "Quoted ৳ 1,500 including replacement circuit breaker." },
];

export default function TaskerQuotesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
          Client Quotes, Bidding &amp; Escrow Chat
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Submit competitive proposals in BDT, negotiate scope, and trigger 30% advance escrow lock
        </p>
      </div>

      {/* Quotes Stream */}
      <div className="space-y-4">
        {QUOTES.map((q) => (
          <div key={q.id} className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div>
                <span className="font-bold text-white text-sm">{q.category}</span>
                <span className="text-xs text-slate-400 block mt-0.5">Client: {q.customerName}</span>
              </div>
              <div className="text-right">
                <div className="font-mono font-black text-sm text-white">৳ {q.proposedPrice}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  q.status === "ACCEPTED" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-300"
                }`}>
                  {q.status === "ACCEPTED" ? "Escrow Locked" : "Bid Submitted"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 text-xs text-slate-300 font-mono">
              💬 {q.lastMessage}
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => alert(`Opening escrow chat channel with ${q.customerName}...`)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs shadow-xs transition"
              >
                Open Escrow Chat Channel &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
