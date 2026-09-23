'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { markIntroDone } from '@/lib/intro';
import { profile } from '@/lib/data';

const SEEN_KEY = 'intro-seen';

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === '1';
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {}
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const finish = () => {
        setDone(true);
        markIntroDone();
      };

      if (seen || reduce) {
        finish();
        return;
      }

      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>('[data-count]')!;
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(counter, {
        v: 100,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v)).padStart(3, '0');
        },
      })
        .to('[data-bar]', { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .from('[data-name] span', { yPercent: 110, stagger: 0.04, duration: 0.6, ease: 'expo.out' }, 0.1)
        .to('[data-inner]', { yPercent: -30, opacity: 0, duration: 0.45, ease: 'power3.in' }, '+=0.05')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.2')
        .call(markIntroDone, [], '-=0.55');
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      data-preloader
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div data-inner className="flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-8">
        <div data-name className="overflow-hidden font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-7xl">
          {profile.name.split('').map((c, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <span className="eyebrow">Booting experience</span>
          <span data-count className="font-mono text-5xl tabular-nums text-gradient sm:text-7xl">
            000
          </span>
        </div>
        <div className="h-px w-full bg-line">
          <div data-bar className="h-full origin-left scale-x-0 bg-[image:var(--gradient)]" />
        </div>
      </div>
    </div>
  );
}
