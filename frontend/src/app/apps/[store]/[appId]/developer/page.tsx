import { getAppDetail, listApps } from '@/lib/api';
import { notFound } from 'next/navigation';
import AppCard from '@/components/apps/AppCard';

interface DeveloperPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function DeveloperPage({ params }: DeveloperPageProps) {
  try {
    const app = await getAppDetail(params.store.toUpperCase(), params.appId);
    const developerApps = await listApps({
      store: app.store,
      page: 1,
      pageSize: 24,
    });
    
    // Filter apps by same developer (simplified - would need backend API)
    const sameDeveloperApps = developerApps.data.filter(
      (a) => a.developer === app.developer && a.appId !== app.appId
    );
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href={`/apps/${params.store}/${params.appId}`}
            className="text-blue-600 hover:text-blue-700 mb-2 inline-block"
          >
            ← Back to App Detail
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Apps</h1>
          <p className="text-gray-600">
            Other apps by {app.developer}
          </p>
        </div>

        {sameDeveloperApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sameDeveloperApps.map((devApp) => (
              <AppCard key={devApp.id} app={devApp} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600">No other apps found for this developer.</p>
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}

