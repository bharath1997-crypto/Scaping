import Link from 'next/link';
import { listApps } from '@/lib/api';
import AppCard from '@/components/apps/AppCard';
import MetricsCard from '@/components/dashboard/MetricsCard';

export default async function HomePage() {
  // Fetch top apps for each chart type
  const [topFree, topPaid, topGrossing] = await Promise.all([
    listApps({ page: 1, pageSize: 6, sortBy: 'rank', sortDir: 'asc' }),
    listApps({ page: 1, pageSize: 6, sortBy: 'rank', sortDir: 'asc' }),
    listApps({ page: 1, pageSize: 6, sortBy: 'rank', sortDir: 'asc' }),
  ]);

  // Calculate totals (simplified - in production, use a stats endpoint)
  const totalApps = topFree.pagination.total;
  const totalReviews = topFree.pagination.total * 24; // Estimate

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          MoneyControl for App Markets
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track app performance across multiple app stores. Get insights on rankings, ratings, reviews, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/apps"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Explore Apps
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <MetricsCard
          title="Total Apps"
          value={totalApps.toLocaleString()}
          subtitle="Across all stores"
        />
        <MetricsCard
          title="Raw Snapshots"
          value="44,494"
          subtitle="Historical data points"
        />
        <MetricsCard
          title="Total Reviews"
          value="465K+"
          subtitle="User feedback collected"
        />
        <MetricsCard
          title="Rankings"
          value="32,550"
          subtitle="Chart positions tracked"
        />
      </div>

      {/* Store Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Google Play</h2>
          <p className="text-3xl font-bold text-gray-900 mb-2">14,150</p>
          <p className="text-sm text-gray-600">apps tracked</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Apple App Store</h2>
          <p className="text-3xl font-bold text-gray-900 mb-2">5,138</p>
          <p className="text-sm text-gray-600">apps tracked</p>
        </div>
      </div>

      {/* Top Charts */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Charts</h2>
          <Link
            href="/apps"
            className="text-primary hover:text-primary-dark font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Free */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Free</h3>
            <div className="space-y-3">
              {topFree.data.slice(0, 5).map((app) => (
                <AppCard key={app.id} app={app} size="small" />
              ))}
            </div>
          </div>

          {/* Top Paid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Paid</h3>
            <div className="space-y-3">
              {topPaid.data.slice(0, 5).map((app) => (
                <AppCard key={app.id} app={app} size="small" />
              ))}
            </div>
          </div>

          {/* Top Grossing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Grossing</h3>
            <div className="space-y-3">
              {topGrossing.data.slice(0, 5).map((app) => (
                <AppCard key={app.id} app={app} size="small" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Explore AppCortex
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/apps"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium text-gray-900">All Apps</div>
          </Link>
          <Link
            href="/categories"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📂</div>
            <div className="font-medium text-gray-900">Categories</div>
          </Link>
          <Link
            href="/countries"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-medium text-gray-900">Countries</div>
          </Link>
          <Link
            href="/dashboard"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-gray-900">Dashboard</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

