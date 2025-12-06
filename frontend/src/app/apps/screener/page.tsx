'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdvancedScreenerPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    minRating: '',
    minReviews: '',
    rankMin: '',
    rankMax: '',
    free: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.minRating) params.set('minRating', filters.minRating);
    if (filters.minReviews) params.set('minReviews', filters.minReviews);
    if (filters.rankMin) params.set('rankMin', filters.rankMin);
    if (filters.rankMax) params.set('rankMax', filters.rankMax);
    if (filters.free) params.set('free', filters.free);
    router.push(`/apps?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced App Screener</h1>
        <p className="text-gray-600">Filter apps with advanced criteria</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <input
                type="number"
                id="minRating"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., 4.0"
              />
            </div>

            <div>
              <label htmlFor="minReviews" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Reviews
              </label>
              <input
                type="number"
                id="minReviews"
                min="0"
                value={filters.minReviews}
                onChange={(e) => setFilters({ ...filters, minReviews: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., 1000"
              />
            </div>

            <div>
              <label htmlFor="rankMin" className="block text-sm font-medium text-gray-700 mb-2">
                Rank Range (Min)
              </label>
              <input
                type="number"
                id="rankMin"
                min="1"
                value={filters.rankMin}
                onChange={(e) => setFilters({ ...filters, rankMin: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., 1"
              />
            </div>

            <div>
              <label htmlFor="rankMax" className="block text-sm font-medium text-gray-700 mb-2">
                Rank Range (Max)
              </label>
              <input
                type="number"
                id="rankMax"
                min="1"
                value={filters.rankMax}
                onChange={(e) => setFilters({ ...filters, rankMax: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., 100"
              />
            </div>

            <div>
              <label htmlFor="free" className="block text-sm font-medium text-gray-700 mb-2">
                Price Type
              </label>
              <select
                id="free"
                value={filters.free}
                onChange={(e) => setFilters({ ...filters, free: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">All</option>
                <option value="true">Free</option>
                <option value="false">Paid</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={() => router.push('/apps')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Advanced screener features require backend API extensions. 
          Basic filters are available in the main App Explorer.
        </p>
      </div>
    </div>
  );
}
