'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Screen } from '@/lib/data';
import { useMotion } from '@/lib/motion';

/**
 * A product's screens in one frame. It steps through them on its own while it is on
 * screen (unless motion is paused); hovering or tapping a thumbnail takes over.
 */
export default function ScreenGallery({ screens, url, title, priority = false }: { screens: Screen[]; url?: string; title: string; priority?: boolean }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const { paused } = useMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || held || !visible || screens.length < 2) return;
    const id = setInterval(() => setActive((n) => (n + 1) % screens.length), 3800);
    return () => clearInterval(id);
  }, [paused, held, visible, screens.length]);

  // Keep the active thumbnail in view on narrow screens without moving the page.
  useEffect(() => {
    const r = rail.current;
    const el = r?.children[active] as HTMLElement | undefined;
    if (r && el) r.scrollTo({ left: el.offsetLeft - r.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [active]);

  const pick = (i: number) => {
    setActive(i);
    setHeld(true);
  };
  const n = String(screens.length).padStart(2, '0');

  return (
    <div ref={ref} onPointerLeave={() => setHeld(false)}>
      <div className="overflow-hidden rounded-[clamp(14px,1.6vw,24px)] border border-line bg-paper-2 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
          <span className="ml-2 min-w-0 flex-1 truncate font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
            {url ? url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '') : `${title.toLowerCase().replace(/\s+/g, '')} · local build`}
          </span>
          <span className="font-mono text-[10.5px] tabular-nums text-muted">
            {String(active + 1).padStart(2, '0')} / {n}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={`${title} — ${s.label}`}
              fill
              priority={priority && i === 0}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className={`object-cover object-top transition-[opacity,scale] duration-700 ease-out-expo ${
                i === active ? 'scale-100 opacity-100' : 'scale-[1.015] opacity-0'
              }`}
            />
          ))}
          <span className="absolute bottom-3 left-3 rounded-full bg-[#0c0c0c]/85 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#f3f3f0] backdrop-blur">
            {screens[active].label}
          </span>
          {screens.length > 1 && !held && visible && !paused && (
            <span key={active} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink/70 [animation:gallery-progress_3.8s_linear]" />
          )}
        </div>
      </div>

      <div
        ref={rail}
        role="tablist"
        aria-label={`${title} screens`}
        className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:grid sm:overflow-visible"
        style={{ gridTemplateColumns: `repeat(${screens.length}, minmax(0, 1fr))` }}
      >
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            onPointerEnter={(e) => e.pointerType === 'mouse' && pick(i)}
            onClick={() => pick(i)}
            className="group w-[120px] shrink-0 text-left sm:w-auto"
          >
            <span
              className={`relative block aspect-[16/10] overflow-hidden rounded-[8px] border transition-[border-color,opacity] duration-300 ${
                i === active ? 'border-ink opacity-100' : 'border-line opacity-55 group-hover:opacity-90'
              }`}
            >
              <Image src={s.src} alt="" fill sizes="160px" className="object-cover object-top" />
            </span>
            <span className={`mt-1.5 block truncate font-mono text-[10px] uppercase tracking-[0.08em] ${i === active ? 'text-ink' : 'text-muted'}`}>
              {String(i + 1).padStart(2, '0')} {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
