export default function MyAlertsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">🔔</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Alerts</h1>
        <p className="text-gray-600 mb-8">
          Set up alerts for apps you're tracking.
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            This feature requires user authentication. Please sign in to create and manage alerts.
          </p>
        </div>
      </div>
    </div>
  );
}

