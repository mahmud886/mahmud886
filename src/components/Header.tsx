'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { profile } from '@/lib/data';
import { PALETTE_EVENT, sections, THEME_EVENT, toggleTheme } from '@/lib/nav';

function ThemeIcon() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === 'dark');
    sync();
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      {dark ? (
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mac, setMac] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- platform is only known in the browser
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: the section crossing the upper third of the viewport is "active".
  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -65% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-paper/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 font-mono text-[13px]">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-[11px] font-semibold text-paper transition-colors group-hover:bg-accent">
            IM
          </span>
          <span className="hidden sm:inline">
            <span className="text-muted">~/</span>
            {profile.lastName.toLowerCase()}
            <span className="caret" />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {sections.map((s) => {
            const on = isHome && active === s.id;
            return (
              <Link
                key={s.id}
                href={isHome ? `#${s.id}` : `/#${s.id}`}
                aria-current={on ? 'location' : undefined}
                className={`relative rounded-md px-3 py-1.5 font-mono text-[12px] transition-colors ${
                  on ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {on && <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-accent" />}
                {s.label.toLowerCase()}
              </Link>
            );
          })}
          <Link
            href="/resume"
            className={`rounded-md px-3 py-1.5 font-mono text-[12px] transition-colors ${pathname === '/resume' ? 'text-ink' : 'text-muted hover:text-ink'}`}
          >
            resume
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
            className="flex h-8 items-center gap-2 rounded-md border border-line px-2.5 font-mono text-[11px] text-muted transition-colors hover:border-ink/30 hover:text-ink"
            aria-label="Open command palette"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">Menu</span>
            <kbd className="hidden rounded border border-line px-1 text-[10px] sm:inline">{mac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink"
            aria-label="Toggle dark mode"
          >
            <ThemeIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
