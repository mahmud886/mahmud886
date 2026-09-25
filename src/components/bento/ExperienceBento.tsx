'use client';

import Link from 'next/link';
import { experience, profile } from '@/lib/data';
import Heading from './Heading';
import Tile from './Tile';

export default function ExperienceBento() {
  return (
    <>
      <Heading id="experience" kicker="Experience" title={`${profile.years}+ years, five teams, one obsession.`}>
        From agency-scale email and animation work to owning the UI of an app used by two million people a day.
      </Heading>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <Tile className="p-2 sm:p-3 lg:col-span-7">
          <ol>
            {experience.map((j, i) => (
              <li key={j.slug}>
                <Link href={`/work/${j.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-[20px] p-4 transition-colors hover:bg-paper-2/70 sm:p-5">
                  <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-pop ring-4 ring-pop/25' : 'bg-line ring-1 ring-muted/40'}`} />
                  <div>
                    <div className="font-display text-lg font-bold leading-tight sm:text-xl">{j.company}</div>
                    <div className="mt-0.5 text-[13.5px] text-ink-2">{j.role}</div>
                    <p className="mt-2 hidden text-[14px] leading-relaxed text-muted sm:block">{j.summary}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="whitespace-nowrap text-[12px] text-muted">{j.period.replace(' — ', ' – ')}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Tile>

        <Tile delay={0.08} className="p-6 sm:p-7 lg:col-span-5">
          <div className="text-[12px] font-medium text-muted">How I work</div>
          <ol className="mt-5 space-y-5">
            {profile.process.map((s, i) => (
              <li key={s.step} className="grid grid-cols-[40px_1fr] gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pop font-display text-sm font-bold text-pop-ink">{i + 1}</span>
                <div>
                  <div className="font-display text-lg font-bold">{s.step}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-7 border-t border-line pt-5 text-[13px] text-ink-2">
            🎓 {profile.education[0].title} — {profile.education[0].place}
          </div>
        </Tile>
      </div>
    </>
  );
}
