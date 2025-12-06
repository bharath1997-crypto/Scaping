import { listApps } from '@/lib/api';
import MetricsCard from '@/components/dashboard/MetricsCard';

export default async function AppleAppStoreDashboardPage() {
  const response = await listApps({ store: 'APPLE_APP_STORE', page: 1, pageSize: 1 });
  const totalApps = response.pagination.total;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apple App Store Market Overview</h1>
        <p className="text-gray-600">Comprehensive analytics for Apple App Store apps</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Apps"
          value={totalApps.toLocaleString()}
          subtitle="Apple App Store"
        />
        <MetricsCard
          title="Categories"
          value="25+"
          subtitle="Active categories"
        />
        <MetricsCard
          title="Countries"
          value="175+"
          subtitle="Supported countries"
        />
        <MetricsCard
          title="Avg Rating"
          value="4.3"
          subtitle="Across all apps"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">Games</p>
            <p className="text-sm text-gray-600">Most popular</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">Business</p>
            <p className="text-sm text-gray-600">Growing</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">Productivity</p>
            <p className="text-sm text-gray-600">Trending</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">Entertainment</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <a
          href="/apps?store=APPLE_APP_STORE"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Apple Apps →
        </a>
      </div>
    </div>
  );
}
