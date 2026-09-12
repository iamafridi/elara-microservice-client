"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { DEFAULT_ZONE_DELIVERY_FEE } from "@/lib/site";

type Restaurant = {
  id: string;
  name: string;
  area: string;
  category: string;
  rating: number;
  reviews: number;
  eta: string;
  minOrder: number;
  popularItems: { name: string; price: number; desc: string }[];
  tag: string;
};

const RESTAURANTS: Restaurant[] = [
  {
    id: "rest-1",
    name: "Sultan's Dine",
    area: "Gulshan 2, Dhaka",
    category: "Kacchi & Biryani",
    rating: 4.9,
    reviews: 1420,
    eta: "20-25 min",
    minOrder: 300,
    tag: "Trending #1",
    popularItems: [
      { name: "Kacchi Basmati Feast", price: 499, desc: "Tender mutton, fragrant basmati rice, alu, egg, borhani" },
      { name: "Mutton Rezala", price: 340, desc: "Rich yogurt and poppy seed gravy" },
      { name: "Special Jorda", price: 120, desc: "Traditional sweet saffron rice with baby gulab jamun" },
    ],
  },
  {
    id: "rest-2",
    name: "Kacchi Bhai",
    area: "Banani 11, Dhaka",
    category: "Kacchi & Polao",
    rating: 4.8,
    reviews: 980,
    eta: "25-30 min",
    minOrder: 250,
    tag: "Popular",
    popularItems: [
      { name: "Dum Kacchi Platter", price: 450, desc: "Slow-cooked dum mutton biryani with mint chutney" },
      { name: "Chicken Roast Special", price: 190, desc: "Quarter chicken in wedding-style caramelized onion gravy" },
    ],
  },
  {
    id: "rest-3",
    name: "Star Kabab & Restaurant",
    area: "Dhanmondi 2, Dhaka",
    category: "Old Dhaka & Grills",
    rating: 4.7,
    reviews: 2310,
    eta: "30-35 min",
    minOrder: 200,
    tag: "Heritage",
    popularItems: [
      { name: "Mutton Kebab & Naan Combo", price: 280, desc: "Charcoal grilled seekh kebab with butter naan" },
      { name: "Faluda Royal", price: 160, desc: "Rose syrup, vermicelli, tapioca pearls and ice cream" },
    ],
  },
  {
    id: "rest-4",
    name: "Beauty Lacchi & Faluda",
    area: "Johnson Road, Old Dhaka",
    category: "Desserts & Drinks",
    rating: 4.9,
    reviews: 1840,
    eta: "25-30 min",
    minOrder: 150,
    tag: "Authentic",
    popularItems: [
      { name: "Special Sweet Lacchi", price: 100, desc: "Traditional churned curd drink with crushed ice" },
      { name: "Special Kulfi Malai", price: 90, desc: "Slow-reduced milk kulfi on stick" },
    ],
  },
  {
    id: "rest-5",
    name: "North End Coffee Roasters",
    area: "Pragati Sarani, Baridhara",
    category: "Café & Bakery",
    rating: 4.8,
    reviews: 670,
    eta: "15-20 min",
    minOrder: 250,
    tag: "Artisan",
    popularItems: [
      { name: "Cinnamon Roll", price: 210, desc: "Fresh baked with cream cheese frosting" },
      { name: "Iced Americano", price: 240, desc: "Single-origin espresso over ice" },
    ],
  },
];

const CATEGORIES = ["All", "Kacchi & Biryani", "Old Dhaka & Grills", "Desserts & Drinks", "Café & Bakery"];

