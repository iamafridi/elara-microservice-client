"use client";

import { useState } from "react";
import Link from "next/link";

interface TripRecord {
  id: string;
  orderNumber: string;
  merchant: string;
  pickupZone: string;
  dropZone: string;
  time: string;
  date: string;
  distanceKm: number;
  paymentMode: "bKash Digital" | "Nagad Pay" | "Cash on Delivery";
  baseFare: number;
  surgeBonus: number;
  tip: number;
  totalEarnings: number;
  customerRating: number;
}

const TRIP_HISTORY: TripRecord[] = [
  {
    id: "TRIP-8941",
    orderNumber: "#EL-8941",
    merchant: "Kacchi Bhai Banani",
    pickupZone: "Banani Rd 11",
    dropZone: "Gulshan-2, Rd 54",
    time: "1:45 PM",
    date: "Today, 16 Oct",
    distanceKm: 2.8,
    paymentMode: "Cash on Delivery",
    baseFare: 110,
    surgeBonus: 10,
    tip: 45,
    totalEarnings: 165,
    customerRating: 5
  },
  {
    id: "TRIP-8935",
    orderNumber: "#EL-8935",
    merchant: "Shwapno Daily Superstore",
    pickupZone: "Gulshan 1 Circle",
    dropZone: "Niketan Block E",
    time: "12:20 PM",
    date: "Today, 16 Oct",
    distanceKm: 1.9,
    paymentMode: "bKash Digital",
    baseFare: 90,
    surgeBonus: 0,
    tip: 20,
    totalEarnings: 110,
    customerRating: 5
  },
  {
    id: "TRIP-8920",
    orderNumber: "#EL-8920",
    merchant: "Pizza Guyz Banani",
    pickupZone: "Banani 11",
    dropZone: "Mohakhali DOHS",
    time: "11:05 AM",
    date: "Today, 16 Oct",
    distanceKm: 3.4,
    paymentMode: "bKash Digital",
    baseFare: 130,
    surgeBonus: 25,
    tip: 50,
    totalEarnings: 205,
    customerRating: 5
  },
  {
    id: "TRIP-8894",
    orderNumber: "#EL-8894",
    merchant: "Sultan's Dine",
    pickupZone: "Gulshan 2",
    dropZone: "Baridhara Diplomatic Zone",
    time: "9:40 PM",
    date: "Yesterday, 15 Oct",
    distanceKm: 4.1,
    paymentMode: "Cash on Delivery",
    baseFare: 145,
    surgeBonus: 30,
    tip: 60,
    totalEarnings: 235,
    customerRating: 4
  },
  {
    id: "TRIP-8871",
    orderNumber: "#EL-8871",
    merchant: "Lazz Pharma Pharmacy",
    pickupZone: "Kalabagan",
    dropZone: "Dhanmondi 9/A",
    time: "7:15 PM",
    date: "Yesterday, 15 Oct",
    distanceKm: 2.1,
    paymentMode: "Nagad Pay",
    baseFare: 95,
    surgeBonus: 15,
    tip: 30,
    totalEarnings: 140,
    customerRating: 5
  }
];

export default function RiderHistoryPage() {
  const [filter, setFilter] = useState<"ALL" | "TODAY" | "YESTERDAY">("ALL");

  const filteredTrips = TRIP_HISTORY.filter((t) => {
    if (filter === "TODAY") return t.date.includes("Today");
    if (filter === "YESTERDAY") return t.date.includes("Yesterday");
    return true;
  });

  const totalEarned = filteredTrips.reduce((acc, curr) => acc + curr.totalEarnings, 0);
  const totalKm = filteredTrips.reduce((acc, curr) => acc + curr.distanceKm, 0).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Fleet Run Logs
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              100% On-Time SLA
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Completed Trips & Payout History
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-[#131927] p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === "ALL" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            All Trips ({TRIP_HISTORY.length})
          </button>
          <button
            onClick={() => setFilter("TODAY")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === "TODAY" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("YESTERDAY")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === "YESTERDAY" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Yesterday
          </button>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#131927] border border-white/10 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Trips Done</span>
          <div className="text-xl font-black text-white">{filteredTrips.length}</div>
          <p className="text-[10px] text-emerald-400 font-mono">Zero cancellations</p>
        </div>

        <div className="bg-[#131927] border border-white/10 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Distance Logged</span>
          <div className="text-xl font-black text-white">{totalKm} km</div>
          <p className="text-[10px] text-slate-400 font-mono">Dhaka North cluster</p>
        </div>

        <div className="bg-[#131927] border border-emerald-500/30 rounded-2xl p-3.5 space-y-1 bg-emerald-500/5">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Total Payout</span>
          <div className="text-xl font-black text-emerald-400">৳ {totalEarned}</div>
          <p className="text-[10px] text-slate-400 font-mono">Includes tips & surge</p>
        </div>
      </div>

      {/* Trip List */}
      <div className="space-y-3">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            className="bg-[#131927] border border-white/10 rounded-2xl p-4 hover:border-white/20 transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{trip.orderNumber}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                      {trip.paymentMode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {trip.date} • {trip.time} • {trip.distanceKm} km
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs text-amber-400 font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-sm">star</span>
                  {trip.customerRating}.0
                </span>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400 font-mono">
                    ৳ {trip.totalEarnings}
                  </span>
                </div>
              </div>
            </div>

            {/* Route from Dokan to Dropoff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 bg-[#0B0F19] p-2.5 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-orange-400 text-sm mt-0.5">storefront</span>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Dokan Pickup</div>
                  <div className="font-bold text-slate-200">{trip.merchant}</div>
                  <div className="text-[11px] text-slate-400">{trip.pickupZone}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#0B0F19] p-2.5 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-emerald-400 text-sm mt-0.5">location_on</span>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Customer Dropoff</div>
                  <div className="font-bold text-slate-200">{trip.dropZone}</div>
                  <div className="text-[11px] text-slate-400">Handshake OTP verified</div>
                </div>
              </div>
            </div>

            {/* Fee Breakdown Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
              <div className="flex items-center gap-3">
                <span>Base: ৳{trip.baseFare}</span>
                {trip.surgeBonus > 0 && <span className="text-orange-400">Surge: +৳{trip.surgeBonus}</span>}
                {trip.tip > 0 && <span className="text-emerald-400">Diner Tip: +৳{trip.tip}</span>}
              </div>
              <span className="text-slate-500">Credited to Wallet</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-159 */
