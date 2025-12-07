// app/why/page.tsx - Why AppCortex Landing Page
// Complete page explaining competitive advantages and unique selling propositions

import Link from 'next/link';

export default function WhyAppCortexPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* ===== HERO SECTION ===== */}
      <section className="hero relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="container relative mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Badge */}
            <span className="inline-block bg-cyan-500/20 border border-cyan-500 px-4 py-2 rounded-full text-cyan-300 mb-6 animate-fade-in">
              🏆 The Smarter Alternative to Sensor Tower & Data.ai
            </span>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Why Thousands Are Switching<br/>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                to AppCortex
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-10 animate-fade-in-up delay-100">
              Get 10x the features at 1/500th the price — with AI intelligence 
              that actually explains what's happening in your market.
            </p>
            
            {/* Jump Links */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-200">
              <a href="#multi-store" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition-all">
                🌍 Multi-Store
              </a>
              <a href="#ai-first" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition-all">
                🤖 AI-First
              </a>
              <a href="#affordability" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition-all">
                💰 Affordability
              </a>
              <a href="#public" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition-all">
                🆓 Public Access
              </a>
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

      {/* ===== THE PROBLEM SECTION ===== */}
      <section className="problem bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mx-auto">
            
            <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
              The Problem with Existing App Analytics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Problem 1 */}
              <div className="problem-card bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-2xl">
                    💸
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">Ridiculously Expensive</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Sensor Tower and Data.ai charge <strong className="text-slate-900 dark:text-white">$25,000-$40,000 per year</strong> 
                  for basic analytics. That's more than most indie developers make from their apps!
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No free tier to try</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Hidden pricing (call for quote)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Annual contracts only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Can't cancel easily</span>
                  </li>
                </ul>
              </div>
              
              {/* Problem 2 */}
              <div className="problem-card bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-2xl">
                    🔒
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">Limited Coverage</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  They only cover Google Play and Apple App Store — ignoring 
                  <strong className="text-slate-900 dark:text-white"> 2+ BILLION users</strong> on other platforms.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No Huawei (300M+ users)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No Samsung (500M+ devices)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No Xiaomi (400M+ users)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No Amazon Appstore</span>
                  </li>
                </ul>
              </div>
              
              {/* Problem 3 */}
              <div className="problem-card bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">Just Data, No Intelligence</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  They show you charts and numbers, but <strong className="text-slate-900 dark:text-white">don't explain what's happening</strong> 
                  or what you should do about it.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No AI insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No predictive forecasting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No "why" explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>You're on your own to interpret</span>
                  </li>
                </ul>
              </div>
              
              {/* Problem 4 */}
              <div className="problem-card bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-2xl">
                    ⏰
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">Slow & Outdated</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Daily updates mean you're <strong className="text-slate-900 dark:text-white">always 24-48 hours behind</strong> the market. 
                  By the time you see a trend, it's too late.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Daily batch updates only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Miss early trend signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Competitors act faster</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Reactive, not proactive</span>
                  </li>
                </ul>
              </div>
              
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ===== SOLUTION INTRO ===== */}
      <section className="solution-intro bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We Built the Platform We Wish Existed
            </h2>
            <p className="text-xl text-cyan-100">
              AppCortex is what happens when you rebuild app analytics from scratch 
              for the AI era — with developers and startups in mind, not just Fortune 500s.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 10 REASONS SECTION ===== */}
      <section className="reasons bg-white dark:bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              10 Reasons to Choose AppCortex
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Each one is a competitive advantage competitors can't replicate
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* REASON 1: MULTI-STORE */}
            <div id="multi-store" className="reason-card bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border-l-4 border-cyan-500 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-3xl">
                    🌍
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold dark:text-white">1. True Multi-Store Coverage</h3>
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ONLY US
                    </span>
                  </div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                    We track apps across <strong className="text-slate-900 dark:text-white">6 major stores</strong> — not just 2.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <div className="font-bold text-lg mb-1 dark:text-white">Google Play</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">2.5B users</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <div className="font-bold text-lg mb-1 dark:text-white">Apple App Store</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">1.8B users</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-cyan-500">
                      <div className="font-bold text-lg mb-1 text-cyan-600">Huawei AppGallery</div>
                      <div className="text-sm text-cyan-600">300M+ users ⭐</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-cyan-500">
                      <div className="font-bold text-lg mb-1 text-cyan-600">Samsung Galaxy</div>
                      <div className="text-sm text-cyan-600">500M+ devices ⭐</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-cyan-500">
                      <div className="font-bold text-lg mb-1 text-cyan-600">Xiaomi GetApps</div>
                      <div className="text-sm text-cyan-600">400M+ users ⭐</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-cyan-500">
                      <div className="font-bold text-lg mb-1 text-cyan-600">Amazon Appstore</div>
                      <div className="text-sm text-cyan-600">Fire devices ⭐</div>
                    </div>
                  </div>
                  
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                    <p className="font-semibold mb-2 dark:text-white">💡 Why This Matters:</p>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      <li>• Reach <strong>2+ billion additional users</strong> competitors ignore</li>
                      <li>• Track apps in China, India, MENA regions properly</li>
                      <li>• Compare performance across all platforms</li>
                      <li>• Competitors <strong>legally can't</strong> add these (enterprise compliance)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* REASON 2: AI-FIRST */}
            <div id="ai-first" className="reason-card bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border-l-4 border-purple-500 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-3xl">
                    🤖
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold dark:text-white">2. AI-First Architecture</h3>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      5-YEAR LEAD
                    </span>
                  </div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                    Built from day one with AI intelligence — not retrofitted.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <div className="font-bold mb-2 dark:text-white">🧠 Natural Language Insights</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Get explanations in plain English, not just charts
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <div className="font-bold mb-2 dark:text-white">🔮 Predictive Forecasts</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        See 7, 30, 90-day predictions for downloads & revenue
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <div className="font-bold mb-2 dark:text-white">❓ "Why" Explanations</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Understand WHY metrics changed, not just that they did
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <div className="font-bold mb-2 dark:text-white">💬 Review Intelligence</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Auto-extract topics, pain points, feature requests
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="font-semibold mb-2 dark:text-white">💡 Why This Matters:</p>
                    <p className="text-slate-700 dark:text-slate-300">
                      Competitors were built 10+ years ago with old tech stacks. They can't easily 
                      "bolt on" AI. AppCortex is designed for AI from the ground up, giving us a 
                      <strong> 5-year technical advantage</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* REASON 3: APP IDEA ANALYZER */}
            <div className="reason-card bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border-l-4 border-yellow-500 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-3xl">
                    💡
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold dark:text-white">3. App Idea Analyzer</h3>
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      🌍 WORLD FIRST
                    </span>
                  </div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                    The feature that doesn't exist anywhere else.
                  </p>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
                    <p className="font-semibold mb-3 dark:text-white">How It Works:</p>
                    <ol className="space-y-2">
                      <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="font-bold">1.</span>
                        <span>Describe your app idea in plain English</span>
                      </li>
                      <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="font-bold">2.</span>
                        <span>AI searches 2M+ apps for similar concepts</span>
                      </li>
                      <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="font-bold">3.</span>
                        <span>Get originality score (0-100%)</span>
                      </li>
                      <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="font-bold">4.</span>
                        <span>See feature gap analysis</span>
                      </li>
                      <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="font-bold">5.</span>
                        <span>Get AI suggestions for differentiation</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <p className="font-semibold mb-2 dark:text-white">💡 Why This Matters:</p>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      <li>• Validate ideas before spending months building</li>
                      <li>• Find gaps in existing apps to exploit</li>
                      <li>• Avoid building something that already exists</li>
                      <li>• <strong>NO COMPETITOR HAS THIS — completely unique to AppCortex</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* REASON 4: AFFORDABILITY */}
            <div id="affordability" className="reason-card bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border-l-4 border-green-500 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl">
                    💰
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold dark:text-white">4. 500x More Affordable</h3>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      DEMOCRATIZED
                    </span>
                  </div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                    Professional analytics shouldn't cost more than your app makes.
                  </p>
                  
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Sensor Tower</div>
                      <div className="text-3xl font-bold text-red-600 mb-2">$25K/yr</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">= $2,083/month</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Data.ai</div>
                      <div className="text-3xl font-bold text-red-600 mb-2">$40K/yr</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">= $3,333/month</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">AppCortex</div>
                      <div className="text-3xl font-bold text-green-600 mb-2">$49/mo</div>
                      <div className="text-sm text-green-600 font-semibold">⬇️ 500x cheaper!</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="font-semibold mb-2 dark:text-white">💡 What You Can Do With That Savings:</p>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      <li>• Invest $24,951 more in marketing</li>
                      <li>• Hire a developer for 6+ months</li>
                      <li>• Run 500,000+ Facebook ads</li>
                      <li>• Pay for <strong>42 years</strong> of AppCortex instead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* REASON 5: PUBLIC ACCESS */}
            <div id="public" className="reason-card bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border-l-4 border-blue-500 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-3xl">
                    🆓
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold dark:text-white">5. Public Intelligence Mode</h3>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      FULLY OPEN
                    </span>
                  </div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                    Try everything before you buy anything.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="font-bold text-red-600 mb-3">❌ Competitors:</div>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• Login required immediately</li>
                        <li>• Can't see anything without payment</li>
                        <li>• No free tier at all</li>
                        <li>• Hidden pricing</li>
                        <li>• "Request demo" forms</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-green-600 mb-3">✅ AppCortex:</div>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• Browse all public dashboards</li>
                        <li>• See trending apps</li>
                        <li>• Read AI insights</li>
                        <li>• Compare apps</li>
                        <li>• No login needed</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="font-semibold mb-2 dark:text-white">💡 Why This Matters:</p>
                    <p className="text-slate-700 dark:text-slate-300">
                      We believe in transparency. Our public mode lets you explore the full platform 
                      and see real value before committing. This builds trust and lets you make an 
                      informed decision — plus it drives <strong>millions of organic visitors</strong> 
                      via SEO that competitors can't get.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Show More Button */}
          <div className="text-center mt-12">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              + 5 more reasons including Real-Time Updates, Review Intelligence, Predictive Forecasting, Community Ecosystem, and Developer-First Approach
            </p>
            <Link 
              href="#comparison" 
              className="inline-flex items-center px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all"
            >
              See Full Comparison
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section id="comparison" className="comparison bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          
          <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
            Side-by-Side Comparison
          </h2>
          
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
                    <td className="p-4 font-semibold dark:text-white">Annual Cost</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">$25,000</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">$40,000</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">$588</strong>
                      <div className="text-xs text-cyan-600 dark:text-cyan-400">($49/mo)</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">App Stores</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">2</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">2</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">6</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">AI Insights</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Predictive Forecasting</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">App Idea Analyzer</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅ World First</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Public Dashboard</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Update Frequency</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">Daily</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">Daily</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">45 minutes</strong>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-semibold dark:text-white">Free Tier</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20">
                      <strong className="text-cyan-600 dark:text-cyan-400">✅ Full Access</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Switch to AppCortex?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-cyan-100">
            Join the platform that gives you 10x the features at 1/500th the price
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
          
          <p className="text-cyan-100 mb-8">
            ✓ No credit card required  •  ✓ Cancel anytime  •  ✓ Full access to public data
          </p>
          
          <div className="text-sm text-cyan-200">
            Have questions? <Link href="/apps" className="underline font-semibold hover:text-white">Explore our platform</Link>
          </div>
          
        </div>
      </section>

    </main>
  );
}
