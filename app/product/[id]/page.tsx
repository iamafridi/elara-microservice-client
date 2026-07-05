"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = (params?.id as string) || "prod-1";
  const { addItem } = useCart();

  const [portion, setPortion] = useState<"standard" | "large">("standard");
  const [spiceLevel, setSpiceLevel] = useState<"mild" | "medium" | "spicy">("medium");
  const [needCutClean, setNeedCutClean] = useState(true);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  // Mock product catalog lookup
  const isBazaar = productId.includes("bazaar") || productId.includes("fish") || productId.includes("ilish");

  const product = isBazaar
    ? {
        id: productId,
        name: "Padma River Fresh Ilish (1.2 kg Fresh Cut)",
        vendor: "Kawran Bazar Fresh Fishery",
        vendorSlug: "kawran-bazar-fishery",
        category: "Daily Bazaar Fresh",
        price: portion === "standard" ? 1450 : 2800,
        rating: 4.9,
        reviewsCount: 84,
        description:
          "Daily morning catch Padma river Hilsa direct from Chandpur. Guaranteed fresh, silvery scale luster, rich natural fish oil, delivered with zero-compromise cold chain insulation (0–4°C).",
        origin: "Chandpur Ghat, Meghna & Padma Confluence",
        prepOptions: ["Free Scale Cleaning & Descaling", "Curry Cut with Head & Egg Pouch Preserved", "Cold Chain Thermal Pack"],
        tags: ["Fresh Catch", "Cold Chain", "Weighed on Scale"],
      }
    : {
        id: productId,
        name: "Shahi Basmati Mutton Kacchi Biryani",
        vendor: "Kacchi Bhai — Banani Hub",
        vendorSlug: "kacchi-bhai-banani",
        category: "Food & Dining",
        price: portion === "standard" ? 499 : 899,
        rating: 4.8,
        reviewsCount: 326,
        description:
          "Aromatic long-grain aged Basmati rice layered with tender mutton shank marinated in 14 traditional Old Dhaka spices. Slow-cooked in a sealed copper handi with golden saffron aloo, served with chilled Borhani and sweet Zafrani Jorda.",
        origin: "Plot 67/A Kemal Ataturk Ave, Banani, Dhaka",
        prepOptions: ["Includes 1x Shahi Aloo", "Chilled 250ml Borhani Bottle", "Zardah & Salad Pack"],
        tags: ["100% Halal", "Aged Basmati", "Old Dhaka Heritage"],
      };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}_${portion}`,
      name: `${product.name} (${portion === "large" ? "Double Feast" : "Standard Portion"})`,
      price: product.price,
      vendor: product.vendor,
      category: product.category,
      variant: `${portion.toUpperCase()} • ${spiceLevel.toUpperCase()} SPICE`,
      qty,
    });

    setToast(`Added ${qty}x "${product.name}" to your basket!`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="shell py-8 max-w-5xl space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {toast}</span>
          <Link href="/cart" className="underline font-black text-white hover:text-emerald-100">
            View Basket &rarr;
          </Link>
        </div>
      )}

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Visual / Mark Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white aspect-4/3 flex flex-col justify-between shadow-lg border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-bold backdrop-blur-xs">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded-full text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              <span>★</span>
              <span>{product.rating}</span>
              <span className="text-white/60">({product.reviewsCount})</span>
            </div>
          </div>

          <div className="space-y-2 z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary text-3xl mb-4 backdrop-blur-xs border border-white/15">
              <span className="material-symbols-outlined text-4xl text-amber-400">
                {isBazaar ? "set_meal" : "restaurant"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-sans leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-slate-300 font-mono">
              Prepared by: <Link href={`/store/${product.vendorSlug}`} className="text-amber-400 underline font-bold">{product.vendor}</Link>
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 z-10 pt-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-slate-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Product Configuration & Add-to-Cart */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-3xl font-black font-sans text-slate-900">
              ৳ {product.price.toLocaleString()} <span className="text-xs font-mono text-slate-500 font-normal">BDT incl. VAT</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-sm text-primary">pin_drop</span>
              <span>{product.origin}</span>
            </div>
          </div>

          {/* Portion Size Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider block">
              Select Portion Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPortion("standard")}
                className={`p-3 rounded-xl border text-left transition ${
                  portion === "standard"
                    ? "border-primary bg-orange-50/50 shadow-xs ring-1 ring-primary"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Standard Platter (1 Person)</div>
                <div className="font-mono text-xs text-emerald-600 font-bold mt-0.5">
                  ৳ {(isBazaar ? 1450 : 499).toLocaleString()}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPortion("large")}
                className={`p-3 rounded-xl border text-left transition ${
                  portion === "large"
                    ? "border-primary bg-orange-50/50 shadow-xs ring-1 ring-primary"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Double Feast (2-3 Persons)</div>
                <div className="font-mono text-xs text-emerald-600 font-bold mt-0.5">
                  ৳ {(isBazaar ? 2800 : 899).toLocaleString()}
                </div>
              </button>
            </div>
          </div>

          {/* Spice & Prep Preferences */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider block">
              Flavor &amp; Heat Profile
            </label>
            <div className="flex gap-2">
              {(["mild", "medium", "spicy"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold capitalize transition border ${
                    spiceLevel === level
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Button */}
          <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-800 hover:bg-slate-100 transition"
              >
                -
              </button>
              <span className="w-10 text-center font-mono font-bold text-sm text-slate-900">{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-800 hover:bg-slate-100 transition"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
              <span>Add to Basket • ৳ {(product.price * qty).toLocaleString()} BDT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
