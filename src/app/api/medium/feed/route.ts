import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'categories'],
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'mahmud886';
  const limit = parseInt(searchParams.get('limit') || '6');

  try {
    const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);
    
    const articles = feed.items.slice(0, limit).map((item: any) => {
      // Extract first image from content
      const imgMatch = item['content:encoded']?.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : null;

      // Extract excerpt from content
      const excerpt = item['contentSnippet']?.substring(0, 150) + '...' || '';

      // Extract slug from link
      const url = new URL(item.link);
      const slugMatch = url.pathname.match(/-([a-z0-9]+)$/);
      const slug = slugMatch ? slugMatch[1] : item.guid.split('/').pop(); // fallback

      // Calculate reading time (roughly 200 words per minute)
      const wordCount = item['content:encoded']?.replace(/<[^>]*>?/gm, '').split(/\s+/).length || 0;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        title: item.title,
        link: item.link,
        guid: item.guid,
        slug: slug,
        pubDate: item.pubDate,
        author: item.creator,
        excerpt: excerpt,
        content: item['content:encoded'],
        categories: item.categories || [],
        thumbnail: thumbnail,
        readingTime: `${readingTime} min read`,
      };
    });

    return NextResponse.json({ articles });
  } catch (error: any) {
    console.error('Failed to fetch Medium feed:', error);
    return NextResponse.json({ error: error.message, articles: [] }, { status: 500 });
  }
}
