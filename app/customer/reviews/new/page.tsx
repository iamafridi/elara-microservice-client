"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useWorkflow } from "@/context/WorkflowContext";

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ELR-DH-92840";
  const { orders } = useWorkflow();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [foodRating, setFoodRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [packagingRating, setPackagingRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [riderTipBDT, setRiderTipBDT] = useState<number>(30);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/customer/orders");
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/customer/orders" className="hover:text-primary">My Orders</Link>
            <span>/</span>
            <span className="text-primary font-bold">Write Review</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
            Rate Order #{order?.id || orderId}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Share feedback on {order?.merchantName || "Kacchi Bhai Banani"} and Rider {order?.riderName || "Tanvir Hossain"}
          </p>
        </div>

        <Link
          href="/customer/orders"
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:bg-slate-100 transition"
        >
          Cancel
        </Link>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>Thank you! Your feedback and ৳ {riderTipBDT} tip were sent to the rider and merchant.</span>
        </div>
      )}

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Merchant & Food Rating */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            1. Food Taste &amp; Authenticity ({order?.merchantName})
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFoodRating(star)}
                className={`text-2xl transition ${
                  star <= foodRating ? "text-amber-400" : "text-slate-200 hover:text-amber-200"
                }`}
              >
                ★
              </button>
            ))}
            <span className="text-xs font-mono text-slate-500 ml-2 font-bold">{foodRating} / 5 Stars</span>
          </div>
        </div>

        {/* Delivery Speed Rating */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            2. Delivery Speed &amp; Professionalism ({order?.riderName || "Rider"})
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setDeliveryRating(star)}
                className={`text-2xl transition ${
                  star <= deliveryRating ? "text-amber-400" : "text-slate-200 hover:text-amber-200"
                }`}
              >
                ★
              </button>
            ))}
            <span className="text-xs font-mono text-slate-500 ml-2 font-bold">{deliveryRating} / 5 Stars</span>
          </div>
        </div>

        {/* Packaging Rating */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            3. Thermal Bag Heat Retention &amp; Spill Prevention
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setPackagingRating(star)}
                className={`text-2xl transition ${
                  star <= packagingRating ? "text-amber-400" : "text-slate-200 hover:text-amber-200"
                }`}
              >
                ★
              </button>
            ))}
            <span className="text-xs font-mono text-slate-500 ml-2 font-bold">{packagingRating} / 5 Stars</span>
          </div>
        </div>

        {/* Review Comments */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-800 block">Detailed Comments (Optional)</label>
          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="How was the flavor, portion size, temperature, and packaging?"
            className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Rider Tip in BDT */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 block">
              Say thanks with a Rider Tip (100% goes to {order?.riderName || "Tanvir"})
            </label>
            <span className="text-xs font-mono font-bold text-primary">৳ {riderTipBDT} BDT</span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 20, 30, 50, 100].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setRiderTipBDT(amount)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                  riderTipBDT === amount
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {amount === 0 ? "No Tip" : `৳ ${amount}`}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Submit Verified Review &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}

/* elara-stage-203 */
