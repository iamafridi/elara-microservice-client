"use client";

import { useState } from "react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "MERCHANT" | "SUPPORT";
  text: string;
  time: string;
  attachment?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m-1",
    sender: "MERCHANT",
    text: "Assalamu Alaikum. Our nightly settlement batch PAY-1082 for ৳38,940 hasn't reflected in our BRAC Bank account yet.",
    time: "10:14 AM"
  },
  {
    id: "m-2",
    sender: "SUPPORT",
    text: "Walaikum Assalam Sultan bhai! Batch PAY-1082 was processed and dispatched to Bangladesh Bank BEFTN clearing network on 15 Oct at 4:12 PM. BEFTN inter-bank clearing can take up to 24-48 bank working hours.",
    time: "10:16 AM"
  },
  {
    id: "m-3",
    sender: "MERCHANT",
    text: "Understood, but can you please provide the Bangladesh Bank BEFTN clearing reference sequence? Our branch manager at Kemal Ataturk asked for it.",
    time: "10:20 AM"
  },
  {
    id: "m-4",
    sender: "SUPPORT",
    text: "Certainly! BEFTN Clearing Batch: BB-20261015-ELARA-9921. Escalating this ticket to our Dhaka Treasury Desk for immediate trace.",
    time: "10:22 AM"
  }
];

export default function MerchantSupportPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [ticketStatus, setTicketStatus] = useState<"OPEN" | "RESOLVED">("OPEN");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "MERCHANT",
      text: inputText.trim(),
      time: "Just now"
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate instant support response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-bot-${Date.now()}`,
          sender: "SUPPORT",
          text: "Thank you for the update. Our partner operations officer (Tariqul, Gulshan Hub) has received your note and is looking into it now.",
          time: "Just now"
        }
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
              24/7 Merchant Helpdesk
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
              Avg Response: 2 Mins
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Dokan Partner Support & Operations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Direct priority hotline and live chat assistance for KDS hardware, BEFTN payouts, and rider issues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+8809612000300"
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-sm text-emerald-600">call</span>
            <span>Hotline: 09612-000300</span>
          </a>
          <button
            type="button"
            onClick={() => setTicketStatus(ticketStatus === "OPEN" ? "RESOLVED" : "OPEN")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs ${
              ticketStatus === "OPEN"
                ? "bg-slate-900 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {ticketStatus === "OPEN" ? "task_alt" : "lock_open"}
            </span>
            <span>{ticketStatus === "OPEN" ? "Close Ticket #4471" : "Re-open Ticket"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[560px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                EP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Elara Merchant Support Desk</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Ticket #SUP-4471 • Assigned to Treasury Desk (Dhaka HQ)
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Priority SLA
            </span>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => {
              const isMerchant = m.sender === "MERCHANT";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMerchant ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mb-1">
                    <span>{isMerchant ? "Kacchi Bhai Manager" : "Elara Support Agent"}</span>
                    <span>•</span>
                    <span>{m.time}</span>
                  </div>

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                      isMerchant
                        ? "bg-orange-600 text-white rounded-tr-xs"
                        : "bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/60"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white rounded-b-3xl"
          >
            <button
              type="button"
              onClick={() => alert("Upload dialog opened: Attach thermal printer photo, invoice, or screenshot")}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Attach screenshot or printer log"
            >
              <span className="material-symbols-outlined text-lg">attach_file</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message to Elara Dokan Support..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* Right Col: Quick Assistance & Escalation Channels */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Urgent Kitchen Hotlines</h3>
            <p className="text-xs text-slate-500">
              For immediate order cancellation, food spills during rider transit, or POS terminal failures:
            </p>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Banani Hub Operations</div>
                  <div className="text-[11px] text-slate-400 font-mono">01711-223344 (8 AM - 2 AM)</div>
                </div>
                <a
                  href="tel:01711223344"
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                >
                  Call
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Finance & BEFTN Payouts</div>
                  <div className="text-[11px] text-slate-400 font-mono">finance@elara.com.bd</div>
                </div>
                <a
                  href="mailto:finance@elara.com.bd"
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-[11px]"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-orange-50 border border-orange-200/80 shadow-xs space-y-2 text-xs text-orange-950">
            <div className="flex items-center gap-2 font-bold text-orange-900">
              <span className="material-symbols-outlined text-orange-600 text-lg">print</span>
              <span>Thermal Printer Help</span>
            </div>
            <p className="leading-relaxed">
              If your 80mm ESC/POS thermal printer stops auto-cutting dockets or runs out of thermal paper rolls, switch to manual browser print or reboot Bluetooth pairing in Hardware Settings.
            </p>
            <Link
              href="/merchant/printer"
              className="font-bold text-orange-700 hover:underline block pt-1"
            >
              Open Printer Diagnostic Panel &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-2 text-xs">
            <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-wider">
              Legal Protection
            </span>
            <h4 className="font-bold text-sm">Consumer Protection Act, 2009</h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Diners may file grievances regarding food weight or packaging discrepancies under the Directorate of National Consumer Rights Protection (DNCRP). Elara Dokan mediation assists within 24h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-207 */
