import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AppCortex</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/apps"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Apps
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/countries"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Countries
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
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
            </Link>
            <button className="text-sm text-gray-700 hover:text-primary transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

