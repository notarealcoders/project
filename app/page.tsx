import { Suspense } from 'react';
import { HomePage } from '@/components/Home/HomePage';

// Add loading state
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomePage />
    </Suspense>
  );
}

// Enable static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour