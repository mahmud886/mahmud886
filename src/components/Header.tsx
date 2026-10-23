'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { profile } from '@/lib/data';
import { useMotion } from '@/lib/motion';
import { MENU_EVENT, PALETTE_EVENT, sections, THEME_EVENT, toggleTheme } from '@/lib/nav';
import LocalTime from './LocalTime';

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
      <MotionGlyph paused={paused} />
      <span suppressHydrationWarning>{paused ? 'Play' : 'Pause'}</span>
    </button>
  );
}

function MotionGlyph({ paused }: { paused: boolean }) {
  return (
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
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2 text-[14px] font-extrabold uppercase tracking-[-0.03em] ${className}`} aria-label={`${profile.name}, home`}>
      <span aria-hidden className="relative grid h-3.5 w-3.5 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-20 [animation-duration:2.4s]" />
        <span className="h-3.5 w-3.5 rounded-full bg-current transition-transform duration-500 group-hover:scale-[0.6]" />
      </span>
      <span>
        {profile.firstName}
        <span className="font-medium"> {profile.lastName}</span>
      </span>
    </Link>
  );
}

/** Frosted island: every part of the header floats on its own pane, readable over any section. */
const island =
  'rounded-full border border-line bg-paper/70 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(1px))]:bg-paper';

const iconBtn =
  'grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper';

function IconButton({ label, onClick, children, pressed }: { label: string; onClick: () => void; children: React.ReactNode; pressed?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-pressed={pressed} title={label} className={iconBtn}>
      {children}
    </button>
  );
}

function ThemeIcon() {
  const theme = useThemeName();
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
      {theme === 'dark' ? (
        <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
        </>
      )}
    </svg>
  );
}

// The centre of the header holds the main chapters; the rest live in the menu, footer and ⌘K.
const NAV = ['products', 'work', 'lab', 'services', 'experience', 'writing'];
const WIDE_ONLY = new Set(['services', 'writing']);

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  // On the homepage the hero carries its own nav; this header waits until that has scrolled away.
  const [heroNav, setHeroNav] = useState(false);
  const [mac, setMac] = useState(true);
  const { paused, toggle } = useMotion();
  const first = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the platform is only known in the browser
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const el = isHome ? document.getElementById('hero-nav') : null;
    if (!el) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no hero on this page
      setHeroNav(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setHeroNav(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    addEventListener(MENU_EVENT, onOpen);
    return () => removeEventListener(MENU_EVENT, onOpen);
  }, []);

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

  // Out of the way while reading down, back the moment you scroll up.
  useEffect(() => {
    let last = scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
    };
  }, []);

  // Slide the marker under whichever link is current.
  const current = isHome ? active : pathname === '/resume' ? 'resume' : null;
  useLayoutEffect(() => {
    const nav = navRef.current;
    const m = marker.current;
    if (!nav || !m) return;
    const place = () => {
      const link = current ? nav.querySelector<HTMLElement>(`[data-id="${current}"]`) : null;
      if (!link || link.offsetWidth === 0) {
        m.style.opacity = '0';
        return;
      }
      m.style.opacity = '1';
      m.style.transform = `translateX(${link.offsetLeft}px)`;
      m.style.width = `${link.offsetWidth}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [current]);

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
  const nav = NAV.map((id) => sections.find((s) => s.id === id)!);
  const palette = () => window.dispatchEvent(new Event(PALETTE_EVENT));

  return (
    <>
      <header
        className={`site-chrome fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${(hidden || heroNav) && !open ? '-translate-y-[130%]' : ''}`}
        inert={heroNav && !open ? true : undefined}
      >
        <div className="flex h-[var(--hh)] items-center justify-between gap-3 px-[var(--pad)]">
          <div className={`${island} flex h-11 items-center px-4`}>
            <Logo />
          </div>

          <nav ref={navRef} aria-label="Sections" className={`${island} relative hidden h-11 items-center p-1 lg:flex`}>
            <span
              ref={marker}
              aria-hidden
              className="absolute bottom-1 left-0 top-1 rounded-full bg-ink opacity-0 transition-[transform,width,opacity] duration-500 ease-out-expo"
            />
            {nav.map((s) => (
              <Link
                key={s.id}
                href={href(s.id)}
                data-id={s.id}
                aria-current={current === s.id ? 'location' : undefined}
                className={`relative z-10 h-9 items-center rounded-full px-3.5 text-[12px] font-semibold uppercase tracking-[0.07em] transition-colors duration-300 xl:px-4 ${
                  WIDE_ONLY.has(s.id) ? 'hidden xl:flex' : 'flex'
                } ${current === s.id ? 'text-paper' : 'text-ink-2 hover:text-ink'}`}
              >
                {s.label}
              </Link>
            ))}
            <span aria-hidden className="mx-1 h-4 w-px bg-line" />
            <Link
              href="/resume"
              data-id="resume"
              aria-current={current === 'resume' ? 'page' : undefined}
              className={`relative z-10 flex h-9 items-center rounded-full px-3.5 text-[12px] font-semibold uppercase tracking-[0.07em] transition-colors duration-300 ${
                current === 'resume' ? 'text-paper' : 'text-ink-2 hover:text-ink'
              }`}
            >
              Resume
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className={`${island} flex h-11 items-center gap-0.5 px-1`}>
              <button
                type="button"
                onClick={palette}
                aria-label="Search and jump (command palette)"
                title="Search"
                className="hidden h-9 items-center gap-2 rounded-full pl-3 pr-2 text-ink-2 transition-colors hover:bg-ink hover:text-paper md:flex"
              >
                <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m20 20-4.2-4.2" />
                </svg>
                <kbd className="rounded-md border border-current/25 px-1.5 py-0.5 font-mono text-[10px] leading-none opacity-70" suppressHydrationWarning>
                  {mac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </button>
              <IconButton label="Toggle dark mode" onClick={toggleTheme}>
                <ThemeIcon />
              </IconButton>
              <span className="hidden sm:contents">
                <IconButton label={paused ? 'Play motion' : 'Pause motion'} onClick={toggle} pressed={paused}>
                  <MotionGlyph paused={paused} />
                </IconButton>
              </span>
              <button
                type="button"
                className={`${iconBtn} lg:hidden`}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                <span aria-hidden className="flex w-4 flex-col gap-[5px]">
                  <span className="h-[1.5px] w-full bg-current" />
                  <span className="h-[1.5px] w-2/3 bg-current" />
                </span>
              </button>
            </div>
            <Link
              href={href('contact')}
              className="group hidden h-11 items-center gap-2 rounded-full bg-ink pl-5 pr-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-paper shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/20 sm:flex"
            >
              Let’s talk
              <span className="grid h-8 w-8 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="inv site-chrome fixed inset-0 z-[70] flex flex-col overflow-y-auto px-[var(--pad)] pb-6 [animation:menu-fade_0.45s_var(--ease-out-expo)]"
        >
          <div className="flex h-[var(--hh)] shrink-0 items-center justify-between">
            <Logo />
            <button type="button" className="pill" onClick={() => setOpen(false)}>
              Close ✕
            </button>
          </div>
          <nav aria-label="Menu" className="mt-4 flex flex-1 flex-col justify-center">
            {[...sections, { id: 'resume', label: 'Resume' }].map((s, k) => (
              <Link
                key={s.id}
                ref={k === 0 ? first : undefined}
                href={s.id === 'resume' ? '/resume' : href(s.id)}
                onClick={() => setOpen(false)}
                style={{ ['--k' as string]: k }}
                className="group flex items-baseline gap-4 border-b border-line py-1.5 [animation:menu-item_0.7s_var(--ease-out-expo)_both] [animation-delay:calc(var(--k)*45ms+80ms)]"
              >
                <span className="w-7 font-mono text-[11px] text-muted">{String(k + 1).padStart(2, '0')}</span>
                <span className="text-[clamp(2.2rem,10vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.05em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  {s.label}
                  <span className="stop">.</span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-4 border-t border-line pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-1.5">
              <a href={`mailto:${profile.email}`} className="block text-[15px] underline decoration-1 underline-offset-4">
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-2">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label} ↗
                  </a>
                ))}
              </div>
              <div className="label">
                Dhaka <LocalTime /> · available for work
              </div>
            </div>
            <span className="flex gap-1.5">
              <ThemePill />
              <MotionPill />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
