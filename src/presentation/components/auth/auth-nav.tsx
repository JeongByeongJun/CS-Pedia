"use client";

import Link from "next/link";
import { AuthButton } from "./auth-button";
import { useAuth } from "@/presentation/providers/auth-provider";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "../layout/shell.module.css";

export function AuthNav() {
  const { user, isLoading } = useAuth();
  const { isKorean } = useLocale();

  if (isLoading) {
    return <div className={styles.authPlaceholder} aria-hidden="true" />;
  }

  if (user) {
    return (
      <Link
        href="/mypage"
        className={styles.authButton}
      >
        {isKorean ? "마이페이지" : "My page"}
      </Link>
    );
  }

  return (
    <AuthButton user={null} />
  );
}
