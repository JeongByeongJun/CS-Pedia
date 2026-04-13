import { describe, it, expect } from "vitest";
import {
  createGetConferencesUseCase,
  type SortMode,
} from "../get-conferences";
import type {
  ConferenceRepository,
  ConferenceWithRelations,
} from "../../repositories/conference-repository";

function makeConference(
  overrides: Partial<ConferenceWithRelations>,
): ConferenceWithRelations {
  return {
    id: "id-1",
    slug: "test-conf",
    nameEn: "Test Conference",
    nameKr: null,
    acronym: "TEST",
    field: "AI/ML",
    subField: "General",
    dblpKey: "conf/test",
    websiteUrl: "https://test.conf",
    description: null,
    nextDeadline: null,
    daysUntilDeadline: null,
    deadlineTimezone: "AoE",
    abstractDeadline: null,
    notificationDate: null,
    venue: null,
    conferenceStart: null,
    conferenceEnd: null,
    institutionRatings: [],
    latestBestPapers: [],
    ...overrides,
  };
}

function makeMockRepo(
  conferences: ConferenceWithRelations[],
): ConferenceRepository {
  return {
    findAll: async () => [...conferences],
    findBySlug: async (slug: string) =>
      conferences.find((c) => c.slug === slug) ?? null,
    findSlugs: async () => conferences.map((c) => c.slug),
  };
}

describe("createGetConferencesUseCase — deadline sort (default)", () => {
  it("sorts upcoming deadlines by closest first", async () => {
    const conferences = [
      makeConference({ acronym: "FAR", daysUntilDeadline: 60 }),
      makeConference({ acronym: "CLOSE", daysUntilDeadline: 3 }),
      makeConference({ acronym: "MID", daysUntilDeadline: 20 }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();

    expect(result.map((c) => c.acronym)).toEqual(["CLOSE", "MID", "FAR"]);
  });

  it("puts passed deadlines (negative days) after upcoming ones", async () => {
    const conferences = [
      makeConference({ acronym: "PASSED", daysUntilDeadline: -5 }),
      makeConference({ acronym: "UPCOMING", daysUntilDeadline: 10 }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();

    expect(result.map((c) => c.acronym)).toEqual(["UPCOMING", "PASSED"]);
  });

  it("sorts passed deadlines by most recently passed first", async () => {
    const conferences = [
      makeConference({ acronym: "LONG_AGO", daysUntilDeadline: -30 }),
      makeConference({ acronym: "RECENT", daysUntilDeadline: -2 }),
      makeConference({ acronym: "MEDIUM", daysUntilDeadline: -10 }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();

    expect(result.map((c) => c.acronym)).toEqual([
      "RECENT",
      "MEDIUM",
      "LONG_AGO",
    ]);
  });

  it("puts conferences with no deadline (null) at the end", async () => {
    const conferences = [
      makeConference({ acronym: "NO_DL", daysUntilDeadline: null }),
      makeConference({ acronym: "HAS_DL", daysUntilDeadline: 5 }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();

    expect(result.map((c) => c.acronym)).toEqual(["HAS_DL", "NO_DL"]);
  });

  it("null deadlines sort before passed but after upcoming", async () => {
    const conferences = [
      makeConference({ acronym: "NULL", daysUntilDeadline: null }),
      makeConference({ acronym: "PASSED", daysUntilDeadline: -3 }),
      makeConference({ acronym: "UPCOMING", daysUntilDeadline: 10 }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();

    // null → Infinity (treated as non-negative, far future), passed → negative (pushed to end)
    expect(result.map((c) => c.acronym)).toEqual([
      "UPCOMING",
      "NULL",
      "PASSED",
    ]);
  });
});

describe("createGetConferencesUseCase — alphabetical sort", () => {
  it("sorts by acronym alphabetically", async () => {
    const conferences = [
      makeConference({ acronym: "NeurIPS" }),
      makeConference({ acronym: "AAAI" }),
      makeConference({ acronym: "ICML" }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences({ sort: "alphabetical" });

    expect(result.map((c) => c.acronym)).toEqual(["AAAI", "ICML", "NeurIPS"]);
  });
});

describe("createGetConferencesUseCase — edge cases", () => {
  it("returns empty array for no conferences", async () => {
    const getConferences = createGetConferencesUseCase(makeMockRepo([]));
    const result = await getConferences();
    expect(result).toEqual([]);
  });

  it("handles single conference", async () => {
    const conferences = [
      makeConference({ acronym: "SOLO", daysUntilDeadline: 5 }),
    ];
    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();
    expect(result).toHaveLength(1);
    expect(result[0].acronym).toBe("SOLO");
  });

  it("handles D-Day (daysUntilDeadline = 0) correctly", async () => {
    const conferences = [
      makeConference({ acronym: "TOMORROW", daysUntilDeadline: 1 }),
      makeConference({ acronym: "TODAY", daysUntilDeadline: 0 }),
      makeConference({ acronym: "YESTERDAY", daysUntilDeadline: -1 }),
    ];

    const getConferences = createGetConferencesUseCase(
      makeMockRepo(conferences),
    );
    const result = await getConferences();

    expect(result.map((c) => c.acronym)).toEqual([
      "TODAY",
      "TOMORROW",
      "YESTERDAY",
    ]);
  });
});
