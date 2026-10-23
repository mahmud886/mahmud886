'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/lib/data';
import { useMotion } from '@/lib/motion';
import { THEME_EVENT } from '@/lib/nav';
import { forms, LINES, PTS } from '@/lib/sculpture';

const BUCKETS = 8;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** One short italic line per service, in the same order as profile.services. */
const VOICE = ['Typed end to end.', 'Movement with intent.', 'Sub-second, always.', 'One source of truth.'];

/**
 * A wireframe sculpture drawn in the page's ink. Each service has its own form and the
 * lines re-form, front to back, when you pick another. It turns slowly, leans with the
 * pointer, and stops on Pause.
 */
function Sculpture({ index, onNext }: { index: number; onNext: () => void }) {
  const { paused } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ goTo: (i: number) => void; repaint: () => void; kick: () => void } | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) api.current?.kick();
  }, [paused]);

  useEffect(() => {
    api.current?.goTo(index);
  }, [index]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const F = forms();
    const cur = new Float32Array(F[0]);
    let from = new Float32Array(F[0]);
    let to = F[0];
    let ink = '#111';
    const readInk = () => (ink = getComputedStyle(canvas).color || ink);
    let morphStart = -1;
    const MORPH = 1500;
    let ry = -0.6;
    let rx = 0.32;
    let tx = 0.32;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paths: Path2D[] = [];

    function draw() {
      if (!w) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const scale = Math.min(w * 0.42, h * 0.42);
      const D = 3.4;
      const ox = w / 2;
      const oy = h / 2;
      for (let b = 0; b < BUCKETS; b++) paths[b] = new Path2D();
      for (let l = 0; l < LINES; l++) {
        let prevX = 0;
        let prevY = 0;
        let prevZ = 0;
        let lastBucket = -1;
        for (let p = 0; p < PTS; p++) {
          const k = (l * PTS + p) * 3;
          const x1 = cur[k] * cy + cur[k + 2] * sy;
          const z1 = -cur[k] * sy + cur[k + 2] * cy;
          const y2 = cur[k + 1] * cx - z1 * sx;
          const z2 = cur[k + 1] * sx + z1 * cx;
          const f = D / (D - z2);
          const X = ox + x1 * f * scale;
          const Y = oy - y2 * f * scale;
          if (p > 0) {
            // Depth buckets: lines further back are drawn fainter.
            const b = Math.max(0, Math.min(BUCKETS - 1, Math.floor((((z2 + prevZ) / 2 + 1) / 2) * BUCKETS)));
            if (b !== lastBucket) {
              paths[b].moveTo(prevX, prevY);
              lastBucket = b;
            }
            paths[b].lineTo(X, Y);
          }
          prevX = X;
          prevY = Y;
          prevZ = z2;
        }
      }
      ctx.lineWidth = 0.8;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = ink;
      for (let b = 0; b < BUCKETS; b++) {
        ctx.globalAlpha = 0.1 + (b / (BUCKETS - 1)) * 0.8;
        ctx.stroke(paths[b]);
      }
      ctx.globalAlpha = 1;
    }

    function step(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      let morphing = false;
      if (morphStart >= 0) {
        const t = (now - morphStart) / MORPH;
        morphing = t < 1.35;
        for (let l = 0; l < LINES; l++) {
          const lt = ease(Math.max(0, Math.min(1, t * 1.35 - (l / LINES) * 0.35)));
          const base = l * PTS * 3;
          for (let i = base; i < base + PTS * 3; i++) cur[i] = from[i] + (to[i] - from[i]) * lt;
        }
        if (!morphing) morphStart = -1;
      }
      const live = !pausedRef.current;
      if (live) {
        ry += dt * 0.00018;
        rx += (tx - rx) * 0.04;
      }
      draw();
      if (visible && (live || morphing)) raf = requestAnimationFrame(step);
      else raf = 0;
    }

    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    api.current = {
      goTo(i) {
        if (to === F[i]) return;
        from = new Float32Array(cur);
        to = F[i];
        if (reduced) {
          cur.set(to);
          draw();
          return;
        }
        morphStart = performance.now();
        start();
      },
      repaint() {
        readInk();
        draw();
      },
      kick: start,
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      draw();
    };
    const onMove = (e: PointerEvent) => {
      if (pausedRef.current) return;
      tx = 0.18 + (e.clientY / innerHeight) * 0.36;
      ry += (e.clientX / innerWidth - 0.5) * 0.004;
    };
    const onTheme = () => requestAnimationFrame(() => api.current?.repaint());

    readInk();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener(THEME_EVENT, onTheme);
    resize();
    start();
    return () => {
      ro.disconnect();
      io.disconnect();
      removeEventListener('pointermove', onMove);
      removeEventListener(THEME_EVENT, onTheme);
      cancelAnimationFrame(raf);
      api.current = null;
    };
  }, []);

  const label = profile.services[index].title;
  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={onNext}
        data-cursor="Shift"
        className="relative min-h-0 flex-1"
        aria-label={`Shift the sculpture to the next form. Showing ${label}.`}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full text-ink" aria-hidden />
      </button>
      <p className="label mt-3 border-t border-line pt-3" aria-live="polite">
        The shape of it — {String(index + 1).padStart(2, '0')}/{String(profile.services.length).padStart(2, '0')} — <b className="text-ink">{label}</b>
        <span className="hidden sm:inline"> · tap to shift</span>
      </p>
    </div>
  );
}

export default function Services() {
  const [index, setIndex] = useState(0);
  const n = profile.services.length;
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-0 px-[var(--pad)] py-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <h2 id="services-title" className="chapter">
          What I do<span className="stop">.</span>
        </h2>
        <p className="max-w-[38ch] text-[15px] leading-snug text-ink-2">
          Four things, done properly. Hover a line to see its shape — or tap the sculpture.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="h-[min(100vw,560px)] lg:sticky lg:top-[calc(var(--hh)+24px)] lg:h-[min(70svh,640px)]">
          <Sculpture index={index} onNext={() => setIndex((i) => (i + 1) % n)} />
        </div>

        <ol className="border-t border-ink">
          {profile.services.map((s, i) => (
            <li key={s.title} className="border-b border-line">
              <button
                type="button"
                onPointerEnter={(e) => e.pointerType === 'mouse' && setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group grid w-full grid-cols-[40px_minmax(0,1fr)] gap-x-4 py-[clamp(20px,2.4vw,34px)] text-left"
              >
                <span className={`pt-2 font-mono text-[11px] transition-colors ${i === index ? 'text-ink' : 'text-muted'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span
                    className={`block text-[clamp(1.9rem,3.6vw,3.4rem)] font-bold leading-[0.95] tracking-[-0.05em] transition-[opacity,transform] duration-500 ease-out-expo ${
                      i === index ? 'translate-x-0 opacity-100' : 'opacity-35 group-hover:opacity-70'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="serif-i mt-2 block text-[clamp(1.1rem,1.6vw,1.45rem)]">{VOICE[i]}</span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${
                      i === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[52ch] pt-3 text-[15px] leading-relaxed text-ink-2">{s.text}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
