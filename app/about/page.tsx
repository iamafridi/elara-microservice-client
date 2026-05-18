"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, Role } from "@/context/WorkflowContext";

interface ScreenCard {
  id: string;
  suite: "auth" | "customer" | "merchant" | "rider" | "tasker" | "admin";
  suiteName: string;
  title: string;
  description: string;
  tag: string;
  route: string;
  roleRequired: Role;
  features: string[];
}

const SCREENS: ScreenCard[] = [
  // 0. Auth & Identity
  {
    id: "auth-otp",
    suite: "auth",
    suiteName: "Universal Identity",
    title: "Bangladesh Mobile Phone OTP Login",
    description: "Operator auto-detection (Grameenphone, Banglalink, Robi, Airtel, Teletalk), 6-digit OTP verification, and secure JWT session creation.",
    tag: "SMS Gate",
    route: "/login",
    roleRequired: "customer",
    features: ["Carrier Auto-Detect", "OTP Countdown", "Biometric Ready"],
  },
  {
    id: "auth-role-switcher",
    suite: "auth",
    suiteName: "Universal Identity",
    title: "Universal Persona & Role Switcher",
    description: "Seamless 1-tap switching between Customer, Food Merchant, Rider Fleet, Sheba Tasker, and Super Admin.",
    tag: "Multi-Role",
    route: "/login",
    roleRequired: "customer",
    features: ["Instant Context Switch", "Seed Data Preloaded", "Permission Matrix"],
  },

  // 1. Customer Super App Suite
  {
    id: "cust-marketplace",
    suite: "customer",
    suiteName: "Customer Super App",
    title: "Dhaka Metro Marketplace",
    description: "Hyper-local marketplace with Banani, Gulshan, and Dhanmondi vendors. Filter by Biryani, Fish, Groceries, and Sheba.",
    tag: "Marketplace",
    route: "/marketplace",
    roleRequired: "customer",
    features: ["Zone Filtering", "Real-Time Stock", "BDT Pricing"],
  },
  {
    id: "cust-food-dining",
    suite: "customer",
    suiteName: "Customer Super App",
    title: "Kacchi & Food Dining",
    description: "Sultan's Dine, Kacchi Bhai, Star Kabab, and 1,000+ verified halal restaurants across Dhaka with 24-minute average delivery.",
    tag: "Food & Dining",
    route: "/marketplace",
    roleRequired: "customer",
    features: ["100% Halal Verified", "Thermal Bag Protection", "Custom Cuts"],
  },
  {
    id: "cust-daily-bazaar",
    suite: "customer",
    suiteName: "Customer Super App",
    title: "Daily Bazaar & Fresh Fish",
    description: "Padma River Ilish, Rui, Katla, and fresh Kawran Bazar vegetables with custom curry cutting and cold-chain delivery.",
    tag: "Daily Bazaar",
    route: "/marketplace",
    roleRequired: "customer",
    features: ["Free Cleaning & Gutting", "Weighted Scale Verification", "Express Slot"],
  },
  {
    id: "cust-courier",
    suite: "customer",
    suiteName: "Customer Super App",
    title: "Express P2P & Multi-Stop Courier",
    description: "Send documents and parcels across Dhaka in 15 minutes. Instant quotes, live GPS rider tracking, and optional cash-on-delivery.",
    tag: "Logistics",
    route: "/services",
    roleRequired: "customer",
    features: ["Point-to-Point Route", "Photo Proof of Delivery", "Escrow Cover"],
  },
  {
    id: "cust-live-tracking",
    suite: "customer",
    suiteName: "Customer Super App",
    title: "Live Order Tracking & Telemetry",
    description: "Real-time order progress bar: Placed → Confirmed → Cooking in KDS → Rider Tanvir Assigned → Delivered with OTP.",
    tag: "Live Telemetry",
    route: "/customer/track",
    roleRequired: "customer",
    features: ["Live Stepper", "Rider Phone Contact", "4-Digit Delivery OTP"],
  },
  {
    id: "cust-cart",
    suite: "customer",
    suiteName: "Customer Super App",
    title: "Multi-Vendor Basket & MFS Checkout",
    description: "Simultaneous checkout across multiple local merchants with bKash, Nagad, Visa/Mastercard, or Cash on Delivery.",
    tag: "MFS Checkout",
    route: "/cart",
    roleRequired: "customer",
    features: ["bKash Direct Gateway", "Nagad Instant Checkout", "Voucher Engine"],
  },

  // 2. Merchant Dokan Operations
  {
    id: "mch-kds",
    suite: "merchant",
    suiteName: "Merchant Dokan",
    title: "Kitchen Display System (KDS)",
    description: "Live incoming kitchen orders console. Sound alerts, cooking countdown timer, and 'Ready for Rider' dispatch trigger.",
    tag: "Kitchen Display",
    route: "/merchant",
    roleRequired: "merchant",
    features: ["Audio Chime Alert", "Prep Time Controller", "Auto Rider Dispatch"],
  },
  {
    id: "mch-menu",
    suite: "merchant",
    suiteName: "Merchant Dokan",
    title: "Menu & Real-Time 86 Stock Control",
    description: "Toggle dishes and stock items available or sold-out with zero platform delay. Update prices and portion sizes live.",
    tag: "Stock Control",
    route: "/merchant",
    roleRequired: "merchant",
    features: ["Instant 86 Toggle", "Variant Groups", "VAT Mushak-6.3 Config"],
  },
  {
    id: "mch-earnings",
    suite: "merchant",
    suiteName: "Merchant Dokan",
    title: "Daily Settlements & MFS Payouts",
    description: "Real-time breakdown of daily gross revenue in ৳ BDT with automated BEFTN and bKash merchant payouts.",
    tag: "Settlements",
    route: "/merchant",
    roleRequired: "merchant",
    features: ["BEFTN Bank Transfer", "Commission Transparency", "Daily CSV Reports"],
  },

  // 3. Rider Fleet Logistics
  {
    id: "rdr-radar",
    suite: "rider",
    suiteName: "Rider Fleet",
    title: "Active Delivery Radar & Dispatch",
    description: "Nearby available pickup requests within 3 km in Banani and Gulshan. Shows distance, trip fee, and pickup deadline.",
    tag: "Dispatch Radar",
    route: "/rider",
    roleRequired: "rider",
    features: ["Auto Order Batching", "Zone Surging", "Accept / Reject Timer"],
  },
  {
    id: "rdr-telemetry",
    suite: "rider",
    suiteName: "Rider Fleet",
    title: "GPS Navigation & OTP Handover",
    description: "Turn-by-turn route simulation to customer location. Secure 4-digit OTP handover validation preventing fraudulent claims.",
    tag: "GPS & OTP",
    route: "/rider",
    roleRequired: "rider",
    features: ["Dhaka Route Mapping", "OTP Cryptographic Check", "Cash Bag Ledger"],
  },

  // 4. Tasker Sheba Suite
  {
    id: "tsk-sheba",
    suite: "tasker",
    suiteName: "Tasker Sheba",
    title: "JobTap Sheba Professional Console",
    description: "Receive high-value residential servicing jobs (AC master clean, electrical tripping, plumbing) with 30% upfront escrow protection.",
    tag: "Escrow Sheba",
    route: "/tasker",
    roleRequired: "tasker",
    features: ["30% Escrow Shield", "NID Trade Badging", "Direct Customer Call"],
  },

  // 5. Admin Command & Control
  {
    id: "adm-ops",
    suite: "admin",
    suiteName: "Admin Command",
    title: "Dhaka Central Command & Telemetry",
    description: "Executive platform dashboard with real-time Gross Merchandise Value (GMV), active fleet heatmap, and PostGIS zones.",
    tag: "Central Command",
    route: "/admin",
    roleRequired: "admin",
    features: ["Live GMV in ৳ BDT", "10 PostGIS Zones", "Emergency Fleet Broadcast"],
  },
  {
    id: "adm-settlements",
    suite: "admin",
    suiteName: "Admin Command",
    title: "MFS Gateway & Settlement Health",
    description: "Live uptime monitor for bKash, Nagad, and Bangladesh Bank BEFTN payment rails with automatic retry queues.",
    tag: "Fintech Rails",
    route: "/admin",
    roleRequired: "admin",
    features: ["bKash API Uptime", "Nagad Instant Webhooks", "Dispute Arbitration"],
  },
];

