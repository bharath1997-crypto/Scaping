'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface AppFiltersProps {
  currentParams: Record<string, string | undefined>;
}

export default function AppFilters({ currentParams }: AppFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(currentParams.search || currentParams.q || '');

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to page 1 when filters change
    router.push(`/apps?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams('search', searchQuery || null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Store Filter */}
          <div>
            <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-1">
              Store
            </label>
            <select
              id="store"
              value={currentParams.store || ''}
              onChange={(e) => updateParams('store', e.target.value || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Stores</option>
              <option value="GOOGLE_PLAY">Google Play</option>
              <option value="APPLE_APP_STORE">Apple App Store</option>
              <option value="SAMSUNG_GALAXY_STORE">Samsung</option>
              <option value="HUAWEI_APP_GALLERY">Huawei</option>
              <option value="XIAOMI_MI_STORE">Xiaomi</option>
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              value={currentParams.country || ''}
              onChange={(e) => updateParams('country', e.target.value || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Countries</option>
              <option value="us">United States</option>
              <option value="in">India</option>
              <option value="gb">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={currentParams.category || ''}
              onChange={(e) => updateParams('category', e.target.value || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="GAME">Games</option>
              <option value="BUSINESS">Business</option>
              <option value="EDUCATION">Education</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="FINANCE">Finance</option>
              <option value="HEALTH_AND_FITNESS">Health & Fitness</option>
              <option value="PRODUCTIVITY">Productivity</option>
              <option value="SOCIAL">Social</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(currentParams.store || currentParams.country || currentParams.category || currentParams.search) && (
          <div>
            <button
              type="button"
              onClick={() => router.push('/apps')}
              className="text-sm text-primary hover:text-primary-dark"
            >
              Clear all filters
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

