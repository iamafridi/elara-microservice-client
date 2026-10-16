"use client";

import { useState } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/modules";
import { CITIES } from "@/lib/site";

const TRANSLATIONS = {
  EN: {
    heroBadge: "Dhaka • Chittagong • Sylhet • 10 Hubs",
    heroLine1: "Everything",
    heroLine2: "in one tap.",
    heroDesc:
      "The first hyper-local unified consumer ecosystem engineered specifically for Bangladesh. Seamlessly orchestrating Kacchi dining, Mudir Dokan groceries, express parcel couriers, TaskOnTap home sheba, and instant bKash/Nagad payments.",
    btnWaitlist: "Join the VIP Waitlist",
    btnExplore: "Explore 16 Services",
    statFee: "৳ 0",
    statFeeLabel: "Subscription Fee",
    statEta: "24 min",
    statEtaLabel: "Avg Delivery ETA",
    statMfs: "100%",
    statMfsLabel: "bKash & Nagad MFS",
    ecoSub: "01 / UNIFIED ARCHITECTURE",
    ecoTitle: "Life doesn’t come in separate tabs.",
    ecoDesc:
      "Why switch across six different apps in Dhaka? Elara binds everyday culinary desires, parcel logistics, home repairs, and local commerce into a single seamless experience.",
    connSub: "02 / CONNECTIVITY GRAPH",
    connTitle: "Five participants. One heartbeat.",
    connDesc:
      "Every participant operates on dedicated, optimized tooling connected to the same high-concurrency event bus.",
    foundSub: "03 / FOUNDATION ENGINE",
    foundTitle: "Beautifully simple. Seriously built.",
    foundDesc:
      "Behind the luxury editorial exterior lives an enterprise NestJS 10 microservice mesh backed by PostgreSQL 15, PostGIS spatial indexing, Typesense sub-millisecond search, and Redis cluster caching.",
    manifestoTitle: "The best technology feels like belonging.",
    manifestoQuote:
      "\"We didn't set out to build another copy-paste delivery app. We built an engine that understands the rhythm of Dhaka's streets, the warmth of adda, and the dignity of every rider, cook, and artisan.\"",
  },
  BN: {
    heroBadge: "ঢাকা • চট্টগ্রাম • সিলেট • ১০টি জোন",
    heroLine1: "সবকিছু একসাথে,",
    heroLine2: "এক ট্যাপেই।",
    heroDesc:
      "বাংলাদেশের মানুষের দৈনন্দিন জীবনের সব সেবা এবার এক ছাদের নিচে। গরম কাচ্চি বিরিয়ানি, পদ্মার তাজা ইলিশ, দ্রুতগতির পার্সেল ডেলিভারি, বিশ্বস্ত হোম সেবা এবং বিকাশ/নগদের সহজ পেমেন্ট।",
    btnWaitlist: "ভিআইপি তালিকায় যোগ দিন",
    btnExplore: "১৬টি সেবা দেখুন",
    statFee: "৳ ০",
    statFeeLabel: "সাবস্ক্রিপশন ফি",
    statEta: "২৪ মিনিট",
    statEtaLabel: "গড় ডেলিভারি সময়",
    statMfs: "১০০%",
    statMfsLabel: "বিকাশ ও নগদ এমএফএস",
    ecoSub: "০১ / সমন্বিত প্রযুক্তি",
    ecoTitle: "জীবন কোনো আলাদা ট্যাবে চলে না।",
    ecoDesc:
      "ঢাকায় কেন ছয়টি ভিন্ন অ্যাপ চালাবেন? এলারা আপনার খাবার, বাজার, পার্সেল এবং ঘরের মিস্ত্রি সেবাকে যুক্ত করেছে একটি মাত্র প্ল্যাটফর্মে।",
    connSub: "০২ / কানেক্টিভিটি গ্রাফ",
    connTitle: "পাঁচটি পক্ষ। একটি হৃদস্পন্দন।",
    connDesc:
      "গ্রাহক, রেস্তোরাঁ, রাইডার, কারিগর এবং অপস কমান্ড — সবাই একটি সুরক্ষিত রিয়েল-টাইম ক্লাউড ইঞ্জিনে সংযুক্ত।",
    foundSub: "০৩ / মূল ভিত্তি",
    foundTitle: "চোখে সুন্দর। প্রযুক্তিতে মজবুত।",
    foundDesc:
      "নেস্টজেএস ১০ মাইক্রোসার্ভিস, পোস্টগ্রিস ১৫, পোস্টজিআইএস ম্যাপ ইনডেক্সিং এবং রেডিস ক্লাস্টারে পরিচালিত বাংলাদেশের নিজস্ব সুপার অ্যাপ।",
    manifestoTitle: "সেরা প্রযুক্তি হলো আপন করে নেয়ার অনুভূতি।",
    manifestoQuote:
      "\"আমরা কেবল আরেকটি ডেলিভারি অ্যাপ বানাইনি। আমরা তৈরি করেছি এমন একটি মাধ্যম, যা বোঝে ঢাকার রাজপথের স্পন্দন, সন্ধ্যার আড্ডা এবং প্রতিটি রাইডার ও রন্ধনশিল্পীর আত্মমর্যাদা।\"",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const t = TRANSLATIONS[lang];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistSubmitted(true);
  };

  return (
    <div className="bg-ivory text-ink selection:bg-cobalt selection:text-ivory">
      {/* 1. TOP SUB-HEADER / LANGUAGE TOGGLE BAR */}
      <div className="border-b border-ink/10 bg-ivory/60 px-6 py-2.5 backdrop-blur-sm">
        <div className="shell flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-slate-600 hidden sm:inline">Dhaka Hub Operational • All 11 Services Live</span>
            <span className="text-slate-600 sm:hidden">Dhaka Hub Live</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-3 py-1 font-bold text-ink hover:border-cobalt transition-colors"
              title="Toggle Language"
            >
              <span className={lang === "EN" ? "text-cobalt font-black" : "text-slate-400"}>EN</span>
              <span className="text-slate-300">/</span>
              <span className={lang === "BN" ? "text-primary font-black" : "text-slate-400"}>বাং</span>
            </button>
            <a
              href="#waitlist"
              className="rounded-full bg-cobalt px-3.5 py-1 text-ivory font-bold hover:bg-ink transition-colors"
            >
              VIP Access
            </a>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 pt-12 pb-24 md:py-24 max-w-7xl mx-auto overflow-hidden">
        {/* Ghost Background Typography */}
        <div className="absolute -top-10 -left-12 select-none pointer-events-none text-[15vw] font-black text-ink/[0.03] tracking-ultra-tight leading-none z-0">
          ELARA
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8">
            {/* Metadata Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-ink/15 bg-white/70 backdrop-blur text-[11px] font-mono uppercase tracking-widest text-ink">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping"></span>
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-ink tracking-ultra-tight leading-[0.92]">
                <span>{t.heroLine1}</span>
                <br />
                <span className="font-serif italic font-normal text-cobalt selection:text-white">
                  {t.heroLine2}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-ink/80 max-w-xl font-normal leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Search Bar / Portals */}
            <div className="max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/marketplace?q=${encodeURIComponent(searchQuery)}`;
                }}
                className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-white p-2 editorial-shadow-ink"
              >
                <span className="material-symbols-outlined ml-2 text-ink/50">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Kacchi, Padma Ilish, AC Repair, Courier..."
                  className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-cobalt px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ivory hover:bg-ink transition-colors shrink-0 min-h-[44px]"
                >
                  Explore
                </button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono text-slate-500">
                <span>Try:</span>
                <Link href="/marketplace" className="text-cobalt hover:underline font-bold">Sultan&apos;s Dine Kacchi</Link>
                <span>•</span>
                <Link href="/marketplace" className="text-cobalt hover:underline font-bold">Chandpur Hilsa</Link>
                <span>•</span>
                <Link href="/tasker" className="text-cobalt hover:underline font-bold">AC Jet Wash</Link>
                <span>•</span>
                <Link href="/services" className="text-cobalt hover:underline font-bold">Parcel 15m</Link>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/marketplace"
                className="px-8 py-4 bg-primary hover:bg-emerald-800 text-white text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-200 editorial-shadow-ink text-center flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>{t.btnExplore}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/about"
                className="px-7 py-4 bg-white border border-ink/20 hover:border-cobalt text-ink text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-200 text-center flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span className="material-symbols-outlined text-sm text-primary">view_quilt</span>
                <span>Full Ecosystem Showcase</span>
              </Link>
            </div>

            {/* Interactive Workstation Quick Stations */}
            <div className="p-4 rounded-2xl bg-white/80 border border-ink/15 backdrop-blur space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold uppercase tracking-wider text-slate-600">
                  ⚡ 1-Click Operational Workstations
                </span>
                <Link href="/login" className="text-primary font-bold hover:underline">
                  Switch Persona &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                <Link
                  href="/marketplace"
                  className="p-2 rounded-xl bg-surface-low hover:bg-primary/10 text-ink font-bold flex items-center gap-1.5 transition text-center justify-center min-h-[40px]"
                >
                  <span>👤 Customer</span>
                </Link>
                <Link
                  href="/merchant"
                  className="p-2 rounded-xl bg-surface-low hover:bg-amber-100 text-secondary font-bold flex items-center gap-1.5 transition text-center justify-center min-h-[40px]"
                >
                  <span>🏪 Merchant</span>
                </Link>
                <Link
                  href="/rider"
                  className="p-2 rounded-xl bg-surface-low hover:bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1.5 transition text-center justify-center min-h-[40px]"
                >
                  <span>🛵 Rider</span>
                </Link>
                <Link
                  href="/tasker"
                  className="p-2 rounded-xl bg-surface-low hover:bg-indigo-100 text-indigo-800 font-bold flex items-center gap-1.5 transition text-center justify-center min-h-[40px]"
                >
                  <span>🛠️ Tasker</span>
                </Link>
                <Link
                  href="/admin"
                  className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold flex items-center gap-1.5 transition text-center justify-center min-h-[40px]"
                >
                  <span>🛡️ Admin</span>
                </Link>
              </div>
            </div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-ink/10 flex items-center gap-8 text-xs font-mono text-ink/70">
              <div>
                <span className="block text-xl font-black text-ink font-sans">{t.statFee}</span>
                <span className="text-[10px] uppercase">{t.statFeeLabel}</span>
              </div>
              <div className="w-px h-8 bg-ink/10"></div>
              <div>
                <span className="block text-xl font-black text-ink font-sans">{t.statEta}</span>
                <span className="text-[10px] uppercase">{t.statEtaLabel}</span>
              </div>
              <div className="w-px h-8 bg-ink/10"></div>
              <div>
                <span className="block text-xl font-black text-ink font-sans">{t.statMfs}</span>
                <span className="text-[10px] uppercase">{t.statMfsLabel}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Editorial Technology Object */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-10">
            {/* Coral Offset Shadow Shape */}
            <div className="absolute w-72 h-96 sm:w-80 sm:h-[420px] rounded-[100px] bg-coral transform translate-x-4 translate-y-4 -rotate-3 z-0"></div>

            {/* Main Black Organic Capsule */}
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-[100px] bg-ink border-2 border-ink flex flex-col items-center justify-between p-8 text-ivory z-10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#2448FF_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-cobalt/30 rounded-full blur-3xl"></div>

              {/* Top Meta */}
              <div className="w-full flex items-center justify-between z-10 text-[10px] font-mono tracking-widest text-ivory/60 uppercase">
                <span>ELARA ENGINE</span>
                <span>DHAKA 01</span>
              </div>

              {/* Central Serif "E" Mark */}
              <div className="relative flex items-center justify-center z-10">
                <span className="text-8xl sm:text-9xl font-serif font-black text-ivory italic tracking-tight select-none">
                  E
                </span>
              </div>

              {/* Bottom Meta */}
              <div className="w-full flex items-center justify-between z-10 text-[10px] font-mono text-ivory/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime"></span>
                  <span>CORE v2.0</span>
                </span>
                <span>BANGLADESH</span>
              </div>
            </div>

            {/* Orbital Line Graphic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] border border-cobalt/30 rounded-full animate-orbit">
                <div className="w-3.5 h-3.5 rounded-full bg-cobalt absolute top-4 left-1/4 shadow-lg shadow-cobalt/50"></div>
              </div>
            </div>

            {/* Floating Data Card 1 */}
            <div className="absolute -top-4 -left-4 sm:-left-8 bg-ivory border-2 border-ink px-4 py-3 rounded-2xl z-30 editorial-shadow-blue text-xs font-mono">
              <p className="text-[9px] text-ink/60 uppercase font-bold">COVERAGE</p>
              <p className="font-bold text-ink text-sm font-sans mt-0.5">Live in / 10 BD Zones</p>
            </div>

            {/* Floating Data Card 2 */}
            <div className="absolute bottom-6 -right-4 sm:-right-8 bg-ivory border-2 border-ink px-4 py-3 rounded-2xl z-30 editorial-shadow-coral text-xs font-mono">
              <p className="text-[9px] text-ink/60 uppercase font-bold">DISPATCH ENGINE</p>
              <p className="font-bold text-ink text-sm font-sans mt-0.5">Average ETA / 24 min</p>
            </div>

            {/* Floating Data Card 3 */}
            <div className="absolute -bottom-8 left-10 bg-lime border-2 border-ink px-4 py-2.5 rounded-2xl z-30 editorial-shadow-ink text-xs font-mono">
              <p className="text-[9px] text-ink/70 uppercase font-bold">FINTECH MFS</p>
              <p className="font-black text-ink font-sans">bKash • Nagad • COD</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTINUOUS MARQUEE STRIP */}
      <div className="w-full bg-ink text-ivory py-4 border-y border-ink overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-mono uppercase tracking-widest flex items-center">
          {[
            "Kacchi Dining",
            "Daily Bazaar",
            "Parcel Express",
            "Padma Ilish",
            "JobTap Home Sheba",
            "Elara Pay Wallet",
            "Mudir Dokan",
            "Fresh Flowers",
            "30% Escrow Shield",
            "Kacchi Dining",
            "Daily Bazaar",
            "Parcel Express",
            "Padma Ilish",
            "JobTap Home Sheba",
            "Elara Pay Wallet",
            "Mudir Dokan",
            "Fresh Flowers",
            "30% Escrow Shield",
          ].map((item, idx) => (
            <span key={idx} className="mx-4 flex items-center gap-3">
              {item} <span className="text-coral">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. ECOSYSTEM SECTION: ASYMMETRIC EDITORIAL CARDS */}
      <section id="ecosystem" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/15 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              {t.ecoSub}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-ink tracking-tight font-sans">
              {t.ecoTitle}
            </h2>
            <p className="text-sm sm:text-base text-ink/70 max-w-xl">
              {t.ecoDesc}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase">
            {[
              { id: "ALL", label: "All Services" },
              { id: "EVERYDAY", label: "Everyday" },
              { id: "LOGISTICS", label: "Move & Send" },
              { id: "SHEBA", label: "Home Sheba" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedFilter === f.id
                    ? "bg-ink text-ivory font-bold"
                    : "bg-white border border-ink/20 hover:border-ink text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Food & Dining */}
          <div className="md:col-span-7 bg-white border-2 border-ink p-8 rounded-3xl float-card flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-coral/20 text-secondary text-xs font-mono font-bold rounded-full">
                  KACCHI &amp; RESTAURANTS
                </span>
                <span className="text-xs font-mono text-ink/50">01</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-ink font-sans">
                Dhaka&apos;s Culinary Heritage
              </h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                From Sultan&apos;s Dine Kacchi to authentic Old Dhaka Tehari, Gulshan brunch spots to evening Cha and Bakorkhani. Ordered in seconds with thermal-bagged motorcycle fleet dispatches.
              </p>
            </div>
            <div className="pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
              <span className="text-ink/60">1,200+ Verified Kitchens</span>
              <Link href="/food-delivery" className="font-bold text-cobalt flex items-center gap-1 hover:underline">
                <span>Explore Dining</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Express Courier */}
          <div className="md:col-span-5 bg-white border-2 border-ink p-8 rounded-3xl float-card flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-cobalt/15 text-cobalt text-xs font-mono font-bold rounded-full">
                  EXPRESS COURIER
                </span>
                <span className="text-xs font-mono text-ink/50">02</span>
              </div>
              <h3 className="text-2xl font-black text-ink font-sans">Point-to-Point Dispatch</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                Send corporate contracts from Banani to Motijheel or emergency keys to Dhanmondi. Guaranteed pickup in 15 minutes with OTP release.
              </p>
            </div>
            <div className="pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
              <span className="text-ink/60">Base Fare ৳60</span>
              <Link href="/courier" className="font-bold text-cobalt flex items-center gap-1 hover:underline">
                <span>Book Courier</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Daily Bazaar & Fresh Fish */}
          <div className="md:col-span-5 bg-white border-2 border-ink p-8 rounded-3xl float-card flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-primary/15 text-primary text-xs font-mono font-bold rounded-full">
                  BAZAAR &amp; FRESH FISH
                </span>
                <span className="text-xs font-mono text-ink/50">03</span>
              </div>
              <h3 className="text-2xl font-black text-ink font-sans">Daily Bazaar &amp; Padma Ilish</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                Directly from Kawran Bazar and Chandpur ghats. Certified fresh river Hilsa, organic rural vegetables, and neighbourhood Mudir Dokan staples at true local bazaar prices.
              </p>
            </div>
            <div className="pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
              <span className="text-ink/60">Morning Cut Delivery</span>
              <Link href="/grocery-delivery" className="font-bold text-cobalt flex items-center gap-1 hover:underline">
                <span>Visit Bazaar</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 4: JobTap Home Sheba */}
          <div className="md:col-span-7 bg-white border-2 border-ink p-8 rounded-3xl float-card flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-tertiary/15 text-tertiary text-xs font-mono font-bold rounded-full">
                  HOME SHEBA &amp; ESCROW
                </span>
                <span className="text-xs font-mono text-ink/50">04</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-ink font-sans">
                JobTap On-Demand Home Sheba
              </h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                Inverter AC jet wash, concealed pipe plumbing, electrical wiring, and home deep cleaning. Every service is backed by our signature <strong>30% Escrow Protection</strong> — money is only released when you inspect and approve the job.
              </p>
            </div>
            <div className="pt-6 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
              <span className="text-ink/60">NID &amp; BTEB Certified Taskers</span>
              <Link href="/services" className="font-bold text-cobalt flex items-center gap-1 hover:underline">
                <span>Book Sheba</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONNECTED ECOSYSTEM: 5 ROLES */}
      <section id="connectivity" className="bg-ink text-ivory py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-coral font-bold">
              {t.connSub}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-sans tracking-tight">
              {t.connTitle}
            </h2>
            <p className="text-sm text-ivory/70 leading-relaxed">
              {t.connDesc}
            </p>
          </div>

          {/* 5-Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full mt-12 z-20">
            {/* Role 1: Customer */}
            <Link
              href="/marketplace"
              className="bg-white/5 backdrop-blur border border-ivory/15 p-5 rounded-2xl hover:border-emerald-500 transition-all group"
            >
              <span className="text-emerald-400 text-xs font-mono uppercase font-bold block mb-1">01. CUSTOMER</span>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Marketplace &amp; Dining</h4>
              <p className="text-xs text-ivory/60 mt-1">Multi-vendor baskets, live tracking, and bKash/Nagad checkout.</p>
            </Link>

            {/* Role 2: Merchant */}
            <Link
              href="/merchant"
              className="bg-white/5 backdrop-blur border border-ivory/15 p-5 rounded-2xl hover:border-coral transition-all group"
            >
              <span className="text-coral text-xs font-mono uppercase font-bold block mb-1">02. MERCHANT</span>
              <h4 className="text-sm font-bold text-white group-hover:text-coral transition-colors">Kitchen &amp; POS KDS</h4>
              <p className="text-xs text-ivory/60 mt-1">Real-time KDS, 86 inventory toggle, and BEFTN payouts.</p>
            </Link>

            {/* Role 3: Rider */}
            <Link
              href="/rider"
              className="bg-white/5 backdrop-blur border border-ivory/15 p-5 rounded-2xl hover:border-lime transition-all group"
            >
              <span className="text-lime text-xs font-mono uppercase font-bold block mb-1">03. RIDER</span>
              <h4 className="text-sm font-bold text-white group-hover:text-lime transition-colors">Fleet Dispatch</h4>
              <p className="text-xs text-ivory/60 mt-1">GPS radar, turn-by-turn navigation &amp; daily bKash cashout.</p>
            </Link>

            {/* Role 4: Tasker */}
            <Link
              href="/tasker"
              className="bg-white/5 backdrop-blur border border-ivory/15 p-5 rounded-2xl hover:border-indigo-400 transition-all group"
            >
              <span className="text-indigo-400 text-xs font-mono uppercase font-bold block mb-1">04. TASKER</span>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">JobTap Sheba Suite</h4>
              <p className="text-xs text-ivory/60 mt-1">15km radius leads, quote bidding, and 30% locked escrow.</p>
            </Link>

            {/* Role 5: Admin */}
            <Link
              href="/admin"
              className="bg-white/5 backdrop-blur border border-ivory/15 p-5 rounded-2xl hover:border-purple-400 transition-all group"
            >
              <span className="text-purple-400 text-xs font-mono uppercase font-bold block mb-1">05. ADMIN COMMAND</span>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Central Command</h4>
              <p className="text-xs text-ivory/60 mt-1">Live platform GMV, 10 PostGIS zones &amp; MFS gateway telemetry.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOUNDATION ENGINE & METRICS */}
      <section id="foundation" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              {t.foundSub}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-ink tracking-tight font-sans">
              {t.foundTitle}
            </h2>
            <p className="text-base text-ink/80 leading-relaxed">
              {t.foundDesc}
            </p>

            {/* Metric Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white border-2 border-ink rounded-2xl editorial-shadow-ink">
                <span className="text-3xl font-black text-ink font-sans">67+</span>
                <span className="block text-xs font-mono text-ink/60 uppercase mt-0.5">Database Entities</span>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl editorial-shadow-ink">
                <span className="text-3xl font-black text-cobalt font-sans">10</span>
                <span className="block text-xs font-mono text-ink/60 uppercase mt-0.5">Bangladesh Zones</span>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl editorial-shadow-ink">
                <span className="text-3xl font-black text-primary font-sans">22</span>
                <span className="block text-xs font-mono text-ink/60 uppercase mt-0.5">Merchant Categories</span>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl editorial-shadow-ink">
                <span className="text-3xl font-black text-coral font-sans">102</span>
                <span className="block text-xs font-mono text-ink/60 uppercase mt-0.5">Home Sheba Services</span>
              </div>
            </div>
          </div>

          {/* Code Window */}
          <div className="lg:col-span-6">
            <div className="bg-ink rounded-3xl border-2 border-ink overflow-hidden text-ivory editorial-shadow-blue">
              <div className="px-5 py-3.5 bg-black/60 border-b border-ivory/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="ml-2 text-ivory/60">elara-architecture.ts</span>
                </div>
                <span className="text-[10px] text-lime font-bold">PostgreSQL + PostGIS</span>
              </div>
              <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto text-ivory/90 space-y-2">
                <p><span className="text-coral">import</span> {"{ NestFactory }"} <span className="text-coral">from</span> <span className="text-lime">&apos;@nestjs/core&apos;</span>;</p>
                <p><span className="text-coral">import</span> {"{ MicroserviceOptions }"} <span className="text-coral">from</span> <span className="text-lime">&apos;@nestjs/microservices&apos;</span>;</p>
                <p className="text-ivory/40">{"// Bangladesh Hyper-Local Topology"}</p>
                <p><span className="text-sky-400">const</span> <span className="text-amber-300">mesh</span> = <span className="text-coral">new</span> <span className="text-sky-400">ElaraEcosystemMesh</span>({"{"}</p>
                <p className="pl-4">currency: <span className="text-lime">&apos;BDT&apos;</span>,</p>
                <p className="pl-4">mfsGateways: [<span className="text-lime">&apos;bKash&apos;</span>, <span className="text-lime">&apos;Nagad&apos;</span>, <span className="text-lime">&apos;SSLCommerz&apos;</span>],</p>
                <p className="pl-4">geoSpatialEngine: <span className="text-lime">&apos;PostGIS_15&apos;</span>,</p>
                <p className="pl-4">zones: [<span className="text-lime">&apos;Dhaka North&apos;</span>, <span className="text-lime">&apos;Gulshan&apos;</span>, <span className="text-lime">&apos;Banani&apos;</span>, <span className="text-lime">&apos;Chittagong&apos;</span>],</p>
                <p className="pl-4">escrowHoldingDays: <span className="text-amber-400">3</span>,</p>
                <p className="pl-4">searchTelemetry: <span className="text-lime">&apos;Typesense_27.1&apos;</span></p>
                <p>{"}"});</p>
                <p className="text-emerald-400">{"// High-concurrency WebSocket telemetry initialized"}</p>
                <p><span className="text-coral">await</span> mesh.<span className="text-sky-400">launchDhakaHub</span>();</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MANIFESTO SECTION */}
      <section id="manifesto" className="bg-cobalt text-ivory py-28 px-6 relative overflow-hidden select-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none text-[18vw] font-black font-sans tracking-ultra-tight">
          dhaka / somporko
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-lime font-bold">OUR MANIFESTO</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-sans tracking-tight leading-[0.95]">
            {t.manifestoTitle}
          </h2>
          <p className="text-base sm:text-xl text-ivory/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
            {t.manifestoQuote}
          </p>
          <div className="pt-4">
            <a
              href="#waitlist"
              className="px-8 py-4 bg-ink hover:bg-ivory hover:text-ink text-ivory text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-200 editorial-shadow-ink inline-flex items-center gap-2"
            >
              <span>Make room for more</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. WAITLIST SECTION */}
      <section id="waitlist" className="bg-ink text-ivory py-24 px-6 border-t border-ink">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-coral font-bold">EXCLUSIVE ACCESS</span>
            <h2 className="text-4xl sm:text-5xl font-black font-sans tracking-tight">
              Let&apos;s make everyday, better.
            </h2>
            <p className="text-sm text-ivory/70 max-w-lg mx-auto">
              Be among the first 10,000 residents in Dhaka to experience Elara with zero delivery fees for your first 30 days.
            </p>
          </div>

          <div className="bg-white/5 border border-ivory/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            {!waitlistSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ivory/70 uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Nabil Rahman"
                      className="w-full bg-ink border border-ivory/20 rounded-xl px-4 py-3 text-sm text-ivory focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-ivory/70 uppercase mb-2">Mobile (+880)</label>
                    <input
                      type="tel"
                      required
                      placeholder="01712-345678"
                      className="w-full bg-ink border border-ivory/20 rounded-xl px-4 py-3 text-sm text-ivory focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ivory/70 uppercase mb-2">Joining As</label>
                  <select className="w-full bg-ink border border-ivory/20 rounded-xl px-4 py-3 text-sm text-ivory focus:outline-none focus:border-cobalt transition-colors">
                    <option>Consumer / Everyday User</option>
                    <option>Restaurant or Grocery Merchant</option>
                    <option>Rider Fleet Courier</option>
                    <option>JobTap Home Sheba Technician</option>
                    <option>Enterprise Investor</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-coral hover:bg-white hover:text-ink text-ink font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 editorial-shadow-ink flex items-center justify-center gap-2 mt-4"
                >
                  <span>Keep me in the loop</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </div>
                <h4 className="text-base font-bold text-white">Shagotom! You are on the VIP Waitlist.</h4>
                <p className="text-xs text-ivory/70 max-w-sm mx-auto">
                  We will dispatch your private activation code via SMS to your Bangladesh mobile number as soon as your neighborhood is live.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
