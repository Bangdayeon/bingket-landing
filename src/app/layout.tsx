import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Script from "next/script";

export const metadata: Metadata = {
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
