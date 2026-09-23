'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useGSAP(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    const move = (e: PointerEvent) => {
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3, overwrite: 'auto' });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    // Event delegation: works for elements mounted after this effect ran.
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor], input, textarea');
      const text = target?.dataset.cursor ?? '';
      setLabel(text);
      gsap.to(ring.current, {
        scale: target ? (text ? 3.2 : 1.8) : 1,
        backgroundColor: target ? 'rgba(124,92,255,0.18)' : 'rgba(124,92,255,0)',
        borderColor: target ? 'rgba(124,92,255,0.9)' : 'rgba(255,255,255,0.35)',
        duration: 0.35,
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 });
    };
    const leaveWindow = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leaveWindow);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leaveWindow);
    };
  });

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block" />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[109] hidden h-9 w-9 items-center justify-center rounded-full border border-white/35 [@media(hover:hover)_and_(pointer:fine)]:flex"
      >
        <span className="font-mono text-[4px] uppercase tracking-widest text-white">{label}</span>
      </div>
    </>
  );
}
