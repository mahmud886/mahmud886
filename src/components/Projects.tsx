'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { moreProjects, projects } from '@/lib/data';
import Reveal from './Reveal';

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
        // Stack: each card sinks back into depth as the next one slides over it.
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector('[data-card-body]'), {
            scale: 0.88,
            rotateX: 14,
            y: -30,
            filter: 'brightness(0.35)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true },
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-card-img]').forEach((img) => {
          gsap.fromTo(img, { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.05, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });

      // Pointer tilt, fine pointers only.
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const cleanups = gsap.utils.toArray<HTMLElement>('[data-tilt]').map((el) => {
          const rx = gsap.quickTo(el, 'rotateX', { duration: 0.6, ease: 'power3.out' });
          const ry = gsap.quickTo(el, 'rotateY', { duration: 0.6, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 8);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
            el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          return () => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          };
        });
        return () => cleanups.forEach((c) => c());
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="relative z-10 px-4 py-16 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">— Selected work</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Things I&apos;ve <span className="text-gradient">shipped.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted sm:text-base">Live products, real users. Each one built for speed first — then made to move.</p>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {projects.map((p, i) => (
            <div key={p.title} data-card className="sticky [perspective:1400px]" style={{ top: `calc(12vh + ${i * 18}px)` }}>
              <div data-card-body className="origin-top will-change-transform">
                <Link
                  href={`/projects/${p.slug}`}
                  data-tilt
                  data-cursor="Case study"
                  className="group relative grid overflow-hidden rounded-[28px] border border-line bg-[#0b0c14] [transform-style:preserve-3d] md:grid-cols-[1.35fr_1fr]"
                  style={{ ['--card-accent' as string]: p.accent }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[440px]">
                    <div data-card-img className="absolute inset-0">
                      <Image src={p.images[0]} alt={`${p.title} screenshot`} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c14] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0b0c14]" />
                  </div>

                  <div className="relative flex flex-col justify-between gap-6 p-5 sm:p-8 lg:p-10">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--card-accent) 22%, transparent), transparent 60%)' }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs" style={{ color: p.accent }}>
                          {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </span>
                        <span className="eyebrow">{p.kind}</span>
                      </div>
                      <h3 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{p.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">{p.description}</p>
                    </div>
                    <div className="relative flex flex-col gap-5">
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-foreground/70">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold">
                        Read the case study
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-[-45deg]">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 sm:mt-28">
          <p className="eyebrow mb-4">— More from the lab</p>
          <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {moreProjects.map((p) => (
              <article key={p.title} data-reveal className="group relative bg-background p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent-2 sm:text-3xl">{p.title}</h3>
                  <span className="eyebrow shrink-0">{p.kind}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65 sm:text-base">{p.description}</p>
                <div className="mt-4 font-mono text-[11px] text-muted">{p.stack.join(' · ')}</div>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
