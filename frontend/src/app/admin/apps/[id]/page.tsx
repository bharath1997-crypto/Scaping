import { notFound } from 'next/navigation';

interface AdminAppPageProps {
  params: {
    id: string;
  };
}

export default function AdminAppPage({ params }: AdminAppPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/admin" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Admin
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">App Debug View</h1>
        <p className="text-gray-600">App ID: {params.id}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600 mb-4">Raw app data and debug information</p>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify({ id: params.id, message: 'Debug view requires backend API' }, null, 2)}
        </pre>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm text-gray-700">
          Debug view requires backend API integration with App and RawAppSnapshot tables.
        </p>
      </div>
    </div>
  );
}

