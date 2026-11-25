import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import ratings from "@/infrastructure/seed/institution-ratings.json";

export async function generateMetadata(): Promise<Metadata> {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";
  return {
    title: isKorean ? "우수학회 목록 출처" : "Ranking Sources",
    description: isKorean
      ? "BK21, 한국정보과학회(KIISE), KAIST, 서울대, POSTECH 우수학술대회 목록과 CORE·CCF·CSRankings의 기준 연도, 등급 체계, 원본 파일을 정리했습니다."
      : "Official sources, versions, and tier systems behind the BK21, KIISE, KAIST, SNU, POSTECH, CORE, CCF, and CSRankings ratings shown on CS-Pedia.",
    alternates: { canonical: "https://cs-pedia.io/references" },
  };
}

type Lang = { ko: string; en: string };

interface Source {
  id: string;
  name: Lang;
  document: Lang;
  version: string;
  tiers: Lang;
  listSize: Lang;
  notes: Lang[];
  file?: { href: string; label: string };
  official?: { href: string; label: string };
}

const KOREAN_SOURCES: Source[] = [
  {
    id: "BK21",
    name: { ko: "BK21 (한국연구재단)", en: "BK21 (National Research Foundation of Korea)" },
    document: {
      ko: "BK21 플러스 사업 Computer Science 분야 우수국제학술대회 목록 개선 결과 및 적용 기준",
      en: "BK21 Plus — Computer Science Excellent International Conference List (revised)",
    },
    version: "2018.03.06",
    tiers: { ko: "인정 IF 4점 · 3점 · 2점 · 1점", en: "Recognized IF: 4 · 3 · 2 · 1 points" },
    listSize: { ko: "188개 학술대회", en: "188 conferences" },
    notes: [
      {
        ko: "적용 시점은 2018년 3월 1일이며, 정보기술패널·컴퓨터패널 사업단(팀)에 적용됩니다.",
        en: "Effective March 1, 2018, for the IT and Computer panels.",
      },
      {
        ko: "Regular 논문은 인정 IF를 그대로 받고, Short 논문은 1점, Spotlight 논문은 2점이 차감됩니다. 워크숍·포스터는 IF가 부여되지 않습니다.",
        en: "Regular papers receive the full IF; short papers lose 1 point and spotlight papers lose 2. Workshops and posters receive none.",
      },
      {
        ko: "2018년 이후 개정되지 않았습니다. 그래서 ICLR처럼 이후 성장한 학회는 목록에 없습니다.",
        en: "Not revised since 2018, so newer venues such as ICLR are absent.",
      },
    ],
    file: { href: "/references/bk21-cs-conferences-2018.pdf", label: "PDF" },
  },
  {
    id: "KIISE",
    name: { ko: "KIISE (한국정보과학회)", en: "KIISE (Korean Institute of Information Scientists and Engineers)" },
    document: { ko: "2024년 한국정보과학회 우수학술대회 (개편)목록", en: "2024 KIISE Excellent Conference List (revised)" },
    version: "2024",
    tiers: { ko: "최우수(S) · 우수(A)", en: "Top (S) · Excellent (A)" },
    listSize: { ko: "216개 (최우수 73 · 우수 143)", en: "216 (73 top · 143 excellent)" },
    notes: [
      {
        ko: "2024년 개편에서 ICLR, MICCAI, UbiComp, WSDM 등이 최우수로 상향됐습니다.",
        en: "The 2024 revision upgraded venues such as ICLR, MICCAI, UbiComp, and WSDM to the top tier.",
      },
    ],
    file: { href: "/references/kiise-conferences-2024.pdf", label: "PDF" },
    official: { href: "https://www.kiise.or.kr", label: "kiise.or.kr" },
  },
  {
    id: "KAIST",
    name: { ko: "KAIST 전산학부", en: "KAIST School of Computing" },
    document: { ko: "소프트웨어 분야 최우수·우수 학술대회 목록", en: "Software Field Top / Excellent Conference List" },
    version: "2014.11",
    tiers: { ko: "최우수 · 우수", en: "Top · Excellent" },
    listSize: { ko: "273개 (최우수 65 · 우수 208)", en: "273 (65 top · 208 excellent)" },
    notes: [
      {
        ko: "문서 자체는 2014년 11월 한국정보과학회가 작성했고, KAIST 전산학부가 인정 기준으로 사용하는 목록입니다.",
        en: "Authored by KIISE in November 2014 and adopted by the KAIST School of Computing as its recognition list.",
      },
    ],
    file: { href: "/references/kaist-sw-conferences-2014.pdf", label: "PDF" },
    official: { href: "https://cs.kaist.ac.kr", label: "cs.kaist.ac.kr" },
  },
  {
    id: "SNU",
    name: { ko: "서울대학교 컴퓨터공학부", en: "Seoul National University, Dept. of CSE" },
    document: { ko: "Top Conference List", en: "Top Conference List" },
    version: "2024.04.24",
    tiers: { ko: "등급 없음 (인정 / 미인정)", en: "No tiers (listed / not listed)" },
    listSize: { ko: "87개 학술대회", en: "87 conferences" },
    notes: [
      {
        ko: "학부 웹페이지에 공개된 목록을 기준으로 합니다. 등급 구분이 없어서 CS-Pedia에는 ✓로 표시합니다.",
        en: "Based on the list published on the department website. It has no tiers, so CS-Pedia shows a ✓.",
      },
    ],
    official: { href: "https://cse.snu.ac.kr/research/top-conference-list", label: "cse.snu.ac.kr" },
  },
  {
    id: "POSTECH",
    name: { ko: "POSTECH 컴퓨터공학과", en: "POSTECH, Dept. of CSE" },
    document: { ko: "학과 인정 학술대회 & 학술지", en: "Department-Recognized Conferences & Journals" },
    version: "2026.01",
    tiers: { ko: "최우수 · 우수", en: "Top · Excellent" },
    listSize: { ko: "학술대회 224개 (최우수 85 · 우수 139)", en: "224 conferences (85 top · 139 excellent)" },
    notes: [
      {
        ko: "엑셀 파일의 첫 번째 시트가 학술대회, 두 번째 시트가 학술지입니다. CS-Pedia는 학술대회 시트만 사용합니다.",
        en: "Sheet 1 lists conferences and sheet 2 lists journals; CS-Pedia uses the conference sheet only.",
      },
    ],
    file: { href: "/references/postech-cse-conferences-2026-01.xlsx", label: "XLSX" },
    official: { href: "https://cse.postech.ac.kr", label: "cse.postech.ac.kr" },
  },
];

