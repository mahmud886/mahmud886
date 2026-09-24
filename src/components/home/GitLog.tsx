'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experience, profile } from '@/lib/data';
import { shortSha } from '@/lib/sha';
import SectionHead from './SectionHead';

export default function GitLog() {
  const graph = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // The branch line draws itself as you read down the history.
      gsap.fromTo(
        '[data-branch]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: graph.current, start: 'top 70%', end: 'bottom 60%', scrub: true } }
      );
    },
    { scope: graph }
  );

  const edu = profile.education[0];

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <SectionHead n="02" label="Experience" title={<>{profile.years}+ years of commits, <span className="font-serif font-normal italic text-accent">five teams.</span></>}>
        From agency-scale email and animation work to owning the UI of an app used by two million people a day.
      </SectionHead>

      <div className="mb-4 font-mono text-[12px] text-muted">
        <span className="text-ok">$</span> git log --graph --career
      </div>

      <ol ref={graph} className="relative ml-2 border-l border-line pl-7 sm:ml-3 sm:pl-10">
        <span data-branch aria-hidden className="absolute -left-px top-0 h-full w-[2px] origin-top bg-accent" />
        {experience.map((j, i) => (
          <li key={j.slug} data-reveal className="relative pb-12 last:pb-8">
            <span
              aria-hidden
              className={`absolute -left-[35px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-paper sm:-left-[47px] ${i === 0 ? 'bg-accent' : ''}`}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px]">
              <span className="text-[#b58900] dark:text-[#e5c07b]">commit {shortSha(j.slug)}</span>
              {i === 0 && (
                <span className="text-muted">
                  (<span className="text-link">HEAD</span> → <span className="text-ok">main</span>)
                </span>
              )}
              <span className="text-muted">{j.period}</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              {j.role} <span className="text-muted">@</span> {j.company}
            </h3>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-2">{j.summary}</p>
            <ul className="mt-4 max-w-3xl space-y-2">
              {j.resume.map((r) => (
                <li key={r} className="flex gap-3 font-mono text-[12.5px] leading-relaxed text-ink-2">
                  <span className="shrink-0 text-ok">+</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {j.tech.slice(0, 7).map((t) => (
                <span key={t} className="rounded bg-paper-2 px-2 py-0.5 font-mono text-[11px] text-ink-2">
                  {t}
                </span>
              ))}
              <Link href={`/work/${j.slug}`} className="ml-1 font-mono text-[12px] text-link hover:underline">
                git show {shortSha(j.slug)} →
              </Link>
            </div>
          </li>
        ))}
        <li data-reveal className="relative">
          <span aria-hidden className="absolute -left-[35px] top-1 h-4 w-4 rounded-full border-2 border-line bg-paper sm:-left-[47px]" />
          <div className="font-mono text-[12px] text-muted">
            merge branch <span className="text-ink">education</span> · {edu.period}
          </div>
          <div className="mt-1 text-[15px] text-ink-2">
            {edu.title}, {edu.place}
            {edu.note ? ` — ${edu.note}` : ''}
          </div>
        </li>
      </ol>
    </section>
  );
}
