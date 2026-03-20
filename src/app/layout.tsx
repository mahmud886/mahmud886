import CustomCursor from '@/components/ui/CustomCursor';
import RightRail from '@/components/ui/RightRail';
import ScrollGuard from '@/components/ui/ScrollGuard';
import Sidebar from '@/components/ui/Sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mahmud886.vercel.app'),
  title: 'Iqbal Mahmud | Developer Portfolio',
  description:
    'Software Engineer passionate about crafting high-performance web applications and seamless user experiences. Specializing in Next.js, React, and modern frontend ecosystems to build scalable, interactive, and beautifully animated interfaces.',
  keywords: [
    'Iqbal Mahmud',
    'Software Engineer',
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'Web Developer',
    'Dhaka',
    'Bangladesh',
  ],
  authors: [{ name: 'Iqbal Mahmud' }],
  creator: 'Iqbal Mahmud',
  publisher: 'Iqbal Mahmud',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Iqbal Mahmud | Software Engineer',
    description:
      'Software Engineer passionate about crafting high-performance web applications and seamless user experiences.',
    url: 'https://mahmud886.vercel.app',
    siteName: 'Iqbal Mahmud Portfolio',
    images: [
      {
        url: '/assets/images/profile-image.jpg', // Update this if you add a specific OG image
        width: 800,
        height: 600,
        alt: 'Iqbal Mahmud',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iqbal Mahmud | Software Engineer',
    description:
      'Software Engineer passionate about crafting high-performance web applications and seamless user experiences.',
    images: ['/assets/images/profile-image.jpg'], // Update this if you add a specific OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link rel='canonical' href='https://mahmud886.vercel.app' />
        <meta name='theme-color' content='#0b0f12' />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <CustomCursor />
        <ScrollGuard />
        <Sidebar />
        <RightRail />
        <main className='flex-grow md:pl-[340px] md:pr-[84px] pt-[72px] md:pt-0'>
          <div className='mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-6 py-6'>{children}</div>
        </main>
      </body>
    </html>
  );
}
