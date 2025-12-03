import { Suspense } from 'react';
import { listApps, ListAppsParams } from '@/lib/api';
import AppCard from '@/components/apps/AppCard';
import AppFilters from '@/components/apps/AppFilters';
import Pagination from '@/components/apps/Pagination';

interface SearchParams {
  store?: string;
  country?: string;
  category?: string;
  search?: string;
  q?: string;
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

interface AppsPageProps {
  searchParams: SearchParams;
}

export default async function AppsPage({ searchParams }: AppsPageProps) {
  const params: ListAppsParams = {
    store: searchParams.store,
    country: searchParams.country,
    category: searchParams.category,
    search: searchParams.search || searchParams.q,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    pageSize: searchParams.pageSize ? parseInt(searchParams.pageSize) : 25,
    sortBy: searchParams.sortBy || 'rank',
    sortDir: searchParams.sortDir || 'asc',
  };

  const response = await listApps(params);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">App Explorer</h1>
        <p className="text-gray-600">
          Browse {response.pagination.total.toLocaleString()} apps across all stores
        </p>
      </div>

      {/* Filters */}
      <AppFilters currentParams={searchParams} />

      {/* Results */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing {response.data.length} of {response.pagination.total} apps
          </p>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              className="text-sm border border-gray-300 rounded px-3 py-1"
              defaultValue={params.sortBy}
            >
              <option value="rank">Rank</option>
              <option value="score">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="title">Name</option>
            </select>
          </div>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.data.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        {/* Pagination */}
        {response.pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination pagination={response.pagination} />
          </div>
        )}

        {/* Empty State */}
        {response.data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No apps found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

