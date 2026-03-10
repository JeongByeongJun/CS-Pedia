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
        placeholder={isKorean ? "학회명 검색 (예: NeurIPS, CVPR, ACL...)" : "Search conferences (e.g. NeurIPS, CVPR, ACL...)"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-zinc-50"
      />
    </div>
  );
}
