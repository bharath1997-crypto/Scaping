export default function TopDevelopersByRatingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/developers" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Developers
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Developers by Rating</h1>
        <p className="text-gray-600">Developers with the highest average ratings</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600 mb-8">
          This feature requires backend API aggregation. Coming soon!
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            Top developers by rating will show developers sorted by their average app ratings.
          </p>
        </div>
      </div>
    </div>
  );
}
