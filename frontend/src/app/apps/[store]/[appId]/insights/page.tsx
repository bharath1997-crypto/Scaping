import { getAppDetail } from '@/lib/api';
import { notFound } from 'next/navigation';

interface InsightsPageProps {
  params: {
    store: string;
    appId: string;
  };
}

export default async function InsightsPage({ params }: InsightsPageProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Insights</h1>
          <p className="text-gray-600">{app.title}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Insights</h2>
          <p className="text-gray-600 mb-8">
            Get intelligent insights about app performance, user sentiment, and market trends.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-gray-700">
              This feature is coming in Phase 5. AI insights will analyze reviews, ratings, and trends 
              to provide actionable recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

