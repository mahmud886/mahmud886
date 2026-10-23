import { getMediumPostBySlug, fetchMediumPosts } from '@/lib/medium';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { clip } from '@/lib/seo';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';

export async function generateStaticParams() {
  const posts = await fetchMediumPosts('mahmud886');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMediumPostBySlug('mahmud886', slug);
  if (!post) return {};
  const description = clip(post.content.replace(/<[^>]+>/g, ' '));
  return {
    title: post.title,
    description,
    // The original lives on Medium; point search engines there so this copy never competes with it.
    alternates: { canonical: post.link.split('?')[0] },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: new Date(post.pubDate).toISOString(),
      authors: [post.creator],
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description },
  };
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const post = await getMediumPostBySlug('mahmud886', resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pb-24 pt-[calc(var(--hh)+32px)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link 
          href="/#writing" 
          className="inline-flex items-center gap-2 mb-8 font-mono text-[12px] text-muted transition-colors hover:text-ink"
        >
          <FiArrowLeft /> All notes
        </Link>
        
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4 font-mono text-[12px] text-muted">
            <time dateTime={post.pubDate}>
              {new Date(post.pubDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>By {post.creator}</span>
          </div>
          
          <h1 className="mb-8 text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-ink">
            {post.categories.map((category) => (
              <span key={category} className="pill h-7 cursor-default px-3 text-[10.5px]">
                {category}
              </span>
            ))}
          </div>
        </header>

        <div 
          className="prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-headings:font-bold prose-img:rounded-2xl prose-img:border prose-img:border-line prose-video:rounded-2xl prose-a:text-ink prose-a:underline-offset-4 hover:prose-a:opacity-70"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-16 pt-8 border-t border-line flex justify-between items-center">
          <a 
            href={post.link} 
            target="_blank" 
            rel="noreferrer"
            className="pill"
          >
            Read original on Medium <FiExternalLink />
          </a>
          
        </footer>
      </div>
    </article>
  );
}
