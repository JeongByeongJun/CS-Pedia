import { SupabaseConferenceRepository } from "./supabase/repositories/supabase-conference-repository";
import { SupabaseDeadlineRepository } from "./supabase/repositories/supabase-deadline-repository";
import { SupabaseBestPaperRepository } from "./supabase/repositories/supabase-best-paper-repository";
import { SupabaseInstitutionRatingRepository } from "./supabase/repositories/supabase-institution-rating-repository";
import { SupabaseAcceptanceRateRepository } from "./supabase/repositories/supabase-acceptance-rate-repository";
import { SupabaseBookmarkRepository } from "./supabase/repositories/supabase-bookmark-repository";

import { createGetConferencesUseCase } from "@/domain/use-cases/get-conferences";
import { createGetConferenceDetailUseCase } from "@/domain/use-cases/get-conference-detail";
import { createGetBestPapersUseCase } from "@/domain/use-cases/get-best-papers";
import { createGetUpcomingDeadlinesUseCase } from "@/domain/use-cases/get-upcoming-deadlines";

// Repository instances
const conferenceRepo = new SupabaseConferenceRepository();
const deadlineRepo = new SupabaseDeadlineRepository();
const bestPaperRepo = new SupabaseBestPaperRepository();
const ratingRepo = new SupabaseInstitutionRatingRepository();
const acceptanceRateRepo = new SupabaseAcceptanceRateRepository();
const bookmarkRepo = new SupabaseBookmarkRepository();

// Use cases
export const getConferences = createGetConferencesUseCase(conferenceRepo);
export const getConferenceDetail = createGetConferenceDetailUseCase(
  conferenceRepo,
  deadlineRepo,
  bestPaperRepo,
  ratingRepo,
  acceptanceRateRepo,
);
export const getBestPapers = createGetBestPapersUseCase(bestPaperRepo);
export const getUpcomingDeadlines =
  createGetUpcomingDeadlinesUseCase(deadlineRepo);

// Repository exports (Server Actions에서 직접 사용)
export { bookmarkRepo };
