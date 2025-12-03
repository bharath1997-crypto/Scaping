'use client';

import { useState } from 'react';
import Image from 'next/image';
import { App, ReviewsAnalytics } from '@/lib/api';
import RatingDistributionChart from './RatingDistributionChart';

interface AppTabsProps {
  app: App;
  reviewsAnalytics: ReviewsAnalytics | null;
}

export default function AppTabs({ app, reviewsAnalytics }: AppTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'analytics'>('overview');

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'reviews'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews Analytics
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analytics'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab app={app} />}
        {activeTab === 'reviews' && <ReviewsTab reviewsAnalytics={reviewsAnalytics} />}
        {activeTab === 'analytics' && <AnalyticsTab app={app} />}
      </div>
    </div>
  );
}

function OverviewTab({ app }: { app: App }) {
  return (
    <div className="space-y-6">
      {/* Screenshots */}
      {app.screenshots && app.screenshots.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Screenshots</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {app.screenshots.map((screenshot, index) => (
              <Image
                key={index}
                src={screenshot}
                alt={`${app.title} screenshot ${index + 1}`}
                width={200}
                height={400}
                className="rounded-lg border border-gray-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {app.description && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{app.description}</p>
        </div>
      )}

      {/* Details Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Price</p>
            <p className="font-medium text-gray-900">
              {app.free ? 'Free' : app.price ? `$${app.price}` : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Category</p>
            <p className="font-medium text-gray-900">{app.category || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Developer</p>
            <p className="font-medium text-gray-900">{app.developer}</p>
          </div>
          {app.updatedAt && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="font-medium text-gray-900">
                {new Date(app.updatedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ reviewsAnalytics }: { reviewsAnalytics: ReviewsAnalytics | null }) {
  if (!reviewsAnalytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No reviews analytics available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900">
            {reviewsAnalytics.totalReviews.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Average Rating</p>
          <p className="text-2xl font-bold text-gray-900">
            {reviewsAnalytics.avgRating.toFixed(1)} ⭐
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Rating Distribution</p>
          <p className="text-sm text-gray-900">
            {Object.entries(reviewsAnalytics.ratingDistribution)
              .reverse()
              .map(([star, count]) => `${star}★: ${count}`)
              .join(', ')}
          </p>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <RatingDistributionChart distribution={reviewsAnalytics.ratingDistribution} />
      </div>
    </div>
  );
}

function AnalyticsTab({ app }: { app: App }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 mb-4">Analytics charts coming soon.</p>
      <p className="text-sm text-gray-400">
        This will include ranking history, rating trends, and review volume charts.
      </p>
    </div>
  );
}

