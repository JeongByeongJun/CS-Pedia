export const SITE = {
  name: "CS-Pedia",
  description:
    "한국 CS 연구자를 위한 학회 일정 · BK21 목록 · Best Paper 통합 플랫폼",
  url: "https://cs-pedia.io",
} as const;

/** Per-conference best-paper pages with fewer papers than this are noindexed and left out of the sitemap (thin content). */
export const BEST_PAPER_MIN_INDEXABLE = 5;
