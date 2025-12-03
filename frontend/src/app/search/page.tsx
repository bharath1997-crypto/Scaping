import { Suspense } from 'react';
import { listApps } from '@/lib/api';
import AppCard from '@/components/apps/AppCard';
import Pagination from '@/components/apps/Pagination';

interface SearchPageProps {
  searchParams: {
    q?: string;
    search?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || searchParams.search || '';
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Apps</h1>
          <p className="text-gray-600">Enter a search query to find apps.</p>
        </div>
      </div>
    );
  }

  const response = await listApps({
    search: query,
    page,
    pageSize: 25,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-gray-600">
          Found {response.pagination.total.toLocaleString()} apps
        </p>
      </div>

      {/* Results */}
      {response.data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {response.data.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          {response.pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination pagination={response.pagination} />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No apps found for &quot;{query}&quot;.</p>
          <p className="text-sm text-gray-400 mt-2">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}

