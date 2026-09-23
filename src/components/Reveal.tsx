'use client';

import { ReactNode, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Staggers its `[data-reveal]` descendants up from a 3D tilt when scrolled into view. */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('[data-reveal]', {
        y: 50,
        rotateX: -40,
        opacity: 0,
        transformOrigin: '50% 0%',
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={`[perspective:1000px] ${className ?? ''}`}>
      {children}
    </div>
  );
}
