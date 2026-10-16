"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bengaliName, setBengaliName] = useState("");
  const [category, setCategory] = useState("Biryani & Kacchi");
  const [price, setPrice] = useState("");
  const [portion, setPortion] = useState("");
  const [prepTime, setPrepTime] = useState("15");
  const [isHalal, setIsHalal] = useState(true);
  const [isSpicy, setIsSpicy] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/merchant/menu");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/merchant/menu" className="hover:text-orange-600">Menu &amp; Inventory</Link>
            <span>/</span>
            <span className="text-orange-600 font-bold">Add Product</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Add New Dish / Menu Item
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure dish details, BDT pricing, prep time, and instant kitchen availability
          </p>
        </div>

        <Link
          href="/merchant/menu"
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:bg-slate-100 transition"
        >
          Cancel
        </Link>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>New dish added successfully! Syncing to Banani kitchen catalog...</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            1. Basic Dish Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Dish Title (English) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shahi Mutton Kacchi"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Dish Title (বাংলা)
              </label>
              <input
                type="text"
                value={bengaliName}
                onChange={(e) => setBengaliName(e.target.value)}
                placeholder="যেমন: শাহী খাসির কাচ্চি"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              >
                <option value="Biryani & Kacchi">Biryani &amp; Kacchi</option>
                <option value="Curries">Curries &amp; Rezala</option>
                <option value="Beverages">Beverages &amp; Borhani</option>
                <option value="Desserts">Desserts &amp; Firni</option>
                <option value="Sides">Sides &amp; Salads</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Base Price in BDT (৳) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  ৳
                </span>
                <input
                  type="number"
                  required
                  min="10"
                  step="5"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="450"
                  className="w-full h-10 pl-8 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Portion Size &amp; Description
              </label>
              <input
                type="text"
                value={portion}
                onChange={(e) => setPortion(e.target.value)}
                placeholder="e.g. 1 Full Plate with aloo & egg"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Est. Kitchen Prep Time (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition font-mono"
              />
            </div>
          </div>
        </div>

        {/* Dietary & Badges */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            2. Dietary Badges &amp; Tags
          </h2>
          <div className="flex flex-wrap gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isHalal}
                onChange={(e) => setIsHalal(e.target.checked)}
                className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="font-semibold text-slate-800">100% Halal Certified Meat</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSpicy}
                onChange={(e) => setIsSpicy(e.target.checked)}
                className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="font-semibold text-slate-800">Spicy / ঝাল আইটেম</span>
            </label>
          </div>
        </div>

        {/* Photo Upload Box */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            3. Dish Photography
          </h2>
          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-2 hover:border-orange-400 transition cursor-pointer bg-slate-50">
            <span className="material-symbols-outlined text-3xl text-slate-400">add_photo_alternate</span>
            <div className="text-xs font-bold text-slate-800">Click to upload dish photo</div>
            <p className="text-[11px] text-slate-400">PNG, JPG or WebP up to 5MB • 1:1 aspect ratio recommended</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
          <Link
            href="/merchant/menu"
            className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition flex items-center gap-1.5"
          >
            <span>Save Dish to Kitchen Menu &rarr;</span>
          </button>
        </div>
      </form>
    </div>
  );
}
