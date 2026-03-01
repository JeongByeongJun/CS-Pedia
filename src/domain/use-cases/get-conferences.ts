import type {
  ConferenceRepository,
  ConferenceFilters,
  ConferenceWithRelations,
} from "../repositories/conference-repository";

export type SortMode = "deadline" | "alphabetical";

export interface GetConferencesInput {
  filters?: ConferenceFilters;
  sort?: SortMode;
}

export function createGetConferencesUseCase(repo: ConferenceRepository) {
  return async (
    input: GetConferencesInput = {},
  ): Promise<ConferenceWithRelations[]> => {
    const conferences = await repo.findAll(input.filters);

    if (input.sort === "alphabetical") {
      return conferences.sort((a, b) => a.acronym.localeCompare(b.acronym));
    }

    // 기본: 데드라인 순 (다가오는 것 우선, 마감된 것 뒤로)
    return conferences.sort((a, b) => {
      const aDays = a.daysUntilDeadline ?? Infinity;
      const bDays = b.daysUntilDeadline ?? Infinity;

      if (aDays < 0 && bDays >= 0) return 1;
      if (aDays >= 0 && bDays < 0) return -1;
      if (aDays < 0 && bDays < 0) return bDays - aDays;
      return aDays - bDays;
    });
  };
}
