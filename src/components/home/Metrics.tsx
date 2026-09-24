import { profile } from '@/lib/data';

const keys = ['uptime', 'daily_users', 'emails_shipped', 'animations_built'];

export default function Metrics() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Highlights">
      <div className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <div key={s.label} data-reveal style={{ ['--i' as string]: i }} className="border-b border-r border-line p-5 sm:p-7">
            <div className="font-mono text-[11px] text-muted">
              <span className="text-accent">▸</span> {keys[i]}
            </div>
            <div className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              {s.value}
              <span className="text-accent">{s.suffix}</span>
            </div>
            <div className="mt-1.5 text-[13px] text-ink-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
