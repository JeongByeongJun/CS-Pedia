"use client";

import { useState, useEffect } from "react";

export function useLocale() {
  const [isKorean, setIsKorean] = useState(true); // default to Korean to avoid flash

  useEffect(() => {
    const lang = navigator.language || "";
    setIsKorean(lang.startsWith("ko"));
  }, []);

  return { isKorean };
}
