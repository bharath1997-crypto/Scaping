export default function StoreConfigPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/admin" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Admin
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Configuration</h1>
        <p className="text-gray-600">Manage app store settings and configurations</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="space-y-6">
          {['Google Play', 'Apple App Store', 'Samsung', 'Huawei', 'Xiaomi'].map((store) => (
            <div key={store} className="border-b border-gray-200 pb-6 last:border-0">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{store}</h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-5 h-5 text-blue-600" defaultChecked />
                  <span className="text-gray-900">Enabled</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scrape Interval (hours)
                  </label>
                  <input
                    type="number"
                    defaultValue={24}
                    className="w-32 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          Store configuration requires backend API integration. Coming soon!
        </p>
      </div>
    </div>
  );
}

