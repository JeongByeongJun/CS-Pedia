"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  // lang attribute doesn't change after initial render
  return () => {};
}

function getSnapshot() {
  return document.documentElement.lang;
}

function getServerSnapshot() {
  return "ko";
}

export function useLocale() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { isKorean: lang === "ko" };
}
