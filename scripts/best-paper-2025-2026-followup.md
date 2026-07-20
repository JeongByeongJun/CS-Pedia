# Best Paper 2025-2026 Follow-up

## 2026-07-09 Recent Conference Awards Update

최근 종료 학회 중심으로 공식 awards 페이지를 재확인하고, 공식 페이지에서 제목/저자/award가 명확한 항목을 seed에 반영.

### Seed Applied

Applied to `src/infrastructure/seed/best-papers.json` on 2026-07-09.

| Status | Entries | Conferences | Source / Notes |
|--------|---------|-------------|----------------|
| applied | 10 | ICML 2026 | Official ICML Blog lists 2 Outstanding Papers, 1 Outstanding Position Paper, 5 Outstanding Paper Honorable Mentions, 1 Position Paper Honorable Mention, and 1 Test of Time Award. Paper URLs use official ICML virtual pages or PMLR for Test of Time. Source: https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/ |
| applied | 33 | ACL 2026 | Official ACL Best Paper Awards page lists Best Papers, Best Theme/Resource/Social Impact papers, Outstanding Papers, Best Demonstration Paper, and SRW Best Papers. ACL Anthology links were not yet exposed on the awards/accepted pages, so `paper_url` uses official awards section anchors for now. Source: https://2026.aclweb.org/program/best_papers/ |
| applied | 2 | ISCA 2026 | Official ISCA homepage announcement lists two 2026 Best Paper Awards. Source: https://www.iscaconf.org/isca2026/ |
| applied | 3 | WWW 2026 | Official WWW 2026 homepage lists Best Paper, Best Short Paper, and Seoul Test of Time winners. Source: https://www2026.thewebconf.org/ |
| applied | 2 | COLT 2026 | Official COLT awards page lists Best Paper and Best Student Paper. Proceedings links were not yet available from the accepted/awards pages, so `paper_url` uses the official awards page for now. Source: https://learningtheory.org/colt2026/awards.html |

### Hold / Recheck

| Status | Conference | Year | Reason | Source |
|--------|------------|------|--------|--------|
| hold | SIGMOD | 2026 | `sigmod_awards.shtml` exists and has an official page title, but the fetched page currently exposes no award body/title rows. Recheck later before seed insertion. | https://2026.sigmod.org/sigmod_awards.shtml |
| hold | PODS | 2026 | `pods_awards.shtml` exists and has an official page title, but the fetched page currently exposes no award body/title rows. Recheck later before seed insertion. | https://2026.sigmod.org/pods_awards.shtml |
| hold | CVPR | 2026 | Official site did not expose a main Best Paper Award page in this pass. Avoid seeding unofficial/social-only claims. | https://cvpr.thecvf.com/Conferences/2026 |
| hold | PLDI | 2026 | Researchr/program data likely marks Distinguished Papers, but needs careful extraction and verification before bulk seed insertion. | https://pldi26.sigplan.org/ |
| hold | STOC | 2026 | No official final Best Paper Award winner page found in this pass. | https://acm-stoc.org/stoc2026/ |
| hold | FSE | 2026 | Conference ends on 2026-07-09; final awards page not found yet. Recheck after conference pages settle. | https://conf.researchr.org/home/fse-2026 |

---

Generated: 2026-06-01 KST
Scope: ended conferences missing best-paper seed data as of 2026-06-01.

## Queue Summary

- 2025 missing target: 1
- 2026 missing targets: 48
- Total targets: 49

## Confirmed Candidates

