'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useMotion } from '@/lib/motion';
import { THEME_EVENT } from '@/lib/nav';
import { MotionPill } from '@/components/Header';

const WORDS = ['React', 'Next.js', 'GSAP', 'TypeScript', 'Motion'];

function subscribeTheme(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}

/**
 * A field of dots that spells each tool in turn, halftone-style, with a slow wave running
 * through it. Dots swell around the pointer. Pause (or reduced motion) holds the first word.
 */
export default function Halftone({ words = WORDS, caption }: { words?: string[]; caption: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const { paused } = useMotion();
  // Redraw in the new ink when the theme flips; the colour itself comes from CSS.
  const theme = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme, () => '');

  useEffect(() => {
    const cv = canvas.current!;
    const box = wrap.current!;
    const ctx = cv.getContext('2d')!;
    let W = 0;
    let H = 0;
    let step = 16;
    let cols = 0;
    let rows = 0;
    let masks: Float32Array[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, k: 0 };
    const start = performance.now();
    const ink = getComputedStyle(box).color;

    const build = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = box.clientWidth;
      H = box.clientHeight;
      if (!W || !H) {
        masks = [];
        return;
      }
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      step = W < 640 ? 10 : 14;
      cols = Math.ceil(W / step);
      rows = Math.ceil(H / step);
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d', { willReadFrequently: true })!;
      const family = getComputedStyle(cv).fontFamily;
      masks = words.map((word) => {
        o.clearRect(0, 0, cols, rows);
        let size = rows * 0.6;
        o.font = `900 ${size}px ${family}`;
        const w = o.measureText(word).width;
        if (w > cols * 0.88) size *= (cols * 0.88) / w;
        o.font = `900 ${size}px ${family}`;
        o.textAlign = 'center';
        o.textBaseline = 'middle';
        o.fillStyle = '#fff';
        o.fillText(word, cols / 2, rows / 2 + size * 0.04);
        const data = o.getImageData(0, 0, cols, rows).data;
        const m = new Float32Array(cols * rows);
        for (let i = 0; i < m.length; i++) m[i] = data[i * 4 + 3] / 255;
        return m;
      });
    };

    const draw = (now: number) => {
      if (!masks.length) return;
      const t = (now - start) / 1000;
      const hold = 2.8;
      const phase = paused ? 0 : t / hold;
      const a = Math.floor(phase) % words.length;
      const b = (a + 1) % words.length;
      const f = phase - Math.floor(phase);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ink;
      pointer.k += ((pointer.x > -999 ? 1 : 0) - pointer.k) * 0.08;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = (i + 0.5) * step;
          const y = (j + 0.5) * step;
          // Wipe from left to right during the last 35% of each hold.
          const local = Math.min(1, Math.max(0, ((f - 0.65) / 0.35) * 1.6 - (i / cols) * 0.6));
          const m = masks[a][j * cols + i] * (1 - local) + masks[b][j * cols + i] * local;
          const wave = paused ? 0.5 : 0.5 + 0.5 * Math.sin(x * 0.011 + y * 0.007 - t * 1.4);
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          const near = pointer.k * Math.exp(-(d * d) / 14000);
          const r = step * 0.5 * Math.min(1, 0.1 + wave * 0.1 + m * 0.82 + near * 0.55);
          if (r < 0.5) continue;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (!paused && visible) raf = requestAnimationFrame(loop);
    };

    build();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(box);
    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(box);
    document.fonts?.ready.then(() => {
      build();
      draw(performance.now());
    });
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      if (paused) draw(performance.now());
    };
    const leave = () => {
      pointer.x = pointer.y = -9999;
      if (paused) draw(performance.now());
    };
    box.addEventListener('pointermove', move);
    box.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      box.removeEventListener('pointermove', move);
      box.removeEventListener('pointerleave', leave);
    };
  }, [paused, theme, words]);

  return (
    <div className="px-[var(--pad)]">
      <div
        ref={wrap}
        className="inv relative h-[clamp(380px,50vw,760px)] overflow-hidden rounded-[clamp(16px,2vw,28px)]"
        role="img"
        aria-label={`Dot field spelling ${words.join(', ')}`}
      >
        <canvas ref={canvas} className="absolute inset-0 h-full w-full font-sans" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-[clamp(14px,2vw,28px)]">
          <span className="max-w-[30ch] text-[clamp(0.95rem,1.3vw,1.2rem)] font-medium tracking-tight">{caption}</span>
          <MotionPill />
        </div>
      </div>
    </div>
  );
}
