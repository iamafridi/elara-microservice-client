"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";
import { useCart } from "@/context/CartContext";

export default function CustomerOrdersPage() {
  const { liveOrders, activeCustomerOrder } = useWorkflow();
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<string>("all");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<LiveOrder | null>(null);
  const [reorderToast, setReorderToast] = useState<string | null>(null);

  const filteredOrders = liveOrders.filter((ord) => {
    if (filter === "active") return ord.status !== "DELIVERED" && ord.status !== "CANCELLED";
    if (filter === "delivered") return ord.status === "DELIVERED";
    return true;
  });

  const handleReorder = (order: LiveOrder) => {
    order.items.forEach((item, idx) => {
      addToCart({
        id: `reorder_${order.id}_${idx}`,
        name: item.name,
        priceBDT: item.price,
        merchantId: "mch_kacchi_bhai",
        merchantName: order.merchantName,
        category: "Food",
      });
    });
    setReorderToast(`Added ${order.items.length} items from ${order.merchantName} to your basket!`);
    setTimeout(() => setReorderToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
            My Orders &amp; Mushak-6.3 Invoices
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View order details, track ongoing deliveries, and download NBR tax dockets
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["all", "active", "delivered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition ${
                filter === tab
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>
      </div>

      {reorderToast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {reorderToast}</span>
          <Link href="/cart" className="underline font-black text-white hover:text-emerald-100">
            View Cart &rarr;
          </Link>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isDelivered = order.status === "DELIVERED";
          const isActive = order.status !== "DELIVERED" && order.status !== "CANCELLED";

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 font-bold flex items-center justify-center text-sm shrink-0">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">{order.merchantName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Order #{order.id} • {order.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                      isDelivered
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200 animate-pulse"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono uppercase font-bold">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Ordered Items ({order.items.reduce((acc, i) => acc + i.qty, 0)})
                  </span>
                  <div className="space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700 font-mono">
                        <span>
                          {it.qty}x {it.name}
                        </span>
                        <span className="font-semibold text-slate-900">৳ {it.price * it.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Payment &amp; Delivery Summary
                  </span>
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>৳ {order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee (Banani):</span>
                    <span>৳ {order.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Mushak VAT (5%):</span>
                    <span>৳ {order.vat}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200 text-sm">
                    <span>Total Paid:</span>
                    <span className="text-primary font-black">৳ {order.total} BDT</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/customer/orders/${order.id}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>View Order</span>
                  </Link>

                  <Link
                    href={`/customer/orders/${order.id}/invoice`}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold transition flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">receipt</span>
                    <span>Mushak-6.3</span>
                  </Link>

                  {isActive && (
                    <Link
                      href="/customer/track"
                      className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-mono font-bold transition flex items-center gap-1.5 hover:bg-primary/90"
                    >
                      <span className="material-symbols-outlined text-sm">navigation</span>
                      <span>Track Live</span>
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => handleReorder(order)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  <span>Order Again</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mushak-6.3 VAT Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            {/* Docket Header */}
            <div className="text-center space-y-1 pb-4 border-b border-slate-200">
              <div className="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                Government of the People&apos;s Republic of Bangladesh
              </div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                National Board of Revenue (NBR)
              </h2>
              <p className="text-xs font-bold text-slate-600 uppercase font-mono">
                Tax Invoice [Mushak-6.3 / মূসক-৬.৩]
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                Issued pursuant to Rule 40(1) of Value Added Tax and Supplementary Duty Rules, 2016
              </p>
            </div>

            {/* Merchant & Customer Info */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Seller Details</span>
                <span className="font-bold text-slate-900 block">{selectedInvoiceOrder.merchantName}</span>
                <span className="text-slate-500 block">{selectedInvoiceOrder.merchantLocation}</span>
                <span className="text-[11px] text-primary font-bold block mt-1">
                  BIN: 002948192-0101
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Buyer Details</span>
                <span className="font-bold text-slate-900 block">{selectedInvoiceOrder.customerName}</span>
                <span className="text-slate-500 block">{selectedInvoiceOrder.customerAddress}</span>
                <span className="text-slate-500 block">{selectedInvoiceOrder.customerPhone}</span>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="flex justify-between text-xs font-mono bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-slate-400 block text-[10px]">Challan / Invoice No.</span>
                <span className="font-bold text-slate-900">NBR-M63-{selectedInvoiceOrder.id}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Challan Date &amp; Time</span>
                <span className="font-bold text-slate-900">{selectedInvoiceOrder.createdAt}</span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Goods / Services Breakdown
              </span>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-400 text-[10px]">
                    <th className="pb-1">SL</th>
                    <th className="pb-1">Item Description</th>
                    <th className="pb-1 text-center">Qty</th>
                    <th className="pb-1 text-right">Price</th>
                    <th className="pb-1 text-right">Total (৳)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoiceOrder.items.map((it, idx) => (
                    <tr key={idx} className="text-slate-700">
                      <td className="py-2 text-slate-400">{idx + 1}</td>
                      <td className="py-2 font-medium">{it.name}</td>
                      <td className="py-2 text-center">{it.qty}</td>
                      <td className="py-2 text-right">৳ {it.price}</td>
                      <td className="py-2 text-right font-bold">৳ {it.price * it.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax Totals */}
            <div className="bg-slate-50 rounded-xl p-4 text-xs font-mono space-y-1.5 border border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Total Value (Excl. VAT):</span>
                <span>৳ {selectedInvoiceOrder.subtotal} BDT</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Rate VAT (5%):</span>
                <span>৳ {selectedInvoiceOrder.vat} BDT</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Express Delivery Charge:</span>
                <span>৳ {selectedInvoiceOrder.deliveryFee} BDT</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                <span>Net Payable (Inc. VAT):</span>
                <span className="text-primary">৳ {selectedInvoiceOrder.total} BDT</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-mono text-center">
              Payment Method: {selectedInvoiceOrder.paymentMethod.toUpperCase()} (TXN-ELR-928192) • Valid digital challan without physical seal
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-mono font-bold hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print Tax Challan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
