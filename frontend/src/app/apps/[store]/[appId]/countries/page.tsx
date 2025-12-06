import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';

interface CountriesPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function CountriesPage({ params }: CountriesPageProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Country Comparison</h1>
          <p className="text-gray-600">{app.title}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance by Country</h2>
          <div className="space-y-4">
            {['US', 'IN', 'GB', 'CA', 'AU'].map((country) => (
              <div key={country} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{country}</p>
                  <p className="text-sm text-gray-600">Rank: #— | Rating: —</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Reviews: —</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-gray-700">
            This feature requires backend API for multi-country comparison. Coming soon!
          </p>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

