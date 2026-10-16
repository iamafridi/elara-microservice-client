"use client";

import { useState } from "react";
import Link from "next/link";

interface KycDocument {
  id: string;
  name: string;
  authority: string;
  docNumber: string;
  expiry: string;
  status: "VERIFIED" | "PENDING_REVIEW" | "EXPIRING_SOON";
  icon: string;
}

const DOCUMENTS: KycDocument[] = [
  {
    id: "doc-1",
    name: "Bangladesh Election Commission Smart NID",
    authority: "NID Wing, Election Commission BD",
    docNumber: "5918 2049 1042",
    expiry: "Lifetime",
    status: "VERIFIED",
    icon: "badge"
  },
  {
    id: "doc-2",
    name: "BRTA Professional Motorcycle Driving License",
    authority: "BRTA Mirpur Circle, Dhaka",
    docNumber: "DL-DH-2021-98402",
    expiry: "14 Aug 2031",
    status: "VERIFIED",
    icon: "two_wheeler"
  },
  {
    id: "doc-3",
    name: "BRTA Motorcycle Bluebook & Digital Registration Card",
    authority: "BRTA Dhaka Metro HA-4920",
    docNumber: "REG-DM-HA-4920",
    expiry: "Valid (Tax Token 2027)",
    status: "VERIFIED",
    icon: "description"
  },
  {
    id: "doc-4",
    name: "Motorcycle 3rd Party Road Insurance & Fitness",
    authority: "Green Delta Insurance BD",
    docNumber: "POL-GDI-994821",
    expiry: "30 Nov 2026",
    status: "EXPIRING_SOON",
    icon: "health_and_safety"
  }
];

export default function RiderKycPage() {
  const [documents, setDocuments] = useState<KycDocument[]>(DOCUMENTS);
  const [uploadModalDoc, setUploadModalDoc] = useState<KycDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSimulateUpload = () => {
    if (!uploadModalDoc) return;
    setToastMessage(`New document copy uploaded for ${uploadModalDoc.name}. Under verification.`);
    setUploadModalDoc(null);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Legal Compliance & Verification
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
              BRTA Verified Fleet
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
            Rider Identity & Vehicle KYC
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            Active On-Road Status: Approved
          </span>
        </div>
      </div>

      {/* Vehicle Summary Banner */}
      <div className="bg-[#131927] border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">two_wheeler</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Yamaha FZ-X (150cc)</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                Dhaka Metro HA-4920
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Assigned Fleet Zone: Banani / Gulshan / Mohakhali Corridor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs hidden sm:block">
            <div className="text-slate-400">Hub Dispatcher Contact</div>
            <div className="text-white font-bold">Banani Hub • 01711-223344</div>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Required Regulatory Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-3 hover:border-white/20 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B0F19] text-emerald-400 flex items-center justify-center border border-white/5">
                    <span className="material-symbols-outlined text-xl">{doc.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{doc.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.authority}</p>
                  </div>
                </div>

                {doc.status === "VERIFIED" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Verified
                  </span>
                )}
                {doc.status === "EXPIRING_SOON" && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Renew Soon
                  </span>
                )}
              </div>

              <div className="bg-[#0B0F19] p-3 rounded-xl border border-white/5 space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Document No:</span>
                  <span className="text-slate-200 font-bold">{doc.docNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validity:</span>
                  <span className={doc.status === "EXPIRING_SOON" ? "text-amber-400 font-bold" : "text-slate-300"}>
                    {doc.expiry}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 font-mono">
                  {doc.status === "EXPIRING_SOON" ? "Requires update before 30 Nov" : "Verified by Elara Ops"}
                </span>
                <button
                  type="button"
                  onClick={() => setUploadModalDoc(doc)}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#0B0F19] hover:bg-white/10 text-slate-200 border border-white/10 transition"
                >
                  Update File
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact & Nominee Card */}
      <div className="bg-[#131927] border border-white/10 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-rose-400 text-sm">emergency</span>
          <span>Emergency Nominee & Life Insurance Beneficiary</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-[#0B0F19] p-3 rounded-xl border border-white/5">
            <span className="text-slate-500 block text-[10px] uppercase">Nominee Name</span>
            <span className="text-white font-bold">Nasima Begum (Spouse)</span>
          </div>
          <div className="bg-[#0B0F19] p-3 rounded-xl border border-white/5">
            <span className="text-slate-500 block text-[10px] uppercase">Emergency Phone</span>
            <span className="text-emerald-400 font-bold">+880 1819-204918</span>
          </div>
          <div className="bg-[#0B0F19] p-3 rounded-xl border border-white/5">
            <span className="text-slate-500 block text-[10px] uppercase">Rider Insurance Coverage</span>
            <span className="text-white font-bold">৳ 5,00,000 (Road accidental)</span>
          </div>
        </div>
      </div>

      {/* Document Upload Modal */}
      {uploadModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#131927] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Upload {uploadModalDoc.name}</h3>
              <button
                onClick={() => setUploadModalDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Take a clear, well-lit photo of both front and back sides. Text and seals must be legible without glare.
            </p>

            <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center space-y-2 hover:border-emerald-500/50 transition cursor-pointer">
              <span className="material-symbols-outlined text-3xl text-emerald-400">cloud_upload</span>
              <div className="text-xs font-bold text-white">Tap to upload photo or PDF</div>
              <div className="text-[10px] text-slate-500 font-mono">Max size 10MB • JPG, PNG, PDF</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUploadModalDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulateUpload}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Submit for Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
