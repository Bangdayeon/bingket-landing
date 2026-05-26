import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Script from "next/script";

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
      <Script
        id="json-ld-software"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "빙킷",
            "alternateName": "Bingket",
            "operatingSystem": "iOS",
            "applicationCategory": "LifestyleApplication",
            "description": "빙고판으로 목표를 관리하는 투두 & 버킷리스트 앱. 할 일을 빙고처럼 채워가며 달성하는 새로운 방식.",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
            "url": "https://bingket-landing.vercel.app",
            "inLanguage": "ko-KR",
          }),
        }}
      />
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "빙킷은 어떤 앱인가요?",
                "acceptedAnswer": { "@type": "Answer", "text": "빙킷은 할 일과 버킷리스트를 빙고판 형태로 관리하는 iOS 앱입니다. 목표를 빙고 칸에 입력하고 하나씩 채워가며 달성하는 재미를 느낄 수 있어요." },
              },
              {
                "@type": "Question",
                "name": "무료로 사용할 수 있나요?",
                "acceptedAnswer": { "@type": "Answer", "text": "네, 빙킷은 무료로 다운로드하고 사용할 수 있습니다." },
              },
              {
                "@type": "Question",
                "name": "친구와 함께 사용할 수 있나요?",
                "acceptedAnswer": { "@type": "Answer", "text": "빙고판을 친구와 공유하고 함께 도전하거나 점수를 경쟁할 수 있습니다." },
              },
              {
                "@type": "Question",
                "name": "어떤 기기에서 사용할 수 있나요?",
                "acceptedAnswer": { "@type": "Answer", "text": "현재 iOS(iPhone, iPad)에서 앱스토어를 통해 다운로드할 수 있습니다." },
              },
            ],
          }),
        }}
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-C1VD72NR9M" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-C1VD72NR9M');
      `}</Script>
      <body className="min-h-screen flex flex-col items-center bg-linear-to-tr from-[#E8FAFE] to-[#F2FDE8] custom-scrollbar">
        <Header />
        <main className="flex flex-1 w-full max-w-6xl">{children}</main>
      </body>
    </html>
  );
}
