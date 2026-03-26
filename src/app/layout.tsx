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
    default: "CS-Pedia - CS Conference Deadlines, Acceptance Rates & Best Papers",
    template: "%s | CS-Pedia",
  },
  description: "한국 CS 연구자를 위한 학회 일정, BK21 우수학회 목록, Best Paper 통합 플랫폼. Track CS conference deadlines, acceptance rates, and best paper awards.",
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
    "3DV deadline",
    "AAAI deadline",
    "AACL deadline",
    "AAMAS deadline",
    "ACCV deadline",
    "ACL deadline",
    "ACML deadline",
    "ACSAC deadline",
    "AISTATS deadline",
    "ASE deadline",
    "ASIACRYPT deadline",
    "ASPLOS deadline",
    "ASSETS deadline",
    "BMVC deadline",
    "BigData deadline",
    "CASE deadline",
    "CCC deadline",
    "CCS deadline",
    "CGO deadline",
    "CHI deadline",
    "CIKM deadline",
    "CLUSTER deadline",
    "COLING deadline",
    "COLT deadline",
    "CRYPTO deadline",
    "CSCW deadline",
    "CSF deadline",
    "CVPR deadline",
    "CoNEXT deadline",
    "CoNLL deadline",
    "CoRL deadline",
    "DAC deadline",
    "DASFAA deadline",
    "DATE deadline",
    "DIS deadline",
    "DSN deadline",
    "EACL deadline",
    "ECAI deadline",
    "ECCV deadline",
    "ECML-PKDD deadline",
    "EDBT deadline",
    "EGSR deadline",
    "EMNLP deadline",
    "ER deadline",
    "ESA deadline",
    "ESEM deadline",
    "ESORICS deadline",
    "EUROCRYPT deadline",
    "EuroSys deadline",
    "Eurographics deadline",
    "FASE deadline",
    "FAST deadline",
    "FG deadline",
    "FOCS deadline",
    "FSE deadline",
    "GECCO deadline",
    "HPCA deadline",
    "HPDC deadline",
    "HRI deadline",
    "I3D deadline",
    "ICALP deadline",
    "ICAPS deadline",
    "ICCAD deadline",
    "ICCV deadline",
    "ICDCS deadline",
    "ICDE deadline",
    "ICDM deadline",
    "ICIP deadline",
    "ICLR deadline",
    "ICML deadline",
    "ICNP deadline",
    "ICPR deadline",
    "ICRA deadline",
    "ICS deadline",
    "ICSE deadline",
    "ICSME deadline",
    "ICST deadline",
    "IJCAI deadline",
    "IMC deadline",
    "INFOCOM deadline",
    "INTERACT deadline",
    "IROS deadline",
    "ISAAC deadline",
    "ISCA deadline",
    "ISRR deadline",
    "ISSRE deadline",
    "ISSTA deadline",
    "ITCS deadline",
    "IUI deadline",
    "KDD deadline",
    "LREC deadline",
    "MDM deadline",
    "MFCS deadline",
    "MICCAI deadline",
    "MICRO deadline",
    "MODELS deadline",
    "MSR deadline",
    "Middleware deadline",
    "MobiCom deadline",
    "MobiHoc deadline",
    "MobiSys deadline",
    "MobileHCI deadline",
    "NAACL deadline",
    "NDSS deadline",
    "NSDI deadline",
    "NeurIPS deadline",
    "OOPSLA deadline",
    "OSDI deadline",
    "PACT deadline",
    "PAKDD deadline",
    "PETS deadline",
    "PLDI deadline",
    "PODS deadline",
    "POPL deadline",
    "PPoPP deadline",
    "Pacific Graphics deadline",
    "RAID deadline",
    "RSS deadline",
    "RecSys deadline",
    "S&P deadline",
    "SANER deadline",
    "SC deadline",
    "SCA deadline",
    "SDM deadline",
    "SIGCOMM deadline",
    "SIGGRAPH deadline",
    "SIGGRAPH Asia deadline",
    "SIGIR deadline",
    "SIGMOD deadline",
    "SODA deadline",
    "SOSP deadline",
    "STOC deadline",
    "SenSys deadline",
    "SoCC deadline",
    "SoCG deadline",
    "UAI deadline",
    "UIST deadline",
    "USENIX ATC deadline",
    "USENIX Security deadline",
    "UbiComp deadline",
    "VLDB deadline",
    "WACV deadline",
    "WSDM deadline",
    "WWW deadline",
  ],
  metadataBase: new URL("https://cs-pedia.io"),
  alternates: {
    canonical: "https://cs-pedia.io",
  },
  other: {
    "google-adsense-account": "ca-pub-7036136026593965",
  },
  openGraph: {
    title: "CS-Pedia - CS Conference Deadlines, Acceptance Rates & Best Papers",
    description: "Track 209 CS conference deadlines with CORE/CCF rankings, acceptance rates, and 1,400+ best papers.",
    url: "https://cs-pedia.io",
    siteName: "CS-Pedia",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS-Pedia - CS Conference Deadlines, Acceptance Rates & Best Papers",
    description: "Track 209 CS conference deadlines with CORE/CCF rankings, acceptance rates, and 1,400+ best papers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL!} />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
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
