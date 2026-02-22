import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dungGeunMo = localFont({
  src: "../styles/fonts/DungGeunMo.woff",
  variable: "--font-dungeunmo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "추억퀴즈 - 90년대를 얼마나 기억하시나요?",
  description:
    "90년대~2000년대 한국 문화 퀴즈. PC방, K-POP, 애니메이션, 학교 추억을 테스트하세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={dungGeunMo.variable}>
      <body className="bg-[#0a0a1a] text-[#e0e0e0] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
