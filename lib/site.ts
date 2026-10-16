export const DEFAULT_ZONE_DELIVERY_FEE = 60; // ৳60 zone delivery across Dhaka Metro

export const CITIES = [
  { slug: "dhaka-north", name: "Dhaka North (Banani, Gulshan, Baridhara)" },
  { slug: "dhaka-south", name: "Dhaka South (Dhanmondi, Old Dhaka)" },
  { slug: "chittagong", name: "Chittagong Metro (GEC, Agrabad)" },
  { slug: "sylhet", name: "Sylhet (Zindabazar, Shahjalal)" },
  { slug: "uttara", name: "Uttara Hub" },
  { slug: "mirpur", name: "Mirpur DOHS & Metro" },
  { slug: "rajshahi", name: "Rajshahi Silk City" },
  { slug: "khulna", name: "Khulna Industrial Hub" },
  { slug: "coxs-bazar", name: "Cox's Bazar Coastal Hub" },
  { slug: "comilla", name: "Comilla Victoria" },
];

export const POPULAR_SERVICES = [
  { title: "Kacchi & Biryani Dining", slug: "kacchi-dining-in-dhaka" },
  { title: "Daily Bazaar & Fresh Fish", slug: "daily-bazaar-padma-ilish" },
  { title: "Express P2P Courier", slug: "express-courier-dhaka" },
  { title: "JobTap Home Sheba (AC / Plumbing)", slug: "home-sheba-servicing" },
  { title: "Mudir Dokan Grocery", slug: "mudir-dokan-groceries" },
  { title: "Elara Pay (bKash & Nagad)", slug: "elara-pay-mfs-wallet" },
];


export type Post = {
  slug: string;
  title: string;
  author: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "one-app-16-services",
    title: "One App, 16 Services: How the Elara Super App Works",
    author: "Sadia Rahman",
    date: "2026-03-05",
    readMinutes: 5,
    excerpt: "Food, groceries, parcels, flowers, jobs and more — here's how a single app replaces a dozen others.",
    body: [
      "Elara combines 16 everyday services into one application. Instead of juggling separate apps for food delivery, groceries, parcels and home repairs, you get one account, one wallet and one checkout.",
      "Each service is a module. Modules load dynamically based on your area, so you only see what's actually available near you — and new services appear automatically without you updating the app.",
      "Payments are unified too. bKash and Nagad transfers are instant, cards carry zero hidden markup, and Elara Pay Wallet credits work across every module.",
    ],
  },
  {
    slug: "mfs-fast-payments",
    title: "Why bKash & Nagad MFS Payouts Are Instant on Elara",
    author: "Nafis Tahmid",
    date: "2026-02-26",
    readMinutes: 4,
    excerpt: "Instant mobile financial service transfers with zero delays — for you and for the merchants you buy from.",
    body: [
      "Elara integrates directly with Bangladesh MFS APIs (bKash, Nagad, SSLCommerz). No complicated manual transfers — funds clear within seconds.",
      "That's why Elara makes MFS the default at checkout. Cash-on-delivery and cards are also fully supported with transparent billing.",
      "Merchants benefit too: lower processing costs mean better prices and faster settlements — payouts land via BEFTN or MFS in real time.",
    ],
  },
  {
    slug: "become-a-rider",
    title: "Earn on Your Schedule: Becoming an Elara Fleet Rider",
    author: "Rafiq Uddin",
    date: "2026-02-14",
    readMinutes: 6,
    excerpt: "Multi-service earning, instant bKash payouts and a reputation system that rewards quality.",
    body: [
      "Elara Fleet riders aren't limited to one vertical. In a single shift you can deliver food, parcels, flowers and groceries — more orders, less dead time.",
      "Earnings are visible in real time, and instant cashout to bKash or Nagad means you're never waiting days for your money.",
      "The reputation system rewards careful, punctual riders with first access to high-value orders and weekly incentives.",
    ],
  },
];
