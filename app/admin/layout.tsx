"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute, useAuth } from "@/context/AuthContext";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  { name: "Ops Command Dashboard", href: "/admin", icon: "admin_panel_settings" },
  { name: "Unified Orders Stream", href: "/admin/orders", icon: "view_stream", badge: "LIVE" },
  { name: "Consumer User Database", href: "/admin/users", icon: "group" },
  { name: "Merchant Approvals & KYC", href: "/admin/merchants", icon: "verified_user" },
  { name: "Live Fleet Telemetry", href: "/admin/fleet", icon: "navigation" },
  { name: "Taskers & JobTap Suite", href: "/admin/taskers", icon: "handyman" },
  { name: "Categories & Tax Rules", href: "/admin/categories", icon: "category" },
  { name: "Marketing & Campaigns", href: "/admin/marketing", icon: "campaign" },
  { name: "Dispute Arbitration Desk", href: "/admin/disputes", icon: "gavel" },
  { name: "Reviews Moderation", href: "/admin/reviews", icon: "rate_review" },
  { name: "Content CMS & Policies", href: "/admin/cms", icon: "article" },
  { name: "PostGIS Zone & Pricing", href: "/admin/zones", icon: "map" },
  { name: "Finance & BEFTN Payouts", href: "/admin/finance", icon: "account_balance" },
  { name: "Analytics & Reports", href: "/admin/analytics", icon: "insights" },
  { name: "System Security & RBAC", href: "/admin/security", icon: "security" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]} fallbackWorkstationName="Central Command Operations Center">
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Admin Telemetry Header */}
      <header className="sticky top-0 z-40 bg-[#0C101A]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Toggle Admin Navigation"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-purple-600/30">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white leading-tight">
                  ELARA CENTRAL COMMAND
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                  Root Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                PostgreSQL 15 • NestJS Service Mesh Active • 107 API Endpoints
              </p>
            </div>
          </Link>
        </div>

        {/* System Health Indicators & Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">Mesh Gateway (:3000):</span>
            <span className="text-emerald-400 font-bold">100% HEALTHY</span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="text-xs font-mono text-purple-300 hidden sm:inline">
              {user?.email || "admin@elara.com.bd"}
            </span>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              title="Sign Out of Admin Console"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body with Dedicated Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-[#0C101A] p-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 block">
              Governance &amp; Ops Navigation
            </span>
            <nav className="space-y-1 pt-2">
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-purple-600/20 text-purple-300 font-bold border border-purple-500/40 shadow-xs"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`material-symbols-outlined text-lg ${isActive ? "text-purple-400" : "text-slate-500"}`}>
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

          {/* Quick Database Status Box */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 text-[11px] uppercase tracking-wider font-mono">
                PostgreSQL 15
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono space-y-1">
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-white font-bold">elara_db</span>
              </div>
              <div className="flex justify-between">
                <span>Entity Tables:</span>
                <span className="text-emerald-400 font-bold">67 Synced</span>
              </div>
            </div>
          </div>

          {/* Return Links */}
          <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
            <Link
              href="/marketplace"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>Consumer Marketplace</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Exit Admin Console</span>
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-[#0C101A] border-r border-white/10 h-full p-5 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                    EC
                  </div>
                  <span className="font-bold text-sm text-white">Central Command</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="space-y-1 flex-1 overflow-y-auto">
                {ADMIN_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? "bg-purple-600/30 text-purple-300 font-bold border border-purple-500/40"
                          : "text-slate-400 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`material-symbols-outlined text-lg ${isActive ? "text-purple-400" : "text-slate-500"}`}>
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

              <div className="pt-3 border-t border-white/10 space-y-2">
                <Link
                  href="/marketplace"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-white/5"
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
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Admin Screen Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
