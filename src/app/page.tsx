import { getConferences, bookmarkRepo } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { ConferenceClientSection } from "@/presentation/components/conferences/conference-client-section";

export const revalidate = 3600;

export default async function HomePage() {
  const [conferences, supabase] = await Promise.all([
    getConferences({}),
    createSupabaseServerClient(),
  ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const bookmarkedIds = user
    ? (await bookmarkRepo.findByUserId(user.id)).map((b) => b.conferenceId)
    : [];

  const authUser = user
    ? {
        email: user.email!,
        name: user.user_metadata?.full_name ?? user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : null;

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
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <SiteHeader user={authUser} />

      <main className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <ConferenceClientSection
          conferences={conferences}
          bookmarkedIds={bookmarkedIds}
          isLoggedIn={!!user}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
