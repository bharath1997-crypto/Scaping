import Image from 'next/image';
import Link from 'next/link';
import { App } from '@/lib/api';
import { clsx } from 'clsx';

interface AppCardProps {
  app: App;
  showRank?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function AppCard({ app, showRank = true, size = 'medium' }: AppCardProps) {
  const storeBadgeColor = {
    GOOGLE_PLAY: 'bg-green-100 text-green-800',
    APPLE_APP_STORE: 'bg-gray-100 text-gray-800',
    SAMSUNG_GALAXY_STORE: 'bg-blue-100 text-blue-800',
    HUAWEI_APP_GALLERY: 'bg-red-100 text-red-800',
    XIAOMI_MI_STORE: 'bg-orange-100 text-orange-800',
  }[app.store] || 'bg-gray-100 text-gray-800';

  const storeName = {
    GOOGLE_PLAY: 'Google Play',
    APPLE_APP_STORE: 'App Store',
    SAMSUNG_GALAXY_STORE: 'Samsung',
    HUAWEI_APP_GALLERY: 'Huawei',
    XIAOMI_MI_STORE: 'Xiaomi',
  }[app.store] || app.store;

  const formatNumber = (num?: number) => {
    if (!num) return 'N/A';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Link
      href={`/apps/${app.store.toLowerCase()}/${app.appId}`}
      className={clsx(
        'block bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all',
        size === 'small' && 'p-3',
        size === 'medium' && 'p-4',
        size === 'large' && 'p-6'
      )}
    >
      <div className="flex items-start space-x-4">
        {/* App Icon */}
        <div className="flex-shrink-0">
          {app.icon ? (
            <Image
              src={app.icon}
              alt={app.title}
              width={size === 'small' ? 48 : size === 'large' ? 80 : 64}
              height={size === 'small' ? 48 : size === 'large' ? 80 : 64}
              className="rounded-lg"
            />
          ) : (
            <div className="bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
              No Icon
            </div>
          )}
        </div>

        {/* App Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{app.title}</h3>
              <p className="text-sm text-gray-600 truncate">{app.developer}</p>
            </div>
            {showRank && app.rank && (
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                #{app.rank}
              </span>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="mt-2 flex items-center space-x-4">
            {app.score && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-900">
                  {app.score.toFixed(1)}
                </span>
                {app.ratings && (
                  <span className="text-xs text-gray-500">
                    ({formatNumber(app.ratings)})
                  </span>
                )}
              </div>
            )}
            {app.reviews && (
              <span className="text-xs text-gray-500">
                {formatNumber(app.reviews)} reviews
              </span>
            )}
          </div>

          {/* Store Badge & Price */}
          <div className="mt-2 flex items-center justify-between">
            <span
              className={clsx(
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                storeBadgeColor
              )}
            >
              {storeName}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {app.free ? 'Free' : app.price ? `$${app.price}` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

