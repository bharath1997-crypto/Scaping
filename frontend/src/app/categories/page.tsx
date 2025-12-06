import { listApps } from '@/lib/api';

const categories = [
  { name: 'Games', slug: 'GAME', icon: '🎮' },
  { name: 'Business', slug: 'BUSINESS', icon: '💼' },
  { name: 'Education', slug: 'EDUCATION', icon: '📚' },
  { name: 'Entertainment', slug: 'ENTERTAINMENT', icon: '🎬' },
  { name: 'Finance', slug: 'FINANCE', icon: '💰' },
  { name: 'Health & Fitness', slug: 'HEALTH_AND_FITNESS', icon: '💪' },
  { name: 'Productivity', slug: 'PRODUCTIVITY', icon: '⚡' },
  { name: 'Social', slug: 'SOCIAL', icon: '👥' },
  { name: 'Shopping', slug: 'SHOPPING', icon: '🛒' },
  { name: 'Travel', slug: 'TRAVEL', icon: '✈️' },
];

export default async function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">Browse apps by category</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-blue-600 hover:shadow-md transition-all"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h2 className="font-semibold text-gray-900">{category.name}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
