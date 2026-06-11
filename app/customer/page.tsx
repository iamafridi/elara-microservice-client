"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useWorkflow } from "@/context/WorkflowContext";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const { activeCustomerOrder, liveOrders } = useWorkflow();

  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-primary to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-bold backdrop-blur-xs">
            <span>★ Elara VIP Member</span>
            <span className="opacity-60">•</span>
            <span>Banani, Dhaka</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
            Welcome back, {user?.fullName || user?.name || "Rahim Ahmed"}!
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
            Manage your daily Dhaka groceries, courier parcels, household sheba bookings, and Elara Pay balance from one unified dashboard.
          </p>

          <div className="pt-3 flex items-center gap-3 flex-wrap">
            <Link
              href="/marketplace"
              className="px-4 py-2 rounded-xl bg-white text-primary font-bold text-xs hover:bg-slate-100 transition shadow-sm"
            >
              Order Food &amp; Groceries &rarr;
            </Link>
            <Link
              href="/customer/wallet"
              className="px-4 py-2 rounded-xl bg-black/20 hover:bg-black/30 text-white font-mono font-semibold text-xs transition"
            >
              Top-up ৳ BDT Wallet
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold">Elara Pay</span>
            <span className="material-symbols-outlined text-lg text-primary">account_balance_wallet</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">৳ 4,850</div>
          <span className="text-[10px] text-emerald-600 font-mono font-semibold">● Instant bKash Reloaded</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold">Active Deliveries</span>
            <span className="material-symbols-outlined text-lg text-amber-500">local_shipping</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {activeCustomerOrder ? "1 Active" : "0"}
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            {activeCustomerOrder ? "On the way to Banani" : "No orders in transit"}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold">Total Orders</span>
            <span className="material-symbols-outlined text-lg text-blue-500">receipt_long</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">38</div>
          <span className="text-[10px] text-slate-500 font-mono">100% On-time delivery</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold">Elara Stars</span>
            <span className="material-symbols-outlined text-lg text-amber-500">stars</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">1,420</div>
          <span className="text-[10px] text-purple-600 font-mono font-semibold">Gold Tier (৳ 142 off)</span>
        </div>
      </div>

      {/* Active Order Highlight Card (if active) */}
      {activeCustomerOrder && (
        <div className="bg-white rounded-2xl border-2 border-primary/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-bold text-sm text-slate-900">Live Delivery in Progress</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                Order #{activeCustomerOrder.id}
              </span>
            </div>
            <Link
              href="/customer/track"
              className="text-xs font-mono font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Live GPS Telemetry</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">Merchant</span>
              <span className="font-bold text-slate-800">{activeCustomerOrder.merchantName}</span>
              <span className="text-[10px] text-slate-500 block">{activeCustomerOrder.merchantLocation}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Estimated Arrival</span>
              <span className="font-bold text-emerald-600">~{activeCustomerOrder.etaMinutes} Minutes</span>
              <span className="text-[10px] text-slate-500 block">Rider: {activeCustomerOrder.riderName || "Tanvir Hossain"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Delivery OTP Verification</span>
              <span className="text-sm font-black text-slate-900 tracking-wider">
                {activeCustomerOrder.deliveryOtp || "4819"}
              </span>
              <span className="text-[10px] text-slate-400 block">Share only after inspecting</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Orders & Re-Order Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Orders</h2>
            <p className="text-xs text-slate-400">Past food, grocery, and courier deliveries</p>
          </div>
          <Link href="/customer/orders" className="text-xs font-mono font-bold text-primary hover:underline">
            View All ({liveOrders.length}) &rarr;
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {liveOrders.slice(0, 3).map((ord) => (
            <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{ord.merchantName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">
                    #{ord.id}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ord.createdAt}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {ord.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-900">৳ {ord.total.toLocaleString()} BDT</div>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">{ord.status}</span>
                </div>
                <Link
                  href="/customer/orders"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition"
                >
                  Invoice &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Bangladesh Services Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/customer/wallet"
          className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-primary/40 transition shadow-xs flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition">
              bKash &amp; Nagad Pay
            </span>
            <span className="text-[11px] text-slate-400 font-mono">0% fee instant top-up</span>
          </div>
        </Link>

        <Link
          href="/customer/addresses"
          className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-primary/40 transition shadow-xs flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">home_pin</span>
          </div>
          <div>
            <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition">
              Saved Locations
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Banani, Gulshan, Dhanmondi</span>
          </div>
        </Link>

        <Link
          href="/customer/refunds"
          className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-primary/40 transition shadow-xs flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition">
              Buyer Protection
            </span>
            <span className="text-[11px] text-slate-400 font-mono">NBR &amp; DNCRP Compliant</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