export default function FoodDeliveryPage() {
  const { addItem, totalCount } = useCart();
  const [selectedCat, setSelectedCat] = useState("All");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filtered =
    selectedCat === "All"
      ? RESTAURANTS
      : RESTAURANTS.filter((r) => r.category.includes(selectedCat));

  const handleAdd = (rest: Restaurant, item: { name: string; price: number; desc: string }) => {
    addItem({
      id: `food-${rest.id}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      vendor: rest.name,
      name: item.name,
      variant: item.desc,
      price: item.price,
      category: "Food",
    });
    setAddedItem(`${rest.name}: ${item.name}`);
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
            <span className="text-ink font-semibold">Food Dining</span>
          </div>
          <h1 className="h1">Food Delivery in Dhaka</h1>
          <p className="lede mt-2 max-w-xl">
            From Sultan&apos;s Dine Kacchi to Old Dhaka Tehari — thermal motorcycle dispatch in 24 minutes average.
          </p>
        </div>

        {/* View Cart Pill */}
        <Link
          href="/cart"
          className="btn-primary flex items-center gap-2 self-start md:self-auto text-xs min-h-[44px]"
          aria-label={`Open Basket with ${totalCount} items`}
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">shopping_bag</span>
          <span>Open Basket ({totalCount})</span>
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Culinary categories">
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

      {/* Restaurant List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-ink/10 p-8 space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-400" aria-hidden="true">restaurant</span>
            <h3 className="text-base font-bold text-ink">No restaurants found in this category</h3>
            <p className="text-xs text-slate-600">Try selecting &quot;All&quot; or browse other culinary categories.</p>
            <button
              onClick={() => setSelectedCat("All")}
              className="mt-2 inline-block btn-ghost text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((rest) => (
            <div
              key={rest.id}
              className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-secondary uppercase">
                    {rest.tag}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs font-bold text-ink">
                    <span className="text-amber-500" aria-hidden="true">★</span> {rest.rating} ({rest.reviews})
                  </span>
                </div>

                <h2 className="text-xl font-black text-ink mt-3">{rest.name}</h2>
                <p className="text-xs text-slate-600 font-mono flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs text-primary" aria-hidden="true">location_on</span>
                  {rest.area}
                </p>

                {/* Metadata strip with accessible contrast (AUD-A11Y-01) */}
                <div className="mt-4 flex items-center gap-4 text-xs font-mono text-slate-700 border-y border-ink/10 py-2.5">
                  <div>
                    <span className="text-[10px] text-slate-600 block uppercase font-bold">ETA</span>
                    <span className="font-bold text-ink">{rest.eta}</span>
                  </div>
                  <div className="w-px h-6 bg-ink/10" aria-hidden="true"></div>
                  <div>
                    <span className="text-[10px] text-slate-600 block uppercase font-bold">MIN ORDER</span>
                    <span className="font-bold text-ink">৳ {rest.minOrder}</span>
                  </div>
                  <div className="w-px h-6 bg-ink/10" aria-hidden="true"></div>
                  <div>
                    <span className="text-[10px] text-slate-600 block uppercase font-bold">DELIVERY</span>
                    <span className="font-bold text-primary">৳ {DEFAULT_ZONE_DELIVERY_FEE}</span>
                  </div>
                </div>

                {/* Menu items list */}
                <div className="mt-4 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 block font-bold">
                    Top Menu Items
                  </span>
                  {rest.popularItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-ivory/60 hover:bg-ivory transition border border-ink/5"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-600 truncate">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs font-black text-ink">৳ {item.price}</span>
                        {/* Accessible touch target (AUD-A11Y-02) */}
                        <button
                          type="button"
                          onClick={() => handleAdd(rest, item)}
                          className="rounded-lg bg-primary text-white px-3 py-1.5 text-xs font-bold hover:bg-primary-container transition shadow-sm min-h-[36px] min-w-[54px] flex items-center justify-center"
                          aria-label={`Add ${item.name} to basket`}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-600">100% Halal Verified</span>
                <Link
                  href="/cart"
                  className="text-xs font-mono font-bold text-cobalt flex items-center gap-1 hover:underline min-h-[32px] flex items-center"
                >
                  <span>Checkout</span>
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* elara-stage-171 */
