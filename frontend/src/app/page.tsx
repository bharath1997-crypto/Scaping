// app/page.tsx - AppCortex Homepage
// Complete homepage with hero, features, comparison, and CTAs

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* ===== HERO SECTION ===== */}
      <section className="hero relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="container relative mx-auto px-6 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Logo */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-block">
                <h1 className="text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    AppCortex
                  </span>
                </h1>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              The AI-Powered App Intelligence Platform
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Built for the Modern App Economy
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-4xl mx-auto animate-fade-in-up delay-100">
              Track, analyze, and predict app performance across <strong className="text-white">6 major stores</strong> with{' '}
              <strong className="text-white">AI-powered insights</strong> — for 500x less than Sensor Tower.
            </p>
            
            {/* Value Props Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-up delay-200">
              <div className="badge bg-cyan-500/20 border border-cyan-500 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-cyan-500/30 transition-all">
                <span className="text-cyan-300">🌍 6 App Stores Coverage</span>
              </div>
              <div className="badge bg-cyan-500/20 border border-cyan-500 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-cyan-500/30 transition-all">
                <span className="text-cyan-300">🤖 AI-Powered Insights</span>
              </div>
              <div className="badge bg-cyan-500/20 border border-cyan-500 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-cyan-500/30 transition-all">
                <span className="text-cyan-300">💰 Starting at $49/month</span>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-300">
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all"
              >
                <span className="relative z-10">🚀 Start Free — No Credit Card</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/apps" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all"
              >
                📊 Explore Apps
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No login required for public data</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>45-minute real-time updates</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>2M+ apps tracked</span>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" className="dark:fill-slate-950"/>
          </svg>
        </div>
      </section>

      {/* ===== PROBLEM-SOLUTION SECTION ===== */}
      <section className="problem-solution bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Stop Paying $25,000/Year for Half the Picture
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              See how AppCortex stacks up against the old guard
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* OLD WAY */}
            <div className="problem-card bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-red-600">Old Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">💸</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">$25K-40K/year</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">for basic analytics</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">🔒</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Only 2 stores</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">(Google + Apple only)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">📊</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">No AI insights</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">just raw data dumps</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">⏰</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Daily updates</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">always 24hrs behind</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">🚫</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Everything paywalled</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">can't try before buying</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1">❓</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">No explanations</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">figure it out yourself</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* NEW WAY (AppCortex) */}
            <div className="solution-card bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-8 rounded-xl shadow-lg border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/40 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-cyan-600">AppCortex Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-xl mt-1">💰</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">$49/month</strong>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold">(500x cheaper!)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-xl mt-1">🌍</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">6 stores</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Google, Apple, Huawei, Samsung, Xiaomi, Amazon</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-xl mt-1">🤖</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">AI explains everything</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">"why did this happen?"</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-xl mt-1">⚡</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">45-min updates</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">catch trends first</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-xl mt-1">🆓</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Full public access</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">try everything free</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-xl mt-1">💡</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Predictive forecasts</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">know what's coming</p>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ===== UNIQUE FEATURES SECTION ===== */}
      <section className="features bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              What Makes AppCortex Different
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Features you won't find anywhere else
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Feature 1: App Idea Analyzer */}
            <div className="feature-card group bg-slate-50 dark:bg-slate-900 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💡</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">App Idea Analyzer</h3>
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                🌟 WORLD FIRST
              </span>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Check if your app idea already exists. Get AI-powered originality scoring, 
                feature gap analysis, and competitor overlap detection.
              </p>
              <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 group-hover:gap-2 transition-all">
                Try it now (FREE)
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 2: Multi-Store Coverage */}
            <div className="feature-card group bg-slate-50 dark:bg-slate-900 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌍</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">True Multi-Store</h3>
              <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                ONLY US
              </span>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Cover <strong>2+ billion devices</strong> competitors ignore. Track apps across 
                Google Play, Apple, Huawei, Samsung, Xiaomi, and Amazon stores.
              </p>
              <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 group-hover:gap-2 transition-all">
                See coverage
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 3: AI Intelligence */}
            <div className="feature-card group bg-slate-50 dark:bg-slate-900 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">AI-First Intelligence</h3>
              <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                5-YEAR LEAD
              </span>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Get natural language insights, predictive forecasts, review intelligence, 
                and "why" explanations. Built with AI from day one.
              </p>
              <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 group-hover:gap-2 transition-all">
                Explore AI features
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 4: Predictive Forecasting */}
            <div className="feature-card group bg-slate-50 dark:bg-slate-900 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔮</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Predictive Forecasting</h3>
              <span className="inline-block bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                NO COMPETITOR
              </span>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                See 7, 30, and 90-day forecasts for downloads, revenue, and category trends. 
                Know what's coming before your competitors.
              </p>
              <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 group-hover:gap-2 transition-all">
                See predictions
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 5: Review Intelligence */}
            <div className="feature-card group bg-slate-50 dark:bg-slate-900 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Review Intelligence</h3>
              <span className="inline-block bg-gradient-to-r from-pink-400 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                DEEP AI
              </span>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Auto-extract topics, pain points, feature requests, and bugs from millions 
                of reviews. Save 100+ hours of manual reading.
              </p>
              <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 group-hover:gap-2 transition-all">
                See demo
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 6: Public Access */}
            <div className="feature-card group bg-slate-50 dark:bg-slate-900 p-8 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🆓</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Public Intelligence</h3>
              <span className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                FULLY OPEN
              </span>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Browse full dashboards, trending apps, and AI insights without login. 
                Try everything before you buy.
              </p>
              <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 group-hover:gap-2 transition-all">
                Explore now
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ===== SOCIAL PROOF SECTION ===== */}
      <section className="social-proof bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-cyan-100">
              Join thousands using AppCortex to build better apps
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            
            <div className="stat text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">2M+</div>
              <div className="text-cyan-100">Apps Tracked</div>
            </div>
            
            <div className="stat text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">6</div>
              <div className="text-cyan-100">App Stores</div>
            </div>
            
            <div className="stat text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">45min</div>
              <div className="text-cyan-100">Update Frequency</div>
            </div>
            
            <div className="stat text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">500x</div>
              <div className="text-cyan-100">More Affordable</div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ===== COMPARISON TABLE SECTION ===== */}
      <section className="comparison bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              How AppCortex Compares
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              See why thousands are switching from expensive enterprise tools
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="p-4 text-left font-bold dark:text-white">Feature</th>
                    <th className="p-4 text-center text-sm dark:text-white">Sensor Tower</th>
                    <th className="p-4 text-center text-sm dark:text-white">Data.ai</th>
                    <th className="p-4 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white">AppCortex</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Pricing</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">$25,000/yr</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">$40,000/yr</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">$49/mo</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">App Stores Covered</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">2</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">2</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">6</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">AI Insights</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Predictive Forecasting</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Public Access</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Free Tier</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
          
          <div className="text-center mt-8">
            <Link href="/apps" className="inline-flex items-center text-cyan-500 font-semibold hover:text-cyan-600 text-lg">
              See full comparison
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="final-cta relative bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        
        <div className="container relative mx-auto px-6 text-center">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Smarter Apps?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-cyan-100">
            Join thousands of developers using AI-powered insights to make better decisions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/signup" 
              className="group inline-flex items-center justify-center px-10 py-5 text-xl font-semibold bg-white text-cyan-600 hover:bg-slate-100 rounded-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all"
            >
              🚀 Start Free Today
            </Link>
            <Link 
              href="/apps" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold bg-transparent hover:bg-white/10 text-white rounded-lg border-2 border-white hover:border-white/50 transition-all"
            >
              📊 Explore Apps
            </Link>
          </div>
          
          <p className="text-cyan-100">
            ✓ No credit card required  •  ✓ Full access to public data  •  ✓ Cancel anytime
          </p>
          
        </div>
      </section>

    </main>
  );
}
