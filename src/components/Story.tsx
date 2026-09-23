import { profile } from '@/lib/data';
import ScrollText from './ScrollText';

export default function Story() {
  return (
    <section className="relative z-10 px-4 py-16 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow mb-4">— The story so far</p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            From banners to <span className="text-gradient">2M users.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm text-muted sm:text-base">7+ years, five teams, one obsession: interfaces that are fast, precise and alive.</p>
        </div>
        <div className="space-y-10 sm:space-y-14">
          {profile.story.map((para, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6">
              <span className="pt-2 font-mono text-xs text-accent-2">0{i + 1}</span>
              <ScrollText className="text-xl font-medium leading-snug tracking-tight sm:text-3xl">{para}</ScrollText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
