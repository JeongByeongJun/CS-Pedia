import { createClient } from "@supabase/supabase-js";
import conferences from "../src/infrastructure/seed/conferences.json";
import ratings from "../src/infrastructure/seed/institution-ratings.json";
import deadlines from "../src/infrastructure/seed/deadlines.json";
import bestPapers from "../src/infrastructure/seed/best-papers.json";
import acceptanceRates from "../src/infrastructure/seed/acceptance-rates.json";
import { ConferenceFieldEnum } from "../src/domain/entities/conference";
import { AwardTypeEnum } from "../src/domain/entities/best-paper";
import { InstitutionEnum, TierEnum } from "../src/domain/entities/institution-rating";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  // Validate seed data before upserting
  console.log("Validating seed data...");
  const errors: string[] = [];

  for (const c of conferences) {
    try { ConferenceFieldEnum.parse(c.field); }
    catch { errors.push(`conferences: ${c.slug} has invalid field "${c.field}"`); }
  }

  for (const bp of bestPapers) {
    try { AwardTypeEnum.parse(bp.award_type); }
    catch { errors.push(`best-papers: ${bp.conference_slug}/${bp.year} has invalid award_type "${bp.award_type}"`); }
  }

  for (const r of ratings) {
    try { InstitutionEnum.parse(r.institution); }
    catch { errors.push(`institution-ratings: ${r.conference_slug}/${r.institution} has invalid institution "${r.institution}"`); }
    if (r.tier !== null) {
      try { TierEnum.parse(r.tier); }
      catch { errors.push(`institution-ratings: ${r.conference_slug}/${r.institution} has invalid tier "${r.tier}"`); }
    }
  }

  if (errors.length > 0) {
    console.error("Seed data validation failed:");
    errors.forEach((e) => console.error(`  ❌ ${e}`));
    process.exit(1);
  }
  console.log("  ✅ All seed data valid");

  console.log("Seeding conferences...");
  const { error: confError } = await supabase
    .from("conferences")
    .upsert(conferences, { onConflict: "slug" });
  if (confError) throw confError;
  console.log(`  Inserted ${conferences.length} conferences`);

  // slug → id 매핑
  const { data: confData } = await supabase
    .from("conferences")
    .select("id, slug");
  const slugToId = Object.fromEntries(
    (confData ?? []).map((c) => [c.slug, c.id]),
  );

  // slug 검증
  const allSlugs = [
    ...ratings.map((r) => r.conference_slug),
    ...deadlines.map((d) => d.conference_slug),
    ...bestPapers.map((bp) => bp.conference_slug),
    ...acceptanceRates.map((ar) => ar.conference_slug),
  ];
  const missingSlugs = [...new Set(allSlugs.filter((s) => !slugToId[s]))];
  if (missingSlugs.length > 0) {
    console.error("Missing conference slugs:", missingSlugs);
    process.exit(1);
  }

  console.log("Seeding institution ratings...");
  const ratingRows = ratings.map((r) => ({
    conference_id: slugToId[r.conference_slug],
    institution: r.institution,
    tier: r.tier,
    year: r.year,
    notes: "notes" in r ? (r as Record<string, unknown>).notes : null,
  }));
  const { error: ratingError } = await supabase
    .from("institution_ratings")
    .upsert(ratingRows, {
      onConflict: "conference_id,institution,year",
    });
  if (ratingError) throw ratingError;
  console.log(`  Inserted ${ratingRows.length} ratings`);

  console.log("Seeding deadlines...");
  const deadlineRows = deadlines.map((d) => ({
    conference_id: slugToId[d.conference_slug],
    year: d.year,
    cycle: d.cycle,
    abstract_deadline: d.abstract_deadline,
    paper_deadline: d.paper_deadline,
    notification_date: d.notification_date,
    conference_start: d.conference_start,
    conference_end: d.conference_end,
    venue: d.venue,
    timezone: d.timezone,
  }));
  const { error: deadlineError } = await supabase
    .from("deadlines")
    .upsert(deadlineRows, {
      onConflict: "conference_id,year,cycle",
    });
  if (deadlineError) throw deadlineError;
  console.log(`  Inserted ${deadlineRows.length} deadlines`);

  console.log("Seeding best papers...");
  const bestPaperRows = bestPapers.map((bp) => ({
    conference_id: slugToId[bp.conference_slug],
    year: bp.year,
    paper_title: bp.paper_title,
    authors: bp.authors,
    award_type: bp.award_type,
    tags: bp.tags,
    paper_url: (bp as Record<string, unknown>).paper_url ?? null,
  }));
  const { error: bpError } = await supabase
    .from("best_papers")
    .upsert(bestPaperRows, { onConflict: "conference_id,year,paper_title,award_type" });
  if (bpError) throw bpError;
  console.log(`  Inserted ${bestPaperRows.length} best papers`);

  console.log("Seeding acceptance rates...");
  const arRows = acceptanceRates.map((ar) => ({
    conference_id: slugToId[ar.conference_slug],
    year: ar.year,
    submitted: ar.submitted,
    accepted: ar.accepted,
    rate: ar.rate,
  }));
  const { error: arError } = await supabase
    .from("acceptance_rates")
    .upsert(arRows, { onConflict: "conference_id,year" });
  if (arError) throw arError;
  console.log(`  Inserted ${arRows.length} acceptance rates`);

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
