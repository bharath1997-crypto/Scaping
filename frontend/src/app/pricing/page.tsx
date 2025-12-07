// app/pricing/page.tsx - AppCortex Pricing Page
// Complete pricing page with tiers, comparison table, calculator, and FAQs

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Pricing data
  const plans = {
    free: {
      name: 'Free',
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for exploring and validating ideas',
      badge: 'PUBLIC ACCESS',
      popular: false,
      features: [
        { text: 'Browse all public dashboards', included: true },
        { text: 'View trending apps', included: true },
        { text: 'Basic app search', included: true },
        { text: 'Read AI insights (sample)', included: true },
        { text: 'App Idea Analyzer (3 searches/month)', included: true },
        { text: '2 app stores (Google + Apple)', included: true },
        { text: 'Community access', included: true },
        { text: 'Daily data updates', included: true },
        { text: 'Export data', included: false },
        { text: 'API access', included: false },
        { text: 'Custom alerts', included: false },
        { text: 'Competitor tracking', included: false },
      ],
    },
    starter: {
      name: 'Starter',
      monthlyPrice: 49,
      annualPrice: 470,
      description: 'For indie developers and small teams',
      badge: 'MOST POPULAR',
      popular: true,
      features: [
        { text: 'Everything in Free, plus:', included: true, header: true },
        { text: 'Track up to 10 apps', included: true },
        { text: 'All 6 app stores', included: true },
        { text: 'Real-time updates (45 min)', included: true },
        { text: 'Full AI insights & forecasts', included: true },
        { text: 'App Idea Analyzer (unlimited)', included: true },
        { text: 'Review intelligence', included: true },
        { text: 'Basic competitor tracking (5 apps)', included: true },
        { text: 'Custom alerts (10 alerts)', included: true },
        { text: 'Export to CSV/Excel', included: true },
        { text: 'Email support', included: true },
        { text: 'API access (1,000 calls/month)', included: false },
        { text: 'Team collaboration', included: false },
      ],
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 149,
      annualPrice: 1430,
      description: 'For growing apps and agencies',
      badge: 'BEST VALUE',
      popular: false,
      features: [
        { text: 'Everything in Starter, plus:', included: true, header: true },
        { text: 'Track up to 50 apps', included: true },
        { text: 'Advanced competitor tracking (25 apps)', included: true },
        { text: 'Market benchmarks', included: true },
        { text: 'Advanced review intelligence', included: true },
        { text: 'Custom alerts (unlimited)', included: true },
        { text: 'API access (10,000 calls/month)', included: true },
        { text: 'Team collaboration (5 seats)', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Custom reports', included: true },
        { text: 'Webhook integrations', included: true },
        { text: 'White-label reports', included: false },
        { text: 'Dedicated account manager', included: false },
      ],
    },
    enterprise: {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      description: 'For large organizations and publishers',
      badge: 'CUSTOM',
      popular: false,
      features: [
        { text: 'Everything in Pro, plus:', included: true, header: true },
        { text: 'Unlimited apps tracked', included: true },
        { text: 'Unlimited competitor tracking', included: true },
        { text: 'Custom data retention', included: true },
        { text: 'Unlimited API calls', included: true },
        { text: 'Unlimited team seats', included: true },
        { text: 'White-label reports', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'SLA guarantee (99.9% uptime)', included: true },
        { text: 'Phone support', included: true },
        { text: 'On-premise deployment option', included: true },
        { text: 'Custom AI model training', included: true },
      ],
    },
  };

  const getPrice = (plan: keyof typeof plans) => {
    if (plans[plan].monthlyPrice === null) return 'Custom';
    const price = billingCycle === 'monthly' 
      ? plans[plan].monthlyPrice 
      : Math.round(plans[plan].annualPrice! / 12);
    return price === 0 ? 'Free' : `$${price}`;
  };

  const getAnnualSavings = (plan: keyof typeof plans) => {
    if (plans[plan].monthlyPrice === null || plans[plan].monthlyPrice === 0) return null;
    const monthlyCost = plans[plan].monthlyPrice! * 12;
    const annualCost = plans[plan].annualPrice!;
    const savings = monthlyCost - annualCost;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      
      {/* ===== HERO SECTION ===== */}
      <section className="hero bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          
          <span className="inline-block bg-cyan-500/20 border border-cyan-500 px-4 py-2 rounded-full text-cyan-300 mb-6 animate-fade-in">
            💰 Simple, Transparent Pricing
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              500x More Affordable
            </span>
            <br/>Than Sensor Tower
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Starting at $49/month with full access to AI insights, 6 app stores, 
            and real-time updates. No hidden fees, no sales calls required.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up delay-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-cyan-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-white text-cyan-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
          
          <p className="text-cyan-100 text-sm">
            ✓ All plans include 14-day free trial  •  ✓ No credit card required  •  ✓ Cancel anytime
          </p>
          
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="pricing-cards bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            
            {/* FREE PLAN */}
            <div className="pricing-card bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="mb-6">
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  {plans.free.badge}
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{plans.free.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {plans.free.description}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold dark:text-white">$0</span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
              </div>
              
              <Link
                href="/signup?plan=free"
                className="block w-full py-3 text-center bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all mb-6"
              >
                Start Free
              </Link>
              
              <div className="space-y-3">
                {plans.free.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {feature.included ? (
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`text-sm ${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STARTER PLAN */}
            <div className="pricing-card bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 relative hover:shadow-cyan-500/30 transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {plans.starter.badge}
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{plans.starter.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {plans.starter.description}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold dark:text-white">{getPrice('starter')}</span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
                {billingCycle === 'annual' && getAnnualSavings('starter') && (
                  <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Save ${getAnnualSavings('starter')!.amount}/year ({getAnnualSavings('starter')!.percentage}% off)
                  </div>
                )}
              </div>
              
              <Link
                href="/signup?plan=starter"
                className="block w-full py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all mb-6"
              >
                Start Free Trial
              </Link>
              
              <div className="space-y-3">
                {plans.starter.features.map((feature, idx) => (
                  <div key={idx} className={feature.header ? 'pt-2' : ''}>
                    <div className="flex items-start gap-2">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={`text-sm ${feature.header ? 'font-semibold dark:text-white' : feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                        {feature.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRO PLAN */}
            <div className="pricing-card bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all relative">
              {plans.pro.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {plans.pro.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{plans.pro.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {plans.pro.description}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold dark:text-white">{getPrice('pro')}</span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
                {billingCycle === 'annual' && getAnnualSavings('pro') && (
                  <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Save ${getAnnualSavings('pro')!.amount}/year ({getAnnualSavings('pro')!.percentage}% off)
                  </div>
                )}
              </div>
              
              <Link
                href="/signup?plan=pro"
                className="block w-full py-3 text-center bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all mb-6"
              >
                Start Free Trial
              </Link>
              
              <div className="space-y-3">
                {plans.pro.features.map((feature, idx) => (
                  <div key={idx} className={feature.header ? 'pt-2' : ''}>
                    <div className="flex items-start gap-2">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={`text-sm ${feature.header ? 'font-semibold dark:text-white' : feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                        {feature.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ENTERPRISE PLAN */}
            <div className="pricing-card bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all">
              <div className="mb-6">
                <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  {plans.enterprise.badge}
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{plans.enterprise.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {plans.enterprise.description}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold dark:text-white">Custom</span>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Contact us for pricing
                </div>
              </div>
              
              <Link
                href="/apps"
                className="block w-full py-3 text-center bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all mb-6"
              >
                Contact Sales
              </Link>
              
              <div className="space-y-3">
                {plans.enterprise.features.map((feature, idx) => (
                  <div key={idx} className={feature.header ? 'pt-2' : ''}>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${feature.header ? 'font-semibold dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {feature.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* ===== COMPARISON CALLOUT ===== */}
      <section className="comparison-callout bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Compare to Sensor Tower
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div>
              <div className="text-5xl font-bold mb-2">$49</div>
              <div className="text-cyan-100">AppCortex Starter</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-3xl">vs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$25,000</div>
              <div className="text-cyan-100">Sensor Tower Annual</div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/why" className="inline-flex items-center px-8 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition-all">
              See Full Comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="faq bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Everything you need to know about pricing
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            
            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>Do I really not need a credit card for the free trial?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Correct! Start with our Free plan (no card required) or try any paid plan with a 14-day free trial. 
                We only ask for payment details when you're ready to upgrade after the trial.
              </p>
            </details>

            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>Can I switch plans anytime?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Yes! Upgrade or downgrade anytime. When upgrading, you'll be charged a prorated amount for the remainder 
                of your billing cycle. Downgrades take effect at the end of your current billing period.
              </p>
            </details>

            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>What happens if I exceed my plan limits?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                We'll notify you when you're approaching your limits (apps tracked, API calls, etc.). You can either 
                upgrade your plan or remove some tracked apps. We never charge overage fees — you stay in control.
              </p>
            </details>

            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>How does annual billing work?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Annual billing saves you 20%. You're charged once per year instead of monthly. If you cancel mid-year, 
                we'll refund the unused portion on a prorated basis. No questions asked.
              </p>
            </details>

            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>What payment methods do you accept?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. For Enterprise plans, 
                we also support ACH transfers and invoice payments. All payments are secure and PCI compliant.
              </p>
            </details>

            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>Do you offer discounts for nonprofits or students?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Yes! We offer 50% off for verified nonprofits and educational institutions. Students get free access 
                to the Starter plan. Contact us at hello@appcortex.pro with proof of eligibility.
              </p>
            </details>

            <details className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg dark:text-white">
                <span>What's your refund policy?</span>
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied for any reason, 
                just email us and we'll refund your payment in full. No hassle, no questions.
              </p>
            </details>

          </div>
          
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-slate-300">
            Start with our free plan or try any paid plan free for 14 days
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 shadow-2xl hover:scale-105 transition-all"
            >
              🚀 Start Free Today
            </Link>
            <Link 
              href="/apps" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold bg-white/10 backdrop-blur-sm text-white rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              💬 Explore Features
            </Link>
          </div>
          
        </div>
      </section>

    </main>
  );
}