| Status | Conference | Year | Award | Title | Authors | Source | Paper URL |
|--------|------------|------|-------|-------|---------|--------|-----------|
| confirmed | AACL | 2025 | best_paper | Beyond statistical significance: Quantifying uncertainty and statistical variability in multilingual and multitask NLP evaluation | Jonne Saleva; Duygu Ataman; Constantine Lignos | https://2025.aaclnet.org/program/best_papers/ | https://aclanthology.org/2025.ijcnlp-long.125.pdf |
| confirmed | PPoPP | 2026 | best_paper | Binary Compatible Critical Section Delegation | Junyao Zhang; Zhuo Wang; Zhe Zhou | https://ppopp26.sigplan.org/track/PPoPP-2026-papers | |
| confirmed | WSDM | 2026 | best_paper | Diversification as Risk Minimization | Rikiya Takehi; Fernando Diaz; Tetsuya Sakai | https://sakailab.com/wsdm2026/ | https://arxiv.org/abs/2510.22681 |
| confirmed | 3DV | 2026 | best_paper | Look Around and Pay Attention: Multi-camera Point Tracking Reimagined with Transformers | Bishoy Galoaa et al. | https://coe.northeastern.edu/news/best-paper-award-at-3dv-2026-for-lapa-multi-camera-point-tracking/ | https://ostadabbas.github.io/LAPA/ |
| confirmed | ICSE | 2026 | distinguished_paper | A Comprehensive Study of Deep Learning Model Fixing Approaches | Hanmo You; Zan Wang; Zishuo Dong; Luanqi Mo; Jianjun Zhao; Junjie Chen | https://conf.researchr.org/info/icse-2026/awards | https://arxiv.org/abs/2512.23745 |

## Confirmed, Needs Bulk Entry

These official pages list multiple awards and should be converted to seed rows in a separate pass.

| Status | Conference | Year | Award | Count | Source | Notes |
|--------|------------|------|-------|-------|--------|-------|
| confirmed | POPL | 2026 | distinguished_paper | at least 8 | https://popl26.sigplan.org/program/program-POPL-2026/ | Program marks individual POPL papers as Distinguished Paper. |
| confirmed | ICSE | 2026 | distinguished_paper | 22 | https://conf.researchr.org/info/icse-2026/awards | Official awards page lists ACM SIGSOFT Distinguished Paper Awards. |

## Seed Applied

Applied to `src/infrastructure/seed/best-papers.json` on 2026-06-01.

| Status | Entries | Conferences | Notes |
|--------|---------|-------------|-------|
| applied | 31 | AACL, PPoPP, WSDM, 3DV, EDBT, DASFAA, ISPASS, RTAS, ASPLOS, IEEE VR, SANER, SAC | Added confirmed single-paper and moderate-size official award lists. Paper URLs were added where DOI/arXiv/PDF/project URLs were found; 30/31 applied rows now have URLs. |
| pending_bulk | TBD | POPL, ICSE, ESOP/FASE/TACAS | Official sources confirm awards, but rows need careful extraction from program/proceedings before seed insertion. |
| pending_url_backfill | 1 | SANER | `Beyond Lexical: Functional Semantics and Fusion for Precise Architecture Recovery` by Chunguang Zhang, Bixin Li, Yan Xiao still needs a confirmed paper URL/DOI/PDF. |

## 9-item Token Sample Batch

| Status | Conference | Year | Result | Source | Notes |
|--------|------------|------|--------|--------|-------|
| confirmed | AACL | 2025 | Best Paper page lists the winner. | https://2025.aaclnet.org/program/best_papers/ | Safe to seed. |
| hold | SODA | 2026 | No official winner found in this pass. | https://www.siam.org/conferences-events/siam-conferences/soda27/ | Search did not surface a SODA 2026 award announcement; keep queued. |
| confirmed_bulk | POPL | 2026 | Program marks multiple papers as Distinguished Paper. | https://popl26.sigplan.org/track/POPL-2026-popl-research-papers | Needs extraction of all marked rows before seed. |
| hold | HiPEAC | 2026 | General HiPEAC awards page exists, but no HiPEAC 2026 paper-award winners found. | https://www.hipeac.net/awards/ | Keep queued. |
| hold | ITCS | 2026 | CFP says committee may award a best student paper, but no winner found. | https://itcs-conf.org/ | Keep queued. |
| hold | CC | 2026 | Program page did not mark Best/Distinguished Paper winners. | https://conf.researchr.org/track/CC-2026/calls | Keep queued. |
| hold | CGO | 2026 | CFP says up to 10% may be Distinguished Papers, but accepted/program view did not expose final winners. | https://2026.cgo.org/track/cgo-2026-papers | Keep queued. |
| hold | HPCA | 2026 | Program exposes Best Paper Candidates, but no final winner confirmed. | https://2026.hpca-conf.org/track/hpca-2026-main-conference | Keep queued unless storing nominees. |
| confirmed | PPoPP | 2026 | Program marks one Best Paper Award and several nominees. | https://ppopp26.sigplan.org/track/PPoPP-2026-papers | Safe to seed winner; nominees optional/usually skip. |

