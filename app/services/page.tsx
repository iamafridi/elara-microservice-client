"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow } from "@/context/WorkflowContext";

interface ServiceItem {
  id: string;
  category: "customer" | "merchant" | "rider" | "tasker";
  categoryLabel: string;
  title: string;
  headline?: string;
  description: string;
  etaOrPayout: string;
  priceOrCommission: string;
  icon: string;
  badge: string;
  highlights: string[];
  actionLink: string;
  actionText: string;
}

const ALL_SERVICES: ServiceItem[] = [
  // Customer Verticals
  {
    id: "serv-food",
    category: "customer",
    categoryLabel: "Customer Service",
    title: "Kacchi & Food Dining",
    headline: "Old Dhaka Kacchi, Tehari & 1,000+ Restaurants",
    description: "Sultan's Dine, Kacchi Bhai, Star Kabab with thermal bag insulation and 24-minute average delivery across Dhaka metro.",
    etaOrPayout: "24 min avg ETA",
    priceOrCommission: "Delivery from ৳ 50",
    icon: "restaurant",
    badge: "100% Halal Verified",
    highlights: ["Live Rider GPS", "Multi-Cart Allowed", "Zero Markups"],
    actionLink: "/marketplace",
    actionText: "Order Food Now",
  },
  {
    id: "serv-bazaar",
    category: "customer",
    categoryLabel: "Customer Service",
    title: "Daily Bazaar & Padma Ilish",
    headline: "Morning Catch Fish, Fresh Veggies & Mudir Dokan",
    description: "Daily fresh Padma Ilish, Rui, Katla, and organic vegetables cleaned, custom cut, and delivered in cold-chain containers.",
    etaOrPayout: "45 min express",
    priceOrCommission: "Accurate Scale Weight",
    icon: "shopping_basket",
    badge: "Cold Chain 0-4°C",
    highlights: ["Free Fish Cleaning", "Weight Variance Capped", "Substitution Control"],
    actionLink: "/marketplace",
    actionText: "Shop Daily Bazaar",
  },
  {
    id: "serv-courier",
    category: "customer",
    categoryLabel: "Customer Service",
    title: "Express Parcel & Documents",
    description: "Point-to-point motorcycle courier for confidential documents, packages, and parcels across Dhaka, Chittagong, and Sylhet.",
    etaOrPayout: "15 min pickup",
    priceOrCommission: "From ৳ 60 / trip",
    icon: "local_shipping",
    badge: "Multi-Drop Route",
    highlights: ["Photo Handover Proof", "COD Collection", "Real-Time Telemetry"],
    actionLink: "/marketplace",
    actionText: "Send a Parcel",
  },
  {
    id: "serv-sheba",
    category: "customer",
    categoryLabel: "Customer Service",
    title: "JobTap Home Sheba",
    headline: "AC Servicing, Electrician, Plumbing & Cleaning",
    description: "Book verified local tradespeople in minutes. Upfront fixed price quotes and 30% platform escrow protection.",
    etaOrPayout: "Within 2 hours",
    priceOrCommission: "Fixed Upfront BDT",
    icon: "handyman",
    badge: "30% Escrow Shield",
    highlights: ["NID Vetted Pros", "Warranty on Repairs", "Escrow Handover"],
    actionLink: "/tasker",
    actionText: "Book a Service",
  },
  {
    id: "serv-halal",
    category: "customer",
    categoryLabel: "Customer Service",
    title: "Halal Fresh Butchery",
    headline: "DSC-Certified Mutton, Beef & Free Range Chicken",
    description: "Order certified fresh halal meat with custom cuts (korma, rezala, curry, BBQ) delivered cold directly to your kitchen.",
    etaOrPayout: "Same-day Cold Slot",
    priceOrCommission: "By Net Weight",
    icon: "kebab_dining",
    badge: "DSC Certified",
    highlights: ["Custom Cuts", "Fresh Slaughter Date", "Insulated Delivery"],
    actionLink: "/marketplace",
    actionText: "Order Halal Meat",
  },
  {
    id: "serv-flowers",
    category: "customer",
    categoryLabel: "Customer Service",
    title: "Flowers & Festive Gifts",
    headline: "Bouquets, Sweets & Chocolates for Special Occasions",
    description: "Hand-tied flower bouquets with guaranteed 1-hour delivery time slots and anonymous sender privacy.",
    etaOrPayout: "1-hour slot guarantee",
    priceOrCommission: "From ৳ 350",
    icon: "local_florist",
    badge: "Time-Slot Guaranteed",
    highlights: ["Personalized Cards", "Anonymous Delivery", "Fresh Stem Guarantee"],
    actionLink: "/marketplace",
    actionText: "Send Flowers",
  },

  // Merchant Dokan Verticals
  {
    id: "serv-mch-kds",
    category: "merchant",
    categoryLabel: "Merchant Dokan",
    title: "Zero Hardware Kitchen Display (KDS)",
    headline: "Run Your Restaurant or Store From Any Smartphone",
    description: "Free in-browser kitchen display system with instant audio chimes for incoming orders, prep countdowns, and rider handoffs.",
    etaOrPayout: "Instant setup",
    priceOrCommission: "0% Initial License Fee",
    icon: "storefront",
    badge: "Free Browser POS",
    highlights: ["Sound Alerts", "One-Tap Prep Mark", "Bluetooth Printer Support"],
    actionLink: "/merchant",
    actionText: "Launch Merchant Dokan",
  },
  {
    id: "serv-mch-stock",
    category: "merchant",
    categoryLabel: "Merchant Dokan",
    title: "Real-Time 86 Stock & Price Control",
    headline: "Update Dishes & Daily Pricing in Real-Time",
    description: "Toggle sold-out items instantly without calling support. Full control over variant prices and daily inventory levels.",
    etaOrPayout: "Real-time sync",
    priceOrCommission: "Zero Platform Delay",
    icon: "inventory_2",
    badge: "Instant 86 Toggle",
    highlights: ["Variant Groups", "Promo Discounts", "Mushak-6.3 VAT Reports"],
    actionLink: "/merchant",
    actionText: "Manage Inventory",
  },
  {
    id: "serv-mch-settlement",
    category: "merchant",
    categoryLabel: "Merchant Dokan",
    title: "Instant BEFTN & MFS Settlements",
    headline: "Automated Daily Payouts to Your Bangladesh Bank",
    description: "Earnings are credited directly to your business account or merchant bKash/Nagad wallet with 100% transparent fee breakdowns.",
    etaOrPayout: "Daily automated",
    priceOrCommission: "Direct BEFTN / MFS",
    icon: "account_balance",
    badge: "Bank Grade Settlement",
    highlights: ["No Hidden Deductions", "Daily CSV Export", "Dedicated Account Lead"],
    actionLink: "/merchant",
    actionText: "View Settlement Desk",
  },

  // Rider Fleet Verticals
  {
    id: "serv-rdr-shifts",
    category: "rider",
    categoryLabel: "Rider Fleet",
    title: "Multi-Vertical Shift Earning",
    headline: "Deliver Food, Parcels & Groceries in One Single Shift",
    description: "No dead-heading or idle waiting. Accept Kacchi lunch runs, express document drops, and grocery baskets on your motorcycle.",
    etaOrPayout: "৳ 60 - ৳ 120 / drop",
    priceOrCommission: "Instant bKash Payout",
    icon: "two_wheeler",
    badge: "Zero Dead Miles",
    highlights: ["Batched Routes", "Peak Hour Multipliers", "Fuel Stipend Bonus"],
    actionLink: "/rider",
    actionText: "Launch Rider Console",
  },
  {
    id: "serv-rdr-shield",
    category: "rider",
    categoryLabel: "Rider Fleet",
    title: "Rider Safety Shield & Cash Bag",
    headline: "Transparent COD Ledger & Accidental Coverage",
    description: "Keep track of all collected cash-on-delivery in real-time with direct MFS handoffs and 24/7 Dhaka emergency road assistance.",
    etaOrPayout: "Instant Ledger",
    priceOrCommission: "Platform Insured",
    icon: "security",
    badge: "24/7 Road Rescue",
    highlights: ["Accident Insurance", "Easy COD Clearance", "Performance Trophies"],
    actionLink: "/rider",
    actionText: "View Fleet Wallet",
  },

  // Tasker Sheba Verticals
  {
    id: "serv-tsk-escrow",
    category: "tasker",
    categoryLabel: "Tasker Sheba",
    title: "JobTap 30% Escrow Shield",
    headline: "Never Chase Unpaid Residential Invoices Again",
    description: "30% of the service fee is locked in bank escrow before you start traveling. Funds release immediately upon client completion OTP.",
    etaOrPayout: "Instant upon OTP",
    priceOrCommission: "Guaranteed Payout",
    icon: "verified_user",
    badge: "Escrow Protected",
    highlights: ["Guaranteed Money", "Client Verification", "Free Dispute Support"],
    actionLink: "/tasker",
    actionText: "Launch Tasker Hub",
  },
  {
    id: "serv-tsk-lead",
    category: "tasker",
    categoryLabel: "Tasker Sheba",
    title: "High-Value Sheba Bookings",
    headline: "AC Installation, Commercial Electric & Sanitory Jobs",
    description: "Receive pre-qualified job requests from apartments and offices in Gulshan, Banani, Dhanmondi, and Uttara within a 15 km radius.",
    etaOrPayout: "Quotes in 5 mins",
    priceOrCommission: "Set Your Own Rate",
    icon: "plumbing",
    badge: "15 km Radius",
    highlights: ["Customer Chat", "Direct GPS Navigation", "Trade Certification Badging"],
    actionLink: "/tasker",
    actionText: "Browse Sheba Leads",
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "customer" | "merchant" | "rider" | "tasker">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { switchRole } = useWorkflow();

  const filteredServices = ALL_SERVICES.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="shell py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-primary">
          <span>Unified Bangladesh Ecosystem Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-sans text-ink tracking-tight">
          Every Service. Every Participant. One Tap.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Explore all services across the Elara Super App: Customer delivery and dining, Merchant Dokan operations,
          Rider Fleet logistics, and Tasker Home Sheba.
        </p>
      </div>

      {/* Search and Tabs Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-ink/10 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kacchi, Padma Ilish, AC Sheba, Rider, Dokan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface-low border border-ink/10 text-xs font-sans text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-ink font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tab Buttons (Horizontal Scroll on Mobile) */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Services" },
            { id: "customer", label: "Customer (User)" },
            { id: "merchant", label: "Merchant Dokan" },
            { id: "rider", label: "Rider Fleet" },
            { id: "tasker", label: "Tasker Sheba" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition min-h-[40px] ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-surface-low text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header with Icon & Category */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">{service.icon}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-low text-ink font-mono text-[10px] font-bold border border-ink/10">
                  {service.badge}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  {service.categoryLabel}
                </span>
                <h3 className="text-xl font-black font-sans text-ink leading-snug">
                  {service.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Metrics Pills */}
              <div className="p-3 rounded-2xl bg-surface-low border border-ink/5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">ETA / Turnaround</span>
                  <span className="font-bold text-primary">{service.etaOrPayout}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Pricing / Fee</span>
                  <span className="font-bold text-ink">{service.priceOrCommission}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                {service.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-ink/10 mt-6">
              <Link
                href={service.actionLink}
                onClick={() => {
                  if (service.category === "merchant") switchRole("merchant");
                  else if (service.category === "rider") switchRole("rider");
                  else if (service.category === "tasker") switchRole("tasker");
                  else switchRole("customer");
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-mono font-bold transition shadow-md shadow-primary/20 min-h-[44px]"
              >
                <span>{service.actionText}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-3xl border border-ink/10 p-12 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
          <h3 className="text-lg font-bold text-ink">No services match your search</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or select another category tab above.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="btn-primary text-xs min-h-[40px]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

/* elara-stage-160 */
