"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, BookOpen, ChartNoAxesColumnIncreasing, UserRound } from "lucide-react";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./shell.module.css";

const NAV_ITEMS = [
  { href: "/", label: "데드라인", labelEn: "Deadlines", icon: CalendarDays },
  { href: "/best-papers", label: "수상 논문", labelEn: "Papers", icon: BookOpen },
  { href: "/trends", label: "트렌드", labelEn: "Trends", icon: ChartNoAxesColumnIncreasing },
  { href: "/mypage", label: "마이페이지", labelEn: "My page", icon: UserRound },
];

export function MobileNav() {
  const pathname = usePathname();
  const { isKorean } = useLocale();

  return (
    <nav className={styles.mobileNav} aria-label={isKorean ? "모바일 주요 메뉴" : "Mobile navigation"}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/" || pathname.startsWith("/conferences/")
              : pathname.startsWith(item.href);

          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>{isKorean ? item.label : item.labelEn}</span>
            </Link>
          );
        })}
    </nav>
  );
}
