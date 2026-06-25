"use client";

import { useState } from "react";
import Link from "next/link";
import { ecommerceApi } from "@/lib/api-client";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  portion: string;
  prepTime: string;
}

const INITIAL_ITEMS: MenuItem[] = [
  { id: "m1", name: "Basmati Kacchi Platter (Mutton)", category: "Biryani & Kacchi", price: 499, available: true, portion: "Full Plate with Aloo", prepTime: "20 min" },
  { id: "m2", name: "Shahi Borhani Glass", category: "Beverages", price: 90, available: true, portion: "250 ml chilled cup", prepTime: "2 min" },
  { id: "m3", name: "Zafrani Firni & Jorda", category: "Desserts", price: 90, available: true, portion: "Clay cup portion", prepTime: "5 min" },
  { id: "m4", name: "Special Mutton Rezala", category: "Curries", price: 380, available: true, portion: "2 large pieces", prepTime: "15 min" },
  { id: "m5", name: "Morog Polao (Quarter Chicken)", category: "Biryani & Kacchi", price: 360, available: false, portion: "Served with egg", prepTime: "15 min" },
  { id: "m6", name: "Chinigura Beef Tehari", category: "Biryani & Kacchi", price: 320, available: true, portion: "Authentic Old Dhaka style", prepTime: "18 min" },
  { id: "m7", name: "Basmati Polao with Dim", category: "Biryani & Kacchi", price: 210, available: true, portion: "Single serving with salad", prepTime: "10 min" },
  { id: "m8", name: "Laccha Semai with Kaju", category: "Desserts", price: 120, available: true, portion: "Rich whole milk cup", prepTime: "5 min" },
];

export default function MerchantMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ["all", "Biryani & Kacchi", "Curries", "Beverages", "Desserts"];

  const toggleAvailability = (id: string, name: string, currentStatus: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
    );
    const newStatus = !currentStatus;
    setToastMessage(
      newStatus
        ? `"${name}" is now LIVE on customer marketplace.`
        : `"${name}" was marked 86 (Out of Stock). Hidden from customer orders.`
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Catalog &amp; Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Menu &amp; 86 Inventory Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Update item pricing in BDT (৳), variants, add-ons, and instantaneous 86 stock toggle
          </p>
        </div>

        <Link
          href="/merchant/menu/new"
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Add New Dish / Product</span>
        </Link>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "all" ? `All Dishes (${items.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full sm:w-64 h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          <span>Dish &amp; Category</span>
          <div className="flex items-center gap-12 sm:gap-16">
            <span>Price (BDT)</span>
            <span className="w-32 text-right">Kitchen 86 Toggle</span>
          </div>
        </div>

        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
              item.available ? "hover:bg-slate-50/60" : "bg-slate-50/40 opacity-75"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-lg shrink-0">
                {item.category === "Beverages" ? "🥤" : item.category === "Desserts" ? "🍮" : "🍲"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">{item.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Portion: {item.portion} • Prep: {item.prepTime}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 pl-15 sm:pl-0">
              <div className="font-black text-sm text-slate-900 font-sans">
                ৳ {item.price}
              </div>

              {/* Instantaneous 86 Out of Stock Switch */}
              <button
                type="button"
                onClick={() => toggleAvailability(item.id, item.name, item.available)}
                className={`w-36 py-2 px-3 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-2 shadow-xs ${
                  item.available
                    ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300"
                    : "bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-300"
                }`}
                title={item.available ? "Click to 86 (pause orders)" : "Click to reactivate on menu"}
              >
                <span className={`w-2 h-2 rounded-full ${item.available ? "bg-emerald-600 animate-pulse" : "bg-rose-600"}`}></span>
                <span>{item.available ? "Live (In Stock)" : "86 (Sold Out)"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
