import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Elara Bangladesh team — support, merchant onboarding and enterprise partnerships.",
};

export default function ContactPage() {
  return (
    <section className="shell max-w-3xl py-14">
      <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-primary mb-4">
        <span>Get in Touch</span>
      </div>
      <h1 className="h1">Contact Elara</h1>
      <p className="lede mt-2">
        Questions about our Bangladesh ecosystem, merchant onboarding or API integrations? Our Dhaka operations desk is ready to help.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Dhaka Support", "support@elara.com.bd", "24/7 Consumer & Order Help"],
          ["Merchant Onboarding", "dokan@elara.com.bd", "Restaurants & Dokan Partners"],
          ["Fleet & Logistics", "fleet@elara.com.bd", "Rider & Courier Inquiries"],
        ].map(([t, e, d]) => (
          <div key={t} className="card">
            <h3 className="font-bold text-ink">{t}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{e}</p>
            <p className="mt-1 text-xs text-slate-500">{d}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10 !p-8">
        <h2 className="font-sans text-xl font-black text-ink">Send us a direct message</h2>
        <p className="text-xs font-mono text-slate-500 mt-1">Direct dispatch to our Dhaka headquarters ticketing queue</p>
        <ContactForm />
      </div>
    </section>
  );
}

/* elara-stage-119 */
