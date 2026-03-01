import Link from "next/link";
import type { BestPaperWithConference } from "@/domain/repositories/best-paper-repository";
import { conferenceUrl } from "@/shared/utils/url";

interface BestPaperListProps {
  papers: BestPaperWithConference[];
}

const AWARD_LABELS: Record<string, string> = {
  best_paper: "Best Paper",
  best_paper_runner_up: "Best Paper Runner-up",
  best_student_paper: "Best Student Paper",
  test_of_time: "Test of Time",
};

export function BestPaperList({ papers }: BestPaperListProps) {
  if (papers.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <div className="text-4xl mb-3">🏆</div>
        <div className="text-sm">해당 조건의 Best Paper가 없습니다</div>
      </div>
    );
  }

  // 연도별 그룹핑
  const grouped = papers.reduce(
    (acc, paper) => {
      const year = paper.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(paper);
      return acc;
    },
    {} as Record<number, BestPaperWithConference[]>,
  );

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      {sortedYears.map((year) => (
        <div key={year}>
          <h2 className="text-lg font-bold text-zinc-800 mb-3">{year}</h2>
          <div className="space-y-3">
            {grouped[year].map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-2xl border border-zinc-200/80 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={conferenceUrl(paper.conferenceSlug)}
                    className="text-sm font-bold text-indigo-600 hover:underline"
                  >
                    {paper.conferenceAcronym}
                  </Link>
                  <span className="text-xs text-zinc-400">
                    {AWARD_LABELS[paper.awardType] ?? paper.awardType}
                  </span>
                </div>
                <div className="font-medium text-zinc-900">
                  {paper.paperTitle}
                </div>
                {paper.authors && (
                  <div className="text-sm text-zinc-500 mt-1">
                    {paper.authors}
                  </div>
                )}
                {paper.tags.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-zinc-50 rounded-md text-zinc-500 border border-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
