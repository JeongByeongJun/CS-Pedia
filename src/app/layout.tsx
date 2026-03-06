import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FeedbackButton } from "@/presentation/components/layout/feedback-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CS-Pedia - 한국 CS 연구자를 위한 학회 통합 플랫폼",
    template: "%s | CS-Pedia",
  },
  description:
    "한국 CS 연구자를 위한 학회 일정, BK21 우수학회 목록, Best Paper 통합 플랫폼. 데드라인, 기관 인정, Acceptance Rate를 한눈에.",
  keywords: [
    "CS 학회",
    "BK21",
    "KIISE",
    "학회 데드라인",
    "Best Paper",
    "대학원",
    "NeurIPS",
    "ICML",
    "CVPR",
  ],
  metadataBase: new URL("https://cs-pedia.io"),
  openGraph: {
    title: "CS-Pedia - 한국 CS 연구자를 위한 학회 통합 플랫폼",
    description:
      "학회 데드라인, BK21/KIISE 인정, Acceptance Rate, Best Paper를 한눈에.",
    url: "https://cs-pedia.io",
    siteName: "CS-Pedia",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FeedbackButton />
      </body>
    </html>
  );
}
