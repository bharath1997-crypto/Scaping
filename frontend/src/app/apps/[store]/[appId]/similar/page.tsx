import { getAppDetail, listApps } from '@/lib/api';
import { notFound } from 'next/navigation';
import AppCard from '@/components/apps/AppCard';

interface SimilarPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function SimilarPage({ params }: SimilarPageProps) {
  try {
    const app = await getAppDetail(params.store.toUpperCase(), params.appId);
    const similarApps = await listApps({
      category: app.category,
      store: app.store,
      page: 1,
      pageSize: 12,
    });
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href={`/apps/${params.store}/${params.appId}`}
            className="text-blue-600 hover:text-blue-700 mb-2 inline-block"
          >
            ← Back to App Detail
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Similar Apps</h1>
          <p className="text-gray-600">
            Apps similar to {app.title} in {app.category || 'same category'}
          </p>
        </div>

        {similarApps.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarApps.data
              .filter((a) => a.appId !== app.appId)
              .slice(0, 9)
              .map((similarApp) => (
                <AppCard key={similarApp.id} app={similarApp} />
              ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600">No similar apps found.</p>
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
