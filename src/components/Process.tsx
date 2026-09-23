'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { profile } from '@/lib/data';

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const steps = profile.process;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pin the stage and flip through steps like a 3D card deck.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-step]');
        gsap.set(cards.slice(1), { rotateX: -90, opacity: 0, yPercent: 40 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '[data-process-stage]', start: 'top top', end: `+=${steps.length * 70}%`, scrub: 0.6, pin: true },
        });
        cards.forEach((card, i) => {
          if (i === 0) return;
          tl.to(cards[i - 1], { rotateX: 90, opacity: 0, yPercent: -40, ease: 'power2.in' }, i).to(
            card,
            { rotateX: 0, opacity: 1, yPercent: 0, ease: 'power2.out' },
            i + 0.3
          );
        });
        tl.to('[data-process-bar]', { scaleY: 1, ease: 'none', duration: steps.length }, 0);
        cards.forEach((_, i) => tl.to(`[data-dot="${i}"]`, { backgroundColor: '#00e5ff', scale: 1.4, duration: 0.2 }, i === 0 ? 0 : i + 0.3));
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative z-10">
      <div data-process-stage className="flex min-h-svh flex-col justify-center px-4 py-16 sm:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="eyebrow mb-4">— How I work</p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              A process built for <span className="text-gradient">zero surprises.</span>
            </h2>
            <div className="mt-10 hidden gap-6 md:flex">
              <div className="relative w-px bg-line">
                <div data-process-bar className="absolute inset-0 origin-top scale-y-0 bg-[image:var(--gradient)]" />
              </div>
              <ol className="space-y-5">
                {steps.map((s, i) => (
                  <li key={s.step} className="flex items-center gap-3 text-sm text-foreground/70">
                    <span data-dot={i} className="h-2 w-2 rounded-full bg-white/20" />
                    {s.step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid gap-4 [perspective:1200px] md:grid-cols-1 md:grid-rows-1">
            {steps.map((s, i) => (
              <article
                key={s.step}
                data-step
                className="origin-center rounded-3xl border border-line bg-[#0b0c14]/85 p-6 backdrop-blur-md [transform-style:preserve-3d] sm:p-10 md:col-start-1 md:row-start-1"
              >
                <div className="font-display text-7xl font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] sm:text-9xl">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{s.step}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/70 sm:text-xl">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
