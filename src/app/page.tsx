import type { Metadata } from "next";
import Landing from "./(route)/Landing";

export const metadata: Metadata = {
  title: "빙킷(Bingket) | 빙고로 이루는 투두리스트 & 버킷리스트 목표 달성 앱",
  description:
    "할 일·버킷리스트를 빙고판으로 채워가는 무료 게이미피케이션 앱. 목표 달성을 게임처럼 즐기고, 친구와 1대1 대결로 동기부여까지. iOS & Android 무료 다운로드.",

  keywords: [
    "빙고 투두",
    "버킷리스트 앱",
    "목표 관리 앱",
    "할일 관리",
    "투두리스트 앱",
    "투두리스트 무료",
    "자기계발 앱",
    "자기계발 앱 추천",
    "목표 달성 앱",
    "목표달성 앱",
    "게이미피케이션 앱",
    "빙고 목표",
    "빙고판 목표",
    "습관 형성",
    "습관 트래커",
    "새해 목표 앱",
    "버킷리스트 앱 무료",
    "1대1 대결",
    "친구와 목표 달성",
    "habit tracker",
    "bingo todo list",
    "goal achievement app",
    "gamification app",
    "free habit tracker",
    "bucket list app Korea",
    "모바일 앱",
    "iOS 앱",
    "Android 앱",
    "구글 플레이",
    "커뮤니티",
    "라이프스타일",
  ],

  openGraph: {
    title: "빙킷(Bingket) | 빙고로 이루는 투두리스트 & 버킷리스트",
    description:
      "할 일·버킷리스트를 빙고판으로 채워가는 무료 게이미피케이션 앱. 목표 달성을 게임처럼 즐기고, 친구와 1대1 대결로 동기부여까지.",
    url: "https://bingket-landing.vercel.app",
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
    title: "빙킷(Bingket) | 빙고로 이루는 투두리스트 & 버킷리스트",
    description:
      "할 일·버킷리스트를 빙고판으로 게임처럼 달성하는 무료 앱. 친구와 1대1 대결, 커뮤니티 공유, 뱃지 수집까지.",
    images: ["/images/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://bingket-landing.vercel.app",
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