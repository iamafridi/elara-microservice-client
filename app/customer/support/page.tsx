"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkflow, LiveOrder } from "@/context/WorkflowContext";
import { useAuth } from "@/context/AuthContext";

interface ChatMessage {
  id: string;
  sender: "agent" | "user" | "system";
  text: string;
  time: string;
  orderContext?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "system",
    text: "Order #ELR-DH-42534 attached to this support session. An Elara Dhaka Care Specialist has joined.",
    time: "12:35 PM",
  },
  {
    id: "msg-2",
    sender: "agent",
    text: "Assalamu Alaikum! I am Nusrat from Elara Dhaka Customer Care. I can see your active order is currently en route. How can I assist you today?",
    time: "12:36 PM",
  },
];

const QUICK_ISSUES = [
  "Where is my rider right now?",
  "Delivery is running late",
  "Spilled or damaged parcel item",
  "Wrong or missing item in package",
  "Refund request to bKash",
  "Update delivery instructions",
];

export default function CustomerSupportPage() {
  const { user } = useAuth();
  const { liveOrders, activeCustomerOrder } = useWorkflow();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<LiveOrder | null>(activeCustomerOrder || liveOrders[0] || null);
  const [ticketStatus, setTicketStatus] = useState<"OPEN" | "IN_PROGRESS" | "RESOLVED">("IN_PROGRESS");
  const [ticketId] = useState("TKT-BD-8924");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    // Simulated instant agent response
    setTimeout(() => {
      let reply = "Thank you for the update. Our Tejgaon dispatch desk is checking the telemetry telemetry with the assigned rider right now.";
      if (text.includes("rider") || text.includes("Where")) {
        reply = `Rider Tanvir Hossain is currently navigating the Banani 11 corridor. GPS telemetry shows he is approximately 4 minutes away from your delivery point.`;
      } else if (text.includes("damaged") || text.includes("Spilled")) {
        reply = `We sincerely apologize! Under the Directorate of National Consumer Rights Protection (DNCRP) guidelines, we have initiated an instant replacement and credited a ৳100 courtesy voucher to your Elara Pay wallet.`;
      } else if (text.includes("refund") || text.includes("bKash")) {
        reply = `Your refund request has been submitted to the accounts desk. For order #${selectedOrder?.id || "ELR-DH-42534"}, ৳${selectedOrder?.total || 450} will be returned to your bKash wallet within 15 minutes.`;
      }

      const agentMsg: ChatMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: "agent",
        text: reply,
        time: "Just now",
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
              24/7 Dhaka Customer Care
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Online
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant priority helpdesk with order context &amp; direct operations dispatch
          </p>
        </div>

        {/* Urgent Hotline Button */}
        <a
          href="tel:09612000300"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-bold shadow-md shadow-orange-600/20 transition self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">call</span>
          <span>Hotline: 09612-000300</span>
        </a>
      </div>

      {/* Metric Micro-Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Avg. Reply Time</span>
          <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">&lt; 2 Mins</span>
          <span className="text-[11px] text-emerald-600 font-medium">Tejgaon Hub Active</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Attached Order</span>
          <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block truncate">
            #{selectedOrder?.id || "ELR-DH-42534"}
          </span>
          <span className="text-[11px] text-slate-500 font-medium truncate">{selectedOrder?.merchantName || "Kacchi Bhai"}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Active Ticket</span>
          <span className="text-lg font-black text-orange-600 font-mono mt-0.5 block">#{ticketId}</span>
          <span className="text-[11px] text-slate-500 font-medium">{ticketStatus}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Resolution SLA</span>
          <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">15 Mins</span>
          <span className="text-[11px] text-primary font-medium">DNCRP Compliant</span>
        </div>
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat Window (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          {/* Chat Window Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  NJ
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block leading-tight">Nusrat Jahan</span>
                <span className="text-[11px] text-slate-500 font-mono">Senior Support Specialist • Elara Care</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Order Context:</span>
              <select
                value={selectedOrder?.id || ""}
                onChange={(e) => {
                  const ord = liveOrders.find((o) => o.id === e.target.value);
                  if (ord) setSelectedOrder(ord);
                }}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-mono font-medium text-slate-700 focus:outline-none focus:border-primary shadow-xs"
              >
                {liveOrders.map((ord) => (
                  <option key={ord.id} value={ord.id}>
                    #{ord.id} — {ord.merchantName.slice(0, 15)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              if (msg.sender === "system") {
                return (
                  <div key={msg.id} className="text-center my-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-200/80 text-slate-600 text-[11px] font-mono font-medium">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2`}>
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mb-1">
                      NJ
                    </div>
                  )}
                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                      isUser
                        ? "bg-slate-900 text-white rounded-br-xs"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[10px] font-mono mt-1 block text-right ${
                        isUser ? "text-slate-400" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center">
                  NJ
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Issue Chips */}
          <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-mono text-slate-400 shrink-0">Quick issues:</span>
            {QUICK_ISSUES.map((issue) => (
              <button
                key={issue}
                type="button"
                onClick={() => handleSendMessage(issue)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-primary hover:border-emerald-200 border border-transparent text-slate-600 text-[11px] font-mono transition shrink-0"
              >
                {issue}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Describe your issue or ask for an order update..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary shadow-xs"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-slate-200 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Snapshot Card */}
          {selectedOrder && (
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">Attached Order</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  {selectedOrder.status}
                </span>
              </div>

              <div>
                <span className="font-bold text-sm text-slate-900 block">{selectedOrder.merchantName}</span>
                <span className="text-[11px] font-mono text-slate-400">
                  Order #{selectedOrder.id} • {selectedOrder.createdAt}
                </span>
              </div>

              <div className="space-y-1 text-xs font-mono bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Items:</span>
                  <span>{selectedOrder.items.length} items</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Bill:</span>
                  <span className="font-bold text-slate-900">৳{selectedOrder.total} BDT</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery OTP:</span>
                  <span className="font-black text-primary">{selectedOrder.deliveryOtp}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Link
                  href="/customer/track"
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold text-center transition"
                >
                  Track Live GPS
                </Link>
                <Link
                  href="/customer/orders"
                  className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold text-center transition"
                >
                  View Invoice
                </Link>
              </div>
            </div>
          )}

          {/* Consumer Rights Guarantee */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">gavel</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-300 font-mono">
                DNCRP Consumer Rights
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every Elara order is fully protected under the Consumers&apos; Right Protection Act, 2009. Unresolved disputes are automatically escalated to our senior legal team.
            </p>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>National Consumer Hotline:</span>
              <span className="text-white font-bold">16121</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* elara-stage-121 */
