"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { bookmarkRepo } from "@/infrastructure/container";

async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function toggleBookmark(
  conferenceId: string,
): Promise<{ error: string } | { isBookmarked: boolean }> {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "로그인이 필요합니다." };

  const isBookmarked = await bookmarkRepo.toggle(userId, conferenceId);
  revalidatePath("/");
  return { isBookmarked };
}

export async function getBookmarkStatus(conferenceId: string) {
  const userId = await getCurrentUserId();
  if (!userId) return false;
  return bookmarkRepo.isBookmarked(userId, conferenceId);
}

export async function getBookmarkCount() {
  const userId = await getCurrentUserId();
  if (!userId) return 0;
  const bookmarks = await bookmarkRepo.findByUserId(userId);
  return bookmarks.length;
}

export async function getUserBookmarkedIds(): Promise<string[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  const bookmarks = await bookmarkRepo.findByUserId(userId);
  return bookmarks.map((b) => b.conferenceId);
}
