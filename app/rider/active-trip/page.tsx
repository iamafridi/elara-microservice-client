"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";
import { maskPhone, maskAddressForRider, maskCustomerName } from "@/lib/privacy";

export default function RiderActiveTripPage() {
  const { orders, riderPickupOrder, riderDeliverOrder } = useWorkflow();

  // Find the trip currently in transit or assigned to rider Tanvir
  const activeOrder: LiveOrder | undefined =
    orders.find((o) => o.status === "ON_THE_WAY" || o.status === "RIDER_ASSIGNED" || o.status === "READY_FOR_PICKUP") ||
    orders[0];

  const isDelivered = activeOrder?.status === "DELIVERED";
  const [customerOtp, setCustomerOtp] = useState("");
  const [podCaptured, setPodCaptured] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!activeOrder) {
    return (
      <div className="bg-[#131927] border border-white/10 rounded-2xl p-8 text-center space-y-4">
        <span className="material-symbols-outlined text-4xl text-slate-500">two_wheeler</span>
        <h2 className="text-lg font-bold text-white">No Active Delivery In Progress</h2>
        <p className="text-xs text-slate-400">Head over to your Radar console to accept available restaurant pickups.</p>
        <Link
          href="/rider"
          className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
        >
          Open Rider Radar
        </Link>
      </div>
    );
  }

  const { displayAddress, isFullRevealed } = maskAddressForRider(
    activeOrder.customerAddress,
    activeOrder.status
  );

  const handlePickup = () => {
    riderPickupOrder(activeOrder.id);
    setToastMessage(`Order #${activeOrder.id} picked up from ${activeOrder.merchantName}. Routing to customer gate.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeliver = () => {
    setErrorMessage(null);
    if (!customerOtp || customerOtp.length !== 4) {
      setErrorMessage("Please enter the 4-digit Delivery Handover OTP from customer.");
      return;
    }

    const res = riderDeliverOrder(activeOrder.id, customerOtp);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setToastMessage(res.message);
      setCustomerOtp("");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400/80 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Trip Card */}
      <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
              isDelivered
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-orange-500/20 text-orange-400"
            }`}>
              {activeOrder.status.replace(/_/g, " ")}
            </span>
            <span className="text-xs text-slate-400 font-mono">#{activeOrder.id}</span>
            <span className="text-xs text-emerald-400 font-bold font-mono">
              • ৳ {activeOrder.total} ({activeOrder.paymentMethod.toUpperCase()})
            </span>
            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono rounded">
              🔒 PII Protected
            </span>
          </div>
          <h2 className="text-base font-bold text-white mt-1">
            {activeOrder.items.map((i) => `${i.qty}x ${i.name}`).join(", ")} • {activeOrder.merchantName}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-slate-500">pin_drop</span>
            <span>Dropoff: {displayAddress}</span>
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Customer: {maskCustomerName(activeOrder.customerName)} • {maskPhone(activeOrder.customerPhone)}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={`tel:${activeOrder.customerPhone}`}
            className="h-10 px-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 hover:bg-emerald-600 hover:text-white transition text-xs font-bold"
            title="Masked VoIP Proxy Call"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            <span className="hidden sm:inline">Call (Masked Proxy)</span>
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white transition"
            title="Open GPS Navigation"
          >
            <span className="material-symbols-outlined text-lg">near_me</span>
          </a>
        </div>
      </div>

      {/* Live Turn-by-Turn GPS Map Box */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F19] h-52 flex flex-col justify-between p-3">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Turn-by-Turn Floating HUD */}
        <div className="relative z-10 bg-[#131927]/95 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-3 shadow-xl">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">turn_right</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {activeOrder.status === "ON_THE_WAY"
                ? "In 200m, turn right onto Kemal Ataturk Ave"
                : `Heading to merchant: ${activeOrder.merchantLocation}`}
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              ETA {activeOrder.etaMinutes || 8} mins • Dhaka Telemetry Active
            </p>
          </div>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold rounded">
            Live GPS
          </span>
        </div>

        {/* Bottom Info Indicators */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 font-mono">
          <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
            Telemetry: <span className="text-white font-bold">28 km/h • Banani Hub</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
            Delivery Payout: <span className="text-emerald-400 font-bold">৳ 60 + ৳ 25 Tip</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stepper Progression */}
      <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Delivery Pipeline
        </h3>

        <div className="space-y-3">
          {/* Step 1: Accepted / Preparing */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
              activeOrder.status !== "PLACED" && activeOrder.status !== "READY_FOR_PICKUP"
                ? "bg-emerald-500 text-slate-950"
                : "bg-orange-500 text-white animate-pulse"
            }`}>
              <span className="material-symbols-outlined text-base">check</span>
            </div>
            <div className="flex-1 flex items-center justify-between text-xs">
              <span className={activeOrder.status !== "READY_FOR_PICKUP" ? "line-through text-slate-500" : "font-bold text-white"}>
                Merchant Confirmed &amp; Packed ({activeOrder.merchantName})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Dokan Prep</span>
            </div>
          </div>

          {/* Step 2: Picked Up */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
              activeOrder.status === "ON_THE_WAY" || isDelivered
                ? "bg-emerald-500 text-slate-950"
                : activeOrder.status === "READY_FOR_PICKUP" || activeOrder.status === "RIDER_ASSIGNED"
                ? "bg-orange-500 text-white animate-pulse"
                : "bg-slate-800 text-slate-500"
            }`}>
              {activeOrder.status === "ON_THE_WAY" || isDelivered ? (
                <span className="material-symbols-outlined text-base">check</span>
              ) : (
                "2"
              )}
            </div>
            <div className="flex-1 flex items-center justify-between text-xs">
              <span className={
                activeOrder.status === "ON_THE_WAY" || isDelivered
                  ? "line-through text-slate-500"
                  : activeOrder.status === "RIDER_ASSIGNED" || activeOrder.status === "READY_FOR_PICKUP"
                  ? "font-bold text-white"
                  : "text-slate-500"
              }>
                Pick Up Parcel &amp; Inspect Thermal Seal
              </span>
              {activeOrder.status === "READY_FOR_PICKUP" && (
                <button
                  onClick={handlePickup}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold"
                >
                  Confirm Pickup Now
                </button>
              )}
            </div>
          </div>

          {/* Step 3: Out for Delivery */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
              isDelivered
                ? "bg-emerald-500 text-slate-950"
                : activeOrder.status === "ON_THE_WAY"
                ? "bg-orange-500 text-white animate-pulse"
                : "bg-slate-800 text-slate-500"
            }`}>
              {isDelivered ? (
                <span className="material-symbols-outlined text-base">check</span>
              ) : (
                "3"
              )}
            </div>
            <div className="flex-1 flex items-center justify-between text-xs">
              <span className={isDelivered ? "line-through text-slate-500" : activeOrder.status === "ON_THE_WAY" ? "font-bold text-white" : "text-slate-500"}>
                En Route to Customer Gate ({displayAddress})
              </span>
              {activeOrder.status === "ON_THE_WAY" && (
                <span className="text-[10px] font-mono font-bold text-orange-400">ACTIVE TRIP</span>
              )}
            </div>
          </div>

          {/* Step 4: OTP Verification & Handover */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
              isDelivered ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-500"
            }`}>
              {isDelivered ? (
                <span className="material-symbols-outlined text-base">check</span>
              ) : (
                "4"
              )}
            </div>
            <div className="flex-1 flex items-center justify-between text-xs">
              <span className={isDelivered ? "font-bold text-emerald-400" : "text-slate-500"}>
                Verify 4-Digit Customer OTP &amp; Complete Handover
              </span>
              {isDelivered && (
                <span className="text-[10px] font-mono text-emerald-400 font-bold">DELIVERED</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer OTP Handshake & Proof of Delivery Form */}
      {!isDelivered ? (
        <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-base">verified_user</span>
              <span>Customer Handover Handshake</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Payment: {activeOrder.paymentStatus === "PAID" ? "Already Paid via " + activeOrder.paymentMethod.toUpperCase() : `Collect ৳ ${activeOrder.total} COD`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                4-Digit Delivery Handover OTP
              </label>
              <input
                type="text"
                maxLength={4}
                value={customerOtp}
                onChange={(e) => setCustomerOtp(e.target.value.replace(/\D/g, ""))}
                placeholder={`Ask customer for OTP (Demo: ${activeOrder.deliveryOtp})`}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-emerald-400 placeholder:text-slate-700 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Verification PIN secures handover and releases payment.
              </span>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                Proof of Delivery Photo (Optional)
              </label>
              <button
                type="button"
                onClick={() => setPodCaptured(!podCaptured)}
                className={`w-full py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  podCaptured
                    ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-400"
                    : "bg-[#0B0F19] border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {podCaptured ? "task_alt" : "photo_camera"}
                </span>
                <span>{podCaptured ? "Door Photo Captured" : "Take Door / Parcel Photo"}</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Encrypted &amp; purged after 48 hours for customer privacy
              </span>
            </div>
          </div>

          {/* Stepper Progress Action */}
          {activeOrder.status === "READY_FOR_PICKUP" ? (
            <button
              type="button"
              onClick={handlePickup}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white rounded-xl font-black text-sm tracking-wide transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">package_2</span>
              <span>CONFIRM ORDER PICKED FROM DOKAN</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDeliver}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white rounded-xl font-black text-sm tracking-wide transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>VERIFY OTP &amp; COMPLETE DROP-OFF (৳ 85 EARNED)</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-[#131927] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>
          <h3 className="text-lg font-black text-white">Delivery Handover Completed!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Order #{activeOrder.id} successfully delivered. Payout has been credited to your rider balance.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/rider"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
            >
              Back to Fleet Radar
            </Link>
            <Link
              href="/rider/earnings"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold"
            >
              View Daily Earnings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
