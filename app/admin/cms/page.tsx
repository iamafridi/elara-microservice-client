"use client";

import { useState } from "react";
import Link from "next/link";

interface CmsPost {
  id: string;
  title: string;
  slug: string;
  type: "BLOG" | "HELP_CENTER" | "POLICY" | "ANNOUNCEMENT";
  author: string;
  updated: string;
  locale: "bn-BD" | "en-BD";
  status: "PUBLISHED" | "DRAFT";
}

const INITIAL_POSTS: CmsPost[] = [
  {
    id: "CMS-101",
    title: "How Escrow Protects Your JobTap Payments in Bangladesh",
    slug: "/help/jobtap-escrow-guarantee",
    type: "HELP_CENTER",
    author: "Sadia Rahman (Ops Desk)",
    updated: "14 Oct 2026",
    locale: "bn-BD",
    status: "PUBLISHED"
  },
  {
    id: "CMS-102",
    title: "Rider Fleet Onboarding: BRTA Documents & Smart NID Guide",
    slug: "/help/rider-brta-onboarding",
    type: "HELP_CENTER",
    author: "Tanvir S. (Fleet Hub)",
    updated: "12 Oct 2026",
    locale: "bn-BD",
    status: "PUBLISHED"
  },
  {
    id: "CMS-103",
    title: "Elara Super App — Consumer Rights & Refund Policy (DNCRP 2009)",
    slug: "/legal/consumer-refund-policy",
    type: "POLICY",
    author: "Legal & Compliance",
    updated: "10 Oct 2026",
    locale: "en-BD",
    status: "PUBLISHED"
  },
  {
    id: "CMS-104",
    title: "Elara Mobile App Store Update (v4.2.1 Release Notes)",
    slug: "/announcements/v4-2-release",
    type: "ANNOUNCEMENT",
    author: "Product Engineering",
    updated: "08 Oct 2026",
    locale: "en-BD",
    status: "DRAFT"
  }
];

export default function AdminCmsPage() {
  const [posts, setPosts] = useState<CmsPost[]>(INITIAL_POSTS);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newType, setNewType] = useState<"BLOG" | "HELP_CENTER" | "POLICY" | "ANNOUNCEMENT">("HELP_CENTER");
  const [newLocale, setNewLocale] = useState<"bn-BD" | "en-BD">("bn-BD");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: CmsPost = {
      id: `CMS-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      slug: newSlug.trim() || `/${newTitle.toLowerCase().replace(/\s+/g, "-")}`,
      type: newType,
      author: "Admin Editor",
      updated: "Just now",
      locale: newLocale,
      status: "PUBLISHED"
    };

    setPosts((prev) => [newPost, ...prev]);
    setShowModal(false);
    setNewTitle("");
    setNewSlug("");
  };

  const filtered = posts.filter((p) => {
    if (selectedType === "ALL") return true;
    return p.type === selectedType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Content Engine & Knowledge Base
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold border border-white/10">
              Bilingual (bn-BD & en-BD)
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Content CMS & Policy Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish customer help articles, merchant onboarding guides, DNCRP consumer rights, and app release bulletins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-950/40"
          >
            <span className="material-symbols-outlined text-base">post_add</span>
            <span>+ New Article</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Published Documents</span>
          <div className="text-2xl font-black text-purple-400 font-mono">164 Articles</div>
          <p className="text-[10px] text-emerald-400 font-mono">Synced with mobile apps</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Drafts Under Review</span>
          <div className="text-2xl font-black text-white font-mono">18</div>
          <p className="text-[10px] text-slate-400 font-mono">Awaiting legal clearance</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Mobile App Release</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">v4.2.1</div>
          <p className="text-[10px] text-slate-400 font-mono">Google Play & App Store</p>
        </div>

        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Bilingual Coverage</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">100%</div>
          <p className="text-[10px] text-slate-400 font-mono">বাংলা ও English</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-[#0D121F] p-1 rounded-xl border border-white/10 text-xs font-mono overflow-x-auto">
        {["ALL", "HELP_CENTER", "POLICY", "ANNOUNCEMENT", "BLOG"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedType === type
                ? "bg-purple-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {type === "ALL" ? "All Content" : type.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="bg-[#0D121F] border border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#131927] text-slate-400 font-mono text-[11px] uppercase border-b border-white/10">
                <th className="py-3 px-4 font-bold">Title & Slug</th>
                <th className="py-3 px-4 font-bold text-center">Type</th>
                <th className="py-3 px-4 font-bold">Author</th>
                <th className="py-3 px-4 font-bold text-center">Locale</th>
                <th className="py-3 px-4 font-bold text-center">Updated</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-bold text-white text-xs">{post.title}</div>
                    <div className="text-[10px] text-purple-400 font-mono mt-0.5">{post.slug}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-300">
                      {post.type.replace("_", " ")}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{post.author}</td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300">
                      {post.locale}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center text-slate-400">{post.updated}</td>

                  <td className="py-3.5 px-4 text-center">
                    {post.status === "PUBLISHED" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Draft
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0D121F] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Create New CMS Article</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Bangladesh Bank Electronic Fund Transfer Guidelines"
                  className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="/legal/beftn-fund-transfer"
                  className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="HELP_CENTER">Help Center Article</option>
                    <option value="POLICY">Legal / Policy Document</option>
                    <option value="ANNOUNCEMENT">App Announcement</option>
                    <option value="BLOG">Blog Post</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Locale</label>
                  <select
                    value={newLocale}
                    onChange={(e) => setNewLocale(e.target.value as any)}
                    className="w-full bg-[#131927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="bn-BD">Bengali (bn-BD)</option>
                    <option value="en-BD">English (en-BD)</option>
                  </select>
                </div>
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
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
