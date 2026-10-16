"use client";

import { useState } from "react";
import Link from "next/link";

interface DailyEarning {
  day: string;
  date: string;
  orders: number;
  grossSales: number;
  platformCommission: number;
  vatWithholding: number;
  netPayout: number;
  highlight?: "BEST" | "LOWEST";
}

const REPORT_DAYS: DailyEarning[] = [
  {
    day: "Saturday",
    date: "11 Oct 2026",
    orders: 142,
    grossSales: 61200,
    platformCommission: 6120, // 10%
    vatWithholding: 3060, // 5%
    netPayout: 52020,
    highlight: "BEST"
  },
  {
    day: "Sunday",
    date: "12 Oct 2026",
    orders: 98,
    grossSales: 42100,
    platformCommission: 4210,
    vatWithholding: 2105,
    netPayout: 35785
  },
  {
    day: "Monday",
    date: "13 Oct 2026",
    orders: 84,
    grossSales: 36500,
    platformCommission: 3650,
    vatWithholding: 1825,
    netPayout: 31025
  },
  {
    day: "Tuesday",
    date: "14 Oct 2026",
    orders: 65,
    grossSales: 28450,
    platformCommission: 2845,
    vatWithholding: 1422,
    netPayout: 24183,
    highlight: "LOWEST"
  },
  {
    day: "Wednesday",
    date: "15 Oct 2026",
    orders: 91,
    grossSales: 39800,
    platformCommission: 3980,
    vatWithholding: 1990,
    netPayout: 33830
  },
  {
    day: "Thursday",
    date: "16 Oct 2026",
    orders: 110,
    grossSales: 47600,
    platformCommission: 4760,
    vatWithholding: 2380,
    netPayout: 40460
  },
  {
    day: "Friday",
    date: "17 Oct 2026",
    orders: 125,
    grossSales: 54200,
    platformCommission: 5420,
    vatWithholding: 2710,
    netPayout: 46070
  }
];

