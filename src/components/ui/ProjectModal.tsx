import DOMPurify from 'dompurify';
import gsap from 'gsap';
import { ArrowRight, ExternalLink, GitFork, Github, Star, X } from 'lucide-react';
import { marked } from 'marked';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  default_branch?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProjectModalProps {
  repo: Repo;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ repo, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [readme, setReadme] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showLive, setShowLive] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate in
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.3, ease: 'power2.out' },
    );

    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 },
    );

    // Fetch README
    const fetchReadme = async () => {
      setLoading(true);
      try {
        const branch = repo.default_branch || 'main';
        const res = await fetch(`https://raw.githubusercontent.com/mahmud886/${repo.name}/${branch}/README.md`);
        if (res.ok) {
          const text = await res.text();
          // Parse and sanitize
          const rawHtml = await marked(text);
          // In browser DOMPurify is directly usable
          const cleanHtml = DOMPurify.sanitize(rawHtml as string);
          setReadme(cleanHtml);
        } else {
          setReadme('<p class="text-text-muted">No README available for this project.</p>');
        }
      } catch (err) {
        setReadme('<p class="text-text-muted">Failed to load README.</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, repo]);

  const handleClose = () => {
    // Animate out
    gsap.to(contentRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
    });

    gsap.to(modalRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80'
      onClick={handleClose}>
      <div
        ref={contentRef}
        className='relative w-full max-w-7xl max-h-[92vh] bg-surface border border-surface-hover rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden flex flex-col'
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {/* Top bar (Live only if available) */}
        <div className='flex-shrink-0 px-4 py-3 md:px-6 md:py-4 border-b border-surface-hover flex items-center justify-between bg-surface/50 backdrop-blur-xl z-10 relative'>
          <div className='flex items-center gap-2 text-xs'>
            {repo.homepage ? (
              <button
                onClick={() => setShowLive(true)}
                className='rounded-full px-3 py-1.5 border border-surface-hover text-text-main hover:border-primary/50'>
                Live Preview
              </button>
            ) : null}
          </div>
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-3 py-1.5 text-xs font-medium hover:border-primary/50 transition-colors'>
              Open in New Tab <ExternalLink size={14} />
            </a>
          ) : (
            <div className='text-xs text-text-muted'>No live demo</div>
          )}
          <button
            onClick={handleClose}
            className='p-2 rounded-full hover:bg-background transition-colors text-text-muted hover:text-text-main z-10'
            aria-label='Close modal'>
            <X size={24} />
          </button>
        </div>

        {/* Media area */}
        {showLive && repo.homepage ? <LiveFrame url={repo.homepage} /> : null}

        {/* Content - Scrollable */}
        <div className='flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 items-start'>
            <div className='lg:col-span-2'>
              <h2 className='text-2xl md:text-3xl font-extrabold text-text-main'>{repo.name}</h2>
              {repo.description && <p className='text-text-muted mt-1 max-w-2xl'>{repo.description}</p>}
            </div>
            <div className='flex gap-2 lg:justify-end'>
              <a
                href={repo.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-4 py-2 bg-background border border-surface-hover rounded-full hover:border-primary transition-colors text-sm font-medium'>
                <Github size={16} />
                <span>Repository</span>
              </a>
              <Link
                href={`/projects/${repo.name}`}
                className='flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full hover:bg-secondary/20 transition-colors text-sm font-medium'
                onClick={handleClose}>
                <span>Full Page</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-8'>
            {/* README Content */}
            <div>
              <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
                <span>README.md</span>
                {loading && (
                  <span className='flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-primary'></span>
                  </span>
                )}
              </h3>

              <div className='bg-background/50 rounded-xl p-6 border border-surface-hover'>
                {loading ? (
                  <div className='space-y-4 animate-pulse'>
                    <div className='h-6 bg-surface rounded w-1/3'></div>
                    <div className='h-4 bg-surface rounded w-full'></div>
                    <div className='h-4 bg-surface rounded w-full'></div>
                    <div className='h-4 bg-surface rounded w-5/6'></div>
                    <div className='h-32 bg-surface rounded w-full mt-6'></div>
                  </div>
                ) : (
                  <div
                    className='prose prose-invert prose-sm md:prose-base max-w-none'
                    dangerouslySetInnerHTML={{ __html: readme }}
                  />
                )}
              </div>
            </div>

            {/* Stats (below README, full-width context) */}
            <div className='space-y-6'>
              <div className='bg-background/50 border border-surface-hover rounded-xl p-5'>
                <h4 className='font-bold mb-4'>Stats</h4>
                <div className='space-y-3 text-sm'>
                  {repo.language && (
                    <div className='flex items-center justify-between'>
                      <span className='text-text-muted'>Language</span>
                      <div className='flex items-center gap-1.5'>
                        <span className='w-2.5 h-2.5 rounded-full bg-secondary' />
                        <span className='font-medium'>{repo.language}</span>
                      </div>
                    </div>
                  )}
                  <div className='flex items-center justify-between'>
                    <span className='text-text-muted'>Stars</span>
                    <div className='flex items-center gap-1.5 font-medium'>
                      <Star size={14} className='text-yellow-500' />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-text-muted'>Forks</span>
                    <div className='flex items-center gap-1.5 font-medium'>
                      <GitFork size={14} className='text-blue-400' />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className='bg-background/50 border border-surface-hover rounded-xl p-5'>
                  <h4 className='font-bold mb-4'>Topics</h4>
                  <div className='flex flex-wrap gap-2'>
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className='px-2.5 py-1 bg-surface text-xs rounded-full text-text-muted border border-surface-hover'>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    typeof document !== 'undefined' ? document.body : ((globalThis as any).document?.body ?? ({} as any)),
  );
}

// Removed gallery per user request

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
