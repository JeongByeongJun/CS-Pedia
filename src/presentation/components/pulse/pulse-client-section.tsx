"use client";

import { useState } from "react";
import { ExternalLink, Flame, Star, MessageCircle, Clock, TrendingUp } from "lucide-react";

interface HNItem {
  title: string;
  url: string;
  score: number;
  comments: number;
  hnUrl: string;
  timestamp: number;
  keywords: string[];
}

interface GitHubItem {
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  stars: number;
  starsToday: number;
  url: string;
  keywords: string[];
}

interface GeekNewsItem {
  title: string;
  url: string;
  points: number;
  timestamp: string;
  keywords: string[];
}

interface PulseData {
  updatedAt: string;
  hotKeywords: { keyword: string; sources: number }[];
  hn: HNItem[];
  github: GitHubItem[];
  geeknews: GeekNewsItem[];
}

function timeAgo(ts: number | string): string {
  const now = Date.now();
  const then = typeof ts === "number" ? ts * 1000 : new Date(ts).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

const LANG_COLORS: Record<string, string> = {
  Python: "bg-blue-400",
  TypeScript: "bg-blue-600",
  JavaScript: "bg-yellow-400",
  Rust: "bg-orange-500",
  Go: "bg-cyan-400",
  Java: "bg-red-400",
  "C++": "bg-pink-500",
  C: "bg-gray-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-400",
  Ruby: "bg-red-600",
};

function KeywordBadge({ keyword }: { keyword: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
      {keyword}
    </span>
  );
}

function HNCard({ item }: { item: HNItem }) {
  return (
    <div
      className="group block p-3 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
      onClick={() => window.open(item.url, "_blank")}
    >
      <h3 className="text-sm font-medium text-zinc-800 group-hover:text-zinc-600 transition-colors leading-snug line-clamp-2">
        {item.title}
      </h3>
      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-400">
        <span className="flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" />
          {item.score}
        </span>
        <a
          href={item.hnUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-0.5 hover:text-zinc-600"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle className="w-3 h-3" />
          {item.comments}
        </a>
        <span className="flex items-center gap-0.5">
          <Clock className="w-3 h-3" />
          {timeAgo(item.timestamp)}
        </span>
      </div>
      {item.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.keywords.map((kw) => (
            <KeywordBadge key={kw} keyword={kw} />
          ))}
        </div>
      )}
    </div>
  );
}

function GitHubCard({ item }: { item: GitHubItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-3 rounded-lg hover:bg-zinc-50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-zinc-800 group-hover:text-zinc-600 transition-colors leading-snug">
          <span className="text-zinc-400 font-normal">
            {item.fullName.split("/")[0]}/
          </span>
          {item.name}
        </h3>
      </div>
      {item.description && (
        <p className="text-[12px] text-zinc-500 mt-1 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      )}
      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-400">
        {item.language && (
          <span className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${LANG_COLORS[item.language] || "bg-zinc-400"}`}
            />
            {item.language}
          </span>
        )}
        <span className="flex items-center gap-0.5">
          <Star className="w-3 h-3" />
          +{item.starsToday.toLocaleString()} today
        </span>
      </div>
      {item.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.keywords.map((kw) => (
            <KeywordBadge key={kw} keyword={kw} />
          ))}
        </div>
      )}
    </a>
  );
}

function GeekNewsCard({ item }: { item: GeekNewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-3 rounded-lg hover:bg-zinc-50 transition-colors"
    >
      <h3 className="text-sm font-medium text-zinc-800 group-hover:text-zinc-600 transition-colors leading-snug line-clamp-2">
        {item.title}
      </h3>
      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-400">
        {item.timestamp && (
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" />
            {timeAgo(item.timestamp)}
          </span>
        )}
      </div>
      {item.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.keywords.map((kw) => (
            <KeywordBadge key={kw} keyword={kw} />
          ))}
        </div>
      )}
    </a>
  );
}

function ColumnHeader({
  icon,
  title,
  subtitle,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-100">
      <span className={`flex items-center ${color}`}>{icon}</span>
      <div>
        <h2 className="text-sm font-medium text-zinc-800">{title}</h2>
        {subtitle && <p className="text-[11px] text-zinc-400">{subtitle}</p>}
      </div>
    </div>
  );
}

export function PulseClientSection({ data }: { data: PulseData }) {
  const [showAll, setShowAll] = useState(false);
  const hnLimit = showAll ? data.hn.length : 10;
  const ghLimit = showAll ? data.github.length : 10;
  const gnLimit = showAll ? data.geeknews.length : 10;

  const updatedAt = new Date(data.updatedAt);
  const updatedAgo = timeAgo(Math.floor(updatedAt.getTime() / 1000));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            CS Pulse
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5 hidden">
          </p>
        </div>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          최근 업데이트: {updatedAgo}
        </div>
      </div>

      {/* Hot Keywords */}
      {data.hotKeywords.length > 0 && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 mb-2">
            <Flame className="w-4 h-4 text-orange-400" />
            핫 키워드
          </div>
          <div className="flex flex-wrap gap-2">
            {data.hotKeywords.map(({ keyword, sources }) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-white text-zinc-700 border border-zinc-200"
              >
                <Flame className="w-3 h-3 text-orange-400" />
                {keyword}
                <span className="text-zinc-400 text-[10px]">
                  ({sources}개 소스)
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* HN Column */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <ColumnHeader
            icon={<img src="/images/hn-logo.webp" alt="HN" className="w-5 h-5 rounded-sm" />}
            title="Hacker News"
            subtitle=""
            color="text-orange-600"
          />
          <div className="divide-y divide-zinc-50">
            {data.hn.slice(0, hnLimit).map((item, i) => (
              <HNCard key={`hn-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* GitHub Column */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <ColumnHeader
            icon={<img src="/images/github-logo.svg" alt="GitHub" className="w-5 h-5" />}
            title="GitHub Trending"
            subtitle=""
            color="text-zinc-900"
          />
          <div className="divide-y divide-zinc-50">
            {data.github.slice(0, ghLimit).map((item, i) => (
              <GitHubCard key={`gh-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* GeekNews Column */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <ColumnHeader
            icon="📰"
            title="GeekNews"
            subtitle=""
            color="text-blue-500"
          />
          <div className="divide-y divide-zinc-50">
            {data.geeknews.slice(0, gnLimit).map((item, i) => (
              <GeekNewsCard key={`gn-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Show more */}
      {!showAll &&
        (data.hn.length > 10 ||
          data.github.length > 10 ||
          data.geeknews.length > 10) && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
            >
              더 보기
            </button>
          </div>
        )}

      {/* Source info */}
      <div className="text-center text-[11px] text-zinc-400 pt-2">
        <span className="flex items-center justify-center gap-1">
          <ExternalLink className="w-3 h-3" />
          HN API · GitHub Trending · GeekNews Feed에서 자동 수집
        </span>
      </div>
    </div>
  );
}
