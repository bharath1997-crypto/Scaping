'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecentSearchesPage() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  const clearSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recent Searches</h1>
        <p className="text-gray-600">Your recent search history</p>
      </div>

      {recentSearches.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Search History</h2>
            <button
              onClick={clearSearches}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <Link
                key={index}
                href={`/search?q=${encodeURIComponent(search)}`}
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <p className="text-gray-900">{search}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No recent searches yet.</p>
          <Link
            href="/search"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Searching
          </Link>
        </div>
      )}
    </div>
  );
}
