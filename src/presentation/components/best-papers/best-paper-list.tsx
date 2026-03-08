import Link from "next/link";
import type { BestPaperWithConference } from "@/domain/repositories/best-paper-repository";
import { conferenceUrl, formatAuthors } from "@/shared/utils/url";

interface BestPaperListProps {
  papers: BestPaperWithConference[];
}

const AWARD_LABELS: Record<string, string> = {
  best_paper: "Best Paper",
  best_paper_runner_up: "Runner-up",
  best_student_paper: "Best Student Paper",
  test_of_time: "Test of Time",
};

const AWARD_COLORS: Record<string, string> = {
  best_paper: "#f59e0b",
  best_paper_runner_up: "#a78bfa",
  best_student_paper: "#34d399",
  test_of_time: "#f97316",
};

export function BestPaperList({ papers }: BestPaperListProps) {
  if (papers.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ padding: "64px 20px", textAlign: "center" }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            marginBottom: "16px",
          }}
        >
          🏆
        </div>
        <div style={{ fontSize: "14px", color: "#71717a" }}>
          해당 조건의 Best Paper가 없습니다
        </div>
      </div>
    );
  }

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
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {sortedYears.map((year) => (
        <div key={year}>
          <div className="flex items-center gap-3 mb-4">
            <h2
              className="font-bold"
              style={{
                fontSize: "20px",
                color: "#18181b",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "-0.02em",
              }}
            >
              {year}
            </h2>
            <span
              style={{
                fontSize: "11px",
                color: "#a1a1aa",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              {grouped[year].length} papers
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(0,0,0,0.06)",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "12px",
            }}
          >
            {grouped[year].map((paper) => (
              <div
                key={paper.id}
                className="best-paper-card-hover"
                style={{
                  background: "white",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  padding: "18px 20px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                {/* Header: conference + award */}
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: "10px" }}
                >
                  <Link
                    href={conferenceUrl(paper.conferenceSlug)}
                    className="font-bold"
                    style={{
                      fontSize: "13px",
                      color: "#6366f1",
                      textDecoration: "none",
                    }}
                  >
                    {paper.conferenceAcronym}
                  </Link>
                  <span
                    className="flex items-center"
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: AWARD_COLORS[paper.awardType] ?? "#a1a1aa",
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor:
                          AWARD_COLORS[paper.awardType] ?? "#a1a1aa",
                      }}
                    />
                    {AWARD_LABELS[paper.awardType] ?? paper.awardType}
                  </span>
                </div>

                {/* Title */}
                <div
                  className="font-medium"
                  style={{
                    fontSize: "14px",
                    color: "#18181b",
                    lineHeight: 1.5,
                  }}
                >
                  {paper.paperTitle}
                </div>

                {/* Authors */}
                {paper.authors && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#a1a1aa",
                      marginTop: "6px",
                    }}
                  >
                    {formatAuthors(paper.authors)}
                  </div>
                )}

                {/* Tags */}
                {paper.tags.length > 0 && (
                  <div
                    className="flex flex-wrap"
                    style={{ gap: "4px", marginTop: "10px" }}
                  >
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background: "#f4f4f5",
                          color: "#71717a",
                          fontWeight: 500,
                        }}
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
