export default function CompareDevelopersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/developers" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Developers
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Developers</h1>
        <p className="text-gray-600">Side-by-side developer comparison</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Developer Comparison Tool</h2>
        <p className="text-gray-600 mb-8">
          Compare multiple developers side-by-side. This feature requires backend API integration.
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            Compare developers by app count, average ratings, total downloads, and other metrics.
            Coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
