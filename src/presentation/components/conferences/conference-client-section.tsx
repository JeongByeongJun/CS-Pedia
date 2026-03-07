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

    if (sort === "alphabetical") {
      return [...result].sort((a, b) => {
        const rankDiff = acronymRank(a) - acronymRank(b);
        if (rankDiff !== 0) return rankDiff;
        return a.acronym.localeCompare(b.acronym);
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
        <ConferenceSearch value={search} onChange={setSearch} />
        <ConferenceFilters
          selectedField={field}
          selectedInstitution={institution}
          selectedSort={sort}
          onFieldChange={setField}
          onInstitutionChange={setInstitution}
          onSortChange={setSort}
        />
      </div>
      <ConferenceList
        conferences={filtered}
        bookmarkedIds={bookmarkedIds}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
