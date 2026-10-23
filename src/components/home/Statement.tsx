'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/lib/data';
import { useMotion } from '@/lib/motion';

const AUDIENCE = ['founders', 'products', 'teams', 'people', 'brands'];

function RotatingWord() {
  const { paused } = useMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % AUDIENCE.length), 2200);
    return () => clearInterval(id);
  }, [paused]);
  return (
    <span className="rotor serif-i">
      <span className="sr-only">{AUDIENCE.join(', ')}.</span>
      <span key={i} aria-hidden>
        {AUDIENCE[i]}.
      </span>
    </span>
  );
}

/** Paragraph whose words darken as it scrolls through the viewport. CSS vars only, no re-renders. */
function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const start = innerHeight * 0.88;
      const end = innerHeight * 0.35;
      const p = (start - r.top) / (start - end + r.height * 0.5);
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, p))));
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
    <p ref={ref} className="scrub text-[clamp(1.5rem,2.9vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em]" style={{ ['--n' as string]: words.length }}>
      {words.map((w, i) => (
        <span key={i} style={{ ['--i' as string]: i }}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}

/** Counts up from zero the first time it scrolls into view. */
function Count({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    el.textContent = '0';
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        el.textContent = String(Math.round(value * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value]);
  return (
    <>
      <span ref={ref}>{value}</span>
      {suffix}
    </>
  );
}

export default function Statement() {
  return (
    <section className="px-[var(--pad)] py-[clamp(90px,12vw,190px)]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <h2 className="chapter" data-reveal>
          Interfaces that feel alive, for <RotatingWord />
        </h2>
        <div className="lg:pt-3">
          <ScrubText text={profile.manifesto} />
          <p className="mt-8 max-w-[56ch] leading-relaxed text-ink-2" data-reveal>
            {profile.summary}
          </p>
        </div>
      </div>

      <dl className="mt-[clamp(64px,8vw,120px)] grid grid-cols-2 border-t border-ink lg:grid-cols-4">
        {profile.stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            style={{ ['--i' as string]: i }}
            className={`flex flex-col justify-between gap-6 border-line py-5 pr-4 ${i % 2 ? 'border-l pl-4' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-4' : ''}`}
          >
            <dt className="label">{s.label}</dt>
            <dd className="text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.85] tracking-[-0.06em] tabular-nums">
              <Count value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
