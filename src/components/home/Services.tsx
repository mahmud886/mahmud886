'use client';

import { useState } from 'react';
import { profile } from '@/lib/data';
import LineSculpture from '@/components/LineSculpture';

/** One short italic line per service, in the same order as profile.services. */
const VOICE = ['Typed end to end.', 'Movement with intent.', 'Sub-second, always.', 'One source of truth.'];

/** The sculpture for the service in focus, with a caption; tapping it moves to the next. */
function Sculpture({ index, onNext }: { index: number; onNext: () => void }) {
  const label = profile.services[index].title;
  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        onClick={onNext}
        data-cursor="Shift"
        className="relative min-h-0 flex-1"
        aria-label={`Shift the sculpture to the next form. Showing ${label}.`}
      >
        <LineSculpture index={index} className="absolute inset-0 text-ink" />
      </button>
      <p className="label mt-3 border-t border-line pt-3" aria-live="polite">
        The shape of it — {String(index + 1).padStart(2, '0')}/{String(profile.services.length).padStart(2, '0')} — <b className="text-ink">{label}</b>
        <span className="hidden sm:inline"> · tap to shift</span>
      </p>
    </div>
  );
}

export default function Services() {
  const [index, setIndex] = useState(0);
  const n = profile.services.length;
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-0 px-[var(--pad)] py-[clamp(90px,12vw,190px)]">
      <div className="mb-[clamp(32px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
        <h2 id="services-title" className="chapter">
          What I do<span className="stop">.</span>
        </h2>
        <p className="max-w-[38ch] text-[15px] leading-snug text-ink-2">
          Four things, done properly. Hover a line to see its shape — or tap the sculpture.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="h-[min(100vw,560px)] lg:sticky lg:top-[calc(var(--hh)+24px)] lg:h-[min(70svh,640px)]">
          <Sculpture index={index} onNext={() => setIndex((i) => (i + 1) % n)} />
        </div>

        <ol className="border-t border-ink">
          {profile.services.map((s, i) => (
            <li key={s.title} className="border-b border-line">
              <button
                type="button"
                onPointerEnter={(e) => e.pointerType === 'mouse' && setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group grid w-full grid-cols-[40px_minmax(0,1fr)] gap-x-4 py-[clamp(20px,2.4vw,34px)] text-left"
              >
                <span className={`pt-2 font-mono text-[11px] transition-colors ${i === index ? 'text-ink' : 'text-muted'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span
                    className={`block text-[clamp(1.9rem,3.6vw,3.4rem)] font-bold leading-[0.95] tracking-[-0.05em] transition-[opacity,transform] duration-500 ease-out-expo ${
                      i === index ? 'translate-x-0 opacity-100' : 'opacity-35 group-hover:opacity-70'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="serif-i mt-2 block text-[clamp(1.1rem,1.6vw,1.45rem)]">{VOICE[i]}</span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${
                      i === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[52ch] pt-3 text-[15px] leading-relaxed text-ink-2">{s.text}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
