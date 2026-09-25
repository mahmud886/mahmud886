'use client';

import { useEffect } from 'react';

/** One listener for the whole page: feeds the pointer position into whichever .tile is under it. */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    let last: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      const tile = (e.target as Element | null)?.closest<HTMLElement>('.tile');
      if (!tile) return;
      last = tile;
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
      tile.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      last?.style.removeProperty('--mx');
    };
  }, []);
  return null;
}
