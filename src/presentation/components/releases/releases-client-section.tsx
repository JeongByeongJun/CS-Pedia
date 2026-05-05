"use client";

import { useState } from "react";
import { Clock, Tag, ExternalLink, Play, Eye, ArrowLeft, FileText, Link2 } from "lucide-react";

interface ReleaseItem {
  date: string;
  title: string;
  content: string;
  source: "anthropic" | "openai";
  tags: string[];
}

interface YouTubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
  viewCount?: number;
}

interface ReleasesData {
  updatedAt: string;
  anthropic: ReleaseItem[];
  openai: ReleaseItem[];
  timeline: ReleaseItem[];
  youtubeVideos?: YouTubeVideo[];
}

type ViewMode = "overview" | "detail";
type SourceKey = "anthropic" | "openai";

const SOURCE_META: Record<
  string,
  { label: string; logo: string; color: string; bg: string; border: string; url: string; docsUrl: string; blogUrl: string }
> = {
  anthropic: {
    label: "Anthropic",
    logo: "/images/claude-logo.webp",
    color: "text-[#D97757]",
    bg: "bg-[#D97757]/5",
    border: "border-[#D97757]/20",
    url: "https://docs.anthropic.com/en/docs/about-claude/models",
    docsUrl: "https://docs.anthropic.com",
    blogUrl: "https://www.anthropic.com/news",
  },
  openai: {
    label: "OpenAI",
    logo: "/images/openai-logo.svg",
    color: "text-zinc-900",
    bg: "bg-zinc-100/50",
    border: "border-zinc-400/40",
    url: "https://platform.openai.com/docs/changelog",
    docsUrl: "https://platform.openai.com/docs",
    blogUrl: "https://openai.com/blog",
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  return `${month} ${day}`;
}

function daysAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr + "T00:00:00");
  const diff = Math.floor(
    (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff === 0) return "오늘";
  if (diff === 1) return "어제";
  return `${diff}일 전`;
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
      {tag}
    </span>
  );
}

