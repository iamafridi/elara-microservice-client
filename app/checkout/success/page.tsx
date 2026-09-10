"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWorkflow } from "@/context/WorkflowContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ELR-DH-92841";
  const { orders } = useWorkflow();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="shell py-12 max-w-xl mx-auto space-y-6 text-center">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-in zoom-in-75 duration-300">
        <span className="material-symbols-outlined text-4xl">check_circle</span>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 block">
          Order Dispatched to Kitchen / Hub
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
          Dhaka Delivery Confirmed!
        </h1>
        <p className="text-xs text-slate-500">
          Order <span className="font-mono font-bold text-slate-800">#{order?.id || orderId}</span> has been broadcast to{" "}
          <span className="font-semibold text-slate-800">{order?.merchantName || "Kacchi Bhai Banani"}</span>.
        </p>
      </div>

      {/* Docket Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Verification Delivery OTP</span>
            <span className="text-2xl font-black font-mono text-slate-900 tracking-wider">
              {order?.deliveryOtp || "4819"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">ETA Arrival</span>
            <span className="text-base font-bold text-emerald-600 font-mono">
              ~{order?.etaMinutes || 25} Minutes
            </span>
          </div>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Customer:</span>
            <span className="font-bold text-slate-800">{order?.customerName || "Rahim Ahmed"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery Address:</span>
            <span className="font-bold text-slate-800 text-right max-w-xs">{order?.customerAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Paid (bKash/MFS):</span>
            <span className="font-mono font-bold text-slate-900">৳ {order?.total?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">NBR Tax Invoice:</span>
            <span className="font-mono text-primary font-bold">Mushak-6.3 Verified</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/60 text-[11px] text-orange-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-primary">info</span>
          <span>Share the 4-digit OTP with your rider only after inspecting your delivery package.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href={`/customer/track?orderId=${order?.id || orderId}`}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-md shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">navigation</span>
          <span>Live GPS Track Order &rarr;</span>
        </Link>
        <Link
          href="/customer/orders"
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs font-mono uppercase tracking-wider transition"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

/* elara-stage-168 */
