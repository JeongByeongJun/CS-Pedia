import { DBLP_API_BASE, DBLP_DELAY_MS, sleep } from "../config";

export interface DblpPaper {
  title: string;
  year: number;
}

/**
 * DBLP에서 학회의 채택 논문 제목을 가져온다 (연도 파라미터 없이).
 * fromYear 이후 논문만 반환. 최대 5페이지(5000편)까지 fetch.
 */
export async function fetchDblpPaperTitles(
  dblpKey: string,
  fromYear = 2020,
): Promise<DblpPaper[]> {
  const results: DblpPaper[] = [];
  const pageSize = 1000;
  const maxPages = 5;
  let offset = 0;
  let total = Infinity;

  const query = encodeURIComponent(`stream:${dblpKey}:`);

  for (let page = 0; page < maxPages && offset < total; page++) {
    await sleep(DBLP_DELAY_MS);

    try {
      const url = `${DBLP_API_BASE}?q=${query}&h=${pageSize}&f=${offset}&format=json`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`DBLP titles fetch failed for ${dblpKey} (HTTP ${res.status})`);
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
        const year = parseInt(info.year);
        if (year >= fromYear) {
          results.push({
            title: info.title.replace(/\.$/, ""),
            year,
          });
        }
      }

      offset += pageSize;
    } catch {
      console.warn(`DBLP titles fetch failed for ${dblpKey} (offset=${offset})`);
      break;
    }
  }

  return results;
}
