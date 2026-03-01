import Link from "next/link";
import { AuthButton } from "@/presentation/components/auth/auth-button";

interface SiteHeaderProps {
  upcomingCount: number;
  totalCount: number;
  bookmarkCount: number;
  user: {
    email: string;
    name?: string;
    avatarUrl?: string;
  } | null;
}

export function SiteHeader({
  upcomingCount,
  totalCount,
  bookmarkCount,
  user,
}: SiteHeaderProps) {
  return (
    <header
      className="text-white"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                🎓
              </div>
              <Link href="/">
                <h1 className="text-2xl font-bold tracking-tight">
                  ConfKorea
                </h1>
              </Link>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                Beta
              </span>
            </div>
            <p className="text-white/60 text-sm">
              한국 CS 연구자를 위한 학회 일정 · BK21 목록 · Best Paper 통합
              플랫폼
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/best-papers"
              className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Best Papers
            </Link>
            <Link
              href="/trends"
              className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Trends
            </Link>
            {user && (
              <Link
                href="/mypage"
                className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                마이페이지
              </Link>
            )}
            <AuthButton user={user} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <StatBox value={upcomingCount} label="다가오는 데드라인" />
          <StatBox value={totalCount} label="등록 학회" />
          <StatBox value={bookmarkCount} label="내 북마크" />
        </div>
      </div>
    </header>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-white/50 text-xs mt-1">{label}</div>
    </div>
  );
}
