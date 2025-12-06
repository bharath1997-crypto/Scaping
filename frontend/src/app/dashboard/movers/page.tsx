export default function MoversPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Movers</h1>
        <p className="text-gray-600">Apps with the biggest rank changes today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Top Gainers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-green-600 mr-2">🔺</span>
            Top Gainers
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-900">#{i}</span>
                  <div>
                    <p className="font-medium text-gray-900">App Name {i}</p>
                    <p className="text-sm text-gray-600">Category</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">+{i * 5}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-red-600 mr-2">🔻</span>
            Top Losers
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-900">#{i}</span>
                  <div>
                    <p className="font-medium text-gray-900">App Name {i}</p>
                    <p className="text-sm text-gray-600">Category</p>
                  </div>
                </div>
                <span className="text-red-600 font-bold">-{i * 3}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-4">
          This feature requires backend API for ranking history. Coming soon!
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
