'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { experience, profile, projects } from '@/lib/data';
import { PALETTE_EVENT, sections, toggleTheme } from '@/lib/nav';

type Item = { group: string; label: string; hint?: string; run: () => void };

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setIndex(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...sections.map((s) => ({ group: 'Go to', label: s.label, hint: `#${s.id}`, run: go(`/#${s.id}`) })),
      { group: 'Go to', label: 'Resume', hint: '/resume', run: go('/resume') },
      ...projects.map((p) => ({ group: 'Projects', label: p.title, hint: p.kind, run: go(`/projects/${p.slug}`) })),
      ...experience.map((j) => ({ group: 'Experience', label: j.company, hint: j.role, run: go(`/work/${j.slug}`) })),
      { group: 'Actions', label: 'Toggle dark mode', hint: 'theme', run: toggleTheme },
      {
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setToast('Email copied');
            setTimeout(() => setToast(''), 1800);
          });
        },
      },
      {
        group: 'Actions',
        label: 'Download resume (PDF)',
        hint: `${profile.cvName}.pdf`,
        run: () => {
          const a = document.createElement('a');
          a.href = profile.cv;
          a.download = `${profile.cvName}.pdf`;
          a.click();
        },
      },
      ...profile.socials.map((s) => ({ group: 'Links', label: s.label, hint: s.handle, run: () => window.open(s.href, '_blank', 'noopener') })),
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.group} ${i.label} ${i.hint ?? ''}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    close();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(filtered[index]);
    }
  };

  let lastGroup = '';

  return (
    <>
      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-md bg-ink px-3 py-2 font-mono text-xs text-paper shadow-lg">
          ✓ {toast}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/30 px-3 pt-[12vh] backdrop-blur-sm" onMouseDown={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            className="card w-full max-w-lg overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center gap-2 border-b border-line px-4">
              <span className="font-mono text-sm text-accent">❯</span>
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, project, or action…"
                className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
                aria-controls="palette-list"
                aria-activedescendant={`palette-${index}`}
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
            </div>
            <ul ref={list} id="palette-list" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center font-mono text-xs text-muted">No matches for “{query}”</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <li key={`${item.group}-${item.label}`}>
                    {header && <div className="label px-3 pb-1 pt-3">{header}</div>}
                    <button
                      id={`palette-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={i === index}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm ${
                        i === index ? 'bg-paper-2 text-ink' : 'text-ink-2'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`font-mono text-xs ${i === index ? 'text-accent' : 'text-muted'}`}>→</span>
                        {item.label}
                      </span>
                      {item.hint && <span className="truncate font-mono text-[11px] text-muted">{item.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[10px] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto">{filtered.length} results</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
