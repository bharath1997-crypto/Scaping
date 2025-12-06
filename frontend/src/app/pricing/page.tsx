export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
        <p className="text-xl text-gray-600">Choose the plan that works for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
          <div className="text-4xl font-bold text-gray-900 mb-4">$0<span className="text-lg text-gray-600">/month</span></div>
          <ul className="space-y-3 mb-6">
            <li className="text-gray-600">✓ Browse apps</li>
            <li className="text-gray-600">✓ View basic analytics</li>
            <li className="text-gray-600">✓ Search & filters</li>
          </ul>
          <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-blue-600 text-white rounded-lg p-8 transform scale-105">
          <div className="text-sm font-medium mb-2">POPULAR</div>
          <h2 className="text-2xl font-bold mb-2">Pro</h2>
          <div className="text-4xl font-bold mb-4">$29<span className="text-lg opacity-80">/month</span></div>
          <ul className="space-y-3 mb-6">
            <li>✓ Everything in Free</li>
            <li>✓ Advanced analytics</li>
            <li>✓ Export data</li>
            <li>✓ Alerts & notifications</li>
          </ul>
          <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h2>
          <div className="text-4xl font-bold text-gray-900 mb-4">Custom</div>
          <ul className="space-y-3 mb-6">
            <li className="text-gray-600">✓ Everything in Pro</li>
            <li className="text-gray-600">✓ API access</li>
            <li className="text-gray-600">✓ Custom reports</li>
            <li className="text-gray-600">✓ Priority support</li>
          </ul>
          <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
