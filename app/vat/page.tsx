"use client";

import Link from "next/link";

export default function VatPolicyPage() {
  const binNumber = "004829104-0101";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white pt-14 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-emerald-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>National Board of Revenue • NBR e-Mushak Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight">
            Mushak-6.3 Tax Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            100% compliant with the Value Added Tax and Supplementary Duty Act, 2012 and statutory regulatory orders issued by the Government of Bangladesh.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-8">
        {/* NBR Registered Entity Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Official Regulatory Registration
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-sans mt-0.5">
                Elara Technologies Bangladesh Ltd.
              </h2>
            </div>
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
              BIN: <span className="text-primary font-black">{binNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Trade License</span>
              <span className="font-bold text-slate-900 text-sm block">TRAD/DNCC/014298/2026</span>
              <span className="text-slate-500 text-[11px]">Dhaka North City Corporation</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Statutory Rule</span>
              <span className="font-bold text-slate-900 text-sm block">Form Mushak-6.3</span>
              <span className="text-slate-500 text-[11px]">Rule 40(1)(Ga), VAT Rules 2016</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Applicable VAT Rate</span>
              <span className="font-bold text-primary text-sm block">5% Reduced Rate</span>
              <span className="text-slate-500 text-[11px]">SRO 144-AIN/2020/103-VAT</span>
            </div>
          </div>
        </div>

        {/* VAT Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">Instant Digital Invoicing</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Every food delivery, daily bazaar purchase, courier dispatch, and sheba booking automatically generates an official NBR Form Mushak-6.3 tax challan available for instant thermal print or PDF download.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">qr_code_2</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">QR Code Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Each invoice incorporates a cryptographically signed QR code verifiable by NBR VAT inspectors and corporate accounting desks to guarantee authentic tax remittance.
            </p>
          </div>
        </div>

        {/* Legal Framework Explanation */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 text-xs text-slate-700 leading-relaxed font-sans">
          <h3 className="text-base font-bold text-slate-900">Legal Directives &amp; Tax Deductions at Source (VDS)</h3>
          <p>
            Under the Value Added Tax and Supplementary Duty Act, 2012, Elara Technologies Bangladesh Ltd. acts as a certified electronic marketplace aggregator. Value Added Tax (VAT) collected from purchasers is held in escrow and settled directly with the National Board of Revenue through designated scheduled commercial banks using Bangladesh Bank BEFTN / RTGS clearing rails.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <strong>Corporate &amp; Enterprise Claimants:</strong> If your organization requires corporate input tax credit (Mushak-6.3 with business BIN registration), ensure your company BIN is entered in your corporate profile settings prior to checkout.
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <Link
            href="/customer/orders"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono transition shadow-md"
          >
            <span className="material-symbols-outlined text-sm">receipt</span>
            <span>View My Invoices &amp; Tax Dockets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
