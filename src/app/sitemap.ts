import { MetadataRoute } from 'next';
import Parser from 'rss-parser';

const baseUrl = 'https://mahmud886.vercel.app';

async function getProjectSlugs(): Promise<string[]> {
  try {
    const res = await fetch('https://api.github.com/users/mahmud886/repos?per_page=100&sort=updated', {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
      },
    });
    if (!res.ok) return [];
    const repos = await res.json();
    return repos.filter((repo: any) => !repo.fork).map((repo: any) => repo.name);
  } catch {
    return [];
  }
}

async function getBlogSlugs(): Promise<string[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://medium.com/feed/@mahmud886');
    return feed.items.map((item: any) => {
      const url = new URL(item.link);
      const slugMatch = url.pathname.match(/-([a-z0-9]+)$/);
      return slugMatch ? slugMatch[1] : item.guid.split('/').pop();
    });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, blogSlugs] = await Promise.all([getProjectSlugs(), getBlogSlugs()]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
