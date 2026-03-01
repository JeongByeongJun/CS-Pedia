import {
  OPENALEX_API_BASE,
  OPENALEX_MAILTO,
  OPENALEX_DELAY_MS,
  sleep,
} from "../config";

interface OpenAlexYearCount {
  year: number;
  worksCount: number;
}

export async function fetchOpenAlexWorksCounts(
  conferenceName: string,
): Promise<OpenAlexYearCount[]> {
  await sleep(OPENALEX_DELAY_MS);

  try {
    // Search for the source/venue
    const searchUrl = `${OPENALEX_API_BASE}/sources?search=${encodeURIComponent(conferenceName)}&mailto=${OPENALEX_MAILTO}`;
    const res = await fetch(searchUrl);
    if (!res.ok) return [];

    const data = await res.json();
    const source = data?.results?.[0];
    if (!source) return [];

    // Get counts by year from the source
    const countsByYear: OpenAlexYearCount[] = (
      source.counts_by_year ?? []
    ).map(
      (c: { year: number; works_count: number }) => ({
        year: c.year,
        worksCount: c.works_count,
      }),
    );

    return countsByYear.filter((c: OpenAlexYearCount) => c.worksCount > 0);
  } catch {
    console.warn(`OpenAlex fetch failed for ${conferenceName}`);
    return [];
  }
}
