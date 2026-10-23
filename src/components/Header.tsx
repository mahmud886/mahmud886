'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { profile } from '@/lib/data';
import { useMotion } from '@/lib/motion';
import { PALETTE_EVENT, sections, THEME_EVENT, toggleTheme } from '@/lib/nav';

const TICKER = [
  'Building 4 SaaS products in 2026',
  'Open to new roles & freelance work',
  'React · Next.js · TypeScript · GSAP',
  'Based in Dhaka, shipping worldwide',
  `${profile.years}+ years building for the web`,
];

function subscribeTheme(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}

/** "Light" or "Dark": the mode you are in. Neutral until the pre-paint answer is read. */
function useThemeName() {
  return useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme ?? 'light', () => '');
}

export function ThemePill({ className = '' }: { className?: string }) {
  const theme = useThemeName();
  return (
    <button type="button" onClick={toggleTheme} className={`pill ${className}`} aria-label="Toggle dark mode">
      <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]" />
      <span suppressHydrationWarning>{theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Mode'}</span>
    </button>
  );
}

export function MotionPill({ className = '' }: { className?: string }) {
  const { paused, toggle } = useMotion();
  return (
    <button type="button" onClick={toggle} className={`pill ${className}`} aria-pressed={paused} aria-label={paused ? 'Play motion' : 'Pause motion'}>
      <span aria-hidden className="flex h-2.5 w-2.5 items-center justify-center gap-[2px]">
        {paused ? (
          <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
        ) : (
          <>
            <span className="h-2.5 w-[3px] bg-current" />
            <span className="h-2.5 w-[3px] bg-current" />
          </>
        )}
      </span>
      <span suppressHydrationWarning>{paused ? 'Play' : 'Pause'}</span>
    </button>
  );
}

function Ticker() {
  const { paused } = useMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (paused || hold) return;
    const id = setInterval(() => setI((n) => (n + 1) % TICKER.length), 3600);
    return () => clearInterval(id);
  }, [paused, hold]);
  return (
    <div className="ticker text-[13px] font-medium tracking-tight" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
      {TICKER.map((t, k) => (
        <span key={t} data-on={k === i} aria-hidden={k !== i}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2 text-[15px] font-extrabold uppercase tracking-[-0.03em] ${className}`} aria-label={`${profile.name}, home`}>
      <span aria-hidden className="h-3.5 w-3.5 rounded-full bg-current transition-transform duration-500 group-hover:scale-[0.6]" />
      <span>
        {profile.firstName}
        <span className="font-medium"> {profile.lastName}</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const first = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Scroll-spy: the section crossing the upper third of the viewport is "active".
  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: '-30% 0px -65% 0px',
    });
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = '';
      removeEventListener('keydown', onKey);
    };
  }, [open]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  // The header carries the main chapters; the full list lives in the menu, footer and ⌘K.
  const pick = (ids: string[]) => sections.filter((s) => ids.includes(s.id));
  const primary = pick(['products', 'work', 'lab']);
  const secondary = pick(['experience', 'writing', 'contact']);

  return (
    <>
      <header className="blend-chrome fixed inset-x-0 top-0 z-50">
        <div className="flex h-[var(--hh)] items-center justify-between gap-4 px-[var(--pad)]">
          <div className="flex items-center gap-6">
            <Logo />
            <nav aria-label="Sections" className="hidden items-center gap-1.5 lg:flex">
              {primary.map((s) => (
                <Link key={s.id} href={href(s.id)} className="pill" aria-current={isHome && active === s.id ? 'location' : undefined}>
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden min-w-0 2xl:block">
            <Ticker />
          </div>

          <div className="flex items-center gap-1.5">
            <nav aria-label="More sections" className="hidden items-center gap-1.5 xl:flex">
              {secondary.map((s) => (
                <Link key={s.id} href={href(s.id)} className="pill" aria-current={isHome && active === s.id ? 'location' : undefined}>
                  {s.label}
                </Link>
              ))}
            </nav>
            <Link href="/resume" className="pill hidden sm:inline-flex" aria-current={pathname === '/resume' ? 'page' : undefined}>
              Resume
            </Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))} className="pill hidden md:inline-flex" aria-label="Open command palette">
              ⌘K
            </button>
            <ThemePill className="hidden md:inline-flex" />
            <MotionPill className="hidden md:inline-flex" />
            <button type="button" className="pill lg:hidden" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="inv site-chrome fixed inset-0 z-[70] flex flex-col overflow-y-auto px-[var(--pad)] pb-6"
      >
        <div className="flex h-[var(--hh)] shrink-0 items-center justify-between">
          <Logo />
          <button type="button" className="pill" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <nav aria-label="Menu" className="mt-6 flex flex-1 flex-col justify-center gap-1">
          {[...sections, { id: 'resume', label: 'Resume' }].map((s, k) => (
            <Link
              key={s.id}
              ref={k === 0 ? first : undefined}
              href={s.id === 'resume' ? '/resume' : href(s.id)}
              onClick={() => setOpen(false)}
              className="text-[clamp(2.6rem,12vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.05em]"
            >
              {s.label}
              <span className="stop">.</span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <span className="label">{profile.email}</span>
          <span className="flex gap-1.5">
            <ThemePill />
            <MotionPill />
          </span>
        </div>
      </div>
    </>
  );
}
