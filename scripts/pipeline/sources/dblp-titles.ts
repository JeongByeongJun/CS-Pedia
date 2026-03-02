import { DBLP_API_BASE, DBLP_DELAY_MS, sleep } from "../config";

export interface DblpPaper {
  title: string;
  year: number;
}

/**
 * DBLP에서 학회+연도별 채택 논문 제목을 가져온다.
 * h=1000 페이지네이션으로 대량 학회도 커버.
 * Rate limit: 1 req/sec (1100ms delay).
 */
export async function fetchDblpPaperTitles(
  dblpKey: string,
  year: number,
): Promise<DblpPaper[]> {
  const results: DblpPaper[] = [];
  const pageSize = 1000;
  let offset = 0;
  let total = Infinity;

  const venueShort = dblpKey.replace("conf/", "");

  while (offset < total) {
    await sleep(DBLP_DELAY_MS);

    try {
      const query = encodeURIComponent(`venue:${venueShort}:`);
      const url = `${DBLP_API_BASE}?q=${query}&h=${pageSize}&f=${offset}&format=json&y=${year}`;
      const res = await fetch(url);
      if (!res.ok) break;

      const data = await res.json();
      total = parseInt(data?.result?.hits?.["@total"] ?? "0");
      if (total === 0) break;

      const hits = data?.result?.hits?.hit ?? [];
      for (const hit of hits) {
        const info = hit?.info;
        if (info?.title) {
          results.push({
            title: info.title.replace(/\.$/, ""), // Remove trailing period
            year: parseInt(info.year) || year,
          });
        }
      }

      offset += pageSize;
    } catch {
      console.warn(
        `DBLP titles fetch failed for ${dblpKey} ${year} (offset=${offset})`,
      );
      break;
    }
  }

  return results;
}
