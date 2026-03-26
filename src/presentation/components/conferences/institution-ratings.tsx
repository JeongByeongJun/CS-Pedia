"use client";

import { useLocale } from "@/presentation/hooks/use-locale";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";
import { INSTITUTIONS_KR, INSTITUTIONS_INTL } from "@/shared/constants/institutions";

interface InstitutionRatingsProps {
  ratings: Array<{ institution: string; tier: string | null }>;
}

export function InstitutionRatings({ ratings }: InstitutionRatingsProps) {
  const { isKorean } = useLocale();

  const institutions = isKorean ? INSTITUTIONS_KR : INSTITUTIONS_INTL;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6 mb-6">
      <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center">
        {isKorean
          ? <>{`기관 인정 현황`}<InfoTooltip text="BK21: 2018년 BK21플러스 점수 기준 (1~4점) · KIISE: 2024년 한국정보과학회 기준 (최우수/우수) · POSTECH: 2026년 기준 (최우수/우수) · KAIST: 2022년 인정 기준 · SNU: 2024년 인정 기준. 기준이 개정될 수 있으니 중요한 사항은 소속 기관에 직접 확인하세요." /></>
          : <>{`Rankings`}<InfoTooltip text="CORE: Australian Research Council 2023 ranking (A*/A/B/C) · CCF: China Computer Federation 2022 ranking (A/B/C) · CSRankings: Included in csrankings.org venue list for university rankings." /></>
        }
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {institutions.map((inst) => {
          const rating = ratings.find((r) => r.institution === inst);
          const tier = rating?.tier as string | null;
          const hasTier = tier != null;

          let displayTier = "\u2014";
          if (hasTier) {
            if (inst === "BK21") displayTier = `${tier}\uC810`;
            else if (inst === "CSRankings" || inst === "SNU") displayTier = "\u2713";
            else displayTier = tier;
          }

          const label = inst === "POSTECH" ? "POST" : inst;
          let cardStyle = "bg-zinc-50 border-zinc-200";
          let textStyle = "text-zinc-300";
          if (hasTier) {
            const isTop = tier === "\uCD5C\uC6B0\uC218" || tier === "A*" || tier === "4" || (inst === "CCF" && tier === "A");
            const isMid = tier === "\uC6B0\uC218" || tier === "3" || (inst === "CCF" && tier === "B") || (inst === "CORE" && tier === "A");
            const isLow = tier === "B" || tier === "C" || tier === "2" || tier === "1";
            if (isTop) {
              cardStyle = "bg-amber-50 border-amber-200";
              textStyle = "text-amber-700";
            } else if (isMid) {
              cardStyle = "bg-sky-50 border-sky-200";
              textStyle = "text-sky-700";
            } else if (isLow) {
              cardStyle = "bg-violet-50 border-violet-200";
              textStyle = "text-violet-600";
            } else {
              cardStyle = "bg-emerald-50 border-emerald-200";
              textStyle = "text-emerald-700";
            }
          }

          return (
            <div
              key={inst}
              className={`rounded-xl p-3 text-center border ${cardStyle}`}
            >
              <div className="text-xs text-zinc-500 mb-1">{label}</div>
              <div className={`text-lg font-bold ${textStyle}`}>
                {displayTier}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
