export default function SectionHead({ n, label, title, children }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div data-reveal className="mb-10 grid gap-4 border-t border-line pt-5 sm:mb-14 md:grid-cols-[180px_1fr] md:gap-10">
      <div className="label flex items-center gap-2 self-start md:pt-3">
        <span className="text-accent">{n}</span>
        <span>/ {label}</span>
      </div>
      <div>
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">{title}</h2>
        {children && <div className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">{children}</div>}
      </div>
    </div>
  );
}
