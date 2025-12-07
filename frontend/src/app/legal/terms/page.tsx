import Link from 'next/link';

export default function TermsOfServicePage() {
  const lastUpdated = "December 6, 2024";
  const effectiveDate = "January 1, 2024";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-50 mb-2">
            Please read these terms carefully before using our services
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-blue-100">
            <span>Last updated: {lastUpdated}</span>
            <span className="hidden sm:inline">•</span>
            <span>Effective: {effectiveDate}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            These Terms of Service ("Terms") govern your access to and use of AppCortex's website, 
            services, and applications (collectively, the "Services") provided by AppCortex Inc. 
            ("AppCortex," "we," "us," or "our").
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <p className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">
              Important: Please Read Carefully
            </p>
            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
              By accessing or using our Services, you agree to be bound by these Terms. 
              If you do not agree to these Terms, you may not access or use the Services.
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="mb-12 bg-slate-100 dark:bg-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Table of Contents</h2>
          <ol className="space-y-2 text-slate-700 dark:text-slate-300">
            <li><a href="#acceptance" className="hover:text-cyan-500">1. Acceptance of Terms</a></li>
            <li><a href="#eligibility" className="hover:text-cyan-500">2. Eligibility</a></li>
            <li><a href="#account" className="hover:text-cyan-500">3. Account Registration</a></li>
            <li><a href="#subscription" className="hover:text-cyan-500">4. Subscription and Payment</a></li>
            <li><a href="#use" className="hover:text-cyan-500">5. Acceptable Use</a></li>
            <li><a href="#content" className="hover:text-cyan-500">6. User Content</a></li>
            <li><a href="#ip" className="hover:text-cyan-500">7. Intellectual Property</a></li>
            <li><a href="#api" className="hover:text-cyan-500">8. API Usage</a></li>
            <li><a href="#prohibited" className="hover:text-cyan-500">9. Prohibited Activities</a></li>
            <li><a href="#termination" className="hover:text-cyan-500">10. Termination</a></li>
            <li><a href="#disclaimers" className="hover:text-cyan-500">11. Disclaimers</a></li>
            <li><a href="#limitation" className="hover:text-cyan-500">12. Limitation of Liability</a></li>
            <li><a href="#indemnification" className="hover:text-cyan-500">13. Indemnification</a></li>
            <li><a href="#dispute" className="hover:text-cyan-500">14. Dispute Resolution</a></li>
            <li><a href="#general" className="hover:text-cyan-500">15. General Provisions</a></li>
            <li><a href="#contact" className="hover:text-cyan-500">16. Contact Information</a></li>
          </ol>
        </section>

        {/* 1. Acceptance of Terms */}
        <section id="acceptance" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            By creating an account, accessing our website, or using any of our Services, you acknowledge 
            that you have read, understood, and agree to be bound by these Terms and our{' '}
            <Link href="/legal/privacy" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              Privacy Policy
            </Link>.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting 
            to our website. Your continued use of the Services after any changes indicates your acceptance 
            of the modified Terms.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section id="eligibility" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">2. Eligibility</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You must meet the following requirements to use our Services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Be at least 16 years of age</li>
            <li>Have the legal capacity to enter into a binding contract</li>
            <li>Not be prohibited from using the Services under applicable laws</li>
            <li>Not have been previously banned or suspended from our Services</li>
            <li>Provide accurate and complete registration information</li>
          </ul>
        </section>

        {/* 3. Account Registration */}
        <section id="account" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">3. Account Registration</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            3.1 Account Creation
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            To access certain features, you must create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>Immediately notify us of any unauthorized access</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            3.2 Account Security
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            You are solely responsible for maintaining the confidentiality of your account credentials. 
            We are not liable for any loss or damage arising from your failure to protect your account.
          </p>
        </section>

        {/* 4. Subscription and Payment */}
        <section id="subscription" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">4. Subscription and Payment</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            4.1 Pricing and Plans
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Current pricing and plan details are available on our{' '}
            <Link href="/pricing" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              Pricing page
            </Link>. 
            We reserve the right to modify pricing at any time. Price changes will be communicated 
            at least 30 days in advance.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            4.2 Billing and Renewals
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li><strong>Free Trial:</strong> 14-day free trial available for new users. No credit card required.</li>
            <li><strong>Billing Cycle:</strong> Subscriptions are billed monthly or annually based on your selection.</li>
            <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless canceled before the renewal date.</li>
            <li><strong>Payment Methods:</strong> We accept major credit cards and other payment methods via Stripe.</li>
            <li><strong>Failed Payments:</strong> If payment fails, we may suspend or terminate your account after notification.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            4.3 Refunds and Cancellation
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We offer a 30-day money-back guarantee for new subscriptions. To request a refund or cancel:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Cancel anytime from your account settings</li>
            <li>Refund requests must be made within 30 days of purchase</li>
            <li>Refunds are prorated for annual plans</li>
            <li>No refunds for monthly plans after 30 days</li>
            <li>You retain access until the end of your billing period</li>
          </ul>
        </section>

        {/* 5. Acceptable Use */}
        <section id="use" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">5. Acceptable Use</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You agree to use our Services only for lawful purposes and in accordance with these Terms. 
            You agree NOT to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon intellectual property rights</li>
            <li>Transmit harmful code (viruses, malware, etc.)</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Services</li>
            <li>Use automated means to access the Services (except our API)</li>
            <li>Resell or redistribute the Services without permission</li>
            <li>Impersonate others or provide false information</li>
          </ul>
        </section>

        {/* 6. User Content */}
        <section id="content" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">6. User Content</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            6.1 Your Content
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You retain all rights to content you submit, upload, or create using our Services ("User Content"). 
            By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li>Use, reproduce, and display your User Content as necessary to provide the Services</li>
            <li>Create backups and perform technical operations</li>
            <li>Improve and develop our Services</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            6.2 Responsibility for Content
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            You are solely responsible for your User Content. You represent and warrant that you own or have 
            the necessary rights to all User Content and that your User Content does not violate any third-party 
            rights or applicable laws.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section id="ip" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">7. Intellectual Property</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            The Services, including all content, features, and functionality, are owned by AppCortex and 
            protected by copyright, trademark, patent, and other intellectual property laws.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Our trademarks, logos, and service marks ("Marks") may not be used without our prior written consent. 
            Nothing in these Terms grants you any right to use our Marks.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access 
            and use the Services for your internal business purposes.
          </p>
        </section>

        {/* 8. API Usage */}
        <section id="api" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">8. API Usage</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you use our API, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
            <li>Comply with rate limits and usage quotas for your plan</li>
            <li>Use API keys securely and not share them publicly</li>
            <li>Not abuse or overload our systems</li>
            <li>Cache data appropriately to reduce API calls</li>
            <li>Provide proper attribution when displaying our data</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400">
            We may suspend or terminate API access for violations of these terms or abuse.
          </p>
        </section>

        {/* 9. Prohibited Activities */}
        <section id="prohibited" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">9. Prohibited Activities</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            The following activities are strictly prohibited:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li><strong>Scraping:</strong> Automated data collection outside of our official API</li>
            <li><strong>Reverse Engineering:</strong> Attempting to derive source code or algorithms</li>
            <li><strong>Competitive Intelligence:</strong> Using our data to build competing products</li>
            <li><strong>Account Sharing:</strong> Sharing login credentials or accounts</li>
            <li><strong>Manipulation:</strong> Attempting to manipulate or game our data</li>
            <li><strong>Spam:</strong> Sending unsolicited messages or bulk communications</li>
            <li><strong>Security Testing:</strong> Penetration testing without written permission</li>
          </ul>
        </section>

        {/* 10. Termination */}
        <section id="termination" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">10. Termination</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            10.1 Termination by You
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You may terminate your account at any time through your account settings. Upon termination, 
            you will lose access to the Services but retain access until the end of your billing period.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            10.2 Termination by Us
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We may suspend or terminate your account immediately if:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li>You violate these Terms</li>
            <li>Payment fails and remains unpaid</li>
            <li>Your use poses security or legal risks</li>
            <li>Required by law or legal process</li>
            <li>We discontinue the Services (with 30 days notice)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            10.3 Effect of Termination
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Upon termination, your right to access the Services ceases immediately. We may delete your data 
            after 30 days. Provisions that should survive termination (payment obligations, disclaimers, 
            limitations of liability) will continue to apply.
          </p>
        </section>

        {/* 11. Disclaimers */}
        <section id="disclaimers" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">11. Disclaimers</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <p className="text-red-900 dark:text-red-300 font-semibold mb-3 uppercase">
              Important Legal Notice
            </p>
            <p className="text-red-800 dark:text-red-400 text-sm">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Specifically, we do not warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>The Services will meet your requirements or expectations</li>
            <li>The Services will be uninterrupted, timely, secure, or error-free</li>
            <li>Results obtained from using the Services will be accurate or reliable</li>
            <li>The quality of data, products, or services will meet your expectations</li>
            <li>Any errors in the Services will be corrected</li>
          </ul>
        </section>

        {/* 12. Limitation of Liability */}
        <section id="limitation" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">12. Limitation of Liability</h2>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-6">
            <p className="text-orange-900 dark:text-orange-300 font-semibold mb-3 uppercase">
              Liability Cap
            </p>
            <p className="text-orange-800 dark:text-orange-400 text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL APPCORTEX BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, 
              DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES.
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Our total liability for any claims arising from or related to these Terms or the Services 
            shall not exceed the greater of:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>The amount you paid us in the 12 months preceding the claim, or</li>
            <li>$100 USD</li>
          </ul>
        </section>

        {/* 13. Indemnification */}
        <section id="indemnification" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">13. Indemnification</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You agree to indemnify, defend, and hold harmless AppCortex, its affiliates, and their respective 
            officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, 
            and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Your access to or use of the Services</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Your User Content</li>
            <li>Any harm caused by your actions or omissions</li>
          </ul>
        </section>

        {/* 14. Dispute Resolution */}
        <section id="dispute" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">14. Dispute Resolution</h2>
          
          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            14.1 Informal Resolution
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Before filing a formal dispute, you agree to contact us at{' '}
            <a href="mailto:legal@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
              legal@appcortex.com
            </a>
            {' '}to seek an informal resolution. We will attempt to resolve the dispute informally within 60 days.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            14.2 Binding Arbitration
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If we cannot resolve the dispute informally, any dispute arising from these Terms or the Services 
            shall be resolved through binding arbitration administered by the American Arbitration Association 
            (AAA) under its Commercial Arbitration Rules.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
            <li>Arbitration will be conducted in San Francisco, California</li>
            <li>The arbitrator's decision is final and binding</li>
            <li>Each party bears its own costs unless otherwise awarded</li>
            <li>No class actions or representative proceedings are permitted</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">
            14.3 Exceptions
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Either party may seek injunctive relief in court for intellectual property infringement or 
            violation of confidentiality obligations.
          </p>
        </section>

        {/* 15. General Provisions */}
        <section id="general" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">15. General Provisions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
                15.1 Governing Law
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                These Terms are governed by the laws of the State of California, USA, without regard to 
                conflict of law principles.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
                15.2 Entire Agreement
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you 
                and AppCortex regarding the Services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
                15.3 Severability
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will 
                continue in full force and effect.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
                15.4 No Waiver
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver 
                of those rights.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
                15.5 Assignment
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                You may not assign or transfer these Terms without our written consent. We may assign these 
                Terms without restriction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
                15.6 Force Majeure
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We are not liable for any failure or delay in performance due to circumstances beyond our 
                reasonable control.
              </p>
            </div>
          </div>
        </section>

        {/* 16. Contact Information */}
        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">16. Contact Information</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            If you have questions about these Terms, please contact us:
          </p>
          
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
            <div className="space-y-3">
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Email:</strong>
                <a href="mailto:legal@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline ml-2">
                  legal@appcortex.com
                </a>
              </div>
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Mail:</strong>
                <address className="text-slate-600 dark:text-slate-400 ml-2 not-italic">
                  AppCortex Inc.<br />
                  Attn: Legal Department<br />
                  123 Tech Boulevard<br />
                  San Francisco, CA 94105<br />
                  United States
                </address>
              </div>
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Phone:</strong>
                <a href="tel:+1-555-123-4567" className="text-cyan-600 dark:text-cyan-400 hover:underline ml-2">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
              Acknowledgment
            </h3>
            <p className="text-blue-800 dark:text-blue-400 text-sm mb-4">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND 
              AGREE TO BE BOUND BY THEM.
            </p>
            <p className="text-blue-800 dark:text-blue-400 text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Questions about our terms? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Contact Legal Team
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Visit Help Center
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
