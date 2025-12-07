'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitContactForm } from '@/lib/app-api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: 'general',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrors({ submit: result.message || 'Failed to send message. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-cyan-50 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column - Contact Methods */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Contact Cards */}
            <div className="space-y-4">
              
              {/* Sales */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Sales</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Interested in AppCortex for your team?
                </p>
                <a href="mailto:sales@appcortex.com" className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm font-medium">
                  sales@appcortex.com
                </a>
              </div>

              {/* Support */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Support</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Need help with your account?
                </p>
                <a href="mailto:support@appcortex.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  support@appcortex.com
                </a>
              </div>

              {/* Press */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Press & Media</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Media inquiries and press requests
                </p>
                <a href="mailto:press@appcortex.com" className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium">
                  press@appcortex.com
                </a>
              </div>

              {/* Partnerships */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-colors">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Partnerships</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Explore partnership opportunities
                </p>
                <a href="mailto:partners@appcortex.com" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium">
                  partners@appcortex.com
                </a>
              </div>

            </div>

            {/* Office Info */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold mb-4 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Headquarters
              </h3>
              <address className="text-sm text-slate-600 dark:text-slate-400 not-italic space-y-1">
                <p className="font-medium dark:text-slate-300">AppCortex Inc.</p>
                <p>123 Tech Boulevard</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </address>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <strong className="dark:text-slate-300">Phone:</strong>{' '}
                  <a href="tel:+15551234567" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                    +1 (555) 123-4567
                  </a>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="dark:text-slate-300">Hours:</strong> Mon-Fri, 9am-6pm PST
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold mb-4 dark:text-white">Connect With Us</h3>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com/appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/company/appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://github.com/appcortex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
              
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Send us a message</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitSuccess ? (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-green-900 dark:text-green-300 mb-1">
                        Message sent successfully!
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        We've received your message and will respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-white">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white transition-colors ${
                          errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white transition-colors ${
                          errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company & Subject Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2 dark:text-white">
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white transition-colors"
                        placeholder="Company Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 dark:text-white">
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white transition-colors"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales</option>
                        <option value="support">Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press & Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 dark:text-white">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {formData.message.length} characters (minimum 10)
                    </p>
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                    By submitting this form, you agree to our{' '}
                    <Link href="/legal/privacy" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              )}

            </div>

            {/* Quick Links */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Link 
                href="/faq"
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors text-center"
              >
                <svg className="w-8 h-8 text-cyan-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-sm dark:text-white mb-1">Help Center</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Browse FAQs & guides</p>
              </Link>

              <Link 
                href="/docs"
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-center"
              >
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-semibold text-sm dark:text-white mb-1">Documentation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">API docs & tutorials</p>
              </Link>

              <Link 
                href="/status"
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-colors text-center"
              >
                <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-sm dark:text-white mb-1">System Status</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Check service uptime</p>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
