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
    <article className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link 
          href="/#blog" 
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent-2 transition-colors mb-8"
        >
          <FiArrowLeft /> Back to Home
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
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
          
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pb-8 border-b border-line">
            {post.categories.map((category) => (
              <span key={category} className="text-xs px-3 py-1 bg-white/[0.04] rounded-full text-accent-2">
                {category}
              </span>
            ))}
          </div>
        </header>

        <div 
          className="prose prose-invert max-w-none prose-img:rounded-2xl prose-img:border prose-img:border-line prose-video:rounded-2xl prose-a:text-accent-2 hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-16 pt-8 border-t border-line flex justify-between items-center">
          <a 
            href={post.link} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-accent-2 hover:text-foreground transition-colors font-medium"
          >
            Read original on Medium <FiExternalLink />
          </a>
          
        </footer>
      </div>
    </article>
  );
}
