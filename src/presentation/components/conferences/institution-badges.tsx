import { INSTITUTIONS } from "@/shared/constants/institutions";

interface InstitutionBadgesProps {
  ratings: Array<{ institution: string; tier: string | null }>;
}

// BK21 점수별 스타일
const BK21_STYLES: Record<string, string> = {
  "4": "bg-amber-100 text-amber-800 border border-amber-300",
  "3": "bg-sky-100 text-sky-800 border border-sky-300",
  "2": "bg-violet-100 text-violet-700 border border-violet-300",
  "1": "bg-zinc-100 text-zinc-600 border border-zinc-200",
};

// KIISE/POSTECH 등급 스타일
const NAMED_TIER_STYLES: Record<string, string> = {
  "최우수": "bg-amber-100 text-amber-800 border border-amber-300",
  "우수": "bg-sky-100 text-sky-800 border border-sky-300",
};

// KAIST/SNU 인정 스타일 (binary)
const RECOGNIZED_STYLE =
  "bg-emerald-100 text-emerald-800 border border-emerald-300";
const NOT_RECOGNIZED_STYLE =
  "bg-zinc-100 text-zinc-400 border border-zinc-200";

// 기관별 표시 라벨
const SHORT_LABELS: Record<string, string> = {
  BK21: "BK21",
  KIISE: "KIISE",
  KAIST: "KAIST",
  SNU: "SNU",
  POSTECH: "POSTECH",
};

// BK21 점수 표시
const BK21_DISPLAY: Record<string, string> = {
  "4": "4점",
  "3": "3점",
  "2": "2점",
  "1": "1점",
};

function getTierDisplay(institution: string, tier: string | null): { text: string; style: string } {
  if (institution === "BK21") {
    if (tier && BK21_STYLES[tier]) {
      return { text: BK21_DISPLAY[tier] ?? tier, style: BK21_STYLES[tier] };
    }
  }

  if (institution === "KIISE" || institution === "POSTECH") {
    if (tier && NAMED_TIER_STYLES[tier]) {
      return { text: tier, style: NAMED_TIER_STYLES[tier] };
    }
  }

  // KAIST, SNU: binary (recognized = ✓)
  if (tier === null) {
    return { text: "✓", style: RECOGNIZED_STYLE };
  }

  // fallback
  return { text: tier ?? "✓", style: RECOGNIZED_STYLE };
}

export function InstitutionBadges({ ratings }: InstitutionBadgesProps) {
  const ratingMap = new Map(
    ratings.map((r) => [r.institution, r.tier]),
  );

  return (
    <div className="flex gap-1 flex-wrap justify-end">
      {INSTITUTIONS.map((inst) => {
        const isRecognized = ratingMap.has(inst);

        if (!isRecognized) {
          return (
            <div key={inst} className="text-center">
              <div className="text-[10px] text-zinc-400 mb-0.5">
                {SHORT_LABELS[inst] ?? inst}
              </div>
              <span
                className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-medium min-w-[28px] ${NOT_RECOGNIZED_STYLE}`}
              >
                —
              </span>
            </div>
          );
        }

        const tier = ratingMap.get(inst) ?? null;
        const { text, style } = getTierDisplay(inst, tier);

        return (
          <div key={inst} className="text-center">
            <div className="text-[10px] text-zinc-400 mb-0.5">
              {SHORT_LABELS[inst] ?? inst}
            </div>
            <span
              className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-medium min-w-[28px] ${style}`}
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
