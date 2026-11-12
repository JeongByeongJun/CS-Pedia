"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthNav } from "@/presentation/components/auth/auth-nav";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./shell.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Deadlines" },
  { href: "/best-papers", label: "Best Papers" },
  { href: "/trends", label: "Trends" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { isKorean } = useLocale();

  return (
    <header className={styles.header}>
      {(pathname === "/" || pathname === "/best-papers") && <a href="#main-content" className="desk-skip-link">{isKorean ? "본문 바로가기" : "Skip to content"}</a>}
      <div className={styles.headerInner}>
        <Link href="/" className={styles.masthead} aria-label="CS-Pedia — Home">
          <span className={styles.brand}>CS-Pedia<span className={styles.brandDot}>.</span></span>
          <span className={styles.descriptor}>The computer science research index</span>
        </Link>
        <div className={styles.headerActions}>
          <nav className={styles.desktopNav} aria-label={isKorean ? "주요 메뉴" : "Main navigation"}>
            {NAV_ITEMS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" || pathname.startsWith("/conferences/") : pathname.startsWith(href);
              return <Link key={href} href={href} className={styles.navLink} aria-current={active ? "page" : undefined}>{label}</Link>;
            })}
          </nav>
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