## Full Queue Sweep

Status meanings:

- `confirmed`: winner/title is visible from an official or strong venue/lab page.
- `confirmed_bulk`: official page lists multiple awards; needs extraction before seed.
- `hold`: only policy/nominees/candidates found, or no winner page found in this pass.

| Status | Conference | Year | Evidence | Source |
|--------|------------|------|----------|--------|
| confirmed | AACL | 2025 | Best Paper winner listed. | https://2025.aaclnet.org/program/best_papers/ |
| hold | SODA | 2026 | No official SODA 2026 award winner found in this pass. | https://www.siam.org/conferences-events/siam-conferences/soda27/ |
| confirmed_bulk | POPL | 2026 | Program marks multiple Distinguished Papers. | https://popl26.sigplan.org/track/POPL-2026-popl-research-papers |
| hold | HiPEAC | 2026 | Awards page exists, but no HiPEAC 2026 paper winner list found. | https://www.hipeac.net/awards/ |
| hold | ITCS | 2026 | CFP says committee may award Best Student Paper; no winner found. | https://itcs-conf.org/ |
| hold | CC | 2026 | Program page did not expose Best/Distinguished winners. | https://conf.researchr.org/track/CC-2026/calls |
| hold | CGO | 2026 | CFP describes Distinguished Paper Awards; final winners not exposed in program page found. | https://2026.cgo.org/track/cgo-2026-papers |
| hold | HPCA | 2026 | Best Paper Candidates listed, but no final winner confirmed. | https://2026.hpca-conf.org/track/hpca-2026-main-conference |
| confirmed | PPoPP | 2026 | Program marks Best Paper Award winner. | https://ppopp26.sigplan.org/track/PPoPP-2026-papers |
| confirmed | WSDM | 2026 | Best Full Research Paper Award winner found. | https://sakailab.com/wsdm2026/ |
| hold | FC | 2026 | No official FC 2026 paper-award winner found in this pass. | https://ifca.ai/fc26/ |
| hold | WACV | 2026 | No official WACV 2026 award winner page found in this pass. | https://wacv.thecvf.com/Conferences/2026 |
| hold | STACS | 2026 | Proceedings/program found; no award winner page found in this pass. | https://stacs2026.imag.fr/ |
| hold | HRI | 2026 | No official HRI 2026 paper-award winner found in this pass. | https://humanrobotinteraction.org/2026/ |
| hold | PerCom | 2026 | Workshop best-paper news found, but no main-conference Mark Weiser winner page found. | https://percom.org/call-for-papers |
| confirmed_bulk | SANER | 2026 | Official awards page lists Distinguished Paper awards. | https://conf.researchr.org/attending/saner-2026/awards |
| confirmed | 3DV | 2026 | Best Paper Award winner found. | https://coe.northeastern.edu/news/best-paper-award-at-3dv-2026-for-lapa-multi-camera-point-tracking/ |
| confirmed_bulk | IEEE VR | 2026 | Official awards page lists Best Papers and Honorable Mentions. | https://ieeevr.org/2026/awards/conference-awards/ |
| confirmed_bulk | ASPLOS | 2026 | Official awards page lists Best Paper Awards. | https://www.asplos-conference.org/asplos2026/awards/index.html |
| confirmed | EDBT | 2026 | Best Paper Award winner found. | https://www.cs.uic.edu/~bglavic/dbgroup/2026/02/11/EDBT-best-paper.html |
| confirmed_bulk | SAC | 2026 | Official page lists SAC 2026 award winners by track. | https://www.sigapp.org/sac/sac2026/index.php |
| hold | EACL | 2026 | Official page says recipients will be announced at the conference. | https://2026.eacl.org/program/best-paper/ |
| hold | NOSSDAV | 2026 | No official paper-award winner found in this pass. | https://nossdav.org/2026/ |
| hold | MSR | 2026 | Awards page is community awards, not paper awards; no paper winner found. | https://2026.msrconf.org/track/msr-2026-msr-awards |
| confirmed_bulk | ESOP/FASE/TACAS | 2026 | ETAPS proceedings foreword says 16 ETAPS distinguished papers selected; needs per-conference extraction from proceedings. | https://etaps.org/files/2026/tacas-ii-2026.pdf |
| confirmed_bulk | ICSE | 2026 | Official awards page lists ACM SIGSOFT Distinguished Paper Awards. | https://conf.researchr.org/info/icse-2026/awards |
| hold | DATE | 2026 | No official DATE 2026 best-paper winner found in this pass. | https://www.date-conference.com/date-2026 |
| confirmed | ISPASS | 2026 | Official site lists two Best Paper Award winners. | https://ispass.org/ispass2026/main.php |
| confirmed | DASFAA | 2026 | Official awards page lists Best Paper and Runner-Up. | https://dasfaa2026.github.io/program/awards.html |
| hold | EuroSys | 2026 | Accepted papers found; no official 2026 Best Paper winner found. | https://2026.eurosys.org/papers.html |
| hold | NSDI | 2026 | No official NSDI 2026 best-paper winner page found in this pass. | https://www.usenix.org/conference/nsdi26 |
| hold | Eurographics | 2026 | Award policy/CFP found; no 2026 winner list found. | https://eg2026.github.io/call_for_full_papers/ |
| hold | ICDE | 2026 | No official ICDE 2026 award winner page found in this pass. | https://icde2026.github.io/ |
| hold | EUROCRYPT | 2026 | Conference site found; no award winner list found in this pass. | https://eurocrypt.iacr.org/2026/ |
| confirmed | RTAS | 2026 | Official news lists two Best Paper Award winners. | https://2026.rtas.org/ |
| hold | SenSys | 2026 | Site found; no 2026 award winner list found in this pass. | https://sensys.hosting2.acm.org/ |
| hold | I3D | 2026 | Conference site found; no award winner list found in this pass. | https://i3dsymposium.org/2026/ |
| hold | LREC | 2026 | No official award winner page found in this pass. | https://lrec2026.info/ |
| hold | CCGrid | 2026 | Artifact/badge page found; no paper award winner found. | https://ccgrid2026.org/artifacts.html |
| hold | INFOCOM | 2026 | Conference site found; no paper award winner found. | https://infocom2026.ieee-infocom.org/group/81 |
| hold | S&P | 2026 | No official IEEE S&P 2026 award winner page found in this pass. | https://sp2026.ieee-security.org/ |
| hold | ICST | 2026 | No official ICST 2026 Distinguished Paper winner found in this pass. | https://conf.researchr.org/home/icst-2026 |
| hold | NOMS | 2026 | No official NOMS 2026 paper award winner found in this pass. | https://noms2026.ieee-noms.org/ |
| hold | AAMAS | 2026 | Official page lists Best Paper nominees, not final winners. | https://cyprusconferences.org/aamas2026/awards/ |
| hold | IPDPS | 2026 | CFP says one Best Paper will be named; no final winner found. | https://www.ipdps.org/ipdps2026/2026-call-for-papers.html |
| hold | RECOMB | 2026 | Awards page has winners through 2025; no 2026 winner found. | https://recomb.org/awards/ |

