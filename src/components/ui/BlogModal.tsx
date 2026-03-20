'use client';

import gsap from 'gsap';
import { Calendar, Clock, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import { createPortal } from 'react-dom';

type Article = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  readingTime: string;
  content: string;
};

export default function BlogModal({ slug, open, onClose }: { slug: string | null; open: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !slug) return;
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.25, ease: 'power2.out' },
    );
    gsap.fromTo(
      contentRef.current,
      { y: 36, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out', delay: 0.05 },
    );

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/medium/article?slug=${slug}`);
        if (!res.ok) throw new Error('Failed to load article');
        const data = await res.json();
        setArticle(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, slug]);

  const handleClose = () => {
    gsap.to(contentRef.current, { y: 10, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!open || !slug) return null;

  return createPortal(
    <div ref={modalRef} className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80' onClick={handleClose}>
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className='relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-surface-hover bg-surface shadow-2xl flex flex-col'>
        <div className='flex items-center justify-between px-5 py-4 border-b border-surface-hover bg-surface/60 backdrop-blur'>
          <div className='text-sm text-text-muted'>Article Preview</div>
          <button onClick={handleClose} className='p-2 rounded-full hover:bg-background transition-colors' aria-label='Close'>
            <X size={20} />
          </button>
        </div>
        <div className='flex-grow overflow-y-auto p-5 md:p-6 custom-scrollbar'>
          {loading ? (
            <div className='space-y-3 animate-pulse'>
              <div className='h-6 w-2/3 bg-background rounded' />
              <div className='h-4 w-1/2 bg-background rounded' />
              <div className='h-40 w-full bg-background rounded mt-4' />
            </div>
          ) : error ? (
            <div className='text-sm text-text-muted'>{error}</div>
          ) : article ? (
            <div>
              <h2 className='text-2xl md:text-3xl font-extrabold mb-2'>{article.title}</h2>
              <div className='flex items-center gap-4 text-xs text-text-muted mb-5'>
                <div className='flex items-center gap-1'>
                  <Calendar size={14} />
                  <span>{new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock size={14} />
                  <span>{article.readingTime}</span>
                </div>
              </div>
              <div className='prose prose-invert max-w-none'>
                {parse(article.content)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

