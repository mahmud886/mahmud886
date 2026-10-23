'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { profile } from '@/lib/data';

/**
 * How I work, as a deck. Cards are CSS-sticky so they stack while you scroll; with motion
 * allowed each card shrinks and dims a little as the next one slides over it.
 */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.deck-card', ref.current);
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card, {
            scale: 0.93,
            '--dim': 0.25,
            ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 25%', scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section aria-labelledby="process-title" className="px-[var(--pad)] pb-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <h2 id="process-title" className="chapter">
          How I work<span className="stop">.</span>
        </h2>
        <p className="max-w-[34ch] text-[15px] leading-snug text-ink-2">The same four steps, whether it’s a landing page or a platform.</p>
      </div>
      <div ref={ref} className="flex flex-col gap-[4vh]">
        {profile.process.map((p, k) => (
          <article
            key={p.step}
            className={`deck-card grid min-h-[min(48svh,520px)] md:min-h-[min(56svh,520px)] grid-rows-[auto_1fr_auto] rounded-[clamp(16px,2vw,28px)] border border-line p-[clamp(20px,3vw,44px)] ${
              k % 2 ? 'inv' : 'bg-paper-2'
            }`}
            style={{ ['--k' as string]: k }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="label">
                  Step {String(k + 1).padStart(2, '0')} / {String(profile.process.length).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[clamp(2.4rem,6.2vw,6rem)] font-extrabold leading-[0.88] tracking-[-0.06em]">
                  {p.step}
                  <span className="stop">.</span>
                </h3>
              </div>
              <span aria-hidden className="hidden text-[clamp(4rem,11vw,10rem)] font-extrabold sm:block leading-[0.75] tracking-[-0.07em]">
                {String(k + 1).padStart(2, '0')}
              </span>
            </div>
            <div />
            <p className="max-w-[44ch] justify-self-end text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-ink-2">{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