## Hold / Not Final Award

| Status | Conference | Year | Reason | Source |
|--------|------------|------|--------|--------|
| hold | SODA | 2026 | No official SODA 2026 Best Paper Award winner found in this pass. | https://www.siam.org/conferences-events/siam-conferences/soda27/ |
| hold | HiPEAC | 2026 | General awards page exists, but no HiPEAC 2026 paper-award winner list found. | https://www.hipeac.net/awards/ |
| hold | ITCS | 2026 | CFP says the committee may award a best student paper, but no winner found in this pass. | https://itcs-conf.org/ |
| hold | CC | 2026 | Program page did not mark Best/Distinguished Paper winners. | https://conf.researchr.org/track/CC-2026/calls |
| hold | CGO | 2026 | CFP describes Distinguished Paper Awards, but final winners were not exposed in the accepted/program page found. | https://2026.cgo.org/track/cgo-2026-papers |
| hold | HPCA | 2026 | Program exposes Best Paper Candidates, but a final Best Paper Award winner was not confirmed in this pass. | https://2026.hpca-conf.org/program/program-hpca-2026/ |
| hold | EACL | 2026 | Official Best Paper page exists, but still says recipients will be announced at the conference. | https://2026.eacl.org/program/best-paper/ |

## Remaining Targets

