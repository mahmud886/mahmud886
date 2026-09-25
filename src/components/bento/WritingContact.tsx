import Link from 'next/link';
import { fetchMediumPosts } from '@/lib/medium';
import { profile } from '@/lib/data';
import Heading from './Heading';
import Tile from './Tile';
import CopyEmail from './CopyEmail';

export default async function WritingContact() {
  const posts = (await fetchMediumPosts('mahmud886')).slice(0, 4);
  const medium = profile.socials.find((s) => s.label === 'Medium')!.href;
  return (
    <>
      <Heading id="writing" kicker="Writing & contact" title="Notes, and how to reach me." />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        {posts.length > 0 && (
          <Tile className="p-2 sm:p-3 lg:col-span-7">
            <div className="flex items-center justify-between px-4 pb-1 pt-4 text-[12px] font-medium text-muted">
              <span>Latest on Medium</span>
              <a href={medium} target="_blank" rel="noreferrer" className="hover:text-ink">
                All posts ↗
              </a>
            </div>
            <ul>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-4 rounded-[20px] p-4 transition-colors hover:bg-paper-2/70">
                    <span>
                      <span className="block font-medium leading-snug">{p.title}</span>
                      <span className="text-[12px] text-muted">
                        {new Date(p.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </span>
                    <span className="text-muted transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Tile>
        )}

        <div id="contact" className="grid scroll-mt-28 gap-3 lg:col-span-5">
          <Tile delay={0.06} className="flex flex-col justify-between bg-pop! p-7 text-pop-ink">
            <div>
              <div className="text-[12px] font-semibold opacity-70">Let&apos;s talk</div>
              <div className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight">Have a product that needs to feel great?</div>
              <p className="mt-3 text-[15px] leading-relaxed opacity-80">Full-time roles, contracts or a hard frontend problem — I reply within a day.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={`mailto:${profile.email}`} className="inline-flex h-11 items-center rounded-full bg-pop-ink px-5 text-sm font-semibold text-pop">
                Email me →
              </a>
              <CopyEmail />
            </div>
          </Tile>
          <Tile delay={0.12} className="flex items-center justify-between gap-4 p-6">
            <div>
              <div className="font-display text-xl font-bold">Resume</div>
              <div className="text-[13px] text-muted">One page of the good stuff · PDF</div>
            </div>
            <div className="flex gap-2">
              <Link href="/resume" className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-medium hover:bg-paper-2">
                View
              </Link>
              <a href={profile.cv} download={`${profile.cvName}.pdf`} className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-paper">
                ↓ PDF
              </a>
            </div>
          </Tile>
        </div>
      </div>
    </>
  );
}
