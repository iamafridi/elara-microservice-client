"use client";

import { useState } from "react";

interface SavedAddress {
  id: string;
  tag: "Home" | "Work" | "Other";
  recipientName: string;
  phone: string;
  addressLine: string;
  thana: string;
  postcode: string;
  deliveryNotes: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr_1",
    tag: "Home",
    recipientName: "Rahim Ahmed",
    phone: "01712-849201",
    addressLine: "Flat 4-B, House 42, Road 11, Block D",
    thana: "Banani",
    postcode: "Dhaka-1213",
    deliveryNotes: "Call when entering Road 11. Security guard will open main gate.",
    isDefault: true,
  },
  {
    id: "addr_2",
    tag: "Work",
    recipientName: "Rahim Ahmed",
    phone: "01712-849201",
    addressLine: "Level 7, Lotus Kamal Tower, Plot 67/A Kemal Ataturk Avenue",
    thana: "Gulshan-2",
    postcode: "Dhaka-1212",
    deliveryNotes: "Leave at reception with receptionist Tasmia. No outside visitors on 7th floor.",
    isDefault: false,
  },
  {
    id: "addr_3",
    tag: "Other",
    recipientName: "Dr. Faruk Ahmed (Father)",
    phone: "01819-994433",
    addressLine: "House 18, Road 27 (Old), Dhanmondi R/A",
    thana: "Dhanmondi",
    postcode: "Dhaka-1209",
    deliveryNotes: "Ground floor apartment. Ring left bell.",
    isDefault: false,
  },
];

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Address Form State
  const [newTag, setNewTag] = useState<"Home" | "Work" | "Other">("Home");
  const [newRecipient, setNewRecipient] = useState("Rahim Ahmed");
  const [newPhone, setNewPhone] = useState("01712-849201");
  const [newAddressLine, setNewAddressLine] = useState("");
  const [newThana, setNewThana] = useState("Gulshan-1");
  const [newPostcode, setNewPostcode] = useState("Dhaka-1212");
  const [newNotes, setNewNotes] = useState("");

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    setToast("Default delivery location updated!");
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setToast("Address removed from your address book.");
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr_${Date.now()}`,
      tag: newTag,
      recipientName: newRecipient,
      phone: newPhone,
      addressLine: newAddressLine,
      thana: newThana,
      postcode: newPostcode,
      deliveryNotes: newNotes || "Deliver directly to front door.",
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddr]);
    setShowAddModal(false);
    setNewAddressLine("");
    setNewNotes("");
    setToast(`Saved "${newTag} — ${newThana}" to your address book!`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your residences, corporate offices, and family delivery points across Greater Dhaka
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add_location_alt</span>
          <span>Add New Address</span>
        </button>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {toast}</span>
          <button onClick={() => setToast(null)} className="text-white hover:text-emerald-100">✕</button>
        </div>
      )}

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-3xl border p-5 shadow-xs space-y-4 flex flex-col justify-between transition ${
              addr.isDefault
                ? "border-primary/50 ring-2 ring-primary/10"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      addr.tag === "Home"
                        ? "bg-blue-100 text-blue-800"
                        : addr.tag === "Work"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {addr.tag}
                  </span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      ★ Default Location
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-slate-400 hover:text-red-600 text-xs transition"
                  title="Delete address"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{addr.recipientName}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{addr.phone}</p>
              </div>

              <div className="text-xs text-slate-700 font-sans leading-relaxed">
                <p className="font-medium">{addr.addressLine}</p>
                <p className="text-slate-500 font-mono">{addr.thana}, {addr.postcode}</p>
              </div>

              {addr.deliveryNotes && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 font-mono">
                  <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider mb-0.5">
                    Rider Instruction:
                  </span>
                  &ldquo;{addr.deliveryNotes}&rdquo;
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {!addr.isDefault ? (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs font-mono font-bold text-primary hover:underline"
                >
                  Set as Default Location
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Active Destination</span>
                </span>
              )}

              <span className="text-[10px] font-mono text-slate-400">Dhaka North / South CC</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add New Dhaka Delivery Address</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4 text-xs font-sans">
              <div className="flex gap-2">
                {(["Home", "Work", "Other"] as const).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setNewTag(tag)}
                    className={`flex-1 py-2 rounded-xl font-mono font-bold text-xs capitalize transition ${
                      newTag === tag
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Street Address &amp; Building
                </label>
                <input
                  type="text"
                  required
                  value={newAddressLine}
                  onChange={(e) => setNewAddressLine(e.target.value)}
                  placeholder="e.g. Flat 6-A, House 24, Road 17, Block E"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Thana / Zone
                  </label>
                  <select
                    value={newThana}
                    onChange={(e) => setNewThana(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-primary bg-white"
                  >
                    <option value="Banani">Banani</option>
                    <option value="Gulshan-1">Gulshan-1</option>
                    <option value="Gulshan-2">Gulshan-2</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Uttara Sector 3">Uttara Sector 3</option>
                    <option value="Mirpur DOHS">Mirpur DOHS</option>
                    <option value="Mohakhali DOHS">Mohakhali DOHS</option>
                    <option value="Old Dhaka (Lalbagh)">Old Dhaka (Lalbagh)</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    required
                    value={newPostcode}
                    onChange={(e) => setNewPostcode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Delivery Notes for Rider
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Leave with guard, press bell on 3rd floor..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-sans focus:outline-hidden focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-mono font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold transition shadow-sm"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
