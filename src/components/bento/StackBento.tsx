import { profile } from '@/lib/data';
import Heading from './Heading';
import Tile from './Tile';

const blurbs: Record<string, string> = {
  Frontend: 'Where I live every day.',
  'Backend & API': 'Enough to own the whole feature.',
  'DevOps & Tools': 'How it gets tested and shipped.',
};

export default function StackBento() {
  return (
    <>
      <Heading id="stack" kicker="Toolbox" title="The stack behind the work.">
        Boring where it should be, delightful where it counts.
      </Heading>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {Object.entries(profile.skills).map(([group, items], i) => (
          <Tile key={group} delay={i * 0.06} className="p-6">
            <div className="font-display text-xl font-bold">{group}</div>
            <div className="text-[13px] text-muted">{blurbs[group]}</div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {items.map((s) => (
                <span key={s} className="chip !text-[13px]">
                  {s}
                </span>
              ))}
            </div>
          </Tile>
        ))}
        {profile.services.map((s, i) => (
          <Tile key={s.title} delay={i * 0.05} className={`p-6 ${i === 0 ? 'md:col-span-2' : ''} ${i === 3 ? 'md:col-span-2' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pop" />
              <div className="font-display text-lg font-bold">{s.title}</div>
            </div>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
          </Tile>
        ))}
      </div>
    </>
  );
}
