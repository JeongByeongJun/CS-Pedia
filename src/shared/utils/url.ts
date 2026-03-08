// authors 필드가 JSON 배열 문자열로 저장된 경우 파싱해서 ", " 로 조인
export function formatAuthors(authors: string | null | undefined): string {
  if (!authors) return "";
  try {
    const parsed = JSON.parse(authors);
    if (Array.isArray(parsed)) return parsed.join(", ");
  } catch {}
  return authors;
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function conferenceUrl(slug: string): string {
  return `/conferences/${slug}`;
}
