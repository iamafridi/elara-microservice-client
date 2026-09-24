"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  weight: string;
  price: number;
  originalPrice?: number;
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Chandpur Padma River Ilish (1.2 kg Fresh Cut)",
    vendor: "Kawran Bazar Fresh Fishery",
    category: "Fresh Fish",
    weight: "1.2 kg whole",
    price: 1450,
    originalPrice: 1650,
    badge: "Morning Catch",
  },
  {
    id: "prod-2",
    name: "Fresh Meghna Rui Fish (Large)",
    vendor: "Kawran Bazar Fresh Fishery",
    category: "Fresh Fish",
    weight: "1.5 kg whole",
    price: 680,
    badge: "Live Gutted",
  },
  {
    id: "prod-3",
    name: "Chinigura Aromatic Polao Rice",
    vendor: "Mudir Dokan Express — Banani",
    category: "Mudir Dokan",
    weight: "2 kg bag",
    price: 260,
    badge: "Pure Dinajpur",
  },
  {
    id: "prod-4",
    name: "Pure Radhuni Cold-Pressed Mustard Oil",
    vendor: "Mudir Dokan Express — Banani",
    category: "Mudir Dokan",
    weight: "1 Litre bottle",
    price: 240,
  },
  {
    id: "prod-5",
    name: "Country Deshi Red Potato (Lal Alu)",
    vendor: "Daily Bazaar Hub — Mirpur",
    category: "Vegetables",
    weight: "5 kg bag",
    price: 220,
    badge: "Bogra Harvest",
  },
  {
    id: "prod-6",
    name: "Pabna Deshi Onion (Piyaj)",
    vendor: "Daily Bazaar Hub — Mirpur",
    category: "Vegetables",
    weight: "2 kg net",
    price: 170,
  },
  {
    id: "prod-7",
    name: "Grass-Fed Halal Beef (Bone-In Curry Cut)",
    vendor: "Bengal Meat Butchery — Gulshan",
    category: "Halal Meat",
    weight: "1 kg pack",
    price: 780,
    badge: "DSC Certified",
  },
  {
    id: "prod-8",
    name: "Deshi Broiler Chicken (Skin-off Fresh Cut)",
    vendor: "Bengal Meat Butchery — Gulshan",
    category: "Halal Meat",
    weight: "1.2 kg pack",
    price: 310,
  },
];

const CATEGORIES = ["All", "Fresh Fish", "Mudir Dokan", "Vegetables", "Halal Meat"];

const CATEGORY_ICONS: Record<string, string> = {
  "Fresh Fish": "set_meal",
  "Mudir Dokan": "local_convenience_store",
  "Vegetables": "nutrition",
  "Halal Meat": "restaurant",
};

export default function MarketplacePage() {
  const { addItem, totalCount } = useCart();
  const [selectedCat, setSelectedCat] = useState("All");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filtered =
    selectedCat === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCat);

  const handleAdd = (product: Product) => {
    addItem({
      id: `prod-${product.id}`,
      vendor: product.vendor,
      name: product.name,
      variant: product.weight,
      price: product.price,
      category: product.category,
    });
    setAddedItem(product.name);
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <div className="shell py-12">
      {/* Toast Alert (AUD-A11Y-04) */}
      {addedItem && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 rounded-2xl bg-ink text-ivory px-5 py-3 font-mono text-xs flex items-center gap-3 editorial-shadow-blue border border-ivory/20 motion-safe:animate-bounce shadow-2xl"
        >
          <span className="material-symbols-outlined text-emerald-400 text-sm" aria-hidden="true">check_circle</span>
          <span>Added <strong>{addedItem}</strong> to Basket</span>
          <Link href="/cart" className="underline font-bold text-coral ml-2">View Cart →</Link>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/10 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 mb-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Daily Bazaar &amp; Marketplace</span>
          </div>
          <h1 className="h1">Daily Bazaar &amp; Mudir Dokan</h1>
          <p className="lede mt-2 max-w-xl">
            Chandpur fresh river Ilish, Bogra vegetables, and neighbourhood grocery staples delivered in under 45 minutes or booked for morning cuts.
          </p>
        </div>

        <Link
          href="/cart"
          className="btn-primary flex items-center gap-2 self-start md:self-auto text-xs min-h-[44px]"
          aria-label={`View Basket with ${totalCount} items`}
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">shopping_bag</span>
          <span>View Basket ({totalCount})</span>
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Bazaar categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-full px-4 py-2 text-xs font-mono font-bold transition min-h-[38px] ${
              selectedCat === cat
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "border border-ink/15 bg-white text-ink hover:border-ink"
            }`}
            aria-pressed={selectedCat === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-ink/10 p-8 space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-400" aria-hidden="true">storefront</span>
            <h3 className="text-base font-bold text-ink">No items found in this section</h3>
            <p className="text-xs text-slate-600">Try selecting &quot;All&quot; to see all daily bazaar staples.</p>
            <button
              onClick={() => setSelectedCat("All")}
              className="mt-2 inline-block btn-ghost text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Visual Imagery Container with Category Fallback (AUD-VIS-02) */}
                <div className="h-28 -mx-5 -mt-5 mb-4 rounded-t-3xl bg-surface-low border-b border-ink/5 flex items-center justify-center relative overflow-hidden group">
                  <span className="material-symbols-outlined text-4xl text-primary/40 group-hover:scale-110 transition-transform" aria-hidden="true">
                    {CATEGORY_ICONS[product.category] || "shopping_basket"}
                  </span>
                  {product.badge && (
                    <span className="absolute top-3 right-3 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-800 border border-emerald-200">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-base font-bold text-ink leading-snug">{product.name}</h2>
                <p className="text-xs font-mono text-slate-600 mt-1">{product.weight}</p>
                <p className="text-[11px] text-secondary font-bold mt-0.5">{product.vendor}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-ink/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-lg font-black text-ink">৳ {product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-2 font-mono text-xs text-slate-500 line-through">
                      ৳ {product.originalPrice}
                    </span>
                  )}
                </div>
                {/* Accessible touch target button */}
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="rounded-xl bg-primary text-white px-3.5 py-2 text-xs font-mono font-bold hover:bg-primary-container transition shadow-sm min-h-[38px] min-w-[54px] flex items-center justify-center"
                  aria-label={`Add ${product.name} to basket`}
                >
                  + Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* elara-stage-188 */
