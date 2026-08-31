"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";
import { useAuth } from "@/context/AuthContext";
import { maskPhone } from "@/lib/privacy";

export default function CustomerTrackPage() {
  const { user } = useAuth();
  const { liveOrders, activeCustomerOrder, merchantAcceptOrder, riderPickupOrder, riderDeliverOrder } = useWorkflow();

  // Selected or active order
  const [selectedOrderState, setSelectedOrderState] = useState<LiveOrder | null>(null);
  const [callRiderToast, setCallRiderToast] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [telemetrySyncTime, setTelemetrySyncTime] = useState("Just now");
  const [riderCoords, setRiderCoords] = useState({ lat: 23.7937, lng: 90.4066, speed: 28, dist: 1.4 });

  // Resolve current order (use activeCustomerOrder, or first live order, or fallback seed)
  const currentOrder: LiveOrder =
    selectedOrderState ||
    activeCustomerOrder ||
    liveOrders[0] || {
      id: "ELR-DH-42534",
      customerName: user?.name || "Rahim Ahmed",
      customerPhone: "01712-849201",
      customerAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213",
      merchantName: "Kacchi Bhai — Banani Hub",
      merchantLocation: "Kemal Ataturk Ave, Banani, Dhaka",
      items: [
        { name: "Basmati Kacchi Platter with Borhani", qty: 2, price: 499, variant: "Full Mutton Portion" },
        { name: "Firni & Jorda Cup", qty: 2, price: 90 },
      ],
      subtotal: 1178,
      deliveryFee: 60,
      vat: 59,
      total: 1297,
      paymentMethod: "bkash",
      paymentStatus: "PAID",
      status: "ON_THE_WAY",
      riderName: "Tanvir Hossain",
      riderPhone: "01911-778899",
      deliveryOtp: "4819",
      etaMinutes: 12,
      createdAt: "12:40 PM • Today",
      updatedAt: "Just now",
      timeline: [
        { title: "Order Placed & bKash Verified", time: "12:40 PM", done: true },
        { title: "Kitchen Prepared (KDS Sealed)", time: "12:48 PM", done: true },
        { title: "Rider Assigned (Tanvir Hossain)", time: "12:55 PM", done: true },
        { title: "Out for Delivery (Live GPS)", time: "12:58 PM", done: true },
        { title: "Doorstep Handover (OTP Verification)", time: "Est. 1:12 PM", done: false },
      ],
    };

  // Simulated live telemetry movement
  useEffect(() => {
    const interval = setInterval(() => {
      setRiderCoords((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0004,
        lng: prev.lng + (Math.random() - 0.5) * 0.0004,
        speed: Math.floor(22 + Math.random() * 12),
        dist: Math.max(0.2, Number((prev.dist - 0.05).toFixed(2))),
      }));
      setTelemetrySyncTime("1s ago");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isDelivered = currentOrder.status === "DELIVERED";
  const isOnTheWay = currentOrder.status === "ON_THE_WAY";
  const isPreparing = currentOrder.status === "PREPARING";
  const isReady = currentOrder.status === "READY_FOR_PICKUP";
  const isPlaced = currentOrder.status === "PLACED";

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(currentOrder.deliveryOtp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Telemetry Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
              Live Order Tracking Radar
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1.5 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time GPS telemetry from Dokan kitchen to your doorstep in Banani, Dhaka
          </p>
        </div>

        {/* Telemetry Actions & Order Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs border border-slate-200 shadow-2xs">
            <span className="material-symbols-outlined text-emerald-600 text-sm">wifi_tethering</span>
            <span className="hidden sm:inline">Telemetry:</span>
            <span className="font-bold text-slate-900">Connected (14ms)</span>
          </div>

          {liveOrders.length > 1 && (
            <select
              value={currentOrder.id}
              onChange={(e) => {
                const found = liveOrders.find((o) => o.id === e.target.value);
                if (found) setSelectedOrderState(found);
              }}
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-primary shadow-xs"
            >
              {liveOrders.map((ord) => (
                <option key={ord.id} value={ord.id}>
                  #{ord.id} ({ord.merchantName.slice(0, 15)})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {callRiderToast && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-400">call</span>
            <span>
              Calling Rider Tanvir Hossain ({maskPhone(currentOrder.riderPhone || "+880 1911-778899")}) via Masked VoIP Proxy... &quot;Bhai, I am near Road 11!&quot;
            </span>
          </div>
          <button
            onClick={() => setCallRiderToast(false)}
            className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
          >
            End Call
          </button>
        </div>
      )}

      {/* Main Status Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/20 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                ORDER REFERENCE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 text-[10px] font-mono font-bold">
                {currentOrder.paymentMethod.toUpperCase()}
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight mt-0.5 block">
              #{currentOrder.id}
            </span>
            <span className="text-xs text-slate-300 font-sans mt-0.5 block">
              From <strong>{currentOrder.merchantName}</strong> &rarr; {currentOrder.customerAddress.split(",")[0]}
            </span>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              ESTIMATED ARRIVAL
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
              {isDelivered ? "Delivered" : `${currentOrder.etaMinutes} mins remaining`}
            </div>
            <span className="text-[11px] font-mono text-slate-400 block">
              {isDelivered ? "Handover complete" : "Target: 1:18 PM (Banani)"}
            </span>
          </div>
        </div>

        {/* 5-Step Progress Timeline */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-bold">
              Dispatch Milestones
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Step {isDelivered ? "5 of 5" : isOnTheWay ? "4 of 5" : isReady ? "3 of 5" : isPreparing ? "2 of 5" : "1 of 5"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {[
              {
                step: "1",
                label: "Order Placed",
                sub: "bKash Paid",
                active: true,
                done: true,
              },
              {
                step: "2",
                label: "Cooking (KDS)",
                sub: currentOrder.merchantName.slice(0, 12),
                active: isPreparing || isReady || isOnTheWay || isDelivered,
                done: isReady || isOnTheWay || isDelivered,
              },
              {
                step: "3",
                label: "Rider Assigned",
                sub: currentOrder.riderName || "Tanvir",
                active: isReady || isOnTheWay || isDelivered,
                done: isOnTheWay || isDelivered,
              },
              {
                step: "4",
                label: "Out for Delivery",
                sub: "Live GPS",
                active: isOnTheWay || isDelivered,
                done: isDelivered,
              },
              {
                step: "5",
                label: "Delivered",
                sub: "OTP Handover",
                active: isDelivered,
                done: isDelivered,
              },
            ].map((milestone) => (
              <div
                key={milestone.step}
                className={`p-3 rounded-2xl border text-xs space-y-1 transition ${
                  milestone.done
                    ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                    : milestone.active
                    ? "bg-amber-950/80 border-amber-500/50 text-amber-300 ring-1 ring-amber-500/50"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-base">
                    {milestone.done ? "check_circle" : milestone.active ? "sync" : "radio_button_unchecked"}
                  </span>
                  <span className="truncate">{milestone.label}</span>
                </div>
                <div className="text-[10px] font-mono opacity-80 truncate">{milestone.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Secure Delivery PIN Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-lg">shield</span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                SECURE CONTACTLESS DELIVERY PIN
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Provide this 4-digit code verbally to Rider Tanvir upon arrival to verify delivery handover.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-5 py-2 rounded-2xl bg-white text-slate-900 font-mono font-black text-2xl tracking-widest shadow-md">
              {currentOrder.deliveryOtp}
            </div>
            <button
              onClick={handleCopyOtp}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              title="Copy PIN"
            >
              <span className="material-symbols-outlined text-base">
                {copiedOtp ? "check" : "content_copy"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Live GPS Simulation & Rider Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive GPS Radar Map (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
              <h2 className="font-bold text-base text-slate-900 font-sans">Dhaka Telemetry Radar</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Updated {telemetrySyncTime}</span>
            </div>
          </div>

          {/* Interactive Simulated Map Canvas */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 text-white relative h-72 overflow-hidden flex flex-col justify-between">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Radar Coordinates HUD */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>GPS: 23.7937° N, 90.4066° E</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Zone: Banani-Gulshan Corridor
              </span>
            </div>

            {/* Simulated Live Route Graphic */}
            <div className="relative z-10 flex items-center justify-center py-6">
              <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-amber-400">
                    <span className="material-symbols-outlined text-base">storefront</span>
                    <span className="font-bold truncate max-w-[120px]">{currentOrder.merchantName}</span>
                  </div>
                  <span className="text-slate-500">────────</span>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="material-symbols-outlined text-base animate-bounce">two_wheeler</span>
                    <span>Tanvir ({riderCoords.speed} km/h)</span>
                  </div>
                  <span className="text-slate-500">────────</span>
                  <div className="flex items-center gap-2 text-sky-400">
                    <span className="material-symbols-outlined text-base">home</span>
                    <span className="font-bold truncate max-w-[100px]">Banani Rd 11</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(95, Math.max(15, 100 - riderCoords.dist * 35))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Metrics Strip */}
            <div className="relative z-10 grid grid-cols-3 gap-2 bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 text-center font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Speed</span>
                <span className="text-xs font-bold text-emerald-400">{riderCoords.speed} km/h</span>
              </div>
              <div className="border-x border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Distance Left</span>
                <span className="text-xs font-bold text-white">{riderCoords.dist} km</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Route</span>
                <span className="text-xs font-bold text-slate-300">Kemal Ataturk</span>
              </div>
            </div>
          </div>

          {/* Quick Simulation Advancement Bar */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-500 font-medium">Test multi-role lifecycle:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {isPlaced && (
                <button
                  type="button"
                  onClick={() => merchantAcceptOrder(currentOrder.id)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition"
                >
                  Merchant Starts Cooking &rarr;
                </button>
              )}
              {isPreparing && (
                <button
                  type="button"
                  onClick={() => riderPickupOrder(currentOrder.id)}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition"
                >
                  Rider Picks Up &rarr;
                </button>
              )}
              {isOnTheWay && (
                <button
                  type="button"
                  onClick={() => riderDeliverOrder(currentOrder.id, currentOrder.deliveryOtp)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
                >
                  Handover with OTP ({currentOrder.deliveryOtp}) &rarr;
                </button>
              )}
              <Link
                href={`/customer/orders/${currentOrder.id}`}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-white text-slate-700 transition"
              >
                Order Details
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Courier & Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Assigned Rider Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Assigned Fleet Courier</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                Active On Shift
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                TH
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block leading-tight">
                  {currentOrder.riderName || "Tanvir Hossain"}
                </span>
                <span className="text-xs text-slate-500 font-mono">Hero Splendor Plus (48-1920)</span>
                <div className="text-[11px] text-amber-500 font-mono font-bold mt-0.5">
                  ★ 4.96 (1,840 deliveries)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCallRiderToast(true)}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                title="Masked VoIP Proxy Call"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>Call Rider (Proxy)</span>
              </button>
              <Link
                href="/customer/support"
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold transition flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>Care Chat</span>
              </Link>
            </div>
          </div>

          {/* Order Bill Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 font-sans">Bill Summary</span>
              <Link
                href={`/customer/orders/${currentOrder.id}/invoice`}
                className="text-primary hover:underline text-[11px] font-bold"
              >
                Mushak-6.3 &rarr;
              </Link>
            </div>

            <div className="space-y-1.5 text-slate-600">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate max-w-[180px]">
                    {item.qty}x {item.name}
                  </span>
                  <span className="font-bold text-slate-900">৳{item.price * item.qty}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span>Delivery Charge:</span>
                <span>৳{currentOrder.deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Mushak-6.3 VAT (5%):</span>
                <span>৳{currentOrder.vat}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Paid ({currentOrder.paymentMethod.toUpperCase()}):</span>
                <span className="text-primary font-black">৳{currentOrder.total} BDT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-154 */