Continue checking the remaining ended-missing queue from `scripts/post-conf-report.md`, prioritizing older conferences first:

SODA, POPL, HiPEAC, ITCS, CC, CGO, HPCA, PPoPP, FC, WACV, STACS, HRI, PerCom, SANER, 3DV, IEEE VR, ASPLOS, EDBT, SAC, EACL, NOSSDAV, MSR, ESOP, FASE, TACAS, DATE, ISPASS, DASFAA, EuroSys, NSDI, Eurographics, ICDE, EUROCRYPT, RTAS, SenSys, I3D, LREC, CCGrid, INFOCOM, S&P, ICST, NOMS, AAMAS, IPDPS, RECOMB.

## 2026-07-20 Recent Conference Sweep

- 조사 범위: 2026-01-21 이후 종료 학회 76개 후보 중 최근/미수록 학회 우선
- seed 반영: 14개 학회, 58개 수상 논문
- 링크: 반영 58개 전부 개별 DOI, proceedings, CVF, ACL Anthology 또는 USENIX paper URL 보유
- 제외: 데모/포스터/워크숍, 후보만 공개된 논문, 현재 award schema와 의미가 다른 Dijkstra/Impact 상

| 학회 | 반영 수 | 반영 유형 | 수상 출처 |
|------|--------:|-----------|-----------|
| CVPR | 5 | Best, Best Student, Honorable Mention | https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers |
| PLDI | 11 | Distinguished, Most Influential→Test of Time | https://pldi26.sigplan.org/track/pldi-2026-papers |
| SIGMOD | 5 | Best, Honorable Mention, Test of Time | https://2026.sigmod.org/sigmod_awards.shtml |
| PODS | 4 | Best, Distinguished, Test of Time | https://2026.sigmod.org/pods_awards.shtml |
| PODC | 2 | Best, Best Student | https://www.podc.org/podc2026/ |
| SPAA | 3 | Best, Outstanding | https://spaa.acm.org/best-paper-award/ |
| FSE | 10 | Distinguished | https://conf.researchr.org/track/fse-2026/fse-2026-plenary-events |
| OSDI | 3 | Best | https://www.usenix.org/conference/osdi26/technical-sessions |
| ICALP | 4 | Best, Best Student | https://icalppodcspaa2026.cs.rhul.ac.uk/icalp/ |
| CoNLL | 3 | Best, Outstanding | https://www.conll.org/2026 |
| ECOOP | 4 | Distinguished, Test of Time | https://2026.ecoop.org/track/ecoop-2026-awards |
| EGSR | 1 | Best | https://egsr2026.inria.fr/programme/ |
| SGP | 1 | Test of Time | https://awards.geometryprocessing.org/ |
| DSN | 2 | Test of Time | https://www.dependability.org/?page_id=373 |

### 2026 보류

| 학회 | 사유 |
|------|------|
| CLOUD, ICWS, GECCO, RSS, HPDC | 2026 최종 수상 결과 미게시 또는 후보만 공개 |
| IUI, ICS, ICMR | 공식 프로그램에 후보만 있고 최종 winner 미확인 |
| SCA | 1차 awards 자료와 독립 재검증에서 공식 공개 여부가 충돌 |
| ECRTS | Outstanding Papers 세션은 후보/최종 수상 구분이 불명확 |
| ICAPS, MDM, MobiSys, DSN Best/Distinguished | 수상 정보는 발견했으나 독립 DOI/award type 재검증이 미완료 |
| STOC Best/Student | 합동 수상 세션만 공개되어 논문별 유형 미확정 |