const INTL_SOURCES: Source[] = [
  {
    id: "CORE",
    name: { ko: "ICORE (구 CORE, 호주)", en: "ICORE (formerly CORE, Australia)" },
    document: { ko: "ICORE Conference Ranking", en: "ICORE Conference Ranking" },
    version: "ICORE2026",
    tiers: { ko: "A* · A · B · C", en: "A* · A · B · C" },
    listSize: { ko: "등급 부여 800개 (A* 62 · A 108 · B 249 · C 381)", en: "800 ranked (62 A* · 108 A · 249 B · 381 C)" },
    notes: [
      {
        ko: "Journal Published, National, Unranked 등 A*~C가 아닌 분류는 미등재(—)로 표시합니다. 예: SenSys는 ICORE2026에서 'unranked: merged'입니다.",
        en: "Non-letter categories such as Journal Published, National, or Unranked are shown as not listed (—). For example, SenSys is 'unranked: merged' in ICORE2026.",
      },
    ],
    official: { href: "https://portal.core.edu.au/conf-ranks/", label: "portal.core.edu.au" },
  },
  {
    id: "CCF",
    name: { ko: "CCF (중국컴퓨터학회)", en: "CCF (China Computer Federation)" },
    document: { ko: "CCF 추천 국제학술회의·저널 목록 (제7판)", en: "CCF Recommended International Conferences and Journals (7th ed.)" },
    version: "2026.03.31",
    tiers: { ko: "A · B · C", en: "A · B · C" },
    listSize: { ko: "학술대회 364개 (A 58 · B 126 · C 180)", en: "364 conferences (58 A · 126 B · 180 C)" },
    notes: [
      {
        ko: "CCF는 ESOP, TACAS, FASE를 개별 학회가 아니라 ETAPS(B)로 묶어 등재합니다. CS-Pedia는 이 세 학회에 ETAPS 등급을 표시합니다.",
        en: "CCF lists ESOP, TACAS, and FASE together as ETAPS (B); CS-Pedia shows the ETAPS rating for each.",
      },
    ],
    official: { href: "https://www.ccf.org.cn/Academic_Evaluation/By_category/", label: "ccf.org.cn" },
  },
  {
    id: "CSRankings",
    name: { ko: "CSRankings", en: "CSRankings" },
    document: { ko: "CSRankings 집계 대상 학회", en: "Venues counted by CSRankings" },
    version: "2026.11",
    tiers: { ko: "포함 / 미포함", en: "Included / not included" },
    listSize: { ko: "27개 분야 77개 학회", en: "77 venues across 27 areas" },
    notes: [
      {
        ko: "기본으로 집계되는 학회와 'next tier'(기본 꺼짐) 학회를 모두 포함으로 표시합니다. 기준은 공식 GitHub 저장소의 venue 목록입니다.",
        en: "Venues counted by default and 'next tier' venues (off by default) are both shown as included, per the venue list in the official GitHub repository.",
      },
    ],
    official: { href: "https://csrankings.org", label: "csrankings.org" },
  },
];

