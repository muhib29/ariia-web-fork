import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '../components/providers';
import './globals.css';


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'ARIIA - AI Agents for Business Operations',
  description:
    'Autonomous, personalized, and intelligent—bringing powerful enterprise-grade AI to businesses of every size.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/images/hero-logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/headerlogo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/lottie/storyglobe.lottie" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/lottie/section1desktop.lottie" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/lottie/section2desktop.lottie" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/lottie/section1.lottie" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/lottie/section2.lottie" as="fetch" crossOrigin="anonymous" />
        {strapiUrl ? (
          <link rel="dns-prefetch" href={strapiUrl} />
        ) : null}
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
