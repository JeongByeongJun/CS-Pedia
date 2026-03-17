import { DBLP_API_BASE, DBLP_DELAY_MS, sleep } from "../config";

export interface DblpPaper {
  title: string;
  year: number;
}

/**
 * DBLP에서 학회의 채택 논문 제목을 연도별로 가져온다.
 * fromYear ~ toYear 범위. 연도별 쿼리로 대형 학회(NeurIPS 25K+)도 커버.
 */
export async function fetchDblpPaperTitles(
  dblpKey: string,
  fromYear = 2020,
  toYear = new Date().getFullYear(),
): Promise<DblpPaper[]> {
  const results: DblpPaper[] = [];

  for (let year = fromYear; year <= toYear; year++) {
    const yearPapers = await fetchDblpPaperTitlesByYear(dblpKey, year);
    results.push(...yearPapers);
  }

  return results;
}

async function fetchDblpPaperTitlesByYear(
  dblpKey: string,
  year: number,
): Promise<DblpPaper[]> {
  const results: DblpPaper[] = [];
  const pageSize = 1000;
  const maxPages = 10; // 10000 papers per year — more than enough
  let offset = 0;
  let total = Infinity;

  const query = encodeURIComponent(`stream:${dblpKey}: year:${year}`);

  for (let page = 0; page < maxPages && offset < total; page++) {
    await sleep(DBLP_DELAY_MS);

    try {
      const url = `${DBLP_API_BASE}?q=${query}&h=${pageSize}&f=${offset}&format=json`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`DBLP titles fetch failed for ${dblpKey} ${year} (HTTP ${res.status})`);
        // If rate limited, wait longer and retry once
        if (res.status === 429) {
          console.warn(`  Rate limited, waiting 30s...`);
          await sleep(30000);
          const retry = await fetch(url);
          if (!retry.ok) break;
          const retryData = await retry.json();
          total = parseInt(retryData?.result?.hits?.["@total"] ?? "0");
          if (total === 0) break;
          const hits = retryData?.result?.hits?.hit ?? [];
          const arr = Array.isArray(hits) ? hits : [hits];
          for (const hit of arr) {
            const info = hit?.info;
            if (!info?.title || !info?.year) continue;
            results.push({ title: info.title.replace(/\.$/, ""), year: parseInt(info.year) });
          }
          offset += pageSize;
          continue;
        }
        break;
      }

      const data = await res.json();
      total = parseInt(data?.result?.hits?.["@total"] ?? "0");
      if (total === 0) break;

      const hits = data?.result?.hits?.hit ?? [];
      const arr = Array.isArray(hits) ? hits : [hits];

      for (const hit of arr) {
        const info = hit?.info;
        if (!info?.title || !info?.year) continue;
        results.push({
          title: info.title.replace(/\.$/, ""),
          year: parseInt(info.year),
        });
      }

      offset += pageSize;
    } catch {
      console.warn(`DBLP titles fetch error for ${dblpKey} ${year} (offset=${offset})`);
      break;
    }
  }

  return results;
}
