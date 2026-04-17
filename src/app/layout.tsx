import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

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
      <body className="min-h-screen flex flex-col items-center bg-linear-to-tr from-[#E8FAFE] to-[#F2FDE8]">
        <Header />
        <main className="flex flex-1 w-full max-w-6xl">{children}</main>
      </body>
    </html>
  );
}
