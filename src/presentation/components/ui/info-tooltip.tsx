"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useLocale } from "@/presentation/hooks/use-locale";

export function InfoTooltip({ text, textEn }: { text: string; textEn?: string }) {
  const { isKorean } = useLocale();
  const displayText = (!isKorean && textEn) ? textEn : text;
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <span
          className="relative ml-1.5 w-4 h-4 rounded-full bg-zinc-200 text-zinc-500 text-[10px] font-bold inline-flex items-center justify-center hover:bg-zinc-300 transition-colors cursor-default select-none before:absolute before:-inset-3 before:content-['']"
          onClick={() => setOpen((prev) => !prev)}
        >
          ?
        </span>
      </TooltipTrigger>
      <TooltipContent>{displayText}</TooltipContent>
    </Tooltip>
  );
}
