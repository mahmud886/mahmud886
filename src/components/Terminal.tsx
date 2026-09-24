'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { experience, profile, projects } from '@/lib/data';
import { toggleTheme } from '@/lib/nav';

type Line = { kind: 'in' | 'out' | 'accent' | 'muted'; text: string; href?: string };

const HELP: Line[] = [
  { kind: 'muted', text: 'available commands:' },
  { kind: 'out', text: '  whoami      who is this' },
  { kind: 'out', text: '  projects    things I have shipped' },
  { kind: 'out', text: '  experience  where I have worked' },
  { kind: 'out', text: '  stack       what I build with' },
  { kind: 'out', text: '  contact     how to reach me' },
  { kind: 'out', text: '  resume      open the resume' },
  { kind: 'out', text: '  theme       toggle light / dark' },
  { kind: 'out', text: '  clear       clear the screen' },
];

function respond(cmd: string): Line[] | 'clear' | { go: string } {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case '':
      return [];
    case 'help':
    case 'ls':
      return HELP;
    case 'whoami':
      return [
        { kind: 'accent', text: `${profile.name} — ${profile.role}` },
        { kind: 'out', text: `${profile.years}+ years building for the web · ${profile.location}` },
        { kind: 'out', text: profile.currently },
      ];
    case 'projects':
      return projects.flatMap((p) => [{ kind: 'accent' as const, text: `▸ ${p.title}`, href: `/projects/${p.slug}` }, { kind: 'muted' as const, text: `  ${p.kind}` }]);
    case 'experience':
    case 'git log':
      return experience.map((j) => ({ kind: 'out' as const, text: `${j.period.padEnd(20)} ${j.role} @ ${j.company}` }));
    case 'stack':
      return Object.entries(profile.skills).map(([k, v]) => ({ kind: 'out' as const, text: `${k.padEnd(15)} ${v.slice(0, 5).join(', ')}` }));
    case 'contact':
      return [
        { kind: 'out', text: `email     ${profile.email}`, href: `mailto:${profile.email}` },
        ...profile.socials.map((s) => ({ kind: 'out' as const, text: `${s.label.toLowerCase().padEnd(9)} ${s.handle}`, href: s.href })),
      ];
    case 'resume':
      return { go: '/resume' };
    case 'theme':
      toggleTheme();
      return [{ kind: 'muted', text: 'theme toggled' }];
    case 'clear':
      return 'clear';
    case 'sudo hire-me':
    case 'hire':
      if (typeof window !== 'undefined') window.location.href = `mailto:${profile.email}?subject=Let's work together`;
      return [{ kind: 'accent', text: 'permission granted. opening your mail client…' }];
    default:
      return [{ kind: 'muted', text: `command not found: ${c}. try "help"` }];
  }
}

// The intro plays itself, then the prompt is handed to the visitor.
const SCRIPT = ['whoami', 'projects'];

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState('');
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const exec = (cmd: string) => {
    const out = respond(cmd);
    if (out === 'clear') return setLines([]);
    if ('go' in out) {
      setLines((l) => [...l, { kind: 'in', text: cmd }, { kind: 'muted', text: `opening ${out.go}…` }]);
      router.push(out.go);
      return;
    }
    setLines((l) => [...l, { kind: 'in', text: cmd }, ...out]);
  };

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
    (async () => {
      await sleep(500);
      for (const cmd of SCRIPT) {
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          setTyping(cmd.slice(0, i));
          await sleep(55 + Math.random() * 60);
        }
        await sleep(220);
        if (cancelled) return;
        setTyping('');
        exec(cmd);
        await sleep(650);
      }
      if (!cancelled) {
        setLines((l) => [...l, { kind: 'muted', text: 'type "help" to explore ↓' }]);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the intro runs once
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines, typing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      exec(value);
      if (value.trim()) setHistory((h) => [value, ...h]);
      setValue('');
      setCursor(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : '');
    }
  };

  const prompt = (
    <span className="shrink-0 select-none">
      <span className="text-ok">iqbal</span>
      <span className="text-muted">@portfolio</span> <span className="text-link">~</span>
      <span className="text-muted"> $ </span>
    </span>
  );

  return (
    <div className="card ticks overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]" onClick={() => input.current?.focus()}>
      <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-muted">iqbal@portfolio — zsh</span>
      </div>
      <div ref={body} className="h-[300px] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed sm:h-[340px]" aria-live="polite">
        {lines.map((l, i) =>
          l.kind === 'in' ? (
            <div key={i} className="flex">
              {prompt}
              <span>{l.text}</span>
            </div>
          ) : (
            <div key={i} className={`whitespace-pre-wrap ${l.kind === 'accent' ? 'text-accent' : l.kind === 'muted' ? 'text-muted' : 'text-ink-2'}`}>
              {l.href ? (
                <a href={l.href} className="underline decoration-line underline-offset-4 hover:decoration-current">
                  {l.text}
                </a>
              ) : (
                l.text
              )}
            </div>
          )
        )}
        <div className="flex">
          {prompt}
          {ready ? (
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
              className="w-full bg-transparent caret-accent outline-none"
            />
          ) : (
            <span className="caret">{typing}</span>
          )}
        </div>
      </div>
    </div>
  );
}
