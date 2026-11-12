import { INSTITUTIONS_KR, INSTITUTIONS_INTL } from "@/shared/constants/institutions";
import styles from "./conference-index.module.css";

interface InstitutionBadgesProps {
  ratings: Array<{ institution: string; tier: string | null }>;
  isKorean: boolean;
}

function getTierDisplay(institution: string, tier: string | null, isKorean: boolean) {
  if (!tier) return "—";
  if (institution === "BK21") return isKorean ? `${tier}점` : tier;
  if (institution === "CSRankings" || institution === "SNU") return isKorean ? "인정" : "Listed";
  return tier;
}

export function InstitutionBadges({ ratings, isKorean }: InstitutionBadgesProps) {
  const institutions = isKorean ? INSTITUTIONS_KR : INSTITUTIONS_INTL;
  const ratingMap = new Map(ratings.map((rating) => [rating.institution, rating.tier]));
  return (
    <dl className={styles.ratings}>
      {institutions.map((institution) => {
        const tier = ratingMap.get(institution) ?? null;
        return (
          <div key={institution}>
            <dt>{institution === "POSTECH" ? "POST" : institution}</dt>
            <dd className={tier ? styles.recognized : styles.notRecognized}>{getTierDisplay(institution, tier, isKorean)}</dd>
          </div>
        );
      })}
    </dl>
  );
}
