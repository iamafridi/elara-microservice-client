"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  bengaliName: string;
  itemCount: number;
  sortOrder: number;
  status: "ACTIVE" | "HIDDEN";
}

const INITIAL_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Biryani & Kacchi", bengaliName: "কাচ্চি ও বিরিয়ানি", itemCount: 14, sortOrder: 1, status: "ACTIVE" },
  { id: "cat-2", name: "Curries & Rezala", bengaliName: "কারি ও রেজালা", itemCount: 22, sortOrder: 2, status: "ACTIVE" },
  { id: "cat-3", name: "Tandoor & Kebab", bengaliName: "কাবাব ও নান", itemCount: 18, sortOrder: 3, status: "ACTIVE" },
  { id: "cat-4", name: "Borhani & Beverages", bengaliName: "বোরহানি ও পানীয়", itemCount: 8, sortOrder: 4, status: "ACTIVE" },
  { id: "cat-5", name: "Shahi Desserts", bengaliName: "শাহী মিষ্টি ও ফিরনি", itemCount: 12, sortOrder: 5, status: "ACTIVE" },
  { id: "cat-6", name: "Seasonal Iftar Specials", bengaliName: "ইফতার স্পেশাল", itemCount: 12, sortOrder: 6, status: "HIDDEN" },
];

export default function MerchantCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [newCatName, setNewCatName] = useState("");
  const [newCatBn, setNewCatBn] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const cat: Category = {
      id: `cat-${categories.length + 1}`,
      name: newCatName,
      bengaliName: newCatBn || newCatName,
      itemCount: 0,
      sortOrder: categories.length + 1,
      status: "ACTIVE",
    };
    setCategories([...categories, cat]);
    setNewCatName("");
    setNewCatBn("");
    setToast(`Category "${cat.name}" added to menu catalog!`);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleStatus = (id: string) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, status: c.status === "ACTIVE" ? "HIDDEN" : "ACTIVE" } : c
      )
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/merchant/menu" className="hover:text-orange-600">Menu &amp; Inventory</Link>
            <span>/</span>
            <span className="text-orange-600 font-bold">Categories</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Menu Category Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize customer-facing menu sections, display orders, and temporary seasonal hiding
          </p>
        </div>

        <Link
          href="/merchant/menu"
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition self-start sm:self-auto"
        >
          &larr; View 86-Item Menu
        </Link>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center justify-between shadow-xs">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Add Category Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Create New Menu Section
        </h2>
        <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Category Name (English, e.g. Polao Dishes)"
            className="h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
          />
          <input
            type="text"
            value={newCatBn}
            onChange={(e) => setNewCatBn(e.target.value)}
            placeholder="ক্যাটেগরি নাম (বাংলা, যেমনঃ পোলাও)"
            className="h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            + Add Category
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-mono font-bold flex items-center justify-center shrink-0">
                  {cat.sortOrder}
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{cat.name}</div>
                  <div className="text-slate-500 font-sans">{cat.bengaliName} • {cat.itemCount} Active Items</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  cat.status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {cat.status}
                </span>

                <button
                  type="button"
                  onClick={() => toggleStatus(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                    cat.status === "ACTIVE"
                      ? "border-slate-200 text-slate-600 hover:bg-slate-100"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {cat.status === "ACTIVE" ? "Hide from App" : "Unhide"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
