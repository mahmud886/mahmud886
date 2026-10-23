'use client';

import { useEffect, useRef } from 'react';
import { useMotion } from '@/lib/motion';
import { THEME_EVENT } from '@/lib/nav';
import { forms, LINES, PTS } from '@/lib/sculpture';

const BUCKETS = 8;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A wireframe sculpture drawn in the surrounding text colour. Each index is a different
 * form; the lines re-form, front to back, when it changes. It turns slowly, leans with the
 * pointer, and stops on Pause.
 */
export default function LineSculpture({ index, scale: fill = 0.42, className = '' }: { index: number; scale?: number; className?: string }) {
  const { paused } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ goTo: (i: number) => void; repaint: () => void; kick: () => void } | null>(null);
  const pausedRef = useRef(paused);
  // Share of the canvas the form fills; read by the draw loop.
  const fillRef = useRef(fill);
  useEffect(() => {
    fillRef.current = fill;
    api.current?.repaint();
  }, [fill]);

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
      const scale = Math.min(w, h) * fillRef.current;
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

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden />;
}
