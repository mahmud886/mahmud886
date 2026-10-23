'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { building, lab, type CaseStudy } from '@/lib/data';
import { useMotion } from '@/lib/motion';

/** A card whose cover flips through the product's screens while you point at it. */
function LabCard({ p, i }: { p: CaseStudy; i: number }) {
  const [shot, setShot] = useState(0);
  const [hover, setHover] = useState(false);
  const { paused } = useMotion();
  useEffect(() => {
    if (!hover || paused) return;
    const id = setInterval(() => setShot((n) => (n + 1) % p.screens.length), 1100);
    return () => clearInterval(id);
  }, [hover, paused, p.screens.length]);

  return (
    <article
      data-reveal
      style={{ ['--i' as string]: i }}
      className="group flex flex-col"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        setShot(0);
      }}
    >
      <Link href={`/projects/${p.slug}`} data-cursor="Open" className="relative block aspect-[16/10] overflow-hidden rounded-[clamp(14px,1.4vw,20px)] border border-line bg-paper-2">
        {p.screens.map((s, k) => (
          <Image
            key={s.src}
            src={s.src}
            alt={k === 0 ? `${p.title} — ${s.label}` : ''}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className={`object-cover object-top transition-opacity duration-500 ${k === shot ? 'opacity-100' : 'opacity-0'} ${hover ? '' : 'grayscale'}`}
          />
        ))}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0c0c0c]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#f3f3f0] backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          {p.status}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-[#f3f3f0]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#0c0c0c] opacity-0 transition-opacity group-hover:opacity-100">
          {p.screens[shot].label}
        </span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <span className="label">{p.kind}</span>
          <h3 className="mt-1 text-[clamp(1.8rem,2.6vw,2.6rem)] font-extrabold leading-none tracking-[-0.05em]">{p.title}</h3>
        </div>
        <div className="shrink-0 text-right">
          <b className="block text-[clamp(1.6rem,2.4vw,2.4rem)] font-extrabold leading-none tracking-[-0.05em]">{p.stat.value}</b>
          <span className="label">{p.stat.label}</span>
        </div>
      </div>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{p.description}</p>
      <div className="mt-4 flex items-center gap-3 font-mono text-[10.5px] text-muted">
        <span className="relative h-[2px] flex-1 bg-line">
          <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${p.progress}%` }} />
        </span>
        {p.progress}%
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={`/projects/${p.slug}`} className="pill">
          Case study →
        </Link>
        {p.link && (
          <a href={p.link} target="_blank" rel="noreferrer" className="pill">
            Live ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Lab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="px-[var(--pad)] py-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <h2 id="lab-title" className="chapter">
          Now building<span className="stop">.</span>
        </h2>
        <p className="max-w-[38ch] text-[15px] leading-snug text-ink-2">
          Side products on the bench right now — hover a card to flip through its screens.
        </p>
      </div>

      <div className="grid gap-x-[clamp(16px,2vw,32px)] gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {lab.map((p, i) => (
          <LabCard key={p.slug} p={p} i={i} />
        ))}
      </div>

      <div className="mt-[clamp(64px,8vw,120px)]">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <h3 className="label !text-ink">Also on the bench</h3>
          <span className="label">{String(building.length).padStart(2, '0')} projects</span>
        </div>
        <ul>
          {building.map((b, i) => (
            <li key={b.title} className="index-row border-b border-line" data-reveal style={{ ['--i' as string]: i }}>
              <div className="grid gap-x-6 gap-y-2 px-1 py-5 md:grid-cols-[48px_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,0.7fr)] md:items-baseline">
                <span className="index-muted font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[clamp(1.5rem,2.8vw,2.6rem)] font-bold leading-none tracking-[-0.045em]">
                  {b.title}
                  <span className="serif-i index-muted ml-3 align-middle text-[0.5em] font-normal tracking-normal text-muted">{b.kind}</span>
                </span>
                <span className="index-muted text-[14.5px] leading-relaxed text-ink-2">{b.description}</span>
                <span className="index-muted flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted md:justify-end">
                  {b.status}
                  <span className="relative h-[2px] w-16 bg-line">
                    <span className="absolute inset-y-0 left-0 bg-current" style={{ width: `${b.progress}%` }} />
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
