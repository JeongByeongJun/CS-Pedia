"use client";

import { useState, useMemo } from "react";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { ConferenceSearch } from "./conference-search";
import { ConferenceFilters } from "./conference-filters";
import { ConferenceList } from "./conference-list";

interface ConferenceClientSectionProps {
  conferences: ConferenceWithRelations[];
  bookmarkedIds: string[];
  isLoggedIn: boolean;
}

export function ConferenceClientSection({
  conferences,
  bookmarkedIds,
  isLoggedIn,
}: ConferenceClientSectionProps) {
  const [search, setSearch] = useState("");
  const [field, setField] = useState("");
  const [institution, setInstitution] = useState("");
  const [sort, setSort] = useState("deadline");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [field, institution].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = conferences;

    if (field) {
      result = result.filter((c) => c.field === field);
    }

    if (institution) {
      result = result.filter((c) =>
        c.institutionRatings.some((r) => r.institution === institution),
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

    if (sort === "alphabetical") {
      return [...result].sort((a, b) => {
        const rankDiff = acronymRank(a) - acronymRank(b);
        if (rankDiff !== 0) return rankDiff;
        return a.acronym.localeCompare(b.acronym);
      });
    }

    if (sort === "bk21") {
      return [...result].sort((a, b) => {
        const rankDiff = acronymRank(a) - acronymRank(b);
        if (rankDiff !== 0) return rankDiff;
        return getBK21Score(b) - getBK21Score(a);
      });
    }

    return [...result].sort((a, b) => {
      const rankDiff = acronymRank(a) - acronymRank(b);
      if (rankDiff !== 0) return rankDiff;
      const aDays = a.daysUntilDeadline ?? Infinity;
      const bDays = b.daysUntilDeadline ?? Infinity;
      if (aDays < 0 && bDays >= 0) return 1;
      if (aDays >= 0 && bDays < 0) return -1;
      if (aDays < 0 && bDays < 0) return bDays - aDays;
      return aDays - bDays;
    });
  }, [conferences, field, institution, search, sort]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <ConferenceSearch value={search} onChange={setSearch} />
          </div>
          <button
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-all shrink-0"
            onClick={() => setShowFilters((v) => !v)}
          >
            필터
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px]">
                {activeFilterCount}
              </span>
            )}
            <span className="text-xs">{showFilters ? "▲" : "▼"}</span>
          </button>
        </div>
        <div className={`${showFilters ? "block" : "hidden"} md:block border-t border-zinc-100 pt-4 mt-1`}>
          <ConferenceFilters
            selectedField={field}
            selectedInstitution={institution}
            selectedSort={sort}
            onFieldChange={setField}
            onInstitutionChange={setInstitution}
            onSortChange={setSort}
          />
        </div>
      </div>
      <ConferenceList
        conferences={filtered}
        bookmarkedIds={bookmarkedIds}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
