// app/settings/page.tsx - AppCortex Settings & Preferences

// Complete user settings with profile, account, notifications, API keys, billing, and integrations

'use client';

import { useState } from 'react';
import Link from 'next/link';

type SettingsTab = 'profile' | 'account' | 'notifications' | 'api' | 'billing' | 'integrations';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data - replace with API
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '',
    company: 'TechCorp',
    role: 'Product Manager',
    timezone: 'America/Los_Angeles',
    language: 'en',
    plan: 'Pro',
    trackedApps: 12,
    apiCallsUsed: 8432,
    apiCallsLimit: 10000,
  };

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_xxxxxxxxxxxxxxxxxxxx',
      created: '2024-11-15',
      lastUsed: '2024-12-06',
      calls: 8432,
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_test_xxxxxxxxxxxxxxxxxxxx',
      created: '2024-10-01',
      lastUsed: '2024-12-05',
      calls: 1234,
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'api', label: 'API Keys', icon: '🔑' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-l-4 border-cyan-600'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Profile Information</h2>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white mr-2">
                        Change Photo
                      </button>
                      <button className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue={user.company}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Role
                      </label>
                      <input
                        type="text"
                        defaultValue={user.role}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Preferences</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Timezone
                      </label>
                      <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white">
                        <option>America/Los_Angeles (PST)</option>
                        <option>America/New_York (EST)</option>
                        <option>Europe/London (GMT)</option>
                        <option>Asia/Tokyo (JST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Language
                      </label>
                      <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* Password */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Change Password</h2>
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-2 dark:text-white">Two-Factor Authentication</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Add an extra layer of security to your account
                  </p>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-medium dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Not enabled</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">
                      Enable
                    </button>
                  </div>
                </div>

                {/* Connected Accounts */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Connected Accounts</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">Google</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Connected</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white">
                        Disconnect
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" className="text-white dark:text-slate-900">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">GitHub</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Not connected</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all text-sm">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                  <h2 className="text-xl font-bold mb-2 text-red-900 dark:text-red-400">Danger Zone</h2>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Irreversible and destructive actions
                  </p>
                  
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="font-semibold mb-4 dark:text-white">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium dark:text-white">Alert Notifications</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Receive emails when alerts are triggered</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300" />
                      </label>
                      <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium dark:text-white">Weekly Digest</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Summary of your tracked apps performance</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300" />
                      </label>
                      <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium dark:text-white">Report Ready</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when reports are generated</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300" />
                      </label>
                      <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium dark:text-white">Marketing Emails</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Product updates and tips</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300" />
                      </label>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="font-semibold mb-4 dark:text-white">Push Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium dark:text-white">Browser Notifications</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Get desktop notifications</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300" />
                      </label>
                      <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                        <div>
                          <p className="font-medium dark:text-white">Mobile Push</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Notifications on mobile app</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold dark:text-white">API Keys</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Manage your API keys for programmatic access
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAPIKeyModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
                    >
                      Create New Key
                    </button>
                  </div>

                  {/* Usage Stats */}
                  <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">API Usage this month</span>
                      <span className="text-sm font-semibold dark:text-white">
                        {user.apiCallsUsed.toLocaleString()} / {user.apiCallsLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${(user.apiCallsUsed / user.apiCallsLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* API Keys List */}
                  <div className="space-y-4">
                    {apiKeys.map((key) => (
                      <div key={key.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold dark:text-white">{key.name}</h3>
                            <p className="text-sm font-mono text-slate-600 dark:text-slate-400 mt-1">{key.key}</p>
                          </div>
                          <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                          <span>Created: {new Date(key.created).toLocaleDateString()}</span>
                          <span>Last used: {new Date(key.lastUsed).toLocaleDateString()}</span>
                          <span>Calls: {key.calls.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-400">API Documentation</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    Learn how to integrate AppCortex API into your applications
                  </p>
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    View Documentation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Current Plan</h2>
                  
                  <div className="flex items-center justify-between p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border-2 border-cyan-200 dark:border-cyan-800">
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-900 dark:text-cyan-400">{user.plan} Plan</h3>
                      <p className="text-slate-700 dark:text-slate-300 mt-1">$149/month • Renews Jan 1, 2025</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {user.trackedApps} apps tracked • {user.apiCallsLimit.toLocaleString()} API calls/month
                      </p>
                    </div>
                    <Link
                      href="/pricing"
                      className="px-6 py-3 bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 rounded-lg font-semibold hover:bg-cyan-50 dark:hover:bg-slate-700 transition-colors border border-cyan-200 dark:border-cyan-700"
                    >
                      Change Plan
                    </Link>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Payment Method</h2>
                  
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 dark:bg-white rounded flex items-center justify-center text-xs font-bold text-white dark:text-slate-900">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Expires 12/2025</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white">
                      Update
                    </button>
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Billing History</h2>
                  
                  <div className="space-y-3">
                    {[
                      { date: '2024-12-01', amount: '$149.00', status: 'Paid', invoice: '#INV-001' },
                      { date: '2024-11-01', amount: '$149.00', status: 'Paid', invoice: '#INV-002' },
                      { date: '2024-10-01', amount: '$149.00', status: 'Paid', invoice: '#INV-003' },
                    ].map((payment, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium dark:text-white">{payment.amount}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{payment.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                            {payment.status}
                          </span>
                          <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Integrations</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Slack */}
                  <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">#</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                        Connected
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 dark:text-white">Slack</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Get alert notifications in your Slack workspace
                    </p>
                    <button className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white">
                      Configure
                    </button>
                  </div>

                  {/* Webhook */}
                  <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-full text-xs font-medium">
                        Not configured
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 dark:text-white">Webhooks</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Send real-time data to your custom endpoints
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all text-sm">
                      Set Up
                    </button>
                  </div>

                  {/* Zapier */}
                  <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-full text-xs font-medium">
                        Not configured
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 dark:text-white">Zapier</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Connect with 3,000+ apps through Zapier
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all text-sm">
                      Connect
                    </button>
                  </div>

                  {/* Discord */}
                  <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-full text-xs font-medium">
                        Not configured
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 dark:text-white">Discord</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Get notifications in your Discord server
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all text-sm">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Delete Account</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Are you sure you want to delete your account? This action cannot be undone. All your data, tracked apps, alerts, and reports will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white font-semibold"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

