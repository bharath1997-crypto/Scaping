import { redirect } from 'next/navigation';

export default function AppleAppsPage() {
  redirect('/apps?store=APPLE_APP_STORE');
}

