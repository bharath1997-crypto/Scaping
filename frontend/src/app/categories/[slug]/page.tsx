import { listApps } from '@/lib/api';
import { notFound } from 'next/navigation';
import AppCard from '@/components/apps/AppCard';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryNames: Record<string, string> = {
  GAME: 'Games',
  BUSINESS: 'Business',
  EDUCATION: 'Education',
  ENTERTAINMENT: 'Entertainment',
  FINANCE: 'Finance',
  HEALTH_AND_FITNESS: 'Health & Fitness',
  PRODUCTIVITY: 'Productivity',
  SOCIAL: 'Social',
  SHOPPING: 'Shopping',
  TRAVEL: 'Travel',
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryNames[params.slug.toUpperCase()] || params.slug;
  
  const response = await listApps({
    category: params.slug.toUpperCase(),
    page: 1,
    pageSize: 24,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/categories" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Categories
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
        <p className="text-gray-600">
          {response.pagination.total.toLocaleString()} apps in this category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {response.data.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
