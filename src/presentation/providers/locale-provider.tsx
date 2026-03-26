"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LocaleContext = createContext<{ isKorean: boolean }>({ isKorean: true });

/**
 * Client-side locale detection.
 * Uses navigator.language(s) to determine if the user's preferred language is Korean.
 * Defaults to Korean (true) during SSR / initial render to match the majority audience.
 */
export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isKorean, setIsKorean] = useState(true);

  useEffect(() => {
    const langs = navigator.languages ?? [navigator.language];
    const isKo = langs.some((l) => l.startsWith("ko"));
    setIsKorean(isKo);
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
