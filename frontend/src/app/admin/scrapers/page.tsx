export default function ScrapersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/admin" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Admin
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scraper Status</h1>
        <p className="text-gray-600">Monitor scraper health and last run times</p>
      </div>

      <div className="space-y-4">
        {['Google Play', 'Apple App Store', 'Samsung', 'Huawei', 'Xiaomi'].map((store) => (
          <div key={store} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{store}</h2>
                <p className="text-sm text-gray-600">Last run: —</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          Scraper status requires backend API integration with RawScrapeEvent table. Coming soon!
        </p>
      </div>
    </div>
  );
}
