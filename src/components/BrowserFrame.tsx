import Image from 'next/image';

/** A screenshot in a quiet browser frame: greyscale at rest, colour on hover. */
export default function BrowserFrame({ src, url, alt, priority, sizes }: { src: string; url: string; alt: string; priority?: boolean; sizes: string }) {
  return (
    <div className="group overflow-hidden rounded-[clamp(14px,1.6vw,22px)] border border-line bg-paper-2">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2 w-2 rounded-full border border-ink/40" />
        <span className="h-2 w-2 rounded-full border border-ink/40" />
        <span className="h-2 w-2 rounded-full border border-ink/40" />
        <span className="ml-2 truncate font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">{url.replace(/^https:\/\/(www\.)?/, '')}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="mono-img object-cover object-top group-hover:scale-[1.02]" />
      </div>
    </div>
  );
}
