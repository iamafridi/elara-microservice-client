"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute, useAuth } from "@/context/AuthContext";

interface TaskerNav {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const TASKER_NAV: TaskerNav[] = [
  { name: "Radar Scanner", href: "/tasker/radar", icon: "radar", badge: "LIVE" },
  { name: "My Active Jobs", href: "/tasker/jobs", icon: "assignment" },
  { name: "Quotes & Bidding", href: "/tasker/quotes", icon: "request_quote" },
  { name: "Client Reviews", href: "/tasker/reviews", icon: "rate_review" },
  { name: "Escrow Wallet", href: "/tasker/earnings", icon: "account_balance_wallet" },
  { name: "Instant Cashout", href: "/tasker/withdraw", icon: "payments" },
  { name: "Portfolio & NID", href: "/tasker/profile", icon: "verified" },
];

export default function TaskerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["tasker", "admin"]} fallbackWorkstationName="Tasker Sheba Suite">
      <TaskerShell>{children}</TaskerShell>
    </ProtectedRoute>
  );
}

function TaskerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-[#090C15] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Tasker Header */}
      <header className="sticky top-0 z-40 bg-[#0E1322]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/tasker" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-indigo-600/30 shrink-0">
              SM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white leading-tight">
                  Karigor Suman Miah
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                  HVAC &amp; Electrician
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                148 Jobs Done • 4.9 ★ Rating • Smart NID Verified
              </p>
            </div>
          </Link>
        </div>

        {/* Status Toggle & Sign Out */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 min-h-[38px] shadow-sm ${
              isAvailable
                ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-white animate-pulse" : "bg-slate-500"}`}></span>
            <span>{isAvailable ? "LEADS LIVE (15km)" : "PAUSED"}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition"
            title="Sign Out of Tasker Suite"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </header>

      {/* Main Tasker Body */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 pb-20 sm:pb-6">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 mb-6">
          {TASKER_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? "bg-indigo-600 text-white font-bold shadow-xs shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {children}
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0E1322]/95 backdrop-blur-md border-t border-white/10 py-2 px-4 flex justify-around">
        {TASKER_NAV.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-mono transition ${
                isActive ? "text-indigo-400 font-bold" : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span>{item.name.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* elara-stage-210 */
