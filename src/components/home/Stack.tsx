import { profile } from '@/lib/data';

function Row({ items, dir, dur }: { items: string[]; dir: 'left' | 'right'; dur: string }) {
  const run = (copy: number) =>
    items.map((t) => (
      <span key={`${copy}-${t}`} className="flex items-center gap-[0.35em] pr-[0.35em]">
        {t}
        <span className="text-[0.4em]">●</span>
      </span>
    ));
  return (
    <div className="marquee-wrap overflow-hidden" aria-hidden>
      <div className="marquee" data-dir={dir} style={{ ['--dur' as string]: dur }}>
        <div className="flex">{run(0)}</div>
        <div className="flex">{run(1)}</div>
      </div>
    </div>
  );
}

export default function Stack() {
  const groups = Object.entries(profile.skills);
  const all = groups.flatMap(([, v]) => v);
  const half = Math.ceil(all.length / 2);
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6 px-[var(--pad)]">
        <h2 id="stack-title" className="chapter">
          The stack<span className="stop">.</span>
        </h2>
        <p className="max-w-[34ch] text-[15px] leading-snug text-ink-2">What I reach for, every day. Hover a row to hold it still.</p>
      </div>

      <div className="space-y-1 border-y border-ink py-4 text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold uppercase leading-[1] tracking-[-0.05em]">
        <Row items={all.slice(0, half)} dir="left" dur="48s" />
        <Row items={all.slice(half)} dir="right" dur="56s" />
      </div>

      <div className="mt-[clamp(40px,5vw,80px)] grid gap-10 px-[var(--pad)] md:grid-cols-3">
        {groups.map(([name, items], i) => (
          <div key={name} data-reveal style={{ ['--i' as string]: i }}>
            <h3 className="flex items-baseline justify-between border-b border-ink pb-2">
              <span className="text-[1.35rem] font-bold tracking-[-0.03em]">{name}</span>
              <span className="label">{String(items.length).padStart(2, '0')}</span>
            </h3>
            <ul className="divide-y divide-line">
              {items.map((s) => (
                <li key={s} className="flex justify-between py-2.5 text-[15px]">
                  {s}
                  <span className="font-mono text-[11px] text-muted">↗</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="sr-only">Skills: {all.join(', ')}.</p>
    </section>
  );
}
