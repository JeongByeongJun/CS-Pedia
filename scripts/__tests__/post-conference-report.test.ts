import { describe, expect, it } from "vitest";
import { buildPostConferenceCandidates } from "../post-conference-report";

const asOf = new Date("2026-06-01T00:00:00Z");

describe("buildPostConferenceCandidates", () => {
  it("classifies ended conferences for best paper and keyword follow-up", () => {
    const result = buildPostConferenceCandidates({
      deadlines: [
        {
          conference_slug: "doneconf",
          year: 2026,
          cycle: "main",
          conference_start: "2026-04-01",
          conference_end: "2026-04-05",
          venue: "Seoul",
        },
        {
          conference_slug: "checkconf",
          year: 2026,
          cycle: "main",
          conference_start: "2026-05-01",
          conference_end: "2026-05-03",
          venue: "Busan",
        },
      ],
      conferences: [
        {
          slug: "doneconf",
          acronym: "DONE",
          name_en: "Done Conference",
          field: "AI/ML",
          dblp_key: "conf/done",
          website_url: "https://done.example",
        },
        {
          slug: "checkconf",
          acronym: "CHECK",
          name_en: "Check Conference",
          field: "Systems",
          dblp_key: "conf/check",
          website_url: "https://check.example",
        },
      ],
      bestPapers: [{ conference_slug: "doneconf", year: 2026 }],
      keywordCountFor: (slug) => (slug === "doneconf" ? 7 : 0),
      options: {
        asOf,
        lookbackDays: 120,
        upcomingDays: 30,
        keywordLagDays: 21,
      },
    });

    expect(result.upcoming).toEqual([]);
    expect(result.recent).toMatchObject([
      {
        slug: "checkconf",
        bestPaperStatus: "check",
        keywordStatus: "ready",
      },
      {
        slug: "doneconf",
        bestPaperStatus: "done",
        keywordStatus: "done",
      },
    ]);
  });

  it("keeps upcoming conferences separate and marks best paper as too early", () => {
    const result = buildPostConferenceCandidates({
      deadlines: [
        {
          conference_slug: "futureconf",
          year: 2026,
          cycle: "main",
          conference_start: "2026-06-10",
          conference_end: "2026-06-15",
          venue: "Tokyo",
        },
      ],
      conferences: [
        {
          slug: "futureconf",
          acronym: "FUT",
          name_en: "Future Conference",
          field: "Theory",
          dblp_key: null,
          website_url: null,
        },
      ],
      bestPapers: [],
      keywordCountFor: () => 0,
      options: {
        asOf,
        lookbackDays: 120,
        upcomingDays: 30,
        keywordLagDays: 21,
      },
    });

    expect(result.recent).toEqual([]);
    expect(result.upcoming).toMatchObject([
      {
        slug: "futureconf",
        daysSinceEnd: -14,
        bestPaperStatus: "too-early",
        keywordStatus: "no-dblp",
      },
    ]);
  });
});
