import { getMediumPostBySlug, fetchMediumPosts } from '@/lib/medium';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
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
  return post ? { title: post.title, openGraph: { title: post.title, type: 'article', images: post.thumbnail ? [post.thumbnail] : undefined } } : {};
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
    <article className="pb-24 pt-10 sm:pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link 
          href="/#blog" 
          className="inline-flex items-center gap-2 mb-8 font-mono text-[12px] text-muted transition-colors hover:text-ink"
        >
          <FiArrowLeft /> Back to Home
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
          
          <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pb-8 border-b border-line">
            {post.categories.map((category) => (
              <span key={category} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2">
                {category}
              </span>
            ))}
          </div>
        </header>

        <div 
          className="prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-img:rounded-2xl prose-img:border prose-img:border-line prose-video:rounded-2xl prose-a:text-link hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-16 pt-8 border-t border-line flex justify-between items-center">
          <a 
            href={post.link} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 font-mono text-[12px] text-link hover:underline"
          >
            Read original on Medium <FiExternalLink />
          </a>
          
        </footer>
      </div>
    </article>
  );
}
