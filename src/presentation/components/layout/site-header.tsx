import Link from "next/link";
import { AuthNav } from "@/presentation/components/auth/auth-nav";

export function SiteHeader() {
  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-zinc-900 font-mono">
              CS-<span className="text-indigo-600">Pedia</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/trends"
              className="hidden sm:flex items-center px-3 py-1.5 text-[13px] text-zinc-600 hover:text-zinc-900 transition-colors rounded-md"
            >
              Trends
            </Link>
            <Link
              href="/best-papers"
              className="hidden sm:flex items-center px-3 py-1.5 text-[13px] text-zinc-600 hover:text-zinc-900 transition-colors rounded-md"
            >
              Best Papers
            </Link>
            <AuthNav />
          </div>
        </div>
      </div>
    </header>
  );
}
