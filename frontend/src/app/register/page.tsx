'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Preserve any query parameters (like plan=starter)
    const plan = searchParams.get('plan');
    const redirectUrl = plan ? `/signup?plan=${plan}` : '/signup';
    router.replace(redirectUrl);
  }, [router, searchParams]);

  // Show a brief loading message while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Redirecting to signup...</p>
      </div>
    </div>
  );
}
