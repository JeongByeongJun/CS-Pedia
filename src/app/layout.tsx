import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FeedbackButton } from "@/presentation/components/layout/feedback-button";
import { Analytics } from "@vercel/analytics/next";

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
    "CS conference deadline",
    "computer science conference",
    "best paper award",
    "acceptance rate",
    "call for papers",
    "CFP",
    "conference ranking",
    "top CS conference",
    "Korean CS researcher",
    "NeurIPS deadline",
    "ICML deadline",
    "CVPR deadline",
    "ICLR deadline",
    "ICCV deadline",
    "ACL deadline",
    "AAAI deadline",
    "KDD deadline",
    "SIGCOMM deadline",
    "CCS deadline",
    "CHI deadline",
    "SIGIR deadline",
    "SOSP deadline",
    "OSDI deadline",
    "NSDI deadline",
    "VLDB deadline",
    "SIGMOD deadline",
    "ICSE deadline",
    "FSE deadline",
    "PLDI deadline",
    "POPL deadline",
    "OOPSLA deadline",
    "ASPLOS deadline",
    "MICRO deadline",
    "ISCA deadline",
    "HPCA deadline",
    "STOC deadline",
    "FOCS deadline",
    "S&P deadline",
    "IEEE S&P deadline",
    "EUROCRYPT deadline",
    "CRYPTO deadline",
    "INFOCOM deadline",
    "MobiCom deadline",
    "SIGGRAPH deadline",
    "IJCAI deadline",
    "WWW deadline",
    "ACM WWW deadline",
    "RTSS deadline",
    "VIS deadline",
    "CAV deadline",
    "MM deadline",
    "ACM MM deadline",
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CS-Pedia - 한국 CS 연구자를 위한 학회 통합 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CS-Pedia - 한국 CS 연구자를 위한 학회 통합 플랫폼",
    description:
      "학회 데드라인, BK21/KIISE 인정, Acceptance Rate, Best Paper를 한눈에.",
    images: ["/og-image.png"],
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
        <Analytics />
      </body>
    </html>
  );
}
