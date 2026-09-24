import { profile } from '@/lib/data';
import SectionHead from './SectionHead';

const level: Record<string, string> = {
  Frontend: 'expert',
  'Backend & API': 'proficient',
  'DevOps & Tools': 'daily',
};

function Key({ children }: { children: string }) {
  return <span className="text-[var(--code-key)]">&quot;{children}&quot;</span>;
}
function Str({ children }: { children: string }) {
  return <span className="text-[var(--code-str)]">&quot;{children}&quot;</span>;
}

export default function Stack() {
  const groups = Object.entries(profile.skills);
  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <SectionHead n="03" label="Stack & approach" title={<>Boring where it should be, <span className="font-serif font-normal italic text-accent">delightful</span> where it counts.</>} />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <div className="label mb-5">How I work</div>
          <ol className="space-y-6">
            {profile.process.map((s, i) => (
              <li key={s.step} data-reveal style={{ ['--i' as string]: i }} className="grid grid-cols-[44px_1fr] gap-3">
                <span className="font-mono text-sm text-accent">0{i + 1}.</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.step}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="label mb-4 mt-12">What I can own</div>
          <div data-reveal className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
            {profile.services.map((s) => (
              <div key={s.title} className="bg-paper p-5">
                <div className="font-semibold">{s.title}</div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="card ticks overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2 font-mono text-[11px] text-muted">
              <span>package.json</span>
              <span>{groups.reduce((n, [, v]) => n + v.length, 0)} dependencies</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75]">
              <code>
                {'{\n'}
                {'  '}
                <Key>name</Key>: <Str>iqbal-mahmud</Str>,{'\n'}
                {'  '}
                <Key>version</Key>: <Str>{`${profile.years}.0.0`}</Str>,{'\n'}
                {'  '}
                <Key>role</Key>: <Str>{profile.role.toLowerCase()}</Str>,{'\n'}
                {groups.map(([group, items], gi) => (
                  <span key={group}>
                    {'  '}
                    <span className="text-[var(--code-com)]">{`// ${group}`}</span>
                    {'\n  '}
                    <Key>{group.toLowerCase().replace(/[^a-z]+/g, '_')}</Key>
                    {': {\n'}
                    {items.map((s, i) => (
                      <span key={s}>
                        {'    '}
                        <Key>{s}</Key>: <Str>{level[group] ?? 'daily'}</Str>
                        {i < items.length - 1 ? ',' : ''}
                        {'\n'}
                      </span>
                    ))}
                    {'  }'}
                    {gi < groups.length - 1 ? ',' : ''}
                    {'\n'}
                  </span>
                ))}
                {'}'}
              </code>
            </pre>
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted">Levels are honest: “expert” is what I ship with every week.</p>
        </div>
      </div>
    </section>
  );
}
