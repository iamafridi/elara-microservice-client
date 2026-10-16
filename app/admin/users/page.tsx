"use client";

import { useState } from "react";
import Link from "next/link";

interface ConsumerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  zone: string;
  joinedDate: string;
  ordersCount: number;
  walletBalance: number;
  nidVerified: boolean;
  flags: number;
  status: "ACTIVE" | "UNDER_REVIEW" | "SUSPENDED";
}

const INITIAL_USERS: ConsumerUser[] = [
  {
    id: "C-10241",
    name: "Farhana Anjum",
    phone: "+880 1712-345678",
    email: "farhana.anjum@gmail.com",
    zone: "Banani DOHS",
    joinedDate: "Jan 2026",
    ordersCount: 142,
    walletBalance: 1240,
    nidVerified: true,
    flags: 0,
    status: "ACTIVE"
  },
  {
    id: "C-10240",
    name: "Rakib Hasan",
    phone: "+880 1811-908765",
    email: "rakib.hasan@yahoo.com",
    zone: "Gulshan-2",
    joinedDate: "Jan 2026",
    ordersCount: 89,
    walletBalance: 620,
    nidVerified: true,
    flags: 1,
    status: "ACTIVE"
  },
  {
    id: "C-10238",
    name: "Nusrat Jahan",
    phone: "+880 1915-223344",
    email: "nusrat.jahan@northsouth.edu",
    zone: "Dhanmondi 9/A",
    joinedDate: "Dec 2025",
    ordersCount: 311,
    walletBalance: 5830,
    nidVerified: true,
    flags: 0,
    status: "ACTIVE"
  },
  {
    id: "C-10231",
    name: "Imran Kabir",
    phone: "+880 1521-778899",
    email: "imran.k@hotmail.com",
    zone: "Uttara Sector 7",
    joinedDate: "Dec 2025",
    ordersCount: 12,
    walletBalance: 0,
    nidVerified: false,
    flags: 3,
    status: "UNDER_REVIEW"
  },
  {
    id: "C-10219",
    name: "Sadman Rahman",
    phone: "+880 1677-112233",
    email: "sadman.r@gmail.com",
    zone: "Mirpur-10",
    joinedDate: "Nov 2025",
    ordersCount: 57,
    walletBalance: 90,
    nidVerified: false,
    flags: 5,
    status: "SUSPENDED"
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ConsumerUser[]>(INITIAL_USERS);
  const [selectedTab, setSelectedTab] = useState<"ALL" | "ACTIVE" | "UNDER_REVIEW" | "SUSPENDED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
          setToastMessage(`User ${u.name} status updated to ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredUsers = users.filter((u) => {
    if (selectedTab !== "ALL" && u.status !== selectedTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.zone.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Consumer Directory & KYC Registry
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
              EC Smart NID Verified
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Consumer User Database
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directory of registered Elara super-app consumers with order volumes, wallet balances, and fraud flags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Exporting consumer directory CSV...")}
            className="px-4 py-2 bg-[#131927] hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Registered Consumers</span>
          <div className="text-2xl font-black text-purple-400 font-mono">48,210</div>
          <p className="text-[10px] text-emerald-400 font-mono">▲ 612 joined this week</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Smart NID Verified</span>
          <div className="text-2xl font-black text-white font-mono">39,904</div>
          <p className="text-[10px] text-slate-400 font-mono">82.8% of active base</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">MFS Wallet Balances</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">৳ 4.12 Cr</div>
          <p className="text-[10px] text-slate-400 font-mono">21,775 consumer wallets</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Flagged for Review</span>
          <div className="text-2xl font-black text-rose-400 font-mono">37</div>
          <p className="text-[10px] text-rose-300 font-mono">Failed COD & Chargeback SLA</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-[#0D121F] p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setSelectedTab("ALL")}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === "ALL" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            All Consumers ({users.length})
          </button>
          <button
            onClick={() => setSelectedTab("ACTIVE")}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === "ACTIVE" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedTab("UNDER_REVIEW")}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === "UNDER_REVIEW" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Under Review
          </button>
          <button
            onClick={() => setSelectedTab("SUSPENDED")}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === "SUSPENDED" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Suspended
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-base">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, zone..."
            className="w-full bg-[#0D121F] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0D121F] border border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#131927] text-slate-400 font-mono text-[11px] uppercase border-b border-white/10">
                <th className="py-3 px-4 font-bold">Consumer</th>
                <th className="py-3 px-4 font-bold">Phone & Zone</th>
                <th className="py-3 px-4 font-bold text-center">Lifetime Orders</th>
                <th className="py-3 px-4 font-bold text-right">Wallet Balance</th>
                <th className="py-3 px-4 font-bold text-center">Smart NID</th>
                <th className="py-3 px-4 font-bold text-center">Flags</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{user.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {user.id} • Joined {user.joinedDate}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <div>{user.phone}</div>
                    <div className="text-[11px] text-slate-500">{user.zone}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-white">{user.ordersCount}</td>

                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">
                    ৳ {user.walletBalance.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {user.nidVerified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <span className="material-symbols-outlined text-xs">verified</span> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-white/10">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {user.flags > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {user.flags} Reports
                      </span>
                    ) : (
                      <span className="text-slate-600">0</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {user.status === "ACTIVE" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Active
                      </span>
                    )}
                    {user.status === "UNDER_REVIEW" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Under Review
                      </span>
                    )}
                    {user.status === "SUSPENDED" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        Suspended
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        user.status === "SUSPENDED"
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                          : "bg-rose-600/20 hover:bg-rose-600 hover:text-white text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {user.status === "SUSPENDED" ? "Reactivate" : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
