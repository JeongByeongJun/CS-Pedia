import { createClient } from "@supabase/supabase-js";
import conferences from "../src/infrastructure/seed/conferences.json";
import ratings from "../src/infrastructure/seed/institution-ratings.json";
import deadlines from "../src/infrastructure/seed/deadlines.json";
import bestPapers from "../src/infrastructure/seed/best-papers.json";
import acceptanceRates from "../src/infrastructure/seed/acceptance-rates.json";

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
  }));
  const { error: bpError } = await supabase
    .from("best_papers")
    .upsert(bestPaperRows);
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
