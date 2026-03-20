'use client';

import gsap from 'gsap';
import { ExternalLink, PlayCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type RunningProject = {
  slug: string;
  name: string;
  since: string;
  status: 'Active' | 'Paused';
  blurb: string;
  milestones: string[];
  progress?: number;
  link?: string;
  image?: string;
  tags?: string[];
  tech?: string[];
  features?: string[];
};

export default function RunningProjectModal({
  project,
  open,
  onClose,
}: {
  project: RunningProject | null;
  open: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'gallery' | 'live'>('gallery');

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement as HTMLElement;
    const prevBody = document.body.style.overflowY;
    const prevHtml = html.style.overflowY;
    document.body.style.overflowY = 'hidden';
    html.style.overflowY = 'hidden';
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.25, ease: 'power2.out' },
    );
    gsap.fromTo(
      cardRef.current,
      { y: 32, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
    );
    return () => {
      document.body.style.overflowY = prevBody || '';
      html.style.overflowY = prevHtml || '';
    };
  }, [open]);

  if (!open || !project) return null;

  const close = () => {
    gsap.to(cardRef.current, { y: 12, opacity: 0, scale: 0.97, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return createPortal(
    <div
      ref={overlayRef}
      className='fixed inset-0 z-[100] bg-background/80 flex items-center justify-center p-4 sm:p-6'
      onClick={close}
      aria-modal='true'
      role='dialog'
      data-modal-open='true'>
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className='relative w-full max-w-7xl max-h-[92vh] rounded-2xl border border-surface-hover bg-surface shadow-2xl overflow-hidden flex flex-col'>
        <button
          onClick={close}
          className='absolute top-4 right-4 z-10 p-2 rounded-full bg-background/60 border border-surface-hover hover:border-primary/50 transition-colors'
          aria-label='Close'>
          <X size={18} />
        </button>

        {/* Header segment: mode switch + media */}
        <div className='border-b border-surface-hover bg-background/40 px-3 py-3 md:px-4 md:py-4 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2 text-xs'>
            <button
              onClick={() => setMode('gallery')}
              className={`rounded-full px-3 py-1.5 border ${mode === 'gallery' ? 'border-primary text-primary bg-background' : 'border-surface-hover text-text-muted hover:text-text-main'}`}>
              Gallery
            </button>
            <button
              onClick={() => setMode('live')}
              disabled={!project.link}
              className={`rounded-full px-3 py-1.5 border ${mode === 'live' ? 'border-primary text-primary bg-background' : 'border-surface-hover text-text-muted hover:text-text-main'} disabled:opacity-50`}>
              Live Preview
            </button>
          </div>
          {project.link && (
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-3 py-1.5 text-xs font-medium hover:border-primary/50 transition-colors'>
              Open in New Tab <ExternalLink size={14} />
            </a>
          )}
        </div>
        {mode === 'gallery' ? (
          <Gallery slug={project.slug} primary={project.image} alt={`${project.name} preview`} />
        ) : (
          <LiveFrame url={project.link || ''} />
        )}

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar'>
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div>
              <div className='text-2xl md:text-3xl font-extrabold flex items-center gap-2'>
                <PlayCircle className='text-primary' size={18} />
                {project.name}
              </div>
              <div className='mt-1 text-primary text-sm'>
                {project.status} · Since {project.since}
              </div>
            </div>
            {project.link && (
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-4 py-2 text-sm font-medium hover:border-primary/50 transition-colors'>
                View Live <ExternalLink size={16} />
              </a>
            )}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {project.tags.map((t) => (
                <span
                  key={t}
                  className='rounded-full border border-surface-hover bg-background/60 px-3 py-1 text-xs text-text-muted'>
                  {t}
                </span>
              ))}
            </div>
          )}

          <p className='mt-4 text-text-muted'>{project.blurb}</p>

          {project.features && project.features.length > 0 && (
            <div className='mt-6'>
              <div className='text-sm font-bold mb-2'>Key Features</div>
              <ul className='space-y-2'>
                {project.features.map((f, i) => (
                  <li key={i} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-secondary/70' />
                    <span className='text-text-muted'>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {typeof project.progress === 'number' && (
            <div className='mt-6'>
              <div className='flex items-center justify-between text-xs text-text-muted mb-1'>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className='h-1.5 w-full rounded-full bg-background overflow-hidden'>
                <div
                  className='h-full rounded-full bg-gradient-to-r from-primary to-secondary'
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className='mt-6'>
            <div className='text-sm font-bold mb-2'>Milestones</div>
            <ul className='space-y-2'>
              {project.milestones.map((m, i) => (
                <li key={i} className='flex gap-2'>
                  <span className='mt-2 h-1.5 w-1.5 rounded-full bg-primary/80' />
                  <span className='text-text-muted'>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.tech && project.tech.length > 0 && (
            <div className='mt-6'>
              <div className='text-sm font-bold mb-2'>Tech Stack</div>
              <div className='flex flex-wrap gap-2'>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className='rounded-full border border-surface-hover bg-background/50 px-3 py-1 text-xs text-text-muted'>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    typeof document !== 'undefined' ? document.body : ((globalThis as any).document?.body ?? ({} as any)),
  );
}

function LiveFrame({ url }: { url: string }) {
  return (
    <div className='border-b border-surface-hover bg-background'>
      <div className='relative h-[46vh] md:h-[52vh] lg:h-[56vh]'>
        {url ? (
          <iframe
            src={url}
            title='Live preview'
            className='absolute inset-0 h-full w-full rounded-none'
            loading='lazy'
            sandbox='allow-same-origin allow-scripts allow-forms allow-popups'
            referrerPolicy='no-referrer'
          />
        ) : (
          <div className='absolute inset-0 flex items-center justify-center text-text-muted'>
            Live preview unavailable
          </div>
        )}
      </div>
      <div className='px-4 py-2 text-xs text-text-muted'>
        Some sites may block embedding via security headers. Use “Open in New Tab” if the frame is blank.
      </div>
    </div>
  );
}

function Gallery({ slug, primary, alt }: { slug: string; primary?: string; alt: string }) {
  const candidates = useMemo(
    () => [
      `/assets/images/projects/${slug}/image.png`,
      `/assets/images/projects/${slug}/image-1.png`,
      `/assets/images/projects/${slug}/image-2.png`,
      `/assets/images/projects/${slug}/image-3.png`,
      `/assets/images/projects/${slug}/image copy.png`,
      `/assets/images/projects/${slug.replace(/-/g, '')}/image-1.png`,
      `/assets/images/projects/${slug.replace(/-/g, '')}/image-2.png`,
      `/assets/images/projects/${slug.replace(/-/g, '')}/image-3.png`,
      `/assets/images/projects/${slug.replace(/-/g, '')}/image.png`,
      `/assets/images/projects/${slug.replace(/-/g, '')}/image copy.png`,
      primary || '/project-placeholder.svg',
      '/project-placeholder.svg',
    ],
    [slug, primary],
  );
  const thumbs = candidates.slice(0, 3);
  const [bad, setBad] = useState<Record<number, boolean>>({});
  const srcAt = (i: number) => (bad[i] ? '/project-placeholder.svg' : thumbs[i]);
  return (
    <div className='border-b border-surface-hover bg-background/40 px-3 py-3 md:px-4 md:py-4'>
      <div className='grid grid-cols-3 gap-2 md:gap-3'>
        {thumbs.map((_, i) => (
          <div key={i} className='relative h-36 md:h-48 lg:h-56 rounded-xl overflow-hidden border border-surface-hover'>
            <Image
              src={srcAt(i)}
              alt={`${alt} ${i + 1}`}
              fill
              className='object-cover'
              onError={() => setBad((b) => ({ ...b, [i]: true }))}
              sizes='(max-width: 768px) 33vw, 33vw'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
