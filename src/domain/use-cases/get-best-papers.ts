import type {
  BestPaperRepository,
  BestPaperFilters,
  BestPaperWithConference,
} from "../repositories/best-paper-repository";

export function createGetBestPapersUseCase(repo: BestPaperRepository) {
  return async (
    filters?: BestPaperFilters,
  ): Promise<BestPaperWithConference[]> => {
    const papers = await repo.findAll(filters);
    // 최신 연도 우선
    return papers.sort((a, b) => b.year - a.year);
  };
}
