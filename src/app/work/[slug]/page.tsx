import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { experience, profile } from '@/lib/data';
import { shortSha } from '@/lib/sha';

export function generateStaticParams() {
  return experience.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = experience.find((x) => x.slug === slug);
  return j ? { title: `${j.role} at ${j.company}`, description: j.summary } : {};
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = experience.findIndex((j) => j.slug === slug);
  if (index === -1) notFound();
  const j = experience[index];
  const newer = experience[index - 1];
  const older = experience[index + 1];
  const sha = shortSha(j.slug);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <nav data-reveal className="font-mono text-[12px] text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">
          ~
        </Link>
        {' / '}
        <Link href="/#experience" className="hover:text-ink">
          experience
        </Link>
        {' / '}
        <span className="text-ink">{j.slug}</span>
      </nav>

      <div data-reveal className="mt-6 font-mono text-[12px] text-muted">
        <span className="text-ok">$</span> git show {sha}
      </div>

      <div data-reveal className="card ticks mt-3 overflow-hidden">
        <div className="space-y-1 border-b border-line bg-paper-2 px-5 py-4 font-mono text-[12.5px]">
          <div>
            <span className="text-[#b58900] dark:text-[#e5c07b]">commit {sha}</span>
            {j.current && (
              <span className="text-muted">
                {' '}
                (<span className="text-link">HEAD</span> → <span className="text-ok">main</span>)
              </span>
            )}
          </div>
          <div className="text-ink-2">
            Author: {profile.name} &lt;{profile.email}&gt;
          </div>
          <div className="text-ink-2">Date:&nbsp;&nbsp; {j.period}</div>
        </div>

        <div className="px-5 py-8 sm:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {j.role} <span className="text-muted">@</span> {j.company}
          </h1>
          <p className="mt-4 font-serif text-2xl leading-snug text-ink-2">{j.summary}</p>
          {j.companyUrl && (
            <a href={j.companyUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block font-mono text-[12px] text-link hover:underline">
              {j.companyUrl.replace('https://', '')} ↗
            </a>
          )}
        </div>

        <div className="border-t border-line">
          <div className="flex justify-between bg-paper-2 px-5 py-2 font-mono text-[11px] text-muted">
            <span>responsibilities.md</span>
            <span>
              <span className="text-ok">+{j.responsibilities.length + j.resume.length}</span> <span className="text-accent">-0</span>
            </span>
          </div>
          <ul className="py-2 font-mono text-[13px] leading-relaxed">
            {[...j.resume, ...j.responsibilities].map((r, i) => (
              <li key={`${i}-${r}`} className="grid grid-cols-[36px_16px_1fr] gap-1 px-3 py-1 hover:bg-ok/5 sm:px-5">
                <span className="select-none text-right text-muted/60">{i + 1}</span>
                <span className="select-none text-ok">+</span>
                <span className="text-ink-2">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div data-reveal>
          <div className="label mb-3">Highlights</div>
          <ul className="space-y-2">
            {j.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                <span className="mt-[10px] h-px w-3 shrink-0 bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <div className="label mb-3">Tools</div>
          <div className="flex flex-wrap gap-1.5">
            {j.tech.map((t) => (
              <span key={t} className="rounded border border-line px-2 py-1 font-mono text-[12px]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div data-reveal className="mt-16 grid gap-3 border-t border-line pt-6 font-mono text-[12.5px] sm:grid-cols-2">
        {newer ? (
          <Link href={`/work/${newer.slug}`} className="group rounded-md border border-line p-4 hover:border-ink/30">
            <div className="text-muted">← newer</div>
            <div className="mt-1 text-ink group-hover:text-accent">{newer.company}</div>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link href={`/work/${older.slug}`} className="group rounded-md border border-line p-4 text-right hover:border-ink/30">
            <div className="text-muted">older →</div>
            <div className="mt-1 text-ink group-hover:text-accent">{older.company}</div>
          </Link>
        )}
      </div>
    </main>
  );
}
