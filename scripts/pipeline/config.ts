export const DBLP_API_BASE = "https://dblp.org/search/publ/api";
export const OPENALEX_API_BASE = "https://api.openalex.org";
export const OPENALEX_MAILTO = "confkorea@example.com";

// Rate limiting
export const DBLP_DELAY_MS = 3000; // 3s between requests to avoid rate limiting
export const OPENALEX_DELAY_MS = 150; // OpenAlex allows 10 req/sec with mailto

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
