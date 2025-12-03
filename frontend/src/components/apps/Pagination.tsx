'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PaginationInfo } from '@/lib/api';

interface PaginationProps {
  pagination: PaginationInfo;
}

export default function Pagination({ pagination }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/apps?${params.toString()}`;
  };

  const pages = [];
  const totalPages = pagination.totalPages;
  const currentPage = pagination.page;

  // Generate page numbers to show
  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show first page, current page area, and last page
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push(-1); // Ellipsis
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(-1); // Ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(totalPages);
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-2 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === -1) {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-3 py-2 border rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-primary text-white border-primary'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-2 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
}

