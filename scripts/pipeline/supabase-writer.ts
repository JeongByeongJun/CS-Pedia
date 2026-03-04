import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export async function getConferenceSlugsAndIds(): Promise<
  Map<
    string,
    {
      id: string;
      dblpKey: string | null;
      nameEn: string;
      acronym: string | null;
    }
  >
> {
  const { data, error } = await supabase
    .from("conferences")
    .select("id, slug, dblp_key, name_en, acronym");

  if (error) throw error;
  const map = new Map<
    string,
    {
      id: string;
      dblpKey: string | null;
      nameEn: string;
      acronym: string | null;
    }
  >();
  for (const row of data ?? []) {
    map.set(row.slug, {
      id: row.id,
      dblpKey: row.dblp_key,
      nameEn: row.name_en,
      acronym: row.acronym,
    });
  }
  return map;
}

export async function upsertAcceptanceRates(
  rates: {
    conference_id: string;
    year: number;
    accepted: number | null;
    rate: number | null;
    notes: string | null;
  }[],
): Promise<number> {
  if (rates.length === 0) return 0;
  const { error } = await supabase
    .from("acceptance_rates")
    .upsert(rates, { onConflict: "conference_id,year" });

  if (error) throw error;
  return rates.length;
}

export async function getExistingDeadlineKeys(): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("deadlines")
    .select("conference_id, year, cycle");

  if (error) throw error;
  const keys = new Set<string>();
  for (const d of data ?? []) {
    keys.add(`${d.conference_id}-${d.year}-${d.cycle}`);
  }
  return keys;
}

export async function insertDeadlines(
  rows: {
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
  }[],
): Promise<number> {
  if (rows.length === 0) return 0;
  const { error } = await supabase.from("deadlines").insert(rows);
  if (error) throw error;
  return rows.length;
}

export async function deduplicateBestPapers(): Promise<number> {
  const { data, error } = await supabase
    .from("best_papers")
    .select("id, conference_id, year, paper_title, award_type")
    .order("id");

  if (error) throw error;

  const seen = new Set<string>();
  const toDelete: string[] = [];

  for (const row of data ?? []) {
    const key = `${row.conference_id}|${row.year}|${row.paper_title}|${row.award_type}`;
    if (seen.has(key)) {
      toDelete.push(row.id);
    } else {
      seen.add(key);
    }
  }

  if (toDelete.length === 0) return 0;

  const { error: delError } = await supabase
    .from("best_papers")
    .delete()
    .in("id", toDelete);

  if (delError) throw delError;
  return toDelete.length;
}

export async function upsertKeywordTrends(
  rows: {
    conference_id: string;
    year: number;
    keyword: string;
    count: number;
  }[],
): Promise<number> {
  if (rows.length === 0) return 0;
  const batchSize = 500;
  let total = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase
      .from("keyword_trends")
      .upsert(batch, { onConflict: "conference_id,year,keyword" });
    if (error) throw error;
    total += batch.length;
  }
  return total;
}
