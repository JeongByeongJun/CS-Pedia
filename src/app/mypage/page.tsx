import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getConferences, userRepo } from "@/infrastructure/container";
import { getUserBookmarkedIds, getBookmarkCount } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { ProfileForm } from "@/presentation/components/mypage/profile-form";
import { BookmarkedConferences } from "@/presentation/components/mypage/bookmarked-conferences";
import { UserStats } from "@/presentation/components/mypage/user-stats";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "프로필 설정 및 북마크한 학회 관리",
};

export default async function MyPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const [profile, bookmarkedIds, bookmarkCount, allConferences] =
    await Promise.all([
      userRepo.findById(user.id),
      getUserBookmarkedIds(),
      getBookmarkCount(),
      getConferences({}),
    ]);

  const authUser = {
    email: user.email!,
    name: user.user_metadata?.full_name ?? user.user_metadata?.name,
    avatarUrl: user.user_metadata?.avatar_url,
  };

  const bookmarkedConferences = allConferences.filter((c) =>
    bookmarkedIds.includes(c.id),
  );

  const profileData = {
    name: profile?.name ?? authUser.name ?? null,
    email: profile?.email ?? user.email ?? null,
    institution: profile?.institution ?? null,
    researchField: profile?.researchField ?? null,
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <SiteHeader
        upcomingCount={0}
        totalCount={0}
        bookmarkCount={bookmarkCount}
        user={authUser}
      />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">마이페이지</h1>

        {/* Stats */}
        <div className="mb-6">
          <UserStats bookmarkedConferences={bookmarkedConferences} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">프로필</h2>
            <ProfileForm user={profileData} />
          </div>

          {/* Bookmarked Conferences */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">
              북마크한 학회 ({bookmarkedConferences.length})
            </h2>
            <BookmarkedConferences conferences={bookmarkedConferences} />
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
