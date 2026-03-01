import { Suspense } from "react";
import { getConferences } from "@/infrastructure/container";
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

  const conferences = await getConferences({ filters, sort });
  const upcomingCount = conferences.filter(
    (c) => (c.daysUntilDeadline ?? -1) >= 0,
  ).length;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <SiteHeader
        upcomingCount={upcomingCount}
        totalCount={conferences.length}
        bookmarkCount={0}
      />

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
        <ConferenceList conferences={conferences} />

        <SiteFooter />
      </main>
    </div>
  );
}
