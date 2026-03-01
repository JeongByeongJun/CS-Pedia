export const INSTITUTIONS = [
  "BK21",
  "KIISE",
  "KAIST",
  "SNU",
  "POSTECH",
] as const;

export type InstitutionFilter = (typeof INSTITUTIONS)[number];
