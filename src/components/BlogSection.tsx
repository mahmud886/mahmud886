import Link from 'next/link';
import { fetchMediumPosts } from '@/lib/medium';
import { profile } from '@/lib/data';
import Reveal from './Reveal';

export default async function BlogSection() {
  const posts = (await fetchMediumPosts('mahmud886')).slice(0, 4);
  if (!posts.length) return null;
  const medium = profile.socials.find((s) => s.label === 'Medium')!.href;

  return (
    <section id="writing" className="relative z-10 px-4 py-16 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">— Writing</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Notes from the <span className="text-gradient">lab.</span>
            </h2>
          </div>
          <a href={medium} target="_blank" rel="noreferrer" className="hidden shrink-0 text-sm text-muted transition-colors hover:text-foreground sm:block">
            All posts on Medium ↗
          </a>
        </div>

        <Reveal className="divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-reveal
              data-cursor="Read"
              className="group relative flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-8 sm:py-8"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-500 group-hover:scale-y-100" />
              <time className="relative w-32 shrink-0 font-mono text-xs text-muted" dateTime={post.pubDate}>
                {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
              <h3 className="relative flex-1 font-display text-xl font-bold leading-snug transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                {post.title}
              </h3>
              {post.categories[0] && <span className="relative eyebrow">{post.categories[0]}</span>}
              <span className="relative hidden text-2xl transition-transform duration-300 group-hover:-rotate-45 sm:block">→</span>
            </Link>
          ))}
        </Reveal>
        <a href={medium} target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm text-muted sm:hidden">
          All posts on Medium ↗
        </a>
      </div>
    </section>
  );
}
