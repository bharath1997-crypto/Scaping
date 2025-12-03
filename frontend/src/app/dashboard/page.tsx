import { listApps } from '@/lib/api';
import MetricsCard from '@/components/dashboard/MetricsCard';

export default async function DashboardPage() {
  // Fetch apps to calculate stats
  const [googleApps, appleApps] = await Promise.all([
    listApps({ store: 'GOOGLE_PLAY', page: 1, pageSize: 1 }),
    listApps({ store: 'APPLE_APP_STORE', page: 1, pageSize: 1 }),
  ]);

  const totalApps = googleApps.pagination.total + appleApps.pagination.total;
  const googleCount = googleApps.pagination.total;
  const appleCount = appleApps.pagination.total;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Dashboard</h1>
        <p className="text-gray-600">Overview of app market data across all stores</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Google Play</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
              Active
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{googleCount.toLocaleString()}</p>
          <p className="text-sm text-gray-600">apps tracked</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(googleCount / totalApps) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((googleCount / totalApps) * 100).toFixed(1)}% of total apps
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Apple App Store</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">
              Active
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{appleCount.toLocaleString()}</p>
          <p className="text-sm text-gray-600">apps tracked</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 h-2 rounded-full"
                style={{ width: `${(appleCount / totalApps) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((appleCount / totalApps) * 100).toFixed(1)}% of total apps
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/apps?store=GOOGLE_PLAY"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium text-gray-900">Google Play Apps</div>
          </a>
          <a
            href="/apps?store=APPLE_APP_STORE"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🍎</div>
            <div className="font-medium text-gray-900">Apple Apps</div>
          </a>
          <a
            href="/apps"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-medium text-gray-900">Browse All Apps</div>
          </a>
          <a
            href="/categories"
            className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📂</div>
            <div className="font-medium text-gray-900">Categories</div>
          </a>
        </div>
      </div>
    </div>
  );
}

