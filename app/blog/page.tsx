import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Product news, guides and stories from the Elara team.",
};

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <section className="shell py-14">
      <h1 className="h1">Elara Blog</h1>
      <p className="lede mt-2">Product news, engineering guides and stories from the team.</p>

      <Link href={`/blog/${featured.slug}`} className="card mt-10 block !p-8 hover:border-primary/40 transition">
        <span className="text-xs font-mono font-bold uppercase tracking-wide text-primary">Featured</span>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">{featured.title}</h2>
        <p className="mt-3 text-slate-600">{featured.excerpt}</p>
        <p className="mt-4 text-xs font-mono text-slate-600">
          {featured.author} • {featured.date} • {featured.readMinutes} min read
        </p>
      </Link>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card hover:border-primary/40 transition">
            <h3 className="font-bold text-ink text-base">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
            <p className="mt-4 text-xs font-mono text-slate-600">
              {p.author} • {p.date} • {p.readMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* elara-stage-184 */
