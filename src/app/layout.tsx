import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CRTEffect } from "@/components/ui/CRTEffect";
import "./globals.css";

const dungGeunMo = localFont({
  src: "../styles/fonts/DungGeunMo.woff",
  variable: "--font-dungeunmo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://chuokquiz.com"
  ),
  title: {
    default: "추억퀴즈 - 90년대를 얼마나 기억하시나요?",
    template: "%s | 추억퀴즈",
  },
  description:
    "90년대~2000년대 한국 문화 퀴즈. PC방 게임, K-POP 1세대, 추억의 애니, TV 프로그램, 장난감, 학교 앞 추억을 테스트하세요!",
  keywords: [
    "추억퀴즈",
    "90년대 퀴즈",
    "2000년대 퀴즈",
    "한국 문화 퀴즈",
    "PC방 게임",
    "K-POP 1세대",
    "추억의 애니",
    "레트로 퀴즈",
    "스타크래프트",
    "H.O.T.",
    "슬램덩크",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "추억퀴즈",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={dungGeunMo.variable}>
      <body className="bg-retro-bg text-retro-text min-h-screen antialiased font-pixel">
        {children}
        <CRTEffect />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2vDkVBziJ7ynczuTRnPAyROzEAp+5eFgaAoSg1w3FAXBL"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
