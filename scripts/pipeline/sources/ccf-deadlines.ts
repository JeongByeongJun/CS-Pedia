import { execSync } from "child_process";
import { readdirSync, readFileSync, writeFileSync, rmSync } from "fs";
import path from "path";
import yaml from "js-yaml";
import os from "os";

const REPORT_PATH = path.resolve(__dirname, "../pipeline-report.txt");

const REPO_URL = "https://github.com/ccfddl/ccf-deadlines.git";

interface CcfTimeline {
  deadline: string;
  abstract_deadline?: string;
  comment?: string;
}

interface CcfInstance {
  year: number;
  id: string;
  link: string;
  timeline: CcfTimeline[];
  timezone: string;
  date: string;
  place: string;
}

interface CcfConference {
  title: string;
  description: string;
  sub: string;
  rank: { ccf: string; core: string; thcpl: string };
  dblp: string;
  confs: CcfInstance[];
}

export interface DeadlineEntry {
  conference_id: string;
  year: number;
  cycle: string;
  abstract_deadline: string | null;
  paper_deadline: string;
  notification_date: null;
  conference_start: string | null;
  conference_end: string | null;
  venue: string;
  timezone: string;
}

const MONTHS: Record<string, number> = {
  january: 1, jan: 1,
  february: 2, feb: 2,
  march: 3, mar: 3,
  april: 4, apr: 4,
  may: 5,
  june: 6, jun: 6,
  july: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  october: 10, oct: 10,
  november: 11, nov: 11,
  december: 12, dec: 12,
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function parseDateRange(dateStr: string): {
  start: string | null;
  end: string | null;
} {
  const s = dateStr.replace(/–/g, "-").replace(/\s+/g, " ").trim();

  // "Month D-D, YYYY"
  const sameMonth = s.match(/^(\w+)\s+(\d+)\s*-\s*(\d+),?\s*(\d{4})$/);
  if (sameMonth) {
    const month = MONTHS[sameMonth[1].toLowerCase()];
    if (month) {
      const y = sameMonth[4];
      return {
        start: `${y}-${pad2(month)}-${pad2(parseInt(sameMonth[2]))}`,
        end: `${y}-${pad2(month)}-${pad2(parseInt(sameMonth[3]))}`,
      };
    }
  }

  // "Month D - Month D, YYYY"
  const diffMonth = s.match(
    /^(\w+)\s+(\d+)\s*-\s*(\w+)\s+(\d+),?\s*(\d{4})$/,
  );
  if (diffMonth) {
    const m1 = MONTHS[diffMonth[1].toLowerCase()];
    const m2 = MONTHS[diffMonth[3].toLowerCase()];
    if (m1 && m2) {
      const y = diffMonth[5];
      return {
        start: `${y}-${pad2(m1)}-${pad2(parseInt(diffMonth[2]))}`,
        end: `${y}-${pad2(m2)}-${pad2(parseInt(diffMonth[4]))}`,
      };
    }
  }

  return { start: null, end: null };
}

function formatDeadline(dt: string): string {
  // '2026-01-24 11:59:59' → '2026-01-24T11:59:59'
  return dt.replace(" ", "T");
}

function isPast(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

type ConferenceLookup = Map<string, { id: string; slug: string }>;

/**
 * Build a lookup map with multiple keys per conference for flexible matching.
 * Keys: slug, slug without hyphens, acronym variants, dblp key (without conf/ prefix)
 */
export function buildLookupMap(
  conferences: Map<
    string,
    {
      id: string;
      dblpKey: string | null;
      nameEn: string;
      acronym: string | null;
    }
  >,
): ConferenceLookup {
  const map: ConferenceLookup = new Map();

  for (const [slug, conf] of conferences) {
    const entry = { id: conf.id, slug };

    map.set(slug, entry);
    map.set(slug.replace(/-/g, ""), entry);

    if (conf.acronym) {
      map.set(conf.acronym.toLowerCase(), entry);
      map.set(
        conf.acronym.toLowerCase().replace(/[^a-z0-9]/g, ""),
        entry,
      );
    }

    if (conf.dblpKey) {
      map.set(conf.dblpKey.replace("conf/", ""), entry);
    }
  }

  return map;
}

function findMatch(
  ccfConf: CcfConference,
  lookup: ConferenceLookup,
): { id: string; slug: string } | undefined {
  // 1. DBLP key match (most reliable)
  if (ccfConf.dblp) {
    const match = lookup.get(ccfConf.dblp);
    if (match) return match;
  }

  // 2. Title match
  const titleLower = ccfConf.title.toLowerCase();
  const titleNormalized = titleLower.replace(/[^a-z0-9]/g, "");

  return lookup.get(titleLower) || lookup.get(titleNormalized);
}

export async function fetchCcfDeadlines(
  lookup: ConferenceLookup,
): Promise<DeadlineEntry[]> {
  const tmpDir = path.join(os.tmpdir(), `ccf-deadlines-${Date.now()}`);
  const currentYear = new Date().getFullYear();

  console.log("📅 Fetching ccf-deadlines...");

  try {
    execSync(`git clone --depth 1 ${REPO_URL} ${tmpDir}`, {
      stdio: "pipe",
    });

    const confDir = path.join(tmpDir, "conference");
    const categories = readdirSync(confDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    const deadlines: DeadlineEntry[] = [];
    let matchedCount = 0;
    const matchedSlugs = new Set<string>();
    let skippedPast = 0;

    for (const cat of categories) {
      const catDir = path.join(confDir, cat);
      const files = readdirSync(catDir).filter((f) => f.endsWith(".yml"));

      for (const file of files) {
        const content = readFileSync(path.join(catDir, file), "utf-8");
        let conferences: CcfConference[];
        try {
          conferences = yaml.load(content) as CcfConference[];
        } catch {
          continue;
        }
        if (!Array.isArray(conferences)) continue;

        for (const conf of conferences) {
          const match = findMatch(conf, lookup);
          if (!match) continue;
          matchedCount++;
          matchedSlugs.add(match.slug);

          for (const instance of conf.confs) {
            const { start, end } = parseDateRange(instance.date);

            for (let i = 0; i < instance.timeline.length; i++) {
              const tl = instance.timeline[i];
              if (tl.deadline === "TBD") continue;

              const deadlineStr = formatDeadline(tl.deadline);
              const conferenceEnded = end
                ? isPast(end)
                : instance.year < currentYear;

              // 데드라인 + 학회 일정 둘 다 지남 → 스킵
              if (isPast(deadlineStr) && conferenceEnded) {
                skippedPast++;
                continue;
              }

              let cycle = "main";
              if (instance.timeline.length > 1) {
                if (tl.comment) {
                  cycle = tl.comment
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                    .slice(0, 30);
                } else {
                  cycle = `round-${i + 1}`;
                }
              }

              deadlines.push({
                conference_id: match.id,
                year: instance.year,
                cycle,
                abstract_deadline: tl.abstract_deadline
                  ? formatDeadline(tl.abstract_deadline)
                  : null,
                paper_deadline: deadlineStr,
                notification_date: null,
                conference_start: start,
                conference_end: end,
                venue: instance.place,
                timezone: instance.timezone,
              });
            }
          }
        }
      }
    }

    // 매칭 안 된 우리 학회 로그
    const allOurSlugs = [...lookup.values()].map((v) => v.slug);
    const uniqueOurSlugs = [...new Set(allOurSlugs)];
    const unmatchedSlugs = uniqueOurSlugs.filter(
      (s) => !matchedSlugs.has(s),
    );

    // 리포트 파일 작성
    const lines: string[] = [
      `Pipeline Report - ${new Date().toISOString()}`,
      `${"=".repeat(50)}`,
      ``,
      `Matched: ${matchedCount} / ${uniqueOurSlugs.length} conferences`,
      `Deadlines: ${deadlines.length} entries (skipped ${skippedPast} past)`,
      ``,
    ];
    if (unmatchedSlugs.length > 0) {
      lines.push(`Unmatched conferences (${unmatchedSlugs.length}):`);
      for (const s of unmatchedSlugs.sort()) {
        lines.push(`  - ${s}`);
      }
    } else {
      lines.push(`All conferences matched!`);
    }
    writeFileSync(REPORT_PATH, lines.join("\n") + "\n");
    console.log(`  Report saved to ${REPORT_PATH}`);

    if (unmatchedSlugs.length > 0) {
      console.log(
        `  ⚠ ${unmatchedSlugs.length} conferences not found in ccf-deadlines`,
      );
    }

    console.log(
      `  Matched ${matchedCount} conferences → ${deadlines.length} deadline entries (skipped ${skippedPast} past)`,
    );
    return deadlines;
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}
