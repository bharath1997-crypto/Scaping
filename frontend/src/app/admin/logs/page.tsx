export default function LogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/admin" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Admin
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
        <p className="text-gray-600">View application logs and errors</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg h-96 overflow-auto">
          <div>[2025-12-03 10:00:00] INFO: Server started</div>
          <div>[2025-12-03 10:00:01] INFO: Database connected</div>
          <div>[2025-12-03 10:05:23] INFO: Scraper job completed</div>
          <div className="text-gray-500">...</div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          Log viewing requires backend log aggregation system. Coming soon!
        </p>
      </div>
    </div>
  );
}
