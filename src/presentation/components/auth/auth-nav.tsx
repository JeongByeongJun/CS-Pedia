"use client";

import Link from "next/link";
import { AuthButton } from "./auth-button";
import { useAuth } from "@/presentation/providers/auth-provider";

export function AuthNav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="w-20 h-8" />;
  }

  if (user) {
    return (
      <Link
        href="/mypage"
        className="hidden sm:flex items-center nav-link-hover px-3 py-1.5 text-[13px] text-zinc-300 rounded-md"
      >
        My Page
      </Link>
    );
  }

  return (
    <div className="ml-1">
      <AuthButton user={null} />
    </div>
  );
}
