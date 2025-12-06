import { listApps } from '@/lib/api';
import MetricsCard from '@/components/dashboard/MetricsCard';
import { notFound } from 'next/navigation';

interface CountryDashboardPageProps {
  params: {
    code: string;
  };
}

const countryNames: Record<string, string> = {
  us: 'United States',
  in: 'India',
  gb: 'United Kingdom',
  ca: 'Canada',
  au: 'Australia',
};

export default async function CountryDashboardPage({ params }: CountryDashboardPageProps) {
  const { code } = params;
  const countryName = countryNames[code.toLowerCase()] || code.toUpperCase();

  if (!countryNames[code.toLowerCase()]) {
    notFound();
  }

  const response = await listApps({ country: code.toLowerCase(), page: 1, pageSize: 1 });
  const totalApps = response.pagination.total;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{countryName} Market Dashboard</h1>
        <p className="text-gray-600">App market insights for {countryName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Apps"
          value={totalApps.toLocaleString()}
          subtitle={`In ${countryName}`}
        />
        <MetricsCard
          title="Google Play"
          value="—"
          subtitle="Apps available"
        />
        <MetricsCard
          title="Apple Store"
          value="—"
          subtitle="Apps available"
        />
        <MetricsCard
          title="Avg Rating"
          value="4.2"
          subtitle="Across all apps"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Store Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-medium text-gray-900 mb-1">Google Play</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900 mb-1">Apple App Store</p>
            <p className="text-2xl font-bold text-gray-900">—</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={`/apps?country=${code}`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Browse {countryName} Apps →
        </a>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
