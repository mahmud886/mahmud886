import Link from 'next/link';
import { fetchMediumPosts } from '@/lib/medium';
import { profile } from '@/lib/data';

const fmt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default async function Writing() {
  const posts = (await fetchMediumPosts('mahmud886')).slice(0, 6);
  if (!posts.length) return null;
  const medium = profile.socials.find((s) => s.label === 'Medium')!.href;
  return (
    <section id="writing" aria-labelledby="writing-title" className="px-[var(--pad)] pb-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <h2 id="writing-title" className="chapter">
          Notes<span className="serif-i font-normal">, written down</span>
          <span className="stop">.</span>
        </h2>
        <a href={medium} target="_blank" rel="noreferrer" className="pill">
          All posts on Medium ↗
        </a>
      </div>
      <ol className="border-t border-ink">
        {posts.map((p, i) => (
          <li key={p.slug} className="index-row border-b border-line" data-reveal style={{ ['--i' as string]: i }}>
            <Link
              href={`/blog/${p.slug}`}
              data-cursor="Read"
              className="grid gap-x-6 gap-y-1 px-1 py-5 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,0.5fr)_24px] md:items-baseline"
            >
              <time className="index-muted font-mono text-[11px] uppercase tracking-[0.1em] text-muted" dateTime={p.pubDate}>
                {fmt.format(new Date(p.pubDate))}
              </time>
              <span className="text-[clamp(1.25rem,2.1vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.035em]">{p.title}</span>
              <span className="index-muted hidden truncate font-mono text-[11px] text-muted md:block">{p.categories.slice(0, 3).join(' · ')}</span>
              <span aria-hidden className="hidden text-xl md:block">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
