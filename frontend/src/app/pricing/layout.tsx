import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Starting at $49/month',
  description: 'Simple, transparent pricing for app analytics. Starting at $49/month — 500x cheaper than Sensor Tower. Free plan available. 14-day free trial on all paid plans.',
  keywords: ['app analytics pricing', 'sensor tower alternative pricing', 'app intelligence cost', 'mobile analytics pricing'],
  openGraph: {
    title: 'AppCortex Pricing - $49/month',
    description: 'Get 6 app stores, AI insights, and real-time updates for $49/mo instead of $25K/year',
    type: 'website',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

