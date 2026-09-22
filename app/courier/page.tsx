"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWorkflow } from "@/context/WorkflowContext";

interface ParcelType {
  id: string;
  name: string;
  weight: string;
  icon: string;
  description: string;
  surcharge: number;
  popular?: boolean;
}

interface SpeedTier {
  id: string;
  name: string;
  eta: string;
  icon: string;
  badge: string;
  description: string;
  baseFare: number;
}

const PARCEL_TYPES: ParcelType[] = [
  {
    id: "doc",
    name: "Documents / Mail",
    weight: "< 500g",
    icon: "draft",
    description: "Certificates, contracts, envelopes, keys, passport files",
    surcharge: 0,
  },
  {
    id: "box",
    name: "Small Parcel",
    weight: "< 3 kg",
    icon: "package_2",
    description: "Apparel, electronics, cosmetics, gift boxes & gadgets",
    surcharge: 15,
    popular: true,
  },
  {
    id: "carton",
    name: "Bulk Carton",
    weight: "Up to 15 kg",
    icon: "inventory_2",
    description: "Heavy merchandise, wholesale goods & home supplies",
    surcharge: 45,
  },
];

const SPEED_TIERS: SpeedTier[] = [
  {
    id: "instant",
    name: "Instant Bullet Rider",
    eta: "45 Mins",
    icon: "speed",
    badge: "Direct Route",
    description: "Dedicated single-order rider straight from pickup to doorstep",
    baseFare: 120,
  },
  {
    id: "eco",
    name: "Same-Day Eco Smart",
    eta: "3 - 4 Hours",
    icon: "eco",
    badge: "Lowest Carbon",
    description: "Batched electric fleet dispatch across your Dhaka zone",
    baseFare: 60,
  },
  {
    id: "nationwide",
    name: "Nationwide Next-Day",
    eta: "24 Hours",
    icon: "hub",
    badge: "Sundarban Direct",
    description: "Cross-district distribution to Chittagong, Sylhet & 64 districts",
    baseFare: 110,
  },
];

const POPULAR_PICKUPS = [
  { label: "Banani 11", address: "House 14, Road 11, Block D, Banani, Dhaka" },
  { label: "Gulshan-2", address: "Plot 42, Gulshan-2 Circle, Dhaka-1212" },
  { label: "Uttara Sec-3", address: "Sector 3, Jashimuddin Avenue, Uttara, Dhaka" },
  { label: "Baridhara", address: "Park Road, Baridhara Diplomatic Zone, Dhaka" },
  { label: "Dhanmondi", address: "Road 7/A, Dhanmondi R/A, Dhaka-1209" },
];

const POPULAR_DROPOFFS = [
  { label: "Dhanmondi 27", address: "Road 27 (Old), Shatmoshjid Road, Dhanmondi, Dhaka" },
  { label: "Mirpur-10", address: "Mirpur-10 Roundabout, Section 6, Dhaka-1216" },
  { label: "Bashundhara", address: "Block C Main Gate, Bashundhara R/A, Dhaka" },
  { label: "Mohakhali DOHS", address: "Road 4, Mohakhali DOHS, Dhaka" },
  { label: "Motijheel", address: "Sena Kalyan Bhaban, Motijheel C/A, Dhaka" },
];

