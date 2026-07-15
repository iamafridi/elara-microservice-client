"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function StoreFrontPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "kacchi-bhai-banani";
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [toast, setToast] = useState<string | null>(null);

  const isBazaar = slug.includes("fishery") || slug.includes("bazaar") || slug.includes("fish");

  const store = isBazaar
    ? {
        name: "Kawran Bazar Fresh Fishery",
        tagline: "Authentic Padma River Hilsa & Morning Catch Fish",
        location: "Plot 12, DOHS Link Road, Kawran Bazar, Dhaka",
        rating: 4.9,
        reviewsCount: 418,
        eta: "35 - 45 Mins",
        deliveryFee: 60,
        badge: "Cold-Chain Certified (0-4°C)",
        categories: ["all", "River Fish", "Sea Fish", "Dried Fish (Shutki)", "Spices & Rice"],
        menu: [
          { id: "fish-1", name: "Padma River Ilish (1.2 kg Fresh Cut)", price: 1450, category: "River Fish", desc: "Descaled, cleaned & custom curry cut." },
          { id: "fish-2", name: "Rupchanda (Silver Pomfret 500g)", price: 850, category: "Sea Fish", desc: "Whole cleaned, perfect for crispy tawa fry." },
          { id: "fish-3", name: "Chital Peti & Maach (1 kg)", price: 1100, category: "River Fish", desc: "Boneless belly cuts from Arial Khan river." },
          { id: "fish-4", name: "Loitta Shutki (Sun Dried 250g)", price: 320, category: "Dried Fish (Shutki)", desc: "Cox's Bazar organic sun dried without preservatives." },
          { id: "fish-5", name: "Dinajpur Chinigura Polao Rice (2kg)", price: 280, category: "Spices & Rice", desc: "Premium aromatic rice for authentic Ilish Polao." },
        ],
      }
    : {
        name: "Kacchi Bhai — Banani Hub",
        tagline: "Heritage Old Dhaka Basmati Kacchi & Royal Dining",
        location: "Plot 67/A, Kemal Ataturk Avenue, Banani, Dhaka-1213",
        rating: 4.8,
        reviewsCount: 1840,
        eta: "20 - 30 Mins",
        deliveryFee: 60,
        badge: "100% Halal Certified Kitchen",
        categories: ["all", "Kacchi & Biryani", "Curries & Kebab", "Desserts & Borhani", "Beverages"],
        menu: [
          { id: "kb-1", name: "Shahi Basmati Mutton Kacchi Platter", price: 499, category: "Kacchi & Biryani", desc: "Served with saffron aloo, salad, and egg." },
          { id: "kb-2", name: "Beef Tehari (Mustard Oil Special)", price: 380, category: "Kacchi & Biryani", desc: "Traditional Old Dhaka small tender beef cubes in mustard rice." },
          { id: "kb-3", name: "Chicken Roast (Shahi Gravy)", price: 160, category: "Curries & Kebab", desc: "Crispy skin roasted chicken in rich nutty gravy." },
          { id: "kb-4", name: "Chilled Borhani Bottle (500ml)", price: 120, category: "Desserts & Borhani", desc: "Thick curd drink blended with mint, coriander & roasted cumin." },
          { id: "kb-5", name: "Zafrani Shahi Firni Cup", price: 90, category: "Desserts & Borhani", desc: "Cardamom saffron rice pudding with pistachio garnish." },
        ],
      };

  const filteredMenu = activeCategory === "all"
    ? store.menu
    : store.menu.filter((m) => m.category === activeCategory);

  const handleAdd = (item: any) => {
    addItem({
      id: `${item.id}_store`,
      name: item.name,
      price: item.price,
      vendor: store.name,
      category: item.category,
      qty: 1,
    });
    setToast(`Added "${item.name}" to your basket!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="shell py-8 space-y-8 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate">{store.name}</span>
      </nav>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {toast}</span>
          <Link href="/cart" className="underline font-black text-white hover:text-emerald-100">
            View Basket &rarr;
          </Link>
        </div>
      )}

      {/* Store Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                {store.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">Open Now (Until 11 PM)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-sans tracking-tight text-white">
              {store.name}
            </h1>
            <p className="text-xs text-slate-300 font-sans">{store.tagline}</p>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-sm text-primary">location_on</span>
              <span>{store.location}</span>
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
            <div className="flex items-center gap-1.5 bg-amber-500/20 px-3 py-1.5 rounded-xl text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              <span className="text-base">★</span>
              <span>{store.rating}</span>
              <span className="text-white/60">({store.reviewsCount} reviews)</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">
              ⚡ {store.eta} Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {store.categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold capitalize transition whitespace-nowrap ${
              activeCategory === cat
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat === "all" ? "All Items" : cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <span className="text-base font-black font-sans text-slate-900">
                  ৳ {item.price.toLocaleString()}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <Link
                href={`/product/${item.id}`}
                className="text-xs font-mono font-bold text-primary hover:underline"
              >
                Customize &rarr;
              </Link>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                className="px-4 py-1.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-mono font-bold text-xs transition shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-xs">add</span>
                <span>Add 1-Tap</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
