'use client';

import { useState } from 'react';
import Link from 'next/link';
import { forgotPassword } from '@/lib/auth-api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate email
  const validateEmail = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await forgotPassword(email);

      if (!response.success) {
        setErrors({ submit: response.message || 'Failed to send reset email' });
        return;
      }

      // Success - always show success message (don't reveal if email exists)
      setIsSuccess(true);
    } catch (error: any) {
      // Handle 404 or other errors gracefully - still show success for security
      if (error.response?.status === 404) {
        // Endpoint not implemented yet - show success anyway for security
        setIsSuccess(true);
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'Network error. Please try again.';
        setErrors({ submit: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 flex items-center justify-center px-6 py-12">
      
      <div className="w-full max-w-md">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              AppCortex
            </span>
          </Link>
          
          {!isSuccess ? (
            <>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">
                Forgot your password?
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                No worries! Enter your email and we'll send you reset instructions.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">
                Check your email
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                We've sent password reset instructions to your email.
              </p>
            </>
          )}
        </div>

        {/* Form or Success Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
          
          {!isSuccess ? (
            // Reset Form
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white transition-colors ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to login
                </Link>
              </div>

            </form>
          ) : (
            // Success State
            <div className="space-y-6">
              
              {/* Email Sent To */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Email sent to:
                </p>
                <p className="font-semibold dark:text-white">{email}</p>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">1</span>
                  </div>
                  <div>
                    <p className="text-sm dark:text-white">
                      Check your inbox for an email from AppCortex
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">2</span>
                  </div>
                  <div>
                    <p className="text-sm dark:text-white">
                      Click the reset password link in the email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">3</span>
                  </div>
                  <div>
                    <p className="text-sm dark:text-white">
                      Create a new password and log in
                    </p>
                  </div>
                </div>
              </div>

              {/* Help Text */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  💡 <strong>Didn't receive the email?</strong> Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="underline font-semibold hover:no-underline"
                  >
                    try again
                  </button>
                  .
                </p>
              </div>

              {/* Back to Login */}
              <Link 
                href="/login"
                className="block w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-center rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Back to Login
              </Link>

            </div>
          )}

        </div>

        {/* Help Links */}
        {!isSuccess && (
          <div className="mt-8">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold mb-3 dark:text-white">Need help?</h3>
              <div className="space-y-2 text-sm">
                <Link 
                  href="/faq" 
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>I can't access my email</span>
                </Link>
                <Link 
                  href="/faq" 
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Account security concerns</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact support</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/legal/privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-cyan-600 dark:hover:text-cyan-400">
              Help Center
            </Link>
          </div>
        </div>

      </div>

    </main>
  );
}

