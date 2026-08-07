"use client";

import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";
import { maskPhone, maskNID } from "@/lib/privacy";

export default function OrderInvoicePage({ params }: { params: { id: string } }) {
  const { liveOrders } = useWorkflow();
  const orderId = params?.id || "ELR-DH-42534";

  const order: LiveOrder =
    liveOrders.find((o) => o.id === orderId) ||
    liveOrders[0] || {
      id: orderId,
      customerName: "Rahim Ahmed",
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
      status: "DELIVERED",
      deliveryOtp: "8492",
      etaMinutes: 0,
      createdAt: "16 Oct 2026, 12:44 PM",
      updatedAt: "16 Oct 2026, 01:10 PM",
      timeline: [],
    };

  const invoiceNumber = `INV-${order.id.replace("ELR-", "")}`;
  const binNumber = "004829104-0101";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 print:bg-white print:p-0 font-sans">
      {/* Top Action Bar (hidden when printing) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/customer/orders/${order.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 transition"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Order #{order.id}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-md transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Mushak-6.3</span>
          </button>
        </div>
      </div>

      {/* Official Mushak-6.3 Invoice Docket Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-300 shadow-xl p-8 sm:p-12 print:border-none print:shadow-none print:p-4 print:max-w-none text-slate-900 space-y-6">
        {/* NBR Government Header */}
        <div className="text-center space-y-1 pb-6 border-b-2 border-slate-900">
          <div className="inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
            Government of the People&apos;s Republic of Bangladesh • National Board of Revenue
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
            TAX INVOICE / কর চালানপত্র
          </h1>
          <p className="text-[11px] font-mono text-slate-600">
            [See Rule 40, Sub-rule (1), Clause (Ga) of Value Added Tax and Supplementary Duty Rules, 2016]
          </p>
          <div className="inline-block px-2.5 py-0.5 mt-1 border border-slate-400 text-xs font-mono font-bold">
            Mushak-6.3 (মূসক-৬.৩)
          </div>
        </div>

        {/* Invoice Header Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
          {/* Supplier Registered Details */}
          <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              1. Supplier Information / সরবরাহকারী
            </span>
            <div className="font-bold text-sm text-slate-900">Elara Technologies Bangladesh Ltd.</div>
            <div className="text-slate-600">Trade License: TRAD/DNCC/014298/2026</div>
            <div className="text-slate-900 font-bold flex items-center gap-1">
              <span>Business BIN:</span>
              <span className="text-primary font-black">{binNumber}</span>
            </div>
            <div className="text-slate-500 text-[11px]">Outlet: {order.merchantName}</div>
            <div className="text-slate-500 text-[11px]">{order.merchantLocation}</div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              2. Purchaser Information / ক্রেতা
            </span>
            <div className="font-bold text-sm text-slate-900">{order.customerName}</div>
            <div className="text-slate-600">Mobile: {maskPhone(order.customerPhone)}</div>
            <div className="text-slate-700">Smart NID: {maskNID("8273 9102 4410")} (Verified EC)</div>
            <div className="text-slate-500 text-[11px]">Delivery: {order.customerAddress}</div>
          </div>
        </div>

        {/* Invoice Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-100 p-3.5 rounded-2xl text-xs font-mono">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Invoice No.</span>
            <span className="font-bold text-slate-900">{invoiceNumber}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Order Reference</span>
            <span className="font-bold text-slate-900">#{order.id}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Issue Date</span>
            <span className="font-bold text-slate-900">{order.createdAt}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Dispatch Vehicle</span>
            <span className="font-bold text-slate-900">Dhaka-HA-4291</span>
          </div>
        </div>

        {/* Itemized Tax Docket Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 bg-slate-50">
                <th className="py-2.5 px-3 font-bold text-slate-900">SL</th>
                <th className="py-2.5 px-3 font-bold text-slate-900">Item Description</th>
                <th className="py-2.5 px-3 font-bold text-slate-900 text-center">Qty</th>
                <th className="py-2.5 px-3 font-bold text-slate-900 text-right">Unit (৳)</th>
                <th className="py-2.5 px-3 font-bold text-slate-900 text-right">VAT (5%)</th>
                <th className="py-2.5 px-3 font-bold text-slate-900 text-right">Total (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.items.map((item, idx) => {
                const itemTotal = item.price * item.qty;
                const itemVat = Math.round(itemTotal * 0.05);
                return (
                  <tr key={idx}>
                    <td className="py-3 px-3 text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      {item.variant && <span className="text-[10px] text-slate-400">{item.variant}</span>}
                    </td>
                    <td className="py-3 px-3 text-center">{item.qty}</td>
                    <td className="py-3 px-3 text-right">৳{item.price}</td>
                    <td className="py-3 px-3 text-right text-slate-600">৳{itemVat}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">৳{itemTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bill Calculations */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t-2 border-slate-900 text-xs font-mono">
          <div className="space-y-2 max-w-sm">
            <div className="text-[11px] text-slate-500 leading-relaxed">
              <strong>VAT Declaration:</strong> The tax payable on this supply has been calculated at the standard reduced rate of 5% in accordance with Table 1 of SRO No. 144-AIN/2020/103-VAT for restaurant and processed retail services.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-700 block uppercase">Payment Authorization:</span>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Channel:</span>
                <span className="font-bold uppercase text-slate-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Status:</span>
                <span className="font-bold text-emerald-700">PAID &amp; SETTLED</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-72 space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Item Subtotal:</span>
              <span>৳{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Service Fee:</span>
              <span>৳{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Mushak-6.3 VAT (5%):</span>
              <span>৳{order.vat}</span>
            </div>
            <div className="pt-2 border-t border-slate-300 flex justify-between text-base font-black text-slate-900">
              <span>Grand Total:</span>
              <span className="text-primary font-black">৳{order.total} BDT</span>
            </div>
          </div>
        </div>

        {/* Signatures & Stamp */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 text-xs font-mono text-center sm:text-left">
          <div className="space-y-1">
            <div className="w-40 border-b border-slate-400 mx-auto sm:mx-0"></div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Purchaser Signature
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 border border-dashed border-slate-400 rounded-xl flex items-center justify-center text-[10px] text-slate-400 text-center p-1">
              QR Code Valid
            </div>
            <div className="space-y-1 text-right">
              <div className="w-44 border-b border-slate-400 ml-auto"></div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Authorized Platform Signatory
              </span>
              <span className="text-[10px] text-primary font-bold block">Elara Automated Tax Gateway</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400">
          This is an electronically generated NBR tax invoice compliant with Bangladesh e-Mushak directives.
        </div>
      </div>
    </div>
  );
}

/* elara-stage-120 */
