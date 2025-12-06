import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';

interface NotesPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  try {
    const app = await getAppDetail(params.store.toUpperCase(), params.appId);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href={`/apps/${params.store}/${params.appId}`}
            className="text-blue-600 hover:text-blue-700 mb-2 inline-block"
          >
            ← Back to App Detail
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notes</h1>
          <p className="text-gray-600">{app.title}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <textarea
            className="w-full h-64 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Add your notes about this app..."
          />
          <div className="mt-4 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Save Notes
            </button>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700">
            This feature requires user authentication. Please sign in to save and manage notes.
          </p>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

