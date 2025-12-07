import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - AI-Powered App Intelligence',
  description: 'Explore AppCortex features: AI-powered forecasting, multi-store tracking across 6 platforms, review intelligence, and competitor analysis. Try for free!',
  keywords: ['app analytics features', 'predictive app forecasting', 'app idea analyzer', 'multi-store app tracking', 'ai app intelligence'],
  openGraph: {
    title: 'AppCortex Features - Complete App Intelligence',
    description: 'AI-powered forecasting, multi-store tracking, and competitive intelligence for $49/mo',
    type: 'website',
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

