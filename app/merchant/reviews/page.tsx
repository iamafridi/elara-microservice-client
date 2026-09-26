"use client";

import { useState } from "react";
import Link from "next/link";

interface ReviewItem {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  zone: string;
  rating: number;
  foodRating: number;
  riderRating: number;
  date: string;
  comment: string;
  orderedItems: string[];
  reply?: string;
  replyDate?: string;
  status: "AWAITING" | "REPLIED" | "FLAGGED";
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "REV-101",
    orderId: "EL-98241",
    customerName: "Farhana Ahmed",
    customerPhone: "+880 1712-***489",
    zone: "Banani DOHS",
    rating: 5,
    foodRating: 5,
    riderRating: 5,
    date: "Today, 1:45 PM",
    comment: "Kacchi was piping hot and the mutton piece was huge and tender. Borhani tasted authentic Old Dhaka style. Fast delivery!",
    orderedItems: ["Mutton Kacchi Feast (Double)", "Special Borhani (500ml)"],
    reply: "Dhonnobad Farhana apu! So glad you enjoyed the mutton quality. We slow-cook our dum kacchi every morning. See you again soon!",
    replyDate: "Today, 2:10 PM",
    status: "REPLIED"
  },
  {
    id: "REV-102",
    orderId: "EL-98220",
    customerName: "Rakib Hassan",
    customerPhone: "+880 1819-***712",
    zone: "Gulshan-2",
    rating: 4,
    foodRating: 4,
    riderRating: 5,
    date: "Yesterday, 8:30 PM",
    comment: "Taste is 5/5, but portion felt slightly smaller than when I dined in Kemal Ataturk branch. Aloo was delicious though.",
    orderedItems: ["Beef Tehari Basmati", "Shahi Firni"],
    status: "AWAITING"
  },
  {
    id: "REV-103",
    orderId: "EL-98198",
    customerName: "Nusrat Jahan",
    customerPhone: "+880 1914-***321",
    zone: "Baridhara J-Block",
    rating: 2,
    foodRating: 2,
    riderRating: 4,
    date: "14 Oct, 2:15 PM",
    comment: "Ordered the combo but the Jorda dessert was missing from the bag! Rider told me Dokan forgot to pack it.",
    orderedItems: ["Chicken Roast Polao Combo", "Shahi Jorda"],
    status: "AWAITING"
  },
  {
    id: "REV-104",
    orderId: "EL-98176",
    customerName: "Imran Khan",
    customerPhone: "+880 1611-***554",
    zone: "Niketan, Gulshan-1",
    rating: 5,
    foodRating: 5,
    riderRating: 4,
    date: "13 Oct, 9:20 PM",
    comment: "Hands down the best kacchi in Dhaka. Packaging is very premium, no oil leaks at all.",
    orderedItems: ["Mutton Kacchi Basmati (Standard)"],
    reply: "Shukriya Imran bhai! We use food-grade spill-proof boxes specially sealed for delivery riders.",
    replyDate: "14 Oct, 10:00 AM",
    status: "REPLIED"
  }
];

