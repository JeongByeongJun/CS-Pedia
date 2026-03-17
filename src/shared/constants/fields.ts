export const FIELDS = [
  "전체",
  "AI/ML",
  "NLP",
  "CV",
  "Systems",
  "Security",
  "SE",
  "DB",
  "HCI",
  "Theory",
  "Networks",
  "Architecture",
  "Graphics",
  "PL",
  "Robotics",
] as const;

export type FieldFilter = (typeof FIELDS)[number];
