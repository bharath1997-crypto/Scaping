import { notFound } from 'next/navigation';

interface DeveloperPageProps {
  params: {
    id: string;
  };
}

export default function DeveloperPage({ params }: DeveloperPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/developers" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Developers
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Profile</h1>
        <p className="text-gray-600">Developer ID: {params.id}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">👨‍💼</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Developer Details</h2>
        <p className="text-gray-600 mb-8">
          This feature requires backend API integration to fetch developer information and their apps.
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-700">
            Developer profile pages coming soon. This will show all apps by this developer, 
            their ratings, and performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
