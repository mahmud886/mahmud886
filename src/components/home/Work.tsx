import Link from 'next/link';
import { moreProjects, projects } from '@/lib/data';
import BrowserFrame from '../BrowserFrame';
import SectionHead from './SectionHead';

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <SectionHead n="01" label="Selected work" title={<>Products in production, <span className="font-serif font-normal italic text-accent">used by real people.</span></>}>
        Each one built performance-first: measured, tested and shipped through CI — then made to feel good.
      </SectionHead>

      <div className="space-y-16 sm:space-y-24">
        {projects.map((p, i) => (
          <article key={p.slug} data-reveal className="group grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
            <Link href={`/projects/${p.slug}`} className={`block md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`} aria-label={`${p.title} case study`}>
              <BrowserFrame src={p.images[0]} url={p.link} alt={`${p.title} screenshot`} sizes="(min-width: 768px) 58vw, 100vw" />
            </Link>
            <div className="md:col-span-5">
              <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                <span>
                  <span className="text-accent">case_{String(i + 1).padStart(2, '0')}</span> · {p.kind}
                </span>
                <span>{p.period}</span>
              </div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.overview}</p>
              <ul className="mt-5 space-y-2">
                {p.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-3 text-[14px] leading-relaxed text-ink-2">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-5 text-sm font-medium">
                <Link href={`/projects/${p.slug}`} className="group/link inline-flex items-center gap-1.5 text-ink">
                  Read case study <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
                <a href={p.link} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink">
                  Live site ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div data-reveal className="mt-20">
        <div className="label mb-4">Also built</div>
        <div className="card divide-y divide-line">
          {moreProjects.map((p) => (
            <div key={p.title} className="grid gap-2 px-5 py-4 md:grid-cols-[180px_1fr_auto] md:items-baseline md:gap-8">
              <div className="font-semibold">{p.title}</div>
              <div className="text-[14px] leading-relaxed text-ink-2">{p.description}</div>
              <div className="font-mono text-[11px] text-muted md:text-right">{p.kind}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
