"use client";

import { useLocale } from "@/presentation/hooks/use-locale";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";
import { INSTITUTIONS_KR, INSTITUTIONS_INTL } from "@/shared/constants/institutions";
import styles from "@/app/conferences/[slug]/detail.module.css";

interface InstitutionRatingsProps {
  ratings: Array<{ institution: string; tier: string | null }>;
}

export function InstitutionRatings({ ratings }: InstitutionRatingsProps) {
  const { isKorean } = useLocale();

  const institutions = isKorean ? INSTITUTIONS_KR : INSTITUTIONS_INTL;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {isKorean
          ? <>{`기관 인정 현황`}<InfoTooltip text="BK21: 2018년 BK21플러스 점수 기준 (1~4점) · KIISE: 2024년 한국정보과학회 기준 (최우수/우수) · POSTECH: 2026년 기준 (최우수/우수) · KAIST: 2022년 인정 기준 · SNU: 2024년 인정 기준. 기준이 개정될 수 있으니 중요한 사항은 소속 기관에 직접 확인하세요." /></>
          : <>{`Rankings`}<InfoTooltip text="CORE: Australian Research Council 2023 ranking (A*/A/B/C) · CCF: China Computer Federation 2022 ranking (A/B/C) · CSRankings: Included in csrankings.org venue list for university rankings." /></>
        }
      </h2>
      <dl className={styles.ratings}>
        {institutions.map((inst) => {
          const rating = ratings.find((r) => r.institution === inst);
          const tier = rating?.tier as string | null;
          const hasTier = tier != null;

          let displayTier = "\u2014";
          if (hasTier) {
            if (inst === "BK21") displayTier = isKorean ? `${tier}\uC810` : tier;
            else if (inst === "CSRankings" || inst === "SNU") displayTier = isKorean ? "\uC778\uC815" : "Listed";
            else displayTier = tier;
          }

          const isTop = hasTier && (tier === "\uCD5C\uC6B0\uC218" || tier === "A*" || tier === "4" || (inst === "CCF" && tier === "A"));
          const label = inst === "POSTECH" ? "POST" : inst;

          return (
            <div key={inst} className={`${styles.rating} ${isTop ? styles.ratingTop : ""} ${hasTier ? "" : styles.ratingNone}`}>
              <dt>{label}</dt>
              <dd>{displayTier}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
