import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import BrowserFrame from '@/components/BrowserFrame';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case study`,
    description: p.overview,
    openGraph: { title: `${p.title} — Case study`, description: p.overview, images: [{ url: p.images[0], alt: p.title }] },
  };
}

const toc = [
  { id: 'context', label: 'Context' },
  { id: 'built', label: 'What I built' },
  { id: 'stack', label: 'Stack' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'gallery', label: 'Gallery' },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const meta = [
    { k: 'Status', v: p.status },
    { k: 'Timeline', v: p.period },
    { k: 'Context', v: p.association },
    { k: 'Tags', v: p.tags.join(', ') },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <nav data-reveal className="font-mono text-[12px] text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">
          ~
        </Link>
        {' / '}
        <Link href="/#work" className="hover:text-ink">
          work
        </Link>
        {' / '}
        <span className="text-ink">{p.slug}</span>
      </nav>

      <header className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <div data-reveal className="label">
            <span className="text-accent">case_{String(index + 1).padStart(2, '0')}</span> · {p.kind}
          </div>
          <h1 data-reveal style={{ ['--i' as string]: 1 }} className="mt-3 font-display text-5xl font-bold tracking-[-0.035em] sm:text-7xl">
            {p.title}
          </h1>
          <p data-reveal style={{ ['--i' as string]: 2 }} className="mt-4 text-lg leading-relaxed text-ink-2 sm:text-xl">
            {p.overview}
          </p>
        </div>
        <div data-reveal style={{ ['--i' as string]: 3 }}>
          <dl className="divide-y divide-line border-y border-line font-mono text-[12.5px]">
            {meta.map((m) => (
              <div key={m.k} className="grid grid-cols-[100px_1fr] gap-4 py-2.5">
                <dt className="text-muted">{m.k}</dt>
                <dd>{m.v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-pop px-5 py-3 text-sm font-semibold text-pop-ink transition-transform hover:scale-[1.03]"
          >
            Visit live site ↗
          </a>
        </div>
      </header>

      <div data-reveal className="mt-12">
        <BrowserFrame src={p.images[0]} url={p.link} alt={`${p.title} home screen`} priority sizes="(min-width: 1152px) 1152px, 100vw" />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="label mb-3">Contents</div>
            <ol className="space-y-2 font-mono text-[12px]">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-muted hover:text-ink">
                    <span className="text-accent">{i + 1}.</span> {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className="max-w-3xl space-y-16">
          <section id="context" data-reveal className="scroll-mt-24">
            <h2 className="label mb-4">
              <span className="text-accent">1.</span> Context
            </h2>
            <p className="text-xl leading-relaxed sm:text-2xl">{p.description}</p>
          </section>

          <section id="built" data-reveal className="scroll-mt-24">
            <h2 className="label mb-4">
              <span className="text-accent">2.</span> What I built
            </h2>
            <ol className="card divide-y divide-line">
              {p.features.map((f, i) => (
                <li key={f} className="grid grid-cols-[40px_1fr] gap-3 px-5 py-4 text-[15px] leading-relaxed">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {f}
                </li>
              ))}
            </ol>
          </section>

          <section id="stack" data-reveal className="scroll-mt-24">
            <h2 className="label mb-4">
              <span className="text-accent">3.</span> Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md border border-line bg-paper px-3 py-1.5 font-mono text-[12.5px]">
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section id="milestones" data-reveal className="scroll-mt-24">
            <h2 className="label mb-4">
              <span className="text-accent">4.</span> Milestones
            </h2>
            <ul className="space-y-2 font-mono text-[13px]">
              {p.milestones.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className="grid h-4 w-4 place-items-center rounded border border-line text-[10px] text-ok">✓</span>
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="mb-1.5 flex justify-between font-mono text-[11px] text-muted">
                <span>roadmap</span>
                <span>{p.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-paper-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          </section>

          <section id="gallery" data-reveal className="scroll-mt-24">
            <h2 className="label mb-4">
              <span className="text-accent">5.</span> Gallery
            </h2>
            <div className="space-y-6">
              {p.images.slice(1).map((src, i) => (
                <BrowserFrame key={src} src={src} url={p.link} alt={`${p.title} screen ${i + 2}`} sizes="(min-width: 1024px) 768px, 100vw" />
              ))}
            </div>
          </section>
        </article>
      </div>

      <Link href={`/projects/${next.slug}`} data-reveal className="group mt-24 flex items-end justify-between gap-6 border-t border-line pt-6">
        <div>
          <div className="label">Next case study</div>
          <div className="mt-2 font-display text-4xl font-bold tracking-tight transition-colors group-hover:text-accent sm:text-6xl">{next.title}</div>
        </div>
        <span className="mb-2 text-3xl transition-transform group-hover:translate-x-2">→</span>
      </Link>
    </main>
  );
}
