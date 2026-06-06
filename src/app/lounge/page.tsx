import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LoungeClient } from './LoungeClient';
import LoungeHeader from '@/components/LoungeHeader';

const BASE_URL = 'https://bingket-landing.vercel.app';
const LOUNGE_URL = `${BASE_URL}/lounge`;

export const metadata: Metadata = {
  title: '라운지 | 빙킷',
  description: '빙킷 유저들의 빙고판, 목표 달성 후기, 자유게시판을 구경해보세요. 투두리스트·버킷리스트를 빙고로 이루는 사람들의 이야기가 가득해요.',
  keywords: [
    '빙고판', '빙고', '빙킷', '목표달성', '자기계발', '버킷리스트', '투두리스트',
    '빙고 커뮤니티', '목표 공유', '빙고 달성', '라운지',
  ],
  alternates: { canonical: LOUNGE_URL },
  openGraph: {
    type: 'website',
    title: '라운지 | 빙킷',
    description: '빙킷 유저들의 빙고판과 목표 달성 이야기를 구경해보세요.',
    url: LOUNGE_URL,
    siteName: '빙킷',
    locale: 'ko_KR',
    images: [{ url: `${BASE_URL}/images/og_default.png`, width: 1200, height: 630, alt: '빙킷 라운지' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '라운지 | 빙킷',
    description: '빙킷 유저들의 빙고판과 목표 달성 이야기를 구경해보세요.',
    images: [`${BASE_URL}/images/og_default.png`],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '빙킷',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/lounge/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': LOUNGE_URL,
    name: '빙킷 라운지',
    inLanguage: 'ko',
    description: '빙킷 유저들이 빙고판, 목표 달성 후기, 일상을 공유하는 커뮤니티. 투두리스트·버킷리스트를 빙고로 이루는 사람들의 공간.',
    url: LOUNGE_URL,
    isPartOf: { '@type': 'WebSite', name: '빙킷', url: BASE_URL },
    about: {
      '@type': 'Thing',
      name: '빙고 목표 달성 커뮤니티',
      description: '투두리스트와 버킷리스트를 빙고 형태로 관리하고 공유하는 커뮤니티',
    },
    hasPart: [
      {
        '@type': 'WebPage',
        name: '빙고판',
        description: '빙킷 유저들이 만든 빙고판을 구경해보세요. 목표, 할 일, 버킷리스트를 담은 다양한 빙고판이 가득해요.',
        url: `${LOUNGE_URL}?category=bingo_board`,
      },
      {
        '@type': 'WebPage',
        name: '빙고 달성',
        description: '빙고를 완성한 유저들의 목표 달성 후기와 인증글 모음.',
        url: `${LOUNGE_URL}?category=bingo_achieve`,
      },
      {
        '@type': 'WebPage',
        name: '자유게시판',
        description: '빙킷 유저들의 자유로운 이야기 공간.',
        url: `${LOUNGE_URL}?category=free`,
      },
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/lounge/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '빙킷', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '라운지', item: LOUNGE_URL },
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

          {/* 크롤러용 서버사이드 시맨틱 헤더 — 검색엔진이 페이지 주제 파악 */}
          <header className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h1 className="text-xl font-bold text-[#181C1C]">라운지</h1>
            <p className="text-sm text-[#929898] mt-0.5">빙킷 유저들의 이야기를 구경해보세요</p>
            {/* 카테고리 링크: 크롤러가 내부 링크 구조 파악 + 필터 UX */}
            <nav aria-label="카테고리" className="flex gap-2 mt-3 flex-wrap">
              {[
                { label: '빙고판', href: '/lounge?category=bingo_board' },
                { label: '빙고 달성', href: '/lounge?category=bingo_achieve' },
                { label: '자유게시판', href: '/lounge?category=free' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs px-3 py-1 rounded-full border border-gray-200 text-[#4C5252] hover:border-[#28C8DE] hover:text-[#028CA0] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </header>

          <Suspense>
            <LoungeClient />
          </Suspense>
        </div>
      </div>
    </>
  );
}
