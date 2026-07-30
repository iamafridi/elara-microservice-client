export type Module = {
  slug: string;
  title: string;
  nav: string;
  headline: string;
  description: string;
  features: { title: string; text: string }[];
  categories: string[];
  faq: { q: string; a: string }[];
};

const f = (title: string, text: string) => ({ title, text });
const q = (q: string, a: string) => ({ q, a });

export const MODULES: Module[] = [
  {
    slug: "food-delivery", title: "Food Delivery", nav: "Food Delivery",
    headline: "Food Delivery Near You — 1,000+ Restaurants",
    description: "Order biryani, pizza, Chinese and more from local restaurants with live rider tracking and 24-minute average delivery.",
    features: [f("Fast Delivery", "24-min average, Elara Fleet dispatch."), f("1,000+ Restaurants", "Takeaways to top brands."), f("Live Tracking", "Follow your rider in real time."), f("Halal Options", "100% Halal Certified.")],
    categories: ["Kacchi Biryani", "Old Dhaka Tehari", "Cha & Snacks", "Burgers", "Chinese", "Desserts"],
    faq: [q("How fast is delivery?", "Most orders arrive within 24 minutes with live GPS ETA."), q("Is there a delivery fee?", "Standard zone fee from ৳50."), q("Can I pay in the app?", "Yes — bKash, Nagad, Elara Wallet, and Cash on Delivery.")],

  },
  {
    slug: "grocery-delivery", title: "Grocery Delivery", nav: "Grocery",
    headline: "Groceries Delivered in Under an Hour",
    description: "Fresh groceries from supermarkets and local dabbas, weighted items priced on actual weight, 1-hour delivery slots.",
    features: [f("Fresh Guarantee", "Picked fresh or money back."), f("Weighted Pricing", "Charged on real weight."), f("Delivery Slots", "Book 1-hour windows."), f("Substitution Control", "You approve every swap.")],
    categories: ["Staples & Rice", "Fish & Meat", "Frozen", "Dairy", "Snacks", "Beverages"],
    faq: [q("How are weighted items charged?", "Actual weight at packing, variance capped at ±10%."), q("Can I choose a slot?", "Yes — 1-hour windows including express.")],
  },
  {
    slug: "halal-fresh", title: "Halal Fresh", nav: "Halal Fresh",
    headline: "Certified Halal Meat & Essentials",
    description: "DSC-certified halal butchers with custom cuts (korma, rezala, BBQ) delivered cold-chain across your city.",
    features: [f("DSC Certified", "Certificates verified per vendor."), f("Custom Cuts", "Your way, every time."), f("Cold Chain", "0–4°C insulated delivery."), f("Slaughter Date", "Fresh stock only.")],
    categories: ["Mutton", "Beef", "Chicken", "Lamb", "Marinated Packs", "Essentials"],
    faq: [q("How do I know it's certified?", "Each listing shows the DSC certificate number."), q("Can I request cuts?", "Yes — captured at checkout and sent to the butcher.")],
  },
  {
    slug: "flowers-and-gifts", title: "Flowers & Gifts", nav: "Flowers & Gifts",
    headline: "Flower Delivery — Same Day Available",
    description: "Hand-tied bouquets, vases and gift combos with guaranteed 1-hour delivery slots and anonymous sender option.",
    features: [f("Same-Day", "Order by 4 PM for today."), f("Time-Slot Guaranteed", "Or your fee refunded."), f("Gift Add-ons", "Cards, chocolates, vases."), f("Anonymous Option", "Send privately.")],
    categories: ["Birthday Bouquets", "Wedding Flowers", "Roses", "Lilies", "Gift Combos", "Condolence"],
    faq: [q("Is same-day guaranteed?", "Yes for orders before 4 PM in served zones."), q("Can I hide my identity?", "Yes — anonymous sender option.")],
  },
  {
    slug: "courier", title: "Courier & Parcel", nav: "Courier",
    headline: "Same-Day Parcel Delivery",
    description: "Send anything across town with instant quotes, live rider tracking, multi-stop routes and optional cash-on-delivery.",
    features: [f("Instant Quote", "Price by size, weight, route."), f("Live Tracking", "End-to-end rider tracking."), f("Multi-Stop", "Several drops, one route."), f("COD Available", "Collect cash on delivery.")],
    categories: ["Documents", "Small Parcels", "Large Items", "Multi-Stop", "Express", "COD"],
    faq: [q("How fast can you collect?", "Riders are assigned within minutes."), q("Is my parcel insured?", "Standard cover included; extra cover optional.")],
  },
  {
    slug: "fresh-fish", title: "Fresh Fish", nav: "Fresh Fish",
    headline: "Daily Catch, Cleaned & Delivered Cold",
    description: "River and sea fish cleaned, cut to your preference and delivered in 0–4°C cold boxes.",
    features: [f("Daily Catch", "New stock each morning."), f("Free Cleaning", "Gutting and scaling."), f("Cut Styles", "Whole, steaks, curry."), f("Cold Chain", "0–4°C end to end.")],
    categories: ["Rui", "Katla", "Pabda", "Hilsa", "Tilapia", "Prawns"],
    faq: [q("Can you cut the fish?", "Yes — choose a style and add notes at checkout.")],
  },
  {
    slug: "services", title: "Services (TaskOnTap)", nav: "Services",
    headline: "Local Home Services — Book in Minutes",
    description: "Cleaning, plumbing, electrical, painting and more from trusted, verified local professionals.",
    features: [f("13 Categories", "80+ sub-services."), f("Fixed Quotes", "See price before you book."), f("Verified Pros", "NID and trade-checked."), f("Escrow Protected", "Pay on completion.")],
    categories: ["Cleaning", "AC & Appliance", "Plumbing", "Electrical", "Painting", "Carpentry"],
    faq: [q("Are pros vetted?", "Yes — identity and trade documents verified before going live.")],
  },
  {
    slug: "fashion", title: "Fashion", nav: "Fashion",
    headline: "Fashion From Local Boutiques",
    description: "Panjabis, sarees, kids' wear and brands with free 7-day returns and size exchange.",
    features: [f("Free Returns", "7-day home pickup."), f("Size Exchange", "One free swap per item."), f("COD", "Try before you pay."), f("Eid Collections", "Seasonal drops.")],
    categories: ["Salwar Kameez", "Panjabi", "Saree", "Kids", "Accessories", "Footwear"],
    faq: [q("How do returns work?", "Request in-app; a rider collects within 48 hours.")],
  },
  {
    slug: "health-and-care", title: "Health & Care", nav: "Health & Care",
    headline: "Pharmacy & Home Care Delivered",
    description: "Prescription medicine with pharmacist verification, OTC essentials and home nursing bookings.",
    features: [f("Rx Delivery", "Pharmacist verifies your upload."), f("Licensed Pharmacies", "86 partners."), f("Chronic Packs", "Monthly with reminders."), f("Home Nursing", "Vetted nurses via JobTap.")],
    categories: ["Prescription", "OTC & First Aid", "Diabetes & BP", "Wellness", "Baby Care"],
    faq: [q("Do I need a prescription?", "For regulated medicines, yes — verified before dispatch.")],
  },
  {
    slug: "electronics", title: "Electronics", nav: "Electronics",
    headline: "Gadgets & Appliances With Warranty",
    description: "Phones, ACs, appliances and gadgets from warranty-backed local sellers with inspection-on-delivery.",
    features: [f("1-Year Warranty", "Seller + platform cover."), f("Inspect Before Pay", "Open the box first."), f("EMI Options", "0% instalments on cards."), f("COD to ৳20,000", "On eligible items.")],
    categories: ["Phones", "AC & Cooling", "Appliances", "Audio", "Wearables", "Accessories"],
    faq: [q("Can I inspect before accepting?", "Yes — the rider waits up to 5 minutes.")],
  },
  {
    slug: "tickets-and-travel", title: "Tickets & Travel", nav: "Tickets & Travel",
    headline: "Bus Tickets, Events & Day Trips",
    description: "Intercity bus seats, event tickets and holiday packages with instant e-tickets by QR and SMS.",
    features: [f("Live Seat Maps", "Held 8 minutes during payment."), f("Instant e-Ticket", "QR + SMS, offline ready."), f("Event Tickets", "Concerts, sports, shows."), f("Refund to Wallet", "Instant per policy.")],
    categories: ["Bus Tickets", "Events", "Tours", "Holidays", "Ferry"],
    faq: [q("Do tickets work offline?", "Yes — QR e-tickets cache and scan without signal.")],
  },
  {
    slug: "digital-services", title: "Local Digital Services", nav: "Digital Services",
    headline: "Bills, Recharge & Government Help",
    description: "Pay electricity, gas and water bills, mobile recharge, and get guided help with NID and passport applications.",
    features: [f("Bill Payments", "DESCO, Titas, WASA and more."), f("Instant Recharge", "All four operators."), f("Gov Help", "Guided NID & passport help."), f("No Hidden Fees", "Every fee shown up front.")],
    categories: ["Electricity", "Gas", "Water", "Internet", "Recharge", "Gov Services"],
    faq: [q("Are there extra charges?", "Service fees are always displayed before you pay.")],
  },
  {
    slug: "cars", title: "Cars — Buy & Sell", nav: "Cars — Buy & Sell",
    headline: "Verified Car & Bike Listings",
    description: "NID-checked sellers, test-drive booking and escrow payments for high-value deals.",
    features: [f("Verified Sellers", "91% NID-checked."), f("Test Drives", "Book free in-app."), f("Escrow Payment", "Funds release on confirm."), f("History Checks", "Service history shown.")],
    categories: ["Cars", "Motorbikes", "Vans", "Commercial", "Accessories"],
    faq: [q("How is payment protected?", "High-value deals use Elara escrow until you confirm handover.")],
  },
  {
    slug: "instant-jobs", title: "Instant Local Jobs", nav: "Local Jobs",
    headline: "Hire Local Talent for Any Job",
    description: "Post a job, receive quotes from nearby taskers within a 15 km radius, and pay through escrow.",
    features: [f("Instant Quotes", "Bids in minutes."), f("Escrow Guarantee", "Released on completion."), f("15 km Radius", "Local talent, fast."), f("Verified Taskers", "NID + trade checks.")],
    categories: ["Repairs", "Moving", "Cleaning", "Events", "Delivery Help", "Tutoring"],
    faq: [q("How does escrow work?", "Fund up front; tasker is paid when you mark complete.")],
  },
  {
    slug: "elara-pay", title: "Elara Pay", nav: "Elara Pay",
    headline: "One Wallet for the Whole Super App",
    description: "Top up, pay merchants, send money to friends and earn loyalty points — protected by bank-grade security.",
    features: [f("Instant Top-up", "bKash, Nagad, cards, bank."), f("P2P Transfers", "Free and instant."), f("Loyalty Points", "Earn on every payment."), f("Protected", "Bank-grade security.")],
    categories: ["Top-up", "Send Money", "Pay Bills", "Loyalty", "Refunds"],
    faq: [q("Are transfers free?", "Wallet-to-wallet transfers are always free.")],
  },
  {
    slug: "ride", title: "Ride", nav: "Ride",
    headline: "Ride Hailing — Coming Soon",
    description: "Bike and car hailing with upfront fares, live tracking and in-app safety features. Launching soon.",
    features: [f("Upfront Fares", "See price before you ride."), f("Live Tracking", "Share your trip."), f("Safety First", "SOS + verification."), f("Bike & Car", "Both options.")],
    categories: ["Bike", "Car", "Share Ride"],
    faq: [q("When is Ride launching?", "Join the in-app waitlist to be notified first.")],
  },
];

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}


