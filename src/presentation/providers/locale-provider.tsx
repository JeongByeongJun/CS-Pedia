"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LocaleContext = createContext<{ isKorean: boolean }>({ isKorean: true });

/**
 * Client-side locale detection.
 * Reads preferred-lang cookie (set by middleware) first, then falls back to navigator.language.
 * SSR defaults to Korean; client switches in useEffect. A blocking <script> in <head>
 * sets <html lang> before paint so screen readers / search bots see the correct lang early.
 */
export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isKorean, setIsKorean] = useState(true);

  useEffect(() => {
    // Check cookie first (set by middleware from Accept-Language)
    const match = document.cookie.match(/preferred-lang=([^;]+)/);
    if (match) {
      setIsKorean(match[1] === "ko");
      return;
    }
    // Fallback to browser language
    const langs = navigator.languages ?? [navigator.language];
    setIsKorean(langs.some((l) => l.startsWith("ko")));
  }, []);

  return (
    <LocaleContext value={{ isKorean }}>
      {children}
    </LocaleContext>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
