"use client";

import { useState } from "react";
import Link from "next/link";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  pinStatus: "CONFIGURED" | "PENDING";
  shift: string;
  active: boolean;
}

const INITIAL_STAFF: StaffMember[] = [
  { id: "st1", name: "Md. Rafiqul Islam", role: "Head Master Chef", phone: "+880 1812-445566", pinStatus: "CONFIGURED", shift: "Morning (9 AM - 5 PM)", active: true },
  { id: "st2", name: "Al-Amin Hossain", role: "Kitchen Dispatcher & KDS", phone: "+880 1711-223344", pinStatus: "CONFIGURED", shift: "Evening (4 PM - 12 AM)", active: true },
  { id: "st3", name: "Shahadat Mia", role: "Cashier & Counter POS", phone: "+880 1913-998877", pinStatus: "CONFIGURED", shift: "Full Day", active: true },
  { id: "st4", name: "Kamrul Hasan", role: "Prep Helper", phone: "+880 1610-112233", pinStatus: "PENDING", shift: "Morning (9 AM - 5 PM)", active: false },
];

export default function MerchantStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Kitchen Prep");
  const [newPhone, setNewPhone] = useState("");

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: StaffMember = {
      id: `st${staff.length + 1}`,
      name: newName,
      role: newRole,
      phone: newPhone,
      pinStatus: "CONFIGURED",
      shift: "Day Shift",
      active: true,
    };
    setStaff([...staff, newMember]);
    setShowAddModal(false);
    setNewName("");
    setNewPhone("");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span>Dokan Console</span>
            <span>/</span>
            <span className="text-orange-600 font-bold">Staff Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
            Kitchen Staff &amp; 4-Digit PIN Access
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage chef, dispatcher, and counter staff access with secure 4-digit POS PIN logins
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          <span>Add New Staff Member</span>
        </button>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs divide-y divide-slate-100">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          <span>Staff Member &amp; Role</span>
          <div className="flex items-center gap-12">
            <span>Shift</span>
            <span className="w-24 text-right">PIN Status</span>
          </div>
        </div>

        {staff.map((member) => (
          <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 font-black flex items-center justify-center text-xs shrink-0">
                {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{member.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600">
                    {member.role}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {member.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 pl-13 sm:pl-0 text-xs">
              <span className="font-mono text-slate-600">{member.shift}</span>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold w-24 text-center ${
                member.pinStatus === "CONFIGURED"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}>
                {member.pinStatus === "CONFIGURED" ? "PIN Active" : "No PIN"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Staff Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Staff Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Mahfuzur Rahman"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kitchen Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <option value="Head Master Chef">Head Master Chef</option>
                  <option value="Kitchen Dispatcher & KDS">Kitchen Dispatcher &amp; KDS</option>
                  <option value="Cashier & Counter POS">Cashier &amp; Counter POS</option>
                  <option value="Prep Helper">Prep Helper</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Bangladesh Mobile (+880)</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
