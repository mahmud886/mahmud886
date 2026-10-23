import type { MetadataRoute } from 'next';
import { caseStudies, experience, profile } from '@/lib/data';
import { fetchMediumPosts } from '@/lib/medium';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchMediumPosts('mahmud886');
  const page = (path: string, priority: number) => ({ url: `${profile.site}${path}`, lastModified: new Date(), priority });
  return [
    page('', 1),
    page('/resume', 0.9),
    ...caseStudies.map((p) => page(`/projects/${p.slug}`, 0.8)),
    ...experience.map((j) => page(`/work/${j.slug}`, 0.6)),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.5)),
  ];
}
