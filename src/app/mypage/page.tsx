import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getConferences, userRepo, bookmarkRepo } from "@/infrastructure/container";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { ProfileForm } from "@/presentation/components/mypage/profile-form";
import { BookmarkedConferences } from "@/presentation/components/mypage/bookmarked-conferences";
import { UserStats } from "@/presentation/components/mypage/user-stats";
import { LogoutButton } from "@/presentation/components/mypage/logout-button";

export const metadata: Metadata = {
  title: "My Page — CS-Pedia",
  description: "프로필 설정 및 북마크한 학회 관리",
};

export default async function MyPage() {
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
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <SiteHeader user={authUser} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818cf8",
                marginBottom: "6px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 500,
              }}
            >
              My Page
            </div>
            <h1
              className="font-bold"
              style={{
                fontSize: "24px",
                letterSpacing: "-0.025em",
                color: "#18181b",
              }}
            >
              {authUser.name ?? "연구자"}님, 안녕하세요
            </h1>
          </div>
          <LogoutButton />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <UserStats bookmarkedConferences={bookmarkedConferences} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Profile */}
          <div
            className="lg:col-span-1"
            style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Profile header accent */}
            <div
              style={{
                height: "3px",
                background: "linear-gradient(90deg, #6366f1, #a855f7)",
              }}
            />
            <div style={{ padding: "24px" }}>
              {/* Profile incomplete nudge */}
              {(!profileData.institution || !profileData.researchField) && (
                <div
                  style={{
                    marginBottom: "16px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                    fontSize: "12px",
                    color: "#92400e",
                    lineHeight: 1.5,
                  }}
                >
                  ✏️ <strong>프로필을 완성해주세요.</strong>
                  <br />
                  소속 기관과 관심 분야를 입력하면 서비스 개선에 도움이 됩니다.
                </div>
              )}
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-5">
                {authUser.avatarUrl ? (
                  <img
                    src={authUser.avatarUrl}
                    alt=""
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center font-bold"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    {(authUser.name ?? authUser.email)[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div
                    className="font-semibold"
                    style={{ fontSize: "15px", color: "#18181b" }}
                  >
                    {authUser.name ?? "이름 미설정"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#a1a1aa" }}>
                    {authUser.email}
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: "1px",
                  background: "rgba(0,0,0,0.05)",
                  marginBottom: "20px",
                }}
              />

              <h2
                className="font-semibold"
                style={{
                  fontSize: "13px",
                  color: "#71717a",
                  marginBottom: "16px",
                  letterSpacing: "0.02em",
                }}
              >
                프로필 설정
              </h2>
              <ProfileForm user={profileData} />
            </div>
          </div>

          {/* Bookmarked Conferences */}
          <div
            className="lg:col-span-2"
            style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "3px",
                background: "linear-gradient(90deg, #f59e0b, #f97316)",
              }}
            />
            <div style={{ padding: "24px" }}>
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="font-semibold"
                  style={{ fontSize: "15px", color: "#18181b" }}
                >
                  북마크한 학회
                </h2>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#a1a1aa",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {bookmarkedConferences.length}건
                </span>
              </div>
              <BookmarkedConferences conferences={bookmarkedConferences} />
            </div>
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
