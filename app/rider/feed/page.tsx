"use client";

import { useState } from "react";
import Link from "next/link";

interface FeedPost {
  id: string;
  author: string;
  bike: string;
  time: string;
  content: string;
  tag: "TRAFFIC" | "WEATHER" | "RESTAURANT";
  likes: number;
}

const INITIAL_FEED: FeedPost[] = [
  { id: "p1", author: "Farhad Hossain", bike: "Pulsar 150", time: "10 min ago", content: "⚠️ Road 11 Banani has heavy slow-moving traffic near Kemal Ataturk signal. Better to use Road 10 bypass if delivering to Block D.", tag: "TRAFFIC", likes: 14 },
  { id: "p2", author: "Kamrul Islam", bike: "Yamaha FZ", time: "25 min ago", content: "🌧️ Waterlogging near Bijoy Sarani underpass after evening rain. Drive slow brothers, 2-wheelers take the flyover.", tag: "WEATHER", likes: 28 },
  { id: "p3", author: "Tanvir Hossain", bike: "Yamaha FZ-X", time: "42 min ago", content: "🍲 Kacchi Bhai Banani dispatch table is clearing orders super fast today! Average prep only 12 minutes.", tag: "RESTAURANT", likes: 19 },
];

export default function RiderFeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_FEED);
  const [newAlert, setNewAlert] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.trim()) return;
    const post: FeedPost = {
      id: `p${posts.length + 1}`,
      author: "Tanvir Hossain (You)",
      bike: "Yamaha FZ-X",
      time: "Just now",
      content: newAlert,
      tag: "TRAFFIC",
      likes: 1,
    };
    setPosts([post, ...posts]);
    setNewAlert("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
          Elara Rider Community &amp; Traffic Alerts
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time Dhaka road conditions, traffic jam warnings, and waterlogging alerts shared by fellow fleet riders
        </p>
      </div>

      {/* Post Alert Form */}
      <form onSubmit={handlePost} className="bg-[#0F1422] border border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
        <textarea
          rows={2}
          value={newAlert}
          onChange={(e) => setNewAlert(e.target.value)}
          placeholder="Share road alert with Dhaka riders (e.g. traffic jam, rain waterlogging, police checkpost)..."
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition"
          >
            Broadcast Road Alert
          </button>
        </div>
      </form>

      {/* Feed Stream */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#0F1422] border border-white/10 rounded-2xl p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{post.author}</span>
                <span className="text-slate-500 font-mono text-[11px]">• {post.bike}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">{post.time}</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                  post.tag === "WEATHER" ? "bg-sky-500/20 text-sky-300" : post.tag === "TRAFFIC" ? "bg-rose-500/20 text-rose-300" : "bg-orange-500/20 text-orange-300"
                }`}>
                  {post.tag}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {post.content}
            </p>

            <div className="pt-1 flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                👍 {post.likes} riders found helpful
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-126 */
