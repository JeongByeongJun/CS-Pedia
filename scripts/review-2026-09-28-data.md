# Independent integrated-data review — 2026-09-28

Reviewer: phase2/phase4 research lane, separate from the integrating author. Read-only seed/static review; only this review artifact was written. **PASS: no blocking discrepancy found in the final integrated data.** This approval covers integration correctness and the independent source-review scope below, not a claim that every historical seed field is correct.

## Verified final state

- Deadline rows 368 → 403: 35 new (8 submission-bearing, 27 event-only), 53 existing changed; 88 total changed rows across 74 slugs. Exactly matches the union of the seven research proposal files, with no extra seed modifications. New/changed timestamps are 2026-09-28.
- Conference seed has exactly 10 website URL changes and no unrelated field changes. DASFAA rows are byte-equivalent as parsed objects to the prior baseline; the documented conflict remains on hold.
- All seven coverage tables parse to 30 / 30 / 30 / 30 / 30 / 30 / 29 distinct registered slugs, union 209, missing 0. This confirms documented investigation coverage, not 209 complete official confirmations.
- Best papers 1,980 → 2,022: 42 additions, 2 CONCUR URL corrections. Rows exactly match the reviewed proposals as a multiset; CORAL was appended last in the seed. All static award titles/types/authors/tags/URLs match seed values.
- Award summary matches data: 8 conferences, Best 14, Student 3, Distinguished 8, Honorable Mention 16, Early Career 1; 31 unresolved paper URLs remain null. Coverage artifact has 39 investigated editions.
- All 209 conference UUIDs retained. Detail deadline fields match seeds; listing/detail common fields agree. All per-conference acceptance-rate and keyword arrays match the git baseline. Listing-only changes are deadline-derived fields, venue/date/URL fields, latest awards, and refreshed D-day values.
- `node --import tsx .omc/research/verify-data-2026-09-28.ts` passes schemas, chronology for changed rows, new logical duplicates, UUIDs, static counts, and deadline parity. Existing 546 array-valued author fields are unchanged; validation normalizes them only in memory. This is not a claim that the entire legacy seed satisfies the string-author schema without normalization.
- `git diff --check` passes. Updated screen date is 2026.09.28 and Best Paper UI/metadata count is 2,022.

## Unrelated cache preservation

All three SHA-256 hashes match the parent-recorded pre-task values exactly, including the already-dirty acceptance-rates file:

| File under public/data | SHA-256 |
| --- | --- |
| acceptance-rates.json | `6c1a1acc623a9552af6d72e8f0cf0e3aa5c9392ad6052e8a543269ebd81f64f1` |
| keyword-trends.json | `60551050ea622c68621389c219a79d5d5f6faf480ffcdf09d223d500be567705` |
| top-keywords.json | `7cce685bfa591d817f2c66ebacf911b82ae7e74ff05d26697a969bbc1d0e27ce` |

## Source-review scope and remaining limits

- Independently reopened sources for all 8 phase3 proposals and all 11 phase7 proposals; supported. ICDM's hosting domain is linked directly by the official series menu. STOC homepage was added to the sources for event dates.
- Independently checked phase5/6 highest-risk new CFP and timezone edits: MobiSys, NOMS, KR, Middleware, NDSS, ISWC, PAKDD, RECOMB, RSS, Pacific Graphics, SEC, RTAS. Supported. NOMS conflicting notification remains null; its cutoff clock is unknown. RSS initial six-page manuscript is the entry deadline; invited-only final manuscript must not be advertised as open submission.
- Phase2/4 proposals were authored by this lane, so its DAC source recheck is not independent-author approval. Other reviewers/main provide the separate review lane for these proposals. Details in `.omc/research/2026-09-28-deadline-risk-review.md` and `.omc/research/2026-09-28-phase7-review.md`.
- Final maintenance/deadline summaries accurately distinguish investigated coverage, inaccessible/conflicting sources, date-only sentinels, null unknowns, and unresolved holds. ISAAC notification remains official-domain indexed evidence rather than a successful live-page fetch.
- Build/test execution, Supabase DNS failure, and deployment status were handled by main and are not independently re-executed in this data-review lane. No DB writes, commits, pushes, or deployment were performed here.
