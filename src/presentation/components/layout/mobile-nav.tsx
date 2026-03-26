"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/presentation/hooks/use-locale";

const NAV_ITEMS = [
  { href: "/", label: "홈", labelEn: "Home", icon: "🏠" },
  { href: "/trends", label: "트렌드", labelEn: "Trends", icon: "📊" },
  { href: "/best-papers", label: "논문", labelEn: "Papers", icon: "🏆" },
  { href: "/mypage", label: "마이", labelEn: "My", icon: "👤" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { isKorean } = useLocale();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{isKorean ? item.label : item.labelEn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
