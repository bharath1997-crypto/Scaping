import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAppDetail, getAppReviewsAnalytics } from '@/lib/api';
import AppTabs from '@/components/apps/AppTabs';

interface AppDetailPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const { store, appId } = params;

  try {
    const [app, reviewsAnalytics] = await Promise.all([
      getAppDetail(store.toUpperCase(), appId),
      getAppReviewsAnalytics(store.toUpperCase(), appId).catch(() => null),
    ]);

    const formatNumber = (num?: number) => {
      if (!num) return 'N/A';
      if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    const storeName = {
      GOOGLE_PLAY: 'Google Play',
      APPLE_APP_STORE: 'App Store',
      SAMSUNG_GALAXY_STORE: 'Samsung Galaxy Store',
      HUAWEI_APP_GALLERY: 'Huawei App Gallery',
      XIAOMI_MI_STORE: 'Xiaomi Mi Store',
    }[app.store] || app.store;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* App Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* App Icon */}
            {app.icon ? (
              <Image
                src={app.icon}
                alt={app.title}
                width={120}
                height={120}
                className="rounded-lg"
              />
            ) : (
              <div className="w-30 h-30 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                No Icon
              </div>
            )}

            {/* App Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
                  <p className="text-lg text-gray-600">{app.developer}</p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">
                  {storeName}
                </span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {app.score && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Rating</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {app.score.toFixed(1)}
                      </span>
                      <span className="text-yellow-500">⭐</span>
                      {app.ratings && (
                        <span className="text-sm text-gray-500">
                          ({formatNumber(app.ratings)})
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {app.reviews && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(app.reviews)}
                    </p>
                  </div>
                )}
                {app.minInstalls && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Installs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(app.minInstalls)}+
                      {app.maxInstalls && app.maxInstalls !== app.minInstalls
                        ? ` - ${formatNumber(app.maxInstalls)}+`
                        : ''}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {app.free ? 'Free' : app.price ? `$${app.price}` : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Rank & Category */}
              {(app.rank || app.category) && (
                <div className="flex items-center space-x-4 mt-4">
                  {app.rank && (
                    <span className="text-sm text-gray-600">
                      Rank: <span className="font-medium text-gray-900">#{app.rank}</span>
                    </span>
                  )}
                  {app.category && (
                    <span className="text-sm text-gray-600">
                      Category: <span className="font-medium text-gray-900">{app.category}</span>
                    </span>
                  )}
                  {app.country && (
                    <span className="text-sm text-gray-600">
                      Country: <span className="font-medium text-gray-900 uppercase">{app.country}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <AppTabs app={app} reviewsAnalytics={reviewsAnalytics} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

