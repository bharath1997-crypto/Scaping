import { listApps } from '@/lib/api';
import { notFound } from 'next/navigation';
import AppCard from '@/components/apps/AppCard';

interface StorePageProps {
  params: {
    store: string;
  };
}

const storeNames: Record<string, string> = {
  GOOGLE_PLAY: 'Google Play',
  APPLE_APP_STORE: 'Apple App Store',
  SAMSUNG_GALAXY_STORE: 'Samsung Galaxy Store',
  HUAWEI_APP_GALLERY: 'Huawei App Gallery',
  XIAOMI_MI_STORE: 'Xiaomi Mi Store',
};

export default async function StorePage({ params }: StorePageProps) {
  const storeName = storeNames[params.store.toUpperCase()] || params.store;
  
  if (!storeNames[params.store.toUpperCase()]) {
    notFound();
  }

  const response = await listApps({
    store: params.store.toUpperCase(),
    page: 1,
    pageSize: 24,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/stores" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Stores
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{storeName}</h1>
        <p className="text-gray-600">
          {response.pagination.total.toLocaleString()} apps from {storeName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {response.data.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
