const countries = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'cn', name: 'China', flag: '🇨🇳' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
];

export default function CountriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Countries</h1>
        <p className="text-gray-600">Browse apps by country</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {countries.map((country) => (
          <a
            key={country.code}
            href={`/countries/${country.code}`}
            className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-blue-600 hover:shadow-md transition-all"
          >
            <div className="text-4xl mb-3">{country.flag}</div>
            <h2 className="font-semibold text-gray-900">{country.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{country.code.toUpperCase()}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
