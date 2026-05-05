"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { UniversityFilter } from "./university-filter";
import { ProfessorCard } from "./professor-card";
import type { ProfessorWithPublicationCount } from "./professor-card";

interface LabClientSectionProps {
  professors: ProfessorWithPublicationCount[];
}

export function LabClientSection({ professors }: LabClientSectionProps) {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const universities = useMemo(() => {
    const uniq = [...new Set(professors.map((p) => p.university))].sort((a, b) =>
      a.localeCompare(b, "ko")
    );
    return uniq;
  }, [professors]);

  const filtered = useMemo(() => {
    let result = professors;
    if (selectedUniversity) {
      result = result.filter((p) => p.university === selectedUniversity);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.nameKo.toLowerCase().includes(q) ||
          (p.nameEn?.toLowerCase().includes(q) ?? false) ||
          p.university.toLowerCase().includes(q) ||
          (p.department?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [professors, selectedUniversity, searchQuery]);

  const withPublications = useMemo(
    () => professors.filter((p) => p.publicationCount > 0).length,
    [professors]
  );

  const activeFilterCount = [selectedUniversity, searchQuery.trim()].filter(Boolean).length;

  return (
    <>
      {/* 통계 + 검색 */}
      <div className="mb-4">
        <p className="text-[13px] text-zinc-400 mb-3">
          전체{" "}
          <span className="font-semibold text-zinc-600">{professors.length}명</span>
          {" · "}Top conference 논문 있는 교수{" "}
          <span className="font-semibold text-indigo-600">{withPublications}명</span>
          {filtered.length !== professors.length && (
            <>
              {" · "}필터 결과{" "}
              <span className="font-semibold text-zinc-600">{filtered.length}명</span>
            </>
          )}
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setSelectedUniversity(null);
                setSearchQuery("");
              }}
              className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              필터 초기화
            </button>
          )}
        </p>

        {/* 검색 */}
        <div className="relative mb-4">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="이름, 소속, 학과로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl placeholder-zinc-400 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
          />
        </div>

        {/* 대학 필터 */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-4">
          <UniversityFilter
            universities={universities}
            selected={selectedUniversity}
            onSelect={setSelectedUniversity}
          />
        </div>
      </div>

      {/* 카드 그리드 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-3xl mb-3">🔍</div>
          <p className="text-sm font-medium text-zinc-500">검색 결과가 없습니다</p>
          <p className="text-xs text-zinc-400 mt-1">다른 검색어나 필터를 시도해보세요</p>
        </div>
      )}
    </>
  );
}
