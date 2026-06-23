"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute, useAuth } from "@/context/AuthContext";
import ElaraLogo from "@/components/ElaraLogo";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const MERCHANT_NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/merchant", icon: "dashboard" },
  { name: "Kitchen POS (KDS)", href: "/merchant/kds", icon: "point_of_sale", badge: "LIVE" },
  { name: "Live Orders", href: "/merchant/orders", icon: "receipt_long" },
  { name: "Menu & 86 Inventory", href: "/merchant/menu", icon: "restaurant_menu" },
  { name: "Menu Categories", href: "/merchant/menu/categories", icon: "category" },
  { name: "Portion Variants", href: "/merchant/menu/variants", icon: "tune" },
  { name: "Financial Reports", href: "/merchant/reports", icon: "analytics" },
  { name: "Customer Reviews", href: "/merchant/reviews", icon: "rate_review" },
  { name: "Settlements & BEFTN", href: "/merchant/settlements", icon: "account_balance" },
  { name: "Bank Account", href: "/merchant/bank", icon: "payments" },
  { name: "Trade License KYC", href: "/merchant/kyc", icon: "verified_user" },
  { name: "Staff & PIN Logins", href: "/merchant/staff", icon: "badge" },
  { name: "Thermal Printer", href: "/merchant/printer", icon: "print" },
  { name: "Support Helpdesk", href: "/merchant/support", icon: "support_agent" },
  { name: "Store Settings", href: "/merchant/settings", icon: "settings" },
];

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["merchant", "admin"]} fallbackWorkstationName="Merchant Dokan & KDS Console">
      <MerchantShell>{children}</MerchantShell>
    </ProtectedRoute>
  );
}

function MerchantShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [alertChime, setAlertChime] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const simulateIncomingAlert = () => {
    setAlertChime(true);
    setTimeout(() => setAlertChime(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 flex flex-col font-sans">
      {/* Top Merchant App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Toggle Merchant Navigation"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <Link href="/merchant" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-orange-600/20">
              KB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                  Kacchi Bhai — Banani Dokan
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                  Verified Kitchen
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
                BIN: 004829104 • VAT Mushak-6.3 • Kemal Ataturk Ave
              </p>
            </div>
          </Link>
        </div>

        {/* Operational Controls & Store Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Chime Test */}
          <button
            type="button"
            onClick={simulateIncomingAlert}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 min-h-[38px] border ${
              alertChime
                ? "bg-rose-500 text-white animate-bounce border-rose-600"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
            }`}
            title="Simulate incoming order bell"
          >
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            <span className="hidden sm:inline">{alertChime ? "Chime Ringing!" : "Test KDS Bell"}</span>
          </button>

          {/* Store Open / 86 Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsStoreOpen(!isStoreOpen)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 min-h-[38px] shadow-sm ${
              isStoreOpen
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-rose-600 text-white hover:bg-rose-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>{isStoreOpen ? "Kitchen LIVE (Open)" : "Store PAUSED (86)"}</span>
          </button>

          {/* User Profile Pill & Sign Out */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
            <span className="text-xs font-mono text-slate-500">
              {user?.email || "kacchi.bhai@elara.com.bd"}
            </span>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Sign Out of Merchant Dokan"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Merchant Portal Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200/80 bg-white p-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 block">
              Dokan Operations Suite
            </span>
            <nav className="space-y-1 pt-2">
              {MERCHANT_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-orange-50 text-orange-600 font-bold border border-orange-200/60 shadow-xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`material-symbols-outlined text-lg ${isActive ? "text-orange-600" : "text-slate-400"}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-rose-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Hardware Status Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                Kitchen Hardware
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono space-y-1">
              <div className="flex justify-between">
                <span>ESC/POS 80mm:</span>
                <span className="text-emerald-600 font-bold">Connected</span>
              </div>
              <div className="flex justify-between">
                <span>BEFTN Clearing:</span>
                <span className="text-slate-700">Nightly 2 AM</span>
              </div>
            </div>
            <Link
              href="/merchant/printer"
              className="text-[10px] font-mono text-orange-600 font-bold hover:underline block pt-1"
            >
              Hardware diagnostics &rarr;
            </Link>
          </div>

          {/* Switch Back to Customer Super App Link */}
          <div className="mt-auto pt-4 border-t border-slate-200/60 space-y-2">
            <Link
              href="/marketplace"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>Consumer Marketplace</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Sign Out of Dokan</span>
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-white h-full p-5 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
                    KB
                  </div>
                  <span className="font-bold text-sm text-slate-900">Kacchi Bhai Banani</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="space-y-1 flex-1 overflow-y-auto">
                {MERCHANT_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? "bg-orange-50 text-orange-600 font-bold border border-orange-200"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`material-symbols-outlined text-lg ${isActive ? "text-orange-600" : "text-slate-400"}`}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-rose-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-slate-200 space-y-2">
                <Link
                  href="/marketplace"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100"
                >
                  <span className="material-symbols-outlined text-base">storefront</span>
                  <span>Consumer Marketplace</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Screen Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
