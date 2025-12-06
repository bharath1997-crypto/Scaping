export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal</h1>
        <p className="text-xl text-gray-600">
          Terms of Service and Privacy Policy
        </p>
      </div>

      <div className="space-y-8">
        {/* Terms of Service */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>
          <div className="prose prose-sm text-gray-700 space-y-4">
            <p>
              By using AppCortex, you agree to these terms of service. Please read them carefully.
            </p>
            <section>
              <h3 className="font-bold text-gray-900">1. Use of Service</h3>
              <p>
                AppCortex provides app market intelligence data for informational purposes. 
                You may use our service to track and analyze app performance.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-gray-900">2. Data Accuracy</h3>
              <p>
                While we strive for accuracy, we cannot guarantee that all data is 100% accurate 
                or up-to-date. Data is collected from public sources and may contain errors.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-gray-900">3. Intellectual Property</h3>
              <p>
                All content on AppCortex is protected by copyright. You may not reproduce, 
                distribute, or create derivative works without permission.
              </p>
            </section>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
          <div className="prose prose-sm text-gray-700 space-y-4">
            <p>
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <section>
              <h3 className="font-bold text-gray-900">1. Information We Collect</h3>
              <p>
                We collect information you provide when using our service, including account information 
                and usage data.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-gray-900">2. How We Use Information</h3>
              <p>
                We use collected information to provide and improve our services, analyze usage patterns, 
                and communicate with you.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-gray-900">3. Data Security</h3>
              <p>
                We implement security measures to protect your information, but no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
