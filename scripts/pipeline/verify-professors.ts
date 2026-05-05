/**
 * Professor Verification Pipeline (Semantic Scholar)
 *
 * DBLP로 수집한 교수 논문 데이터를 Semantic Scholar와 교차 검증.
 * 불일치 케이스를 리포트로 출력.
 *
 * 실행: npx tsx --env-file=.env.local scripts/pipeline/verify-professors.ts
 */

import { createClient } from "@supabase/supabase-js";
import { sleep } from "./config";
import * as fs from "fs";

const S2_API = "https://api.semanticscholar.org/graph/v1";
const DELAY_MS = 4000; // S2 rate limit: 100 req/5min (no key) → 4s 딜레이

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// 대학교 약칭 매핑 (S2 affiliation 검색용)
const UNIV_KEYWORDS: Record<string, string[]> = {
  "Seoul National University": ["Seoul National", "SNU"],
  "KAIST": ["KAIST", "Korea Advanced Institute"],
  "POSTECH": ["POSTECH", "Pohang University of Science"],
  "Yonsei University": ["Yonsei"],
  "Korea University": ["Korea University"],
  "Sungkyunkwan University": ["Sungkyunkwan", "SKKU"],
  "Hanyang University": ["Hanyang"],
  "Sogang University": ["Sogang"],
  "Ewha Womans University": ["Ewha"],
  "Inha University": ["Inha"],
  "Ajou University": ["Ajou"],
  "University of Seoul": ["University of Seoul"],
  "Soongsil University": ["Soongsil"],
  "Konkuk University": ["Konkuk"],
  "Kookmin University": ["Kookmin"],
  "Sejong University": ["Sejong"],
  "Dongguk University": ["Dongguk"],
  "Kwangwoon University": ["Kwangwoon"],
  "Seoul National University of Science and Technology": ["Seoul Tech", "SeoulTech"],
  "Chung-Ang University": ["Chung-Ang", "CAU"],
  "Kyung Hee University": ["Kyung Hee"],
  "Kyungpook National University": ["Kyungpook"],
  "Pusan National University": ["Pusan National", "PNU"],
  "Chonnam National University": ["Chonnam", "Jeonnam"],
  "Jeonbuk National University": ["Jeonbuk", "Chonbuk"],
  "Chungnam National University": ["Chungnam", "CNU"],
  "Chungbuk National University": ["Chungbuk", "CBNU"],
  "Kangwon National University": ["Kangwon"],
  "Gyeongsang National University": ["Gyeongsang"],
  "Pukyong National University": ["Pukyong"],
  "Jeju National University": ["Jeju"],
  "DGIST": ["DGIST", "Daegu Gyeongbuk"],
  "GIST": ["GIST", "Gwangju Institute"],
  "UNIST": ["UNIST", "Ulsan National"],
  "Incheon National University": ["Incheon National"],
};

interface S2Author {
  authorId: string;
  name: string;
  affiliations?: string[];
  paperCount?: number;
}

interface S2Paper {
  paperId: string;
  title: string;
  year: number | null;
  venue: string | null;
  externalIds?: { DBLP?: string };
}

interface VerifyResult {
  professorId: string;
  nameKo: string;
  nameEn: string | null;
  university: string;
  dblpPid: string;
  dblpPaperCount: number; // 우리 DB의 매칭 수
  s2AuthorId: string | null;
  s2PaperCount: number | null; // S2 전체 논문 수
  s2MatchCount: number | null; // S2에서 우리 DB 논문이 확인된 수
  status: "verified" | "mismatch" | "not_found" | "ambiguous";
  notes: string;
}

async function searchS2Author(
  nameEn: string,
  university: string,
): Promise<S2Author | null> {
  const query = encodeURIComponent(nameEn);
  const url = `${S2_API}/author/search?query=${query}&fields=name,affiliations,paperCount&limit=5`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) {
      if (res.status === 429) process.stderr.write(" [S2 rate limit] ");
      return null;
    }

    const data = await res.json();
    const authors: S2Author[] = data?.data ?? [];
    if (authors.length === 0) return null;

    // 대학교 키워드 매핑
    const keywords = UNIV_KEYWORDS[university] ?? [university.split(" ")[0]];

    // affiliation으로 매칭
    for (const author of authors) {
      const affiliations = (author.affiliations ?? []).join(" ").toLowerCase();
      if (keywords.some((kw) => affiliations.includes(kw.toLowerCase()))) {
        return author;
      }
    }

    // affiliation 정보 없으면 첫 번째 결과 반환 (이름 완전 일치인 경우)
    const exactMatch = authors.find(
      (a) => a.name.toLowerCase() === nameEn.toLowerCase(),
    );
    return exactMatch ?? null;
  } catch {
    return null;
  }
}

async function getS2AuthorPapers(authorId: string): Promise<S2Paper[]> {
  const papers: S2Paper[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = `${S2_API}/author/${authorId}/papers?fields=title,year,venue,externalIds&limit=${limit}&offset=${offset}`;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) break;
      const data = await res.json();
      const batch: S2Paper[] = data?.data ?? [];
      papers.push(...batch);
      if (batch.length < limit) break;
      offset += limit;
      await sleep(DELAY_MS);
    } catch {
      break;
    }
  }
  return papers;
}

