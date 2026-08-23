"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";

export default function RiderPage() {
  const {
    orders,
    riderAcceptOrder,
    riderPickupOrder,
    riderDeliverOrder,
    switchRole,
    currentUser,
  } = useWorkflow();

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "radar" | "earnings">("active");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Find the trip assigned to Rider Tanvir or active in transit
  const assignedTrip = orders.find(
    (o) =>
      (o.status === "RIDER_ASSIGNED" || o.status === "PICKED_UP" || o.status === "ON_THE_WAY") &&
      o.riderName === "Tanvir Hossain"
  ) || orders.find((o) => o.status === "ON_THE_WAY") || null;

  // Available orders for pickup
  const availableOrders = orders.filter(
    (o) => o.status === "READY_FOR_PICKUP" || (o.status === "PREPARING" && !o.riderName)
  );

  const handleVerifyOtp = (orderId: string) => {
    setOtpError(null);
    const res = riderDeliverOrder(orderId, otpInput.trim());
    if (!res.success) {
      setOtpError(res.message);
    } else {
      setSuccessToast(res.message);
      setOtpInput("");
      setTimeout(() => setSuccessToast(null), 4000);
    }
  };

  return (
    <div className="shell py-8 space-y-8">
      {/* Rider Top Profile Bar */}
      <div className="rounded-3xl bg-white border border-ink/10 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black flex items-center justify-center text-xl shadow-md shadow-emerald-700/20 shrink-0">
            TH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-sans text-ink">
                Tanvir Hossain — Fleet Console
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                5-Star Elite Rider
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Hero Splendor Plus 100cc (Dhaka Metro-Ha 48-1920) • Hub: Banani Radar
            </p>
          </div>
        </div>

        {/* Shift Toggle & Wallet Pill */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3.5 py-2 rounded-xl bg-surface-low border border-ink/10 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Today&apos;s Earnings</span>
            <span className="font-black text-emerald-700">৳ {currentUser.balanceBDT.toLocaleString()} BDT</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 min-h-[44px] ${
              isOnline
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-white animate-pulse" : "bg-slate-400"}`}></span>
            <span>{isOnline ? "Shift ONLINE" : "Shift OFFLINE"}</span>
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {successToast}</span>
          <button onClick={() => setSuccessToast(null)} className="text-white/80 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Role Navigation Assistance */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-medium">
          <span className="material-symbols-outlined text-emerald-700 text-lg">navigation</span>
          <span>
            <strong>Rider Dispatch Console:</strong> Accept ready orders from Banani/Gulshan merchants, navigate with live ETA, and verify customer OTP at doorstep!
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/customer/track"
            className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-mono font-bold transition"
          >
            View Customer Live Telemetry &rarr;
          </Link>
          <button
            type="button"
            onClick={() => switchRole("merchant")}
            className="px-3 py-1.5 rounded-xl border border-emerald-800/40 text-emerald-900 font-mono font-bold hover:bg-emerald-100 transition"
          >
            Switch to Merchant Dokan &rarr;
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-ink/10 gap-4 text-xs font-mono font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`pb-3 transition flex items-center gap-1.5 border-b-2 min-h-[40px] ${
            activeTab === "active"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-ink"
          }`}
        >
          <span className="material-symbols-outlined text-base">route</span>
          <span>Active Route {assignedTrip ? "(1 In Progress)" : "(None)"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("radar")}
          className={`pb-3 transition flex items-center gap-1.5 border-b-2 min-h-[40px] ${
            activeTab === "radar"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-ink"
          }`}
        >
          <span className="material-symbols-outlined text-base">radar</span>
          <span>Available Orders Radar ({availableOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("earnings")}
          className={`pb-3 transition flex items-center gap-1.5 border-b-2 min-h-[40px] ${
            activeTab === "earnings"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-ink"
          }`}
        >
          <span className="material-symbols-outlined text-base">account_balance_wallet</span>
          <span>Wallet &amp; COD Cash Bag</span>
        </button>
      </div>

      {/* TAB 1: ACTIVE TRIP & TURN-BY-TURN */}
      {activeTab === "active" && (
        <div className="space-y-6">
          {assignedTrip ? (
            <div className="bg-white rounded-3xl border border-ink/10 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                    ACTIVE TRIP #{assignedTrip.id}
                  </span>
                  <h2 className="text-xl font-black font-sans text-ink mt-0.5">
                    {assignedTrip.merchantName} &rarr; {assignedTrip.customerName}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold animate-pulse">
                    ETA: {assignedTrip.etaMinutes} mins
                  </span>
                </div>
              </div>

              {/* Waypoints Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-low border border-ink/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <span className="material-symbols-outlined text-sm text-secondary">storefront</span>
                    <span>1. PICKUP MERCHANT</span>
                  </div>
                  <div className="font-bold text-sm text-ink">{assignedTrip.merchantName}</div>
                  <div className="text-xs text-slate-500">{assignedTrip.merchantLocation}</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-low border border-ink/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                    <span className="material-symbols-outlined text-sm text-primary">pin_drop</span>
                    <span>2. DELIVERY DESTINATION</span>
                  </div>
                  <div className="font-bold text-sm text-ink">{assignedTrip.customerName}</div>
                  <div className="text-xs text-slate-500">{assignedTrip.customerAddress}</div>
                  <div className="text-xs text-slate-500 font-mono">Phone: {assignedTrip.customerPhone}</div>
                </div>
              </div>

              {/* Simulated GPS Dhaka Route Box */}
              <div className="rounded-2xl bg-slate-900 text-white p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>GPS Telemetry Active (Kemal Ataturk Ave &rarr; Rd 11 Banani)</span>
                  </div>
                  <span className="text-slate-400">1.8 km distance</span>
                </div>
                <div className="text-slate-300 space-y-1">
                  <div>Turn right onto Road 11 &bull; 450 meters</div>
                  <div className="text-emerald-400 font-bold">&bull; Destination House 42 on the left side</div>
                </div>
              </div>

              {/* Step Action Controls */}
              <div className="pt-2 border-t border-ink/10 space-y-4">
                {assignedTrip.status === "RIDER_ASSIGNED" && (
                  <button
                    type="button"
                    onClick={() => riderPickupOrder(assignedTrip.id)}
                    className="w-full py-4 rounded-2xl bg-primary hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-lg min-h-[48px]"
                  >
                    Confirm Order Picked Up From Merchant &rarr;
                  </button>
                )}

                {assignedTrip.status === "ON_THE_WAY" && (
                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-4">
                    <div>
                      <h3 className="font-bold text-sm text-emerald-900">
                        At Customer Doorstep — Verify Handover OTP
                      </h3>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Ask Rahim Ahmed for his 4-digit code (Demo Customer OTP is: <strong>{assignedTrip.deliveryOtp}</strong>)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Enter 4-digit OTP"
                        className="px-4 py-3 rounded-xl border border-emerald-300 text-sm font-mono font-black text-ink focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                      />
                      <button
                        type="button"
                        onClick={() => handleVerifyOtp(assignedTrip.id)}
                        className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-mono font-bold text-xs uppercase transition shadow-md min-h-[44px]"
                      >
                        Verify OTP &amp; Complete Trip (Earn ৳ 85)
                      </button>
                    </div>

                    {otpError && (
                      <div className="text-xs text-rose-600 font-mono font-bold">
                        ⚠️ {otpError}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-ink/10 p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">two_wheeler</span>
              </div>
              <h3 className="text-lg font-black font-sans text-ink">No Active Trip Right Now</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You are currently idle in Banani Hub radar. Check the Available Orders Radar tab to pick up a delivery request.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("radar")}
                className="btn-primary text-xs min-h-[44px]"
              >
                Open Available Orders Radar ({availableOrders.length})
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AVAILABLE RADAR */}
      {activeTab === "radar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black font-sans text-ink">
              Nearby Delivery Requests (Banani &amp; Gulshan Hub)
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Auto-refreshing every 10s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                      {order.id}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      + ৳ 85 Trip Fee
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-ink">{order.merchantName}</h3>
                    <p className="text-xs text-slate-500">{order.merchantLocation} &rarr; {order.customerAddress}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-low text-xs font-mono flex justify-between text-slate-600">
                    <span>Est. Distance: 2.1 km</span>
                    <span className="font-bold text-ink">{order.items.length} items to carry</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    riderAcceptOrder(order.id);
                    setActiveTab("active");
                  }}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase transition shadow-md min-h-[44px]"
                >
                  Accept Delivery Request &rarr;
                </button>
              </div>
            ))}

            {availableOrders.length === 0 && (
              <div className="col-span-2 bg-white rounded-3xl border border-ink/10 p-8 text-center text-xs text-slate-500">
                No unassigned orders in radar. Place a new order in Marketplace or Cart to see it pop up here!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: EARNINGS & COD BAG */}
      {activeTab === "earnings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-ink/10 shadow-sm space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">Today&apos;s Deliveries</span>
              <div className="text-2xl font-black font-sans text-ink">12 Completed</div>
              <span className="text-xs font-mono text-emerald-700">100% On-Time Score</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-800">Rider Digital Wallet</span>
              <div className="text-2xl font-black font-sans text-emerald-900">৳ {currentUser.balanceBDT.toLocaleString()}</div>
              <span className="text-xs font-mono text-emerald-700">Ready for instant bKash transfer</span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-800">COD Cash Bag</span>
              <div className="text-2xl font-black font-sans text-amber-900">৳ 3,250</div>
              <span className="text-xs font-mono text-amber-700">Deposit at Banani Hub</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-ink/10 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-ink">Instant Rider MFS Cashout</h3>
            <p className="text-xs text-slate-500">Transfer your trip earnings to your personal bKash or Nagad wallet immediately with zero fee.</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => alert(`৳ ${currentUser.balanceBDT.toLocaleString()} successfully withdrawn to Tanvir's bKash wallet (01911-778899)!`)}
                className="btn-primary text-xs min-h-[44px]"
              >
                Cash Out to bKash (01911-778899)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* elara-stage-143 */
