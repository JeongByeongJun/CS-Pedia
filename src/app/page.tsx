import { getConferences } from "@/infrastructure/container";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { UpdateBanner } from "@/presentation/components/layout/update-banner";
import { ConferenceClientSection } from "@/presentation/components/conferences/conference-client-section";

export const revalidate = 3600;

export default async function HomePage() {
  const conferences = await getConferences();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CS-Pedia",
    url: "https://cs-pedia.io",
    description: "BK21 기반 209개 CS 학회의 CFP 마감일, 학회 랭킹, 채택률, Best Paper 기록을 제공하는 연구자용 학회 플랫폼",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://cs-pedia.io/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <section className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            CS 학회 데드라인
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            BK21 기반 209개 컴퓨터공학 학회의 CFP 마감일, 학회 랭킹, 채택률, Best Paper 기록을 확인하세요.
          </p>
        </section>
        <UpdateBanner />
        <ConferenceClientSection
          conferences={conferences}
          bookmarkedIds={[]}
          isLoggedIn={false}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