async function main() {
  console.log("=== Professor Verification Pipeline (Semantic Scholar) ===\n");

  // 1. 우리 DB에서 confirmed 교수 + 논문 수 조회
  const { data: professors } = await supabase
    .from("professors")
    .select("id, name_ko, name_en, university, dblp_pid")
    .eq("dblp_status", "confirmed")
    .not("dblp_pid", "is", null)
    .not("name_en", "is", null);

  const total = professors?.length ?? 0;
  console.log(`검증 대상: ${total}명\n`);

  // 2. 교수별 우리 DB 논문 수 미리 로드
  const { data: pubCounts } = await supabase
    .from("professor_publications")
    .select("professor_id");
  const dbCountMap: Record<string, number> = {};
  for (const r of pubCounts ?? []) {
    dbCountMap[r.professor_id] = (dbCountMap[r.professor_id] ?? 0) + 1;
  }

  const results: VerifyResult[] = [];
  let verified = 0, mismatch = 0, notFound = 0, ambiguous = 0;

  for (let i = 0; i < total; i++) {
    const prof = professors![i];
    const dbCount = dbCountMap[prof.id] ?? 0;

    process.stdout.write(
      `[${i + 1}/${total}] ${prof.name_ko} (${prof.name_en}) ... `,
    );

    await sleep(DELAY_MS);

    const s2Author = await searchS2Author(prof.name_en!, prof.university);

    if (!s2Author) {
      console.log(`S2 없음 (DB: ${dbCount}건)`);
      results.push({
        professorId: prof.id,
        nameKo: prof.name_ko,
        nameEn: prof.name_en,
        university: prof.university,
        dblpPid: prof.dblp_pid!,
        dblpPaperCount: dbCount,
        s2AuthorId: null,
        s2PaperCount: null,
        s2MatchCount: null,
        status: "not_found",
        notes: "Semantic Scholar에서 찾을 수 없음",
      });
      notFound++;
      continue;
    }

    // S2 논문과 우리 DB 논문 교차 검증
    // S2 논문 중 DBLP key가 있는 것만 비교
    await sleep(DELAY_MS);
    const s2Papers = await getS2AuthorPapers(s2Author.authorId);

    // 우리 DB 논문 목록 조회 (제목 + 연도)
    const { data: dbPubs } = await supabase
      .from("professor_publications")
      .select("dblp_key, paper_title, year")
      .eq("professor_id", prof.id);

    // S2 논문 매칭: DBLP key 우선, 없으면 제목 정규화 비교
    const normalizeTitle = (t: string) =>
      t.toLowerCase().replace(/[^a-z0-9]/g, "");

    const dbKeys = new Set((dbPubs ?? []).map((p) => p.dblp_key).filter(Boolean));
    const dbTitles = new Set(
      (dbPubs ?? []).map((p) => p.paper_title).filter(Boolean).map(normalizeTitle),
    );

    let s2MatchCount = 0;
    for (const p of s2Papers) {
      const dblpKey = p.externalIds?.DBLP;
      if (dblpKey && dbKeys.has(dblpKey)) { s2MatchCount++; continue; }
      if (p.title && dbTitles.has(normalizeTitle(p.title))) s2MatchCount++;
    }

    const s2PaperCount = s2Author.paperCount ?? s2Papers.length;

    // 판정
    let status: VerifyResult["status"];
    let notes = "";

    if (dbCount === 0 && s2MatchCount === 0) {
      status = "verified";
      notes = "둘 다 해당 학회 논문 없음";
    } else if (s2MatchCount >= dbCount * 0.7) {
      status = "verified";
      notes = `S2 확인 ${s2MatchCount}/${dbCount}건 (${Math.round(s2MatchCount/Math.max(dbCount,1)*100)}%)`;
    } else if (s2MatchCount > 0) {
      status = "mismatch";
      notes = `S2 확인 ${s2MatchCount}/${dbCount}건 — 부분 불일치`;
      mismatch++;
    } else if (dbCount > 0) {
      status = "mismatch";
      notes = `DB에 ${dbCount}건 있으나 S2 미확인 — PID 오류 의심`;
      mismatch++;
    } else {
      status = "verified";
      notes = "논문 없음";
    }

    if (status === "verified") verified++;

    console.log(`S2:${s2Author.authorId} | DB:${dbCount}건 S2확인:${s2MatchCount}건 → ${status}`);

    results.push({
      professorId: prof.id,
      nameKo: prof.name_ko,
      nameEn: prof.name_en,
      university: prof.university,
      dblpPid: prof.dblp_pid!,
      dblpPaperCount: dbCount,
      s2AuthorId: s2Author.authorId,
      s2PaperCount: s2PaperCount,
      s2MatchCount,
      status,
      notes,
    });
  }

  // 리포트 저장
  const report = {
    generatedAt: new Date().toISOString(),
    summary: { total, verified, mismatch, notFound, ambiguous },
    results,
  };
  fs.writeFileSync(
    "scripts/professors/verification-report.json",
    JSON.stringify(report, null, 2),
  );

  console.log("\n=== 결과 ===");
  console.log(`총: ${total}명`);
  console.log(`✅ 검증됨: ${verified}명`);
  console.log(`⚠️  불일치: ${mismatch}명`);
  console.log(`❓ S2 없음: ${notFound}명`);
  console.log(`\n리포트 저장: scripts/professors/verification-report.json`);

  // 불일치 케이스 출력
  const mismatches = results.filter((r) => r.status === "mismatch");
  if (mismatches.length > 0) {
    console.log("\n⚠️  불일치 케이스:");
    mismatches.forEach((r) =>
      console.log(`  ${r.nameKo} (${r.university}): ${r.notes}`),
    );
  }
}

main().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
