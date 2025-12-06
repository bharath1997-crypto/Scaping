import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';

interface StatsPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function StatsPage({ params }: StatsPageProps) {
  try {
    const app = await getAppDetail(params.store.toUpperCase(), params.appId);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href={`/apps/${params.store}/${params.appId}`}
            className="text-blue-600 hover:text-blue-700 mb-2 inline-block"
          >
            ← Back to App Detail
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Statistics</h1>
          <p className="text-gray-600">{app.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rating Trend</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart coming soon</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review Volume</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart coming soon</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Installs Trend</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart coming soon</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Score Trend</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart coming soon</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-gray-700">
            This feature requires backend API endpoint: <code className="bg-white px-2 py-1 rounded">GET /api/v1/apps/:store/:appId/stats</code>
          </p>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
