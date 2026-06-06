"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute, useAuth } from "@/context/AuthContext";
import { useWorkflow } from "@/context/WorkflowContext";

interface CustomerNav {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const CUSTOMER_NAV: CustomerNav[] = [
  { name: "My Account", href: "/customer", icon: "person" },
  { name: "Live Order Tracking", href: "/customer/track", icon: "local_shipping", badge: "LIVE" },
  { name: "Orders & Invoices", href: "/customer/orders", icon: "receipt_long" },
  { name: "Elara Pay Wallet", href: "/customer/wallet", icon: "account_balance_wallet" },
  { name: "Saved Addresses", href: "/customer/addresses", icon: "location_on" },
  { name: "Refunds & Support", href: "/customer/refunds", icon: "assignment_return" },
  { name: "24/7 Live Care", href: "/customer/support", icon: "headset_mic", badge: "CARE" },
  { name: "Notifications", href: "/customer/notifications", icon: "notifications" },
  { name: "Vouchers & Promos", href: "/customer/vouchers", icon: "loyalty" },
  { name: "VIP Loyalty Club", href: "/customer/loyalty", icon: "stars", badge: "GOLD" },
  { name: "Profile & NID", href: "/customer/profile", icon: "badge" },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["user", "admin"]} fallbackWorkstationName="Customer Account Portal">
      <CustomerShell>{children}</CustomerShell>
    </ProtectedRoute>
  );
}

function CustomerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { activeCustomerOrder } = useWorkflow();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Mobile Portal Navigation Bar (only visible on mobile screens) */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white font-black text-xs flex items-center justify-center">
            {(user?.fullName || user?.name || "RA").slice(0, 2).toUpperCase()}
          </div>
          <span className="font-bold text-xs text-slate-900 truncate">
            {user?.fullName || user?.name || "Rahim Ahmed"}
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition"
        >
          <span className="material-symbols-outlined text-sm">menu</span>
          <span>Portal Menu</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-1 shadow-md animate-in slide-in-from-top-2">
          {CUSTOMER_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                  isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Container with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-6 lg:gap-8">
        {/* Desktop Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-4 hidden md:block">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
              {(user?.fullName || user?.name || "RA").slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900 truncate">
                  {user?.fullName || user?.name || "Rahim Ahmed"}
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[9px] font-mono font-bold shrink-0">
                  ★ VIP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                {user?.email || "rahim.ahmed@elara.com.bd"}
              </p>
            </div>
          </div>

          {/* Navigation Links Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xs space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Account Navigation
            </div>
            {CUSTOMER_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-red-100 text-red-600 animate-pulse"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Elara Pay Quick Balance Mini-Card */}
            <div className="pt-2 mt-2 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Elara Pay</span>
                  <span className="font-bold text-slate-900">৳ 4,850 BDT</span>
                </div>
                <Link
                  href="/customer/wallet"
                  className="block text-center text-[11px] font-bold text-primary hover:underline font-mono"
                >
                  + Add Money (bKash)
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
