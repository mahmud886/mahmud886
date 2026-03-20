import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window as unknown as Window & typeof globalThis;
const purify = DOMPurify(window as any);

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'categories'],
  },
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const feed = await parser.parseURL('https://medium.com/feed/@mahmud886');

    const article = feed.items.find((item: any) => {
      try {
        const url = new URL(item.link);
        const m = url.pathname.match(/-([a-z0-9]+)$/);
        const itemSlug = m ? m[1] : item.guid?.split('/').pop();
        return itemSlug === slug;
      } catch {
        return false;
      }
    });

    if (!article) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const wordCount =
      article['content:encoded']?.replace(/<[^>]*>?/gm, '').split(/\s+/).length || 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const cleanContent = purify.sanitize(article['content:encoded'] || '');

    return NextResponse.json({
      title: article.title,
      link: article.link,
      pubDate: article.pubDate,
      author: article.creator,
      categories: article.categories || [],
      readingTime: `${readingTime} min read`,
      content: cleanContent,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load article' }, { status: 500 });
  }
}
