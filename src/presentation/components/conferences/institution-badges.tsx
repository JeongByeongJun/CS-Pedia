import { INSTITUTIONS_KR, INSTITUTIONS_INTL } from "@/shared/constants/institutions";

interface InstitutionBadgesProps {
  ratings: Array<{ institution: string; tier: string | null }>;
  isKorean: boolean;
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

// CORE 등급 스타일
const CORE_STYLES: Record<string, string> = {
  "A*": "bg-amber-100 text-amber-800 border border-amber-300",
  "A": "bg-sky-100 text-sky-800 border border-sky-300",
  "B": "bg-violet-100 text-violet-700 border border-violet-300",
  "C": "bg-zinc-100 text-zinc-600 border border-zinc-200",
};

// CCF 등급 스타일
const CCF_STYLES: Record<string, string> = {
  "A": "bg-amber-100 text-amber-800 border border-amber-300",
  "B": "bg-sky-100 text-sky-800 border border-sky-300",
  "C": "bg-violet-100 text-violet-700 border border-violet-300",
};

const RECOGNIZED_STYLE =
  "bg-emerald-100 text-emerald-800 border border-emerald-300";
const NOT_RECOGNIZED_STYLE =
  "bg-zinc-100 text-zinc-400 border border-zinc-200";

// BK21 점수 표시
const BK21_DISPLAY: Record<string, string> = {
  "4": "4점",
  "3": "3점",
  "2": "2점",
  "1": "1점",
};

function getTierDisplay(institution: string, tier: string | null): { text: string; style: string } {
  if (!tier) {
    return { text: "—", style: NOT_RECOGNIZED_STYLE };
  }

  if (institution === "BK21") {
    return { text: BK21_DISPLAY[tier] ?? tier, style: BK21_STYLES[tier] ?? RECOGNIZED_STYLE };
  }

  if (institution === "KIISE" || institution === "POSTECH") {
    return { text: tier, style: NAMED_TIER_STYLES[tier] ?? RECOGNIZED_STYLE };
  }

  if (institution === "CORE") {
    return { text: tier, style: CORE_STYLES[tier] ?? RECOGNIZED_STYLE };
  }

  if (institution === "CCF") {
    return { text: tier, style: CCF_STYLES[tier] ?? RECOGNIZED_STYLE };
  }

  if (institution === "CSRankings") {
    return { text: "✓", style: RECOGNIZED_STYLE };
  }

  // KAIST, SNU: binary
  return { text: "✓", style: RECOGNIZED_STYLE };
}

export function InstitutionBadges({ ratings, isKorean }: InstitutionBadgesProps) {
  const institutions = isKorean ? INSTITUTIONS_KR : INSTITUTIONS_INTL;
  const ratingMap = new Map(
    ratings.map((r) => [r.institution, r.tier]),
  );

  return (
    <div className="flex gap-1 flex-wrap justify-end">
      {institutions.map((inst) => {
        const tier = ratingMap.get(inst) ?? null;
        const { text, style } = getTierDisplay(inst, tier);

        return (
          <div key={inst} className="text-center">
            <div className="text-[10px] text-zinc-400 mb-0.5">
              {inst}
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