function ReleaseCard({
  item,
  showSource,
}: {
  item: ReleaseItem;
  showSource?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = SOURCE_META[item.source];
  const needsExpand = item.content.length > 120;

  return (
    <div className="p-3 rounded-lg hover:bg-zinc-50/80 transition-colors">
      {showSource && (
        <span
          className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${meta.bg} ${meta.color} ${meta.border} border mb-1.5`}
        >
          <img src={meta.logo} alt={meta.label} className="w-3.5 h-3.5 rounded-sm" />
          {meta.label}
        </span>
      )}
      <h3 className="text-sm font-medium text-zinc-800 leading-snug">
        {item.title}
      </h3>
      {needsExpand && (
        <p
          className={`text-[12px] text-zinc-500 mt-1 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}
        >
          {item.content}
        </p>
      )}
      {needsExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-indigo-500 hover:text-indigo-700 mt-0.5"
        >
          {expanded ? "접기" : "더 보기"}
        </button>
      )}
      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-zinc-400">
        <span className="flex items-center gap-0.5">
          <Clock className="w-3 h-3" />
          {formatDate(item.date)}
        </span>
        <span>{daysAgo(item.date)}</span>
      </div>
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg overflow-hidden hover:bg-zinc-50 transition-colors"
    >
      <div className="relative aspect-video bg-zinc-100">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Play className="w-8 h-8 text-zinc-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-2.5">
        <h4 className="text-[13px] font-medium text-zinc-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
          <span>{video.channelTitle}</span>
          {video.viewCount !== undefined && (
            <span className="flex items-center gap-0.5">
              <Eye className="w-3 h-3" />
              {formatViews(video.viewCount)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100">
      <div className="flex items-center gap-2">
        {icon && <span className="text-zinc-400">{icon}</span>}
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">{title}</h2>
          <p className="text-[11px] text-zinc-400">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

// --- Detail View (2-column: Release Notes + Official Links) ---
function DetailView({
  source,
  releases,
  onBack,
}: {
  source: SourceKey;
  releases: ReleaseItem[];
  onBack: () => void;
}) {
  const meta = SOURCE_META[source];
  const [showAllReleases, setShowAllReleases] = useState(false);

  return (
    <div className="space-y-4">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전체 보기
        </button>
        <div className={`flex items-center gap-2 ${meta.color}`}>
          <img src={meta.logo} alt={meta.label} className="w-6 h-6 rounded-sm" />
          <h2 className="text-lg font-bold">{meta.label}</h2>
        </div>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Column 1-2: Release Notes (wider) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <SectionHeader
            icon={<FileText className="w-3.5 h-3.5" />}
            title="Release Notes"
            subtitle={`${releases.length}개 업데이트`}
            action={
              <a
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            }
          />
          <div className="divide-y divide-zinc-50 max-h-[600px] overflow-y-auto">
            {releases.slice(0, showAllReleases ? releases.length : 15).map((item, i) => (
              <ReleaseCard key={`rel-${i}`} item={item} />
            ))}
          </div>
          {!showAllReleases && releases.length > 15 && (
            <div className="text-center py-2 border-t border-zinc-100">
              <button
                onClick={() => setShowAllReleases(true)}
                className="text-[12px] text-indigo-500 hover:text-indigo-700 font-medium"
              >
                +{releases.length - 15}개 더 보기
              </button>
            </div>
          )}
        </div>

        {/* Column 3: Official Links */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden h-fit">
          <SectionHeader
            icon={<Link2 className="w-3.5 h-3.5" />}
            title="Official Links"
            subtitle="공식 리소스"
          />
          <div className="p-3 space-y-2">
            <a
              href={meta.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-sm text-zinc-700"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              Official Blog
            </a>
            <a
              href={meta.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-sm text-zinc-700"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              API Documentation
            </a>
            <a
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-sm text-zinc-700"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              Changelog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export function ReleasesClientSection({ data }: { data: ReleasesData }) {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [selectedSource, setSelectedSource] = useState<SourceKey>("anthropic");
  const [timelineFilter, setTimelineFilter] = useState<"all" | SourceKey>("all");
  const [showAll, setShowAll] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const updatedAt = new Date(data.updatedAt);
  const updatedAgo = daysAgo(updatedAt.toISOString().split("T")[0]);

  const youtubeVideos = data.youtubeVideos || [];

  if (viewMode === "detail") {
    return (
      <DetailView
        source={selectedSource}
        releases={data[selectedSource]}
        onBack={() => setViewMode("overview")}
      />
    );
  }

  const filteredTimeline =
    timelineFilter === "all"
      ? data.timeline
      : data.timeline.filter((item) => item.source === timelineFilter);

  const timelineLimit = showAll ? filteredTimeline.length : 20;
  const videoLimit = showAllVideos ? youtubeVideos.length : 6;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">AI Release Notes</h1>
        </div>
        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {updatedAgo}
        </div>
      </div>

      {/* Company cards (clickable -> detail view) */}
      <div className="grid grid-cols-2 gap-3">
        {(["anthropic", "openai"] as const).map((source) => {
          const meta = SOURCE_META[source];
          const items = data[source];
          const latest = items[0]?.date;
          return (
            <button
              key={source}
              onClick={() => {
                setSelectedSource(source);
                setViewMode("detail");
              }}
              className={`${meta.bg} ${meta.border} border rounded-lg px-4 py-3 text-left hover:border-zinc-300 transition-all cursor-pointer group`}
            >
              <div className={`flex items-center gap-2 text-sm font-semibold ${meta.color} group-hover:underline`}>
                <img src={meta.logo} alt={meta.label} className="w-5 h-5 rounded-sm" />
                {meta.label}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">
                최근 업데이트: {latest ? formatDate(latest) : "-"}
              </div>
            </button>
          );
        })}
      </div>

      {/* AI YouTube Videos */}
      {youtubeVideos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-800">AI News YouTube</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {youtubeVideos.slice(0, videoLimit).map((video) => (
              <div key={video.videoId} className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
          {!showAllVideos && youtubeVideos.length > 6 && (
            <div className="text-center mt-2">
              <button
                onClick={() => setShowAllVideos(true)}
                className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
              >
                +{youtubeVideos.length - 6}개 더 보기
              </button>
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-800">타임라인</h2>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-zinc-400" />
            {(
              [
                { key: "all" as const, label: "전체" },
                { key: "anthropic" as const, label: "Anthropic" },
                { key: "openai" as const, label: "OpenAI" },
              ]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTimelineFilter(key)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-colors ${
                  timelineFilter === key
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden divide-y divide-zinc-50">
          {filteredTimeline.slice(0, timelineLimit).map((item, i) => (
            <ReleaseCard key={`tl-${i}`} item={item} showSource />
          ))}
          {filteredTimeline.length === 0 && (
            <div className="text-center py-10 text-sm text-zinc-400">
              해당 소스의 릴리즈가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Show more */}
      {!showAll && filteredTimeline.length > 20 && (
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
          Release Notes · Changelog · YouTube Data API에서 자동 수집
        </span>
      </div>
    </div>
  );
}
