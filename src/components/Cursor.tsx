'use client';

import { useEffect, useRef } from 'react';

/**
 * A badge that follows the mouse and says what a click will do. Any element with
 * `data-cursor="View"` (or any other word) turns it on. Mouse only; touch never sees it.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ref.current!;
    let x = -200;
    let y = -200;
    let cx = x;
    let cy = y;
    let raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      const label = target?.dataset.cursor;
      if (label) {
        if (el.dataset.on !== 'true') {
          cx = x;
          cy = y;
        }
        el.textContent = label;
        el.dataset.on = 'true';
      } else el.dataset.on = 'false';
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => (el.dataset.on = 'false');
    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      data-on="false"
      className="site-chrome pointer-events-none fixed left-0 top-0 z-[75] hidden scale-0 rounded-full bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-paper transition-[scale] duration-300 ease-out-expo data-[on=true]:scale-100 [@media(hover:hover)_and_(pointer:fine)]:block"
    />
  );
}
