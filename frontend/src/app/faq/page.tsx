export default function FAQPage() {
  const faqs = [
    {
      question: 'What is AppCortex?',
      answer: 'AppCortex is a platform for tracking and analyzing app performance across multiple app stores, similar to MoneyControl for stock markets but focused on app markets.',
    },
    {
      question: 'Which app stores do you support?',
      answer: 'We currently support Google Play Store and Apple App Store, with Samsung Galaxy Store, Huawei App Gallery, and Xiaomi Mi Store coming soon.',
    },
    {
      question: 'How often is the data updated?',
      answer: 'Our data is updated daily through automated scraping processes. Rankings and reviews are collected regularly to ensure accurate insights.',
    },
    {
      question: 'Is AppCortex free?',
      answer: 'We offer a free tier with basic features. Premium plans are available for advanced analytics, exports, and alerts.',
    },
    {
      question: 'Can I track my own app?',
      answer: 'Yes! You can search for any app and track its performance, rankings, reviews, and ratings over time.',
    },
    {
      question: 'How do you collect the data?',
      answer: 'We use automated scraping tools to collect publicly available data from app stores, ensuring compliance with store terms of service.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about AppCortex.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-4">Still have questions?</p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
