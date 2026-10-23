'use client';

import { useEffect, useRef } from 'react';

/** Hairline along the top of the viewport showing how far down the page you are. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      ref.current!.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div aria-hidden className="site-chrome blend-chrome pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px]">
      <div ref={ref} className="h-full origin-left bg-white" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
