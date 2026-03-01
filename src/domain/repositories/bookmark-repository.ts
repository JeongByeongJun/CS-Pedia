import type { Bookmark } from "../entities/bookmark";

export interface BookmarkRepository {
  findByUserId(userId: string): Promise<Bookmark[]>;
  toggle(userId: string, conferenceId: string): Promise<boolean>;
  isBookmarked(userId: string, conferenceId: string): Promise<boolean>;
}
