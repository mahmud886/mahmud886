'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import type { Job } from '@/lib/data';
import ScrollText from './ScrollText';

export default function JobDetail({ job, index, all }: { job: Job; index: number; all: Job[] }) {
  const root = useRef<HTMLElement>(null);
  const next = all[(index + 1) % all.length];

  useGSAP(
    () => {
      const split = SplitText.create('[data-case-title]', { type: 'words,chars' });
      gsap.set('[data-case-title]', { visibility: 'visible' });
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => split.revert();

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from(split.chars, { yPercent: 120, rotateX: -90, opacity: 0, stagger: 0.02, duration: 1.1 })
        .from('[data-case-fade]', { y: 30, opacity: 0, stagger: 0.08, duration: 1 }, '-=0.8');

      // Responsibilities: each line hinges up and its index counter fills in.
      gsap.utils.toArray<HTMLElement>('[data-duty]').forEach((el) => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 55%', scrub: 0.6 } })
          .fromTo(el, { rotateX: -60, opacity: 0, y: 40 }, { rotateX: 0, opacity: 1, y: 0, ease: 'none' })
          .fromTo(el.querySelector('[data-duty-line]'), { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      });

      gsap.from('[data-tech]', {
        scale: 0,
        rotate: -20,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '[data-tech-wrap]', start: 'top 85%' },
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <main ref={root} className="relative z-10">
      <section className="px-4 pb-16 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <div data-case-fade className="mb-6 flex flex-wrap items-center gap-3">
            <Link href="/#journey" className="eyebrow transition-colors hover:!text-foreground">
              ← Journey
            </Link>
            <span className="eyebrow">/</span>
            <span className="font-mono text-xs text-accent-2">{job.period}</span>
            {job.current && <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">Current</span>}
          </div>
          <p data-case-fade className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {job.role}
          </p>
          <h1 data-case-title className="font-display text-[8.5vw] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] [perspective:900px] lg:text-[6.5vw]">
            {job.company}
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
            <ScrollText className="text-2xl font-medium leading-snug tracking-tight sm:text-4xl" start="top 95%" end="bottom 60%">
              {job.summary}
            </ScrollText>
            {job.companyUrl && (
              <a data-case-fade href={job.companyUrl} target="_blank" rel="noreferrer" className="justify-self-start rounded-full glass px-5 py-3 text-sm md:justify-self-end">
                Company website ↗
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow mb-4">— Day to day</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">What the job really was.</h2>
            <div className="mt-8 space-y-3">
              {job.highlights.map((h) => (
                <div key={h} className="rounded-2xl glass p-4 text-sm leading-relaxed text-foreground/80">
                  <span className="mr-2 text-accent-2">✦</span>
                  {h}
                </div>
              ))}
            </div>
          </div>
          <ol className="[perspective:1000px]">
            {job.responsibilities.map((r, i) => (
              <li key={r} data-duty className="relative origin-top py-6 sm:py-8">
                <div data-duty-line className="absolute inset-x-0 top-0 h-px origin-left bg-[image:var(--gradient)] opacity-60" />
                <div className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-lg leading-snug text-foreground/85 sm:text-2xl">{r}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8">
        <div data-tech-wrap className="mx-auto max-w-7xl">
          <p className="eyebrow mb-6">— Tools of the trade</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {job.tech.map((t) => (
              <span key={t} data-tech className="rounded-full border border-line bg-white/[0.04] px-4 py-2 font-display text-lg font-bold sm:px-6 sm:py-3 sm:text-2xl">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-6">— Full timeline</p>
          <div className="divide-y divide-line border-y border-line">
            {all.map((j) => (
              <Link
                key={j.slug}
                href={`/work/${j.slug}`}
                className={`group flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between ${j.slug === job.slug ? 'text-accent-2' : ''}`}
              >
                <span className="font-display text-xl font-bold transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{j.company}</span>
                <span className="font-mono text-xs text-muted">
                  {j.role} · {j.period}
                </span>
              </Link>
            ))}
          </div>
          <Link href={`/work/${next.slug}`} className="group mt-12 inline-flex items-center gap-3 font-display text-2xl font-bold sm:text-4xl">
            Next: {next.company} <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
