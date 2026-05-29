import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchClient } from './SearchClient';

export const metadata: Metadata = {
  title: '검색 | 빙킷 라운지',
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-lg bg-white min-h-screen border-x border-gray-100">
        <Suspense>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
