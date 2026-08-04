"use client";

import { useState } from "react";
import Link from "next/link";

interface CategoryNode {
  id: string;
  name: string;
  bengaliName: string;
  vertical: "FOOD" | "BAZAAR" | "COURIER" | "SHEBA";
  itemCount: number;
  nbrVatRate: number; // 5 or 15
  subCategories: string[];
  status: "ACTIVE" | "ARCHIVED";
}

const CATEGORIES: CategoryNode[] = [
  {
    id: "CAT-101",
    name: "Biryani & Kacchi Heritage",
    bengaliName: "কাচ্চি ও বিরিয়ানি",
    vertical: "FOOD",
    itemCount: 420,
    nbrVatRate: 5,
    subCategories: ["Mutton Kacchi Basmati", "Beef Tehari", "Chicken Roast Polao", "Borhani & Firni"],
    status: "ACTIVE"
  },
  {
    id: "CAT-102",
    name: "Halal Fresh Meat & Fish Bazaar",
    bengaliName: "তাজা মাছ ও মাংস",
    vertical: "BAZAAR",
    itemCount: 285,
    nbrVatRate: 5,
    subCategories: ["Padma Ilish Fresh", "Broiler & Deshi Chicken", "Bengal Mutton Cut", "Rui & Katla"],
    status: "ACTIVE"
  },
  {
    id: "CAT-103",
    name: "Air Conditioning & HVAC Sheba",
    bengaliName: "এসি সার্ভিসিং ও মেরামত",
    vertical: "SHEBA",
    itemCount: 94,
    nbrVatRate: 15,
    subCategories: ["AC Jet Wash Cleaning", "Freon Gas Refill R32/R410", "Compressor Circuit Repair"],
    status: "ACTIVE"
  },
  {
    id: "CAT-104",
    name: "Express Parcel & Document Courier",
    bengaliName: "জরুরি পার্সেল ডেলিভারি",
    vertical: "COURIER",
    itemCount: 32,
    nbrVatRate: 15,
    subCategories: ["Corporate Document Pouch", "Same-Day Dhaka Parcel", "Fragile Box Handover"],
    status: "ACTIVE"
  },
  {
    id: "CAT-105",
    name: "Electrical & Sub-DB Breaker Sheba",
    bengaliName: "ইলেকট্রিশিয়ান সার্ভিস",
    vertical: "SHEBA",
    itemCount: 68,
    nbrVatRate: 15,
    subCategories: ["Short Circuit Wiring", "IPS Inverter Servicing", "Ceiling Fan Repair"],
    status: "ACTIVE"
  }
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryNode[]>(CATEGORIES);
  const [selectedVertical, setSelectedVertical] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatBn, setNewCatBn] = useState("");
  const [newCatVertical, setNewCatVertical] = useState<"FOOD" | "BAZAAR" | "COURIER" | "SHEBA">("FOOD");
  const [newCatVat, setNewCatVat] = useState<number>(5);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: CategoryNode = {
      id: `CAT-${Math.floor(100 + Math.random() * 900)}`,
      name: newCatName.trim(),
      bengaliName: newCatBn.trim() || newCatName.trim(),
      vertical: newCatVertical,
      itemCount: 0,
      nbrVatRate: newCatVat,
      subCategories: [],
      status: "ACTIVE"
    };

    setCategories((prev) => [newCat, ...prev]);
    setShowAddModal(false);
    setNewCatName("");
    setNewCatBn("");
  };

  const filtered = categories.filter((c) => {
    if (selectedVertical === "ALL") return true;
    return c.vertical === selectedVertical;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Catalog Taxonomy & NBR VAT Class
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold border border-white/10">
              National Board of Revenue Compliant
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Platform Categories & Tax Rules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure master categories across Food Dining, Daily Bazaar, Express Courier, and JobTap Sheba.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-950/40"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>+ Add New Category</span>
          </button>
        </div>
      </div>

      {/* Vertical KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Taxonomy Nodes</span>
          <div className="text-2xl font-black text-purple-400 font-mono">{categories.length} Classes</div>
          <p className="text-[10px] text-slate-400 font-mono">Mapped to 4 verticals</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Live Catalog Products</span>
          <div className="text-2xl font-black text-white font-mono">128,406</div>
          <p className="text-[10px] text-emerald-400 font-mono">Synchronized with Dokans</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Food & Bazaar VAT</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">5.0%</div>
          <p className="text-[10px] text-slate-400 font-mono">Mushak-6.3 Standard Rate</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Services & Sheba VAT</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">15.0%</div>
          <p className="text-[10px] text-slate-400 font-mono">Professional Services Rate</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-[#0D121F] p-1 rounded-xl border border-white/10 text-xs font-mono overflow-x-auto">
        {["ALL", "FOOD", "BAZAAR", "SHEBA", "COURIER"].map((vert) => (
          <button
            key={vert}
            onClick={() => setSelectedVertical(vert)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedVertical === vert
                ? "bg-purple-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {vert === "ALL" ? "All Verticals" : vert}
          </button>
        ))}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#0D121F] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-400">{cat.id}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                    {cat.vertical}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">{cat.name}</h3>
                <p className="text-xs text-slate-400 font-sans">{cat.bengaliName}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  NBR VAT: {cat.nbrVatRate}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono block mt-1">
                  {cat.itemCount} Live Products
                </span>
              </div>
            </div>

            {/* Sub-categories */}
            <div className="pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1.5">
                Sub-Categories:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.subCategories.map((sub, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#131927] border border-white/5 text-slate-300 font-mono"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0D121F] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Create New Catalog Category</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Category Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Gourmet Old Dhaka Sweets"
                  className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Bengali Name (বাংলা)
                </label>
                <input
                  type="text"
                  value={newCatBn}
                  onChange={(e) => setNewCatBn(e.target.value)}
                  placeholder="যেমন: পুরান ঢাকার মিষ্টি ও লাড্ডু"
                  className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Platform Vertical
                  </label>
                  <select
                    value={newCatVertical}
                    onChange={(e) => setNewCatVertical(e.target.value as any)}
                    className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="FOOD">FOOD (Dining)</option>
                    <option value="BAZAAR">BAZAAR (Daily Groceries)</option>
                    <option value="COURIER">COURIER (Express Parcel)</option>
                    <option value="SHEBA">SHEBA (JobTap Services)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    NBR VAT Rate (%)
                  </label>
                  <select
                    value={newCatVat}
                    onChange={(e) => setNewCatVat(Number(e.target.value))}
                    className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value={5}>5% (Essential Food / Bazaar)</option>
                    <option value={15}>15% (Services / Courier / Luxury)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* elara-stage-116 */
