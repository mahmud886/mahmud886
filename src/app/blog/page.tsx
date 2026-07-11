import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Parser from 'rss-parser';
import type { Metadata } from 'next';

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'categories'],
  },
});

export const metadata: Metadata = {
  title: 'Articles | Iqbal Mahmud',
  description: 'Thoughts, tutorials, and insights on web development, design, and technology.',
};

async function getArticles() {
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@mahmud886');
    return feed.items.map((item: any) => {
      const imgMatch = item['content:encoded']?.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : null;
      const url = new URL(item.link);
      const slugMatch = url.pathname.match(/-([a-z0-9]+)$/);
      const slug = slugMatch ? slugMatch[1] : item.guid.split('/').pop();
      const wordCount = item['content:encoded']?.replace(/<[^>]*>?/gm, '').split(/\s+/).length || 0;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        title: item.title as string,
        slug: slug as string,
        pubDate: item.pubDate as string,
        excerpt: item.contentSnippet ? `${item.contentSnippet.substring(0, 150)}...` : '',
        categories: (item.categories as string[]) || [],
        thumbnail,
        readingTime: `${readingTime} min read`,
      };
    });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const articles = await getArticles();

  return (
    <div className="rounded-3xl border border-surface-hover bg-surface p-8 md:p-12">
      <Link href="/#blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Latest <span className="text-primary">Articles</span>
      </h1>
      <p className="text-text-muted text-lg max-w-2xl mb-10">
        Thoughts, tutorials, and insights on web development, design, and technology.
      </p>

      {articles.length === 0 ? (
        <p className="text-text-muted">No articles found right now. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <Link href={`/blog/${article.slug}`} key={article.slug} className="block group">
              <article className="bg-background border border-surface-hover rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
                  <div className="relative h-40 md:h-full w-full overflow-hidden bg-surface">
                    {article.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover md:object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface-hover">
                        <span className="text-primary/50 text-3xl font-bold">IM.</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {new Date(article.pubDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readingTime}</span>
                      </div>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-text-muted text-sm line-clamp-2 md:line-clamp-3 mb-4">{article.excerpt}</p>
                    )}
                    {article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-surface-hover/50">
                        {article.categories.slice(0, 3).map((category) => (
                          <span key={category} className="px-2 py-1 bg-surface text-xs rounded text-text-muted">
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
