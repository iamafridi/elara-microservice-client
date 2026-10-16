"use client";

import { useState } from "react";
import Link from "next/link";

interface VariantGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: { name: string; priceBDT: number }[];
}

const INITIAL_GROUPS: VariantGroup[] = [
  {
    id: "vg-1",
    name: "Portion Size (পরিমাণ)",
    required: true,
    multiple: false,
    options: [
      { name: "Single Portion (1 Person)", priceBDT: 0 },
      { name: "Double Platter (2-3 Persons)", priceBDT: 400 },
      { name: "Family Dawat Handi (4-5 Persons)", priceBDT: 1100 },
    ],
  },
  {
    id: "vg-2",
    name: "Old Dhaka Extras & Add-ons (অতিরিক্ত)",
    required: false,
    multiple: true,
    options: [
      { name: "Extra Shahi Golden Aloo", priceBDT: 40 },
      { name: "Hard Boiled Egg (ডিম)", priceBDT: 30 },
      { name: "Chilled Borhani Cup (250ml)", priceBDT: 65 },
      { name: "Extra Mutton Boti (150g)", priceBDT: 240 },
    ],
  },
  {
    id: "vg-3",
    name: "Spice & Mustard Oil Level (ঝাল)",
    required: false,
    multiple: false,
    options: [
      { name: "Mild (হালকা ঝাল)", priceBDT: 0 },
      { name: "Traditional Authentic (স্বাভাবিক)", priceBDT: 0 },
      { name: "Old Dhaka Extra Spicy (অতিরিক্ত ঝাল)", priceBDT: 0 },
    ],
  },
];

export default function MerchantVariantsPage() {
  const [groups, setGroups] = useState<VariantGroup[]>(INITIAL_GROUPS);
  const [newGroupName, setNewGroupName] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newGroup: VariantGroup = {
      id: `vg-${groups.length + 1}`,
      name: newGroupName,
      required: false,
      multiple: true,
      options: [{ name: "Standard Option", priceBDT: 0 }],
    };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setToast(`Variant group "${newGroup.name}" created!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/merchant/menu" className="hover:text-orange-600">Menu &amp; Inventory</Link>
            <span>/</span>
            <span className="text-orange-600 font-bold">Variant Modifiers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Dish Variants &amp; Add-on Modifiers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure portion sizes, extra toppings, Borhani add-ons, and customized cooking choices
          </p>
        </div>

        <Link
          href="/merchant/menu"
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition self-start sm:self-auto"
        >
          &larr; Back to Menu
        </Link>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Create Variant Group Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Create New Modifier Group
        </h2>
        <form onSubmit={handleCreateGroup} className="flex gap-2">
          <input
            type="text"
            required
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="e.g. Kebab Dip Sauces / Naan Choice..."
            className="flex-1 h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
          />
          <button
            type="submit"
            className="px-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            + Create Group
          </button>
        </form>
      </div>

      {/* Variant Groups List */}
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{group.name}</h3>
                <div className="text-slate-500 text-xs font-mono mt-0.5">
                  {group.required ? "Mandatory Choice (Required)" : "Optional Add-on"} •{" "}
                  {group.multiple ? "Customer Can Select Multiple" : "Single Selection Only"}
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200">
                {group.options.length} Options
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {group.options.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800">{opt.name}</span>
                  <span className="font-mono font-bold text-slate-900">
                    {opt.priceBDT === 0 ? "Free (+৳0)" : `+ ৳ ${opt.priceBDT.toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
