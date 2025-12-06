export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About AppCortex</h1>
        <p className="text-xl text-gray-600">
          The MoneyControl for App Markets
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            AppCortex aims to democratize app market intelligence by providing developers, investors, 
            and marketers with comprehensive tools to track, analyze, and understand app performance 
            across multiple app stores.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We scrape and aggregate data from major app stores including Google Play, Apple App Store, 
            Samsung Galaxy Store, Huawei App Gallery, and Xiaomi Mi Store. Our platform provides:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Real-time app rankings and ratings</li>
            <li>Comprehensive review analytics</li>
            <li>Historical performance tracking</li>
            <li>Category and country insights</li>
            <li>Developer portfolio analysis</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            AppCortex was born from the need for accessible app market intelligence. While enterprise 
            solutions exist, they're often expensive and out of reach for indie developers and small teams. 
            We believe everyone should have access to the data they need to make informed decisions about 
            their apps and investments.
          </p>
        </section>
      </div>
    </div>
  );
}
