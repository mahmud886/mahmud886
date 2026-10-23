import type { Metadata, Viewport } from 'next';
import { Allura, Cormorant_Garamond, Geist_Mono, Inter_Tight } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import { profile } from '@/lib/data';
import { KEYWORDS, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/seo';

const sans = Inter_Tight({ variable: '--font-sans-face', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono-face', subsets: ['latin'] });
const serif = Cormorant_Garamond({ variable: '--font-serif-face', subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'] });
const script = Allura({ variable: '--font-script-face', subsets: ['latin'], weight: '400' });

// Share images come from the opengraph-image / twitter-image files beside each page.
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: SITE_TITLE, template: `%s — ${profile.name}` },
  description: SITE_DESCRIPTION,
  applicationName: profile.name,
  keywords: KEYWORDS,
  authors: [{ name: profile.fullName, url: profile.site }],
  creator: profile.fullName,
  publisher: profile.fullName,
  category: 'technology',
  alternates: { canonical: '/' },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: `${profile.name} — Portfolio`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f3f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
};

// Runs before paint: pick the saved theme (or the OS one) and the saved motion setting
// (or the OS reduced-motion one), so there is no flash and nothing starts moving early.
const prePaint = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){d.dataset.theme='light'}try{var m=localStorage.getItem('motion');if(!m)m=matchMedia('(prefers-reduced-motion: reduce)').matches?'paused':'playing';d.dataset.motion=m}catch(e){d.dataset.motion='playing'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} ${script.variable} min-h-svh antialiased`}>
        <a
          href="#main"
          className="site-chrome fixed left-3 top-3 z-[80] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <div id="main">{children}</div>
        <Footer />
        <CommandPalette />
        <Cursor />
      </body>
    </html>
  );
}
