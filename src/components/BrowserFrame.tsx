import Image from 'next/image';

export default function BrowserFrame({ src, url, alt, priority, sizes }: { src: string; url: string; alt: string; priority?: boolean; sizes: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-2 truncate rounded bg-paper px-2 py-0.5 font-mono text-[10.5px] text-muted">{url.replace('https://', '')}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
    </div>
  );
}