export default function AboutShowcasePage() {
  const [selectedSuite, setSelectedSuite] = useState<string>("all");
  const { currentRole, switchRole } = useWorkflow();

  const suites = [
    { id: "all", label: "All Modules (16)", count: SCREENS.length },
    { id: "customer", label: "Customer Suite", count: SCREENS.filter((s) => s.suite === "customer").length },
    { id: "merchant", label: "Merchant Dokan", count: SCREENS.filter((s) => s.suite === "merchant").length },
    { id: "rider", label: "Rider Fleet", count: SCREENS.filter((s) => s.suite === "rider").length },
    { id: "tasker", label: "Tasker Sheba", count: SCREENS.filter((s) => s.suite === "tasker").length },
    { id: "admin", label: "Admin Command", count: SCREENS.filter((s) => s.suite === "admin").length },
    { id: "auth", label: "Universal Identity", count: SCREENS.filter((s) => s.suite === "auth").length },
  ];

  const filteredScreens =
    selectedSuite === "all"
      ? SCREENS
      : SCREENS.filter((s) => s.suite === selectedSuite);

  return (
    <div className="shell py-10 space-y-12">
      {/* Top Banner / Hero Pitch */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-10 text-white shadow-2xl border border-primary/30 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Master Super App Architecture &amp; Ecosystem Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans leading-tight">
            5 synchronized roles. One unified Bangladesh engine.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Engineered exclusively for Bangladesh. Seamlessly orchestrates Kacchi dining, Mudir Dokan groceries,
            express parcel couriers, TaskOnTap home sheba, and instant bKash/Nagad payments backed by PostgreSQL 15,
            PostGIS spatial zones, and high-concurrency microservices.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-emerald-600 text-white text-xs font-mono font-bold transition shadow-lg flex items-center gap-2 min-h-[44px]"
            >
              <span>Explore Marketplace</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-mono font-bold transition flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-sm">person_outline</span>
              <span>Switch Demo Persona</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Technical Architecture Quick Facts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Database Engine</div>
          <div className="text-lg font-black text-ink">PostgreSQL 15</div>
          <div className="text-xs text-primary font-mono font-semibold">PostGIS 10 Zones</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">MFS Payment Rails</div>
          <div className="text-lg font-black text-ink">bKash &amp; Nagad</div>
          <div className="text-xs text-rose-600 font-mono font-semibold">Instant Webhooks</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Escrow Security</div>
          <div className="text-lg font-black text-ink">30% JobTap Shield</div>
          <div className="text-xs text-indigo-600 font-mono font-semibold">Verified NID Pros</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Delivery Telemetry</div>
          <div className="text-lg font-black text-ink">24-Min Avg ETA</div>
          <div className="text-xs text-emerald-600 font-mono font-semibold">4-Digit Secure OTP</div>
        </div>
      </div>

      {/* Interactive Suite Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <div>
            <h2 className="text-2xl font-black font-sans text-ink">
              Ecosystem Screen &amp; Module Directory
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Select a vertical below to inspect its features and launch directly into the active interactive workstation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Showing:</span>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
              {filteredScreens.length} Active Modules
            </span>
          </div>
        </div>

        {/* Filter Pills with Horizontal Scroll on Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {suites.map((suite) => (
            <button
              key={suite.id}
              type="button"
              onClick={() => setSelectedSuite(suite.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition min-h-[40px] flex items-center gap-1.5 ${
                selectedSuite === suite.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white border border-ink/10 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{suite.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedSuite === suite.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {suite.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Screens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScreens.map((screen) => (
          <div
            key={screen.id}
            className="group rounded-3xl border border-ink/10 bg-white p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-black uppercase">
                  {screen.tag}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {screen.suiteName}
                </span>
              </div>

              <h3 className="font-sans font-black text-lg text-ink group-hover:text-primary transition-colors leading-snug">
                {screen.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {screen.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {screen.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-2 py-0.5 rounded-md bg-surface-low text-[10px] font-mono text-slate-600 border border-ink/5"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-ink/10 mt-6 flex items-center justify-between">
              <Link
                href={screen.route}
                onClick={() => {
                  if (currentRole !== screen.roleRequired) {
                    switchRole(screen.roleRequired);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ink hover:bg-primary text-white text-xs font-mono font-bold transition min-h-[44px]"
              >
                <span>Launch Interactive Screen</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Role Switcher Floating Callout */}
      <div className="rounded-3xl border-2 border-ink bg-amber-50/50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">switch_account</span>
            <span>Live Persona Simulation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-sans text-ink">
            Experience the platform from any user&apos;s shoes.
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Switch between Rahim (Customer placing orders), Kacchi Bhai (Merchant cooking in KDS), Tanvir
            (Rider delivering with OTP), Suman (Tasker completing jobs), and Central Admin (Monitoring platform GMV).
          </p>
        </div>

        <Link
          href="/login"
          className="px-6 py-3.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shrink-0 min-h-[44px] flex items-center justify-center"
        >
          Open Persona Switcher &rarr;
        </Link>
      </div>
    </div>
  );
}
