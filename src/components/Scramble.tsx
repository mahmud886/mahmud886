'use client';

import { useEffect, useRef } from 'react';

const POOL = '●◇✳/+*—#%&01';

/**
 * Text that decodes itself, left to right, the first time it scrolls into view (and
 * again on hover). The real text is in the DOM from the start, so it reads fine
 * without JS and to screen readers.
 */
export default function Scramble({ text, delay = 0, duration = 750, className }: { text: string; delay?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let timer = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const fixed = Math.floor(p * text.length);
        let out = text.slice(0, fixed);
        for (let i = fixed; i < text.length; i++) out += text[i] === ' ' ? ' ' : POOL[(Math.random() * POOL.length) | 0];
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timer = window.setTimeout(run, delay);
    });
    io.observe(el);
    el.addEventListener('pointerenter', run);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', run);
      el.textContent = text;
    };
  }, [text, delay, duration]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
