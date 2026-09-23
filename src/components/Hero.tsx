'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import { profile } from '@/lib/data';
import Magnetic from './Magnetic';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const split = SplitText.create('[data-hero-name]', { type: 'chars', charsClass: 'hero-char' });
      // background-clip:text breaks on transformed children, so tint each char along the gradient instead.
      const last = split.elements[1] ? split.chars.filter((c) => split.elements[1].contains(c)) : [];
      const tint = gsap.utils.interpolate(['#00e5ff', '#7c5cff', '#ff4fd8']);
      last.forEach((c, i) => gsap.set(c, { color: tint(i / Math.max(last.length - 1, 1)) }));
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
      gsap.set(split.chars, { yPercent: 120, rotateX: -90, opacity: 0, transformOrigin: '50% 100% -40px' });
      gsap.set('[data-hero-name], [data-hero-fade]', { visibility: 'visible' });

      const reveal = () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.to(split.chars, { yPercent: 0, rotateX: 0, opacity: 1, duration: reduce ? 0 : 1.4, stagger: 0.035 })
          .to('[data-hero-fade]', { opacity: 1, y: 0, duration: reduce ? 0 : 1, stagger: 0.08 }, '-=1.1');
      };
      const off = onIntroDone(reveal);

      // Rotating role ticker
      const roles = gsap.utils.toArray<HTMLElement>('[data-role]');
      const cycle = gsap.timeline({ repeat: -1 });
      roles.forEach((r) => {
        cycle
          .fromTo(r, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' })
          .to(r, { yPercent: -100, opacity: 0, duration: 0.5, ease: 'expo.in' }, '+=1.6');
      });

      // Scroll-out: letters peel away in 3D as the hero leaves.
      if (!reduce) {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
          .to(split.chars, {
            yPercent: (i) => -40 - (i % 3) * 30,
            rotateX: 70,
            z: (i) => 120 + (i % 4) * 60,
            opacity: 0,
            stagger: { each: 0.02, from: 'center' },
            ease: 'none',
          })
          .to('[data-hero-sub]', { y: -80, opacity: 0, ease: 'none' }, 0);
      }

      return () => {
        off();
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative flex min-h-svh flex-col justify-end overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pb-14">
      <div className="mx-auto w-full max-w-7xl">
        <div data-hero-fade className="mb-5 flex flex-wrap items-center gap-2 sm:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to new work
          </span>
          <span className="eyebrow">{profile.location}</span>
        </div>

        <h1 className="sr-only">
          {profile.name} — {profile.role}
        </h1>
        <div aria-hidden className="[perspective:900px]">
          <div
            data-hero-name
            className="font-display whitespace-nowrap text-[11.5vw] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] [transform-style:preserve-3d] lg:text-[11vw]"
          >
            {profile.firstName}
          </div>
          <div
            data-hero-name
            className="font-display text-accent whitespace-nowrap text-[11.5vw] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [transform-style:preserve-3d] lg:text-[11vw]"
          >
            {profile.lastName}
          </div>
        </div>

        <div data-hero-sub className="mt-6 grid gap-6 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div data-hero-fade className="max-w-xl">
            <div className="relative mb-3 h-7 overflow-hidden font-mono text-sm uppercase tracking-[0.18em] text-accent-2 sm:text-base">
              {profile.roles.map((r) => (
                <span key={r} data-role className="absolute inset-0 opacity-0">
                  {'// '}
                  {r}
                </span>
              ))}
            </div>
            <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{profile.intro}</p>
          </div>
          <div data-hero-fade className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#work"
                data-cursor="Go"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background"
              >
                <span className="absolute inset-0 translate-y-full bg-[image:var(--gradient)] transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative">See my work</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.cv} download={`${profile.cvName}.pdf`} className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium">
                Download CV ↓
              </a>
            </Magnetic>
          </div>
        </div>

        <div data-hero-fade className="mt-10 hidden items-center gap-3 sm:flex">
          <span className="relative h-10 w-6 rounded-full border border-white/25">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-foreground" />
          </span>
          <span className="eyebrow">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
