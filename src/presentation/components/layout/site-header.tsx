import Link from "next/link";
import { AuthNav } from "@/presentation/components/auth/auth-nav";

interface SiteHeaderProps {
  stats?: {
    upcomingCount: number;
    totalCount: number;
    bookmarkCount: number;
  };
}

export function SiteHeader({ stats }: SiteHeaderProps) {

  return (
    <header className="relative overflow-hidden bg-header-gradient">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent line — top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,#6366f1,#a855f7,#ec4899,transparent)]"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Navigation */}
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] text-sm"
            >
              🎓
            </div>
            <span
              className="font-bold tracking-tight text-zinc-200 text-base font-mono tracking-[-0.02em]"
            >
              CS-
              <span className="text-indigo-400">Pedia</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/trends"
              className="hidden sm:flex items-center nav-link-hover px-3 py-1.5 text-[13px] text-zinc-300 rounded-md"
            >
              Trends
            </Link>
            <Link
              href="/best-papers"
              className="hidden sm:flex items-center nav-link-hover px-3 py-1.5 text-[13px] text-zinc-300 rounded-md"
            >
              Best Papers
            </Link>
            <AuthNav />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Hero Section */}
        <div className="pt-4 pb-4 sm:pt-8 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-7">
            {/* Left: Title */}
            <div>
              <div
                className="font-medium hidden sm:block text-[11px] tracking-[0.15em] uppercase text-indigo-400 mb-3 font-mono"
              >
                CS Conference Hub
              </div>
              <h1
                className="font-bold text-[22px] sm:text-[clamp(26px,4vw,36px)] leading-[1.2] tracking-[-0.025em] text-zinc-50 mb-1.5"
              >
                Deadlines, Rankings
                <br />
                <span className="text-zinc-400">& Best Papers — all in one.</span>
              </h1>
              <p
                className="hidden sm:block text-[13px] text-zinc-600 leading-relaxed max-w-[380px]"
              >
                Acceptance rates · Best papers · Conference deadlines for CS researchers
              </p>
            </div>

            {/* Right: Stat cards */}
            {stats && (
              <div className="grid grid-cols-3 w-full sm:w-auto gap-2 shrink-0">
                <StatCard value={stats.upcomingCount} label="Upcoming" accentColor="#818cf8" />
                <StatCard value={stats.totalCount} label="Tracked" accentColor="#a78bfa" />
                <StatCard value={stats.bookmarkCount} label="Saved" accentColor="#f59e0b" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="h-px bg-white/[0.05]" />
    </header>
  );
}

function StatCard({
  value,
  label,
  accentColor,
}: {
  value: number;
  label: string;
  accentColor: string;
}) {
  return (
    <div
      className="px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl bg-white/[0.025] border border-white/[0.05]"
    >
      <div
        className="font-bold text-xl sm:text-[28px] leading-none text-zinc-50 font-mono tracking-[-0.03em] tabular-nums"
      >
        {value}
      </div>
      <div
        className="flex items-center mt-1 sm:mt-2 gap-1.5 text-[10px] text-zinc-500 font-mono uppercase tracking-[0.08em]"
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        {label}
      </div>
    </div>
  );
}
