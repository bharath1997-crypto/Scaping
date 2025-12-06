import { redirect } from 'next/navigation';

interface CountryAppsPageProps {
  params: {
    code: string;
  };
}

export default function CountryAppsPage({ params }: CountryAppsPageProps) {
  redirect(`/apps?country=${params.code}`);
}
