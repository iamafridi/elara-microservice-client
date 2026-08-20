"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";

export default function MerchantKDSPage() {
  const { orders, merchantAcceptOrder, merchantMarkReady } = useWorkflow();
  const [audioAlertsOn, setAudioAlertsOn] = useState(true);
  const [chimeActive, setChimeActive] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const triggerChime = () => {
    setChimeActive(true);
    setTimeout(() => setChimeActive(false), 2000);
  };

  const handleAccept = (orderId: string) => {
    merchantAcceptOrder(orderId);
    setSuccessToast(`Order ${orderId} accepted and sent to kitchen prep station!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleMarkReady = (orderId: string) => {
    merchantMarkReady(orderId);
    setSuccessToast(`Order ${orderId} marked READY! Rider notified for pickup.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Group orders into 3 KDS Kanban stages
  const incomingOrders = orders.filter((o) => o.status === "PLACED");
  const inKitchenOrders = orders.filter((o) => o.status === "PREPARING");
  const readyOrders = orders.filter((o) => o.status === "READY_FOR_PICKUP" || o.status === "RIDER_ASSIGNED");

  return (
    <div className="space-y-6">
      {/* KDS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md shadow-orange-600/20 shrink-0">
            <span className="material-symbols-outlined text-2xl">point_of_sale</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
              Kitchen Display &amp; Live Orders (KDS)
            </h1>
            <p className="text-xs text-slate-500">
              Kacchi Bhai — Banani • Printer Status: <span className="text-emerald-600 font-bold">Connected (ESC/POS 80mm)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setAudioAlertsOn(!audioAlertsOn);
              if (!audioAlertsOn) triggerChime();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 border min-h-[38px] ${
              audioAlertsOn
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${audioAlertsOn ? "bg-emerald-600 animate-ping" : "bg-slate-400"}`}></span>
            <span>{audioAlertsOn ? "Live Audio Chime ON" : "Audio Muted"}</span>
          </button>

          <button
            type="button"
            onClick={triggerChime}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition min-h-[38px] ${
              chimeActive
                ? "bg-rose-500 text-white animate-bounce"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🔔 Test Chime
          </button>

          <Link
            href="/merchant/settings"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 transition min-h-[38px] flex items-center"
          >
            Store Settings
          </Link>
        </div>
      </div>

      {successToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span>✓ {successToast}</span>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">✕</button>
        </div>
      )}

      {/* KDS 3-Column Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Column 1: Incoming Orders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50 border border-orange-200">
            <span className="font-bold text-xs font-mono uppercase tracking-wider text-orange-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse"></span>
              Incoming Orders ({incomingOrders.length})
            </span>
            <span className="text-[10px] font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
              Rider Seeking
            </span>
          </div>

          <div className="space-y-3">
            {incomingOrders.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-200 text-center text-xs text-slate-400 space-y-2">
                <span className="material-symbols-outlined text-3xl text-slate-300">hourglass_empty</span>
                <p>No new incoming orders right now.</p>
                <p className="text-[11px] text-slate-400">New customer orders chime automatically.</p>
              </div>
            ) : (
              incomingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border-2 border-orange-500 rounded-2xl p-4 shadow-md space-y-3 animate-in zoom-in-95"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="font-black font-mono text-sm text-slate-900">{order.id}</span>
                      <span className="text-xs text-slate-500 block">{order.customerName}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm text-slate-900">৳ {order.total}</div>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">bKash Paid</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1">
                        <span className="font-semibold text-slate-800">
                          {item.qty}x {item.name}
                        </span>
                        <span className="font-mono text-slate-500">৳ {item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-mono">
                      💬 Note: {order.notes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAccept(order.id)}
                      className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition"
                    >
                      Accept &amp; Cook &rarr;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Preparation (Kitchen) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="font-bold text-xs font-mono uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-spin"></span>
              In Kitchen Prep ({inKitchenOrders.length})
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Cooking Active
            </span>
          </div>

          <div className="space-y-3">
            {inKitchenOrders.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-200 text-center text-xs text-slate-400 space-y-2">
                <span className="material-symbols-outlined text-3xl text-slate-300">skillet</span>
                <p>Kitchen prep table is clear.</p>
              </div>
            ) : (
              inKitchenOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="font-black font-mono text-sm text-slate-900">{order.id}</span>
                      <span className="text-xs text-slate-500 block">{order.customerName}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                        11m left
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1">
                        <span className="font-semibold text-slate-800">
                          {item.qty}x {item.name}
                        </span>
                        <span className="font-mono text-slate-500">৳ {item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMarkReady(order.id)}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                    >
                      ✓ Mark Food Ready for Pickup
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Ready for Pickup (Rider Handover) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-xs font-mono uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Ready for Rider ({readyOrders.length})
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Bagged &amp; Sealed
            </span>
          </div>

          <div className="space-y-3">
            {readyOrders.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-200 text-center text-xs text-slate-400 space-y-2">
                <span className="material-symbols-outlined text-3xl text-slate-300">takeout_dining</span>
                <p>No orders currently waiting for rider pickup.</p>
              </div>
            ) : (
              readyOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="font-black font-mono text-sm text-slate-900">{order.id}</span>
                      <span className="text-xs text-slate-500 block">{order.customerName}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      Bagged
                    </span>
                  </div>

                  {/* Assigned Rider Card */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-lg">two_wheeler</span>
                      <div>
                        <div className="font-bold text-slate-900">{order.riderName || "Tanvir Hossain"}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Yamaha FZ-X • ETA 3m</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Calling Rider ${order.riderName || "Tanvir"} at +880 1911-778899...`)}
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-mono text-[10px] font-bold"
                      title="Call Rider"
                    >
                      📞 Call
                    </button>
                  </div>

                  <div className="pt-1">
                    <div className="text-[11px] text-slate-500 text-center">
                      Awaiting rider OTP verification at door
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-139 */
