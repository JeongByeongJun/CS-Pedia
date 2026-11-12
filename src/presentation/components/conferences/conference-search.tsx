"use client";

import { useLocale } from "@/presentation/hooks/use-locale";

import styles from "./conference-index.module.css";

interface ConferenceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ConferenceSearch({ value, onChange }: ConferenceSearchProps) {
  const { isKorean } = useLocale();

  return (
    <div className={styles.search}>
      <svg
        className={styles.searchIcon}
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        autoComplete="off"
        aria-label={isKorean ? "학회 검색" : "Search conferences"}
        placeholder={isKorean ? "학회명 검색 (예: NeurIPS, CVPR, ACL...)" : "Search conferences (e.g. NeurIPS, CVPR, ACL...)"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className={styles.searchClear}
          aria-label={isKorean ? "검색어 지우기" : "Clear search"}
        >
          ✕
        </button>
      )}
    </div>
  );
}
