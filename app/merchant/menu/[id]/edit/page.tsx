"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = (params?.id as string) || "prod-1";

  const [name, setName] = useState("Basmati Mutton Kacchi Platter");
  const [bengaliName, setBengaliName] = useState("বাসমতী মাটন কাচ্চি প্ল্যাটার");
  const [category, setCategory] = useState("Biryani & Kacchi");
  const [price, setPrice] = useState("499");
  const [prepTime, setPrepTime] = useState("18");
  const [inStock, setInStock] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(`Product #${productId} successfully updated in Banani kitchen inventory!`);
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
            <span className="text-orange-600 font-bold">Edit Dish #{productId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Modify Dish Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Update pricing, kitchen preparation duration, and inventory stock availability
          </p>
        </div>

        <Link
          href="/merchant/menu"
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:bg-slate-100 transition"
        >
          Cancel
        </Link>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleUpdate} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Dish Title (English)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">নাম (বাংলা)</label>
              <input
                type="text"
                value={bengaliName}
                onChange={(e) => setBengaliName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Price (BDT ৳ incl. VAT)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Kitchen Prep Time (Minutes)</label>
              <input
                type="number"
                required
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 text-xs block">Live Kitchen Availability</span>
              <span className="text-[11px] text-slate-500">
                {inStock ? "Item is visible and orderable on customer apps" : "Item marked as sold out today"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setInStock(!inStock)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                inStock
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {inStock ? "✓ IN STOCK" : "✕ OUT OF STOCK"}
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Save &amp; Update Kitchen
          </button>
        </div>
      </form>
    </div>
  );
}
