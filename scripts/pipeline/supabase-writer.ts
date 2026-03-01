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
  Map<string, { id: string; dblpKey: string | null; nameEn: string }>
> {
  const { data, error } = await supabase
    .from("conferences")
    .select("id, slug, dblp_key, name_en");

  if (error) throw error;
  const map = new Map<
    string,
    { id: string; dblpKey: string | null; nameEn: string }
  >();
  for (const row of data ?? []) {
    map.set(row.slug, {
      id: row.id,
      dblpKey: row.dblp_key,
      nameEn: row.name_en,
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
