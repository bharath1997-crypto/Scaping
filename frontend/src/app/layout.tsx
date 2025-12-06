// app/layout.tsx - Root Layout with Header
// Complete layout with header, metadata, and global styles

import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'AppCortex - AI-Powered App Intelligence Platform',
    template: '%s | AppCortex'
  },
  description: 'Track, analyze, and predict app performance across 6 major stores with AI-powered insights. Starting at $49/month — 500x cheaper than Sensor Tower.',
  keywords: ['app analytics', 'mobile app intelligence', 'app store optimization', 'ASO', 'app tracking', 'sensor tower alternative', 'data.ai alternative'],
  authors: [{ name: 'AppCortex' }],
  creator: 'AppCortex',
  publisher: 'AppCortex',
  metadataBase: new URL('https://appcortex.pro'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appcortex.pro',
    title: 'AppCortex - AI-Powered App Intelligence Platform',
    description: 'Get 6 app stores, AI insights, and predictive forecasting for $49/mo instead of $25K/year.',
    siteName: 'AppCortex',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AppCortex - App Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppCortex - AI-Powered App Intelligence',
    description: 'Track 6 app stores with AI insights for $49/mo',
    images: ['/og-image.png'],
    creator: '@appcortex',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
