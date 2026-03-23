"use client";

import { useOptimistic, useTransition } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleBookmark } from "@/app/actions/bookmark";

interface BookmarkButtonProps {
  conferenceId: string;
  initialBookmarked: boolean;
  isLoggedIn: boolean;
}

export function BookmarkButton({
  conferenceId,
  initialBookmarked,
  isLoggedIn,
}: BookmarkButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticBookmarked, setOptimisticBookmarked] = useOptimistic(
    initialBookmarked,
    (_current, next: boolean) => next,
  );

  function handleClick() {
    if (!isLoggedIn) {
      // 헤더의 로그인 버튼으로 시선 유도
      const header = document.querySelector("header");
      header?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    startTransition(async () => {
      setOptimisticBookmarked(!optimisticBookmarked);
      await toggleBookmark(conferenceId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
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
