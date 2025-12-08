'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDashboardData, DashboardData } from '@/lib/app-api';
import { formatApiError } from '@/lib/api-utils';

export default function DashboardPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      appsTracked: 0,
      avgDownloads: '0',
      sentimentScore: 0,
      trendingCategories: 0,
    },
    recentApps: [],
    insights: [],
    recentActivity: [],
  });

  // Fetch dashboard data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardData(timeRange);
        setDashboardData(data);
      } catch (err: any) {
        console.error('Failed to fetch dashboard data:', err);
        setError(formatApiError(err));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeRange]);

  const { stats, recentApps, insights, recentActivity } = dashboardData;

  // Handle quick actions
  const handleTrackApp = () => {
    router.push('/search');
  };

  const handleGenerateReport = () => {
    router.push('/reports');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Welcome Message */}
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Welcome back! Here's what's happening with your apps.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleTrackApp}
                className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Track App
              </button>
              <button 
                onClick={handleGenerateReport}
                className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Generate Report
              </button>
            </div>

          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search apps, categories, or insights..."
                className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-slate-600 dark:text-slate-400">Loading dashboard...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        
        {/* KPI Cards */}
        {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Apps Tracked */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">+3 this week</span>
            </div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white">{stats.appsTracked}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Apps Tracked</p>
          </div>

          {/* Avg Downloads */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">+12% this month</span>
            </div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white">{stats.avgDownloads}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Avg Downloads</p>
          </div>

          {/* Sentiment Score */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">+0.3 points</span>
            </div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white">{stats.sentimentScore}/5.0</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Sentiment Score</p>
          </div>

          {/* Trending Categories */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">2 new today</span>
            </div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white">{stats.trendingCategories}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Trending Categories</p>
          </div>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Charts & Apps */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Downloads Trend Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold dark:text-white">Download Trends</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Your tracked apps performance</p>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Chart will render here</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Integrate Chart.js or Recharts</p>
                </div>
              </div>
            </div>

            {/* Recent Apps */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold dark:text-white">Tracked Apps</h2>
                <Link href="/apps" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                  View all →
                </Link>
              </div>

              <div className="space-y-4">
                {recentApps.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <p>No tracked apps yet. Start tracking apps to see them here.</p>
                    <Link href="/search" className="text-cyan-600 dark:text-cyan-400 hover:underline mt-2 inline-block">
                      Search for apps →
                    </Link>
                  </div>
                ) : (
                  recentApps.map((app) => (
                    <Link 
                      key={app.id} 
                      href={`/apps/${app.id}`}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {app.name.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold dark:text-white">{app.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{app.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold dark:text-white">{app.downloads}</p>
                        <p className={`text-sm ${app.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {app.change}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right Column - Insights & Activity */}
          <div className="space-y-8">
            
            {/* AI Insights */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold dark:text-white">AI Insights</h2>
                <Link href="/insights" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                  See all →
                </Link>
              </div>

              <div className="space-y-4">
                {insights.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                    No insights available yet.
                  </div>
                ) : (
                  insights.map((insight) => (
                  <div key={insight.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        insight.type === 'opportunity' ? 'bg-green-100 dark:bg-green-900/20' :
                        insight.type === 'alert' ? 'bg-orange-100 dark:bg-orange-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        {insight.type === 'opportunity' && (
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        )}
                        {insight.type === 'alert' && (
                          <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                        {insight.type === 'trend' && (
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm dark:text-white mb-1">{insight.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">{insight.date}</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">{insight.confidence}% confidence</span>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold mb-6 dark:text-white">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                    No recent activity.
                  </div>
                ) : (
                  recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm dark:text-white">
                        <span className="font-medium">{activity.action}</span>
                        {' '}<span className="text-slate-600 dark:text-slate-400">{activity.app}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Need help getting started?</h3>
              <p className="text-sm text-cyan-50 mb-4">
                Check out our quick start guide to make the most of AppCortex.
              </p>
              <Link href="/faq" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors text-sm font-semibold">
                View Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>

        </div>
        )}

      </div>
    </div>
  );
}
