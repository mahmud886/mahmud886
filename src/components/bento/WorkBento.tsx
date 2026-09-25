'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { moreProjects, projects, type Project } from '@/lib/data';
import Heading from './Heading';
import Tile from './Tile';

const layout = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-12'];

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-6">
      <motion.button
        aria-label="Close"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        layoutId={`card-${p.slug}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`title-${p.slug}`}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-line bg-paper shadow-2xl"
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <motion.div layoutId={`img-${p.slug}`} className="relative aspect-[16/9] overflow-hidden">
          <Image src={p.images[0]} alt={`${p.title} screenshot`} fill sizes="768px" className="object-cover object-top" />
        </motion.div>
        <button
          onClick={onClose}
          aria-label="Close project"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75"
        >
          ✕
        </button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }} exit={{ opacity: 0 }} className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted">
            <span className="chip">{p.kind}</span>
            <span>{p.period}</span>
          </div>
          <h3 id={`title-${p.slug}`} className="mt-3 font-display text-4xl font-bold tracking-tight">
            {p.title}
          </h3>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.overview}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="rounded-2xl border border-line bg-paper-2/60 p-3.5 text-[14px] leading-relaxed text-ink-2">
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link href={`/projects/${p.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-pop px-5 text-sm font-semibold text-pop-ink">
              Full case study →
            </Link>
            <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium hover:bg-paper-2">
              Visit live site ↗
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WorkBento() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <>
      <Heading id="work" kicker="Selected work" title="Products shipped to real users.">
        Tap a card to open it — every one of these is live, measured and still evolving.
      </Heading>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        {projects.map((p, i) => {
          const wide = i === 2;
          return (
            <Tile key={p.slug} delay={i * 0.06} className={`${layout[i]} !p-0`}>
              <motion.button
                layoutId={`card-${p.slug}`}
                onClick={() => setOpen(p)}
                className={`group grid h-full w-full text-left ${wide ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}
                aria-label={`Open ${p.title}`}
              >
                <motion.div layoutId={`img-${p.slug}`} className={`relative overflow-hidden ${wide ? 'aspect-[16/9] lg:aspect-auto lg:min-h-[340px]' : 'aspect-[16/10]'}`}>
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    sizes={wide ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 50vw, 100vw'}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </motion.div>
                <div className={`flex flex-col justify-between gap-4 p-5 sm:p-6 ${wide ? 'lg:p-9' : ''}`}>
                  <div>
                    <div className="flex items-center justify-between gap-3 text-[12px] text-muted">
                      <span>{p.kind}</span>
                      <span>{p.period.split('—')[0].trim()}</span>
                    </div>
                    <h3 className={`mt-2 font-display font-bold tracking-tight ${wide ? 'text-4xl' : 'text-3xl'}`}>{p.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-2">{p.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-[-45deg]">→</span>
                  </div>
                </div>
              </motion.button>
            </Tile>
          );
        })}

        <Tile delay={0.1} className="p-6 lg:col-span-12">
          <div className="mb-4 text-[12px] font-medium text-muted">Also built</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moreProjects.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-paper/50 p-4">
                <div className="font-display text-lg font-bold">{p.title}</div>
                <div className="text-[12px] text-muted">{p.kind}</div>
                <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-2">{p.description}</p>
              </div>
            ))}
          </div>
        </Tile>
      </div>

      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
