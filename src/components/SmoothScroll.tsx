'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll-store';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Pinned sections change page height, so the browser's restored offset lands in the wrong place.
    history.scrollRestoration = 'manual';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ autoRaf: false, lerp: reduce ? 1 : 0.1, smoothWheel: !reduce, anchors: true });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger and smooth scroll share one frame.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      scrollState.progress = lenis.progress || 0;
      scrollState.velocity = lenis.velocity;
    });

    const onPointer = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Fonts and images settle after hydration; re-measure pins once they have.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('load', refresh);
    };
  }, []);

  // New page: start at the top (or the hash target) and re-measure every trigger.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    lenis?.scrollTo(target ?? 0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
