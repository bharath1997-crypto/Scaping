import { redirect } from 'next/navigation';

interface CategoryGooglePageProps {
  params: {
    slug: string;
  };
}

export default function CategoryGooglePage({ params }: CategoryGooglePageProps) {
  redirect(`/apps?category=${params.slug}&store=GOOGLE_PLAY`);
}
