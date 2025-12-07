'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscribeError('');

    try {
      // TODO: Replace with actual newsletter API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscribeSuccess(true);
        setEmail('');
        setTimeout(() => setSubscribeSuccess(false), 5000);
      } else {
        setSubscribeError('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setSubscribeError('Network error. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">AppCortex</span>
            </Link>
            
            <p className="text-slate-400 mb-6 max-w-sm">
              The AI-powered app intelligence platform built for developers. Track, analyze, 
              and predict app performance across 6 major app stores.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              
              {subscribeSuccess ? (
                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Thanks for subscribing!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-500"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                      {isSubscribing ? '...' : 'Subscribe'}
                    </button>
                  </div>
                  {subscribeError && (
                    <p className="text-red-400 text-sm">{subscribeError}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    Get updates on new features and industry insights
                  </p>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com/appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/company/appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://github.com/appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/idea-analyzer" className="hover:text-cyan-400 transition-colors">
                  App Idea Analyzer
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-cyan-400 transition-colors">
                  App Stores
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-cyan-400 transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-cyan-400 transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-cyan-400 transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/why" className="hover:text-cyan-400 transition-colors">
                  Why AppCortex
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-cyan-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-cyan-400 transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-cyan-400 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="hover:text-cyan-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-cyan-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-cyan-400 transition-colors">
                  Guides & Tutorials
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-cyan-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-cyan-400 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-cyan-400 transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-cyan-400 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © {currentYear} AppCortex. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/legal/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/legal/acceptable-use" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Acceptable Use
              </Link>
              <Link href="/legal/dmca" className="text-slate-400 hover:text-cyan-400 transition-colors">
                DMCA
              </Link>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Built with ❤️ for developers</span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
