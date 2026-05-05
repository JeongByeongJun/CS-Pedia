/**
 * DBLP 이름으로 불일치 교수 PID 검증
 * 실행: npx tsx --env-file=.env.local scripts/pipeline/check-mismatches.ts
 */

import * as fs from "fs";

interface VerifyResult {
  professorId: string;
  nameKo: string;
  nameEn: string | null;
  university: string;
  dblpPid: string;
  dblpPaperCount: number;
  status: string;
  notes: string;
}

async function main() {
  const report = JSON.parse(
    fs.readFileSync("scripts/professors/verification-report.json", "utf-8"),
  );
  const mismatches: VerifyResult[] = report.results.filter(
    (r: VerifyResult) => r.status === "mismatch",
  );

  console.log(`불일치 교수 DBLP 이름 검증 (${mismatches.length}명)\n`);

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

  for (const prof of mismatches) {
    const url = `https://dblp.org/pid/${prof.dblpPid}.xml`;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      const xml = await res.text();
      const nameMatch = xml.match(/dblpperson name="([^"]+)"/);
      const dblpName = nameMatch?.[1] ?? "?";
      const nameEn = prof.nameEn ?? "";

      // 성 또는 이름 일부 일치 여부
      const dnorm = normalize(dblpName);
      const enorm = normalize(nameEn);
      const parts = nameEn.split(" ").map(normalize).filter(Boolean);
      const isMatch = parts.some((p) => dnorm.includes(p) && p.length > 2);

      const flag = isMatch ? "✅" : "❌ PID 오류 의심";
      console.log(`${flag} ${prof.nameKo} (${prof.university})`);
      console.log(
        `   우리: ${nameEn} | DBLP: ${dblpName} | DB:${prof.dblpPaperCount}건 | ${prof.notes}`,
      );
    } catch (e) {
      console.log(`⚠️  ${prof.nameKo}: fetch 실패 (${(e as Error).message})`);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

main().catch(console.error);
