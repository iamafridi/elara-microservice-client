import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy" };

const COOKIES = [
  ["session", "Essential", "Keeps you signed in securely.", "Session"],
  ["elara_prefs", "Essential", "Remembers theme and language choices.", "1 year"],
  ["_ga", "Analytics", "Aggregated usage statistics (opt-out available).", "2 years"],
];

export default function CookiesPage() {
  return (
    <section className="shell max-w-3xl py-14">
      <h1 className="h1">Cookie Policy</h1>
      <p className="mt-2 text-xs font-mono text-slate-600">Last updated: 1 March 2026</p>
      <p className="mt-6 text-sm leading-relaxed text-slate-700">
        We use essential cookies to run the site and optional analytics cookies to understand usage. You can
        decline analytics at any time — the site still works fully without them.
      </p>
      <div className="mt-8 overflow-x-auto w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-mono uppercase text-slate-600">
              <th className="py-2.5 px-3">Cookie</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Purpose</th>
              <th className="py-2.5 px-3">Lifetime</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES.map(([name, type, purpose, life]) => (
              <tr key={name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
                <td className="py-3 px-3 font-mono text-xs font-bold text-ink">{name}</td>
                <td className="py-3 px-3 text-xs font-medium text-slate-700">{type}</td>
                <td className="py-3 px-3 text-xs text-slate-600">{purpose}</td>
                <td className="py-3 px-3 text-xs font-mono text-slate-500">{life}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* elara-stage-152 */
