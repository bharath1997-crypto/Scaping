export default function DbStatsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/admin" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Admin
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Statistics</h1>
        <p className="text-gray-600">View database metrics and counts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Total Apps</p>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Raw Snapshots</p>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Reviews</p>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Rankings</p>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          Database stats require backend API integration. Use <code className="bg-white px-2 py-1 rounded">ts-node src/scripts/checkDatabase.ts</code> or create API endpoint.
        </p>
      </div>
    </div>
  );
}
