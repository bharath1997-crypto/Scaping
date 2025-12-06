import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';

interface AlertsPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function AlertsPage({ params }: AlertsPageProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Up Alerts</h1>
          <p className="text-gray-600">{app.title}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Alert Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">Notify when rating drops below 4.0</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">Notify when rank changes significantly</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">Notify when new reviews spike</span>
            </label>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700">
            This feature requires user authentication. Please sign in to set up alerts.
          </p>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

