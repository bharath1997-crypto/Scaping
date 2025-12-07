import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Create Your AppCortex Account | Free Trial',
  description: 'Join AppCortex and start tracking apps across 6 stores with AI-powered insights. No credit card required. Start your free trial today.',
  keywords: ['sign up', 'create account', 'app analytics', 'app intelligence', 'free trial', 'app tracking'],
  openGraph: {
    title: 'Sign Up - AppCortex',
    description: 'Join thousands of developers using AI-powered insights to build better apps. Start free today.',
    type: 'website',
    url: 'https://appcortex.pro/signup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Up - AppCortex',
    description: 'Join thousands of developers using AI-powered insights to build better apps.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