export default function MerchantReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "AWAITING" | "REPLIED">("ALL");
  const [replyModalReview, setReplyModalReview] = useState<ReviewItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === "ALL") return true;
    return r.status === selectedFilter;
  });

  const awaitingCount = reviews.filter((r) => r.status === "AWAITING").length;
  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

  const handleOpenReplyModal = (review: ReviewItem) => {
    setReplyModalReview(review);
    setReplyText(review.reply || "");
  };

  const handleSaveReply = () => {
    if (!replyModalReview || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyModalReview.id
          ? {
              ...r,
              reply: replyText.trim(),
              replyDate: "Just now",
              status: "REPLIED"
            }
          : r
      )
    );

    setToastMessage(`Reply published for Order #${replyModalReview.orderId}`);
    setReplyModalReview(null);
    setReplyText("");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
              Customer Feedback Hub
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
              Kacchi Bhai Banani
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Dokan Ratings & Customer Reviews
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor real-time food reviews, respond directly to diners, and improve kitchen SLA scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedFilter === "ALL"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setSelectedFilter("AWAITING")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedFilter === "AWAITING"
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-700 border border-orange-200 hover:bg-orange-50"
            }`}
          >
            <span>Awaiting Reply</span>
            {awaitingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 text-[10px] flex items-center justify-center font-black">
                {awaitingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setSelectedFilter("REPLIED")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedFilter === "REPLIED"
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Replied
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Average Food Rating</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-amber-500">{avgRating}★</span>
            <span className="text-xs text-slate-500 font-medium">/ 5.0</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">▲ +0.2 higher than Banani average</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Reviews (30D)</span>
          <div className="text-2xl font-black text-slate-900">1,284</div>
          <p className="text-[11px] text-slate-500">96 verified reviews this month</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Pending Replies</span>
          <div className="text-2xl font-black text-orange-600">{awaitingCount}</div>
          <p className="text-[11px] text-orange-600 font-medium">SLA Target: Reply within 24h</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Dokan Response Rate</span>
          <div className="text-2xl font-black text-emerald-600">88%</div>
          <p className="text-[11px] text-slate-500">Target 90% for &ldquo;Super Dokan&rdquo; badge</p>
        </div>
      </div>

      {/* Policy Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
        <span className="material-symbols-outlined text-amber-600 text-lg shrink-0 mt-0.5">info</span>
        <div>
          <span className="font-bold">Elara Dokan Policy:</span> 1★ and 2★ reviews trigger an automated instant push notification to the kitchen manager. Replying politely with compensation vouchers helps retain 84% of dissatisfied diners.
        </div>
      </div>

      {/* Reviews Stream */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <span className="material-symbols-outlined text-4xl text-slate-300">rate_review</span>
            <p className="text-sm font-bold text-slate-700 mt-2">No reviews found in this filter</p>
            <p className="text-xs text-slate-400 mt-1">Try viewing all customer reviews.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{rev.customerName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">({rev.customerPhone})</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                        {rev.zone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>Order #{rev.orderId}</span>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                    <span className="text-sm font-black text-amber-600">{rev.rating}★</span>
                    <span className="text-[10px] text-amber-700 font-medium">Food: {rev.foodRating}★</span>
                  </div>

                  {/* Status Badge */}
                  {rev.status === "AWAITING" ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-orange-100 text-orange-700 border border-orange-200">
                      Awaiting Reply
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                      Replied
                    </span>
                  )}
                </div>
              </div>

              {/* Ordered Items Pill list */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold mr-1">Dishes:</span>
                {rev.orderedItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* Existing Merchant Reply */}
              {rev.reply && (
                <div className="ml-4 sm:ml-8 pl-4 border-l-2 border-orange-500 space-y-1 bg-orange-50/40 p-3 rounded-r-xl">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-orange-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-orange-600">store</span>
                      Kacchi Bhai Management Reply:
                    </span>
                    <span className="text-slate-400 font-mono">{rev.replyDate}</span>
                  </div>
                  <p className="text-xs text-slate-700">{rev.reply}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenReplyModal(rev)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 border border-slate-200 transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">reply</span>
                  <span>{rev.reply ? "Edit Reply" : "Reply to Diner"}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {replyModalReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600">reply</span>
                <h3 className="text-base font-bold text-slate-900">
                  Reply to {replyModalReview.customerName}
                </h3>
              </div>
              <button
                onClick={() => setReplyModalReview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-slate-400">
                <span>Order #{replyModalReview.orderId}</span>
                <span className="text-amber-600 font-bold">{replyModalReview.rating}★ Rating</span>
              </div>
              <p className="text-slate-700 italic">&ldquo;{replyModalReview.comment}&rdquo;</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Your Public Dokan Response
              </label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Thank the customer, address any concerns with ingredients or packaging, and invite them back..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <p className="text-[11px] text-slate-400">
                This reply will be publicly visible to all diners on your Elara storefront.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setReplyModalReview(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReply}
                disabled={!replyText.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition disabled:opacity-50"
              >
                Publish Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* elara-stage-190 */