export default function CourierPage() {
  const router = useRouter();
  const { placeOrder } = useWorkflow();

  // Form State
  const [pickup, setPickup] = useState("House 14, Road 11, Block D, Banani, Dhaka");
  const [dropoff, setDropoff] = useState("Road 27 (Old), Dhanmondi R/A, Dhaka 1209");
  const [receiverName, setReceiverName] = useState("Tanzeem Hossain");
  const [receiverPhone, setReceiverPhone] = useState("01711-239485");
  const [selectedParcel, setSelectedParcel] = useState<string>("box");
  const [isFragile, setIsFragile] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState<string>("instant");
  const [codAmount, setCodAmount] = useState<number>(0);
  const [smsTracking, setSmsTracking] = useState(true);
  const [securityOtp, setSecurityOtp] = useState(true);
  const [packageNotes, setPackageNotes] = useState("");
  const [isDispatching, setIsDispatching] = useState(false);
  const [bookingSuccessModal, setBookingSuccessModal] = useState<any>(null);

  // Dynamic calculations
  const distanceKm = 9.8;
  const activeParcel = PARCEL_TYPES.find((p) => p.id === selectedParcel) || PARCEL_TYPES[1];
  const activeSpeed = SPEED_TIERS.find((s) => s.id === selectedSpeed) || SPEED_TIERS[0];

  const baseFare = activeSpeed.baseFare;
  const distanceFee = Math.round(distanceKm * 3.5);
  const parcelFee = activeParcel.surcharge;
  const fragileFee = isFragile ? 20 : 0;
  const vat = Math.round((baseFare + distanceFee + parcelFee + fragileFee) * 0.05);
  const totalDeliveryFee = baseFare + distanceFee + parcelFee + fragileFee + vat;

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatching(true);

    setTimeout(() => {
      const created = placeOrder({
        items: [
          {
            name: `Courier Express Dispatch (${activeParcel.name})`,
            qty: 1,
            price: totalDeliveryFee,
            variant: `${activeSpeed.name} • ${pickup.split(",")[0]} → ${dropoff.split(",")[0]}`,
          },
        ],
        subtotal: totalDeliveryFee - vat,
        deliveryFee: 0,
        vat,
        total: totalDeliveryFee,
        address: `${dropoff} (Recipient: ${receiverName}, ${receiverPhone})`,
        paymentMethod: codAmount > 0 ? "cod" : "bkash",
        notes: `COD Collection: ৳${codAmount} | Speed: ${activeSpeed.name} | Fragile: ${isFragile ? "YES" : "NO"} | Note: ${packageNotes || "N/A"}`,
      });

      setIsDispatching(false);
      setBookingSuccessModal({
        orderId: created.id,
        pickup,
        dropoff,
        speed: activeSpeed.name,
        total: totalDeliveryFee,
        cod: codAmount,
        otp: created.deliveryOtp,
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-emerald-300 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hyperlocal &amp; Intercity Dispatch • Zone 1 &amp; 2 Live</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight">
                Courier Express
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Send parcel boxes, critical documents, and merchandise anywhere across Dhaka in 45 minutes, with instant bKash COD disbursements.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
              <div className="px-4 py-2 rounded-xl bg-white/10 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emerald-300 text-2xl">two_wheeler</span>
                <div>
                  <span className="text-[10px] font-mono text-slate-300 block uppercase">Active Fleet</span>
                  <span className="text-sm font-bold text-white">1,420 Riders</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-orange-400 text-2xl">bolt</span>
                <div>
                  <span className="text-[10px] font-mono text-slate-300 block uppercase">Avg. Pickup</span>
                  <span className="text-sm font-bold text-white">11.4 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <form onSubmit={handleConfirmDispatch} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Route Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-primary text-white font-mono font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">Route Details</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span>Calculated Route: {distanceKm} km</span>
                </div>
              </div>

              {/* Connected Track */}
              <div className="relative pl-6 space-y-5">
                <div className="absolute left-2.5 top-5 bottom-8 w-0.5 bg-slate-200"></div>

                {/* Pickup Location */}
                <div className="relative">
                  <div className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-500">
                        Pickup Location (Sender)
                      </label>
                      <button
                        type="button"
                        onClick={() => setPickup("House 42, Road 11, Block D, Banani, Dhaka-1213")}
                        className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">home</span>
                        <span>Saved Home</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                      placeholder="Sender street, house number, area..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                    />
                    {/* Quick Hub Pills */}
                    <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">Popular:</span>
                      {POPULAR_PICKUPS.map((hub) => (
                        <button
                          key={hub.label}
                          type="button"
                          onClick={() => setPickup(hub.address)}
                          className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 hover:border-primary text-slate-600 hover:text-primary text-[11px] font-mono transition shrink-0"
                        >
                          {hub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dropoff Location */}
                <div className="relative">
                  <div className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-500">
                        Drop-off Destination (Receiver)
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">Direct Delivery</span>
                    </div>
                    <input
                      type="text"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      required
                      placeholder="Receiver exact address, road/flat number..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                    />
                    {/* Quick Hub Pills */}
                    <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">Zones:</span>
                      {POPULAR_DROPOFFS.map((hub) => (
                        <button
                          key={hub.label}
                          type="button"
                          onClick={() => setDropoff(hub.address)}
                          className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 hover:border-orange-500 text-slate-600 hover:text-orange-600 text-[11px] font-mono transition shrink-0"
                        >
                          {hub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-slate-500">Receiver Name</label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    required
                    placeholder="Full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-slate-500">Receiver Mobile</label>
                  <input
                    type="tel"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    required
                    placeholder="017XX-XXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Parcel Classification */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-primary text-white font-mono font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">Parcel Classification</h2>
                </div>
                <span className="text-xs font-mono text-slate-400">Weight-calibrated pricing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PARCEL_TYPES.map((pt) => {
                  const isSelected = selectedParcel === pt.id;
                  return (
                    <div
                      key={pt.id}
                      onClick={() => setSelectedParcel(pt.id)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? "bg-emerald-50/60 border-primary shadow-sm ring-2 ring-primary/20"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {pt.popular && (
                        <div className="absolute -top-2.5 right-3 bg-primary text-white text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                          Most Booked
                        </div>
                      )}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                              isSelected ? "bg-primary text-white" : "bg-white text-slate-600 border border-slate-200"
                            }`}
                          >
                            <span className="material-symbols-outlined text-lg">{pt.icon}</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                            {pt.weight}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">{pt.name}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{pt.description}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Rate addon:</span>
                        <span className="font-bold text-slate-800">
                          {pt.surcharge > 0 ? `+৳${pt.surcharge}` : "Base"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Fragile Toggle */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">warning</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-amber-950">Fragile or Glass Content</h4>
                    <p className="text-[11px] text-amber-800">
                      Reinforced padded carrier bag &amp; gentle transit pledge (+৳20)
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isFragile}
                  onChange={(e) => setIsFragile(e.target.checked)}
                  className="w-5 h-5 accent-amber-600 rounded cursor-pointer shrink-0"
                />
              </div>
            </div>

            {/* Step 3: Speed Tiers */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-primary text-white font-mono font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">Delivery Speed &amp; Network</h2>
                </div>
                <span className="text-xs font-mono text-slate-400">Real-time GPS dispatch</span>
              </div>

              <div className="space-y-3">
                {SPEED_TIERS.map((tier) => {
                  const isSelected = selectedSpeed === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedSpeed(tier.id)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-white/10 text-emerald-400" : "bg-white border border-slate-200 text-slate-700"
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl">{tier.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base">{tier.name}</span>
                            <span
                              className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                isSelected ? "bg-emerald-500/20 text-emerald-300" : "bg-primary/10 text-primary"
                              }`}
                            >
                              {tier.eta}
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                            {tier.description}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/40">
                        <span className={`text-lg font-black font-mono ${isSelected ? "text-emerald-400" : "text-slate-900"}`}>
                          ৳{tier.baseFare}
                        </span>
                        <span className={`text-[10px] font-mono ${isSelected ? "text-slate-400" : "text-slate-500"}`}>
                          {tier.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: COD & Value Added */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-primary text-white font-mono font-black text-xs flex items-center justify-center">
                    4
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">Cash On Delivery &amp; Security</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  0% COD FEE PROMO
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* COD Amount Input */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono uppercase font-bold text-slate-700">
                      Collect Cash from Recipient
                    </label>
                    <span className="text-[10px] font-mono font-bold text-primary">bKash Disbursed</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 font-bold font-mono text-slate-400 text-sm">৳</span>
                    <input
                      type="number"
                      min="0"
                      value={codAmount || ""}
                      onChange={(e) => setCodAmount(Number(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-sm font-bold font-mono text-slate-900 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Leave ৳0 if parcel is prepaid. Rider collects cash and credits your Elara Pay / bKash wallet.
                  </p>
                </div>

                {/* SMS & Security Switches */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">SMS Live Telemetry</span>
                      <span className="text-[10px] text-slate-500">Bangla &amp; English SMS to receiver</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsTracking}
                      onChange={(e) => setSmsTracking(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer border-t border-slate-200 pt-2">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">Security Delivery PIN</span>
                      <span className="text-[10px] text-slate-500">4-digit OTP handover requirement</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={securityOtp}
                      onChange={(e) => setSecurityOtp(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Special Instructions Note */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase font-bold text-slate-500">
                  Special Dispatch Notes for Rider
                </label>
                <input
                  type="text"
                  value={packageNotes}
                  onChange={(e) => setPackageNotes(e.target.value)}
                  placeholder="e.g. Call sender before reaching, lift 4th floor, handle gently..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Fare Estimate & Dispatch (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Interactive Route HUD */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">explore</span>
                  <span className="font-bold text-sm text-slate-900">Dhaka Transit Telemetry</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  Live Dispatch Grid
                </span>
              </div>

              {/* Route Graphic Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 p-4 text-white relative overflow-hidden">
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Route Locked
                    </span>
                    <span>{distanceKm} km via Mohakhali</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white truncate">
                      {pickup.split(",")[0] || "Banani 11"}
                    </div>
                    <div className="text-[10px] text-slate-400 pl-4 border-l border-white/20">
                      ↓ Express Transit Path
                    </div>
                    <div className="text-xs font-bold text-emerald-300 truncate">
                      {dropoff.split(",")[0] || "Dhanmondi 27"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearest Rider Spotlight */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                    TH
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">Tanvir Hossain</span>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <span className="text-amber-500">★ 4.96</span> (1,840 trips)
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  Nearest Rider (4 min)
                </span>
              </div>
            </div>

            {/* Fare Breakdown Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
                  <h3 className="font-bold text-base text-slate-900">Fare Estimate</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Guaranteed Rate</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Speed Tier ({activeSpeed.name}):</span>
                  <span className="font-bold text-slate-900">৳{baseFare}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Distance Surcharge ({distanceKm} km):</span>
                  <span className="font-bold text-slate-900">৳{distanceFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Parcel Class ({activeParcel.name}):</span>
                  <span className="font-bold text-slate-900">৳{parcelFee}</span>
                </div>
                {isFragile && (
                  <div className="flex justify-between text-amber-700 font-bold">
                    <span>Fragile Container Safe-Pack:</span>
                    <span>+৳20</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-700">
                  <span>COD Collection Fee (Promo):</span>
                  <span className="font-bold">৳0 (FREE)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>NBR Mushak-6.3 VAT (5%):</span>
                  <span>৳{vat}</span>
                </div>

                {/* Total Line */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Total Delivery Fee
                    </span>
                    <span className="text-3xl font-black font-sans text-primary">৳{totalDeliveryFee}</span>
                  </div>
                  {codAmount > 0 && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                        Receiver Collects
                      </span>
                      <span className="text-lg font-black font-mono text-orange-600">৳{codAmount} COD</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isDispatching}
                className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold font-sans text-sm sm:text-base shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                {isDispatching ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Matching Nearest Rider...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">bolt</span>
                    <span>Confirm &amp; Summon Rider</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
                  Goods Insured
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-600">pin_drop</span>
                  Live Telemetry
                </span>
              </div>
            </div>

            {/* Helpline Badge */}
            <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-xs shrink-0">
                <span className="material-symbols-outlined text-xl">headset_mic</span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Dhaka Courier Operations Desk</span>
                <span className="text-slate-500">24/7 Hotline: <strong>09612-000300</strong></span>
              </div>
            </div>
          </div>
        </form>

        {/* Live Parcel Trackers streaming cards */}
        <div className="mt-14 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">Live Parcel Dispatches in Dhaka</h3>
              <p className="text-xs text-slate-500">Real-time status of packages currently moving through the Dhaka traffic grid</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Live Grid Feed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900">#ELR-98421</span>
                <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  12 mins left
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono truncate">Banani 11 → Dhanmondi 27</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: "72%" }}></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900">#ELR-98399</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Delivered
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono truncate">Uttara Sec-7 → Gulshan-1</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900">#ELR-98310</span>
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Pickup Ready
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono truncate">Mirpur-10 → Motijheel C/A</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Success Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl shadow-sm">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>

            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase text-primary tracking-wider">
                Rider Dispatched
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-sans">
                Courier Booking #{bookingSuccessModal.orderId}
              </h3>
              <p className="text-xs text-slate-500">
                Rider Tanvir Hossain has accepted your dispatch and is en route to pickup.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Fee:</span>
                <span className="font-bold text-slate-900">৳{bookingSuccessModal.total} BDT</span>
              </div>
              {bookingSuccessModal.cod > 0 && (
                <div className="flex justify-between text-orange-600 font-bold">
                  <span>COD Collection:</span>
                  <span>৳{bookingSuccessModal.cod}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">Delivery Handover OTP:</span>
                <span className="font-black text-primary text-sm tracking-widest">{bookingSuccessModal.otp}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/customer/track"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition"
              >
                <span className="material-symbols-outlined text-sm">navigation</span>
                <span>Track Rider on Live Radar</span>
              </Link>
              <button
                type="button"
                onClick={() => setBookingSuccessModal(null)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-mono text-xs transition"
              >
                Close &amp; Book Another Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* elara-stage-185 */
