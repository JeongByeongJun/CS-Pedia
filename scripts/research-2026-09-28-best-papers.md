# Best Papers research — 2026-09-28

## Result

- 39 conference editions checked: September candidates (including Aug31 overlap), all 17 unresolved conferences from the September 9 report, CSCW/DISC/CoNLL leads, and NOMS/ISCA/ICS/MFCS followups.
- 42 verified additions across 8 conferences: CSCW 24, ICSME 8, SRDS 2, DISC 2, NOMS 2, CRYPTO 2, CONCUR 1, PAKDD 1.
- 2 URL-only corrections to existing CONCUR 2026 Test-of-Time records.
- Exact seed-shaped entries, per-entry official evidence, and full coverage are preserved in [research-2026-09-28-changes.json](research-2026-09-28-changes.json), under bestPaperResearch.
- Research lane did not edit shared seed/static files; integration subsequently applied all 42 additions and 2 URL corrections. 31 papers retain null URLs because a direct paper link was not confirmed. An award page is not substituted for a paper URL.

## Evidence handling

Official award headings and explicit per-paper badges were required. A best-paper session, finalist list, nomination call, schedule ceremony, author biography, or third-party claim was not accepted as a winner list.

CONCUR: the official page lists five nominees and explicitly identifies the highlighted winner. Live HTML bolds the full Reachability entry only, so this resolves the prior nomination-only hold. Publisher confirms title, authors and DOI.

ICSME: live Researchr HTML exposes Distinguished Paper Award via data-facet-badge and image alt even where the text extractor omits it. Eight supported research/industry/visions entries are included. Two collocated SCAM winners and two ICSME tool/data-showcase entries (GHAgentFiles, FuzzMeter) remain outside the existing main-paper scope.

SRDS: a web-open snapshot returned 2025 titles under the current site. Direct live official HTML and indexed current text agree on Cerberus and the timing-faults student paper; only those current entries are proposed.

CRYPTO: the official program page is a loading shell. Its public JSON payload explicitly marks paperId 711 as Best Paper Award and paperId 425 (CORAL) as Best Paper Authored by Early Career Researchers, with full authors and DOI. Independent review exposed an incomplete initial extraction; a direct live recheck confirms CORAL, which is included as best_paper_early_career and no longer held.

CSCW: eight Best Papers and sixteen Honorable Mentions are directly listed. Affiliation parentheses were removed from author strings; title-final full stops were normalized. Lasting Impact is held rather than silently mapped to Test of Time; Impact/Methods/DEI recognitions are excluded.

DISC: the official committee announcement already selects overall and student winners although the conference itself is in November. Both paper links independently resolve to matching arXiv metadata. CoNLL's three announced winners already exist unchanged.

PAKDD: only the overall Best Paper is independently consistent with its Springer chapter. The 2026 student entry repeats the previous year's DiPPSI title with different authors, so it is explicitly held. Survey and Most Influential awards lack exact supported types.

## Coverage

