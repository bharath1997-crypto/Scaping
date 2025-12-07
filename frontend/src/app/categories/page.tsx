import { listApps } from '@/lib/api';
import Link from 'next/link';

const categoryMap: Record<string, { name: string; icon: string }> = {
  GAME: { name: 'Games', icon: '🎮' },
  GAMES: { name: 'Games', icon: '🎮' },
  BUSINESS: { name: 'Business', icon: '💼' },
  EDUCATION: { name: 'Education', icon: '📚' },
  ENTERTAINMENT: { name: 'Entertainment', icon: '🎬' },
  FINANCE: { name: 'Finance', icon: '💰' },
  HEALTH_AND_FITNESS: { name: 'Health & Fitness', icon: '💪' },
  PRODUCTIVITY: { name: 'Productivity', icon: '⚡' },
  SOCIAL: { name: 'Social', icon: '👥' },
  SHOPPING: { name: 'Shopping', icon: '🛒' },
  TRAVEL: { name: 'Travel', icon: '✈️' },
  PHOTOGRAPHY: { name: 'Photography', icon: '📷' },
  MUSIC: { name: 'Music', icon: '🎵' },
  NEWS: { name: 'News', icon: '📰' },
  SPORTS: { name: 'Sports', icon: '⚽' },
  WEATHER: { name: 'Weather', icon: '🌤️' },
  FOOD_AND_DRINK: { name: 'Food & Drink', icon: '🍔' },
  LIFESTYLE: { name: 'Lifestyle', icon: '✨' },
  MEDICAL: { name: 'Medical', icon: '🏥' },
  BOOKS: { name: 'Books', icon: '📖' },
};

export default async function CategoriesPage() {
  // Fetch apps to get real categories with counts
  let categoriesWithCounts: Array<{ slug: string; name: string; icon: string; count: number }> = [];
  
  try {
    // Fetch apps from different categories to get counts
    const categorySlugs = Object.keys(categoryMap);
    const categoryPromises = categorySlugs.map(async (slug) => {
      try {
        const response = await listApps({
          category: slug,
          page: 1,
          pageSize: 1,
        });
        return {
          slug,
          name: categoryMap[slug].name,
          icon: categoryMap[slug].icon,
          count: response.pagination.total,
        };
      } catch {
        return null;
      }
    });

    const results = await Promise.all(categoryPromises);
    categoriesWithCounts = results
      .filter((cat): cat is NonNullable<typeof cat> => cat !== null && cat.count > 0)
      .sort((a, b) => b.count - a.count); // Sort by count descending
  } catch (error) {
    // If backend not available, show static categories
    categoriesWithCounts = Object.entries(categoryMap).map(([slug, info]) => ({
      slug,
      name: info.name,
      icon: info.icon,
      count: 0,
    }));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">Browse apps by category</p>
      </div>

      {categoriesWithCounts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoriesWithCounts.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h2 className="font-semibold text-gray-900 mb-1">{category.name}</h2>
              {category.count > 0 && (
                <p className="text-sm text-gray-600">{category.count.toLocaleString()} apps</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 mb-2">⚠️ Backend API not connected</p>
          <p className="text-sm text-yellow-700">
            Please start the backend server: <code className="bg-yellow-100 px-2 py-1 rounded">npm run api</code>
          </p>
        </div>
      )}
    </div>
  );
}
