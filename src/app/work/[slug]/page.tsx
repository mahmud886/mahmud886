import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { experience, shortCompany } from '@/lib/data';
import { clip, jobSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return experience.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = experience.find((x) => x.slug === slug);
  if (!j) return {};
  const title = `${j.role} at ${j.company}`;
  const description = clip(`${j.summary} ${j.period}. ${j.tech.join(', ')}.`);
  return {
    title,
    description,
    alternates: { canonical: `/work/${j.slug}` },
    openGraph: { type: 'article', url: `/work/${j.slug}`, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = experience.findIndex((j) => j.slug === slug);
  if (index === -1) notFound();
  const j = experience[index];
  const newer = experience[index - 1];
  const older = experience[index + 1];
  const lines = [...j.resume, ...j.responsibilities];

  return (
    <main className="px-[var(--pad)] pb-[clamp(80px,10vw,160px)] pt-[calc(var(--hh)+24px)]">
      <JsonLd data={jobSchema(j.slug)} />
      <nav data-reveal className="label flex gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        /
        <Link href="/#experience" className="hover:text-ink">
          Experience
        </Link>
        /<span className="text-ink">{shortCompany(j.company)}</span>
      </nav>

      <header className="mt-[clamp(28px,4vw,60px)]">
        <p data-reveal className="label flex items-center gap-3">
          <span>{j.period}</span>
          {j.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-current px-2 py-0.5 text-ink">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Now
            </span>
          )}
        </p>
        <h1 data-reveal style={{ ['--i' as string]: 1 }} className="mt-3 text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.84] tracking-[-0.065em]">
          {shortCompany(j.company)}
          <span className="stop">.</span>
        </h1>
        <p data-reveal style={{ ['--i' as string]: 2 }} className="serif-i mt-6 text-[clamp(1.5rem,3vw,2.6rem)] leading-none">
          {j.role} <span className="not-italic text-muted">at {j.company}</span>
        </p>
      </header>

      <div className="mt-[clamp(32px,4vw,64px)] grid gap-10 border-t border-ink pt-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        <div data-reveal>
          <p className="text-[clamp(1.25rem,2vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.02em]">{j.summary}</p>
          {j.companyUrl && (
            <a href={j.companyUrl} target="_blank" rel="noreferrer" className="pill mt-6">
              {j.companyUrl.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
            </a>
          )}
        </div>
        <div data-reveal style={{ ['--i' as string]: 1 }} className="space-y-8">
          <div>
            <div className="label mb-3">Highlights</div>
            <ul className="space-y-2">
              {j.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-[11px] h-px w-4 shrink-0 bg-ink" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label mb-3">Tools</div>
            <div className="flex flex-wrap gap-1.5">
              {j.tech.map((t) => (
                <span key={t} className="pill cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section data-reveal aria-labelledby="did-title" className="mx-auto mt-[clamp(64px,8vw,130px)] max-w-6xl">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <h2 id="did-title" className="text-[1.35rem] font-bold tracking-[-0.03em]">
            What I did
          </h2>
          <span className="label">{String(lines.length).padStart(2, '0')} lines</span>
        </div>
        <ol>
          {lines.map((r, i) => (
            <li key={`${i}-${r}`} className="grid grid-cols-[48px_1fr] gap-3 border-b border-line py-4 text-[16px] leading-relaxed">
              <span className="pt-1 font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              {r}
            </li>
          ))}
        </ol>
      </section>

      <div data-reveal className="mt-[clamp(64px,8vw,130px)] grid border-y border-ink md:grid-cols-2">
        {newer ? (
          <Link href={`/work/${newer.slug}`} className="index-row block px-1 py-6 md:border-r md:border-line">
            <span className="index-muted label">← Newer</span>
            <span className="mt-2 block text-[clamp(1.8rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em]">{shortCompany(newer.company)}</span>
          </Link>
        ) : (
          <Link href="/#experience" className="index-row block px-1 py-6 md:border-r md:border-line">
            <span className="index-muted label">← Back</span>
            <span className="mt-2 block text-[clamp(1.8rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em]">All experience</span>
          </Link>
        )}
        {older && (
          <Link href={`/work/${older.slug}`} className="index-row block border-t border-line px-1 py-6 text-right md:border-t-0">
            <span className="index-muted label">Older →</span>
            <span className="mt-2 block text-[clamp(1.8rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em]">{shortCompany(older.company)}</span>
          </Link>
        )}
      </div>
    </main>
  );
}
