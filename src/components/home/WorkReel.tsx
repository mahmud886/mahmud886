'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { moreProjects, profile, projects } from '@/lib/data';

/**
 * "Selected work." On wide screens with motion allowed the section pins and vertical
 * scroll moves the cards sideways. Otherwise it is a native swipe row with scroll-snap.
 */
export default function WorkReel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [native, setNative] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        setNative(false);
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (st) => bar.current?.style.setProperty('transform', `scaleX(${st.progress})`),
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          setNative(true);
        };
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [native]);

  const github = profile.socials.find((s) => s.label === 'GitHub')!.href;

  return (
    <>
      <section
        ref={section}
        id="work"
        aria-labelledby="work-title"
        className="flex min-h-svh flex-col justify-center overflow-hidden pb-[clamp(40px,5vw,72px)] pt-[calc(var(--hh)+24px)]"
      >
        <div className="mb-[clamp(24px,3vw,44px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4 px-[var(--pad)]">
          <h2 id="work-title" className="chapter">
            Selected work<span className="stop">.</span>
          </h2>
          <div className="max-w-[34ch] text-[15px] leading-snug text-ink-2">
            {projects.length} products in production — each with a number someone cared about.
            <div className="mt-3 flex items-center gap-3">
              <span className="label">{native ? 'Swipe →' : 'Scroll →'}</span>
              <span className="relative h-px flex-1 bg-line">
                <span ref={bar} className="absolute inset-0 origin-left bg-ink" style={{ transform: 'scaleX(0)' }} />
              </span>
            </div>
          </div>
        </div>

        <div
          ref={track}
          className={`flex gap-[clamp(14px,1.6vw,24px)] px-[var(--pad)] ${
            native ? 'snap-x snap-mandatory overflow-x-auto scroll-px-[var(--pad)] [scrollbar-width:none]' : 'w-max'
          }`}
        >
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              data-cursor="View case"
              className="group w-[clamp(280px,min(56vw,calc((100svh-380px)*1.6)),980px)] shrink-0 snap-start"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(14px,1.6vw,22px)] bg-paper-2">
                <Image
                  src={p.images[0]}
                  alt={`${p.title} — ${p.kind}`}
                  fill
                  sizes="(min-width: 900px) 56vw, 85vw"
                  priority={i === 0}
                  className="mono-img scale-[1.06] object-cover object-top group-hover:scale-100"
                />
                <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink">
                  {p.status}
                </span>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                <div className="min-w-0">
                  <span className="label block truncate">
                    {String(i + 1).padStart(2, '0')} · {p.kind} · {p.period.split(' — ')[0].slice(-4)}
                  </span>
                  <h3 className="mt-1.5 text-[clamp(1.6rem,2.8vw,2.8rem)] font-bold leading-none tracking-[-0.045em]">{p.title}</h3>
                </div>
                <div className="flex shrink-0 items-baseline gap-2 sm:block sm:text-right">
                  <b className="block text-[clamp(1.6rem,2.8vw,2.8rem)] font-extrabold leading-none tracking-[-0.05em]">{p.stat.value}</b>
                  <span className="label">{p.stat.label}</span>
                </div>
              </div>
            </Link>
          ))}
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open GitHub"
            className="inv flex aspect-[4/5] w-[clamp(220px,24vw,360px)] shrink-0 snap-start flex-col justify-between self-start rounded-[clamp(14px,1.6vw,22px)] p-6"
          >
            <span className="label">More on GitHub</span>
            <span className="text-[clamp(2rem,3.4vw,3.4rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
              Everything else<span className="stop">.</span> ↗
            </span>
          </a>
        </div>
      </section>

      <section aria-labelledby="also-title" className="px-[var(--pad)] pb-[clamp(80px,10vw,160px)] pt-[clamp(40px,5vw,80px)]">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <h3 id="also-title" className="label !text-ink">
            Also built
          </h3>
          <span className="label">{String(moreProjects.length).padStart(2, '0')} projects</span>
        </div>
        <ul>
          {moreProjects.map((p, i) => (
            <li key={p.title} className="index-row border-b border-line" data-reveal style={{ ['--i' as string]: i }}>
              <div className="grid gap-x-6 gap-y-2 px-1 py-5 md:grid-cols-[48px_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)] md:items-baseline">
                <span className="index-muted font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[clamp(1.6rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.045em]">
                  {p.title}
                  <span className="serif-i index-muted ml-3 align-middle text-[0.45em] font-normal tracking-normal text-muted">{p.kind}</span>
                </span>
                <span className="index-muted text-[14.5px] leading-relaxed text-ink-2">{p.description}</span>
                <span className="index-muted font-mono text-[11px] leading-relaxed text-muted md:text-right">{p.stack.join(' · ')}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
