import Parser from 'rss-parser';

type CustomItem = {
  content?: string;
  'content:encoded'?: string;
  categories?: string[];
  creator?: string;
};

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  categories: string[];
  thumbnail: string;
  slug: string;
}

const parser = new Parser<CustomItem, CustomItem>({
  customFields: {
    item: ['content:encoded', 'categories', 'creator'],
  },
});

export async function fetchMediumPosts(username: string): Promise<BlogPost[]> {
  try {
    // Medium blocks direct browser fetches sometimes, relying on RSS2JSON or direct server fetching
    // For Next.js Server Components, we fetch directly from the RSS feed.
    const url = `https://medium.com/feed/@${username}`;
    
    // In local dev, you might hit cross-origin issues or Medium blocking server fetches.
    // So we fetch it here as a server action/component.
    const feed = await parser.parseURL(url);
    
    return feed.items.map((item) => {
      // Extract first image from content as thumbnail
      const contentStr = item['content:encoded'] || item.content || '';
      const imgRegex = /<img.*?src="(.*?)"/;
      const match = imgRegex.exec(contentStr);
      const thumbnail = match ? match[1] : '';

      // Extract slug from link
      const urlObj = new URL(item.link || '');
      // Medium links are often of this format: https://medium.com/@username/slug-hashid?source=...
      const slugMatch = urlObj.pathname.match(/\/@.*?\/(.*)-[a-z0-9]+$/i) || 
                        urlObj.pathname.match(/\/p\/(.*)/) ||
                        urlObj.pathname.split('/');
      let slug = slugMatch && typeof slugMatch !== 'string' && slugMatch[1] ? slugMatch[1] : 'unknown-slug';

      // Fallback slug parsing if array access doesn't get it cleanly
      if (typeof slug !== 'string' || slug.length === 0) {
        const parts = urlObj.pathname.split('/');
        slug = parts[parts.length - 1].split('-')[0]; // Rough fallback
      }

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        creator: item.creator || username,
        content: contentStr,
        categories: item.categories || [],
        thumbnail,
        slug,
      };
    });
  } catch (error) {
    console.error('Error fetching Medium RSS feed:', error);
    return [];
  }
}

export async function getMediumPostBySlug(username: string, targetSlug: string): Promise<BlogPost | null> {
  const posts = await fetchMediumPosts(username);
  
  // Try exact match or substring match as Medium appends unique hashes to generated slugs
  const post = posts.find(p => p.slug === targetSlug || p.link.includes(targetSlug));
  
  return post || null;
}
