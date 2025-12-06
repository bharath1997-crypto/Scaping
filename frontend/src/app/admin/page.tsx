export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Internal tools and system management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/scrapers"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
        >
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Scraper Status</h2>
          <p className="text-gray-600">Monitor scraper health and performance</p>
        </a>

        <a
          href="/admin/db-stats"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
        >
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Database Stats</h2>
          <p className="text-gray-600">View database statistics and metrics</p>
        </a>

        <a
          href="/admin/logs"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
        >
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">System Logs</h2>
          <p className="text-gray-600">View application logs and errors</p>
        </a>
      </div>
    </div>
  );
}
