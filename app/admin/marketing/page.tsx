"use client";

import { useState } from "react";
import Link from "next/link";

interface CampaignItem {
  id: string;
  name: string;
  type: "VOUCHER" | "PUSH_CAMPAIGN" | "HERO_BANNER" | "SMS";
  targetZones: string;
  budgetCap: number;
  redemptions: number;
  schedule: string;
  status: "LIVE" | "SCHEDULED" | "ENDED";
}

const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: "CAMP-101",
    name: "Eid Mega Food & Bazaar Mela",
    type: "HERO_BANNER",
    targetZones: "All Dhaka Clusters",
    budgetCap: 400000,
    redemptions: 4201,
    schedule: "15–22 Mar 2026",
    status: "LIVE"
  },
  {
    id: "CAMP-102",
    name: "ELARA100 (৳ 100 Off First Super App Order)",
    type: "VOUCHER",
    targetZones: "New Users Nationwide",
    budgetCap: 100000,
    redemptions: 2884,
    schedule: "Always On",
    status: "LIVE"
  },
  {
    id: "CAMP-103",
    name: "Monsoon Surge Relief Push Notification",
    type: "PUSH_CAMPAIGN",
    targetZones: "Banani, Gulshan, Dhanmondi",
    budgetCap: 60000,
    redemptions: 1102,
    schedule: "Every Rain Alert",
    status: "SCHEDULED"
  },
  {
    id: "CAMP-104",
    name: "Padma Fresh Ilish Friday Bazaar Alert",
    type: "SMS",
    targetZones: "Dhaka North Clusters",
    budgetCap: 45000,
    redemptions: 866,
    schedule: "Fridays 7:00 AM",
    status: "ENDED"
  }
];

export default function AdminMarketingPage() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"VOUCHER" | "PUSH_CAMPAIGN" | "HERO_BANNER" | "SMS">("VOUCHER");
  const [newZones, setNewZones] = useState("All Dhaka Clusters");
  const [newBudget, setNewBudget] = useState("50000");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCamp: CampaignItem = {
      id: `CAMP-${Math.floor(100 + Math.random() * 900)}`,
      name: newTitle.trim(),
      type: newType,
      targetZones: newZones,
      budgetCap: Number(newBudget) || 50000,
      redemptions: 0,
      schedule: "Active Now",
      status: "LIVE"
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    setShowModal(false);
    setNewTitle("");
  };

  const filtered = campaigns.filter((c) => {
    if (selectedType === "ALL") return true;
    return c.type === selectedType;
  });

  const totalSpend = campaigns.reduce((sum, c) => sum + c.budgetCap, 0);
  const totalRedemptions = campaigns.reduce((sum, c) => sum + c.redemptions, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Growth Engine & Audience Engagement
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
              Geo-Fenced Push & Vouchers
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Marketing Campaigns & Promo Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create automated promo vouchers, manage hero banners, and dispatch geo-targeted push notifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-950/40"
          >
            <span className="material-symbols-outlined text-base">campaign</span>
            <span>+ New Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Promo Redemptions</span>
          <div className="text-2xl font-black text-purple-400 font-mono">{totalRedemptions.toLocaleString()}</div>
          <p className="text-[10px] text-emerald-400 font-mono">5.2% campaign conversion</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Allocated Budget Cap</span>
          <div className="text-2xl font-black text-white font-mono">৳ {(totalSpend / 100000).toFixed(1)} Lakh</div>
          <p className="text-[10px] text-slate-400 font-mono">Month-to-date marketing reserve</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Active Live Vouchers</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {campaigns.filter((c) => c.status === "LIVE").length} Campaigns
          </div>
          <p className="text-[10px] text-slate-400 font-mono">ELARA100 & EIDMUBARAK</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Audience Reach (7D)</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">182K Users</div>
          <p className="text-[10px] text-slate-400 font-mono">Banani, Gulshan, Dhanmondi</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-[#0D121F] p-1 rounded-xl border border-white/10 text-xs font-mono overflow-x-auto">
        {["ALL", "VOUCHER", "HERO_BANNER", "PUSH_CAMPAIGN", "SMS"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedType === type
                ? "bg-purple-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {type === "ALL" ? "All Channels" : type.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Campaign Table */}
      <div className="bg-[#0D121F] border border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#131927] text-slate-400 font-mono text-[11px] uppercase border-b border-white/10">
                <th className="py-3 px-4 font-bold">Campaign Name</th>
                <th className="py-3 px-4 font-bold text-center">Channel</th>
                <th className="py-3 px-4 font-bold">Target Zones</th>
                <th className="py-3 px-4 font-bold text-right">Budget Cap</th>
                <th className="py-3 px-4 font-bold text-center">Redemptions</th>
                <th className="py-3 px-4 font-bold text-center">Schedule</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filtered.map((camp) => (
                <tr key={camp.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-sans font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span>{camp.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({camp.id})</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-300">
                      {camp.type.replace("_", " ")}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{camp.targetZones}</td>

                  <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                    ৳ {camp.budgetCap.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-center text-white font-bold">
                    {camp.redemptions.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-center text-slate-400">{camp.schedule}</td>

                  <td className="py-3.5 px-4 text-center">
                    {camp.status === "LIVE" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Live
                      </span>
                    )}
                    {camp.status === "SCHEDULED" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Scheduled
                      </span>
                    )}
                    {camp.status === "ENDED" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-500">
                        Ended
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0D121F] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Create New Marketing Campaign</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Campaign Title / Promo Code
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. BANANI50 (৳50 off lunch delivery)"
                  className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Channel</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="VOUCHER">Promo Voucher</option>
                    <option value="HERO_BANNER">Hero App Banner</option>
                    <option value="PUSH_CAMPAIGN">Push Notification</option>
                    <option value="SMS">Direct SMS</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Budget Cap (৳)</label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Target Zones</label>
                <input
                  type="text"
                  value={newZones}
                  onChange={(e) => setNewZones(e.target.value)}
                  className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
