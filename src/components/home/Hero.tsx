import Link from 'next/link';
import { profile } from '@/lib/data';
import Terminal from '../Terminal';

export default function Hero() {
  const spec = [
    { k: 'Role', v: profile.role },
    { k: 'Now', v: profile.currently.replace(`${profile.role} at `, '') },
    { k: 'Experience', v: `${profile.years}+ years` },
    { k: 'Based in', v: profile.location },
    { k: 'Focus', v: 'React · Next.js · TypeScript · Motion' },
  ];
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:pb-24">
      <div>
        <div data-reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          Available for new opportunities
        </div>
        <h1 data-reveal style={{ ['--i' as string]: 1 }} className="text-[13vw] font-semibold leading-[0.92] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
          {profile.name}
        </h1>
        <p data-reveal style={{ ['--i' as string]: 2 }} className="mt-4 font-serif text-3xl leading-[1.15] text-ink-2 sm:text-[2.6rem]">
          engineers interfaces that feel <em className="text-accent">effortless</em> — and never slow.
        </p>

        <dl data-reveal style={{ ['--i' as string]: 3 }} className="mt-9 divide-y divide-line border-y border-line font-mono text-[12.5px]">
          {spec.map((s) => (
            <div key={s.k} className="grid grid-cols-[110px_1fr] gap-4 py-2.5">
              <dt className="text-muted">{s.k}</dt>
              <dd className="text-ink">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div data-reveal style={{ ['--i' as string]: 4 }} className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="group inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent">
            See selected work <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <Link href="/resume" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40">
            Resume
          </Link>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 px-2 py-3 font-mono text-[12.5px] text-link underline-offset-4 hover:underline">
            {profile.email}
          </a>
        </div>
      </div>

      <div data-reveal style={{ ['--i' as string]: 2 }}>
        <Terminal />
        <p className="mt-3 text-center font-mono text-[11px] text-muted">This terminal is real — try typing a command.</p>
      </div>
    </section>
  );
}
