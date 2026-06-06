import type { Metadata } from "next";
import "./globals.css";
import GlobalHeader from "../components/GlobalHeader";
import Script from "next/script";
import { ToastContainer } from "@/components/ToastContainer";
import { AppInstallModal } from "@/components/AppInstallModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://bingket-landing.vercel.app"),
  title: "빙킷",
  description: "오늘 할 일을 담은 빙고를 만들어보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "빙킷",
              "alternateName": "Bingket",
              "operatingSystem": "iOS, Android",
              "applicationCategory": "LifestyleApplication",
              "applicationSubCategory": "Productivity",
              "description": "할 일과 버킷리스트를 빙고판으로 관리하는 무료 게이미피케이션 앱. 친구와 1대1 대결, 커뮤니티 공유, 뱃지 시스템으로 목표 달성 동기부여를 극대화합니다.",
              "featureList": [
                "빙고판 형태의 투두/버킷리스트 관리",
                "3×3, 4×3, 4×4 빙고판 지원",
                "친구와 1대1 빙고 대결",
                "커뮤니티 게시글·이미지 공유",
                "뱃지 및 성취 시스템",
                "구글·카카오·애플·이메일 로그인",
                "테마 커스터마이징",
              ],
              "downloadUrl": [
                "https://apps.apple.com/kr/app/%EB%B9%99%ED%82%B7-bingket/id6761634987",
                "https://play.google.com/store/apps/details?id=com.day.bingket.app",
              ],
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
              "url": "https://bingket-landing.vercel.app",
              "inLanguage": "ko-KR",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "빙킷으로 목표 달성 시작하는 방법",
              "description": "빙킷 앱으로 나만의 빙고 목표를 만들고 달성하는 3단계",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "앱 무료 다운로드 & 간편 가입",
                  "text": "App Store 또는 Google Play에서 '빙킷'을 검색해 무료로 다운로드하세요. 구글·카카오·애플·이메일 중 편한 방법으로 30초 안에 가입할 수 있습니다.",
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "나만의 빙고판 만들기",
                  "text": "테마를 고르고 목표 기간과 빙고판 크기(3×3, 4×3, 4×4)를 설정하세요. 각 칸에 이루고 싶은 목표를 입력하면 나만의 빙고판이 완성됩니다.",
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "달성하며 빙고 채우기",
                  "text": "완료한 목표 칸을 터치해 날짜와 메모를 기록하세요. 친구에게 1대1 대결을 신청하거나 커뮤니티에 공유하며 더 즐겁게 목표를 이루세요.",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "빙킷(Bingket)은 어떤 앱인가요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "빙킷은 할 일과 버킷리스트를 빙고판 형태로 관리하는 무료 게이미피케이션 앱입니다. 목표를 빙고 칸에 입력하고 하나씩 달성하면서 빙고를 완성해가는 방식으로, 친구와의 1대1 대결과 커뮤니티 기능으로 목표 달성 동기부여를 극대화합니다." },
                },
                {
                  "@type": "Question",
                  "name": "빙킷은 무료인가요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "네, 빙킷은 iOS 앱스토어와 구글 플레이스토어에서 완전 무료로 다운로드하고 사용할 수 있습니다. 기본 기능인 빙고판 생성, 친구 대결, 커뮤니티 활동, 뱃지 시스템 모두 무료로 이용 가능합니다." },
                },
                {
                  "@type": "Question",
                  "name": "어떤 기기에서 사용할 수 있나요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "빙킷은 iOS(iPhone, iPad)와 Android 기기 모두에서 사용할 수 있습니다. Apple App Store와 Google Play Store에서 각각 무료로 다운로드할 수 있습니다." },
                },
                {
                  "@type": "Question",
                  "name": "빙고 대결 기능이 무엇인가요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "빙고 대결은 친구와 1대1로 같은 기간 동안 빙고 달성률을 겨루는 기능입니다. 내기를 걸고 대결을 신청하면 상대가 수락했을 때 대결이 시작되며, 더 많은 빙고를 달성한 사람이 이기는 방식으로 목표 달성 동기부여를 극대화합니다." },
                },
                {
                  "@type": "Question",
                  "name": "친구와 함께 사용하려면 어떻게 하나요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "앱에서 아이디 또는 이름으로 친구를 검색하고 친구 요청을 보내면 됩니다. 상대가 수락하면 친구가 되고, 이후 빙고 대결을 신청할 수 있습니다. 커뮤니티에서도 서로의 목표 달성 과정을 공유하고 댓글로 응원할 수 있어요." },
                },
                {
                  "@type": "Question",
                  "name": "커뮤니티에서 어떤 활동을 할 수 있나요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "커뮤니티에서는 나의 빙고판과 목표 달성 과정을 글과 이미지로 공유할 수 있습니다. 익명 또는 아이디 공개 중 선택하여 게시할 수 있고, 댓글과 대댓글로 소통하며 다른 사람의 빙고 아이디어에서 영감을 얻을 수 있습니다." },
                },
                {
                  "@type": "Question",
                  "name": "뱃지는 어떻게 받을 수 있나요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "빙킷에서는 특정 활동 횟수를 달성할 때마다 뱃지가 자동으로 지급됩니다. 빙고 달성 횟수, 커뮤니티 좋아요·댓글 횟수, 대결 참여 횟수 등 다양한 기준으로 뱃지를 모을 수 있으며 나만의 성장 기록이 됩니다." },
                },
                {
                  "@type": "Question",
                  "name": "빙고판을 몇 개나 만들 수 있나요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "빙고판은 여러 개를 동시에 만들고 관리할 수 있습니다. 3×3, 4×3, 4×4 크기 중 선택하고 테마와 목표 기간을 각각 설정할 수 있어서 투두리스트용, 버킷리스트용, 단기·장기 목표용으로 나눠서 활용할 수 있습니다." },
                },
                {
                  "@type": "Question",
                  "name": "일반 투두 앱이나 습관 트래커와 어떻게 다른가요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "빙킷은 빙고라는 게임 요소를 목표 관리에 결합한 게이미피케이션 앱입니다. 단순 체크리스트가 아닌 빙고 달성의 성취감, 친구와의 1대1 대결, 커뮤니티 공유, 뱃지 수집 등 동기부여 요소로 목표를 꾸준히 이어갈 수 있도록 설계되었습니다." },
                },
                {
                  "@type": "Question",
                  "name": "어떤 방법으로 로그인할 수 있나요?",
                  "acceptedAnswer": { "@type": "Answer", "text": "구글 로그인, 카카오 로그인, 애플 로그인, 이메일 회원가입 총 4가지 방법을 지원합니다. 로그인 없이도 미완성 빙고를 기기에 로컬로 저장해 기본 기능을 사용할 수 있습니다." },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col items-center bg-linear-to-tr from-[#E8FAFE] to-[#F2FDE8] custom-scrollbar">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-C1VD72NR9M" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C1VD72NR9M');
        `}</Script>
        <GlobalHeader />
        <ToastContainer />
        <AppInstallModal />
        <main className="flex flex-1 w-full max-w-6xl">{children}</main>
      </body>
    </html>
  );
}
