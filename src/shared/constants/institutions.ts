export const INSTITUTIONS_KR = [
  "BK21",
  "KIISE",
  "KAIST",
  "SNU",
  "POSTECH",
] as const;

export const INSTITUTIONS_INTL = [
  "CORE",
  "CCF",
  "CSRankings",
] as const;

export const INSTITUTIONS = [...INSTITUTIONS_KR, ...INSTITUTIONS_INTL] as const;

export type InstitutionFilter = (typeof INSTITUTIONS)[number];
