import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoungeClient } from './LoungeClient';
import LoungeHeader from '@/components/LoungeHeader';

const BASE_URL = 'https://bingket-landing.vercel.app';

export const metadata: Metadata = {
  title: '라운지 | 빙킷',
  description: '빙킷 유저들의 빙고판, 목표 달성 후기, 자유게시판을 구경해보세요. 투두리스트·버킷리스트를 빙고로 이루는 사람들의 이야기가 가득해요.',
  alternates: { canonical: `${BASE_URL}/lounge` },
  openGraph: {
    type: 'website',
    title: '라운지 | 빙킷',
    description: '빙킷 유저들의 빙고판과 목표 달성 이야기를 구경해보세요.',
    url: `${BASE_URL}/lounge`,
    siteName: '빙킷',
    locale: 'ko_KR',
    images: [{ url: `${BASE_URL}/images/og_default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '라운지 | 빙킷',
    description: '빙킷 유저들의 빙고판과 목표 달성 이야기를 구경해보세요.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '빙킷 라운지',
    description: '빙킷 유저들이 빙고판, 목표 달성 후기, 일상을 공유하는 커뮤니티',
    url: `${BASE_URL}/lounge`,
    isPartOf: { '@type': 'WebSite', name: '빙킷', url: BASE_URL },
    about: {
      '@type': 'Thing',
      name: '빙고 목표 달성 커뮤니티',
      description: '투두리스트와 버킷리스트를 빙고 형태로 관리하고 공유하는 커뮤니티',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '빙킷', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '라운지', item: `${BASE_URL}/lounge` },
    ],
  },
];

export default function LoungePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="w-full flex justify-center">
        <div className="w-full max-w-lg bg-white min-h-screen border-x border-gray-100">
          <LoungeHeader />

          <Suspense>
            <LoungeClient />
          </Suspense>
        </div>
      </div>
    </>
  );
}
