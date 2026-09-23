'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import type { Project } from '@/lib/data';
import Magnetic from './Magnetic';
import ScrollText from './ScrollText';

export default function ProjectCase({ project: p, index, total, next }: { project: Project; index: number; total: number; next: Project }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const split = SplitText.create('[data-case-title]', { type: 'words,chars' });
      gsap.set('[data-case-title]', { visibility: 'visible' });
      if (reduce) return () => split.revert();

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from(split.chars, { yPercent: 120, rotateX: -90, opacity: 0, stagger: 0.03, duration: 1.2 })
        .from('[data-case-fade]', { y: 30, opacity: 0, stagger: 0.08, duration: 1 }, '-=0.9');

      // Hero shot rises out of the page in 3D and flattens as you scroll.
      gsap.fromTo(
        '[data-case-shot]',
        { rotateX: 32, scale: 0.86, y: 60 },
        { rotateX: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '[data-case-shot]', start: 'top 95%', end: 'top 20%', scrub: 0.8 } }
      );

      gsap.utils.toArray<HTMLElement>('[data-feature]').forEach((el) => {
        gsap.from(el, { x: -40, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      gsap.fromTo('[data-progress-fill]', { scaleX: 0 }, { scaleX: p.progress / 100, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: '[data-progress-fill]', start: 'top 90%' } });

      // Gallery: pinned horizontal filmstrip on desktop, stacked tilt-ins on mobile.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const track = document.querySelector<HTMLElement>('[data-gallery-track]')!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: '[data-gallery]', start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>('[data-shot]').forEach((shot) => {
          gsap.fromTo(shot, { rotateY: -25, scale: 0.9 }, { rotateY: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: shot, containerAnimation: tween, start: 'left 100%', end: 'left 40%', scrub: true } });
        });
      });
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-shot]').forEach((shot) => {
          gsap.from(shot, { rotateX: -35, y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: shot, start: 'top 90%' } });
        });
      });

      return () => {
        mm.revert();
        split.revert();
      };
    },
    { scope: root }
  );

  const meta = [
    { k: 'My role', v: 'Engineering' },
    { k: 'Context', v: p.association },
    { k: 'Timeline', v: p.period },
    { k: 'Status', v: p.status },
  ];

  return (
    <main ref={root} className="relative z-10" style={{ ['--case' as string]: p.accent }}>
      {/* Hero */}
      <section className="px-4 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <div data-case-fade className="mb-6 flex flex-wrap items-center gap-3">
            <Link href="/#work" className="eyebrow transition-colors hover:!text-foreground">
              ← All work
            </Link>
            <span className="eyebrow">/</span>
            <span className="font-mono text-xs" style={{ color: p.accent }}>
              Case {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
            </span>
          </div>
          <h1
            data-case-title
            className="font-display text-[7.4vw] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [perspective:900px]"
          >
            {p.title}
          </h1>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <p data-case-fade className="text-lg leading-relaxed text-foreground/75 sm:text-2xl">
              {p.overview}
            </p>
            <div data-case-fade className="flex flex-wrap gap-3 md:justify-end">
              <Magnetic>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Launch"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-background"
                  style={{ background: p.accent }}
                >
                  Visit live site ↗
                </a>
              </Magnetic>
            </div>
          </div>

          <dl data-case-fade className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k} className="bg-background p-4 sm:p-5">
                <dt className="eyebrow !text-[10px]">{m.k}</dt>
                <dd className="mt-2 text-sm font-medium sm:text-base">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Hero shot */}
      <section className="px-4 sm:px-8 [perspective:1400px]">
        <div data-case-shot className="relative mx-auto aspect-[16/9] max-w-7xl overflow-hidden rounded-[28px] border border-line">
          <Image src={p.images[0]} alt={`${p.title} — home screen`} fill priority sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover object-top" />
        </div>
      </section>

      {/* Narrative */}
      <section className="px-4 py-20 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow mb-4">— The brief</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{p.kind}.</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full px-3 py-1 font-mono text-[11px] text-background" style={{ background: p.accent }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-14">
            <ScrollText className="text-2xl font-medium leading-snug tracking-tight sm:text-4xl">{p.description}</ScrollText>

            <div>
              <p className="eyebrow mb-6">— What I built</p>
              <ul className="divide-y divide-line border-y border-line">
                {p.features.map((f, i) => (
                  <li key={f} data-feature className="flex gap-5 py-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
                    <span className="font-mono text-xs" style={{ color: p.accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-4">— Stack</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-4">— Milestones</p>
                <ol className="space-y-3">
                  {p.milestones.map((m) => (
                    <li key={m} className="flex items-center gap-3 text-sm text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                      {m}
                    </li>
                  ))}
                </ol>
                <div className="mt-5">
                  <div className="mb-2 flex justify-between font-mono text-[11px] text-muted">
                    <span>Roadmap</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div data-progress-fill className="h-full origin-left rounded-full" style={{ background: p.accent, transform: `scaleX(${p.progress / 100})` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section data-gallery className="overflow-hidden md:flex md:h-svh md:items-center">
        <div data-gallery-track className="flex flex-col gap-6 px-4 [perspective:1400px] sm:px-8 md:w-max md:flex-row md:items-center md:gap-10 md:px-[8vw]">
          <div className="shrink-0 md:w-[28vw]">
            <p className="eyebrow mb-4">— Gallery</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Inside <span style={{ color: p.accent }}>{p.title}</span>
            </h2>
          </div>
          {p.images.map((src, i) => (
            <div key={src} data-shot className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-3xl border border-line md:w-[62vw]">
              <Image src={src} alt={`${p.title} screen ${i + 1}`} fill sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </section>

      {/* Next */}
      <section className="px-4 py-24 sm:px-8 sm:py-36">
        <Link href={`/projects/${next.slug}`} data-cursor="Next" className="group mx-auto block max-w-7xl">
          <p className="eyebrow mb-4">Next case study</p>
          <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
            <span className="font-display text-[7.4vw] font-extrabold uppercase leading-none tracking-tight transition-colors duration-500 group-hover:text-[var(--next)]" style={{ ['--next' as string]: next.accent }}>
              {next.title}
            </span>
            <span className="mb-3 text-4xl transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl">→</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
