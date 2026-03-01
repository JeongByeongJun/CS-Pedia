import type { Database } from "../types/database.types";
import type { BestPaper } from "@/domain/entities/best-paper";
import type { AwardType } from "@/domain/entities/best-paper";

type BestPaperRow = Database["public"]["Tables"]["best_papers"]["Row"];

export function toDomainBestPaper(row: BestPaperRow): BestPaper {
  return {
    id: row.id,
    conferenceId: row.conference_id,
    year: row.year,
    paperTitle: row.paper_title,
    authors: row.authors,
    awardType: row.award_type as AwardType,
    abstract: row.abstract,
    paperUrl: row.paper_url,
    doi: row.doi,
    tags: row.tags ?? [],
  };
}
