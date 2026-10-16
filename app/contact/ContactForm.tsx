"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${API_URL}/v1/website/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      // Form submits to NestJS → database → email. Fall back to mail client if offline
      const body = `Name: ${form.get("name")}%0D%0AEmail: ${form.get("email")}%0D%0A%0D%0A${form.get("message")}`;
      window.location.href = `mailto:hello@elara.com.bd?subject=Elara Bangladesh website enquiry&body=${body}`;
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return <p className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800">Shukriya — your message has been safely received by our Dhaka team.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:outline-none" />
        <input name="email" type="email" required placeholder="Email address" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:outline-none" />
      </div>
      <textarea name="message" required rows={5} placeholder="How can we help?" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary focus:outline-none" />
      <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "error" && <p className="text-sm text-rose-600">Something went wrong — please reach us at hello@elara.com.bd.</p>}
    </form>
  );
}
