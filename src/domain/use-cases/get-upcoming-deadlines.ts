import type {
  DeadlineRepository,
  DeadlineWithConference,
} from "../repositories/deadline-repository";

export function createGetUpcomingDeadlinesUseCase(repo: DeadlineRepository) {
  return async (limit = 10): Promise<DeadlineWithConference[]> => {
    return repo.findUpcoming(limit);
  };
}
