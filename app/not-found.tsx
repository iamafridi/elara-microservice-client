import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-6xl font-extrabold text-primary">404</h1>
      <p className="mt-3 text-lg font-bold text-ink">We can&apos;t find that page</p>
      <p className="mt-1 text-sm text-slate-600">The page may have moved, or the service isn&apos;t available in your area yet.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/#download" className="btn-ghost">Get the App</Link>
      </div>
    </section>
  );
}

/* elara-stage-125 */
