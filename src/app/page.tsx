import { getConferences } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getUserBookmarkedIds } from "@/app/actions/bookmark";
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

  const bookmarkedIds = await getUserBookmarkedIds();

  const authUser = user
    ? {
        email: user.email!,
        name: user.user_metadata?.full_name ?? user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : null;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <SiteHeader user={authUser} />

      <main className="max-w-6xl mx-auto px-6 py-6">
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
