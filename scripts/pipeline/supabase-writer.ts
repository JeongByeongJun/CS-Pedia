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
