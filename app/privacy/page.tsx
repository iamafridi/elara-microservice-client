import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — Elara Bangladesh" };

export default function PrivacyPage() {
  return (
    <section className="shell max-w-3xl py-14">
      <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-4">
        <span>Data Privacy</span>
      </div>
      <h1 className="h1">Privacy Policy</h1>
      <p className="mt-2 text-xs font-mono text-slate-500">Last updated: 1 March 2026 • Compliant with Bangladesh Digital Security Act</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="font-bold text-ink text-base">1. Who We Are</h2>
          <p className="mt-2">Elara Technologies Bangladesh Ltd. is the data controller for Elara services across Bangladesh. Contact: privacy@elara.com.bd.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">2. What We Collect</h2>
          <p className="mt-2">Account details (name, +880 phone, email), delivery addresses, order history, and — with your permission — device GPS location for hyper-local delivery tracking.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">3. How We Use It</h2>
          <p className="mt-2">To dispatch orders, calculate accurate delivery ETAs, facilitate secure MFS payments via bKash and Nagad, prevent fraudulent claims and ensure rider safety.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">4. Your Rights</h2>
          <p className="mt-2">You may access, update, export or request deletion of your account and personal data at any time via in-app profile settings or by contacting privacy@elara.com.bd.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">5. Security &amp; Data Residency</h2>
          <p className="mt-2">All customer and financial transaction data is stored with TLS 1.3 encryption in transit and AES-256 encryption at rest, complying with Bangladesh Bank guidelines.</p>
        </section>
      </div>
    </section>
  );
}
