"use client";

import { useState } from "react";
import Link from "next/link";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ipAddress: string;
  status: "SUCCESS" | "WARNING";
}

const AUDIT_LOGS: AuditLog[] = [
  { id: "log-101", timestamp: "16-Oct-2026 02:18:12", actor: "admin@elara.com.bd", action: "Argon2 Password Auth & JWT Issued (Admin Role)", ipAddress: "127.0.0.1 (Local Mesh)", status: "SUCCESS" },
  { id: "log-102", timestamp: "16-Oct-2026 02:17:45", actor: "tanvir.rider@elara.com.bd", action: "Rider Telemetry Heartbeat Ping Active", ipAddress: "103.114.98.12 (Grameenphone 4G)", status: "SUCCESS" },
  { id: "log-103", timestamp: "16-Oct-2026 02:16:30", actor: "kacchi.bhai@elara.com.bd", action: "Item 86 Status Toggled: Morog Polao (Out of Stock)", ipAddress: "180.234.12.89 (Banglalink Fiber)", status: "SUCCESS" },
  { id: "log-104", timestamp: "16-Oct-2026 02:15:02", actor: "unknown@client", action: "Unauthenticated Request Intercepted by ProtectedRoute Guard", ipAddress: "127.0.0.1 (Next.js :3020)", status: "WARNING" },
];

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>Governance Command</span>
            <span>/</span>
            <span>Security &amp; Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            System Security, Audit Logs &amp; RBAC
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-based access control policies, live Argon2 security audits, and API gateway rate limiting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Zero-Trust Gateway Guard</span>
          </span>
        </div>
      </div>

      {/* Security Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Password Hashing Standard</span>
          <div className="text-2xl font-black font-mono text-purple-400 mt-1">Argon2id</div>
          <span className="text-[11px] text-slate-400 font-mono">Memory-hard salted cryptographic hashes</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">JWT Token Expiry</span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">7 Days</div>
          <span className="text-[11px] text-slate-400 font-mono">HttpOnly Cookie + Local Storage Cache</span>
        </div>

        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">RBAC Protected Routes</span>
          <div className="text-2xl font-black font-mono text-white mt-1">100% Guarded</div>
          <span className="text-[11px] text-emerald-400 font-mono">All 5 Operational Roles Enforced</span>
        </div>
      </div>

      {/* Security Audit Log Stream */}
      <div className="bg-[#0C101A] border border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-white/5">
        <div className="p-4 bg-white/5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <span>Timestamp &amp; Actor</span>
          <span>Security Event / Action</span>
          <span className="text-right">IP Address &amp; Status</span>
        </div>

        {AUDIT_LOGS.map((log) => (
          <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition text-xs font-mono">
            <div className="space-y-0.5">
              <div className="text-slate-400 text-[11px]">{log.timestamp}</div>
              <div className="font-bold text-purple-300">{log.actor}</div>
            </div>

            <div className="text-slate-200">
              {log.action}
            </div>

            <div className="text-right space-y-0.5">
              <div className="text-slate-400 text-[11px]">{log.ipAddress}</div>
              <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                log.status === "SUCCESS"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-300"
              }`}>
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* elara-stage-134 */
