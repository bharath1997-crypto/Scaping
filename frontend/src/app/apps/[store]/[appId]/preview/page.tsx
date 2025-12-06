import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PreviewPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Storefront Preview</h1>
          <p className="text-gray-600">{app.title}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 rounded-lg p-6">
              {app.icon && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={app.icon}
                    alt={app.title}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{app.title}</h2>
              <p className="text-gray-600 text-center mb-4">{app.developer}</p>
              {app.score && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-lg font-bold text-gray-900">{app.score.toFixed(1)}</span>
                  {app.ratings && (
                    <span className="text-sm text-gray-600">({app.ratings.toLocaleString()})</span>
                  )}
                </div>
              )}
              <div className="text-center">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium">
                  {app.free ? 'Install' : `$${app.price || 'Buy'}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

