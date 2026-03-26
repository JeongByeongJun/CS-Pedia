"use client";

import { useOptimistic, useTransition } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleBookmark } from "@/app/actions/bookmark";
import { useAuth } from "@/presentation/providers/auth-provider";

interface BookmarkButtonProps {
  conferenceId: string;
  initialBookmarked: boolean;
  isLoggedIn: boolean;
}

export function BookmarkButton({
  conferenceId,
  initialBookmarked,
  isLoggedIn: serverIsLoggedIn,
}: BookmarkButtonProps) {
  const auth = useAuth();
  const isLoggedIn = auth.isLoading ? serverIsLoggedIn : auth.isLoggedIn;
  const isBookmarked = auth.isLoading ? initialBookmarked : auth.bookmarkedIds.includes(conferenceId);

  const [isPending, startTransition] = useTransition();
  const [optimisticBookmarked, setOptimisticBookmarked] = useOptimistic(
    isBookmarked,
    (_current, next: boolean) => next,
  );

  function handleClick() {
    if (auth.isLoading) return;
    if (!isLoggedIn) {
      const header = document.querySelector("header");
      header?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    startTransition(async () => {
      setOptimisticBookmarked(!optimisticBookmarked);
      try {
        const result = await toggleBookmark(conferenceId);
        if ("error" in result) {
          setOptimisticBookmarked(optimisticBookmarked);
        }
      } catch {
        setOptimisticBookmarked(optimisticBookmarked);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending || auth.isLoading}
      className={`relative p-2.5 rounded-lg transition-colors before:absolute before:-inset-1 before:content-[''] ${
        optimisticBookmarked
          ? "text-indigo-600 hover:bg-indigo-50"
          : "text-zinc-300 hover:text-zinc-500 hover:bg-zinc-50"
      }`}
      title={optimisticBookmarked ? "북마크 해제" : "북마크 추가"}
    >
      {optimisticBookmarked ? (
        <BookmarkCheck className="w-5 h-5" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  );
}
