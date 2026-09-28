# Deadline Check — Phase 5 (2026-09-28)

30개 학회 최신 등록 회차와 다음 유효 회차를 점검했다. 스킬의 6개 논리 그룹(각5개)을 이 phase 담당 에이전트가 순서대로 조사했으며, 동시 슬롯 제한으로 추가 subagent는 생성하지 않았다. seed/static 직접 수정 없음. 확정 제안은 `.omc/research/2026-09-28-phase5.json`.

## 결과

- 기존 수정 5행: ITS2026 notification, ISWC2026 notification, KR2026 마감시간 인코딩, Middleware2026 winter 시간대, NDSS2027 second notification.
- 신규 CFP 2행: MobiSys2027, NOMS2027.
- 일정만 신규 5행: ISSRE2027, ITS2027, LICS2027, MICCAI2028, MSST2027. 미발표 마감일은 null 유지.
- URL 갱신 2건: MobiSys, NOMS. 일정만 발표한 다음 회차는 website_url 교체하지 않는다.
- NAACL2027 ARR 마감 10월12일 23:59AoE는 오늘부터 14일(임박). Commitment12월23일과 혼동하지 않는다.

## 전체 커버리지

| 학회 | DB 최신 | 검증 | 다음 회차 | 상태 | 공식 근거 및 특이사항 |
| --- | --- | --- | --- | --- | --- |
| isrr | 2026 | ok_dates_clock_unverified | 2028 | not_announced | Dates/May31 paper/Aug1 notification match; source omits clock/timezone, existing AoE not re-proven. IFRR confirms even-year recent series. [근거1](https://isrr2026.su.domains/) [근거2](https://ifrr.org/isrr) |
| issre | 2026 | ok | 2027 | schedule_only | Current Apr24 both/AoE/Jul8 notification match. Next Oct19–22 Macau; research CFP placeholder. [근거1](https://cyprusconferences.org/issre2026/) [근거2](https://conf.researchr.org/home/issre-2027) [근거3](https://conf.researchr.org/track/issre-2027/issre-2027-papers) |
| issta | 2027 | ok | 2028 | location_only | Jan8/11 AoE, final Jun17 match. Next Shanghai confirmed by series, no dates/CFP. [근거1](https://conf.researchr.org/track/issta-2027/issta-2027-research-papers) [근거2](https://www.issta.org/) |
| iswc | 2026 | updated | 2027 | not_announced | May2/7 23:59AoE match; add July16 notification from official JS content. SWSA 2027 location TBA, Oct/Nov only. [근거1](https://iswc2026.semanticweb.org/#/calls/research) [근거2](https://swsa.semanticweb.org/conferences/) |
| itcs | 2027 | ok | 2028 | not_announced | Sep2/4 16:59PDT, Nov6 notification, Jan12–15 Berkeley match; seed URL inaccessible in web but canonical official domain works. [근거1](https://itcs-conf.org/) |
| its | 2026 | updated_clock_unverified | 2027 | schedule_only | Feb28 paper matches; add Mar30 notification. Current source no clock; new Rome Jun16–18 announced in current homepage NEWS, no CFP. [근거1](https://iis-international.org/its2026/) |
| iui | 2027 | ok | 2028 | not_announced | Aug13/20 end-of-day AoE; Nov23 final notification; Feb8–11 Helsinki match. [근거1](https://iui.acm.org/2027/call-for-papers/) [근거2](https://iui.acm.org/2027/) |
| kdd | 2027 | ok | 2028 | not_announced | First cycle Jul19/26 end-of-day AoE, Nov14 notification, Aug1–5 San Jose match. Cycle2 only February reference, no exact dates. [근거1](https://kdd2027.kdd.org/research-track-call-for-papers/) [근거2](https://kdd2027.kdd.org/) |
| kr | 2026 | updated_encoding | 2027 | location_only | Official Feb8/13 AoE vs stored absolute UTC Feb9/14 11:59; normalize to repository local wall-clock encoding. Next Buenos Aires, no dates/CFP. [근거1](https://kr.org/KR2026/call_main_track.html) [근거2](https://kr.org/KR2026/dates.html) [근거3](https://kr.org/) |
| lctes | 2026 | ok | 2027 | not_announced | Extended Mar13/20 AoE and May1 notification match. Old CFP body retains unextended dates; latest header/sidebar authoritative. [근거1](https://pldi26.sigplan.org/home/LCTES-2026) |
| lics | 2026 | ok | 2027 | schedule_only | Jan15/22 AoE, Apr16 notification match. Next main Jun21–24 Montreal, no CFP. [근거1](https://lics.siglog.org/lics26/cfp.php) [근거2](https://lics.siglog.org/lics27/) |
| lrec | 2026 | ok | 2028 | not_announced | Oct24 2025 23:59UTC-12/Feb13 2026 notification and event match. Biennial, 2028/2030 host call only. [근거1](https://lrec2026.info/third-call-for-papers/) [근거2](https://www.elra.info/elra-events/lrec/) |
| mascots | 2026 | ok | 2027 | not_announced | Extended June5 AoE/Aug7 notification/Oct20–22 Genova match; next not found. [근거1](https://mascots26.iitis.pl/) [근거2](https://mascots26.iitis.pl/dates/) |
| mass | 2026 | ok_dates_clock_unverified | 2027 | not_announced | Extended May24 paper/Aug14 notification/Oct21–23 Hong Kong match. Current CFP no clock; existing AoE not re-proven. [근거1](https://mass-conf.github.io/2026/) [근거2](https://mass-conf.github.io/2026/callforpapers.html) |
| mdm | 2026 | ok | 2027 | not_announced | Extended March6 23:59AoE/April17 notification/June29–July2 Athens match. [근거1](https://mdm-2026.github.io/callsResearch.html) |
| mfcs | 2026 | ok | 2027 | not_announced | Apr24 AoE, Jun19 notification, Aug24–28 Paris match; no 2027 CFP confirmed. [근거1](https://mfcs2026.irif.fr/) |
| miccai | 2027 | incomplete | 2028 | schedule_only | 2027 Auckland Sep26–Oct1 match; submission TBA. 2028 São Paulo Oct16–20 schedule. Also 2026 Strasbourg relocation/revised dates explicitly confirmed, not error. [근거1](https://miccai.org/upcoming-conferences/) |
| micro | 2026 | ok | 2027 | not_announced | Mar31/Apr7 23:59EDT, Jul7 notification, Athens match. Next not found. [근거1](https://www.microarch.org/micro59/submit/papers.php) [근거2](https://www.microarch.org/micro59/) |
| middleware | 2026 | updated | 2027 | not_announced | Both cycles match dates; winter explicitly AoE now, replace null timezone/midnight. Next only host-bid page, no CFP. [근거1](https://middleware-conf.github.io/2026/important-dates/) [근거2](https://middleware-conf.github.io/hosting/) |
| mobicom | 2027 | ok | 2028 | not_announced | Summer Aug26/Sep2 23:59AoE, Nov19 notification, Oct18–22 event match. Venue still not stated, winter exact dates TBD. [근거1](https://www.sigmobile.org/mobicom/2027/cfp.html) [근거2](https://www.sigmobile.org/mobicom/2027/) |
| mobihoc | 2026 | ok | 2027 | not_announced | Apr13/20 23:59AoE, Aug23 notification, Nov23–26 Tokyo match; no next CFP. [근거1](https://www.sigmobile.org/mobihoc/2026/cfp.html) |
| mobilehci | 2027 | ok_clock_unverified | 2028 | not_announced | Feb10/17 dates and Jun17 final match; current home and submission no clock/timezone, keep date-only sentinel/null. Camera-ready Jun15 preceding final Jun17 is official inconsistency, not modeled. [근거1](https://mobilehci.acm.org/2027/) [근거2](https://mobilehci.acm.org/2027/submission/) |
| mobisys | 2026 | ok | 2027 | found | Current verified. New CFP published Sep28: Nov27/Dec4 23:59AoE, Mar6 notification, Jun21–25 HCMC. [근거1](https://www.sigmobile.org/mobisys/2026/) [근거2](https://www.sigmobile.org/mobisys/2027/call_for_papers/) [근거3](https://www.sigmobile.org/mobisys/2027/) |
| models | 2026 | ok | 2027 | unavailable | Mar20/27 23:59AoE, Jun17 notification, Oct4–9 Málaga match. 2027 Researchr endpoint access-denied; no public exact CFP. [근거1](https://conf.researchr.org/track/models-2026/models-2026-research-papers) [근거2](https://conf.researchr.org/home/models-2027) |
| msr | 2027 | ok | 2028 | not_announced | Oct20/23 AoE and Jan8 notification match. CFP weekday labels typo but sidebar dates align. Next no CFP. [근거1](https://conf.researchr.org/track/msr-2027/msr-2027-technical-papers) |
| msst | 2026 | ok_dates_clock_unverified | 2027 | schedule_only | Extended Apr14 paper, May1 notification, Jun1–5 Santa Clara match; source omits clock. Next May17–21 official week, no confirmed new venue or CFP. [근거1](https://www.msstconference.org/2026/research-cfp.html) [근거2](https://msstconference.org/2026/index.html) |
| naacl | 2027 | ok | 2028 | not_announced | Oct12 ARR deadline 23:59AoE (14 days away), Feb10 notification, Jun1–5 SF match. Dec23 commitment separate; do not replace ARR deadline. [근거1](https://2027.naacl.org/) |
| ndss | 2027 | updated | 2028 | not_announced | Summer May6/Jul29 match; fall Aug19 23:59AoE matches, updated author notification Nov24 not Nov4. Major revision Jan11 separate. [근거1](https://www.ndss-symposium.org/ndss2027/submissions/call-for-papers/) |
| neurips | 2026 | ok | 2027 | region_only | May4/6 AoE, Sep24 notification, Dec6–12 Sydney match. Official future meetings says only Europe 2027, no exact date/CFP. [근거1](https://neurips.cc/Conferences/2026/CallForPapers) [근거2](https://neurips.cc/Conferences/FutureMeetings) |
| noms | 2026 | partial_conflict | 2027 | found | 2026 Nov10 final extension/event match, notification Jan18 body vs Jan21 sidebar unresolved. 2027 Montreal May10–14, Nov9 paper confirmed; time/timezone missing, notification Feb15 body vs Jan15 dates conflict. IM merge means annual2027 exists, not skip to2028. [근거1](https://noms2026.ieee-noms.org/call-technical-session-paper) [근거2](https://noms2027.ieee-noms.org/authors/call-technical-session-paper) [근거3](https://noms2027.ieee-noms.org/authors) [근거4](https://www.comsoc.org/conferences-events/ieeeifip-network-operations-and-management-symposium-2027) |

## 신규 CFP 세부

| 학회 | Abstract | Paper | 시각·timezone | Notification | 개최 |
| --- | --- | --- | --- | --- | --- |
| MobiSys2027 | 2026-11-27 | 2026-12-04 | 23:59 AoE | 2027-03-06 | 2027-06-21–25, Ho Chi Minh City |
| NOMS2027 | 별도일 없음 | 2026-11-09 | 공식 미표기 → null | 충돌 → null | 2027-05-10–14, Montreal |

MobiSys CFP는 9월28일 새 공지로 확인. NOMS는 IM과 통합 후 2027 회차가 존재하므로 예전 격년 패턴으로 2028만 조사하면 누락된다. [ComSoc2027](https://www.comsoc.org/conferences-events/ieeeifip-network-operations-and-management-symposium-2027)도 11월9일 기술논문 마감 및 개최일을 확인한다.

## 충돌·접근 이슈

- NOMS2026 notification: 공식 기술 CFP 본문1월18일, 상단1월21일. 기존 null 유지.
- NOMS2027 notification: 공식 기술 CFP 본문2월15일, 홈/Authors/사이드바1월15일. 신규 null 유지.
- NOMS 공식 사이트는 web/urllib에서 오류를 내지만 curl GET으로 정상 열림. 읽기 우회를 통해 현재/다음 CFP와 NOMS2026 수상2건까지 확인했다.
- MICCAI2026: 오래된 sponsor/newsletter는 Abu Dhabi/October이나 [현행 society 공지](https://miccai.org/upcoming-conferences/)가 relocation to Strasbourg, revised Sep27–Oct1을 명시. 현재 seed가 정확하다. 2027 Auckland CFP는 여전히 TBA.
- ISWC는 JS shell이므로 공식 앱이 로드하는 Research/ImportantDates 공개 번들을 읽고 7월16일 notification과23:59AoE를 교차검증했다.
- MobileHCI2027은 공식 clock/timezone 미표기로 기존 null 유지. 최종통보6월17일보다 camera-ready6월15일이 이른 자체 모순은 모델에 없는 필드라 보고만 한다.
- ISRR/ITS/MASS/MSST 현행 페이지에서 기존 AoE를 재확인하지 못했다. 날짜는 맞으며 기존 timezone을 추정으로 바꾸거나 없애지 않는다.
- KR2026 기존 Feb9/14 11:59Z는 공식 Feb8/13 23:59AoE의 absolute UTC다. 저장 관례가 local-wall-clock + timezone이므로 Feb8/13 23:59Z로 정규화한다. 공식 마감 연장/단축을 주장하는 변경이 아니다.
- MSR 본문 weekday 오타가 있지만 sidebar 날짜(Oct20 Tue/Oct23 Fri)가 확정; 날짜 변경 없음.
- ISSTA2028 Shanghai, KR2027 Buenos Aires, NeurIPS2027 Europe는 구체적 CFP/개최일이 없어 빈 신규 row를 생성하지 않는다.

## URL 업데이트

- mobisys: [현재](https://www.sigmobile.org/mobisys/2026/) → [새 CFP](https://www.sigmobile.org/mobisys/2027/call_for_papers/)
- noms: [현재](https://noms2026.ieee-noms.org/) → [새 CFP](https://noms2027.ieee-noms.org/authors/call-technical-session-paper)

*deadlines.json 업데이트: JSON의 확정 제안을 검토·병합한 뒤 seed. 마감시각 미표기는 추정하지 않는다.*
