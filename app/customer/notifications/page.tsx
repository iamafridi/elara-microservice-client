"use client";

import { useState } from "react";
import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "ORDER" | "PAYMENT" | "WEATHER" | "PROMO";
  read: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Rider Picked Up Order #ELR-DH-92841",
    message: "Tanvir Hossain has picked up your Kacchi Platter from Kemal Ataturk Ave and is en route to Banani Road 11.",
    time: "2 mins ago",
    type: "ORDER",
    read: false,
    link: "/customer/track",
  },
  {
    id: "notif-2",
    title: "bKash 10% Cashback Credited (৳ 150)",
    message: "Your Eid-ul-Fitr campaign cashback has been deposited directly into your Elara Pay digital wallet.",
    time: "2 hours ago",
    type: "PAYMENT",
    read: false,
    link: "/customer/wallet",
  },
  {
    id: "notif-3",
    title: "Heavy Monsoon Rain Alert in Gulshan & Banani",
    message: "Due to waterlogging around Bijoy Sarani underpass, deliveries may take 10-15 minutes longer. Our riders are driving safely.",
    time: "Yesterday, 6:40 PM",
    type: "WEATHER",
    read: true,
  },
  {
    id: "notif-4",
    title: "Weekend Padma Fresh Ilish Bazaar Open",
    message: "Fresh morning catch Hilsa from Chandpur has arrived at Kawran Bazar hub with free scale cleaning & custom cuts.",
    time: "14 Oct 2026",
    type: "PROMO",
    read: true,
    link: "/marketplace",
  },
];

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "ORDER":
        return { icon: "two_wheeler", bg: "bg-orange-50 text-orange-600 border-orange-200" };
      case "PAYMENT":
        return { icon: "payments", bg: "bg-emerald-50 text-emerald-600 border-emerald-200" };
      case "WEATHER":
        return { icon: "water_drop", bg: "bg-sky-50 text-sky-600 border-sky-200" };
      case "PROMO":
        return { icon: "loyalty", bg: "bg-purple-50 text-purple-600 border-purple-200" };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
            Notification Inbox &amp; Order Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time delivery progress, bKash cashback credits, and Dhaka weather alerts
          </p>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:bg-slate-100 transition self-start sm:self-auto"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => {
          const style = getIcon(n.type);
          return (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                !n.read
                  ? "bg-white border-orange-200 shadow-xs ring-1 ring-orange-100"
                  : "bg-white/80 border-slate-200/80"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${style.bg}`}>
                <span className="material-symbols-outlined text-xl">{style.icon}</span>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                {n.link && (
                  <Link
                    href={n.link}
                    className="inline-block text-xs font-mono font-bold text-primary hover:underline mt-1"
                  >
                    View Details &rarr;
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
