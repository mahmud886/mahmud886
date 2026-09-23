'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experience } from '@/lib/data';

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin and fly sideways through the timeline; cards swing on a 3D hinge.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>('[data-job]').forEach((card) => {
          gsap.fromTo(
            card,
            { rotateY: -35, z: -150, opacity: 0.3 },
            {
              rotateY: 0,
              z: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 95%', end: 'left 45%', scrub: true },
            }
          );
        });
        gsap.to('[data-journey-line]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });
      });

      // Mobile: vertical stack, each card hinges up from the page.
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-job]').forEach((card) => {
          gsap.from(card, {
            rotateX: -50,
            y: 60,
            opacity: 0,
            transformOrigin: '50% 0%',
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="journey" ref={root} className="relative z-10 overflow-hidden md:flex md:h-svh md:flex-col md:justify-center">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-8 md:pt-0">
        <p className="eyebrow mb-4">— Journey</p>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            7+ years. <span className="text-gradient">5 teams.</span>
          </h2>
          <span className="eyebrow hidden md:block">Keep scrolling →</span>
        </div>
        <div className="mt-6 hidden h-px w-full bg-line md:block">
          <div data-journey-line className="h-full origin-left scale-x-0 bg-[image:var(--gradient)]" />
        </div>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-4 px-4 py-10 [perspective:1400px] sm:px-8 md:w-max md:flex-row md:gap-6 md:py-12 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] md:pr-[20vw]"
      >
        {experience.map((job, i) => (
          <Link
            href={`/work/${job.slug}`}
            key={job.company}
            data-job
            data-cursor="Details"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-[#0b0c14]/85 p-6 backdrop-blur-md [transform-style:preserve-3d] md:h-[60vh] md:min-h-[440px] md:w-[460px] md:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-40" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">{job.period}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight sm:text-3xl">{job.company}</h3>
              <div className="mt-1 text-sm text-accent">{job.role}</div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">{job.summary}</p>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-foreground/70">
              {job.highlights.map((pt) => (
                <li key={pt} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                  {pt}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground/90">
              Full role details <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
