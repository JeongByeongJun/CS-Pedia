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
    description: "한국 CS 연구자를 위한 학회 통합 플랫폼",
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
    <div className="min-h-screen bg-page-gradient">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <SiteHeader
        user={null}
        stats={{
          upcomingCount: conferences.filter((c) => (c.daysUntilDeadline ?? -1) >= 0).length,
          totalCount: conferences.length,
          bookmarkCount: 0,
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
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
