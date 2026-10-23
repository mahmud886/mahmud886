import Link from 'next/link';
import { experience, shortCompany } from '@/lib/data';

/** A typographer's index: one giant row per role, each opening its own page. */
export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="inv px-[var(--pad)] py-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <h2 id="experience-title" className="chapter">
          Experience<span className="stop">.</span>
        </h2>
        <p className="max-w-[36ch] text-[15px] leading-snug text-ink-2">
          Five teams, from agency production lines to a platform serving two million people a day.
        </p>
      </div>

      <ol className="border-t border-ink">
        {experience.map((j, i) => (
          <li key={j.slug} className="index-row border-b border-line" data-reveal style={{ ['--i' as string]: i }}>
            <Link
              href={`/work/${j.slug}`}
              data-cursor="Read"
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 px-1 py-[clamp(18px,2.2vw,30px)] md:grid-cols-[56px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)_24px]"
            >
              <span className="index-muted hidden font-mono text-[11px] text-muted md:block">{String(experience.length - i).padStart(2, '0')}</span>
              <span className="text-[clamp(1.9rem,4.6vw,4.4rem)] font-bold leading-[0.92] tracking-[-0.055em]">
                {shortCompany(j.company)}
              </span>
              <span className="index-muted col-start-1 text-[15px] text-ink-2 md:col-start-auto">
                {j.role}
                {j.current && (
                  <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-current px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.1em]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Now
                  </span>
                )}
              </span>
              <span className="index-muted col-start-1 font-mono text-[12px] text-muted md:col-start-auto md:text-right">{j.period}</span>
              <span aria-hidden className="col-start-2 row-start-1 text-2xl md:col-start-auto md:row-start-auto">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
