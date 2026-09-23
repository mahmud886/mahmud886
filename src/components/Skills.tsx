'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { profile } from '@/lib/data';

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const rows = Object.entries(profile.skills);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Rows lean into the scroll: faster scroll → more skew, then spring back.
      const skew = gsap.quickTo('[data-skew]', 'skewX', { duration: 0.5, ease: 'power3.out' });
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => skew(gsap.utils.clamp(-12, 12, self.getVelocity() / -250)),
      });
      gsap.fromTo(
        '[data-plane]',
        { rotateX: 35, scale: 0.85 },
        { rotateX: 12, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative z-10 overflow-hidden py-16 sm:py-28" aria-label="Skills">
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-8">
        <p className="eyebrow mb-4">— Toolkit</p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
          The <span className="text-stroke">stack</span> I fly with.
        </h2>
      </div>

      <div className="[perspective:1000px]">
        <div data-plane className="-rotate-3 space-y-3 [transform-style:preserve-3d] sm:space-y-5">
          {rows.map(([group, items], r) => (
            <div key={group} data-skew className="flex overflow-hidden">
              <div
                className="marquee-track flex shrink-0 gap-3 pr-3 sm:gap-5 sm:pr-5"
                style={{ ['--marquee-speed' as string]: `${28 + r * 8}s`, animationDirection: r % 2 ? 'reverse' : 'normal' }}
              >
                {[...items, ...items, ...items, ...items].map((s, i) => (
                  <span
                    key={i}
                    className={`flex items-center gap-3 whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-2xl font-bold uppercase tracking-tight sm:px-8 sm:py-4 sm:text-5xl ${
                      i % 3 === 0 ? 'border-transparent bg-[image:var(--gradient)] text-background' : 'border-line bg-white/[0.03] text-foreground/90'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
