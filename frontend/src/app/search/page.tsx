'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchApps, type SearchApp, type SearchFilters } from '@/lib/app-api';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apps, setApps] = useState<SearchApp[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filters state (using string values for UI, converted to API format)
  const [filters, setFilters] = useState({
    category: 'all',
    stores: [] as string[],
    minDownloads: '',
    maxDownloads: '',
    minRating: '',
    region: 'all',
    dateRange: 'all',
  });

  // Debounced search function
  const performSearch = useCallback(async () => {
    if (!searchQuery.trim() && Object.values(filters).every(v => !v || (Array.isArray(v) && v.length === 0))) {
      setApps([]);
      setTotal(0);
      setTotalPages(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Prepare filters for API
      const apiFilters: SearchFilters = {
        category: filters.category === 'all' ? undefined : filters.category,
        stores: filters.stores.length > 0 ? filters.stores : undefined,
        minDownloads: filters.minDownloads || undefined,
        maxDownloads: filters.maxDownloads || undefined,
        minRating: filters.minRating || undefined,
        region: filters.region === 'all' ? undefined : filters.region,
        dateRange: filters.dateRange === 'all' ? undefined : filters.dateRange,
      };

      const result = await searchApps(searchQuery, apiFilters, page, 20);
      setApps(result.apps);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search apps');
      setApps([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, page]);

  // Search when query or filters change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch();
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [performSearch]);

  // Reset to page 1 when search query or filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  const handleSelectApp = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else if (selectedApps.length < 5) {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const handleStoreToggle = (store: string) => {
    const currentStores = filters.stores || [];
    if (currentStores.includes(store)) {
      setFilters({ ...filters, stores: currentStores.filter(s => s !== store) });
    } else {
      setFilters({ ...filters, stores: [...currentStores, store] });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      stores: [],
      minDownloads: '',
      maxDownloads: '',
      minRating: '',
      region: 'all',
      dateRange: 'all',
    });
    setSearchQuery('');
    setPage(1);
  };

  const handleCompare = () => {
    if (selectedApps.length > 0) {
      router.push(`/apps/compare?apps=${selectedApps.join(',')}`);
    }
  };

  // Mock categories and stores for filter UI
  const categories = [
    {
      id: 1,
      name: 'Fitness Pro',
      developer: 'HealthTech Inc',
      icon: '🏃',
      category: 'Health & Fitness',
      downloads: '1.2M',
      rating: 4.5,
      reviews: 12453,
      store: 'Google Play',
      trend: 'up',
      change: '+12%',
      price: 'Free',
    },
    {
      id: 2,
      name: 'Budget Master',
      developer: 'FinanceApps',
      icon: '💰',
      category: 'Finance',
      downloads: '890K',
      rating: 4.7,
      reviews: 8932,
      store: 'App Store',
      trend: 'up',
      change: '+8%',
      price: '$2.99',
    },
    {
      id: 3,
      name: 'Photo Editor X',
      developer: 'Creative Tools',
      icon: '📸',
      category: 'Photo & Video',
      downloads: '2.4M',
      rating: 4.3,
      reviews: 23411,
      store: 'Google Play',
      trend: 'down',
      change: '-3%',
      price: 'Free',
    },
    {
      id: 4,
      name: 'Language Learn',
      developer: 'EduTech',
      icon: '🗣️',
      category: 'Education',
      downloads: '3.1M',
      rating: 4.8,
      reviews: 45678,
      store: 'Both',
      trend: 'up',
      change: '+24%',
      price: 'Free',
    },
    {
      id: 5,
      name: 'Recipe Finder',
      developer: 'FoodApps',
      icon: '🍳',
      category: 'Food & Drink',
      downloads: '650K',
      rating: 4.2,
      reviews: 5432,
      store: 'App Store',
      trend: 'stable',
      change: '0%',
      price: '$1.99',
    },
    {
      id: 6,
      name: 'Meditation Plus',
      developer: 'Wellness Co',
      icon: '🧘',
      category: 'Health & Fitness',
      downloads: '1.8M',
      rating: 4.6,
      reviews: 19234,
      store: 'Both',
      trend: 'up',
      change: '+15%',
      price: 'Free',
    },
  ];

  const categories = [
    'All Categories',
    'Health & Fitness',
    'Finance',
    'Photo & Video',
    'Education',
    'Food & Drink',
    'Games',
    'Social',
    'Productivity',
    'Entertainment',
  ];

  const stores = ['Google Play', 'App Store', 'Huawei', 'Samsung', 'Xiaomi', 'Amazon'];

  const handleSelectApp = (appId: number) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else if (selectedApps.length < 5) {
      setSelectedApps([...selectedApps, appId]);
    }
  };

  const handleStoreToggle = (store: string) => {
    if (filters.stores.includes(store)) {
      setFilters({ ...filters, stores: filters.stores.filter(s => s !== store) });
    } else {
      setFilters({ ...filters, stores: [...filters.stores, store] });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4">
          
          {/* Title & View Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Search Apps</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Discover and analyze apps across multiple stores
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by app name, developer, or keyword..."
                className="w-full px-4 py-3 pl-12 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white min-w-[160px]"
            >
              <option value="relevance">Most Relevant</option>
              <option value="downloads">Most Downloads</option>
              <option value="rating">Highest Rated</option>
              <option value="trending">Trending</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Comparison Bar */}
          {selectedApps.length > 0 && (
            <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-cyan-900 dark:text-cyan-300">
                  {selectedApps.length} app{selectedApps.length > 1 ? 's' : ''} selected
                </span>
                <span className="text-xs text-cyan-700 dark:text-cyan-400">
                  (max 5 for comparison)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApps([])}
                  className="px-3 py-1.5 text-sm text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded-md transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleCompare}
                  className="px-4 py-1.5 text-sm bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors font-medium"
                >
                  Compare Apps →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-80 flex-shrink-0">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 sticky top-24">
                
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold dark:text-white">Filters</h2>
                  <button 
                    onClick={handleResetFilters}
                    className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                <div className="space-y-6">
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase().replace(/ /g, '-')}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* App Stores */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      App Stores
                    </label>
                    <div className="space-y-2">
                      {stores.map((store) => (
                        <label key={store} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.stores.includes(store)}
                            onChange={() => handleStoreToggle(store)}
                            className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                          />
                          <span className="text-sm dark:text-slate-300">{store}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Downloads Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Downloads
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Min"
                        value={filters.minDownloads}
                        onChange={(e) => setFilters({ ...filters, minDownloads: e.target.value })}
                        className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Max"
                        value={filters.maxDownloads}
                        onChange={(e) => setFilters({ ...filters, maxDownloads: e.target.value })}
                        className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Minimum Rating
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">4.5+ ⭐⭐⭐⭐⭐</option>
                      <option value="4.0">4.0+ ⭐⭐⭐⭐</option>
                      <option value="3.5">3.5+ ⭐⭐⭐</option>
                      <option value="3.0">3.0+ ⭐⭐</option>
                    </select>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Region
                    </label>
                    <select
                      value={filters.region}
                      onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                    >
                      <option value="all">All Regions</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="in">India</option>
                      <option value="cn">China</option>
                      <option value="jp">Japan</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Release Date
                    </label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 3 months</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>

                </div>

                {/* Info Text */}
                <p className="w-full mt-6 px-4 py-2 text-xs text-slate-500 dark:text-slate-400 text-center bg-slate-50 dark:bg-slate-800 rounded-lg">
                  Filters apply automatically as you type
                </p>

              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1">
            
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-slate-600 dark:text-slate-400">Searching apps...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Results Header */}
            {!loading && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Found <span className="font-semibold dark:text-white">{total.toLocaleString()}</span> app{total !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              {apps.length > 0 && (
                <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Results
                </button>
              )}
            </div>
            )}

            {/* Empty State */}
            {!loading && !error && apps.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-bold mb-2 dark:text-white">No apps found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {searchQuery ? `Try adjusting your search or filters` : `Start typing to search for apps`}
                </p>
              </div>
            )}

            {/* Grid View */}
            {!loading && apps.length > 0 && viewMode === 'grid' && (

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className={`bg-white dark:bg-slate-900 rounded-xl p-6 border-2 transition-all hover:shadow-lg cursor-pointer ${
                      selectedApps.includes(app.id)
                        ? 'border-cyan-500 dark:border-cyan-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700'
                    }`}
                  >
                    {/* Selection Checkbox */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
                          {app.icon}
                        </div>
                        <div className="flex-1">
                          <Link href={`/apps/${app.store.toLowerCase().replace(' ', '-')}/${app.id}`} className="font-semibold hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400">
                            {app.name}
                          </Link>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{app.developer}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedApps.includes(app.id)}
                        onChange={() => handleSelectApp(app.id)}
                        className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                        disabled={!selectedApps.includes(app.id) && selectedApps.length >= 5}
                      />
                    </div>

                    {/* Category & Store */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-md dark:text-slate-300">
                        {app.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-md">
                        {app.store}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Downloads</p>
                        <p className="font-semibold dark:text-white">{app.downloads}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Rating</p>
                        <p className="font-semibold dark:text-white">{app.rating} ⭐</p>
                      </div>
                    </div>

                    {/* Trend & Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className={`flex items-center gap-1 text-sm ${
                        app.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                        app.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                        'text-slate-600 dark:text-slate-400'
                      }`}>
                        {app.trend === 'up' && '↑'}
                        {app.trend === 'down' && '↓'}
                        {app.trend === 'stable' && '→'}
                        <span className="font-medium">{app.change}</span>
                      </div>
                      <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                        {app.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {!loading && apps.length > 0 && viewMode === 'table' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">App</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Downloads</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Trend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {apps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedApps.includes(app.id)}
                              onChange={() => handleSelectApp(app.id)}
                              className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                              disabled={!selectedApps.includes(app.id) && selectedApps.length >= 5}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-xl">
                                {app.icon}
                              </div>
                              <div>
                                <Link href={`/apps/${app.store.toLowerCase().replace(' ', '-')}/${app.id}`} className="font-medium hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400">
                                  {app.name}
                                </Link>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{app.developer}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm dark:text-slate-300">{app.category}</td>
                          <td className="px-6 py-4 text-sm font-medium dark:text-white">{app.downloads}</td>
                          <td className="px-6 py-4 text-sm dark:text-white">{app.rating} ⭐</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-medium ${
                              app.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                              app.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                              'text-slate-600 dark:text-slate-400'
                            }`}>
                              {app.trend === 'up' && '↑ '}
                              {app.trend === 'down' && '↓ '}
                              {app.trend === 'stable' && '→ '}
                              {app.change}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-cyan-600 dark:text-cyan-400">{app.price}</td>
                          <td className="px-6 py-4">
                            <Link 
                              href={`/apps/${app.store.toLowerCase().replace(' ', '-')}/${app.id}`}
                              className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Showing <span className="font-medium">{(page - 1) * 20 + 1}-{Math.min(page * 20, total)}</span> of <span className="font-medium">{total.toLocaleString()}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-1.5 rounded-md transition-colors text-sm ${
                            page === pageNum
                              ? 'bg-cyan-600 text-white'
                              : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
