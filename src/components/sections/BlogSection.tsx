'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import BlogModal from '../ui/BlogModal';

gsap.registerPlugin(ScrollTrigger);

interface Article {
  title: string;
  link: string;
  guid: string;
  slug: string;
  pubDate: string;
  author: string;
  excerpt: string;
  categories: string[];
  thumbnail: string | null;
  readingTime: string;
}

export default function BlogSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/medium/feed?limit=3');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (loading || articles.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, articles]);

  return (
    <section id='blog' ref={sectionRef} className='relative'>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
          <div>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
              Latest <span className='text-primary'>Articles</span>
            </h2>
            <p className='text-text-muted text-lg max-w-2xl'>
              Thoughts, tutorials, and insights on web development, design, and technology.
            </p>
          </div>
          <Link
            href='/blog'
            className='flex items-center gap-2 px-6 py-3 text-primary hover:text-secondary font-medium transition-colors w-fit'>
            <span>View All Articles</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 gap-6'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-40 md:h-48 bg-background rounded-2xl animate-pulse' />
            ))}
          </div>
        ) : (
          <div ref={cardsRef} className='grid grid-cols-1 gap-6'>
            {articles.map((article) => (
              <button onClick={() => setOpenSlug(article.slug)} key={article.guid} className='block group text-left'>
                <article className='blog-card bg-background border border-surface-hover rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10'>
                  <div className='grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]'>
                    <div className='relative h-40 md:h-full w-full overflow-hidden bg-surface'>
                      {article.thumbnail ? (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className='w-full h-full object-cover md:object-center group-hover:scale-105 transition-transform duration-500'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface-hover'>
                          <span className='text-primary/50 text-3xl font-bold'>IM.</span>
                        </div>
                      )}
                    </div>
                    <div className='p-5 md:p-6 flex flex-col'>
                      <div className='flex items-center gap-4 text-xs text-text-muted mb-3'>
                        <div className='flex items-center gap-1'>
                          <Calendar size={14} />
                          <span>
                            {new Date(article.pubDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock size={14} />
                          <span>{article.readingTime}</span>
                        </div>
                      </div>
                      <h3 className='text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2'>
                        {article.title}
                      </h3>
                      <p className='text-text-muted text-sm line-clamp-2 md:line-clamp-3 mb-4'>{article.excerpt}</p>
                      {article.categories && article.categories.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-auto pt-3 border-t border-surface-hover/50'>
                          {article.categories.slice(0, 2).map((category) => (
                            <span key={category} className='px-2 py-1 bg-surface text-xs rounded text-text-muted'>
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </button>
            ))}
          </div>
        )}
        <BlogModal slug={openSlug} open={!!openSlug} onClose={() => setOpenSlug(null)} />
      </div>
    </section>
  );
}
