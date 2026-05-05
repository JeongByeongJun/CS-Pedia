/**
 * Professor Publications Pipeline
 *
 * DBLP PID로 교수별 논문 목록을 수집하고,
 * 우리 사이트의 209개 학회와 매칭해서 professor_publications 테이블에 저장.
 *
 * 실행: npx tsx --env-file=.env.local scripts/pipeline/professors.ts
 */

import { createClient } from "@supabase/supabase-js";
import { sleep } from "./config";

const DBLP_PERSON_API = "https://dblp.org/pid";
const DELAY_MS = 3000; // DBLP rate limit: 3s 딜레이

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

interface ConfPaper {
  key: string;
  title: string;
  year: number;
}

// DBLP person XML API로 교수 학회 논문 수집 (실패 시 1회 재시도)
async function fetchProfessorPublications(dblpPid: string): Promise<ConfPaper[]> {
  const url = `${DBLP_PERSON_API}/${dblpPid}.xml`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) {
        if (attempt === 0) { await sleep(5000); continue; }
        return [];
      }

      const xml = await res.text();
      const papers: ConfPaper[] = [];

      const rTagRegex = /<r>([\s\S]*?)<\/r>/g;
      let rMatch;

      while ((rMatch = rTagRegex.exec(xml)) !== null) {
        const block = rMatch[1];

        const keyMatch = block.match(/\skey="([^"]+)"/);
        if (!keyMatch) continue;
        const key = keyMatch[1];
        if (!key.startsWith("conf/")) continue;

        const yearMatch = block.match(/<year>(\d+)<\/year>/);
        const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);

        papers.push({
          key,
          year: parseInt(yearMatch?.[1] ?? "0"),
          title: titleMatch?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "",
        });
      }

      return papers;
    } catch (e) {
      if (attempt === 0) {
        process.stderr.write(` [retry: ${(e as Error).message}] `);
        await sleep(5000);
      } else {
        process.stderr.write(` [failed: ${(e as Error).message}] `);
      }
    }
  }
  return [];
}

// DBLP paper key가 우리 학회 dblp_key와 매칭되는지 확인
// 예: "conf/nips/LeeK23" startsWith "conf/nips/"
function matchConference(
  dblpKey: string,
  confKeyMap: Map<string, string>, // dblp_key → conference_id
): string | null {
  for (const [confKey, confId] of confKeyMap) {
    if (dblpKey.startsWith(confKey + "/")) {
      return confId;
    }
  }
  return null;
}

async function main() {
  console.log("=== Professor Publications Pipeline ===\n");

  // 1. 학회 dblp_key → id 맵 구성
  const { data: conferences, error: confErr } = await supabase
    .from("conferences")
    .select("id, dblp_key")
    .not("dblp_key", "is", null);
  if (confErr) throw confErr;

  const confKeyMap = new Map<string, string>();
  for (const c of conferences ?? []) {
    if (c.dblp_key) confKeyMap.set(c.dblp_key, c.id);
  }
  console.log(`학회 매핑 로드: ${confKeyMap.size}개\n`);

  // 2. confirmed 교수 목록 조회
  const { data: professors, error: profErr } = await supabase
    .from("professors")
    .select("id, name_ko, name_en, dblp_pid")
    .eq("dblp_status", "confirmed")
    .not("dblp_pid", "is", null);
  if (profErr) throw profErr;

  const total = professors?.length ?? 0;
  console.log(`처리할 교수: ${total}명\n`);

  let pubTotal = 0;
  let matchTotal = 0;

  // 3. 교수별 논문 수집 및 매칭
  for (let i = 0; i < total; i++) {
    const prof = professors![i];
    process.stdout.write(
      `[${i + 1}/${total}] ${prof.name_ko} (${prof.dblp_pid}) ... `,
    );

    await sleep(DELAY_MS);

    const papers = await fetchProfessorPublications(prof.dblp_pid!);
    pubTotal += papers.length;

    // 우리 학회와 매칭
    const rows: {
      professor_id: string;
      conference_id: string;
      year: number;
      paper_title: string | null;
      dblp_key: string;
    }[] = [];

    for (const paper of papers) {
      const confId = matchConference(paper.key, confKeyMap);
      if (!confId) continue;

      rows.push({
        professor_id: prof.id,
        conference_id: confId,
        year: paper.year,
        paper_title: paper.title || null,
        dblp_key: paper.key,
      });
    }

    if (rows.length > 0) {
      const { error } = await supabase
        .from("professor_publications")
        .upsert(rows, { onConflict: "professor_id,dblp_key" });
      if (error) {
        console.log(`❌ upsert 실패: ${error.message}`);
        continue;
      }
      matchTotal += rows.length;
    }

    console.log(`논문 ${papers.length}편 → 매칭 ${rows.length}건`);
  }

  console.log("\n=== 완료 ===");
  console.log(`총 논문 수집: ${pubTotal}편`);
  console.log(`학회 매칭: ${matchTotal}건`);
  console.log(`저장 완료: professor_publications`);
}

main().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
