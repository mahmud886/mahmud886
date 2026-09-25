import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import RevealObserver from '@/components/RevealObserver';
import Spotlight from '@/components/Spotlight';
import { profile } from '@/lib/data';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const display = Bricolage_Grotesque({ variable: '--font-display', subsets: ['latin'], weight: ['500', '600', '700', '800'] });

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.intro,
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description: profile.intro,
    url: profile.site,
    siteName: profile.name,
    images: [{ url: profile.photo, alt: profile.name }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description: profile.intro, images: [profile.photo] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f4f5' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
};

// Runs before paint: pick the saved theme (or the OS one) so there is no light/dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} min-h-svh antialiased`}>
        <div className="aurora" aria-hidden />
        <Header />
        {children}
        <Footer />
        <CommandPalette />
        <RevealObserver />
        <Spotlight />
      </body>
    </html>
  );
}
