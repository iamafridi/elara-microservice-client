import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/site";

export const metadata: Metadata = { title: "Blog" };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const related = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <article className="shell max-w-3xl py-14">
      <Link href="/blog" className="text-sm font-bold text-primary hover:underline">← All posts</Link>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-xs font-mono text-slate-600">
        {post.author} • {post.date} • {post.readMinutes} min read
      </p>
      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-slate-700">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-primary/10 border border-primary/20 p-6 sm:p-8">
        <h2 className="font-bold text-ink text-lg">Enjoyed this article?</h2>
        <p className="mt-1 text-sm text-slate-700">Get early access to the Elara Bangladesh Super App.</p>
        <Link href="/#waitlist" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-mono font-bold text-white hover:bg-primary-container transition shadow-md">
          Join App Waitlist →
        </Link>
      </div>

      <section className="mt-12 border-t border-ink/10 pt-8">
        <h2 className="h2 text-xl">Related Articles</h2>
        <div className="mt-4 space-y-3">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card block text-sm font-bold text-primary hover:text-primary-container transition">
              {p.title} →
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

/* elara-stage-151 */
