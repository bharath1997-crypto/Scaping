export default function MyDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Your personalized app tracking dashboard</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Dashboard</h2>
        <p className="text-gray-600 mb-8">
          Track your saved apps, watchlists, and alerts in one place.
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            This feature requires user authentication. Please sign in to access your personal dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