export default function MerchantReportsPage() {
  const [selectedRange, setSelectedRange] = useState<"WEEKLY" | "MONTHLY" | "CUSTOM">("WEEKLY");
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const totalGross = REPORT_DAYS.reduce((sum, d) => sum + d.grossSales, 0);
  const totalCommission = REPORT_DAYS.reduce((sum, d) => sum + d.platformCommission, 0);
  const totalVat = REPORT_DAYS.reduce((sum, d) => sum + d.vatWithholding, 0);
  const totalNet = REPORT_DAYS.reduce((sum, d) => sum + d.netPayout, 0);
  const totalOrders = REPORT_DAYS.reduce((sum, d) => sum + d.orders, 0);

  const handleExport = (format: string) => {
    setDownloadingFormat(format);
    setTimeout(() => {
      setDownloadingFormat(null);
      alert(`Export generated: Elara_Dokan_KacchiBhai_Financial_Report.${format.toLowerCase()}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
              Financial Analytics & Tax Audit
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
              NBR Mushak-6.3 Compliant
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Dokan Revenue & Settlement Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Detailed 7-day and monthly reconciliation with Bangladesh Bank BEFTN clearing batch logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedRange("WEEKLY")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedRange === "WEEKLY" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Current Week
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange("MONTHLY")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedRange === "MONTHLY" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              October 2026
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleExport("PDF")}
            disabled={downloadingFormat !== null}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>{downloadingFormat === "PDF" ? "Exporting..." : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Gross Food Sales</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">৳ {totalGross.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">▲ +8.4% vs last week</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Platform Fee (10%)</span>
          <div className="text-xl sm:text-2xl font-black text-slate-600">৳ {totalCommission.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400">Elara Dokan Engine Fee</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">NBR VAT Withholding (5%)</span>
          <div className="text-xl sm:text-2xl font-black text-slate-600">৳ {totalVat.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400">Mushak-6.3 certificate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-emerald-200 bg-emerald-50/30 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold">Net Payout to Bank</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">৳ {totalNet.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-800 font-medium">Auto-cleared via BEFTN</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Kitchen Orders</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{totalOrders}</div>
          <p className="text-[11px] text-slate-500 font-mono">Avg ticket ৳ {(totalGross / totalOrders).toFixed(0)}</p>
        </div>
      </div>

      {/* Week Performance Callout */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              Weekly Insight
            </span>
            <span className="text-xs text-slate-300">Week 41 (11 Oct – 17 Oct 2026)</span>
          </div>
          <p className="text-sm font-semibold text-white">
            Best day: <span className="text-emerald-400 font-bold">Saturday (৳ 61,200)</span> • Lowest:{" "}
            <span className="text-orange-400 font-bold">Tuesday (৳ 28,450)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleExport("CSV")}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">table_view</span>
            <span>Export CSV</span>
          </button>
          <Link
            href="/merchant/bank"
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-orange-600 hover:bg-orange-700 text-white transition flex items-center gap-1"
          >
            <span>BEFTN Bank Config</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* 7-Day Day-by-Day Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Daily Revenue & Deduction Ledger</h3>
          <span className="text-xs font-mono text-slate-500">All amounts in BDT (৳)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Day & Date</th>
                <th className="py-3 px-4 font-bold text-center">Orders</th>
                <th className="py-3 px-4 font-bold text-right">Gross Sales</th>
                <th className="py-3 px-4 font-bold text-right">Elara Fee (10%)</th>
                <th className="py-3 px-4 font-bold text-right">VAT (5%)</th>
                <th className="py-3 px-4 font-bold text-right">Net Payout</th>
                <th className="py-3 px-4 font-bold text-center">Batch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {REPORT_DAYS.map((row) => (
                <tr key={row.day} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span>{row.day}</span>
                      <span className="text-[11px] text-slate-400 font-mono">({row.date})</span>
                      {row.highlight === "BEST" && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-emerald-100 text-emerald-800">
                          PEAK
                        </span>
                      )}
                      {row.highlight === "LOWEST" && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-slate-100 text-slate-600">
                          LOW
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-700">{row.orders}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    ৳ {row.grossSales.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right text-rose-600">
                    -৳ {row.platformCommission.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-500">
                    -৳ {row.vatWithholding.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600 text-sm">
                    ৳ {row.netPayout.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Settled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/70 font-mono font-bold text-slate-900 border-t-2 border-slate-200">
                <td className="py-3.5 px-4 font-sans uppercase">Weekly Total</td>
                <td className="py-3.5 px-4 text-center">{totalOrders}</td>
                <td className="py-3.5 px-4 text-right">৳ {totalGross.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right text-rose-600">-৳ {totalCommission.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right text-slate-600">-৳ {totalVat.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right text-emerald-700 font-black text-base">
                  ৳ {totalNet.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-center text-[11px] text-slate-500">100% Cleared</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Tax & Compliance Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-orange-600 text-base">receipt</span>
            <span>NBR VAT Mushak-6.3 Certificates</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            As a registered culinary merchant under Bangladesh National Board of Revenue (BIN: 004829104), all VAT collected from customers is matched against input tax credit. Your monthly Mushak-6.3 return packet is generated automatically on the 1st of every month.
          </p>
          <button
            type="button"
            onClick={() => handleExport("VAT-Mushak6.3")}
            className="text-xs font-mono font-bold text-orange-600 hover:underline pt-1 block"
          >
            Download Mushak-6.3 Tax Docket &rarr;
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-emerald-600 text-base">account_balance</span>
            <span>BEFTN Electronic Clearing Logs</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Funds are dispatched nightly via Bangladesh Bank BEFTN rails into your verified BRAC Bank Corporate Current Account (AC: 1501204892019001). Transactions reflect in your bank statement within 1-2 banking working days.
          </p>
          <Link
            href="/merchant/settlements"
            className="text-xs font-mono font-bold text-emerald-600 hover:underline pt-1 block"
          >
            View Settlement History & Batches &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
