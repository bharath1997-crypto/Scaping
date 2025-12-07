// app/features/page.tsx - AppCortex Features Page
// Complete features showcase with detailed cards, screenshots, and comparison

import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* ===== HERO SECTION ===== */}
      <section className="hero relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="container relative mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            <span className="inline-block bg-cyan-500/20 border border-cyan-500 px-4 py-2 rounded-full text-cyan-300 mb-6 animate-fade-in">
              🚀 Everything You Need to Win in the App Market
            </span>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Features Built for<br/>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Data-Driven Decisions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 animate-fade-in-up delay-100">
              From AI-powered insights to multi-store tracking — AppCortex gives you 
              every tool to understand, predict, and dominate your market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <Link 
                href="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                🚀 Start Free Today
              </Link>
              <Link 
                href="/apps" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg border-2 border-white/30 font-semibold hover:bg-white/20 transition-all"
              >
                📊 Explore Apps
              </Link>
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

      {/* ===== FEATURE CATEGORIES ===== */}
      <section className="categories bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Explore by Category
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Jump to the features that matter most to you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <a href="#ai-intelligence" className="category-card group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl transition-all">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">AI & Intelligence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Predictive insights, forecasting, natural language</p>
            </a>
            
            <a href="#analytics" className="category-card group bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border-2 border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-xl transition-all">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Analytics & Tracking</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Downloads, revenue, rankings, real-time data</p>
            </a>
            
            <a href="#competitive" className="category-card group bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-xl transition-all">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚔️</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Competitive Intelligence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Competitor tracking, market trends, benchmarks</p>
            </a>
            
            <a href="#optimization" className="category-card group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:shadow-xl transition-all">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">ASO & Optimization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Keywords, metadata, A/B testing, conversions</p>
            </a>
            
            <a href="#reviews" className="category-card group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Review Intelligence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sentiment analysis, topic extraction, trends</p>
            </a>
            
            <a href="#platform" className="category-card group bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-xl transition-all">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🛠️</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Platform & Tools</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">API, exports, alerts, collaboration</p>
            </a>
            
          </div>
          
        </div>
      </section>

      {/* ===== AI & INTELLIGENCE FEATURES ===== */}
      <section id="ai-intelligence" className="ai-features bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 dark:bg-purple-900/20 px-4 py-2 rounded-full text-purple-600 dark:text-purple-400 font-semibold mb-4">
              🤖 AI & Intelligence
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              AI-First Architecture
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Not just data — actual intelligence that explains what's happening and what to do next
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Feature 1: Predictive Forecasting */}
            <div className="feature-row grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
                    🔮
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">Predictive Forecasting</h3>
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">NO COMPETITOR HAS THIS</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  See the future with AI-powered predictions for downloads, revenue, and rankings. 
                  Get 7-day, 30-day, and 90-day forecasts with confidence intervals.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Prophet + LSTM hybrid models</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Category growth predictions</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Seasonal trend detection</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Confidence ranges (best/worst case)</span>
                  </li>
                </ul>
                <Link href="/apps" className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:gap-2 transition-all">
                  Try forecasting demo
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-3">📈</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Forecast Chart Preview</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Natural Language Insights */}
            <div className="feature-row grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">Natural Language Insights</h3>
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">AI-POWERED</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Get insights in plain English, not technical jargon. Our AI explains what's happening 
                  in your market and recommends specific actions to take.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>"Why did downloads drop?" explanations</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Automatic anomaly detection</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Recommended actions (what to do next)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-purple-500 mt-1">✓</span>
                    <span>Daily digest summaries</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl">
                <div className="space-y-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">"Your downloads increased 34% this week due to featured placement in the US Education category."</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">"Competitors are updating faster. Consider a bi-weekly release schedule."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: App Idea Analyzer */}
            <div className="feature-row grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-2xl">
                    💡
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">App Idea Analyzer</h3>
                    <span className="text-sm bg-yellow-500 text-black px-2 py-1 rounded font-semibold">🌍 WORLD FIRST</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Validate your app idea before spending months building. Search 2M+ apps to find 
                  similar concepts, get originality scores, and discover feature gaps to exploit.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-yellow-600 mt-1">✓</span>
                    <span>AI searches across all 6 app stores</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-yellow-600 mt-1">✓</span>
                    <span>Originality score (0-100%)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-yellow-600 mt-1">✓</span>
                    <span>Feature gap analysis</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-yellow-600 mt-1">✓</span>
                    <span>Differentiation suggestions</span>
                  </li>
                </ul>
                <Link href="/apps" className="inline-flex items-center text-yellow-600 dark:text-yellow-400 font-semibold hover:gap-2 transition-all">
                  Try Idea Analyzer FREE
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded">
                    <span className="text-sm font-medium dark:text-white">Originality Score</span>
                    <span className="text-2xl font-bold text-yellow-600">78%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Similar Apps Found:</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">• Fitness Tracker Pro (82% match)</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">• Health Monitor (71% match)</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">• Daily Activity (68% match)</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">💡 Opportunity</div>
                    <div className="text-xs text-green-600 dark:text-green-300">Add social features - none of the similar apps have this!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ===== ANALYTICS & TRACKING ===== */}
      <section id="analytics" className="analytics-features bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-100 dark:bg-cyan-900/20 px-4 py-2 rounded-full text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
              📊 Analytics & Tracking
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Complete Market Intelligence
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Track every metric that matters across 6 app stores in real-time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Analytics Card 1 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Download Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                Real-time download estimates across all platforms with historical data and trends.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Daily/weekly/monthly views</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Country breakdowns</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Device type analysis</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Growth rate calculations</span>
                </li>
              </ul>
            </div>

            {/* Analytics Card 2 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Revenue Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                Estimated revenue, IAP performance, subscription metrics, and monetization insights.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Revenue estimates</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>IAP performance tracking</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Subscription retention</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>ARPU calculations</span>
                </li>
              </ul>
            </div>

            {/* Analytics Card 3 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Ranking Tracker</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                Monitor rankings across categories, keywords, and regions with historical trends.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Overall + category ranks</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Keyword position tracking</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Featured placements</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Chart position alerts</span>
                </li>
              </ul>
            </div>

            {/* Analytics Card 4 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Multi-Store Coverage</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                Track performance across Google Play, Apple, Huawei, Samsung, Xiaomi, and Amazon.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>6 app stores (not just 2!)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Cross-platform comparison</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Regional performance</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>2B+ additional users</span>
                </li>
              </ul>
            </div>

            {/* Analytics Card 5 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Real-Time Updates</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                Data refreshes every 45 minutes — not daily like competitors. Catch trends first.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>45-min refresh cycles</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Kafka streaming architecture</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Instant change notifications</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Beat competitors to trends</span>
                </li>
              </ul>
            </div>

            {/* Analytics Card 6 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Historical Data</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                Access years of historical data to understand long-term trends and seasonality.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Multi-year data retention</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Trend analysis tools</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>YoY comparisons</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-500">✓</span>
                  <span>Seasonal pattern detection</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </section>

      {/* ===== COMPETITIVE INTELLIGENCE ===== */}
      <section id="competitive" className="competitive-features bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 dark:bg-orange-900/20 px-4 py-2 rounded-full text-orange-600 dark:text-orange-400 font-semibold mb-4">
              ⚔️ Competitive Intelligence
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Know What Your Competitors Are Doing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Track competitor apps, discover their strategies, and find opportunities they're missing
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">🔍</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Competitor Tracking</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Monitor up to 100 competitor apps automatically. Get alerts when they update, change pricing, 
                  or launch new features.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Update alerts</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Pricing changes</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Feature launches</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">ASO changes</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">📊</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Market Benchmarks</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Compare your performance against category averages. See where you rank and identify 
                  areas for improvement.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Category averages</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Percentile rankings</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Growth rates</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Top performers</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">🎯</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Feature Gap Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Discover features your competitors have that you don't — and vice versa. Find opportunities 
                  to differentiate.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Feature comparison</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">User requests</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Missing features</span>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm">Differentiation ideas</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-cyan-100">
            Try every feature free — no credit card required
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold bg-white text-cyan-600 hover:bg-slate-100 rounded-lg shadow-2xl hover:scale-105 transition-all"
            >
              🚀 Start Free Today
            </Link>
            <Link 
              href="/apps" 
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold bg-transparent hover:bg-white/10 text-white rounded-lg border-2 border-white transition-all"
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
