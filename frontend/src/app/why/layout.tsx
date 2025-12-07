import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why AppCortex - 10 Reasons to Switch from Sensor Tower',
  description: 'Discover why thousands are switching to AppCortex. Get 6 app stores, AI insights, and predictive forecasting for $49/mo instead of $25K/year.',
  keywords: 'app analytics, sensor tower alternative, data.ai alternative, app intelligence, mobile analytics',
  openGraph: {
    title: 'Why AppCortex - The Smarter Alternative',
    description: '10x the features at 1/500th the price',
    type: 'website',
  },
};

export default function WhyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

