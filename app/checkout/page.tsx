"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWorkflow } from "@/context/WorkflowContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, vat, deliveryFee, total, clearCart } = useCart();
  const { placeOrder } = useWorkflow();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Address State
  const [address, setAddress] = useState("House 42, Road 11, Block D, Banani, Dhaka-1213");
  const [floor, setFloor] = useState("Level 4, Apt 4B");
  const [landmark, setLandmark] = useState("Opposite Banani Super Market");
  const [receiverPhone, setReceiverPhone] = useState(user?.phone || "01712-849201");
  const [receiverName, setReceiverName] = useState(user?.fullName || user?.name || "Rahim Ahmed");

  // Step 2: Delivery Slot State
  const [slot, setSlot] = useState<"instant" | "morning" | "evening">("instant");
  const [instructions, setInstructions] = useState("Please do not ring the calling bell, leave parcel at security desk if unavailable.");

  // Step 3: Payment State
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "wallet" | "cod">("bkash");
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [voucherSuccess, setVoucherSuccess] = useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const applyVoucher = () => {
    setVoucherError(null);
    setVoucherSuccess(null);
    const code = voucherCode.trim().toUpperCase();
    if (code === "ELARA100") {
      setDiscount(100);
      setVoucherSuccess("Promo ELARA100 applied! ৳ 100 deducted from subtotal.");
    } else if (code === "EIDMUBARAK") {
      setDiscount(150);
      setVoucherSuccess("Festival promo EIDMUBARAK applied! ৳ 150 deducted.");
    } else {
      setVoucherError("Invalid or expired coupon code. Try ELARA100");
    }
  };

  const finalTotal = Math.max(0, total - discount);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setIsPlacingOrder(true);

    setTimeout(() => {
      const placedOrder = placeOrder({
        items: items.map((i) => ({
          name: i.name,
          qty: i.qty,
          price: i.price,
          variant: i.variant,
        })),
        total: finalTotal,
        subtotal,
        deliveryFee,
        vat,
        address: `${floor}, ${address} (${landmark})`,
        paymentMethod: paymentMethod === "wallet" ? "bkash" : paymentMethod,
        notes: instructions,
      });

      clearCart();
      setIsPlacingOrder(false);
      router.push(`/checkout/success?orderId=${placedOrder.id}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="shell py-16 text-center max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-sans">Your Basket is Empty</h1>
        <p className="text-xs text-slate-500">
          Add food from top Dhaka restaurants or fresh bazaar items before checking out.
        </p>
        <Link
          href="/marketplace"
          className="inline-block px-6 py-3 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition"
        >
          Browse Marketplace &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-8 max-w-5xl space-y-8">
      {/* Header & Stepper */}
      <div className="space-y-4 pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
              Order Checkout &amp; Dispatch
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Hyper-local Dhaka fulfillment with live GPS tracking and NBR tax docket
            </p>
          </div>
          <Link href="/cart" className="text-xs font-mono font-bold text-primary hover:underline">
            &larr; Back to Cart
          </Link>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
          {[
            { num: 1, label: "Delivery Address" },
            { num: 2, label: "Time Slot" },
            { num: 3, label: "Payment Rails" },
            { num: 4, label: "Order Review" },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => s.num < step && setStep(s.num as any)}
              className={`p-3 rounded-xl border text-left transition ${
                step === s.num
                  ? "border-primary bg-orange-50 text-primary font-bold"
                  : step > s.num
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider">Step {s.num}</div>
              <div className="text-xs truncate">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step Form Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span>Recipient &amp; Dhaka Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Recipient Full Name</label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Bangladeshi Phone (01X-XXXXXXX)</label>
                  <input
                    type="tel"
                    required
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 block">Street / Road / Block Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 42, Road 11, Block D, Banani"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Floor / Flat / Apartment No.</label>
                  <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder="e.g. 4th Floor, Apt 4B"
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Nearby Landmark</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Behind Pink City / Opposite Mosque"
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-sm"
                >
                  Continue to Delivery Slot &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: TIME SLOT & INSTRUCTIONS */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                <span>Fulfillment Speed &amp; Delivery Window</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "instant",
                    title: "Instant Express",
                    time: "~25-35 Minutes",
                    desc: "Immediate food & grocery dispatch",
                    tag: "Fastest",
                  },
                  {
                    id: "morning",
                    title: "Morning Bazaar Slot",
                    time: "Tomorrow 8 - 10 AM",
                    desc: "Fresh morning catch fish & greens",
                    tag: "Fresh Cut",
                  },
                  {
                    id: "evening",
                    title: "Evening Dinner Slot",
                    time: "Today 7 - 9 PM",
                    desc: "Hot meal delivery for dinner",
                    tag: "Scheduled",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSlot(s.id as any)}
                    className={`p-4 rounded-xl border text-left transition relative ${
                      slot === s.id
                        ? "border-primary bg-orange-50/50 shadow-xs ring-1 ring-primary"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {s.tag}
                    </span>
                    <div className="font-bold text-slate-900 text-sm mt-2">{s.title}</div>
                    <div className="text-xs font-mono font-bold text-emerald-600 mt-0.5">{s.time}</div>
                    <p className="text-[11px] text-slate-500 mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 block">Rider Delivery Notes / Instructions</label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Leave parcel with building security guard, call upon arrival..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-sm"
                >
                  Continue to Payment Rails &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                <span>Select Payment Method (Bangladesh Rails)</span>
              </h2>

              <div className="space-y-3">
                {[
                  {
                    id: "bkash",
                    name: "bKash 1-Tap Payment",
                    desc: "Instant authorization via bKash payment gateway. Zero transaction charge.",
                    badge: "Most Popular",
                    iconColor: "bg-pink-50 text-pink-700 border-pink-200",
                  },
                  {
                    id: "nagad",
                    name: "Nagad Direct Gateway",
                    desc: "Pay securely via Bangladesh Post Office Nagad wallet.",
                    badge: "Cashback Eligible",
                    iconColor: "bg-orange-50 text-orange-700 border-orange-200",
                  },
                  {
                    id: "wallet",
                    name: "Elara Pay Digital Wallet",
                    desc: "Deduct instantly from your Elara preloaded BDT balance (Balance: ৳ 4,850).",
                    badge: "Instant 1-Tap",
                    iconColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                  },
                  {
                    id: "cod",
                    name: "Cash on Delivery (COD)",
                    desc: "Pay physical cash in hand to rider upon receiving parcel and verifying OTP.",
                    badge: "Max ৳ 8,000",
                    iconColor: "bg-slate-100 text-slate-700 border-slate-200",
                  },
                ].map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      paymentMethod === p.id
                        ? "border-primary bg-orange-50/40 ring-1 ring-primary"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === p.id}
                      onChange={() => setPaymentMethod(p.id as any)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{p.name}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${p.iconColor}`}>
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Promo Coupon Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Apply Voucher or Promo Code</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="e.g. ELARA100 or EIDMUBARAK"
                    className="flex-1 h-9 px-3 rounded-lg bg-white border border-slate-200 font-mono text-xs uppercase placeholder-slate-400 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={applyVoucher}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs transition"
                  >
                    Apply
                  </button>
                </div>
                {voucherSuccess && (
                  <p className="text-[11px] text-emerald-600 font-mono font-semibold">✓ {voucherSuccess}</p>
                )}
                {voucherError && (
                  <p className="text-[11px] text-rose-600 font-mono font-semibold">✕ {voucherError}</p>
                )}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-sm"
                >
                  Review Order Details &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER REVIEW */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">fact_check</span>
                <span>Confirm Order Details &amp; Place Request</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Delivery To
                  </span>
                  <div className="font-bold text-slate-800 text-sm">{receiverName} • {receiverPhone}</div>
                  <div className="text-slate-600">{floor}, {address}</div>
                  <div className="text-slate-500 text-[11px] font-mono">Landmark: {landmark}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Fulfillment Window &amp; Instructions
                  </span>
                  <div className="font-bold text-slate-800">
                    {slot === "instant" ? "Instant Express (~25-35 Minutes)" : slot === "morning" ? "Morning Bazaar Slot (8 - 10 AM)" : "Evening Dinner Slot (7 - 9 PM)"}
                  </div>
                  <div className="text-slate-600 text-[11px]">Instructions: {instructions}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Payment Method
                  </span>
                  <div className="font-bold text-slate-800 uppercase font-mono">
                    {paymentMethod === "bkash" ? "bKash Instant Gateway" : paymentMethod === "nagad" ? "Nagad Checkout" : paymentMethod === "wallet" ? "Elara Pay BDT Wallet" : "Cash on Delivery"}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    NBR Mushak-6.3 tax invoice will be generated upon confirmation.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isPlacingOrder}
                  onClick={handlePlaceOrder}
                  className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-md shadow-emerald-600/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>{isPlacingOrder ? "Connecting to Dhaka Mesh..." : `Confirm & Pay ৳ ${finalTotal.toLocaleString()} BDT`}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
              Basket Items ({items.length})
            </h3>

            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.qty}x {item.name}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{item.vendor}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 shrink-0">
                    ৳ {(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>NBR 5% VAT:</span>
                <span>৳ {vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge:</span>
                <span>৳ {deliveryFee.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Voucher Discount:</span>
                  <span>- ৳ {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900 font-sans">
                <span>Total Payable:</span>
                <span className="text-primary font-mono">৳ {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-[11px] text-emerald-800 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                <span>100% Bangladesh Consumer Protection</span>
              </div>
              <p className="text-[10px] text-emerald-700 leading-tight">
                DNCRP consumer rights compliance &amp; full refund protection on damaged/delayed orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
