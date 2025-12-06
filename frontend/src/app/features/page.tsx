export default function FeaturesPage() {
  const features = [
    {
      title: 'Multi-Store Tracking',
      description: 'Track apps across Google Play, Apple App Store, Samsung, Huawei, and Xiaomi.',
      icon: '📱',
    },
    {
      title: 'Real-Time Rankings',
      description: 'Monitor app rankings across different charts and categories in real-time.',
      icon: '📈',
    },
    {
      title: 'Review Analytics',
      description: 'Analyze user reviews, sentiment, and rating trends over time.',
      icon: '💬',
    },
    {
      title: 'Category Insights',
      description: 'Explore apps by category and understand market trends.',
      icon: '📂',
    },
    {
      title: 'Country Analysis',
      description: 'Compare app performance across different countries and regions.',
      icon: '🌍',
    },
    {
      title: 'Developer Profiles',
      description: 'Track all apps from a developer and compare their performance.',
      icon: '👨‍💼',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to track and analyze app market performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
