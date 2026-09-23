'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { profile } from '@/lib/data';

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Manifesto: words light up as you scroll through a pinned stage.
        const split = SplitText.create('[data-manifesto]', { type: 'words' });
        gsap.set(split.words, { opacity: 0.12 });
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto-stage]', start: 'top top', end: '+=120%', scrub: true, pin: true },
        });

        // Portrait flips up out of the page.
        gsap.fromTo(
          '[data-portrait]',
          { rotateX: 45, rotateY: -20, y: 120, clipPath: 'inset(30% 10% 30% 10% round 32px)' },
          {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 32px)',
            ease: 'none',
            scrollTrigger: { trigger: '[data-portrait-wrap]', start: 'top 95%', end: 'top 35%', scrub: 0.8 },
          }
        );
        gsap.to('[data-portrait] img', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '[data-portrait-wrap]', start: 'top bottom', end: 'bottom top', scrub: true },
        });

        // Stat cards tumble in from depth.
        gsap.from('[data-stat]', {
          rotateX: -75,
          z: -200,
          y: 80,
          opacity: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-stats]', start: 'top 85%' },
        });

        return () => split.revert();
      });

      // Count-up runs for everyone; it's content, not decoration.
      gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: Number(el.dataset.countTo),
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative z-10">
      <div data-manifesto-stage className="flex min-h-svh items-center px-4 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="eyebrow mb-6">— Manifesto</p>
          <p data-manifesto className="font-display text-[8.5vw] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            {profile.manifesto}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-32">
        <div data-portrait-wrap className="[perspective:1200px]">
          <div data-portrait className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-line [transform-style:preserve-3d]">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
              <div>
                <div className="font-display text-lg font-bold">{profile.name}</div>
                <div className="eyebrow !text-[10px]">{profile.role}</div>
              </div>
              <span className="font-mono text-xs text-accent-2">● online</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10">
          <div>
            <p className="eyebrow mb-4">— About</p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Engineering meets <span className="text-gradient">motion.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
              From 300+ pixel-perfect email builds at Hogarth to owning the UI of an app serving 2M+ people a day — I build interfaces that are
              fast by default and unforgettable by design. React and Next.js on the inside; GSAP, Three.js and a little obsession on the outside.
            </p>
          </div>

          <div data-stats className="grid grid-cols-2 gap-3 [perspective:1000px] sm:gap-4">
            {profile.stats.map((s) => (
              <div key={s.label} data-stat className="rounded-2xl glass p-4 sm:p-6">
                <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <span data-count-to={s.value}>{s.value}</span>
                  <span className="text-gradient">{s.suffix}</span>
                </div>
                <div className="mt-2 text-xs text-muted sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Education</p>
              {profile.education.map((e) => (
                <div key={e.title} className="border-b border-line py-3">
                  <div className="text-sm font-medium">{e.title}</div>
                  <div className="flex justify-between gap-3 text-xs text-muted">
                    <span>{e.place}</span>
                    <span className="shrink-0 font-mono">{e.period}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="eyebrow mb-3">Certifications</p>
              {profile.certifications.map((c) => (
                <div key={c.title} className="border-b border-line py-3">
                  <div className="text-sm font-medium">{c.title}</div>
                  <div className="text-xs text-muted">
                    {c.issuer} · <span className="font-mono">{c.period}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.skills.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-foreground/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
