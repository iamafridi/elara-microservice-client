"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute, useAuth } from "@/context/AuthContext";

interface RiderNav {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const RIDER_NAV: RiderNav[] = [
  { name: "Radar Orders", href: "/rider", icon: "navigation" },
  { name: "Active Trip", href: "/rider/active-trip", icon: "sports_motorsports", badge: "LIVE" },
  { name: "Trip History", href: "/rider/history", icon: "history" },
  { name: "Scorecard", href: "/rider/ratings", icon: "hotel_class" },
  { name: "Daily Earnings", href: "/rider/earnings", icon: "payments" },
  { name: "COD Hub Deposit", href: "/rider/cod", icon: "account_balance_wallet" },
  { name: "Vehicle KYC", href: "/rider/kyc", icon: "verified_user" },
  { name: "Support & SOS", href: "/rider/support", icon: "emergency" },
  { name: "Fleet Community", href: "/rider/feed", icon: "forum" },
];

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["rider", "admin"]} fallbackWorkstationName="Rider Fleet & Delivery Radar">
      <RiderShell>{children}</RiderShell>
    </ProtectedRoute>
  );
}

function RiderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Rider Mobile Header */}
      <header className="sticky top-0 z-40 bg-[#0F1422]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/rider" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-emerald-600/30 shrink-0">
              TH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white leading-tight">
                  Tanvir Hossain
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  Fleet Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Yamaha FZ-X • Banani Hub • 4.9 ★ Rating
              </p>
            </div>
          </Link>
        </div>

        {/* Online / Offline Shift Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 min-h-[38px] shadow-sm ${
              isOnline
                ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-white animate-pulse" : "bg-slate-500"}`}></span>
            <span>{isOnline ? "ON DUTY (Radar Active)" : "OFFLINE (Shift Ended)"}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition"
            title="Sign Out of Rider Console"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </header>

      {/* Main Rider Container */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 pb-20 sm:pb-6">
        {/* Sub-Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 mb-6">
          {RIDER_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? "bg-emerald-600 text-white font-bold shadow-xs shadow-emerald-600/30"
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
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0F1422]/95 backdrop-blur-md border-t border-white/10 py-2 px-4 flex justify-around">
        {RIDER_NAV.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-mono transition ${
                isActive ? "text-emerald-400 font-bold" : "text-slate-400"
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