/** How many CS-Pedia conferences carry a rating from each institution. */
function countRated(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of ratings as Array<{ institution: string; tier: string | null }>) {
    if (r.tier != null) counts[r.institution] = (counts[r.institution] ?? 0) + 1;
  }
  return counts;
}

function SourceCard({ s, rated, isKorean }: { s: Source; rated: number; isKorean: boolean }) {
  const t = (l: Lang) => (isKorean ? l.ko : l.en);
  const rows: [string, string][] = [
    [isKorean ? "기준" : "Version", s.version],
    [isKorean ? "등급 체계" : "Tiers", t(s.tiers)],
    [isKorean ? "원본 규모" : "Source list", t(s.listSize)],
    [isKorean ? "CS-Pedia 반영" : "On CS-Pedia", isKorean ? `${rated}개 학회` : `${rated} conferences`],
  ];

  return (
    <section id={s.id.toLowerCase()} className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6 scroll-mt-20">
      <h2 className="text-base font-bold text-zinc-900">{t(s.name)}</h2>
      <p className="text-sm text-zinc-500 mt-0.5">{t(s.document)}</p>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 mt-4 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-xs font-medium text-zinc-400 pt-0.5">{k}</dt>
            <dd className="text-zinc-700">{v}</dd>
          </div>
        ))}
      </dl>

      {s.notes.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 leading-relaxed list-disc pl-5">
          {s.notes.map((n, i) => (
            <li key={i}>{t(n)}</li>
          ))}
        </ul>
      )}

      {(s.file || s.official) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {s.file && (
            <a
              href={s.file.href}
              download
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              {isKorean ? `원본 ${s.file.label} 다운로드` : `Download ${s.file.label}`}
            </a>
          )}
          {s.official && (
            <a
              href={s.official.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100 transition-colors"
            >
              {s.official.label} ↗
            </a>
          )}
        </div>
      )}
    </section>
  );
}

export default async function ReferencesPage() {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";
  const rated = countRated();
  const groups = isKorean
    ? [
        { title: "국내 기관", sources: KOREAN_SOURCES },
        { title: "해외 랭킹", sources: INTL_SOURCES },
      ]
    : [
        { title: "International rankings", sources: INTL_SOURCES },
        { title: "Korean institutions", sources: KOREAN_SOURCES },
      ];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <div className="text-[11px] tracking-[0.12em] uppercase text-indigo-400 mb-1.5 font-mono font-medium">
            {isKorean ? "출처" : "References"}
          </div>
          <h1 className="font-bold text-2xl tracking-[-0.025em] text-zinc-900">
            {isKorean ? "우수학회 목록 출처" : "Ranking Sources"}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6 mb-4 text-sm text-zinc-600 leading-relaxed space-y-3">
          {isKorean ? (
            <>
              <p>
                같은 학회라도 어느 기관 목록을 기준으로 보느냐에 따라 평가가 달라집니다. BK21 성과 평가는 한국연구재단 목록을,
                학과 졸업·임용 요건은 각 대학의 인정 목록을 쓰는 경우가 많습니다. 그래서 CS-Pedia는 기관별 등급을 하나로 합치지 않고
                원래 목록 그대로 나란히 보여줍니다.
              </p>
              <p>
                아래는 각 등급의 근거가 된 문서와 기준 시점입니다. 목록은 기관 사정에 따라 개정될 수 있으니, 졸업 요건이나 성과 평가처럼
                중요한 판단은 소속 기관의 최신 공지를 함께 확인하세요. 목록과 다른 점을 발견하면{" "}
                <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline underline-offset-2">
                  contact@cs-pedia.io
                </a>
                로 알려주세요.
              </p>
            </>
          ) : (
            <>
              <p>
                A conference can be rated very differently depending on whose list you use. CS-Pedia shows each institution&apos;s
                rating side by side, exactly as published, instead of merging them into a single score.
              </p>
              <p>
                Below are the documents and versions behind each rating. Lists can be revised, so check your institution&apos;s latest
                notice for anything high-stakes. Found a mismatch? Email{" "}
                <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline underline-offset-2">
                  contact@cs-pedia.io
                </a>
                .
              </p>
            </>
          )}
        </div>

        {groups.map((g) => (
          <div key={g.title} className="mt-8">
            <h2 className="text-xs font-semibold font-mono tracking-[0.1em] uppercase text-indigo-500 mb-3">{g.title}</h2>
            <div className="space-y-4">
              {g.sources.map((s) => (
                <SourceCard key={s.id} s={s} rated={rated[s.id] ?? 0} isKorean={isKorean} />
              ))}
            </div>
          </div>
        ))}

        <SiteFooter />
      </main>
    </div>
  );
}
