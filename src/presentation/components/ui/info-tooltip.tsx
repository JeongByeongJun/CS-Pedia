"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function InfoTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="ml-1.5 w-4 h-4 rounded-full bg-zinc-200 text-zinc-500 text-[10px] font-bold inline-flex items-center justify-center hover:bg-zinc-300 transition-colors cursor-default select-none">
          ?
        </span>
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
