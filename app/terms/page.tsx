import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions — Elara Bangladesh" };

export default function TermsPage() {
  return (
    <section className="shell max-w-3xl py-14">
      <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-4">
        <span>Legal Terms</span>
      </div>
      <h1 className="h1">Terms &amp; Conditions</h1>
      <p className="mt-2 text-xs font-mono text-slate-500">Last updated: 1 March 2026 • Governed by the Laws of Bangladesh</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="font-bold text-ink text-base">1. About These Terms</h2>
          <p className="mt-2">These terms govern your use of the Elara super app and web portals, operated by Elara Technologies Bangladesh Ltd. (Trade License: TRAD/DNCC/014298/2026). By creating an account or placing an order you agree to these terms.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">2. Your Account &amp; Verification</h2>
          <p className="mt-2">You must provide an authentic Bangladesh mobile number (+880) and keep your account secure. Riders and JobTap taskers undergo National ID (NID) and background verification before activation.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">3. Orders, Pricing &amp; MFS Payments</h2>
          <p className="mt-2">All prices are displayed in Bangladesh Taka (৳ BDT) inclusive of applicable National Board of Revenue (NBR) VAT. Payments can be completed using bKash, Nagad, Visa, Mastercard or Cash on Delivery.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">4. JobTap 30% Escrow Protection</h2>
          <p className="mt-2">For on-demand home sheba (AC servicing, plumbing, electrical), 30% of the service fee is held in secure platform escrow and released only upon verified completion and customer inspection.</p>
        </section>
        <section>
          <h2 className="font-bold text-ink text-base">5. Contact &amp; Legal Jurisdiction</h2>
          <p className="mt-2">Legal inquiries: legal@elara.com.bd • Level 14, Simpletree Anarkali, 89 Gulshan Avenue, Dhaka-1212, Bangladesh.</p>
        </section>
      </div>
    </section>
  );
}
