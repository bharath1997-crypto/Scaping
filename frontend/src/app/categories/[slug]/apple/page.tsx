import { redirect } from 'next/navigation';

interface CategoryApplePageProps {
  params: {
    slug: string;
  };
}

export default function CategoryApplePage({ params }: CategoryApplePageProps) {
  redirect(`/apps?category=${params.slug}&store=APPLE_APP_STORE`);
}
