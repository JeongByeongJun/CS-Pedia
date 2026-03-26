import Link from "next/link";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { FieldBadge } from "@/presentation/components/conferences/field-badge";
import { DeadlineBadge } from "@/presentation/components/conferences/deadline-badge";

interface BookmarkedConferencesProps {
  conferences: ConferenceWithRelations[];
  isKorean?: boolean;
}

export function BookmarkedConferences({
  conferences,
  isKorean = true,
}: BookmarkedConferencesProps) {
  if (conferences.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ padding: "48px 20px", textAlign: "center" }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #f0f4ff, #faf0ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            marginBottom: "16px",
          }}
        >
          📌
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#71717a",
            marginBottom: "12px",
          }}
        >
          {isKorean ? "북마크한 학회가 없습니다" : "No bookmarked conferences"}
        </div>
        <Link
          href="/"
          style={{
            fontSize: "13px",
            color: "#6366f1",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          {isKorean ? "학회 둘러보기 →" : "Browse conferences →"}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {conferences.map((conf) => (
        <Link
          key={conf.id}
          href={`/conferences/${conf.slug}`}
          className="bookmark-card-hover"
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.05)",
            textDecoration: "none",
            transition: "border-color 0.2s, background-color 0.2s",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="font-bold"
                style={{ fontSize: "14px", color: "#18181b" }}
              >
                {conf.acronym}
              </span>
              <FieldBadge field={conf.field} />
              <DeadlineBadge ddays={conf.daysUntilDeadline} />
            </div>
            <span style={{ fontSize: "12px", color: "#d4d4d8" }}>→</span>
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#71717a",
              marginTop: "4px",
            }}
          >
            {conf.nameEn}
          </div>
          {conf.venue && (
            <div
              style={{
                fontSize: "12px",
                color: "#a1a1aa",
                marginTop: "4px",
              }}
            >
              📍 {conf.venue}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
