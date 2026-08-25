"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWorkflow, Role } from "@/context/WorkflowContext";
import { useAuth } from "@/context/AuthContext";
import ElaraLogo from "./ElaraLogo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { currentRole, currentUser, switchRole } = useWorkflow();
  const { user, isAuthenticated, logout, switchPersona } = useAuth();

  const aboutMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(e.target as Node)) {
        setAboutMenuOpen(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close drawers/menus on route change or Escape
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutMenuOpen(false);
    setRoleMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setAboutMenuOpen(false);
        setRoleMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const rolesList: { role: Role; label: string; icon: string; name: string }[] = [
    { role: "customer", label: "Customer App", icon: "person", name: "Rahim Ahmed" },
    { role: "merchant", label: "Merchant Dokan", icon: "storefront", name: "Kacchi Bhai Banani" },
    { role: "rider", label: "Rider Fleet", icon: "two_wheeler", name: "Tanvir Hossain" },
    { role: "tasker", label: "Tasker Sheba", icon: "handyman", name: "Karigor Suman Miah" },
    { role: "admin", label: "Admin Command", icon: "admin_panel_settings", name: "Central Ops" },
  ];

  const isDedicatedPortal =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/merchant") ||
    pathname.startsWith("/rider") ||
    pathname.startsWith("/tasker");

  if (isDedicatedPortal) {
    return null;
  }

  const isAboutActive =
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/marketplace" ||
    pathname === "/cart" ||
    pathname.startsWith("/customer");

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="shell flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6">
        
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ElaraLogo size="md" showTagline={true} />

          {/* Dhaka Zone Indicator Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-low border border-ink/10 text-xs font-medium text-ink">
            <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
              location_on
            </span>
            <span className="font-bold">Banani &amp; Gulshan-2, Dhaka</span>
            <span className="text-primary font-bold text-[10px] ml-1 bg-primary/10 px-2 py-0.5 rounded-full">
              24m ETA
            </span>
          </div>
        </div>

        {/* Streamlined Desktop Primary Navigation */}
        <nav
          className="hidden lg:flex items-center gap-2 text-xs font-mono tracking-wider uppercase font-semibold text-ink/80"
          aria-label="Main Navigation"
        >
          <Link
            href="/"
            className={`rounded-xl px-3.5 py-2 transition-colors ${
              pathname === "/"
                ? "bg-primary text-white font-bold shadow-xs"
                : "hover:bg-primary/10 hover:text-primary"
            }`}
          >
            Home
          </Link>

          {/* Merged About & Ecosystem Dropdown Menu */}
          <div className="relative" ref={aboutMenuRef}>
            <button
              type="button"
              onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-colors ${
                isAboutActive
                  ? "bg-primary text-white font-bold shadow-xs"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              aria-expanded={aboutMenuOpen}
            >
              <span>About &amp; Ecosystem</span>
              <span className="material-symbols-outlined text-base transition-transform">
                {aboutMenuOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {aboutMenuOpen && (
              <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-white border border-ink/10 shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95 text-left font-sans">
                <div className="p-2 border-b border-ink/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Elara Ecosystem Modules
                  </span>
                </div>

                <div className="py-1 space-y-0.5">
                  <Link
                    href="/about"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-lg">info</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink flex items-center gap-1">
                        <span>About &amp; Showcase</span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-mono font-bold">16 Modules</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Bengal Modernist architecture &amp; tech overview
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/marketplace"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-lg">storefront</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">Food &amp; Bazaar Marketplace</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Kacchi dining, sweets, and Mudir Dokan daily bazaar
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-lg">handyman</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">Services Hub (JobTap Sheba)</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        AC servicing, electrical, plumbing &amp; courier
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/customer/track"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-lg">near_me</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">Track Order Radar</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Live GPS delivery telemetry &amp; 4-digit OTP status
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-lg">shopping_basket</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink flex items-center justify-between">
                        <span>My Basket / Cart</span>
                        {totalCount > 0 && (
                          <span className="text-[10px] font-mono font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">
                            {totalCount} items
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Multi-dokan basket &amp; bKash / Nagad checkout
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/customer"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-lg">account_circle</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">Consumer Account</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Smart NID verification, orders &amp; loyalty wallet
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Shopping Basket Button */}
          <Link
            href="/cart"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-low border border-ink/10 hover:border-primary/50 text-xs font-mono font-bold text-ink transition group min-h-[40px]"
            aria-label={`Shopping Basket with ${totalCount} items`}
          >
            <span
              className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform"
              aria-hidden="true"
            >
              shopping_bag
            </span>
            <span className="hidden sm:inline">Basket</span>
            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-black min-w-[20px] text-center">
              {totalCount}
            </span>
          </Link>

          {/* Conditional Auth & Persona Switcher */}
          {!isAuthenticated ? (
            /* BEFORE LOGIN: Clean Sign In Button (Guest Toggle Hidden) */
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white transition text-xs font-mono font-bold shadow-xs min-h-[40px]"
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>Sign In</span>
            </Link>
          ) : (
            /* AFTER LOGIN: Role Switcher & Persona Toggle Becomes Available */
            <div className="relative" ref={roleMenuRef}>
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-low hover:bg-emerald-50 border border-ink/10 transition text-xs font-mono min-h-[40px]"
                aria-label="Switch User Role and Account"
              >
                <div className="w-6 h-6 rounded-lg bg-primary text-white font-bold flex items-center justify-center text-[10px]">
                  {user?.name ? user.name.charAt(0) : "U"}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold text-ink text-xs leading-none truncate max-w-[120px]">
                    {user?.name?.split(" ")[0] || currentUser.name.split(" ")[0]}
                  </div>
                  <div className="text-[10px] text-primary uppercase font-bold tracking-wider leading-none mt-1">
                    {user?.role || currentRole}
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-slate-400">
                  {roleMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
                </span>
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-ink/10 shadow-2xl p-2 z-50 text-left animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-2 border-b border-ink/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Authenticated Session
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        JWT Active
                      </span>
                    </div>
                    <div className="text-xs font-bold text-ink mt-1 truncate">
                      {user?.name || "Rahim Ahmed"}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">
                      {user?.email || user?.phone || "rahim.ahmed@elara.com.bd"}
                    </div>
                  </div>

                  <div className="py-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 block">
                      Switch Role Persona
                    </span>
                    <div className="space-y-1">
                      {rolesList.map((item) => (
                        <button
                          key={item.role}
                          type="button"
                          onClick={async () => {
                            const personaRole = item.role === "customer" ? "user" : (item.role as any);
                            await switchPersona(personaRole);
                            switchRole(item.role);
                            setRoleMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition text-xs min-h-[38px] ${
                            (user?.role === (item.role === "customer" ? "user" : item.role))
                              ? "bg-primary text-white font-bold"
                              : "hover:bg-surface-low text-ink"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">
                              {item.icon}
                            </span>
                            <div>
                              <div className="font-bold leading-tight">{item.name}</div>
                              <div className={`text-[10px] ${user?.role === (item.role === "customer" ? "user" : item.role) ? "text-emerald-200" : "text-slate-400"}`}>
                                {item.label}
                              </div>
                            </div>
                          </div>
                          {user?.role === (item.role === "customer" ? "user" : item.role) && (
                            <span className="material-symbols-outlined text-sm">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-ink/10 pt-2 px-2 flex justify-between items-center text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setRoleMenuOpen(false);
                      }}
                      className="text-rose-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Switch to Guest (Exit)</span>
                    </button>

                    <Link
                      href="/login"
                      onClick={() => setRoleMenuOpen(false)}
                      className="text-slate-500 hover:text-ink font-mono text-[10px]"
                    >
                      Login Options &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink hover:text-primary rounded-xl border border-ink/20 min-h-[44px] min-w-[44px] flex items-center justify-center transition active:scale-95"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="region"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-ink/10 bg-white px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto font-sans"
        >
          {/* User Status Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-ink/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                {isAuthenticated ? (user?.name ? user.name.charAt(0) : "U") : "G"}
              </div>
              <div>
                <div className="text-xs font-bold text-ink">
                  {isAuthenticated ? (user?.name || "Verified User") : "Guest Visitor"}
                </div>
                <div className="text-[10px] text-primary font-mono uppercase font-semibold">
                  {isAuthenticated ? (user?.role || currentRole) : "Not Signed In"}
                </div>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-[11px] font-mono text-rose-600 font-bold px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">logout</span>
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-mono text-white font-bold px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Core Navigation Links */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-surface-low hover:bg-primary/10 flex items-center gap-2.5 text-ink font-bold text-xs"
            >
              <span className="material-symbols-outlined text-primary text-lg">home</span>
              <span>Home</span>
            </Link>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                About &amp; Ecosystem
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200/60 hover:border-primary flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-primary text-base">info</span>
                  <span>About</span>
                </Link>
                <Link
                  href="/marketplace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200/60 hover:border-primary flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-orange-600 text-base">storefront</span>
                  <span>Marketplace</span>
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200/60 hover:border-primary flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-indigo-600 text-base">handyman</span>
                  <span>Services Hub</span>
                </Link>
                <Link
                  href="/customer/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200/60 hover:border-primary flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sky-600 text-base">near_me</span>
                  <span>Track Order</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200/60 hover:border-primary flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-rose-600 text-base">shopping_basket</span>
                  <span>Basket ({totalCount})</span>
                </Link>
                <Link
                  href="/customer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200/60 hover:border-primary flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-purple-600 text-base">account_circle</span>
                  <span>Account</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Operational Portals Section (Only for authorized/authenticated or test access) */}
          {isAuthenticated && (
            <div className="pt-2 border-t border-ink/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Operational Workstations ({user?.role})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <Link
                  href="/merchant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-between text-amber-900 font-bold"
                >
                  <span>Merchant Dokan KDS</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  href="/rider"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-between text-emerald-900 font-bold"
                >
                  <span>Rider Fleet Console</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  href="/tasker"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-between text-indigo-900 font-bold"
                >
                  <span>Tasker Sheba Portal</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-between text-purple-900 font-bold"
                >
                  <span>Admin Command Center</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

/* elara-stage-146 */
