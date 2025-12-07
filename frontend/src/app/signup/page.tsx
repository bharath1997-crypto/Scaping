'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { registerWithEmail, initGoogleOAuth, storeAuthTokens } from '@/lib/auth-api';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || 'starter';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    plan: preselectedPlan,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Plans data
  const plans = {
    free: { name: 'Free', price: '$0', color: 'slate' },
    starter: { name: 'Starter', price: '$49', color: 'cyan' },
    pro: { name: 'Pro', price: '$149', color: 'blue' },
  };

  // Check for error in URL parameters
  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError === 'google_oauth_not_configured') {
      setErrors({ submit: 'Google sign-in is not configured. Please use email/password registration.' });
    } else if (urlError === 'auth_failed') {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    }
  }, [searchParams]);

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 8) strength += 25;
    if (formData.password.length >= 12) strength += 25;
    if (/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password)) strength += 25;
    if (/[0-9]/.test(formData.password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(formData.password)) strength += 12.5;

    setPasswordStrength(Math.min(100, strength));
  }, [formData.password]);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await registerWithEmail(formData.email, formData.password, formData.name);
      
      if (response.success && response.data) {
        storeAuthTokens(response.data.accessToken, response.data.refreshToken);
        router.push('/dashboard');
      } else {
        setErrors({ submit: response.message || 'Signup failed. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ submit: error.response?.data?.message || 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social auth
  const handleSocialAuth = (provider: string) => {
    if (provider === 'google') {
      initGoogleOAuth();
    } else {
      console.log(`Sign up with ${provider} - Not implemented yet`);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE - Benefits & Social Proof */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {/* Logo & Headline */}
                <div className="mb-8">
                  <Link href="/" className="inline-flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                      AppCortex
                    </span>
                  </Link>
                  <h1 className="text-4xl font-bold mb-4 dark:text-white">
                    Start tracking apps in minutes
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400">
                    Join thousands of developers using AI-powered insights to build better apps
                  </p>
                </div>
                {/* Benefits List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">No credit card required</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Start with our free plan or 14-day trial</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">6 app stores covered</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Google, Apple, Huawei, Samsung, Xiaomi, Amazon</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">AI-powered insights</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Predictive forecasting & natural language explanations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">Real-time updates</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Data refreshes every 45 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">Cancel anytime</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">No long-term contracts or commitments</div>
                    </div>
                  </div>
                </div>
                {/* Social Proof */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 border-2 border-white dark:border-slate-900" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white dark:border-slate-900" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white dark:border-slate-900" />
                    </div>
                    <div className="text-sm font-semibold dark:text-white">
                      Join 5,000+ developers
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    "Switched from Sensor Tower and saved $24K/year. The AI insights alone are worth 10x the price."
                  </p>
                  <div className="mt-3 text-sm">
                    <span className="font-semibold dark:text-white">Sarah Chen</span>
                    <span className="text-slate-500 dark:text-slate-400"> · Product Lead at AppCo</span>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE - Signup Form */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                {/* Plan Selection */}
                {preselectedPlan && (
                  <div className="mb-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
                          Selected Plan
                        </div>
                        <div className="text-lg font-bold dark:text-white">
                          {plans[preselectedPlan as keyof typeof plans]?.name || 'Free'} - {plans[preselectedPlan as keyof typeof plans]?.price || '$0'}/month
                        </div>
                      </div>
                      <Link href="/pricing" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">
                        Change
                      </Link>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">
                    Create your account
                  </h2>
                  <Link 
                    href="/login" 
                    className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                  >
                    Already have an account? Sign in →
                  </Link>
                </div>
                {/* Social Auth Buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('google')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium dark:text-white">Continue with Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('github')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <svg className="w-5 h-5 dark:fill-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium dark:text-white">Continue with GitHub</span>
                  </button>
                </div>
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                      Or continue with email
                    </span>
                  </div>
                </div>
                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                          errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${getPasswordStrengthColor()}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium dark:text-white">{getPasswordStrengthText()}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Use 8+ characters with mix of letters, numbers & symbols
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                        errors.confirmPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                  {/* Company Name (Optional) */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Company Name <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
                      placeholder="Your Company"
                    />
                  </div>
                  {/* Terms Agreement */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 text-cyan-500 border-slate-300 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        I agree to the{' '}
                        <Link href="/legal/terms" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/legal/privacy" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                    )}
                  </div>
                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
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
                        Creating account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

