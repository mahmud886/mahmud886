import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Parser from 'rss-parser';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';

const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'categories'],
  },
});

async function getArticle(slug: string) {
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@mahmud886');
    
    const article = feed.items.find((item: any) => {
      const url = new URL(item.link);
      const itemSlugMatch = url.pathname.match(/-([a-z0-9]+)$/);
      const itemSlug = itemSlugMatch ? itemSlugMatch[1] : item.guid.split('/').pop();
      return itemSlug === slug;
    });

    if (!article) return null;

    const wordCount = article['content:encoded']?.replace(/<[^>]*>?/gm, '').split(/\s+/).length || 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      title: article.title,
      link: article.link,
      pubDate: article.pubDate,
      author: article.creator,
      content: article['content:encoded'],
      categories: article.categories || [],
      readingTime: `${readingTime} min read`,
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function BlogDetails({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const cleanContent = purify.sanitize(article.content);

  return (
    <div className="rounded-3xl border border-surface-hover bg-surface overflow-hidden">
      <div className="px-6 md:px-10 py-10 max-w-4xl mx-auto">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-10">
          <ArrowLeft size={20} />
          <span>Back to Articles</span>
        </Link>

        <header className="mb-12 pb-8 border-b border-surface-hover">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.categories.map((category: string) => (
              <span key={category} className="px-3 py-1 bg-surface border border-surface-hover text-xs font-medium rounded-full text-text-muted">
                {category}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(article.pubDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                IM
              </span>
              <span>{article.author}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-xl prose-a:text-primary hover:prose-a:text-secondary prose-headings:text-text-main text-text-muted">
          {parse(cleanContent)}
        </div>

        <div className="mt-16 pt-8 border-t border-surface-hover text-center">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Read Original on Medium
          </a>
        </div>
      </div>
    </div>
  );
}
