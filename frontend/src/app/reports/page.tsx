'use client';

import { useState } from 'react';
import Link from 'next/link';

type ReportStatus = 'draft' | 'generating' | 'ready' | 'failed' | 'scheduled';
type ReportFormat = 'pdf' | 'excel' | 'pptx';
type ReportFrequency = 'once' | 'daily' | 'weekly' | 'monthly';

interface Report {
  id: string;
  name: string;
  description: string;
  format: ReportFormat;
  status: ReportStatus;
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  fileSize?: string;
  modules: string[];
  apps: string[];
  frequency: ReportFrequency;
  nextRun?: string;
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'reports' | 'scheduled'>('reports');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - replace with API
  const reports: Report[] = [
    {
      id: '1',
      name: 'Q4 2024 Performance Report',
      description: 'Comprehensive analysis of tracked apps performance in Q4',
      format: 'pdf',
      status: 'ready',
      createdAt: '2024-12-05',
      completedAt: '2024-12-05',
      downloadUrl: '/reports/q4-2024.pdf',
      fileSize: '2.4 MB',
      modules: ['Overview', 'Downloads', 'Reviews', 'Forecasts'],
      apps: ['Fitness Pro', 'Budget Master', 'Photo Editor X'],
      frequency: 'once',
    },
    {
      id: '2',
      name: 'Weekly Insights Summary',
      description: 'AI-generated insights and market trends',
      format: 'excel',
      status: 'ready',
      createdAt: '2024-12-02',
      completedAt: '2024-12-02',
      downloadUrl: '/reports/weekly-insights.xlsx',
      fileSize: '856 KB',
      modules: ['Insights', 'Trends', 'Competitors'],
      apps: ['All tracked apps'],
      frequency: 'weekly',
      nextRun: '2024-12-09',
    },
    {
      id: '3',
      name: 'Fitness Pro Deep Dive',
      description: 'Complete analysis of Fitness Pro app performance',
      format: 'pptx',
      status: 'generating',
      createdAt: '2024-12-06',
      modules: ['Overview', 'Analytics', 'Reviews', 'Forecasts', 'Similar Apps'],
      apps: ['Fitness Pro'],
      frequency: 'once',
    },
    {
      id: '4',
      name: 'Competitor Analysis Report',
      description: 'Monthly competitive intelligence report',
      format: 'pdf',
      status: 'scheduled',
      createdAt: '2024-11-30',
      modules: ['Competitor Activity', 'Market Share', 'Feature Comparison'],
      apps: ['Budget Master', 'Money Manager', 'Finance Plus'],
      frequency: 'monthly',
      nextRun: '2024-12-30',
    },
  ];

  const regularReports = reports.filter(r => r.frequency === 'once');
  const scheduledReports = reports.filter(r => r.frequency !== 'once');

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'ready': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'generating': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'failed': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'scheduled': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
      case 'draft': return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
    }
  };

  const getFormatIcon = (format: ReportFormat) => {
    switch (format) {
      case 'pdf':
        return <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>;
      case 'excel':
        return <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>;
      case 'pptx':
        return <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
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
              <h1 className="text-2xl font-bold dark:text-white">Reports</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate and manage custom reports for your apps
              </p>
            </div>

            <Link
              href="/reports/generate"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Generate Report
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === 'reports'
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              My Reports
              <span className="ml-2 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-medium">
                {regularReports.length}
              </span>
              {activeTab === 'reports' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === 'scheduled'
                  ? 'text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Scheduled Reports
              <span className="ml-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
                {scheduledReports.length}
              </span>
              {activeTab === 'scheduled' && (
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
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Reports</p>
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">{reports.length}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Ready</p>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {reports.filter(r => r.status === 'ready').length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Generating</p>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">
              {reports.filter(r => r.status === 'generating').length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Scheduled</p>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold dark:text-white">{scheduledReports.length}</p>
          </div>
        </div>

        {/* My Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {regularReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all"
              >
                <div className="flex items-start justify-between">
                  
                  {/* Left: Report Info */}
                  <div className="flex items-start gap-4 flex-1">
                    
                    {/* Format Icon */}
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getFormatIcon(report.format)}
                    </div>

                    {/* Report Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg dark:text-white">{report.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status === 'generating' && (
                            <svg className="w-3 h-3 inline mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          )}
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium uppercase dark:text-slate-300">
                          {report.format}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {report.description}
                      </p>

                      {/* Modules */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Modules:</span>
                        {report.modules.map((module) => (
                          <span key={module} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs dark:text-slate-300">
                            {module}
                          </span>
                        ))}
                      </div>

                      {/* Apps */}
                      <div className="flex items-center gap-2 text-xs">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-600 dark:text-slate-400">
                          {report.apps.join(', ')}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right: Stats & Actions */}
                  <div className="flex items-start gap-6">
                    
                    {/* Stats */}
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created</p>
                      <p className="text-sm font-medium dark:text-white">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                      {report.fileSize && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          {report.fileSize}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {report.status === 'ready' && report.downloadUrl && (
                        <a
                          href={report.downloadUrl}
                          download
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all text-sm font-semibold flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </a>
                      )}
                      <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </button>
                      <button className="px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}

            {/* Empty State */}
            {regularReports.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-12 border border-slate-200 dark:border-slate-800 text-center">
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold mb-2 dark:text-white">No reports yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Generate your first report to analyze your app data
                </p>
                <Link
                  href="/reports/generate"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Generate Report
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Scheduled Reports Tab */}
        {activeTab === 'scheduled' && (
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
              >
                <div className="flex items-start justify-between">
                  
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg dark:text-white">{report.name}</h3>
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium capitalize">
                          {report.frequency}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium uppercase dark:text-slate-300">
                          {report.format}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {report.description}
                      </p>

                      {report.nextRun && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">
                            Next run: {new Date(report.nextRun).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white">
                      Edit Schedule
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white">
                      Pause
                    </button>
                  </div>

                </div>
              </div>
            ))}

            {scheduledReports.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-12 border border-slate-200 dark:border-slate-800 text-center">
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-bold mb-2 dark:text-white">No scheduled reports</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Set up recurring reports to automate your analysis
                </p>
                <Link
                  href="/reports/generate"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Schedule Report
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

