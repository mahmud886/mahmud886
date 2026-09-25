export default function Heading({ kicker, title, children }: { id?: string; kicker: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="px-1 pb-5 pt-20 sm:pt-28">
      <div className="mb-3 inline-flex items-center gap-2 text-[12px] font-medium text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-pop" />
        {kicker}
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl">{title}</h2>
        {children && <div className="max-w-sm text-[15px] leading-relaxed text-ink-2">{children}</div>}
      </div>
    </div>
  );
}
