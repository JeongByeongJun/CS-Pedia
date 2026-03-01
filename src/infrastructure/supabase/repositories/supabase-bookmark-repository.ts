import { createSupabaseServerClient } from "../server";
import type { BookmarkRepository } from "@/domain/repositories/bookmark-repository";
import type { Bookmark } from "@/domain/entities/bookmark";
import type { Database } from "../types/database.types";

type BookmarkRow = Database["public"]["Tables"]["bookmarks"]["Row"];
type BookmarkInsert = Database["public"]["Tables"]["bookmarks"]["Insert"];

export class SupabaseBookmarkRepository implements BookmarkRepository {
  async findByUserId(userId: string): Promise<Bookmark[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return ((data ?? []) as BookmarkRow[]).map((row) => ({
      id: row.id,
      userId: row.user_id,
      conferenceId: row.conference_id,
      notifyBeforeDays: row.notify_before_days,
    }));
  }

  async toggle(userId: string, conferenceId: string): Promise<boolean> {
    const supabase = await createSupabaseServerClient();

    const { data: existing } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", userId)
      .eq("conference_id", conferenceId)
      .single();

    if (existing) {
      await supabase.from("bookmarks").delete().eq("id", (existing as { id: string }).id);
      return false;
    }

    const insertData: BookmarkInsert = {
      user_id: userId,
      conference_id: conferenceId,
    };
    await supabase.from("bookmarks").insert(insertData as never);
    return true;
  }

  async isBookmarked(userId: string, conferenceId: string): Promise<boolean> {
    const supabase = await createSupabaseServerClient();

    const { data } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", userId)
      .eq("conference_id", conferenceId)
      .single();

    return !!data;
  }
}
