export default function WhyAppCortexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Why AppCortex?</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The MoneyControl for App Markets - Track, analyze, and understand app performance across multiple stores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Developers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-4">👨‍💻</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">For Developers</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Track your app's performance</li>
            <li>• Compare with competitors</li>
            <li>• Understand user sentiment</li>
            <li>• Monitor rankings & ratings</li>
          </ul>
        </div>

        {/* Investors */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-4">💰</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">For Investors</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Identify growing categories</li>
            <li>• Find top gainers & trends</li>
            <li>• Analyze market opportunities</li>
            <li>• Track app momentum</li>
          </ul>
        </div>

        {/* Marketers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">For Marketers</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Monitor competitor performance</li>
            <li>• Track campaign effectiveness</li>
            <li>• Analyze review sentiment</li>
            <li>• Country & category insights</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <a
          href="/apps"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore Apps
        </a>
      </div>
    </div>
  );
}
