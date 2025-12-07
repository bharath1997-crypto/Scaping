'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { listApps } from '@/lib/api';
import Link from 'next/link';

interface SearchBarProps {
  placeholder?: string;
  showSuggestions?: boolean;
  className?: string;
}

export default function SearchBar({ 
  placeholder = 'Search apps...', 
  showSuggestions = true,
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch suggestions as user types
  useEffect(() => {
    if (!showSuggestions || query.length < 2) {
      setSuggestions([]);
      setShowSuggestionsList(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await listApps({
          search: query,
          page: 1,
          pageSize: 5, // Show top 5 suggestions
        });
        setSuggestions(response.data);
        setShowSuggestionsList(response.data.length > 0);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestionsList(false);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, showSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestionsList(false);
    }
  };

  const handleSuggestionClick = (app: any) => {
    const storeUrl = app.store.toLowerCase().replace(/_/g, '-');
    router.push(`/apps/${storeUrl}/${app.appId}`);
    setShowSuggestionsList(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestionsList(true);
            }
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setShowSuggestionsList(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && showSuggestionsList && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <div className="p-2 border-b border-gray-200">
                <p className="text-xs font-medium text-gray-500 px-2">Suggestions</p>
              </div>
              {suggestions.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleSuggestionClick(app)}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    {app.icon && (
                      <img
                        src={app.icon}
                        alt={app.title}
                        className="w-10 h-10 rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{app.title}</p>
                      <p className="text-sm text-gray-600 truncate">{app.developer}</p>
                    </div>
                    <div className="text-right">
                      {app.score && (
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500 text-xs">⭐</span>
                          <span className="text-sm font-medium text-gray-900">{app.score.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              <div className="p-2 border-t border-gray-200">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
                >
                  View all results →
                </Link>
              </div>
            </>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No apps found</p>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
              >
                Search anyway →
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

