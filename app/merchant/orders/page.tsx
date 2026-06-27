"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";

export default function MerchantOrdersPage() {
  const { orders, merchantAcceptOrder, merchantMarkReady } = useWorkflow();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<LiveOrder | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && (o.status === "PLACED" || o.status === "PREPARING" || o.status === "READY_FOR_PICKUP")) ||
      (filter === "in_transit" && (o.status === "ON_THE_WAY" || o.status === "RIDER_ASSIGNED")) ||
      (filter === "delivered" && o.status === "DELIVERED");

    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Orders Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Live Orders &amp; Full History
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete transaction stream with itemized VAT Mushak-6.3 breakdown &amp; rider assignment details
          </p>
        </div>

        <Link
          href="/merchant/kds"
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">point_of_sale</span>
          <span>Switch to Kitchen KDS</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Orders" },
            { id: "active", label: "Kitchen Active" },
            { id: "in_transit", label: "On The Way" },
            { id: "delivered", label: "Delivered" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                filter === tab.id
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID or customer..."
            className="w-full sm:w-64 h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </div>

      {/* Orders List & Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Orders List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border border-dashed border-slate-200 text-center text-xs text-slate-400 space-y-2">
              <span className="material-symbols-outlined text-4xl text-slate-300">receipt</span>
              <p>No orders match this filter.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white border rounded-2xl p-5 shadow-xs transition cursor-pointer space-y-3 ${
                    isSelected
                      ? "border-orange-500 ring-2 ring-orange-500/10"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-black font-mono text-sm text-slate-900">{order.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-50 text-emerald-700"
                            : order.status === "PREPARING"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm text-slate-900 font-sans">৳ {order.total}</div>
                      <span className="text-[10px] font-mono text-slate-400">bKash MFS</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">{order.customerName}</span> •{" "}
                    <span className="text-slate-500">{order.customerAddress}</span>
                  </div>

                  <div className="space-y-1 text-xs pt-1 border-t border-slate-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span>{item.qty}x {item.name}</span>
                        <span className="font-mono text-slate-500">৳ {item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-mono">
                      💬 Note: {order.notes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px]">
                      Rider: <strong className="text-slate-700">{order.riderName || "Searching..."}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="text-orange-600 font-bold hover:underline"
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Order Detail & Tax Receipt Drawer */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 lg:sticky lg:top-24">
          {selectedOrder ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Mushak-6.3 VAT Tax Docket
                  </span>
                  <h3 className="font-black font-mono text-base text-slate-900">
                    {selectedOrder.id}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {selectedOrder.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">Customer Info:</span>
                  <div className="font-bold text-slate-800">{selectedOrder.customerName}</div>
                  <div className="text-slate-500">{selectedOrder.customerAddress}</div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">Assigned Rider:</span>
                  <div className="font-bold text-slate-800">{selectedOrder.riderName || "Tanvir Hossain"}</div>
                  <div className="text-slate-500 font-mono">Yamaha FZ-X • +880 1911-778899</div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Bill of Items
                </span>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-700">{item.qty}x {item.name}</span>
                    <span className="font-mono font-bold text-slate-900">৳ {item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>৳ {selectedOrder.total}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT (5% Mushak-6.3):</span>
                  <span>৳ {Math.round(selectedOrder.total * 0.05)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Commission (15%):</span>
                  <span className="text-rose-600">- ৳ {Math.round(selectedOrder.total * 0.15)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Net Dokan Payout:</span>
                  <span className="text-emerald-700 font-black">
                    ৳ {Math.round(selectedOrder.total * 0.85)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Printing receipt for ${selectedOrder.id} to 80mm ESC/POS printer...`)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Print Receipt Docket</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <span className="material-symbols-outlined text-3xl text-slate-300">touch_app</span>
              <p>Click on any order from the stream to view full details and print receipt dockets.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