| Conference | Result | Official source / finding |
| --- | --- | --- |
| noms | add_2 | [Official home](https://noms2026.ieee-noms.org/) explicitly names overall and student winners; demo and personal service award excluded. |
| isca | existing | [Official home](https://www.iscaconf.org/isca2026/) has two Best winners already in seed. |
| ics | existing | [Official home](https://dipsa-qub.github.io/ICS2026-webpage/) OCTANE winner already in seed. |
| mfcs | existing | [Official home](https://mfcs2026.irif.fr/) Best1/Student2 already in seed. |
| cluster | hold | [Official source](https://clustercomp.org/2026/program/) — Official home/program/news contain no final paper award winner. |
| eccv | hold | [Official source](https://eccv.ecva.net/Conferences/2026) — Official live awards navigation says coming soon with empty href; workshop results excluded. |
| ecml-pkdd | hold | [Official source](https://ecmlpkdd.org/2026/) — 2026 navigation still points awards to 2025; 2026 awards path unavailable. |
| esorics | hold | [Official source](https://sites.google.com/di.uniroma1.it/esorics2026/) — Official award policy found, no final winner list. |
| icip | hold | [Official source](https://2026.ieeeicip.org/) — No final main award winners found; WIP/sponsor and industry finalists not treated as main winners. |
| icsme | add_8 | [Official source](https://conf.researchr.org/program/icsme-2026/program-icsme-2026/) — 8 supported award badges; excluded collocated SCAM 2 and ICSME tool/demo 2 under existing scope convention. |
| iros | hold_ongoing | [Official source](https://2026.ieee-iros.org/) — Sep27–Oct1 event ongoing; no final main awards confirmed; finalists and workshop awards excluded. |
| miccai | hold_unavailable | [Official source](https://conferences.miccai.org/2026/) — Edition site 520; society page explicitly confirms relocation to Strasbourg and revised Sep27–Oct1. Seed schedule is correct. No final paper winners confirmed. |
| recsys | hold_ongoing | [Official source](https://recsys.acm.org/recsys26/recsys-26-lasting-impact-award/) — Sep28–Oct2 event ongoing; lasting-impact page is nomination call, not winner announcement. |
| icpp | hold_ongoing | [Official source](https://icpp2026.github.io/) — Sep28–Oct1 event ongoing; no final winners. |
| avss | hold | [Official source](https://www.avss2026.org/) — No final award winner text; keynote biography awards not conference winners. |
| concur | add_1_correct_2 | [Official source](https://confest-2026.github.io/concur/) — 1 Best Paper explicit highlighted winner among 5 nominees; 2 existing Test-of-Time DOI links recovered. |
| iiswc | hold_ongoing | [Official source](https://iiswc.org/iiswc2026/program.html) — Best Paper Session contains 7 papers and award ceremony; no final winner designation. |
| srds | add_2 | [Official source](https://srds-conference.org/index.php/awards/) — 2 current official winners; live HTML and search agree, web-open snapshot stale. |
| esa | hold | [Official source](https://algo-conference.org/2026/esa/) — Award policy found; no final winner designation. |
| vldb | existing_plus_hold | [Official source](https://www.vldb.org/2026/conference-awards.html) — Existing Best1/HM3/Test-of-Time1 complete. OmniTable best industry and FastCompose industry honorable mention held for exact subtype. |
| mobilehci | hold | [Official source](https://mobilehci.acm.org/2026/program/program-at-a-glance.html) — 4 generic Award Winning badges still lack award subtype. |
| soups | hold | [Official source](https://soups.page/2026/program.html) — Opening awards session only; USENIX proceedings also lack winner markers. |
| icpr | hold | [Official source](https://www.icpr2026.org/program.html) — Awards sessions only; independent author claims not official winner list. |
| case | hold | [Official source](https://ras.papercept.net/conferences/scripts/rtf/CASE26_ProgramAtAGlanceWeb.html) — Award sessions only, not final title-author winners; workshop poster/presentation awards excluded. |
| re | hold | [Official source](https://conf.researchr.org/home/RE-2026) — No exact winner list. History site is empty JS shell. |
| crypto | add_2 | [Official source](https://crypto.iacr.org/2026/json/program.json) — Overall Best Paper and CORAL Early Career labels explicit on paperIds 711/425. Prior incomplete extraction corrected after independent review. |
| kdd | hold | [Official source](https://kdd2026.kdd.org/papers/) — No final official winner list; institutional/author claims alone not used. |
| csf | hold | [Official source](https://program.floc26.org/CSF-index) — Official accepted list and detailed program have no winner badges. |
| ijcar | hold | [Official source](https://program.floc26.org/IJCAR-2026-07-26) — Award presentations identify chairs, not awarded title/authors; no inference. |
| sigir | hold | [Official source](https://sigir.org/awards/best-paper-awards/) — Official historical list stops at 2025. |
| cloud | hold_stale | [Official source](https://services.conferences.computer.org/2026/awards/) — Path 2026 but live heading explicitly SERVICES 2025 AWARDS; do not relabel. |
| icws | hold_stale | [Official source](https://services.conferences.computer.org/2026/awards/) — Path 2026 but live heading explicitly SERVICES 2025 AWARDS; do not relabel. |
| iui | hold | [Official source](https://iui.acm.org/2026/) — Official Best Paper Award video link exists but video unavailable; no title/authors accessible. Institutional OntoScope HM claim not independently official. |
| icdcs | hold | [Official source](https://icdcs2026.icdcs.org/) — No official final awards found; prior incomplete third-party list still not sufficient. |
| lctes | hold | [Official source](https://pldi26.sigplan.org/home/LCTES-2026) — Distinguished award policy and artifact badges only, no final winner marker. |
| pakdd | add_1_plus_hold | [Official source](https://pakdd.org/awards.html) — 2026 Best verified against publisher. Student title repeats 2025 with conflicting authors; influential/survey exact subtypes unsupported. |
| cscw | add_24_plus_hold | [Official source](https://cscw.acm.org/2026/awards.html) — 8 Best +16 Honorable Mention. Lasting Impact subtype held; Impact5/Methods4/DEI7 recognitions excluded. |
| disc | add_2 | [Official source](https://www.disc-conference.org/wp/disc2026/best-paper-award/) — Best1/Student1 selected officially before November event. |
| conll | existing | [Official source](https://www.conll.org/2026) — Best1/Outstanding2 official award session matches all 3 existing rows. |

## Carry-forward and availability issues

- ECCV: official Awards link still says coming soon.
- ECML-PKDD: 2026 navigation points at 2025 awards; no current winners.
- SERVICES CLOUD/ICWS: 2026 URL serves a page explicitly labelled SERVICES 2025 AWARDS.
- MICCAI: edition homepage returned HTTP 520. Followup [society page](https://miccai.org/upcoming-conferences/) explicitly confirms relocation from Abu Dhabi to Strasbourg and revised Sep27–Oct1 dates, resolving the apparent contradiction from stale sponsor/newsletter search metadata.
- IUI: official Best Paper presentation video link is accessible as a link, but not its title/author content; no invention.
- MobileHCI: four Award Winning entries still lack an award subtype.
- VLDB: all supported current winners already present; two industry-specific subtypes still held.
- Current enum was checked, including best_student_paper_runner_up and computational_modeling_prize. This report follows September 9 unresolved status rather than treating superseded July schema holds as outstanding.
