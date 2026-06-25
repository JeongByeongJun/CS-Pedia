import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FeedbackButton } from "@/presentation/components/layout/feedback-button";
import { MobileNav } from "@/presentation/components/layout/mobile-nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { LocaleProvider } from "@/presentation/providers/locale-provider";
import { AuthProvider } from "@/presentation/providers/auth-provider";

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
    default: "CS-Pedia | CS 학회 데드라인, BK21 우수학회, Best Paper",
    template: "%s | CS-Pedia",
  },
  description: "BK21 기반 209개 CS 학회의 CFP 마감일, 학회 랭킹, 채택률, Best Paper 기록을 한 곳에서 확인하세요. AAAI, NeurIPS, ICML, ACL 등 주요 컴퓨터공학 학회 일정 제공.",
  keywords: [
    "CS conference deadline",
    "CS 학회 데드라인",
    "학회 데드라인",
    "컴퓨터공학 학회",
    "BK21 우수학회",
    "computer science conference",
    "acceptance rate",
    "best paper award",
    "Best Paper 목록",
    "call for papers",
    "BK21 학회",
    "CORE ranking",
    "CCF ranking",
  ],
  metadataBase: new URL("https://cs-pedia.io"),
  alternates: {
    canonical: "https://cs-pedia.io",
  },
  other: {
    "google-adsense-account": "ca-pub-7036136026593965",
  },
  openGraph: {
    title: "CS-Pedia | CS 학회 데드라인, BK21 우수학회, Best Paper",
    description: "BK21 기반 209개 CS 학회의 CFP 마감일, 랭킹, 채택률, Best Paper 기록을 한 곳에서 확인하세요.",
    url: "https://cs-pedia.io",
    siteName: "CS-Pedia",
    locale: "ko_KR",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS-Pedia | CS 학회 데드라인, BK21 우수학회, Best Paper",
    description: "BK21 기반 209개 CS 학회의 CFP 마감일, 랭킹, 채택률, Best Paper 기록을 한 곳에서 확인하세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL!} />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var m=document.cookie.match(/preferred-lang=([^;]+)/);if(m&&m[1]==='en')document.documentElement.lang='en'})()` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider>
          <AuthProvider>
            {children}
            <MobileNav />
            <FeedbackButton />
          </AuthProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6KHL5QNN5Y"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6KHL5QNN5Y');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7036136026593965"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
