"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";

export default function CartPage() {
  const { items, updateQty, clearCart, subtotal, vat, deliveryFee, total } = useCart();
  const { placeOrder, switchRole } = useWorkflow();
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "cod" | "card">("bkash");
  const [address, setAddress] = useState("House 42, Road 11, Block D, Banani, Dhaka-1213");
  const [phone, setPhone] = useState("01712-849201");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<LiveOrder | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const totalItemCount = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="shell py-12">
      {/* Clear Basket Confirmation Dialog Modal (AUD-UX-01) */}
      {showClearConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-cart-title"
          aria-describedby="clear-cart-desc"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-ink space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-rose-600" aria-hidden="true">
                  delete_sweep
                </span>
              </div>
              <h3 id="clear-cart-title" className="font-bold text-lg text-ink">
                Empty Your Entire Basket?
              </h3>
            </div>
            <p id="clear-cart-desc" className="text-sm text-slate-600 leading-relaxed">
              This will remove all {totalItemCount} items from your shopping basket. This action cannot be reversed.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-ink hover:bg-slate-100 transition min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-mono font-bold hover:bg-rose-700 transition shadow-sm min-h-[44px]"
              >
                Yes, Empty Basket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb / Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Multi-Vendor Basket</span>
          </div>
          <h1 className="h1">Checkout &amp; Basket</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true"></span>
            Thermal Delivery Protected
          </span>
        </div>
      </div>

      {!orderPlaced ? (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Basket Items */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-ink/10 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <h2 className="font-sans text-lg font-black text-ink">
                  Items in Basket ({totalItemCount})
                </h2>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="text-xs font-mono font-bold text-rose-600 hover:text-rose-700 hover:underline p-1 min-h-[32px] flex items-center"
                    aria-label="Empty basket"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-surface-low flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl" aria-hidden="true">shopping_bag</span>
                  </div>
                  <h3 className="text-base font-bold text-ink">Your basket is currently empty</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Explore Sultan&apos;s Dine Kacchi or fresh daily bazaar fish to add items to your multi-vendor order.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <Link href="/food-delivery" className="btn-primary text-xs">
                      Explore Restaurants
                    </Link>
                    <Link href="/marketplace" className="btn-ghost text-xs">
                      Explore Daily Bazaar
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-ink/10">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                          {item.vendor}
                        </span>
                        <h3 className="font-bold text-ink text-base mt-0.5">{item.name}</h3>
                        <p className="text-xs text-slate-500">{item.variant}</p>
                        <p className="font-mono text-sm font-black text-ink mt-1">৳ {item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-xl border border-ink/20 bg-ivory">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            className="w-9 h-9 flex items-center justify-center text-base font-bold text-ink hover:bg-slate-200 rounded-l-xl transition"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>
                          <span className="px-3 font-mono text-sm font-bold min-w-[28px] text-center" aria-label={`Quantity: ${item.qty}`}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            className="w-9 h-9 flex items-center justify-center text-base font-bold text-ink hover:bg-slate-200 rounded-r-xl transition"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-sm font-black text-ink w-20 text-right">
                          ৳ {item.price * item.qty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Location & Recipient (AUD-A11Y-03) */}
            <div className="bg-white rounded-2xl border border-ink/10 p-6 shadow-sm space-y-4">
              <h2 className="font-sans text-lg font-black text-ink flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">location_on</span>
                Delivery Destination (Dhaka Hub)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-mono text-slate-700 font-bold uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono"
                    placeholder="01712-345678"
                  />
                </div>
                <div>
                  <label htmlFor="delivery-slot" className="block text-xs font-mono text-slate-700 font-bold uppercase mb-1">
                    Delivery Time Slot
                  </label>
                  <select
                    id="delivery-slot"
                    name="deliverySlot"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white"
                  >
                    <option>Express Delivery (24-30 mins)</option>
                    <option>Today Evening (6:00 PM - 8:00 PM)</option>
                    <option>Tomorrow Morning Bazaar Cut (7:00 AM)</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="street-address" className="block text-xs font-mono text-slate-700 font-bold uppercase mb-1">
                  Detailed Street Address
                </label>
                <textarea
                  id="street-address"
                  name="address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="House, Road, Area, Dhaka"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-ink p-6 shadow-md editorial-shadow-ink space-y-6">
              <h2 className="font-sans text-xl font-black text-ink">Bill Breakdown</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-ink">৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>NBR VAT (5% Mushak-6.3)</span>
                  <span className="font-mono font-semibold text-ink">৳ {vat}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Zone Delivery (Elara Fleet)</span>
                  <span className="font-mono font-semibold text-ink">৳ {deliveryFee}</span>
                </div>
                <div className="border-t border-ink/10 pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-ink text-base">Grand Total</span>
                  <span className="font-mono text-2xl font-black text-primary">৳ {total}</span>
                </div>
              </div>

              {/* MFS Payment Options (AUD-A11Y-06) */}
              <div className="border-t border-ink/10 pt-5 space-y-3">
                <span id="payment-gateway-label" className="block text-xs font-mono uppercase tracking-wider font-bold text-ink">
                  Select Payment Gateway
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="payment-gateway-label"
                  className="grid grid-cols-2 gap-2"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === "bkash"}
                    onClick={() => setPaymentMethod("bkash")}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition min-h-[48px] ${
                      paymentMethod === "bkash"
                        ? "border-bkash bg-bkash/5 ring-2 ring-bkash text-bkash font-bold"
                        : "border-slate-200 hover:border-slate-300 text-ink"
                    }`}
                  >
                    <span className="font-bold text-sm">bKash</span>
                    <span className="text-[10px] font-mono">Instant</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === "nagad"}
                    onClick={() => setPaymentMethod("nagad")}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition min-h-[48px] ${
                      paymentMethod === "nagad"
                        ? "border-nagad bg-nagad/5 ring-2 ring-nagad text-nagad font-bold"
                        : "border-slate-200 hover:border-slate-300 text-ink"
                    }`}
                  >
                    <span className="font-bold text-sm">Nagad</span>
                    <span className="text-[10px] font-mono">Instant</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === "cod"}
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition min-h-[48px] ${
                      paymentMethod === "cod"
                        ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600 text-emerald-800 font-bold"
                        : "border-slate-200 hover:border-slate-300 text-ink"
                    }`}
                  >
                    <span className="font-bold text-sm">Cash on Delivery</span>
                    <span className="text-[10px] font-mono">COD</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition min-h-[48px] ${
                      paymentMethod === "card"
                        ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600 text-indigo-800 font-bold"
                        : "border-slate-200 hover:border-slate-300 text-ink"
                    }`}
                  >
                    <span className="font-bold text-sm">Visa / Master</span>
                    <span className="text-[10px] font-mono">Cards</span>
                  </button>
                </div>
              </div>

              {/* Order Button */}
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => {
                  const newOrder = placeOrder({
                    items: items.map((i) => ({
                      name: i.name,
                      qty: i.qty,
                      price: i.price,
                      variant: i.variant,
                    })),
                    total,
                    subtotal,
                    deliveryFee,
                    vat,
                    address,
                    paymentMethod,
                  });
                  setCreatedOrder(newOrder);
                  clearCart();
                  setOrderPlaced(true);
                }}
                className="w-full py-4 bg-primary hover:bg-emerald-700 text-white font-mono font-bold text-sm uppercase tracking-wider rounded-xl transition duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                <span>Confirm Order • ৳ {total} BDT</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-500 pt-2">
                <span>🛡️ 100% Encrypted</span>
                <span>•</span>
                <span>⚡ Real-Time Fleet Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Order Placed Success Confirmation */
        <div className="mt-8 max-w-2xl mx-auto bg-white rounded-3xl border-2 border-ink p-8 sm:p-12 text-center editorial-shadow-ink space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">check_circle</span>
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              ORDER #{createdOrder?.id || "ELR-DH-92841"}
            </span>
            <h2 className="text-3xl font-black font-sans text-ink mt-1">
              Order Confirmed &amp; Dispatched!
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Your kitchen has acknowledged your order. An Elara Fleet rider is en route for pickup.
            </p>
          </div>

          <div className="bg-ivory rounded-2xl p-5 text-left font-mono text-xs space-y-2.5 border border-ink/10">
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <span className="font-bold text-ink">{address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment:</span>
              <span className="font-bold text-ink uppercase">{paymentMethod} (৳ {createdOrder?.total || total})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Secure Handover OTP:</span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-sm tracking-wider">
                {createdOrder?.deliveryOtp || "4819"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Delivery:</span>
              <span className="font-bold text-primary">24 minutes (Live GPS Telemetry Active)</span>
            </div>
          </div>

          {/* End-to-End Simulation Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/customer/track"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-lg min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">near_me</span>
              <span>Track Live Telemetry</span>
            </Link>

            <Link
              href="/merchant"
              onClick={() => switchRole("merchant")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <span>Switch to Merchant KDS</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-ink/10 flex justify-between items-center text-xs font-mono">
            <button
              type="button"
              onClick={() => setOrderPlaced(false)}
              className="text-primary font-bold hover:underline"
            >
              Order Another Item
            </button>
            <Link href="/" className="text-slate-500 hover:text-ink">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
