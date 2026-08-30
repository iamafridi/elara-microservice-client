"use client";

import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";
import { useAuth } from "@/context/AuthContext";
import { maskPhone } from "@/lib/privacy";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { liveOrders } = useWorkflow();
  const { user } = useAuth();
  const orderId = params?.id || "ELR-DH-42534";

  // Find order or fallback to first order
  const order: LiveOrder =
    liveOrders.find((o) => o.id === orderId) ||
    liveOrders[0] || {
      id: orderId,
      customerName: user?.name || "Rahim Ahmed",
      customerPhone: "01712-849201",
      customerAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213",
      merchantName: "Kacchi Bhai — Banani Hub",
      merchantLocation: "Kemal Ataturk Ave, Banani, Dhaka",
      items: [
        { name: "Kacchi Khadok Platter (Basmati)", qty: 1, price: 450 },
        { name: "Special Shahi Borhani (500ml)", qty: 2, price: 160 },
      ],
      subtotal: 610,
      deliveryFee: 60,
      vat: 31,
      total: 701,
      paymentMethod: "bkash",
      paymentStatus: "PAID",
      status: "ON_THE_WAY",
      deliveryOtp: "8492",
      etaMinutes: 14,
      createdAt: "12:15 PM • Today",
      updatedAt: "Just now",
      timeline: [
        { title: "Order Placed & bKash Paid", time: "12:15 PM", done: true },
        { title: "Cooking in KDS Kitchen", time: "12:20 PM", done: true },
        { title: "Rider Assigned (Tanvir Hossain)", time: "12:28 PM", done: true },
        { title: "Out for Delivery (GPS Telemetry)", time: "12:35 PM", done: true },
        { title: "Doorstep Handover (OTP Verification)", time: "Est. 12:49 PM", done: false },
      ],
    };

  const isDelivered = order.status === "DELIVERED";
  const isActive = order.status !== "DELIVERED" && order.status !== "CANCELLED";

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <Link href="/customer/orders" className="hover:text-primary transition">
              My Orders
            </Link>
            <span>&rarr;</span>
            <span className="text-slate-700 font-bold">#{order.id}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
            Order Breakdown &amp; Dispatch Status
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/customer/orders/${order.id}/invoice`}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Mushak-6.3</span>
          </Link>

          {isActive && (
            <Link
              href="/customer/track"
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">navigation</span>
              <span>Live GPS Radar</span>
            </Link>
          )}

          <Link
            href="/customer/support"
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">headset_mic</span>
            <span>Order Help</span>
          </Link>
        </div>
      </div>

      {/* Main Order Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Status Stepper & Items (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Status Banner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-wider">
                  Live Dispatch State
                </span>
                <h2 className="text-xl font-black text-slate-900 font-sans mt-0.5">
                  {order.status === "DELIVERED"
                    ? "Delivered Successfully"
                    : order.status === "ON_THE_WAY"
                    ? "Out for Delivery (14 mins ETA)"
                    : order.status === "PREPARING"
                    ? "Preparing in Kitchen"
                    : "Order Placed & Confirmed"}
                </h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  isDelivered
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200 animate-pulse"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4 pt-2">
              {order.timeline?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 relative">
                  {idx < order.timeline.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                        step.done ? "bg-primary" : "bg-slate-200"
                      }`}
                    ></div>
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.done
                        ? "bg-primary text-white shadow-xs"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {step.done ? "check" : "radio_button_unchecked"}
                    </span>
                  </div>
                  <div className="pt-1 flex-1 flex items-center justify-between">
                    <div>
                      <span className={`text-xs font-bold block ${step.done ? "text-slate-900" : "text-slate-400"}`}>
                        {step.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* OTP Handover Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Delivery Handover Security PIN
                </span>
                <span className="text-xs text-slate-300">Share this code with rider Tanvir upon arrival</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 font-mono font-black text-xl text-emerald-300 tracking-widest">
                {order.deliveryOtp}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Ordered Items ({order.items.length})</h3>

            <div className="divide-y divide-slate-100 font-mono text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 text-sm block">
                      {item.qty}x {item.name}
                    </span>
                    {item.variant && <span className="text-[11px] text-slate-400">{item.variant}</span>}
                  </div>
                  <span className="font-bold text-slate-900 text-sm">৳{item.price * item.qty} BDT</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financials & Vendor (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bill Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 font-mono text-xs">
            <h3 className="font-bold text-base text-slate-900 font-sans">Payment Summary</h3>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>৳{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Mushak-6.3 VAT (5%):</span>
                <span>৳{order.vat}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Platform Discount:</span>
                <span>-৳0</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-900 font-bold text-sm">
                <span>Total Paid:</span>
                <span className="text-primary font-black text-base">৳{order.total} BDT</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Payment Channel:</span>
                <span className="font-bold uppercase text-slate-700">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Payment Status:</span>
                <span className="font-bold text-emerald-700">{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          {/* Dokan & Delivery Location */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900 font-sans">Dispatch Routing</h3>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Merchant Dokan</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">{order.merchantName}</span>
                <p className="text-slate-500 text-[11px] mt-0.5">{order.merchantLocation}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Delivery Address</span>
                <span className="font-bold text-slate-800 block mt-0.5">{order.customerName}</span>
                <p className="text-slate-500 text-[11px] mt-0.5">{order.customerAddress}</p>
                <span className="text-slate-400 font-mono text-[11px]">{maskPhone(order.customerPhone)}</span>
              </div>
            </div>
          </div>

          {/* Assigned Rider */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                TH
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">Tanvir Hossain</span>
                <span className="text-[11px] text-slate-500 font-mono">Assigned Rider ({maskPhone("01812-984210")})</span>
              </div>
            </div>
            <a
              href="tel:01812984210"
              className="p-2 rounded-xl bg-white border border-slate-200 text-primary hover:bg-emerald-50 transition shadow-2xs"
              title="Call Rider (Masked VoIP Proxy)"
            >
              <span className="material-symbols-outlined text-base">call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-153 */
