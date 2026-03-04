import { sleep } from "../config";

export interface S2Paper {
  title: string;
  year: number;
}

const S2_BASE = "https://api.semanticscholar.org/graph/v1/paper/search/bulk";
const DELAY_MS = 1100; // 1 req/sec for authenticated users

// Map from our conference acronym → Semantic Scholar venue name
// S2 venue names are matched case-insensitively
const VENUE_OVERRIDES: Record<string, string> = {
  neurips: "NeurIPS",
  iclr: "ICLR",
  icml: "ICML",
  aaai: "AAAI",
  ijcai: "IJCAI",
  cvpr: "CVPR",
  iccv: "ICCV",
  eccv: "ECCV",
  acl: "ACL",
  emnlp: "EMNLP",
  naacl: "NAACL",
  coling: "COLING",
  eacl: "EACL",
  sigir: "SIGIR",
  kdd: "KDD",
  www: "The Web Conference",
  wsdm: "WSDM",
  recsys: "RecSys",
  cikm: "CIKM",
  sigmod: "SIGMOD",
  vldb: "VLDB",
  icde: "ICDE",
  pods: "PODS",
  sosp: "SOSP",
  osdi: "OSDI",
  nsdi: "NSDI",
  usenix: "USENIX",
  sp: "IEEE Symposium on Security and Privacy",
  ccs: "CCS",
  usenixsec: "USENIX Security",
  ndss: "NDSS",
  pldi: "PLDI",
  popl: "POPL",
  icfp: "ICFP",
  fse: "FSE",
  icse: "ICSE",
  ase: "ASE",
  issta: "ISSTA",
  nips: "NeurIPS",
};

/**
 * Semantic Scholar에서 학회+연도별 논문 제목을 가져온다.
 */
export async function fetchS2PaperTitles(
  slug: string,
  acronym: string | null,
  year: number,
): Promise<S2Paper[]> {
  const venue = VENUE_OVERRIDES[slug] ?? VENUE_OVERRIDES[acronym?.toLowerCase() ?? ""] ?? acronym;
  if (!venue) return [];

  await sleep(DELAY_MS);

  const apiKey = process.env.SEMANTIC_SCHOLAR_API_KEY;
  const headers: Record<string, string> = {};
  if (apiKey) headers["x-api-key"] = apiKey;

  try {
    const params = new URLSearchParams({
      venue,
      year: String(year),
      fields: "title,year",
      limit: "1000",
    });

    const res = await fetch(`${S2_BASE}?${params}`, { headers });
    if (!res.ok) {
      console.warn(`S2 fetch failed for ${slug} ${year} (HTTP ${res.status})`);
      return [];
    }

    const data = await res.json();
    const papers: S2Paper[] = [];
    for (const item of data?.data ?? []) {
      if (item?.title && item?.year) {
        papers.push({ title: item.title, year: item.year });
      }
    }
    return papers;
  } catch (e) {
    console.warn(`S2 fetch error for ${slug} ${year}:`, e);
    return [];
  }
}
