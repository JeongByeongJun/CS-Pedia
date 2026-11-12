"use client";

import { useState, useMemo } from "react";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { ConferenceSearch } from "./conference-search";
import { ConferenceFilters } from "./conference-filters";
import { ConferenceList } from "./conference-list";
import { useLocale } from "@/presentation/hooks/use-locale";
import { useAuth } from "@/presentation/providers/auth-provider";
import { deadlineToUTC } from "@/shared/utils/date";
import styles from "./conference-index.module.css";

const STORAGE_KEY = "cs-pedia-filters";

function usePersistedState<T>(key: string, defaultValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed[key] ?? defaultValue;
      }
    } catch {}
    return defaultValue;
  });

  const setPersisted = (v: T) => {
    setValue(v);
    try {
      const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
      stored[key] = v;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {}
  };

  return [value, setPersisted];
}

interface ConferenceClientSectionProps {
  conferences: ConferenceWithRelations[];
  bookmarkedIds: string[];
  isLoggedIn: boolean;
}

export function ConferenceClientSection({
  conferences,
  bookmarkedIds: serverBookmarkedIds,
  isLoggedIn: serverIsLoggedIn,
}: ConferenceClientSectionProps) {
  const { isKorean } = useLocale();
  const auth = useAuth();
  const bookmarkedIds = auth.isLoading ? serverBookmarkedIds : auth.bookmarkedIds;
  const isLoggedIn = auth.isLoading ? serverIsLoggedIn : auth.isLoggedIn;
  const [search, setSearch] = usePersistedState("q", "");
  const [field, setField] = usePersistedState("field", "");
  const [institution, setInstitution] = usePersistedState("institution", "");
  const [sort, setSort] = usePersistedState("sort", "deadline");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [field, institution].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = conferences;

    if (field) {
      result = result.filter((c) => c.field === field);
    }

    if (institution) {
      result = result.filter((c) =>
        c.institutionRatings.some((r) => r.institution === institution && r.tier != null),
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.acronym.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          (c.nameKr ?? "").toLowerCase().includes(q),
      );
    }

    const acronymRank = (c: ConferenceWithRelations) => {
      if (!search) return 0;
      const q = search.toLowerCase();
      return c.acronym.toLowerCase().includes(q) ? 0 : 1;
    };

    const getBK21Score = (c: ConferenceWithRelations) => {
      const r = c.institutionRatings.find((r) => r.institution === "BK21");
      return r ? parseInt(r.tier ?? "0") || 0 : 0;
    };

    const getCOREScore = (c: ConferenceWithRelations) => {
      const r = c.institutionRatings.find((r) => r.institution === "CORE");
      const tier = r?.tier;
      if (tier === "A*") return 4;
      if (tier === "A") return 3;
      if (tier === "B") return 2;
      if (tier === "C") return 1;
      return 0;
    };

    if (sort === "alphabetical") {
      return [...result].sort((a, b) => {
        const rankDiff = acronymRank(a) - acronymRank(b);
        if (rankDiff !== 0) return rankDiff;
        return a.acronym.localeCompare(b.acronym);
      });
    }

    if (sort === "bk21") {
      const scoreFn = isKorean ? getBK21Score : getCOREScore;
      return [...result].sort((a, b) => {
        const rankDiff = acronymRank(a) - acronymRank(b);
        if (rankDiff !== 0) return rankDiff;
        return scoreFn(b) - scoreFn(a);
      });
    }

    const liveDdays = (c: ConferenceWithRelations) => {
      if (!c.nextDeadline) return Infinity;
      const utc = deadlineToUTC(c.nextDeadline, c.deadlineTimezone);
      const deadlineDate = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
      const now = new Date();
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return Math.round((deadlineDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
    };

    return [...result].sort((a, b) => {
      const rankDiff = acronymRank(a) - acronymRank(b);
      if (rankDiff !== 0) return rankDiff;
      const aDays = liveDdays(a);
      const bDays = liveDdays(b);
      if (aDays < 0 && bDays >= 0) return 1;
      if (aDays >= 0 && bDays < 0) return -1;
      if (aDays < 0 && bDays < 0) return bDays - aDays;
      return aDays - bDays;
    });
  }, [conferences, field, institution, search, sort, isKorean]);

  return (
    <>
      <section className={styles.masthead} aria-labelledby="conference-heading">
        <div>
          <p className="desk-kicker">THE CONFERENCE INDEX</p>
          <h1 id="conference-heading" className="desk-title">{isKorean ? "학회 탐색" : "Conference index"}</h1>
          <p className="desk-intro">{isKorean ? "다음 연구가 향할 곳. 마감일과 학회 정보, 주목할 논문을 한곳에서." : "Find the next home for your research. Deadlines, venue rankings, and notable papers."}</p>
        </div>
        <div className={styles.indexNote}>
          <span>{isKorean ? "컴퓨터공학 학회" : "Computer science venues"}</span>
          <strong>{conferences.length}<span> / CS</span></strong>
        </div>
      </section>
      <section className={styles.controls} aria-label={isKorean ? "학회 검색 및 필터" : "Search and filter conferences"}>
        <div className={styles.searchRow}>
          <div className={styles.searchWrap}>
            <ConferenceSearch value={search} onChange={setSearch} />
          </div>
          <button
            className={styles.filterToggle}
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="conference-filters"
          >
            {isKorean ? "필터" : "Filter"}
            {activeFilterCount > 0 && <span> ({activeFilterCount})</span>}
            <span aria-hidden="true"> {showFilters ? "−" : "+"}</span>
          </button>
        </div>
        <div id="conference-filters" className={`${styles.filterPanel} ${showFilters ? styles.filterPanelOpen : ""}`}>
          <ConferenceFilters
            selectedField={field}
            selectedInstitution={institution}
            selectedSort={sort}
            onFieldChange={setField}
            onInstitutionChange={setInstitution}
            onSortChange={setSort}
          />
        </div>
      </section>
      <div className={styles.resultBar}>
        <p aria-live="polite" aria-atomic="true">
          {isKorean
            ? `${filtered.length}개 학회`
            : `${filtered.length} conferences`}
        </p>
        <p>
          {isKorean ? "데이터 업데이트: 2026.11.12" : "Updated: 2026.11.12"}
        </p>
      </div>
      <ConferenceList
        conferences={filtered}
        bookmarkedIds={bookmarkedIds}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
