import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 6, 2024";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-cyan-50 mb-2">
            Your privacy is important to us
          </p>
          <p className="text-cyan-100">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            AppCortex Inc. ("we," "us," or "our") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you use our website and services (collectively, the "Services").
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Please read this privacy policy carefully. If you do not agree with the terms of 
            this privacy policy, please do not access the Services.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="mb-12 bg-slate-100 dark:bg-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Table of Contents</h2>
          <ol className="space-y-2 text-slate-700 dark:text-slate-300">
            <li><a href="#collection" className="hover:text-cyan-500">1. Information We Collect</a></li>
            <li><a href="#usage" className="hover:text-cyan-500">2. How We Use Your Information</a></li>
            <li><a href="#sharing" className="hover:text-cyan-500">3. How We Share Your Information</a></li>
            <li><a href="#cookies" className="hover:text-cyan-500">4. Cookies and Tracking Technologies</a></li>
            <li><a href="#security" className="hover:text-cyan-500">5. Data Security</a></li>
            <li><a href="#retention" className="hover:text-cyan-500">6. Data Retention</a></li>
            <li><a href="#rights" className="hover:text-cyan-500">7. Your Privacy Rights</a></li>
            <li><a href="#international" className="hover:text-cyan-500">8. International Data Transfers</a></li>
            <li><a href="#children" className="hover:text-cyan-500">9. Children's Privacy</a></li>
            <li><a href="#updates" className="hover:text-cyan-500">10. Changes to This Policy</a></li>
            <li><a href="#contact" className="hover:text-cyan-500">11. Contact Us</a></li>
          </ol>
        </section>

        {/* 1. Information We Collect */}
        <section id="collection" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            1.1 Information You Provide
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We collect information that you voluntarily provide when using our Services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li><strong>Account Information:</strong> Name, email address, password, company name</li>
            <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely by our payment provider)</li>
            <li><strong>Profile Information:</strong> Profile photo, bio, preferences, settings</li>
            <li><strong>Communications:</strong> Messages, support requests, feedback, survey responses</li>
            <li><strong>App Data:</strong> Apps you track, search queries, saved reports, custom dashboards</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            1.2 Information Collected Automatically
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            When you access our Services, we automatically collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong>Usage Data:</strong> Pages viewed, features used, time spent, click patterns, search queries</li>
            <li><strong>Location Data:</strong> Approximate location based on IP address</li>
            <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies (see Section 4)</li>
            <li><strong>Log Data:</strong> Server logs, error reports, API calls, timestamps</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            1.3 Information from Third Parties
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We may receive information from:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li><strong>Social Login Providers:</strong> Google, GitHub (if you use social authentication)</li>
            <li><strong>Payment Processors:</strong> Stripe (payment confirmation, subscription status)</li>
            <li><strong>Analytics Providers:</strong> Google Analytics, Mixpanel (aggregated usage data)</li>
            <li><strong>App Stores:</strong> Public app data from Google Play, Apple App Store, etc.</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section id="usage" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">2. How We Use Your Information</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-400">
            <li><strong>Provide Services:</strong> Create and manage your account, process transactions, deliver requested features</li>
            <li><strong>Improve Services:</strong> Analyze usage patterns, develop new features, fix bugs, enhance user experience</li>
            <li><strong>Communicate:</strong> Send service updates, respond to inquiries, provide customer support</li>
            <li><strong>Marketing:</strong> Send newsletters, product announcements (you can opt-out anytime)</li>
            <li><strong>Security:</strong> Detect fraud, prevent abuse, protect against security threats</li>
            <li><strong>Legal Compliance:</strong> Comply with legal obligations, enforce our terms, resolve disputes</li>
            <li><strong>Analytics:</strong> Generate aggregated, non-identifying statistics about usage and performance</li>
            <li><strong>Personalization:</strong> Customize your experience, remember your preferences</li>
          </ul>
        </section>

        {/* 3. How We Share Your Information */}
        <section id="sharing" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">3. How We Share Your Information</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We do not sell your personal information. We may share your information in the following circumstances:
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">Service Providers</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We share information with third-party vendors who help us operate our Services:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Cloud hosting (AWS, Google Cloud)</li>
                <li>Payment processing (Stripe)</li>
                <li>Email services (SendGrid, Mailchimp)</li>
                <li>Analytics (Google Analytics, Mixpanel)</li>
                <li>Customer support (Intercom, Zendesk)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">Legal Requirements</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We may disclose information if required by law or to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Comply with legal process (subpoena, court order)</li>
                <li>Enforce our Terms of Service</li>
                <li>Protect rights, property, or safety of AppCortex, users, or public</li>
                <li>Investigate fraud or security issues</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">Business Transfers</h3>
              <p className="text-slate-600 dark:text-slate-400">
                If AppCortex is involved in a merger, acquisition, or sale of assets, your information may be transferred. 
                We will notify you via email and/or prominent notice on our website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">With Your Consent</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We may share information for any other purpose with your explicit consent.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Cookies and Tracking */}
        <section id="cookies" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">4. Cookies and Tracking Technologies</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We use cookies and similar technologies to collect information and improve our Services.
          </p>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Types of Cookies We Use</h3>
          <ul className="space-y-4 mb-6">
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Essential Cookies:</strong>
              <p className="text-slate-600 dark:text-slate-400">Required for the Services to function (authentication, security)</p>
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Preference Cookies:</strong>
              <p className="text-slate-600 dark:text-slate-400">Remember your settings (language, theme, dashboard layout)</p>
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Analytics Cookies:</strong>
              <p className="text-slate-600 dark:text-slate-400">Help us understand how you use our Services (Google Analytics)</p>
            </li>
            <li>
              <strong className="text-slate-700 dark:text-slate-300">Marketing Cookies:</strong>
              <p className="text-slate-600 dark:text-slate-400">Track effectiveness of advertising campaigns</p>
            </li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Cookie Control</h4>
            <p className="text-blue-800 dark:text-blue-400 text-sm mb-3">
              You can control cookies through your browser settings. Note that disabling cookies may limit functionality.
            </p>
            <Link 
              href="/legal/cookies" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Learn more about our Cookie Policy →
            </Link>
          </div>
        </section>

        {/* 5. Data Security */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">5. Data Security</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We implement industry-standard security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li><strong>Encryption:</strong> All data transmitted via HTTPS/TLS. Passwords hashed with bcrypt.</li>
            <li><strong>Access Controls:</strong> Limited employee access on need-to-know basis. Two-factor authentication.</li>
            <li><strong>Infrastructure:</strong> Hosted on secure cloud providers (AWS, Google Cloud) with regular security audits.</li>
            <li><strong>Monitoring:</strong> 24/7 system monitoring, intrusion detection, automated alerts.</li>
            <li><strong>Regular Updates:</strong> Prompt security patches, vulnerability scanning, penetration testing.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 italic">
            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        {/* 6. Data Retention */}
        <section id="retention" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">6. Data Retention</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We retain your information for as long as necessary to provide Services and comply with legal obligations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li><strong>Active Accounts:</strong> Retained while your account is active</li>
            <li><strong>Deleted Accounts:</strong> Most data deleted within 30 days (some data retained for legal/security purposes)</li>
            <li><strong>Transaction Records:</strong> Retained for 7 years (tax/accounting requirements)</li>
            <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
            <li><strong>Legal Holds:</strong> Data may be retained longer if required by law or litigation</li>
          </ul>
        </section>

        {/* 7. Your Privacy Rights */}
        <section id="rights" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">7. Your Privacy Rights</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Depending on your location, you may have the following rights:
          </p>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">GDPR Rights (EU Users)</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Restriction:</strong> Limit how we process your data</li>
            <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">CCPA Rights (California Users)</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li><strong>Know:</strong> What personal information we collect and how we use it</li>
            <li><strong>Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-Out:</strong> Opt-out of sale of personal information (we don't sell data)</li>
            <li><strong>Non-Discrimination:</strong> Equal service regardless of privacy requests</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">How to Exercise Your Rights</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:privacy@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              privacy@appcortex.com
            </a>
            {' '}or use our{' '}
            <Link href="/privacy-request" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              Privacy Request Form
            </Link>.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            We will respond within 30 days. We may need to verify your identity before processing requests.
          </p>
        </section>

        {/* 8. International Data Transfers */}
        <section id="international" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">8. International Data Transfers</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            AppCortex is based in the United States. If you access our Services from outside the US, 
            your information may be transferred to, stored, and processed in the US or other countries.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            We comply with applicable data protection laws and use Standard Contractual Clauses (SCCs) 
            approved by the European Commission for transfers from the EU/EEA.
          </p>
        </section>

        {/* 9. Children's Privacy */}
        <section id="children" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">9. Children's Privacy</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Our Services are not intended for children under 16. We do not knowingly collect personal 
            information from children under 16.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            If you believe we have collected information from a child under 16, please contact us 
            immediately at{' '}
            <a href="mailto:privacy@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              privacy@appcortex.com
            </a>
            {' '}and we will delete it promptly.
          </p>
        </section>

        {/* 10. Changes to This Policy */}
        <section id="updates" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">10. Changes to This Policy</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We may update this Privacy Policy from time to time. Changes will be posted on this page 
            with an updated "Last Updated" date.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            For material changes, we will notify you via:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-400 mb-4">
            <li>Email notification to your registered email address</li>
            <li>Prominent notice on our website</li>
            <li>In-app notification</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400">
            Your continued use of the Services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* 11. Contact Us */}
        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">11. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
            <div className="space-y-3">
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Email:</strong>
                <a href="mailto:privacy@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline ml-2">
                  privacy@appcortex.com
                </a>
              </div>
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Mail:</strong>
                <address className="text-slate-600 dark:text-slate-400 ml-2 not-italic">
                  AppCortex Inc.<br />
                  Attn: Privacy Team<br />
                  123 Tech Boulevard<br />
                  San Francisco, CA 94105<br />
                  United States
                </address>
              </div>
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Data Protection Officer:</strong>
                <a href="mailto:dpo@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline ml-2">
                  dpo@appcortex.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Have more questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
