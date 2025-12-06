import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';

interface RawPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function RawPage({ params }: RawPageProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Raw Snapshot Data</h1>
          <p className="text-gray-600">{app.title} - Debug View</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Raw data from database (for debugging)</p>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(app, null, 2)}
          </pre>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This is a debug view showing raw app data. This page is typically only visible to administrators.
          </p>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

