// app/alerts/page.tsx - AppCortex Alerts Management
// Create, manage, and track alerts with performance history

'use client';

import { useState } from 'react';
import Link from 'next/link';

type AlertStatus = 'active' | 'paused' | 'triggered' | 'archived';
type AlertMetric = 'downloads' | 'rating' | 'reviews' | 'sentiment' | 'ranking' | 'revenue';
type AlertCondition = 'above' | 'below' | 'changes' | 'increases' | 'decreases';
type AlertFrequency = 'realtime' | 'hourly' | 'daily' | 'weekly';

interface Alert {
  id: string;
  name: string;
  appId: string;
  appName: string;
  appIcon: string;
  metric: AlertMetric;
  condition: AlertCondition;
  threshold: string;
  frequency: AlertFrequency;
  status: AlertStatus;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
  notifications: string[];
}

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Mock data - replace with API
  const alerts: Alert[] = [
    {
      id: '1',
      name: 'Fitness Pro Downloads Surge',
      appId: '1',
      appName: 'Fitness Pro',
      appIcon: '🏃',
      metric: 'downloads',
      condition: 'above',
      threshold: '1,500,000',
      frequency: 'daily',
      status: 'active',
      createdAt: '2024-11-15',
      lastTriggered: '2024-12-05',
      triggerCount: 8,
      notifications: ['email', 'slack'],
    },
    {
      id: '2',
      name: 'Budget Master Rating Drop',
      appId: '2',
      appName: 'Budget Master',
      appIcon: '💰',
      metric: 'rating',
      condition: 'below',
      threshold: '4.5',
      frequency: 'realtime',
      status: 'triggered',
      createdAt: '2024-11-20',
      lastTriggered: '2024-12-06',
      triggerCount: 2,
      notifications: ['email', 'push'],
    },
    {
      id: '3',
      name: 'Photo Editor Sentiment Alert',
      appId: '3',
      appName: 'Photo Editor X',
      appIcon: '📸',
      metric: 'sentiment',
      condition: 'below',
      threshold: '70%',
      frequency: 'hourly',
      status: 'active',
      createdAt: '2024-11-25',
      lastTriggered: '2024-12-04',
      triggerCount: 5,
      notifications: ['email'],
    },
    {
      id: '4',
      name: 'Language Learn Ranking',
      appId: '4',
      appName: 'Language Learn',
      appIcon: '🗣️',
      metric: 'ranking',
      condition: 'changes',
      threshold: '5 positions',
      frequency: 'daily',
      status: 'paused',
      createdAt: '2024-10-10',
      triggerCount: 15,
      notifications: ['email'],
    },
  ];

  const activeAlerts = alerts.filter(a => a.status === 'active' || a.status === 'triggered');
  const archivedAlerts = alerts.filter(a => a.status === 'archived' || a.status === 'paused');

  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'triggered': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400';
      case 'paused': return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
      case 'archived': return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500';
    }
  };

  const getMetricIcon = (metric: AlertMetric) => {
    switch (metric) {
      case 'downloads':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>;
      case 'rating':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>;
      case 'reviews':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>;
      case 'sentiment':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
      case 'ranking':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>;
      case 'revenue':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Alerts</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get notified when your apps hit important thresholds
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Alert
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === 'active'
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Active Alerts
              <span className="ml-2 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-medium">
                {activeAlerts.length}
              </span>
              {activeTab === 'active' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === 'history'
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              History
              {activeTab === 'history' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400"></div>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Alerts</p>
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">{alerts.length}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">{activeAlerts.length}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Triggered Today</p>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">2</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Triggers</p>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">30</p>
          </div>
        </div>

        {/* Active Alerts Tab */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
              >
                <div className="flex items-start justify-between">
                  
                  {/* Left: Alert Info */}
                  <div className="flex items-start gap-4 flex-1">
                    
                    {/* App Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {alert.appIcon}
                    </div>

                    {/* Alert Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg dark:text-white">{alert.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <Link href={`/apps/${alert.appId}`} className="hover:text-cyan-600 dark:hover:text-cyan-400">
                          {alert.appName}
                        </Link>
                      </p>

                      {/* Alert Configuration */}
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          {getMetricIcon(alert.metric)}
                          <span className="text-slate-700 dark:text-slate-300 capitalize">
                            {alert.metric}
                          </span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-700 dark:text-slate-300 capitalize">
                          {alert.condition} {alert.threshold}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-400 capitalize">
                          Check {alert.frequency}
                        </span>
                      </div>

                      {/* Notifications */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Notify via:</span>
                        {alert.notifications.map((notif) => (
                          <span key={notif} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs capitalize dark:text-slate-300">
                            {notif}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right: Stats & Actions */}
                  <div className="flex items-start gap-6">
                    
                    {/* Stats */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                        {alert.triggerCount}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Triggers</p>
                      {alert.lastTriggered && (
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                          Last: {new Date(alert.lastTriggered).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedAlert(alert)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Pause"
                      >
                        <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}

            {/* Empty State */}
            {activeAlerts.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-12 border border-slate-200 dark:border-slate-800 text-center">
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3 className="text-xl font-bold mb-2 dark:text-white">No active alerts</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Create your first alert to get notified about important changes
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Create Alert
                </button>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg dark:text-white">Alert History</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Track when your alerts have been triggered
              </p>
            </div>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <h4 className="font-semibold dark:text-white">Fitness Pro Downloads Surge</h4>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-5">
                    Downloads exceeded 1,500,000 (current: 1,567,234)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold dark:text-white">Create New Alert</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Set up notifications for important app metrics
              </p>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Alert Name */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Alert Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Fitness Pro Downloads Alert"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Select App */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Select App
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white">
                  <option>Choose an app...</option>
                  <option>🏃 Fitness Pro</option>
                  <option>💰 Budget Master</option>
                  <option>📸 Photo Editor X</option>
                  <option>🗣️ Language Learn</option>
                </select>
              </div>

              {/* Metric */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Metric to Monitor
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white">
                  <option>Downloads</option>
                  <option>Rating</option>
                  <option>Reviews Count</option>
                  <option>Sentiment Score</option>
                  <option>Ranking Position</option>
                  <option>Revenue (Pro)</option>
                </select>
              </div>

              {/* Condition & Threshold */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Condition
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white">
                    <option>Goes above</option>
                    <option>Falls below</option>
                    <option>Changes by</option>
                    <option>Increases by</option>
                    <option>Decreases by</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">
                    Threshold
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1000000 or 10%"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Check Frequency
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white">
                  <option>Real-time (instant)</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>

              {/* Notifications */}
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Notification Methods
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                    <span className="text-sm dark:text-slate-300">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-sm dark:text-slate-300">Push Notification</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-sm dark:text-slate-300">Slack</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-sm dark:text-slate-300">Webhook</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Create Alert
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

