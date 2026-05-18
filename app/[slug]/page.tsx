import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, getModule, Module } from "@/lib/modules";
import { CITIES } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const moduleParams = MODULES.map((m) => ({ slug: m.slug }));
  const landingParams = MODULES.slice(0, 6).flatMap((m) =>
    CITIES.map((c) => ({ slug: `${m.slug}-in-${c.slug}` }))
  );
  return [...moduleParams, ...landingParams];
}

function parseLanding(slug: string) {
  const match = /^([a-z-]+)-in-([a-z-]+)$/.exec(slug);
  if (!match) return null;
  const mod = getModule(match[1]);
  const city = CITIES.find((c) => c.slug === match[2]);
  if (!mod || !city) return null;
  return { mod, city };
}

export function generateMetadata({ params }: Props): Metadata {
  const landing = parseLanding(params.slug);
  if (landing) {
    const title = `${landing.mod.title} in ${landing.city.name}`;
    return {
      title,
      description: `${title} — book with Elara in ${landing.city.name}. ${landing.mod.headline}.`,
      alternates: { canonical: `/${params.slug}` },
    };
  }
  const mod = getModule(params.slug);
  if (!mod) return {};
  return { title: mod.title, description: mod.description, alternates: { canonical: `/${mod.slug}` } };
}

export default function SlugPage({ params }: Props) {
  const landing = parseLanding(params.slug);
  if (landing) return <LandingPage mod={landing.mod} cityName={landing.city.name} citySlug={landing.city.slug} />;
  const mod = getModule(params.slug);
  if (!mod) notFound();
  return <ModulePage mod={mod} />;
}

function ModulePage({ mod }: { mod: Module }) {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-emerald-900 to-ink py-16 text-white">
        <div className="shell max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-emerald-300">
            <span>Elara Ecosystem</span>
            <span>•</span>
            <span>Bangladesh Hub</span>
          </div>
          <h1 className="mt-4 font-sans text-3xl font-black sm:text-5xl">{mod.headline}</h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">{mod.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cart" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-ink shadow-lg hover:bg-ivory transition-colors">
              Order Online
            </Link>
            <a href="#faq" className="rounded-xl border border-white/50 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors">
              Service FAQ
            </a>
          </div>
        </div>
      </section>

      <section className="shell grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {mod.features.map((ft) => (
          <div key={ft.title} className="card">
            <h3 className="font-bold text-ink text-base">{ft.title}</h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{ft.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-white py-14 border-y border-ink/10">
        <div className="shell">
          <h2 className="h2">Browse Categories</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {mod.categories.map((c) => (
              <span key={c} className="rounded-full border border-ink/20 bg-ivory px-5 py-2 text-sm font-semibold text-ink">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <h2 className="h2">Available Across Bangladesh Zones</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CITIES.map((c) => (
            <Link key={c.slug} href={`/${mod.slug}-in-${c.slug}`} className="rounded-xl border border-ink/10 bg-white p-4 text-xs font-mono font-semibold text-ink hover:border-primary hover:text-primary transition-all">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-surface-low py-14 border-t border-ink/10">
        <div className="shell max-w-3xl">
          <h2 className="h2">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {mod.faq.map((item) => (
              <details key={item.q} className="card cursor-pointer">
                <summary className="font-bold text-ink">{item.q}</summary>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function LandingPage({ mod, cityName, citySlug }: { mod: Module; cityName: string; citySlug: string }) {
  const faq = [
    { q: `How fast is ${mod.title.toLowerCase()} in ${cityName}?`, a: `Elara riders operate across ${cityName} with same-day express delivery. Live GPS tracking shows your exact ETA.` },
    { q: `How do I order ${mod.title.toLowerCase()} in ${cityName}?`, a: `Open the Elara web portal or mobile app, set your ${cityName} location, and order directly with bKash, Nagad or Cash on Delivery.` },
    { q: `Is Elara available in all neighborhoods of ${cityName}?`, a: `Coverage expands weekly across Bangladesh. Enter your specific address or road number to check live availability.` },
    ...mod.faq,
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: `${mod.title} in ${cityName}`, provider: { "@type": "Organization", name: "Elara Bangladesh" }, areaServed: cityName },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.elara.com.bd/" },
          { "@type": "ListItem", position: 2, name: mod.title, item: `https://www.elara.com.bd/${mod.slug}` },
          { "@type": "ListItem", position: 3, name: `${mod.title} in ${cityName}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: faq.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-gradient-to-br from-primary via-emerald-900 to-ink py-14 text-white">
        <div className="shell max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-wide text-emerald-300">Elara {cityName}</p>
          <h1 className="mt-2 font-sans text-3xl font-black sm:text-5xl">{mod.title} in {cityName}</h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">{mod.headline} — delivered across {cityName} by verified Elara Fleet riders.</p>
          <Link href="/cart" className="mt-8 inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-ink shadow-lg hover:bg-ivory transition-colors">
            Start Order in {cityName}
          </Link>
        </div>
      </section>

      <section className="shell grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {mod.features.map((ft) => (
          <div key={ft.title} className="card">
            <h3 className="font-bold text-ink">{ft.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{ft.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-white py-12 border-y border-ink/10">
        <div className="shell max-w-3xl">
          <h2 className="h2">Serving {cityName} &amp; Surrounding Hubs</h2>
          <p className="lede mt-3">
            Elara connects customers across {cityName} with authentic {mod.title.toLowerCase()} providers. Every order is tracked live, paid
            securely with bKash, Nagad, cards or COD, and backed by Elara 24/7 support.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== citySlug).slice(0, 5).map((c) => (
              <Link key={c.slug} href={`/${mod.slug}-in-${c.slug}`} className="rounded-full border border-ink/20 bg-ivory px-4 py-1.5 text-xs font-mono font-semibold text-ink hover:border-primary hover:text-primary transition-colors">
                Also in {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-surface-low py-12 border-t border-ink/10">
        <div className="shell max-w-3xl">
          <h2 className="h2">FAQ — {mod.title} in {cityName}</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="card cursor-pointer">
                <summary className="font-bold text-ink">{item.q}</summary>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

