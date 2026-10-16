import Link from "next/link";

type EntryConfig = {
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  bullets: { title: string; text: string }[];
  steps?: string[];
};

export default function EntryPage({ cfg }: { cfg: EntryConfig }) {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-emerald-900 to-ink py-16 text-white">
        <div className="shell max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">{cfg.eyebrow}</p>
          <h1 className="mt-2 font-sans text-3xl font-black sm:text-5xl">{cfg.headline}</h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">{cfg.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#apply" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-ink shadow-lg hover:bg-ivory transition-colors">{cfg.cta}</a>
          </div>
        </div>
      </section>

      <section className="shell grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {cfg.bullets.map((b) => (
          <div key={b.title} className="card">
            <h3 className="font-bold text-ink text-base">{b.title}</h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{b.text}</p>
          </div>
        ))}
      </section>

      {cfg.steps && (
        <section className="bg-white py-14 border-y border-ink/10">
          <div className="shell">
            <h2 className="h2">How It Works</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-4">
              {cfg.steps.map((s, i) => (
                <li key={s} className="card">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-black text-white">{i + 1}</span>
                  <p className="mt-3 text-sm font-bold text-ink">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section id="apply" className="shell py-14 text-center">
        <h2 className="h2">{cfg.cta}</h2>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact" className="btn-primary"> Apply Now</Link>
          <Link href="/" className="btn-ghost">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
