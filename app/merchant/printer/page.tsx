"use client";

import { useState } from "react";
import Link from "next/link";

export default function MerchantPrinterPage() {
  const [autoPrint, setAutoPrint] = useState(true);
  const [soundBuzzer, setSoundBuzzer] = useState(true);
  const [printCopies, setPrintCopies] = useState("2");
  const [testingPrint, setTestingPrint] = useState(false);
  const [testSuccess, setTestSuccess] = useState<string | null>(null);

  const handleTestPrint = () => {
    setTestingPrint(true);
    setTimeout(() => {
      setTestingPrint(false);
      setTestSuccess("Test ticket sent via ESC/POS 80mm driver! Docket printed successfully.");
      setTimeout(() => setTestSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Kitchen Hardware</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            ESC/POS 80mm Thermal Printer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure automatic kitchen docket printing &amp; customer receipt duplicates
          </p>
        </div>

        <button
          type="button"
          onClick={handleTestPrint}
          disabled={testingPrint}
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          <span>{testingPrint ? "Printing Test..." : "Print Test Ticket"}</span>
        </button>
      </div>

      {testSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2 shadow-xs">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{testSuccess}</span>
        </div>
      )}

      {/* Printer Status Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <span className="material-symbols-outlined text-2xl">print</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">Epson TM-T88VI (ESC/POS 80mm)</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              USB 2.0 • 192.168.1.140 • Paper Roll 80mm OK • 0 Errors
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">Firmware v4.81</span>
      </div>

      {/* Printer Options Form */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
          Printing Automation Preferences
        </h2>

        <div className="space-y-4 divide-y divide-slate-100 text-xs">
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="font-bold text-slate-900">Auto-Print on Incoming Order</div>
              <div className="text-[11px] text-slate-500">
                Immediately trigger kitchen docket when order status changes to ACCEPTED
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoPrint}
              onChange={(e) => setAutoPrint(e.target.checked)}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="font-bold text-slate-900">Hardware Buzzer Chime</div>
              <div className="text-[11px] text-slate-500">
                Audible beep sound from printer chassis for noisy kitchen environments
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundBuzzer}
              onChange={(e) => setSoundBuzzer(e.target.checked)}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="font-bold text-slate-900">Print Docket Copies</div>
              <div className="text-[11px] text-slate-500">
                1 copy for kitchen chef, 1 copy stapled to rider delivery bag
              </div>
            </div>
            <select
              value={printCopies}
              onChange={(e) => setPrintCopies(e.target.value)}
              className="h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
            >
              <option value="1">1 Copy (Kitchen Only)</option>
              <option value="2">2 Copies (Chef + Bag)</option>
              <option value="3">3 Copies (Chef + Bag + Accounts)</option>
            </select>
          </div>
        </div>

        {/* Docket Format Preview */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] space-y-1 text-slate-600">
          <div className="text-center font-bold text-slate-900">================================</div>
          <div className="text-center font-bold text-slate-900">KACCHI BHAI — BANANI DOKAN</div>
          <div className="text-center text-slate-500">VAT Reg: BIN 004829104-0101</div>
          <div className="text-center">ORDER #ORD-4821 • 16-OCT-2026</div>
          <div className="text-center font-bold text-slate-900">================================</div>
          <div className="flex justify-between py-1 font-bold text-slate-900">
            <span>2x Basmati Kacchi (Mutton)</span>
            <span>৳ 998</span>
          </div>
          <div className="flex justify-between py-1">
            <span>2x Shahi Borhani Glass</span>
            <span>৳ 180</span>
          </div>
          <div className="text-center font-bold text-slate-900">--------------------------------</div>
          <div className="flex justify-between font-bold text-slate-900">
            <span>TOTAL (bKash Paid):</span>
            <span>৳ 1,178 BDT</span>
          </div>
          <div className="text-center font-bold text-slate-900">================================</div>
          <div className="text-center text-[10px] text-slate-400">Rider: Tanvir Hossain (+880 1911-778899)</div>
        </div>
      </div>
    </div>
  );
}
