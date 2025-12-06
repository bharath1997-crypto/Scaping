export default function DeveloperWatchlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/developers" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Developers
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Watchlist</h1>
        <p className="text-gray-600">Track developers you're interested in</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">⭐</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Developer Watchlist</h2>
        <p className="text-gray-600 mb-8">
          Save developers to track their apps and performance.
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            This feature requires user authentication. Please sign in to create and manage your developer watchlist.
          </p>
        </div>
      </div>
    </div>
  );
}

