"use client";

import { useLocale } from "@/presentation/hooks/use-locale";

interface ConferenceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ConferenceSearch({ value, onChange }: ConferenceSearchProps) {
  const { isKorean } = useLocale();

  return (
    <div className="relative mb-4">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
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
        type="text"
        autoComplete="off"
        aria-label={isKorean ? "학회 검색" : "Search conferences"}
        placeholder={isKorean ? "학회명 검색 (예: NeurIPS, CVPR, ACL...)" : "Search conferences (e.g. NeurIPS, CVPR, ACL...)"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-zinc-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-zinc-50"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 text-sm w-10 h-10 flex items-center justify-center"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
