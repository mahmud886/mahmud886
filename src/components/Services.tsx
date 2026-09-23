'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { profile } from '@/lib/data';

export default function Services() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.utils.toArray<HTMLElement>('[data-service]').forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 45%', scrub: 0.6 } })
          .fromTo(row.querySelector('[data-service-title]'), { rotateX: -80, yPercent: 60, opacity: 0 }, { rotateX: 0, yPercent: 0, opacity: 1, ease: 'none' })
          .fromTo(row.querySelector('[data-service-line]'), { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
          .fromTo(row.querySelector('[data-service-text]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none' }, 0.3);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative z-10 px-4 py-16 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-4">— What I do</p>
        <h2 className="mb-10 font-display text-4xl font-bold tracking-tight sm:mb-16 sm:text-6xl">
          Services, <span className="text-gradient">engineered.</span>
        </h2>
        <div>
          {profile.services.map((s, i) => (
            <div key={s.title} data-service className="group relative grid gap-4 py-8 [perspective:800px] md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-10 md:py-12">
              <div data-service-line className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3
                data-service-title
                className="origin-bottom font-display text-[7.5vw] font-extrabold uppercase leading-[0.95] tracking-tight transition-colors duration-300 group-hover:text-accent-2 sm:text-4xl lg:text-5xl"
              >
                {s.title}
              </h3>
              <p data-service-text className="text-sm leading-relaxed text-foreground/70 sm:text-lg">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
