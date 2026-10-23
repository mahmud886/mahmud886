import type { MetadataRoute } from 'next';
import { profile } from '@/lib/data';
import { SITE_DESCRIPTION } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Software Engineer`,
    short_name: profile.name,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f3f0',
    theme_color: '#0c0c0c',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
