import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/data';
import ScreenGallery from '@/components/ScreenGallery';

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case study`,
    description: p.overview,
    openGraph: { title: `${p.title} — Case study`, description: p.overview, images: [{ url: p.screens[0].src, alt: p.title }] },
  };
}

function Chapter({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} data-reveal className="grid scroll-mt-24 gap-4 border-t border-ink pt-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
      <h2 className="flex gap-3 text-[1.35rem] font-bold tracking-[-0.03em]">
        <span className="pt-1.5 font-mono text-[11px] font-normal text-muted">{String(n).padStart(2, '0')}</span>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const meta = [
    { k: 'Status', v: p.status },
    { k: 'Timeline', v: p.period },
    { k: 'Context', v: p.association },
    { k: 'Tags', v: p.tags.join(', ') },
  ];

  return (
    <main className="px-[var(--pad)] pb-[clamp(80px,10vw,160px)] pt-[calc(var(--hh)+24px)]">
      <nav data-reveal className="label flex flex-wrap gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        /
        <Link href="/#products" className="hover:text-ink">
          Projects
        </Link>
        /<span className="text-ink">{p.title}</span>
      </nav>

      <header className="mt-[clamp(28px,4vw,60px)]">
        <p data-reveal className="label flex flex-wrap items-center gap-3">
          <span className="text-ink">
            Case {String(index + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
          </span>
          <span>{p.kind}</span>
        </p>
        <h1 data-reveal style={{ ['--i' as string]: 1 }} className="mt-3 text-[clamp(3.4rem,13vw,13rem)] font-extrabold leading-[0.82] tracking-[-0.07em]">
          {p.title}
          <span className="stop">.</span>
        </h1>
        <p data-reveal style={{ ['--i' as string]: 2 }} className="serif-i mt-[clamp(16px,2vw,32px)] max-w-[30ch] text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.08]">
          {p.tagline}
        </p>

        <div className="mt-[clamp(32px,4vw,64px)] grid gap-10 border-t border-ink pt-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <p data-reveal className="text-[clamp(1.25rem,2vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.02em]">
            {p.overview}
          </p>
          <div data-reveal style={{ ['--i' as string]: 1 }}>
            <dl className="divide-y divide-line border-y border-line text-[14px]">
              {meta.map((m) => (
                <div key={m.k} className="grid grid-cols-[110px_1fr] gap-4 py-2.5">
                  <dt className="label pt-0.5">{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="pill-solid">
                  Open live ↗
                </a>
              )}
              <a href="#screens" className="pill h-12 px-6">
                All {p.screens.length} screens ↓
              </a>
            </div>
          </div>
        </div>

        <dl data-reveal className="mt-[clamp(32px,4vw,64px)] grid grid-cols-3 border-y border-ink">
          {p.metrics.map((m, i) => (
            <div key={m.label} className={`py-5 ${i ? 'border-l border-line pl-4' : 'pr-4'}`}>
              <dd className="text-[clamp(2.2rem,6vw,5.5rem)] font-extrabold leading-[0.85] tracking-[-0.06em] tabular-nums">{m.value}</dd>
              <dt className="label mt-2">{m.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      <div data-reveal className="mt-[clamp(40px,6vw,96px)]">
        <ScreenGallery screens={p.screens} url={p.link} title={p.title} priority />
      </div>

      <article className="mx-auto mt-[clamp(64px,8vw,140px)] max-w-6xl space-y-[clamp(56px,7vw,110px)]">
        <Chapter id="problem" n={1} title="The problem">
          <p className="text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug tracking-[-0.015em]">{p.problem}</p>
          <p className="mt-6 text-[16px] leading-relaxed text-ink-2">
            <span className="label mr-2 !text-ink">My role</span>
            {p.role}
          </p>
        </Chapter>

        <Chapter id="built" n={2} title="What I built">
          <ol className="border-t border-line">
            {p.features.map((f, i) => (
              <li key={f} className="grid grid-cols-[40px_1fr] gap-3 border-b border-line py-4 text-[16px] leading-relaxed">
                <span className="pt-1 font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter id="stack" n={3} title="Stack">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="pill cursor-default">
                {s}
              </span>
            ))}
          </div>
        </Chapter>

        <Chapter id="milestones" n={4} title="Milestones">
          <ul className="space-y-2.5 text-[16px]">
            {p.milestones.map((m, i) => {
              const done = i < Math.round((p.progress / 100) * p.milestones.length);
              return (
                <li key={m} className="flex items-center gap-3">
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${done ? 'bg-ink text-paper' : 'border border-line text-muted'}`}>
                    {done ? '✓' : ''}
                  </span>
                  <span className={done ? '' : 'text-muted'}>{m}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <div className="label mb-2 flex justify-between">
              <span>Roadmap</span>
              <span className="text-ink">{p.progress}%</span>
            </div>
            <div className="h-[3px] bg-line">
              <div className="h-full bg-ink" style={{ width: `${p.progress}%` }} />
            </div>
          </div>
        </Chapter>
      </article>

      <section id="screens" aria-labelledby="screens-title" className="mt-[clamp(80px,10vw,160px)] scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <h2 id="screens-title" className="text-[clamp(2rem,4vw,3.4rem)] font-extrabold tracking-[-0.05em]">
            Every screen<span className="stop">.</span>
          </h2>
          <span className="label">{String(p.screens.length).padStart(2, '0')} screens</span>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {p.screens.map((s, i) => (
            <figure key={s.src} data-reveal style={{ ['--i' as string]: i % 2 }} className={i === 0 && p.screens.length % 2 ? 'md:col-span-2' : ''}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(12px,1.4vw,20px)] border border-line bg-paper-2">
                <Image src={s.src} alt={`${p.title} — ${s.label}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
              </div>
              <figcaption className="mt-3 flex gap-3 text-[14px]">
                <span className="font-mono text-[11px] leading-[1.6] text-muted">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Link href={`/projects/${next.slug}`} data-reveal data-cursor="Next case" className="index-row mt-[clamp(80px,10vw,160px)] block border-y border-ink px-1 py-6">
        <span className="index-muted label">Next case study · {next.kind}</span>
        <span className="mt-2 flex items-end justify-between gap-6">
          <span className="text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.07em]">{next.title}</span>
          <span aria-hidden className="mb-2 text-[clamp(2rem,4vw,3.5rem)]">
            →
          </span>
        </span>
      </Link>
    </main>
  );
}
