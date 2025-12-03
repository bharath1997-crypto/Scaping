import { redirect } from 'next/navigation';

export default function GooglePlayAppsPage() {
  redirect('/apps?store=GOOGLE_PLAY');
}

