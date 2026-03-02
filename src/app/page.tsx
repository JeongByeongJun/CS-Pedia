import { Suspense } from "react";
import { getConferences } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getUserBookmarkedIds, getBookmarkCount } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { ConferenceSearch } from "@/presentation/components/conferences/conference-search";
import { ConferenceFilters } from "@/presentation/components/conferences/conference-filters";
import { ConferenceList } from "@/presentation/components/conferences/conference-list";
import type { ConferenceField } from "@/domain/entities/conference";
import type { Institution } from "@/domain/entities/institution-rating";
import type { SortMode } from "@/domain/use-cases/get-conferences";

interface HomePageProps {
  searchParams: Promise<{
    field?: string;
    institution?: string;
    search?: string;
    sort?: string;
  }>;
}

export const revalidate = 3600;

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const filters = {
    field: params.field as ConferenceField | undefined,
    institution: params.institution as Institution | undefined,
    search: params.search,
  };
  const sort = (params.sort as SortMode) || "deadline";

  const [conferences, supabase] = await Promise.all([
    getConferences({ filters, sort }),
    createSupabaseServerClient(),
  ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [bookmarkedIds, bookmarkCount] = await Promise.all([
    getUserBookmarkedIds(),
    getBookmarkCount(),
  ]);

  const upcomingCount = conferences.filter(
    (c) => (c.daysUntilDeadline ?? -1) >= 0,
  ).length;

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
        {/* 필터 영역 */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-5 mb-5">
          <Suspense fallback={null}>
            <ConferenceSearch defaultValue={params.search} />
            <ConferenceFilters
              selectedField={params.field}
              selectedInstitution={params.institution}
              selectedSort={params.sort}
            />
          </Suspense>
        </div>

        {/* 학회 목록 */}
        <ConferenceList
          conferences={conferences}
          bookmarkedIds={bookmarkedIds}
          isLoggedIn={!!user}
        />

        <SiteFooter />
      </main>
    </div>
  );
}
