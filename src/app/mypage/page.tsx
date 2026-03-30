import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getConferences, userRepo, bookmarkRepo } from "@/infrastructure/container";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { ProfileForm } from "@/presentation/components/mypage/profile-form";
import { BookmarkedConferences } from "@/presentation/components/mypage/bookmarked-conferences";
import { UserStats } from "@/presentation/components/mypage/user-stats";
import { LogoutButton } from "@/presentation/components/mypage/logout-button";

export async function generateMetadata(): Promise<Metadata> {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";
  return {
    title: "My Page",
    description: isKorean
      ? "프로필 설정 및 북마크한 학회 관리"
      : "Manage your profile and bookmarked conferences",
  };
}

export default async function MyPage() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") ?? "";
  const isKorean = country === "KR";

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const [profile, bookmarks, allConferences] = await Promise.all([
    userRepo.findById(user.id),
    bookmarkRepo.findByUserId(user.id),
    getConferences(),
  ]);
  const bookmarkedIds = bookmarks.map((b) => b.conferenceId);

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
    <div className="min-h-screen bg-page-gradient">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-indigo-400 mb-1.5 font-mono font-medium">
              My Page
            </div>
            <h1 className="font-bold text-2xl tracking-[-0.025em] text-zinc-900">
              {isKorean
                ? `${authUser.name ?? "연구자"}님, 안녕하세요`
                : `Hello, ${authUser.name ?? "Researcher"}`}
            </h1>
          </div>
          <LogoutButton isKorean={isKorean} />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <UserStats bookmarkedConferences={bookmarkedConferences} isKorean={isKorean} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Profile */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
            {/* Profile header accent */}
            <div className="h-[3px] bg-[linear-gradient(90deg,#6366f1,#a855f7)]" />
            <div className="p-6">
              {/* Profile incomplete nudge */}
              {(!profileData.institution || !profileData.researchField) && (
                <div className="mb-4 px-3 py-2.5 rounded-[10px] bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-normal">
                  {isKorean ? (
                    <>
                      ✏️ <strong>프로필을 완성해주세요.</strong>
                      <br />
                      소속 기관과 관심 분야를 입력하면 서비스 개선에 도움이 됩니다.
                    </>
                  ) : (
                    <>
                      ✏️ <strong>Complete your profile.</strong>
                      <br />
                      Adding your institution and research field helps us improve the service.
                    </>
                  )}
                </div>
              )}
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-5">
                {authUser.avatarUrl ? (
                  <img
                    src={authUser.avatarUrl}
                    alt=""
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center font-bold w-11 h-11 rounded-xl bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] text-white text-lg">
                    {(authUser.name ?? authUser.email)[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-[15px] text-zinc-900">
                    {authUser.name ?? (isKorean ? "이름 미설정" : "Name not set")}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {authUser.email}
                  </div>
                </div>
              </div>

              <div className="h-px bg-black/[0.05] mb-5" />

              <h2 className="font-semibold text-[13px] text-zinc-500 mb-4 tracking-[0.02em]">
                {isKorean ? "프로필 설정" : "Profile Settings"}
              </h2>
              <ProfileForm user={profileData} isKorean={isKorean} />
            </div>
          </div>

          {/* Bookmarked Conferences */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
            <div className="h-[3px] bg-[linear-gradient(90deg,#f59e0b,#f97316)]" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-[15px] text-zinc-900">
                  {isKorean ? "북마크한 학회" : "Bookmarked Conferences"}
                </h2>
                <span className="text-xs text-zinc-400 font-mono">
                  {bookmarkedConferences.length}{isKorean ? "건" : ""}
                </span>
              </div>
              <BookmarkedConferences conferences={bookmarkedConferences} isKorean={isKorean} />
            </div>
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
