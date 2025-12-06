const stores = [
  {
    name: 'Google Play',
    code: 'GOOGLE_PLAY',
    icon: '📱',
    description: 'Android app store with millions of apps',
    color: 'green',
  },
  {
    name: 'Apple App Store',
    code: 'APPLE_APP_STORE',
    icon: '🍎',
    description: 'iOS app store for iPhone and iPad',
    color: 'gray',
  },
  {
    name: 'Samsung Galaxy Store',
    code: 'SAMSUNG_GALAXY_STORE',
    icon: '📲',
    description: 'Samsung\'s official app store',
    color: 'blue',
  },
  {
    name: 'Huawei App Gallery',
    code: 'HUAWEI_APP_GALLERY',
    icon: '📱',
    description: 'Huawei\'s app distribution platform',
    color: 'red',
  },
  {
    name: 'Xiaomi Mi Store',
    code: 'XIAOMI_MI_STORE',
    icon: '📱',
    description: 'Xiaomi\'s app marketplace',
    color: 'orange',
  },
];

export default function StoresPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">App Stores</h1>
        <p className="text-gray-600">Explore apps across different app stores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <a
            key={store.code}
            href={`/apps?store=${store.code}`}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <div className="text-4xl mb-4">{store.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h2>
            <p className="text-gray-600 mb-4">{store.description}</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
              Browse Apps →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
