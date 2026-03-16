import Link from "next/link";
import { headers } from "next/headers";
import { AuthButton } from "@/presentation/components/auth/auth-button";
import { getConferences } from "@/infrastructure/container";
import { getBookmarkCount } from "@/app/actions/bookmark";

interface SiteHeaderProps {
  user: {
    email: string;
    name?: string;
    avatarUrl?: string;
  } | null;
}

export async function SiteHeader({ user }: SiteHeaderProps) {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = !country || country === "KR";

  const [conferences, bookmarkCount] = await Promise.all([
    getConferences({}),
    getBookmarkCount(),
  ]);

  const upcomingCount = conferences.filter(
    (c) => (c.daysUntilDeadline ?? -1) >= 0,
  ).length;
  const totalCount = conferences.length;

  return (
    <header
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #111118 0%, #18181f 100%)" }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent line — top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "2px", background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Navigation */}
        <div className="flex items-center justify-between" style={{ height: "56px" }}>
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                fontSize: "14px",
              }}
            >
              🎓
            </div>
            <span
              className="font-bold tracking-tight"
              style={{ color: "#e4e4e7", fontSize: "16px", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "-0.02em" }}
            >
              CS-
              <span style={{ color: "#818cf8" }}>Pedia</span>
            </span>
          </Link>

          <div className="flex items-center" style={{ gap: "4px" }}>
            <Link
              href="/trends"
              className="hidden sm:flex items-center nav-link-hover"
              style={{
                padding: "6px 12px",
                fontSize: "13px",
                color: "#d4d4d8",
                borderRadius: "6px",
              }}
            >
              Trends
            </Link>
            <Link
              href="/best-papers"
              className="hidden sm:flex items-center nav-link-hover"
              style={{
                padding: "6px 12px",
                fontSize: "13px",
                color: "#d4d4d8",
                borderRadius: "6px",
              }}
            >
              Best Papers
            </Link>
            {user ? (
              <Link
                href="/mypage"
                className="hidden sm:flex items-center nav-link-hover"
                style={{
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#d4d4d8",
                  borderRadius: "6px",
                }}
              >
                My Page
              </Link>
            ) : (
              <div style={{ marginLeft: "4px" }}>
                <AuthButton user={user} />
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Hero Section */}
        <div className="pt-4 pb-4 sm:pt-8 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-7">
            {/* Left: Title */}
            <div>
              <div
                className="font-medium hidden sm:block"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "#818cf8",
                  marginBottom: "12px",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                CS Conference Hub
              </div>
              <h1
                className="font-bold text-[22px] sm:text-[clamp(26px,4vw,36px)]"
                style={{
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  color: "#fafafa",
                  marginBottom: "6px",
                }}
              >
                Deadlines, Rankings
                <br />
                <span style={{ color: "#a1a1aa" }}>& Best Papers — all in one.</span>
              </h1>
              <p
                className="hidden sm:block"
                style={{
                  fontSize: "13px",
                  color: "#52525b",
                  lineHeight: 1.6,
                  maxWidth: "380px",
                }}
              >
                {isKorean
                  ? "BK21 · KIISE ratings · Acceptance rates · Conference deadlines for CS researchers"
                  : "Acceptance rates · Best papers · Conference deadlines for CS researchers"}
              </p>
            </div>

            {/* Right: Stat cards */}
            <div className="grid grid-cols-3 w-full sm:w-auto" style={{ gap: "8px", flexShrink: 0 }}>
              <StatCard value={upcomingCount} label="Upcoming" accentColor="#818cf8" />
              <StatCard value={totalCount} label="Tracked" accentColor="#a78bfa" />
              <StatCard value={bookmarkCount} label="Saved" accentColor="#f59e0b" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
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
      className="px-3 py-2.5 sm:px-5 sm:py-4"
      style={{
        borderRadius: "12px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="font-bold text-xl sm:text-[28px]"
        style={{
          lineHeight: 1,
          color: "#fafafa",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        className="flex items-center mt-1 sm:mt-2"
        style={{
          gap: "6px",
          fontSize: "10px",
          color: "#71717a",
          fontFamily: "var(--font-geist-mono), monospace",
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: accentColor,
          }}
        />
        {label}
      </div>
    </div>
  );
}
