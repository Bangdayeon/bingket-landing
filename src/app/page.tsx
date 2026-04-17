import type { Metadata } from "next";
import Landing from "./(route)/Landing";

export const metadata: Metadata = {
  title: "빙킷 | 빙고로 이루는 투두 & 버킷리스트 앱",
  description:
    "빙고판으로 목표를 관리하는 새로운 투두 앱, 빙킷. 버킷리스트를 더 재미있게 달성하고 친구와 함께 도전해보세요.",

  keywords: [
    "빙고 투두",
    "버킷리스트 앱",
    "목표 관리 앱",
    "할일 관리",
    "투두 리스트",
    "자기계발 앱",
    "목표 달성",
    "빙고 목표",
    "habit tracker",
    "모바일 앱",
    "iOS 앱",
    "커뮤니티",
    "라이프스타일",
  ],

  openGraph: {
    title: "빙킷 | 빙고로 이루는 투두 & 버킷리스트",
    description:
      "목표를 빙고판으로 만들고, 채워가며 달성하는 새로운 방식. 지금 바로 체험해보세요.",
    url: "https://your-domain.com",
    siteName: "빙킷",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "빙킷 앱 미리보기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "빙킷 | 빙고로 이루는 목표 관리",
    description:
      "할 일을 빙고처럼 채워가는 새로운 경험. 버킷리스트를 더 재미있게.",
    images: ["/images/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://your-domain.com",
  },

  verification: {
    google: "arSWwXNjwRh-goFhXrzfFCT2kVnh0O-sJw6BC-ZBIVw",
    other: {
      "naver-site-verification": "b5b3498d09bdbb0265e60acd7b7a562e788b5561",
    },
  },
};

export default function Home() {
  return <Landing />;
}