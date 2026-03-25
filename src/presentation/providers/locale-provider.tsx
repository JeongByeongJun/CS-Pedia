"use client";

import { createContext, useContext } from "react";

const LocaleContext = createContext<{ isKorean: boolean }>({ isKorean: true });

export function LocaleProvider({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext value={{ isKorean: lang === "ko" }}>
      {children}
    </LocaleContext>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
