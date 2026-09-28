# Independent best-paper review — 2026-09-28

Reviewer: phase1/3/6 research worker, separate from award-data author. No seed edits. Reviewed all 15 proposed additions outside CSCW24/DISC2 (already spot-checked by main), plus both CONCUR URL corrections. Live public HTTP reads were required where cached web extraction was stale or omitted badges.

## Finding requiring correction

CRYPTO CORAL is officially awarded, not an unverified claim. Live [official program JSON](https://crypto.iacr.org/2026/json/program.json) contains paperId425 with `talkNote` = `Best Paper Authored by Early Career Researchers`. The existing enum supports `best_paper_early_career`, so add:

- Title: CORAL: Faster Isogeny Group Action for Post-Quantum NIKE
- Authors: Andrea Basso; Giacomo Borin; Ryan Rueger; Sina Schaeffler
- URL: https://doi.org/10.1007/978-3-032-35398-6_17
- Conference/year/type: crypto / 2026 / best_paper_early_career

The initial artifact's claim that no official label was found must be removed. This raises additions41→42. Sent to main for author-side correction; not self-applied by reviewer.

## Verified entries

| Scope | Result | Independent evidence |
|---|---|---|
| SRDS2 | Pass | [Live official awards](https://srds-conference.org/index.php/awards/) has Cerberus under Best Paper and timing-faults title under Best Student Paper, with exactly the proposed authors. Web extractor reproducibly showed older FinG/Domino content; current live HTML resolves this discrepancy. |
| CONCUR1 | Pass | [Live official page](https://confest-2026.github.io/concur/) puts only Reachability nominee inside `strong`; following paragraph explicitly says highlighted entry is winner. [Publisher metadata](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CONCUR.2026.7) confirms all3 authors/title/DOI. Other4 nominees must remain excluded. |
| CONCUR2 URL corrections | Pass | Official Test-of-Time list directly hyperlinks exact proposed DOI suffixes `11817949_16` and `978-3-540-74407-8_5`. |
| CRYPTO1 | Pass | Official JSON paperId711 has Best Paper Award, matching title, all3 authors and DOI ending35398-6_13. |
| NOMS2 | Pass | [Live official homepage](https://noms2026.ieee-noms.org/) explicitly pairs telemetry title/all4 authors with overall award and token-bucket title/all6 authors with student award. Demo and personal service awards excluded correctly. |
| ICSME8 | Pass | Each proposed title independently located in its own live [official program](https://conf.researchr.org/program/icsme-2026/program-icsme-2026/) table row; every row has `data-facet-badge="Distinguished Paper Award"`. Titles/authors match all8 proposed records. Research4, Industry2, Visions2; no collocated SCAM row included. Publisher/preprint URLs not exhaustively reread by this pass. |
| PAKDD1 | Pass | [Official2026 awards](https://pakdd.org/awards.html) pairs the proposed title/all7 authors with Best Paper. [Springer metadata](https://link.springer.com/chapter/10.1007/978-981-92-1465-5_27) independently matches title, authors and DOI. Repeated2025/2026 DiPPSI student-title mismatch is real; hold appropriate. |

## ICSME per-row badge verification

All eight independently matched the exact distinguished badge: To Copilot and Beyond; Code Review is a Conversation; Towards Knowledge Alignment; Question Answering for Diagram-Rich Technical Meeting Videos; Optimizing Spectral Signature; It Comes in Notebooks; DebTrace; Smelly Bad Practices.

Resolution recheck: author updated the proposal to42 additions, and the CORAL record exactly matches the independently retrieved title/authors/type/DOI above. Finding resolved.

Conclusion: all16 additions and2 corrections in this review scope pass after correction. CSCW/DISC approval remains main's separate evidence, not this review's claim.
