'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { profile } from '@/lib/data';
import Magnetic from './Magnetic';
import LocalTime from './LocalTime';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // The headline rises out of the floor in 3D as the footer arrives.
      gsap.fromTo(
        '[data-cta-line]',
        { rotateX: -80, yPercent: 60, opacity: 0 },
        {
          rotateX: 0,
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 25%', scrub: 0.8 },
        }
      );
    },
    { scope: root }
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" ref={root} className="relative z-10 overflow-hidden px-4 pb-8 pt-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-6">— Contact</p>
        <h2 className="font-display text-[8.8vw] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] [perspective:800px]">
          <span data-cta-line className="block origin-bottom">Let&apos;s build</span>
          <span data-cta-line className="block origin-bottom text-stroke">something</span>
          <span data-cta-line className="block origin-bottom text-gradient">unreal.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:items-center">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="Say hi"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[image:var(--gradient)] px-6 py-4 text-base font-semibold text-background sm:px-9 sm:py-5 sm:text-lg"
            >
              <span className="relative">Start a project</span>
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-[-45deg]">→</span>
            </a>
          </Magnetic>
          <button onClick={copy} className="inline-flex items-center gap-2 self-start rounded-full glass px-5 py-3 font-mono text-xs text-foreground/80 sm:self-auto sm:text-sm">
            {copied ? '✓ Copied to clipboard' : profile.email}
          </button>
        </div>

        <footer className="mt-20 grid gap-6 border-t border-line pt-6 text-sm text-muted sm:mt-28 sm:grid-cols-3 sm:items-center">
          <div>
            © {new Date().getFullYear()} {profile.name}
          </div>
          <div className="flex gap-5 sm:justify-center">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="font-mono text-xs">
              Dhaka · <LocalTime />
            </span>
            <a href="#top" className="grid h-10 w-10 place-items-center rounded-full glass transition-transform hover:-translate-y-1" aria-label="Back to top">
              ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
