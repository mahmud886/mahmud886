'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Two oversized lines of text that slide in opposite directions, scrubbed by scroll. */
export default function TextBand({ top, bottom }: { top: string; bottom: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const st = { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 };
      gsap.fromTo('[data-band-a]', { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: st });
      gsap.fromTo('[data-band-b]', { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: st });
      gsap.fromTo('[data-band]', { rotateX: 40 }, { rotateX: -20, ease: 'none', scrollTrigger: st });
    },
    { scope: ref }
  );
  const line = (t: string) => Array(4).fill(t).join('  ✦  ');
  return (
    <div ref={ref} aria-hidden className="relative z-10 overflow-hidden py-10 [perspective:900px] sm:py-16">
      <div data-band className="space-y-1 [transform-style:preserve-3d]">
        <div data-band-a className="whitespace-nowrap font-display text-[13vw] font-extrabold uppercase leading-none tracking-tight sm:text-[9vw]">
          {line(top)}
        </div>
        <div data-band-b className="text-stroke whitespace-nowrap font-display text-[13vw] font-extrabold uppercase leading-none tracking-tight sm:text-[9vw]">
          {line(bottom)}
        </div>
      </div>
    </div>
  );
}
