import { DBLP_API_BASE, DBLP_DELAY_MS, sleep } from "../config";

interface DblpProceeding {
  year: number;
  numberOfPapers: number;
  title: string;
}

export async function fetchDblpPaperCounts(
  dblpKey: string,
): Promise<DblpProceeding[]> {
  const results: DblpProceeding[] = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear - 4; year <= currentYear; year++) {
    await sleep(DBLP_DELAY_MS);

    try {
      const query = encodeURIComponent(
        `venue:${dblpKey.replace("conf/", "")}:`,
      );
      const url = `${DBLP_API_BASE}?q=${query}&h=0&f=0&format=json&y=${year}`;
      const res = await fetch(url);
      if (!res.ok) continue;

      const data = await res.json();
      const total = data?.result?.hits?.["@total"];
      if (total && parseInt(total) > 0) {
        results.push({
          year,
          numberOfPapers: parseInt(total),
          title: `${dblpKey} ${year}`,
        });
      }
    } catch {
      console.warn(`DBLP fetch failed for ${dblpKey} ${year}`);
    }
  }

  return results;
}
