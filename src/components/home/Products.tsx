import Link from 'next/link';
import { saas, type CaseStudy } from '@/lib/data';
import ScreenGallery from '@/components/ScreenGallery';

const isLive = (status: string) => /live|beta/i.test(status);

function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-current px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em]">
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${isLive(status) ? 'animate-pulse' : 'opacity-50'}`} />
      {status}
    </span>
  );
}

/** One product as a full chapter: name, the screens, the problem, what I built, the numbers. */
function Product({ p, i }: { p: CaseStudy; i: number }) {
  const n = String(saas.length).padStart(2, '0');
  return (
    <article
      id={p.slug}
      aria-labelledby={`${p.slug}-title`}
      className={`scroll-mt-0 px-[var(--pad)] ${i ? 'pt-[clamp(72px,9vw,150px)]' : 'pt-[clamp(24px,3vw,48px)]'} pb-[clamp(72px,9vw,150px)] ${i % 2 ? 'inv' : ''}`}
    >
      <header className="border-t border-ink pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label !text-ink">
            {String(i + 1).padStart(2, '0')} / {n}
          </span>
          <span className="label">{p.kind}</span>
          <StatusPill status={p.status} />
        </div>
        <h3 id={`${p.slug}-title`} className="mt-4 text-[clamp(3.2rem,10vw,10.5rem)] font-extrabold leading-[0.84] tracking-[-0.07em]">
          {p.title}
          <span className="stop">.</span>
        </h3>
        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <p className="serif-i max-w-[34ch] text-[clamp(1.35rem,2.4vw,2.2rem)] leading-[1.12]">{p.tagline}</p>
          <dl className="grid grid-cols-3 border-t border-line">
            {p.metrics.map((m, k) => (
              <div key={m.label} className={`pt-3 ${k ? 'border-l border-line pl-4' : 'pr-4'}`}>
                <dd className="text-[clamp(1.9rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.06em] tabular-nums">{m.value}</dd>
                <dt className="label mt-2">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-[clamp(32px,4vw,64px)]">
        <ScreenGallery screens={p.screens} url={p.link} title={p.title} priority={i === 0} />
      </div>

      <div className="mt-[clamp(36px,4vw,64px)] grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] lg:gap-14">
        <div>
          <h4 className="label mb-3">The problem</h4>
          <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] font-medium leading-snug tracking-[-0.015em]">{p.problem}</p>
          <h4 className="label mb-2 mt-7">My role</h4>
          <p className="text-[15px] leading-relaxed text-ink-2">{p.role}</p>
        </div>
        <div>
          <h4 className="label mb-3">What I built</h4>
          <ol className="border-t border-line">
            {p.features.slice(0, 5).map((f, k) => (
              <li key={f} className="grid grid-cols-[32px_1fr] gap-2 border-b border-line py-3 text-[14.5px] leading-relaxed">
                <span className="pt-0.5 font-mono text-[10.5px] text-muted">{String(k + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-7">
          <div>
            <h4 className="label mb-3">Built with</h4>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1.5 text-[12px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            <Link href={`/projects/${p.slug}`} className="pill-solid">
              Case study →
            </Link>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="pill h-12 px-6">
                Open live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="pt-[clamp(60px,8vw,130px)]">
      <div className="px-[var(--pad)] pb-[clamp(20px,3vw,40px)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="products-title" className="chapter">
            SaaS I build<span className="stop">.</span>
          </h2>
          <p className="max-w-[40ch] text-[15px] leading-snug text-ink-2">
            Four products I design and engineer end to end — multi-tenant, bilingual and built for how shops in Bangladesh and beyond actually work.
          </p>
        </div>
        <nav aria-label="Products" className="mt-[clamp(28px,4vw,56px)] grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {saas.map((p, i) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className={`index-row group block border-b border-line px-1 py-5 sm:px-4 ${i % 2 ? 'sm:border-l' : ''} ${i > 0 ? 'lg:border-l' : ''}`}
            >
              <span className="index-muted flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span>{p.status}</span>
              </span>
              <span className="mt-3 block text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-none tracking-[-0.05em]">{p.title}</span>
              <span className="index-muted mt-1.5 block text-[13px] text-ink-2">{p.kind}</span>
              <span className="index-muted mt-4 flex items-center gap-3 font-mono text-[10.5px] text-muted">
                <span className="relative h-[2px] flex-1 bg-line">
                  <span className="absolute inset-y-0 left-0 bg-current" style={{ width: `${p.progress}%` }} />
                </span>
                {p.progress}%
              </span>
            </a>
          ))}
        </nav>
      </div>
      {saas.map((p, i) => (
        <Product key={p.slug} p={p} i={i} />
      ))}
    </section>
  );
}
