import Link from 'next/link';
import { fetchMediumPosts } from '@/lib/medium';
import { profile } from '@/lib/data';
import SectionHead from './SectionHead';

export default async function Writing() {
  const posts = (await fetchMediumPosts('mahmud886')).slice(0, 5);
  if (!posts.length) return null;
  const medium = profile.socials.find((s) => s.label === 'Medium')!.href;
  return (
    <section id="writing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <SectionHead n="04" label="Writing" title={<>Notes, <span className="font-serif font-normal italic text-accent">written down.</span></>}>
        Interview prep, JavaScript deep-dives and things I learned the hard way — on Medium.
      </SectionHead>
      <ul className="card divide-y divide-line">
        {posts.map((p) => (
          <li key={p.slug} data-reveal>
            <Link href={`/blog/${p.slug}`} className="group grid gap-1 px-5 py-4 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-6">
              <time className="font-mono text-[11px] text-muted" dateTime={p.pubDate}>
                {new Date(p.pubDate).toISOString().slice(0, 10)}
              </time>
              <span className="font-medium leading-snug transition-colors group-hover:text-accent">{p.title}</span>
              <span className="hidden font-mono text-xs text-muted transition-transform group-hover:translate-x-1 sm:block">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <a href={medium} target="_blank" rel="noreferrer" className="mt-4 inline-block font-mono text-[12px] text-link hover:underline">
        All posts on Medium ↗
      </a>
    </section>
  );
}
