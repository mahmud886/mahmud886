'use client';

import Image from 'next/image';
import Link from 'next/link';
import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { experience, profile } from '@/lib/data';
import LocalTime from '../LocalTime';
import Tile from './Tile';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      ref.current.textContent = String(value);
      return;
    }
    const c = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span>
      <span ref={ref}>{value}</span>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

const icons: Record<string, React.ReactNode> = {
  GitHub: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />,
  LinkedIn: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />,
  Medium: <path d="M4 7.5 2 5.2V5h6l4.6 10.1L16.7 5H22v.2l-1.6 1.6v10.4l1.6 1.6v.2h-7.8v-.2l1.7-1.6V9l-4.6 11.8h-.6L5.6 9v7.9l2.1 2.6v.2H2v-.2l2.1-2.6z" />,
};

export default function HeroBento() {
  const now = experience[0];
  return (
    <section className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-12 lg:pt-10">
      {/* Intro */}
      <Tile className="flex flex-col justify-between p-6 sm:col-span-2 sm:p-9 lg:col-span-8 lg:row-span-2 lg:min-h-[460px]">
        <div>
          <span className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            Available for new projects
          </span>
          <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[0.98] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.4rem]">
            Hi, I&apos;m {profile.firstName} — I build{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">fast, beautiful</span>
              <span aria-hidden className="absolute inset-x-[-4px] bottom-[-0.02em] h-[0.3em] rounded-md bg-pop/70" />
            </span>{' '}
            web products.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-2 sm:text-lg">
            {profile.role} with {profile.years}+ years in React, Next.js and TypeScript — from pixel-perfect campaigns to an app used by 2M+ people a day.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a href="#work" className="inline-flex h-11 items-center gap-2 rounded-full bg-pop px-5 text-sm font-semibold text-pop-ink transition-transform hover:scale-[1.03]">
            See my work
            <span aria-hidden>→</span>
          </a>
          <Link href="/resume" className="inline-flex h-11 items-center rounded-full border border-line bg-paper/60 px-5 text-sm font-medium transition-colors hover:bg-paper-2">
            Resume
          </Link>
          <div className="ml-1 flex gap-1.5">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                  {icons[s.label]}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Tile>

      {/* Photo */}
      <Tile delay={0.08} className="min-h-[340px] sm:col-span-1 lg:col-span-4 lg:row-span-2">
        <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div>
            <div className="font-display text-xl font-bold">{profile.name}</div>
            <div className="text-[13px] text-white/75">{profile.role}</div>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[12px] backdrop-blur-md">📍 {profile.location.split(',')[0]}</span>
        </div>
      </Tile>

      {/* Now */}
      <Tile delay={0.12} className="flex flex-col justify-between p-6 lg:col-span-4">
        <div className="text-[12px] font-medium text-muted">Currently</div>
        <div className="mt-4">
          <div className="font-display text-2xl font-bold leading-tight">{now.company}</div>
          <div className="mt-1 text-sm text-ink-2">
            {now.role} · since {now.period.split('—')[0].trim()}
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="font-display text-3xl font-bold tabular-nums">
              <LocalTime />
            </div>
            <div className="text-[12px] text-muted">in Dhaka · GMT+6</div>
          </div>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" /> replies in 24h
          </span>
        </div>
      </Tile>

      {/* Stats */}
      <Tile delay={0.16} className="p-6 lg:col-span-4">
        <div className="text-[12px] font-medium text-muted">By the numbers</div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
          {profile.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-bold tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-0.5 text-[12.5px] leading-snug text-ink-2">{s.label}</div>
            </div>
          ))}
        </div>
      </Tile>

      {/* Stack marquee */}
      <Tile delay={0.2} className="flex flex-col justify-between py-6 sm:col-span-2 lg:col-span-4">
        <div className="px-6 text-[12px] font-medium text-muted">Daily drivers</div>
        <div className="marquee mt-5 space-y-2.5 overflow-hidden">
          {[profile.skills.Frontend, [...profile.skills['Backend & API'], ...profile.skills['DevOps & Tools']]].map((row, i) => (
            <div key={i} className="flex w-max gap-2 marquee-track" style={{ animationDirection: i ? 'reverse' : 'normal' }}>
              {[...row, ...row].map((s, j) => (
                <span key={`${s}-${j}`} className="chip whitespace-nowrap !text-[13px] !font-medium">
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Tile>
    </section>
  );
}
