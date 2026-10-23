import type { MetadataRoute } from 'next';
import { caseStudies, experience, profile } from '@/lib/data';
import { abs } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs(), lastModified: now, changeFrequency: 'weekly', priority: 1, images: [abs('/opengraph-image'), abs(profile.photo)] },
    { url: abs('/resume'), lastModified: now, changeFrequency: 'monthly', priority: 0.9, images: [abs('/resume/opengraph-image')] },
    ...caseStudies.map((p) => ({
      url: abs(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [abs(`/projects/${p.slug}/opengraph-image`), ...p.screens.map((s) => abs(s.src))],
    })),
    ...experience.map((j) => ({ url: abs(`/work/${j.slug}`), lastModified: now, changeFrequency: 'yearly' as const, priority: 0.6 })),
    // Blog copies point their canonical at Medium, so they stay out of the sitemap.
  ];
}
