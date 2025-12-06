export default function TopDevelopersByAppsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/developers" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Developers
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Developers by App Count</h1>
        <p className="text-gray-600">Developers with the most apps</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600 mb-8">
          This feature requires backend API aggregation. Coming soon!
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            Top developers ranking will show developers sorted by the number of apps they've published.
          </p>
        </div>
      </div>
    </div>
  );
}
