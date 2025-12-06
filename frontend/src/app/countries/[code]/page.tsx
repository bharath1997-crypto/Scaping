import { listApps } from '@/lib/api';
import { notFound } from 'next/navigation';
import AppCard from '@/components/apps/AppCard';

interface CountryPageProps {
  params: {
    code: string;
  };
}

const countryNames: Record<string, string> = {
  us: 'United States',
  in: 'India',
  gb: 'United Kingdom',
  ca: 'Canada',
  au: 'Australia',
  de: 'Germany',
  fr: 'France',
  jp: 'Japan',
  cn: 'China',
  br: 'Brazil',
};

export default async function CountryPage({ params }: CountryPageProps) {
  const countryName = countryNames[params.code.toLowerCase()] || params.code.toUpperCase();
  
  if (!countryNames[params.code.toLowerCase()]) {
    notFound();
  }

  const response = await listApps({
    country: params.code.toLowerCase(),
    page: 1,
    pageSize: 24,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <a href="/countries" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
          ← Back to Countries
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{countryName}</h1>
        <p className="text-gray-600">
          {response.pagination.total.toLocaleString()} apps available in {countryName}
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
