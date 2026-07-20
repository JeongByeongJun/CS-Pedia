# Deadline Check Report
<!-- /deadline-check 스킬 자동 관리 -->

---

## 2026-07-20 전수 재검증 및 반영

- 범위: 209개 학회, Phase 1~7 전수 확인
- 반영: 59개 학회 75개 deadline 레코드 수정/추가
- 신규 레코드: HPCA 2027, OSDI 2027, SIGMETRICS 2027 fall/winter
- 저장 규칙: 공식 source timezone의 wall-clock을 ISO `Z`에 그대로 저장하고 UTC 환산 금지
- 독립 재검증: AAAI, KDD, INFOCOM, HPCA 등 임박 일정과 주요 보정값을 별도 공식 CFP로 재확인

### 주요 신규/임박 일정

| 학회 | 일정 | 시간대 | 공식 출처 |
|------|------|--------|----------|
| AAAI 2027 | abstract 2026-07-21, paper 2026-07-28 | AoE | https://aaai.org/conference/aaai/aaai-27/ |
| HPCA 2027 | abstract 2026-07-24, paper 2026-07-31 | AoE | https://2027.hpca-conf.org/ |
| INFOCOM 2027 | abstract 2026-07-24, paper 2026-07-31 | AoE | https://infocom2027.ieee-infocom.org/call-papers |
| KDD 2027 Cycle 1 | abstract 2026-07-19, paper 2026-07-26 | AoE | https://kdd2027.kdd.org/research-track-call-for-papers/ |
| IEEE VR 2027 | abstract 2026-08-24, paper 2026-08-31 | AoE | https://ieeevr.org/2027/ |
| OSDI 2027 | abstract 2026-12-01, paper 2026-12-08 | EST | https://www.usenix.org/conference/osdi27/call-for-papers |

### 보류/충돌

| 학회 | 사유 |
|------|------|
| AAMAS/ACL 2027 | 개최 정보만 있고 메인 CFP deadline 미발표 |
| ATC 2026 | USENIX ATC 종료와 ACM SIGOPS 후속 ATC 명칭 전환을 메타데이터 정책과 함께 재검토 필요 |
| CASE/CSF/DSN/HRI 2027 | 날짜는 확인됐으나 이번 독립 검증 범위 밖 신규 cycle은 다음 회차로 보류 |
| CoNEXT 2026 | 공식 `24:00 AoE`를 seed 시각으로 표현하는 정책 결정 필요 |
| DASFAA/NOMS/PERFORMANCE/SGP/WWW | 공식 페이지 사이 날짜 또는 장소 충돌 |
| EGSR/ESA 2026 | 재검증에서 현재 seed 값이 맞아 추가 변경하지 않음 |
| MASCOTS 2026 | 1차 조사와 재검증 결과가 2026-06-05/2026-05-17로 충돌해 보류 |
| UbiComp/VLDB 2027 | rolling cycle 일부 누락 가능성이 있으나 정확한 시각/포함 범위를 확정하지 못함 |

---

## 재검증 판정 (2026-07-06)

2026-07-06 조사 결과 중 seed 반영 후보를 공식 페이지 원문으로 재검증. 신규 추가 후보는 대부분 확인됐고, proposal/페이지 내부 충돌/정책성 항목은 HOLD로 분리.

### APPLY / FIX

| 구분 | 항목 | 판정 | 재검증 내용 |
|------|------|------|-------------|
| 신규 | dasfaa 2027 | APPLY | 공식 Important Dates에서 Full Paper Submission `2027-06-06`, `11:59PM AoE` 확인. conf `2027-05-28~30, Shenyang` |
| 신규 | dis 2027 | APPLY | 공식 Contributing 페이지에서 abstract/title `2027-01-11`, full papers/pictorials `2027-01-18` 확인 |
| 신규 | ecoop 2027 | APPLY | 공식 Researchr track에서 R1 `2026-11-19`, R2 `2027-02-11`, `AoE (UTC-12h)`, conf `2027-06-28~07-02, Turin` 확인 |
| 신규 | eurocrypt 2027 | APPLY | 공식 IACR page에서 submission `2026-09-17 23:59 AoE`, conf `2027-04-11~15, Eindhoven` 확인 |
| 신규 | fc 2027 | APPLY | 공식 FC27 page에서 paper `2026-09-17`, `23:59 AoE UTC-12`, conf `2027-02-08~12, Barbados` 확인. venue/date는 tentative 문구 유지 |
| 신규 | itcs 2027 | APPLY | 공식 ITCS page에서 abstract `2026-09-02 04:59pm PDT`, submission `2026-09-04 04:59pm PDT`, conf `2027-01-12~15, UC Berkeley` 확인 |
| 신규 | kdd 2027 | APPLY | 공식 KDD 2027 Research Track CFP에서 First Cycle abstract `2026-07-19`, paper `2026-07-26`, end-of-day AoE, conf `August 2027, San Jose` 확인 |
| 신규 | sac 2027 | APPLY | 공식 SAC 2027 site에서 paper/SRC abstracts `2026-10-02 (EST)`, conf `2027-04-05~09, Gwangju` 확인 |
| 신규 | spaa 2027 | APPLY | 공식 SPAA 2027 CFP에서 C1 paper `2026-09-25`, C2 paper `2027-01-29`, `11:59pm AoE`, conf week `2027-06-05~11, Atlanta` 확인 |
| 신규 | stacs 2027 | APPLY | 공식 STACS 2027 Indico page에서 paper `2026-10-11 23:59 AoE`, conf `2027-03-08~12, Göttingen` 확인 |
| 수정 | infocom 2027 | FIX | 공식 CFP에서 abstract `2026-07-24 11:59pm AoE`, full paper `2026-07-31 11:59pm AoE`, conf `2027-05-24~27, Hawaii, USA` 확인. `Honolulu`는 공식 call text 기준으로는 `Hawaii, USA`로 저장 권장 |
| 수정 | wacv 2027 | FIX | 공식 Dates page에서 conf `2027-01-04~08, Disney Springs`, R1 `2026-06-19/06-26`, R2 `2026-08-21/08-28`, AoE 확인 |
| 수정 | performance 2026 | FIX | 공식 HotCRP deadlines에서 submission deadline `2026-05-31 07:59:59 EDT` 확인. CFP 본문 `2026-05-22`보다 HotCRP 최종 deadline 우선 반영 후보 |
| 수정 | ubicomp 2026 | FIX/POLICY | 공식 IMWUT Papers page에서 UbiComp/ISWC 2026 main technical track은 `IMWUT 2025 Issue 4 + IMWUT 2026 Issues 1-3`라고 확인. `2026-11-01`은 2026 main conf 이후라 current row 정책 재정리 필요 |

### HOLD / 부분 반영

| 항목 | 판정 | 이유 |
|------|------|------|
| avss 2027 | HOLD | 공식 site에서 abs `2027-03-05`, paper `2027-03-12`, conf `2027-07-15~17` 확인됐지만 “Macau proposal 기반, final confirmation 후 업데이트” 문구가 있어 seed 반영 전 한 번 더 확인 권장 |
| hpca 2027 | PARTIAL/HOLD | 공식 Researchr track에서 abs `2026-07-24`, paper `2026-07-31`, AoE 확인. 다만 page metadata는 `March 2027, Salt Lake City`, 상단은 `2027-01-30~02-03` co-located event로 충돌하므로 deadline만 반영하고 conf date/location은 보류 권장 |

### 재검증 기준 URL

| 항목 | 공식 URL |
|------|----------|
| avss | `https://www.avss2027.org/` |
| dasfaa | `https://dasfaa2027.github.io/ImportantDates/list.htm` |
| dis | `https://dis.acm.org/2027/contributing/` |
| ecoop | `https://2027.ecoop.org/track/ecoop-2027-technical-papers` |
| eurocrypt | `https://eurocrypt.iacr.org/2027/` |
| fc | `https://ifca.ai/fc27/` |
| hpca | `https://conf.researchr.org/track/hpca-2027/hpca-2027-main-conference` |
| itcs | `https://itcsconf.github.io/index.html` |
| kdd | `https://kdd2027.kdd.org/research-track-call-for-papers/` |
| sac | `https://www.sigapp.org/sac/sac2027/` |
| spaa | `https://spaa.acm.org/spaa-2027-call-for-papers/` |
| stacs | `https://events.gwdg.de/e/stacs2027` |
| infocom | `https://infocom2027.ieee-infocom.org/call-papers` |
| wacv | `https://wacv.thecvf.com/Conferences/2027/Dates` |
| performance | `https://performance2026.hotcrp.com/deadlines` |
| ubicomp | `https://www.ubicomp.org/ubicomp-iswc-2026/imwut-papers/` |

---

## Phase 1 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 1 전수 재조사. 공식 CFP/공식 사이트 우선. 이번 조사에서는 “공식 날짜는 맞지만 AoE/UTC 저장 해석만 다른 항목”이 다수 발견되어, 실제 날짜 변경 후보와 시간대 저장 보정 후보를 분리해서 봐야 함.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| 3dv | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 날짜는 일치. 공식 site가 deadline time/timezone 미표기 |
| aaai | 2027 | ✅ OK | 2028 | ❌ | - | - | - | AAAI-27 공식 AoE 기준 DB와 일치 |
| aacl | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 paper `2026-05-25 23:59 AoE`; UTC instant 저장이면 보정 후보 |
| aamas | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 날짜는 일치. AoE UTC 저장값 보정 후보 |
| accv | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 `23:59 GMT` 일치. ACCV는 biennial이라 2027 CFP 예상 낮음 |
| acl | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 paper `2026-01-05 23:59 AoE`; UTC instant 저장이면 보정 후보 |
| acml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper `2026-07-05 23:59 AoE` = DB UTC와 일치 |
| acsac | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 paper `2026-05-26 23:59 AoE`; UTC instant 저장이면 보정 후보 |
| aistats | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 abs/paper 날짜 일치. AoE UTC 저장값 보정 후보 |
| ase | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 paper `2026-03-26 AoE`; UTC instant 저장이면 보정 후보 |
| asiaccs | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 Cycle 1 일치. Cycle 2 paper `2026-12-11 AoE`도 존재 |
| asiacrypt | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB timezone `UTC`는 공식 `23:59 AoE`와 불일치 |
| asplos | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 April cycle 일치. September cycle paper `2026-09-09 AoE`도 존재 |
| assets | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 `11:59 PM AoE` 일치 |
| atc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 폐지 아님. ACM SIGOPS ATC 2026 공식 CFP/HotCRP 존재 |
| avss | 2026 | ✅ OK | 2027 | ✅ | 2027-03-05 | 2027-03-12 | 2027-07-15~17, Macau | 2027 공식 사이트 공개. 단 proposal 기반 provisional 문구 있음 |
| bibm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper/conf 일치. 2027 미발표 |
| bigdata | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper/conf 일치. 2027 미발표 |
| bmvc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치. 2027 미발표 |
| case | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치. 홈 일부 2025 오타는 CFP 기준 무시 |
| cases | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치 |
| cav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper/conf 일치. all deadlines AoE |
| cc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 Researchr CFP 일치 |
| ccc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper/conf 일치. 2027 chair 언급만 있고 CFP 미발표 |
| ccgrid | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 공식 CFP 일치 |
| ccs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Cycle A 일치. Cycle B abs `2026-04-22`, paper `2026-04-29`도 존재 |
| cgo | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 R1 paper 일치. R2 paper `2026-09-10 AoE`, 장소 Salt Lake City, 날짜 TBA |
| chi | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 paper/conf 일치 |
| cikm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치 |
| cloud | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper/conf 일치. 공식 time/timezone 미표기 |

**✅ 추가 대상 (1개):** avss 2027 *(provisional 문구 있어 seed 반영 전 재확인 권장)*
**⚠️ DB 수정 필요 (7개):** aacl/AAMAS/ACL/ACSAC/AISTATS/ASE (AoE UTC 저장 보정 후보), asiacrypt (timezone `UTC` → `AoE` 후보)
**➕ 보완 후보 (4개):** 3dv(timezone 근거 부족), asiaccs(Cycle 2), asplos(September cycle), cgo(R2+장소)
**❌ 미발표 (29개):** avss 외 Phase 1 다음연도 CFP 대부분 미발표

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| avss | `https://www.avss2026.org/` | `https://www.avss2027.org/` | 2026 마감 완료 + 2027 공식 사이트/일정 발표 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 2 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 2 전수 재조사. 공식 CFP/공식 사이트 우선. 다음연도 공식 사이트는 열렸지만 deadline이 없는 항목은 “일정 후보”로 분리.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| cluster | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치 |
| codes-isss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 ESWEEK CFP 일치 |
| cogsci | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 UTC-11 midnight 기준 DB와 일치 |
| coling | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026/2027 공식 CFP·일정 미확인. 최신 공식은 COLING 2025 |
| colt | 2026 | ✅ OK | 2027 | ⚠️ | - | TBD | 2027-06-28~07-02, Tokyo | 2027 공식 사이트 공개, deadline TBD |
| concur | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CONCUR/CONFEST 일치 |
| conext | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 DB cycle 일치. 추가 June cycle 존재 |
| conll | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 일정은 확인, 제출 deadline 표는 현재 공식 페이지에서 재검증 불가 |
| corl | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 공식 `2026-05-26 11:59 UTC`; DB `22:00Z` 수정 후보 |
| crypto | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 날짜는 일치. timezone `PST` → 공식 `AoE` 후보 |
| cscw | 2026 | ⚠️ 수정 | 2027 | ⚠️ | - | rolling | - | 2026 fixed deadline 공식 `2025-05-14 12:00 EDT`. 2027+ rolling |
| cseet | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 날짜 일치, 공식 time/timezone 미표기 |
| csf | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 winter cycle 일치 |
| cvpr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치 |
| dac | 2026 | ➕ 보완 | 2027 | ⚠️ | - | - | 2027-07-10~16, San Jose | 2027 공식 event page만 있음. CFP/deadline 없음 |
| dasfaa | 2026 | ✅ OK | 2027 | ✅ | - | 2027-06-06 | 2027-05-28~30, Shenyang | 2027 공식 dates 공개 |
| date | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 abs/paper/conf 일치 |
| dis | 2026 | ✅ OK | 2027 | ✅ | 2027-01-11 | 2027-01-18 | 2027-06-28~07-02, Stockholm | 2027 provisional contribution dates |
| disc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| dsn | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| eacl | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 ARR deadline DB와 일치 |
| ecai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 IJCAI-ECAI CFP 일치 |
| eccv | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CET deadline 일치. 짝수년 패턴 |
| ecml-pkdd | 2026 | ✅ OK | 2027 | ⚠️ | - | - | 2027-09-20~24, Eindhoven | 2027 공식 사이트/일정 공개, CFP/deadline 미발표 |
| ecoop | 2026 | ✅ OK | 2027 | ✅ | - | 2027-02-11 | 2027-06-28~07-02, Turin | 2027 R1 `2026-11-19`, R2 `2027-02-11` AoE |
| ecrts | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| edbt | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 2nd cycle DB와 일치. 3rd cycle paper `2026-10-07 17:00 PST`도 존재 |
| egsr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| emnlp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| emsoft | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 ESWEEK CFP 일치 |

**✅ 추가 대상 (3개):** dasfaa 2027, dis 2027 *(provisional)*, ecoop 2027
**⚠️ DB 수정 필요 (3개):** corl abstract time, crypto timezone, cscw 2026 fixed deadline
**➕ 보완/정책 후보 (7개):** coling, conext, conll, cseet, dac, edbt, colt/ecml-pkdd 일정-only
**❌ 미발표:** 나머지 다음연도 CFP 대부분 미발표

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| dasfaa | `https://dasfaa2026.github.io/` | `https://dasfaa2027.github.io/ImportantDates/list.htm` | 2026 마감 완료 + 2027 공식 dates/deadline 발표 |
| dis | `https://dis.acm.org/2026/` | `https://dis.acm.org/2027/contributing/` | 2026 마감 완료 + 2027 공식 contribution dates 발표 |
| ecoop | `https://2026.ecoop.org/` | `https://2027.ecoop.org/track/ecoop-2027-technical-papers` | 2026 마감 완료 + 2027 공식 CFP 발표 |
| cscw | `https://cscw.acm.org/2026/` | `https://cscw.acm.org/2026/rolling.html` | 2027+ rolling submission 안내 공식 페이지. deadline row 정책 결정 필요 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 3 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 3 전수 재조사. 공식 CFP/공식 사이트 우선. ETAPS/round-cycle/CFP-PDF 충돌 항목은 seed 반영 전 재검증 대상으로 표시.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| er | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| esa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| esem | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 ESEM technical track 일치 |
| esop | 2027 | ✅ OK | 2028 | ⚠️ | - | - | 2028-04-02~07, Karlsruhe | ETAPS 2028 일정만 공개, ESOP CFP 미발표 |
| esorics | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 CFP는 full paper `2026-04-21`만 확인. DB abstract 근거 없음 |
| eurocrypt | 2026 | ✅ OK | 2027 | ✅ | - | 2026-09-17 | 2027-04-11~15, Eindhoven | 공식 2027 site/CFP 공개 |
| eurographics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 UTC deadline 일치 |
| eurosys | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | deadline OK. 공식 conf end `2027-04-23`; DB `04-24` 수정 후보 |
| fase | 2026 | ⚠️ 수정 | 2027 | ⚠️ | - | 2026-10-15 | 2027-04-10~15, Copenhagen | FASE 2027은 iFM과 병합되어 iFS로 승계. 단독 row 정책 보류 |
| fast | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 spring/fall cycle 일치 |
| fc | 2026 | ✅ OK | 2027 | ✅ | - | 2026-09-17 | 2027-02-08~12, Barbados | 공식 FC27 important dates 공개. venue/date tentative |
| fg | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | Round 1 연장 및 Round 2 deadlines 존재. DB는 원래 R1 기준 |
| focs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 `17:00 EDT` 일치 |
| fse | 2027 | ⚠️ 수정 | 2028 | ⚠️ | - | - | 2028, Milan | 2027 paper AoE UTC 저장 보정 후보. 2028 일정만 공개 |
| gecco | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 날짜 일치. 공식 time/tz 문구 미확인 |
| hipc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | UTC 저장값은 공식 extended AoE와 일치 |
| hipeac | 2026 | ➕ 보완 | 2027 | ⚠️ | - | - | Glasgow | 2027 event page 존재, exact dates/CFP 미확인 |
| hpca | 2026 | ✅ OK | 2027 | ✅ | 2026-07-24 | 2026-07-31 | 2027-01-30~02-03? | 공식 CFP 날짜 공개. page header/date text 충돌 있어 재검증 필요 |
| hpdc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| hri | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 일정 확인, full papers deadline TBD |
| i3d | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 `23:59 Pacific Time (UTC-7)`, DB `PST` 표기 보정 후보 |
| icalp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 날짜 일치 |
| icaps | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 일정/장소 확인, CFP/deadline 없음 |
| iccad | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 날짜 일치, 공식 time/tz 미표기 |
| iccd | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | HTML은 기존 날짜, 공식 PDF는 abs `2026-06-03`, paper `2026-06-10` 충돌 |
| iccv | 2025 | ➕ 보완 | 2027 | ⚠️ | - | - | 2027-10-02~08, Hong Kong | 2027 일정/장소만 공식 확인. 2025 deadline fetch 실패 |
| icdcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| icde | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 공식 deadline time `17:00 Pacific`, DB `23:59 PDT` 보정 후보. R2 `2026-11-11` 존재 |
| icdm | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 Research Track에는 abstract deadline 없음. DB abstract 제거/정책 후보 |
| icfp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |

**✅ 추가 대상 (3개):** eurocrypt 2027, fc 2027, hpca 2027 *(일정 충돌 재검증 필요)*
**⚠️ DB 수정 필요 (9개):** esorics, eurosys, fase, fg, fse, i3d, iccd, icde, icdm
**➕ 보완/정책 후보:** esop 2028 일정-only, hipeac 2027 event-only, hri 2027 deadline TBD, icaps 2027 deadline TBD, iccv 2027 일정-only

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| eurocrypt | `https://eurocrypt.iacr.org/2026/` | `https://eurocrypt.iacr.org/2027/` | 2026 마감 완료 + 2027 공식 CFP 발표 |
| fc | `https://ifca.ai/fc26/` | `https://ifca.ai/fc27/` | 2026 마감 완료 + 2027 important dates 발표 |
| hpca | `https://2026.hpca-conf.org/` | `https://conf.researchr.org/track/hpca-2027/hpca-2027-main-conference` | 2027 CFP 날짜 공개. 일정 충돌로 seed 반영 전 재확인 필요 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 4 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 4 전수 재조사. 공식 CFP/공식 사이트 우선. INFOCOM 2027은 기존 DB와 공식 CFP 차이가 커서 seed 반영 전 우선 재검증 필요.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| icip | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 일정만 확인, CFP/deadline 미발표 |
| iclp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 날짜 일치, exact clock 미표기 |
| iclr | 2026 | ✅ OK | 2027 | ⚠️ | - | - | West Coast North America | 2027 장소권역만 공개, CFP 미발표 |
| icml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 announcement coming in August |
| icmr | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | DB 2027 일정/URL 근거 약함. 제공 URL은 2026 CFP |
| icnp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| icpp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| icpr | 2026 | ✅ OK | 2028 | ⚠️ | - | - | 2028, Sydney | 2028 공식 site 존재, CFP/dates TBD |
| icra | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | paper deadline `2026-09-15 23:59 Pacific` 공식 확인 |
| ics | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | cycle2 abstract `2026-02-02 AoE` 보완 가능 |
| icse | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 공식 CFP 일치. UTC 저장 보정 후보 여부는 정책 확인 |
| icsme | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| icsoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs `2026-07-05`, paper `2026-07-12 AoE` ← 임박 |
| icst | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 CFP 일치 |
| icws | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 날짜 일치, 공식 time/timezone 미표기 |
| ieee-vis | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| ieee-vr | 2027 | ➕ 보완 | 2028 | ❌ | 2026-08-24 | 2026-08-31 | - | 2027 papers CFP 공식 확인 |
| iiswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| ijcai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 IJCAI-ECAI CFP 일치 |
| ijcar | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper `2026-02-13` → 공식 `2026-02-15` 후보 |
| imc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | cycle2 일치. cycle1도 존재 |
| infocom | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 공식 abs `2026-07-24`, paper `2026-07-31`, conf `2027-05-24~27 Honolulu`; DB와 불일치 |
| interact | 2027 | ➕ 보완 | 2028 | ❌ | 2027-01-25 | 2027-02-01 | - | abstract/metadata registration 추가 확인 |
| ipdps | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| iros | 2027 | ➕ 보완 | 2028 | ❌ | - | 2027-03-01 | - | paper deadline 공식 RAS page 확인, time/tz 미표기 |
| isaac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 AoE UTC 저장값 일치 |
| isca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| ismar | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| ismb | 2028 | ➕ 보완 | 2029 | ❌ | - | - | - | 2028 일정/장소만 확인, CFP 미발표 |
| ispass | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 frames 내부 CFP `17:00 EST` 일치 |

**✅ 추가 대상 (0개):** 신규 다음연도 full CFP 확정 추가 없음
**⚠️ DB 수정 필요 (3개):** icmr, ijcar, infocom
**➕ 보완 후보 (8개):** icra, ics, ieee-vr, interact, iros, icws, icip/ismb 일정-only
**⏰ 임박:** icsoc paper `2026-07-12 AoE`

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| infocom | `N/A` | `https://infocom2027.ieee-infocom.org/call-papers` | 2027 공식 CFP 확인 및 DB 날짜 수정 필요 |
| ieee-vr | `https://ieeevr.org/2027/` | `https://ieeevr.org/2027/contribute/papers/` | 2027 papers CFP/deadline 직접 페이지 |
| icra | IEEE RAS event URL | `https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra/` | 2027 paper deadline 공식 RAS page 확인 |
| iros | IEEE RAS event URL | `https://www.ieee-ras.org/event/2027-ieee-rsj-international-conference-on-intelligent-robots-and-systems-iros-70525/` | 2027 paper deadline 공식 RAS event page 확인 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 7 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 7 전수 재조사. 공식 CFP/공식 사이트 우선. 신규 full CFP는 `spaa 2027`, `stacs 2027` 2건 확인. 몇몇 항목은 deadline 날짜는 맞지만 AoE/UTC 저장 방식이나 conference date 보정이 필요함.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| sensys | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 1차 deadline 일치. conf date는 New York만 공개, 2차 deadline TBD |
| sgp | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2차 deadline 날짜 일치. time/tz 미표기, 1차 abs `2026-02-02`, paper `2026-02-04`도 존재 |
| sigcomm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| siggraph | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 technical papers `22:00 UTC/GMT` 일치 |
| siggraph-asia | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 technical papers 일치 |
| sigir | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 full papers AoE 일치 |
| sigmetrics | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 Summer round 일치. Fall/Winter round도 존재 |
| sigmod | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 Research Round 4 일치 |
| socc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 second round/conf 일치 |
| socg | 2026 | ✅ OK | 2027 | ⚠️ | - | - | 2027-06-21~25, Bengaluru | 2027 CG Week site/일정 공개, SoCG CFP/deadline 미게시 |
| soda | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 공식 paper `2026-07-09 23:59 AoE`; UTC instant 저장이면 `2026-07-10T11:59Z` 후보 |
| sosp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 날짜/conf 일치, exact clock은 미표기 |
| soups | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 abs/paper `23:59 AoE`; UTC instant 저장이면 다음날 `11:59Z` 후보 |
| sp | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 deadline 날짜 일치, `23:59:59 AoE`. conf date/venue TBA, UTC 저장 방식 재검토 |
| spaa | 2026 | ✅ OK | 2027 | ✅ | C1 2026-09-18 / C2 2027-01-22 | C1 2026-09-25 / C2 2027-01-29 | 2027-06-05~11, Atlanta | 2027 공식 2-cycle CFP 공개 |
| srds | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치 |
| stacs | 2026 | ✅ OK | 2027 | ✅ | - | 2026-10-11 | 2027-03-08~12, Gottingen | 2027 공식 event page/CFP 공개, 23:59 AoE |
| stoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper `16:59 EST` 일치 |
| tacas | 2027 | ✅ OK | 2028 | ⚠️ | - | - | 2028-04-02~07, Karlsruhe | 2027 TACAS 일치. ETAPS 2028 일정만 공개, CFP 미발표 |
| tcc | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 날짜는 일치하나 official time/tz 미표기 |
| uai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| ubicomp | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB paper `2026-11-01`은 2026 conf 이후라 부적절. IMWUT issue 정책 재정리 필요 |
| uist | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| usenix-security | 2027 | ➕ 보완 | 2028 | ⚠️ | - | - | 2028-08-16~18, Seattle | 2027 날짜/conf 일치, time/tz 미표기. 2028 일정만 공개 |
| vldb | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 monthly PVLDB cycle 및 conf 일치, `17:00 PT` |
| vrst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| wacv | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | deadline 일치. 공식 conf date `2027-01-04~08`, DB `01-05~09` 수정 후보 |
| wsdm | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 CFP/conf 일치 |
| www | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 날짜/conf는 일치, time/tz 미표기 |

**✅ 추가 대상 (2개):** spaa 2027, stacs 2027
**⚠️ DB 수정 필요 (5개):** soda AoE UTC 저장값, soups AoE UTC 저장값, ubicomp 2026 IMWUT issue 정책, wacv conf date, sp UTC 저장 방식/partial conf 정보
**➕ 보완/정책 후보 (8개):** sensys conf date/2차 TBD, sgp 1차 cycle+time/tz, sigmetrics Fall/Winter round, socg 2027 일정-only, tcc time/tz, usenix-security 2028 일정-only, www time/tz, sosp exact clock 미표기
**❌ 미발표:** Phase 7 다음연도 CFP 대부분 미발표

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| spaa | `https://spaa.acm.org/` | `https://spaa.acm.org/spaa-2027-call-for-papers/` | 2026 마감 완료 + 2027 공식 CFP 발표 |
| stacs | `https://stacs2026.imag.fr/` | `https://events.gwdg.de/e/stacs2027` | 2026 마감 완료 + 2027 공식 CFP/일정 발표 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 6 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 6 전수 재조사. 공식 CFP/공식 사이트 우선. 다음연도 full CFP 신규는 `sac 2027` 1건이며, `osdi 2027`/`nsdi 2028`은 일정 또는 날짜 일부만 공개된 partial 상태.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| nossdav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 register/submit `2026-01-16`, conf `2026-04-08` 일치. 2027은 빈 디렉터리 수준 |
| nsdi | 2027 | ➕ 보완 | 2028 | ⚠️ | - | - | 2028-05-09~11, Santa Clara | 2027 Fall은 DB와 일치. Spring abs `2026-04-16`, paper `2026-04-23` 보완 후보 |
| oopsla | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 Round 2 일치. Round 1 paper `2025-10-10 AoE`도 존재 |
| osdi | 2026 | ⚠️ 수정 | 2027 | ⚠️ | 2026-12-01 | 2026-12-08 | 2027-07-07~09, Baltimore | 2026 abstract UTC `22:59Z` 후보. 2027 홈에 날짜만 공개, CFP URL 미공개 |
| pact | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 extended abs/paper/conf 일치 |
| pakdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 `2025-11-25 23:59 PST`; DB UTC 일치 |
| percom | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 공식 abs `2026-09-04`, paper `2026-09-11`, 23:59 AoE. UTC 저장이면 다음날 `11:59Z` 후보 |
| performance | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | CFP 본문 paper `2026-05-22`, HotCRP deadline `2026-05-31T11:59:59Z` 충돌/연장 후보 |
| pets | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | Issue 1~4 마감 모두 공식 존재. DB는 최종 Issue 4만 보유 |
| pg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper/conf 일치 |
| pldi | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치. PLDI 2027 site는 “No calls yet” |
| podc | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 날짜는 일치하나 공식 페이지에서 time/tz 미표기 |
| pods | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 second cycle 일치. first cycle도 존재 |
| popl | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 paper/conf 일치 |
| ppopp | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | paper deadline 일치. official conf date가 `03-20~24` vs `01-30~02-03` 충돌 |
| raid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 paper `2026-04-16 23:59:59 AoE`; DB 일치 |
| re | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper/conf 일치 |
| recomb | 2026 | ✅ OK | 2027 | ⚠️ | - | - | Toronto | 2026 CFP 일치. RECOMB 2027 Toronto 언급만 있고 CFP/date 미발표 |
| recsys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치. 2027 placeholder는 password protected |
| rss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치 |
| rtas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 CFP 일치. exact 23:59는 추정이나 UTC-12/AoE 명시 |
| rtss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper AoE와 DB UTC 변환 일치 |
| sac | 2026 | ✅ OK | 2027 | ✅ | - | 2026-10-02 | 2027-04-05~09, Gwangju | 2027 공식 사이트 공개. time 미표기, page timezone EST 표기 |
| saner | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 Research Track 일치 |
| sas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper registration/submission 일치 |
| sc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper/conf 일치 |
| sca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 JS deadline table 기준 abs/paper `23:59 UTC` 일치 |
| sdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper/conf 일치 |
| sec | 2026 | ⚠️ 수정 | 2027 | ⚠️ | - | - | Linkoping | 공식 paper `2025-12-19 23:59 AoE`; repo 저장 규칙 기준 보정 후보. 2027 장소 언급만 있음 |
| secon | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 abs/paper `2025-12-30 23:59 AoE`; repo 저장 규칙 기준 보정 후보 |

**✅ 추가 대상 (1개):** sac 2027 *(time 미표기, timezone 표기 EST 재확인 권장)*
**⚠️ DB 수정 필요 (5개):** osdi abstract UTC, percom AoE UTC 저장값, performance HotCRP 연장 후보, sec/secon repo 저장 규칙 기준 날짜 보정
**➕ 보완/정책 후보 (7개):** nsdi Spring cycle, oopsla Round 1, pets issue 구조, podc time/tz 근거 부족, ppopp conf date 충돌, pods first cycle, osdi 2027 partial
**❌ 미발표:** Phase 6 다음연도 CFP 대부분 미발표

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| sac | `https://www.sigapp.org/sac/sac2026/` | `https://www.sigapp.org/sac/sac2027/` | 2026 마감 완료 + 2027 공식 사이트/일정 발표 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 5 결과 (2026-07-06)

2026-07-06 KST 기준 Phase 5 전수 재조사. 공식 CFP/공식 사이트 우선. 다수 항목은 2026 데이터가 맞지만, 일부는 공식 deadline이 date-only이거나 AoE를 UTC timestamp로 저장하는 방식과 충돌해 별도 재검증 대상으로 남김.

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| isrr | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 공식 paper `2026-05-31`, conf `2026-11-16~20`; time/tz 미표기. DB AoE/UTC 저장값 근거 부족 |
| issre | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 연장 `2026-04-24 AoE`; DB UTC 변환 일치 |
| issta | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 paper `2026-01-29 AoE`; DB UTC 변환 일치 |
| iswc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 abs `2026-05-02`, paper `2026-05-07`, 23:59 AoE. UTC 저장이면 `05-03/05-08 11:59Z` 후보 |
| itcs | 2026 | ✅ OK | 2027 | ✅ | 2026-09-02 | 2026-09-04 | 2027-01-12~15, UC Berkeley | 2027 공식 CFP 공개. deadline `16:59 PDT = 23:59 UTC` |
| its | 2026 | ➕ 보완 | 2027 | ⚠️ | - | - | 2027-06-16~18, Rome | 2026 날짜는 일치하나 time/tz 미표기. 2027 일정만 공식 발표 |
| iui | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 abs/paper/conf 일치 |
| kdd | 2026 | ➕ 보완 | 2027 | ✅ | 2026-07-19 | 2026-07-26 | 2027-08, San Jose | 2026 Cycle 2 abs `2026-02-01`, paper `2026-02-08`도 존재. 2027 First Cycle 공개 |
| kr | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | deadline UTC 변환은 일치. DB conf `07-18~25`는 FLoC 전체 기간, Main Track은 `07-20~23` |
| lctes | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper/conf 일치 |
| lics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper AoE와 DB UTC 변환 일치 |
| lrec | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 paper `2025-10-24 23:59 AoE`; UTC 저장이면 `2025-10-25T11:59Z` 후보 |
| mascots | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 공식 paper `2026-05-17 AoE`, exact clock 미표기. DB는 23:59 AoE 가정 |
| mass | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 공식 paper extension `2026-05-24` 확인, time/tz 미표기. DB AoE/UTC 조합 재검증 |
| mdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 extended paper `2026-03-06 23:59 AoE`; DB UTC 변환 일치 |
| mfcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 paper `2026-04-24 AoE`, conf `2026-08-24~28`; DB 일치 |
| miccai | 2027 | ✅ OK | 2028 | ⚠️ | - | - | 2028-10-16~20, Sao Paulo | 2027/2028 conf 일정만 공식 공개. paper deadline은 TBA |
| micro | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper `23:59 EDT`; DB UTC 값 일치 |
| middleware | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 공식 conf `2026-12-14~18` 확인. 공개 페이지에서 deadline 재검증 불가, AoE UTC 저장값 의심 |
| mobicom | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Summer/Winter cycle 모두 공식 CFP 및 DB UTC 변환 일치 |
| mobihoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 registration/paper `23:59 AoE`; DB UTC 변환 일치 |
| mobilehci | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 paper `2026-01-29 23:59 AoE`; DB UTC 변환 일치 |
| mobisys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper `23:59 AoE`; DB UTC 변환 일치 |
| models | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs/paper/conf 일치 |
| msr | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 날짜는 abs `2025-10-20`, paper `2025-10-23`이나 페이지 내 2024 오타 존재. AoE UTC 저장 방식 재검증 |
| msst | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 공식 paper/conf 날짜는 DB와 일치. time/tz 미기재 |
| naacl | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | NAACL 2026은 ACL 2026로 안내. ACL 2026 기준 보완 가능, NAACL 2027 미발표 |
| ndss | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 Spring cycle/conf 일치. Fall cycle paper `2026-08-19 23:59 AoE`도 존재 |
| neurips | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 abs `2026-05-04`, paper `2026-05-06`, 23:59 AoE와 DB UTC 변환 일치 |
| noms | 2026 | ➕ 보완 | 2028 | ❌ | - | - | - | 날짜는 DB와 일치하나 공식 visible text에 time/tz 미기재 |

**✅ 추가 대상 (2개):** itcs 2027, kdd 2027 *(KDD 2027 conf day range는 August 2027 수준)*
**⚠️ DB 수정 필요 (5개):** iswc UTC 저장값, kr conf date 범위 정책, lrec UTC 저장값, msr AoE/UTC 저장값, kdd 2026 Cycle 2 누락 여부
**➕ 보완/정책 후보 (10개):** isrr, its, mascots, mass, middleware, msst, naacl, noms, miccai 2028 일정-only, ndss Fall cycle
**❌ 미발표:** Phase 5 다음연도 CFP 대부분 미발표

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| itcs | `https://cs.unibocconi.eu/itcs2026` | `https://itcsconf.github.io/index.html` | 2026 마감 완료 + 2027 공식 CFP 발표 |
| kdd | `https://kdd2026.kdd.org/research-track-call-for-papers/` | `https://kdd2027.kdd.org/research-track-call-for-papers/` | 2026 마감 완료 + 2027 First Cycle CFP 발표 |
| miccai | `https://miccai.org` | `https://miccai.org/upcoming-conferences/` | 2027/2028 일정 검증에 더 직접적인 공식 페이지 |

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `corepack pnpm seed`*

---

## Phase 1~4 결과 (2026-06-25)

2026-06-25 KST 기준으로 phase 1~4를 재조사. 공식 CFP/공식 사이트 우선, 일부 사이트는 접근 제한 또는 JS/frames 구조 때문에 보류로 분리.

### Phase 1 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ⚠️ DB 수정 필요 | aaai | AAAI-27 공식: abstract `2026-07-21`, paper `2026-07-28`, `23:59 UTC-12/AoE`; seed `07-25/08-01` 수정 필요 |
| ⚠️ DB 수정 필요 | acml | ACML 2026 공식 연장: paper `2026-07-05 23:59 AoE`; seed `2026-06-26` 수정 필요 |
| ⚠️ DB 수정/보완 | avss | R1 paper `2026-02-28`, R2 paper `2026-05-04`; seed는 R2만 있음. conf main `2026-09-01~03` 확인 |
| ➕ 보완 | cgo | 2027 R2 paper `2026-09-10 AoE` 추가 가능. conf date는 아직 TBA |
| ➕ 추가 후보 | ccgrid | 2027 공식 사이트 발견. 기존 재검증값: abstract `2026-12-08`, paper `2026-12-15`, `AoE`, conf `2027-05-17~20`, Dallas-Fort Worth |
| ⚠️ 재확인 보류 | asiacrypt, asplos, atc, bibm, case, cloud | 공식 페이지 접근/텍스트 추출 제한 또는 세부 time 근거 부족 |

**✅ OK 주요:** 3dv, aacl, aamas, accv(시간 보완 제외), acl, acsac, aistats, ase, asiaccs, assets, bigdata, bmvc, cases, cav, cc, ccc, ccs, chi, cikm

### Phase 2 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ⚠️ DB 수정 필요 | cogsci | 공식 Key Dates: paper/submission deadline `2026-02-02`; seed `2026-02-01` 수정 필요. timezone 미표기 |
| ➕ 보완 | cseet | abstract `2026-02-20` extended 추가 가능, paper `2026-03-01` 유지. timezone 미표기 |
| ⚠️ 정책 보류 | cscw | 2027+는 rolling submission으로 fixed deadline 없음. deadline row 추가/수정은 정책 결정 필요 |
| 🔗 URL 업데이트 후보 | eacl | seed 값은 OK. `website_url`은 `https://2027.eacl.org/`로 교체 권장 |
| ⚠️ 재확인 보류 | coling, conext, conll, corl, edbt, egsr, ecml-pkdd | 공식 사이트 구조/접근 제한 또는 세부 CFP 본문 확인 제한 |

**✅ OK 주요:** cluster, codes-isss, colt, concur, crypto, csf, cvpr, dac, dasfaa, date, dis, disc, dsn, ecai, eccv, ecoop, ecrts, emnlp, emsoft

### Phase 3 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ⚠️ DB 수정 필요 | eurocrypt | 공식 EUROCRYPT 2026: paper `2025-10-02 23:59 AoE`; seed `2025-10-31` 수정 필요 |
| ⚠️ DB 수정 필요 | hipc | 공식 연장: abstract `2026-07-01 AoE`, paper `2026-07-08 AoE`; seed `06-17/06-24` 수정 필요 |
| ⚠️ DB 수정 필요 | icaps | seed의 2027 conf-only는 2026 값으로 보정 필요: abs `2025-12-02`, paper `2025-12-08`, conf `2026-06-27~07-02`, Dublin |
| ⚠️ 소규모 수정 후보 | fc | 공식은 `2025-09-20 23:59 AoE` = `2025-09-21 11:59 UTC`; seed `2025-09-21T12:00Z`는 1분 차이 |
| ➕ 보완 | esop | 2027 R2 paper `2026-10-15 AoE` 추가 가능 |
| ➕ 보완 | eurosys | 2027 spring abs `2026-05-07`, paper `2026-05-14`; seed는 fall만 있음 |
| ➕ 보완 | fast | 2027 spring paper `2026-03-17 23:59 AoE`; seed는 fall만 있음 |
| ➕ 보완 | esorics | 2026 winter paper `2026-01-09 23:59 AoE`; seed는 spring 중심 |
| ➕ 추가 후보 | hpca | 2027 conf-only `2027-01-30~02-03`; CFP/deadline TBD |
| ⚠️ 구조 변경 | fase | ETAPS 2027에서 FASE+iFM이 `iFS`로 병합. FASE 단독 CFP 처리 보류 |

**✅ OK 주요:** er, esa, esem, esop R1, esorics spring, eurographics, eurosys fall, fase 2026, fast fall, fg, focs, fse, gecco, hipeac, hpdc, hri, i3d, icalp, iccad, iccd, iccv, icdcs, icde, icdm, icfp

### Phase 4 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ⚠️ DB 수정/확인 | icmr | 공식 ICMR 2026 CFP 존재: abs `2026-02-06`, paper `2026-02-13`, conf `2026-06-16~19 Amsterdam`. seed 최신 2027 conf-only와 별도 관리 필요 |
| ⚠️ DB 수정 필요 | icsoc | conf date 보완 필요: `2026-12-01~04`, Lodz. abs `2026-07-05`, paper `2026-07-12 AoE` 유지 |
| ➕ 추가 후보 | icst | ICST 2027 CFP 발표: paper `2026-11-02`, conf `2027-05-17~21`, San Sebastian, `AoE/UTC-12` |
| ➕ 보완 | interact | INTERACT 2027 paper deadline `2027-02-01`, conf `2027-08-23~27`, Tallinn. timezone 미표기 |
| ⚠️ DB 수정 필요 | isaac | 공식 ISAAC 2026 CFP 재확인: paper `2026-06-29 AoE`; seed `2026-06-26` 수정 필요 |
| ➕ 보완 | ics | 2026 cycle1도 공식 존재: abs `2025-12-09`, paper `2025-12-16`; seed는 cycle2 중심 |
| ➕ 보완 | imc | 2026 cycle1도 공식 존재: abs `2025-11-13`, paper `2025-11-20`; seed는 cycle2 중심 |
| ⚠️ 재확인 보류 | infocom, ispass | 공식 사이트 접근 제한/frames 구조로 이번 조사에서 독립 검증 제한 |
| ➕ 일정 후보 | icip, ismb | icip 2027 conf `2027-11-29~12-03`, Singapore; ismb 2028 conf `2028-07-23~27`, Calgary. deadline/CFP는 미발표 |

**✅ OK 주요:** icip 2026, iclp, iclr, icml, icnp, icpp, icpr, icra conf-only, ics cycle2, icse, icsme, icst 2026, icws, ieee-vis, ieee-vr conf-only, iiswc, ijcai, ijcar, imc cycle2, ipdps, iros conf-only, isca, ismar, ismb 2027 conf-only

### 🔗 website_url 업데이트 후보

| 학회 | 현재 상태 | 새 URL | 사유 |
|------|----------|--------|------|
| eacl | `https://2026.eacl.org/` | `https://2027.eacl.org/` | 2027 CFP/일정 공식 발표 |
| ccgrid | `https://ccgrid2026.org/` | `https://hpcclab.org/ccgrid27/` | 2027 CFP 공식 사이트 발표 |

*deadlines.json 업데이트: 위 ⚠️/➕ 항목 중 확정 항목만 선별 반영 후 `corepack pnpm seed`*

---

## Phase 5~7 결과 (2026-06-25)

2026-06-25 KST 기준으로 phase 5~7 재조사. 공식 CFP/공식 사이트 우선이며, 공식 페이지에서 deadline time/timezone을 확인하지 못한 항목은 보류로 분리. 특히 이번 구간은 seed에 `23:59Z`로 저장됐지만 공식이 `AoE/UTC-12`인 항목이 다수 발견되어 UTC 저장값 보정 후보가 많음.

### Phase 5 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ⚠️ DB 수정 필요 | issre | 공식 `2026-04-24 23:59 AoE`; seed `23:59Z`면 UTC 저장값 보정 필요 |
| ⚠️ DB 수정 필요 | issta | 공식 paper `2026-01-29 23:59 AoE`; seed `23:59Z` 보정 필요 |
| ⚠️ DB 수정 필요 | its | conf `2026-06-03~05`, Pafos. seed 시작일 `2026-06-01` 수정 필요. ITS 2027 Rome `2027-06-16~18` 일정만 확인 |
| ⚠️ DB 수정 필요 | kdd | 공식 abs `2026-02-01 AoE`, paper `2026-02-08 AoE`; seed `23:59Z` 보정 필요 |
| ⚠️ DB 수정/보완 | kr | 공식 abs `2026-02-08 AoE`, paper `2026-02-13 AoE`. main conf는 `2026-07-20~23`, seed의 `07-18~25`는 workshop 포함 범위로 해석 가능 |
| ⚠️ DB 수정 필요 | lctes, lics, mascots, mdm, mfcs | 공식 deadline이 AoE로 확인됨. seed `23:59Z` 저장값이면 UTC 보정 필요 |
| ⚠️ DB 수정 필요 | micro | 공식 abs `2026-03-31 23:59 EDT`, paper `2026-04-07 23:59 EDT`; seed `23:59Z`는 timezone 오류 |
| ⚠️ DB 수정 필요 | mobicom, mobihoc, mobilehci, mobisys, models | 공식 deadline이 `23:59 AoE`로 확인됨. seed `23:59Z` 저장값이면 UTC 보정 필요 |
| ⚠️ DB 수정/보완 | ndss | 2027 summer cycle paper `2026-05-06 23:59 AoE`와 fall cycle paper `2026-08-19 23:59 AoE` 확인. seed가 fall만 담은 상태면 summer cycle 보완 후보 |
| ⚠️ DB 수정 필요 | neurips | 공식 abs `2026-05-04 AoE`, paper `2026-05-06 AoE`; seed `23:59Z` 보정 필요 |
| ⚠️ 재확인 보류 | isrr, iswc, itcs, lrec, mass, middleware, msr, msst, noms | 공식 페이지 접근/텍스트 추출 제한 또는 deadline timezone 근거 부족 |

**✅ OK 주요:** iui, miccai(conf-only), naacl(NO_DEADLINE 유지)

### Phase 6 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ➕ 보완 | nsdi | 2027 spring cycle abs `2026-04-16 23:59 EDT`, paper `2026-04-23 23:59 EDT`; seed는 fall cycle 중심 |
| ⚠️ DB 수정/확인 | pact | 공식 연장 abs `2026-04-23`, paper `2026-04-30`, conf `2026-10-19~22`; timezone 미표기라 time 보류 |
| ⚠️ DB 수정/보완 | pets | 2027 issue deadlines `2026-05-31`, `2026-08-31`, `2026-11-30`, `2027-02-28`, `23:59:59 AoE`; conf `2027-07-19~24`, Delft로 venue 보완 필요 |
| ➕ 추가 후보 | ppopp | PPoPP 2027 공식 사이트 발표: paper `2026-08-03`, conf `2027-03-20~24`, Salt Lake City. timezone 미표기 |
| ⚠️ DB 수정 필요 | sac | 공식 paper `2025-10-17` midnight-at-end EDT; seed `23:59Z`는 timezone 오류 |
| ➕ 보완 | sca | conf `2026-07-08~10`, Barcelona 확인. abs/paper deadline은 CFP 하위 페이지 추가 확인 필요 |
| ⚠️ 재확인 보류 | pakdd, pg, rtss, sas, sec, secon | 공식 페이지에서 deadline/timezone 독립 검증 부족 |

**✅ OK 주요:** nossdav, oopsla, osdi, percom, performance, pldi, podc, pods, popl, raid, re, recsys, rss, rtas, saner, sc, sdm
**ℹ️ 일정만 확인:** recomb 2027 Toronto 언급, CFP/deadline 미발표

### Phase 7 요약

| 구분 | 항목 | 내용 |
|------|------|------|
| ➕ 보완 | sgp | 2026 abstract `2026-04-13`, paper `2026-04-15`; time 미표기. seed paper는 OK, abstract 누락 |
| ⚠️ DB 수정 필요 | siggraph | 공식 abs `2026-01-15 22:00 UTC`, paper `2026-01-22 22:00 UTC`; seed `23:59Z` 수정 필요 |
| ➕ 추가 후보 | sigmetrics | SIGMETRICS 2027 공식 발표: abs `2026-07-03`, paper `2026-07-10`, `23:59 AoE`, conf `2027-06-07~11`, Atlanta |
| ⚠️ DB 수정 필요 | srds | 공식 conf `2026-09-22~24`; seed `2026-09-21~25` 수정 필요. deadline time은 미표기 |
| ⚠️ DB 수정/정책 보류 | ubicomp | seed의 `2026-11-01` R4는 2026 conf 범위 밖. 공식상 2026 main track은 IMWUT 2025 issue4 + 2026 issue1~3로 처리 |
| ⚠️ 재확인 보류 | sigir, soda, soups, spaa, tcc, www | 공식 CFP 상세/시간대 확인 부족 |

**✅ OK 주요:** sensys, sigcomm, siggraph-asia, sigmod, socc, socg, sosp, sp, stacs, stoc, tacas, uai, uist, usenix-security, vldb, vrst, wacv, wsdm

### 🔗 website_url 업데이트 후보

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| miccai | `https://miccai.org` | `https://miccai.org/index.php/events/upcoming-conferences/` | 2027/2028 장소·일정 검증에 더 직접적인 공식 페이지 |
| ppopp | `https://ppopp26.sigplan.org/` | `https://ppopp27.sigplan.org/` | 2026 마감 완료 + 2027 공식 사이트/일정 발표 |
| sigmetrics | `https://www.sigmetrics.org/sigmetrics2026/call_for_papers.html` | `https://www.sigmetrics.org/sigmetrics2027/` | 2026 마감 완료 + 2027 공식 CFP/일정 발표 |
| sgp | `https://sgp26.org/` | `https://sgp26.org/submit/` | 다음연도는 아니지만 현재 CFP/마감 확인용으로 더 정확한 페이지 |
| socc | `https://acmsocc.org/2026/` | `https://acmsocc.org/2026/papers.html` | 현재 CFP/시간대 확인용으로 더 정확한 페이지 |
| uist | `https://uist.acm.org/2026/` | `https://uist.acm.org/2026/cfp/` | 현재 CFP/시간대 확인용으로 더 정확한 페이지 |

*deadlines.json 업데이트: 위 ⚠️/➕ 항목 중 확정 항목만 선별 반영 후 `corepack pnpm seed`*

---

## 좋은 모델 재검증 판정 (2026-06-25)

2026-06-25 신규 조사 결과 중 실제 seed 반영 후보만 좋은 모델로 재검증. `APPLY/FIX`는 반영 가능, `HOLD`는 이번 seed 반영에서 제외. `23:59 AoE/UTC-12`는 UTC 저장 시 보통 **다음날 `11:59:00Z`**로 보정 필요.

### APPLY / FIX

| 구분 | 항목 | 판정 | 재검증 내용 |
|------|------|------|-------------|
| Phase 1~2 | aaai | APPLY | AAAI-27 abs `2026-07-21 23:59 UTC-12`, paper `2026-07-28 23:59 UTC-12`; UTC `07-22/07-29 11:59Z` |
| Phase 1~2 | acml | APPLY | ACML 2026 paper `2026-07-05 23:59 AoE`; UTC `2026-07-06T11:59Z` |
| Phase 1~2 | cgo | FIX | R2 paper `2026-09-10 AoE` 맞음. conf date는 TBA지만 장소는 Salt Lake City, Utah 공개 |
| Phase 1~2 | ccgrid | APPLY | 2027 abs `2026-12-08 AoE`, paper `2026-12-15 AoE`, conf `2027-05-17~20`, Dallas-Fort Worth |
| Phase 1~2 | cogsci | FIX | deadline `2026-02-02`는 맞지만 timezone은 미표기가 아니라 `UTC-11 by midnight`; AoE로 저장 금지 |
| Phase 1~2 | cseet | APPLY | abstract `2026-02-20 extended`, full/short paper `2026-03-01 extended`; timezone 미확인 |
| Phase 1~2 | cscw | APPLY | 2027+ rolling journal-style model, fixed deadline 없음 |
| Phase 1~2 | eacl | APPLY | EACL 2027 URL 및 ARR submission `2026-08-03 23:59 AoE`; UTC `2026-08-04T11:59Z` |
| Phase 3~4 | eurocrypt | APPLY | paper `2025-10-02 23:59 AoE`; UTC `2025-10-03T11:59Z` |
| Phase 3~4 | hipc | APPLY | abs `2026-07-01 AoE`, paper `2026-07-08 AoE` |
| Phase 3~4 | icaps | APPLY | 2026 abs `2025-12-02`, paper `2025-12-08`, `UTC-12`, conf `2026-06-27~07-02`, Dublin |
| Phase 3~4 | fc | FIX | paper `2025-09-20 23:59 AoE`; UTC `2025-09-21T11:59Z`, seed `12:00Z`는 1분 late |
| Phase 3~4 | esop, eurosys, fast, esorics | APPLY | R2/spring/winter cycle 값 공식 확인. 모두 AoE 계열이라 UTC 다음날 `11:59Z` 보정 필요 |
| Phase 3~4 | icmr | FIX | ICMR 2026 paper `2026-02-13`, conf `2026-06-16~19 Amsterdam` 확인. 공식 페이지에서 abstract `2026-02-06`은 재확인 실패 |
| Phase 3~4 | icsoc | APPLY | conf `2026-12-01~04`, Lodz; abs `2026-07-05`, paper `2026-07-12 AoE` |
| Phase 3~4 | icst | APPLY | 2027 paper `2026-11-02 AoE/UTC-12`, conf `2027-05-17~21`, San Sebastian |
| Phase 3~4 | interact | APPLY | paper/workshop deadline `2027-02-01`, conf `2027-08-23~27`, Tallinn; timezone 미표기 |
| Phase 3~4 | isaac | APPLY | paper `2026-06-29 AoE` |
| Phase 3~4 | imc | APPLY | 2026 cycle1 abs `2025-11-13`, paper `2025-11-20`; cycle2도 존재. timezone 미확인 |
| Phase 3~4 | icip, ismb | APPLY | icip 2027 conf `2027-11-29~12-03 Singapore`; ismb 2028 conf `2028-07-23~27 Calgary`; deadline/CFP 미발표 |
| Phase 5 | issre, issta, kdd, lctes, lics, mascots, mdm, mfcs, mobicom, mobihoc, mobilehci, mobisys, models, neurips | FIX | 공식 deadline이 AoE로 재확인됨. seed가 같은 날짜 `23:59Z`면 다음날 `11:59Z`로 보정 필요 |
| Phase 5 | its | FIX | conf `2026-06-03~05`, Pafos. seed start `06-01` 수정 필요. ITS 2027 Rome `2027-06-16~18` 일정 확인 |
| Phase 5 | kr | FIX | abs `2026-02-08 AoE`, paper `2026-02-13 AoE`; main conf는 `2026-07-20~23`, workshop 포함 범위는 별도 판단 |
| Phase 5 | micro | FIX | abs `2026-03-31 23:59 EDT`, paper `2026-04-07 23:59 EDT`; UTC `04-01/04-08 03:59Z` |
| Phase 5 | ndss | FIX | summer/fall cycle 둘 다 seed에 이미 있음. 추가가 아니라 AoE UTC 보정 대상: `2026-05-07T11:59Z`, `2026-08-20T11:59Z` |
| Phase 6 | nsdi | APPLY | 2027 spring abs `2026-04-16 23:59 EDT`, paper `2026-04-23 23:59 EDT`; fall도 존재 |
| Phase 6 | pact | APPLY | extended abs `2026-04-23`, paper `2026-04-30`, conf `2026-10-19~22`; timezone 미표기 |
| Phase 6 | pets | APPLY | 2027 issue deadlines `2026-05-31`, `2026-08-31`, `2026-11-30`, `2027-02-28`, `23:59:59 AoE`; conf `2027-07-19~24`, Delft |
| Phase 6 | ppopp | FIX | paper `2026-08-03 AoE` 맞음. conf date는 homepage `2027-03-20~24` vs track `2027-01-30~02-03` 충돌이라 deadline만 반영, conf date 보류 |
| Phase 6 | sac | FIX | paper deadline은 `2025-10-17` midnight-at-end EDT; UTC는 `2025-10-18T04:00Z` 계열로 보정 필요 |
| Phase 6 | pakdd, pg, rtss, sas, sec, secon | APPLY | 기존 보류 해제 가능. 공식 dates/CFP 확인됨. 각 timezone은 pakdd PST, pg/rtss/sas/sec/secon AoE 계열 |
| Phase 7 | sgp | APPLY | abstract `2026-04-13`, paper `2026-04-15`, conf `2026-07-01~03`; time 미표기 |
| Phase 7 | siggraph | APPLY | abs `2026-01-15 22:00 UTC`, paper `2026-01-22 22:00 UTC`; seed `23:59Z` 수정 필요 |
| Phase 7 | sigmetrics | APPLY | 2027 abs `2026-07-03 23:59 AoE`, paper `2026-07-10 23:59 AoE`, conf `2027-06-07~11`, Atlanta |
| Phase 7 | srds | FIX | conf `2026-09-22~24`, Rome. seed `09-21~25` 수정 필요 |
| Phase 7 | ubicomp | FIX | 2026 conf는 `2026-10-13~15`; main track은 IMWUT 2025 issue4 + 2026 issue1~3. seed의 `2026-11-01` R4는 2026 conf 범위 밖이라 반영 정책 재정리 필요 |
| Phase 7 | soda, soups, spaa, www | APPLY | 기존 보류 해제 가능. 공식 날짜 확인됨. soda/soups/www는 timezone 미표기, spaa는 AoE |

### HOLD / 보류 유지

| 항목 | 이유 |
|------|------|
| avss | R1/R2 날짜는 맞지만 공식 페이지 내 conf date가 `09-01~03` vs `09-01~02`로 충돌 |
| hpca | 2027 공식 CFP/일정 페이지 재확인 실패. 2026 공식 페이지만 확인 |
| fase | ETAPS 2027에서 FASE+iFM → iFS 병합 확인. FASE 단독 row 정책 결정 필요 |
| ics | 공식 CFP 확인 실패. 후보 URL들이 404 또는 유효 CFP 미확인 |
| infocom, ispass | 다음연도 공식 콘텐츠 재확인 실패. 기존 보류 유지 |
| isrr, iswc, itcs, lrec, mass, middleware, msr, msst, noms | deadline timezone 또는 공식 CFP 본문 독립 검증 부족 |
| sca | conf `2026-07-08~10`은 확인, paper/abstract deadline은 보류 |
| sigir, tcc | 공식 CFP/2026 페이지 안정 확인 실패 |

### 🔗 website_url 재검증 판정

| 학회 | 판정 | 후보 URL |
|------|------|----------|
| eacl | APPLY | `https://2027.eacl.org/` |
| ccgrid | APPLY | `https://hpcclab.org/ccgrid27/` |
| miccai | APPLY | `https://miccai.org/index.php/events/upcoming-conferences/` |
| ppopp | APPLY | `https://ppopp27.sigplan.org/` |
| sigmetrics | APPLY | `https://www.sigmetrics.org/sigmetrics2027/` |
| sgp | APPLY | `https://sgp26.org/submit/` |
| socc | APPLY | `https://acmsocc.org/2026/papers.html` |
| uist | APPLY | `https://uist.acm.org/2026/cfp/` |

---

## 주의 항목 2차 재확인 메모 (2026-06-13)

2026-06-12 주의 항목을 다시 공식 페이지/제출 시스템으로 확인. seed 반영 판정은 유지하되, `infocom` 접근 상태 표현만 보정.

| 학회 | 2차 판정 | 확인 내용 |
|------|----------|----------|
| atc | 유지: APPLY_WITH_FIX | 공식 CFP는 submission deadline `2026-06-10`, conference `2026-11-16~18`; HotCRP는 `Jun 11 07:59:59 EDT`로 표시되어 `2026-06-10 23:59:59 AoE`와 일치 |
| cscw | 유지: HOLD_POLICY | 2027+ rolling submission, fixed deadline 없음 |
| eacl | 유지: APPLY_2027 / HOLD_2026_POLICY | EACL 2027 ARR submission `2026-08-03 AoE` 재확인 |
| infocom | 유지: HOLD | 공식 루트는 인증/빈 응답 계열로 접근 제한, CFP 후보도 빈 응답. 2028 추가/URL 교체 금지 |
| ispass | 유지: OK | frames 내부 CFP에서 `2025-12-08 17:00 EST` / `2025-12-15 17:00 EST` 재확인 |
| middleware | 유지: HOLD_URL_ONLY | 메인 페이지의 `2026-12-14~18 Tarragona`는 확인, 세부 CFP 후보 URL은 404 |
| noms | 유지: APPLY_FIX | 공식 CFP에서 paper final deadline `2025-11-10` 재확인 |

---

## 주의 항목 재검증 메모 (2026-06-12)

seed 반영 전 주의/보류 항목만 공식 페이지 또는 제출 시스템으로 재확인.

| 학회 | 판정 | 내용 | 근거 |
|------|------|------|------|
| atc | APPLY_WITH_FIX | 2026 CFP/HotCRP 기준 paper는 `2026-06-10 23:59:59 AoE`에 해당. 공식 CFP의 conference date는 `2026-11-16~18`이므로 DB의 `2026-11-15~18`은 시작일 보정 필요 | https://sigops.org/s/conferences/atc/2026/cfp.html, https://atc26.hotcrp.com/deadlines |
| cscw | HOLD_POLICY | 2027+는 fixed deadline이 없는 rolling submission. `website_url`은 rolling 페이지로 바꿀 수 있지만 deadline row 추가/수정은 데이터 모델 정책 결정 필요 | https://cscw.acm.org/2026/rolling.html |
| eacl | APPLY_2027 / HOLD_2026_POLICY | EACL 2027은 ARR submission `2026-08-03 AoE` 공식 확인. 2026 DB의 `2025-10-06`은 ARR submission 성격이라 EACL commitment deadline으로 바꿀지는 정책 결정 필요 | https://2027.eacl.org/calls/papers/ |
| infocom | HOLD | `https://infocom2027.ieee-infocom.org/`가 인증/빈 응답 계열로 접근 제한되고 2028 공식 근거도 재확인 실패. 2027 DB 기존값은 유지, 2028 추가/URL 교체 금지 | https://infocom2027.ieee-infocom.org/ |
| ispass | OK | frames 내부 `cfp.php`에서 abstract `2025-12-08 17:00 EST`, full `2025-12-15 17:00 EST`, conf `2026-04-26~28 Seoul` 공식 확인. frames-only 보류 해제 | https://ispass.org/ispass2026/cfp.php |
| middleware | HOLD_URL_ONLY | 메인 페이지에서 conf `2026-12-14~18 Tarragona`는 확인. 현재 seed deadline 값은 이전 조사와 일치하나 CFP 세부 URL은 404라 URL 교체/추가 근거 부족 | https://middleware-conf.github.io/2026/ |
| noms | APPLY_FIX | 실제 공식 CFP 경로는 `/authors/call-technical-session-paper`; paper final deadline `2025-11-10` 공식 확인. 기존 `2025-10-13`은 최초 deadline이라 DB 수정 가능 | https://noms2026.ieee-noms.org/authors/call-technical-session-paper |

---

## 재검증 메모 (2026-05-31)

저가 모델 4개로 공식 CFP/공식 사이트 기준 재검증. 아래 항목은 기존 리포트의 수정/추가 후보 중 정정 또는 보류가 필요한 것만 기록.

| 학회 | 판정 | 정정/보류 내용 | 공식 근거 |
|------|------|----------------|----------|
| noms | ⚠️ 2026-06-12 재정정 | 기존 경로가 404였음. 실제 공식 CFP 경로에서 2025-11-10 Final deadline 확인됨 | https://noms2026.ieee-noms.org/authors/call-technical-session-paper |
| miccai | ⚠️ 보류 | 2027 시작일은 공식 페이지끼리 2027-09-26 / 2027-09-27 충돌. 확정 수정 금지 | https://miccai.org/index.php/events/upcoming-conferences/ |
| nsdi | ❌ Spring cycle 취소 | NSDI 2027 공식 CFP는 Fall cycle만 확인. Spring 2026-04-16/04-23 보완 후보 제거 | https://www.usenix.org/conference/nsdi27 |
| recsys | ❌ 09-27 수정 후보 취소 | 2026-09-28~10-02가 main conference. 09-27은 Doctoral Symposium 예정 | https://recsys.acm.org/recsys26/call/ |
| iccd | ❌ 정정 | 2026 abstract 2026-05-15, paper 2026-05-22, 23:59 AoE | https://www.iccd-conf.com/2026/Submission_guide.html |
| eurocrypt | ❌ 정정 | 2026 paper는 2025-10-02 23:59 AoE. 2025-10-31 수정 후보는 틀림 | https://eurocrypt.iacr.org/2026/callforpapers.php |
| fc | ❌ 정정 | 2026 deadline time은 23:59 AoE. 12:00 UTC 수정 후보는 틀림 | https://ifca.ai/fc26/cfp.html |
| fse | ❌ 정정 | FSE 2026 research track은 registration 2025-09-04, full paper 2025-09-11 | https://conf.researchr.org/track/fse-2026/fse-2026-research-papers |
| pets | ⚠️ 부분확정 | 2027 Issue 1~4 마감은 맞음. Europe TBA 장소 표기는 공식 CFP에서 재확인 못함 | https://petsymposium.org/cfp27.php |
| wacv | ⚠️ 부분확정 | 2027 abs/paper 날짜는 맞음. Disney Springs venue 표기는 공식 CFP에서 재확인 못함 | https://wacv.thecvf.com/Conferences/2027/CallForPapers |

---

## 고급 재검증 최종 판정 (2026-05-31)

좋은 모델로 보류/충돌 항목만 재검증. `APPLY`만 seed 반영 가능, `HOLD/DO_NOT_APPLY`는 이번 업데이트에서 제외.

### APPLY

| 학회 | 반영 가능한 값 | 공식 근거 |
|------|----------------|----------|
| nossdav | 2026 paper `2026-01-17T11:59:00Z`, conf `2026-04-08`, venue Hong Kong SAR, timezone AoE | https://nossdav.org/2026/ |
| sas | 2026 abstract `2026-05-02T11:59:00Z`, paper `2026-05-08T11:59:00Z`, conf `2026-10-06~08`, Oakland, AoE | https://conf.researchr.org/home/splash-issta-2026/sas-2026 |
| sec | 2026 paper `2025-12-20T11:59:00Z`, conf `2026-06-09~11`, Perth, AoE | https://ifipsec.org/dates.html |
| sdm | 2026 abstract `2026-04-11T11:59:00Z`, paper `2026-04-18T11:59:00Z`, conf `2026-11-19~20`, Salt Lake City, AoE | https://www.siam.org/conferences-events/siam-conferences/sdm26/ |
| srds | 2026 abstract `2026-05-02T11:59:00Z`, paper `2026-05-09T11:59:00Z`, conf `2026-09-21~25`, Rome, AoE | https://srds-conference.org/index.php/call-for-papers/ |
| stoc | 2026 paper `2025-11-04T21:59:00Z`, conf `2026-06-22~26`, Salt Lake City, timezone EST | https://acm-stoc.org/stoc2026/stoc2026-cfp.html |
| sensys | 2027 round1 abstract `2026-05-30T11:59:00Z`, round1 paper `2026-06-06T11:59:00Z`, venue New York, AoE. conf dates/round2는 HOLD | https://sensys.acm.org/2027/cfp.html |
| sigmod | 2027 R1/R2/R3/R4 deadlines 확정, conf `2027-06-13~19`, Huntington Beach, AoE | https://2027.sigmod.org/calls_papers_sigmod_research.shtml |
| socc | 2026 round2 abstract `2026-07-08T11:59:00Z`, paper `2026-07-15T11:59:00Z`, conf `2026-11-18~20`, Singapore, AoE | https://acmsocc.org/2026/papers.html |
| hipc | 2026 abstract `2026-06-17`, paper `2026-06-24`, conf `2026-12-16~19`, Bengaluru, AoE | https://hipc.org/papers/ |
| ismb | 2027 conf `2027-07-18~22`, Copenhagen. deadline은 HOLD | https://transition.iscb.org/about-ismb |
| wacv | 2027 R1 registration `2026-06-19`, R1 paper `2026-06-26`, R2 registration `2026-08-21`, R2 paper `2026-08-28`, conf `2027-01-05~09`, Disney Springs/Buena Vista, AoE | https://wacv.thecvf.com/ |
| pets | 2027 Issue deadlines `2026-05-31`, `2026-08-31`, `2026-11-30`, `2027-02-28`, 23:59:59 AoE. conference date/location은 HOLD | https://petsymposium.org/cfp27.php |

### HOLD / DO_NOT_APPLY

| 학회 | 판정 | 이유 |
|------|------|------|
| miccai | HOLD | 공식 페이지끼리 2027 start date `09-26` vs `09-27` 충돌. location/endDate만 참고 |
| secon | HOLD | 공식 접근 가능 CFP와 확장/캐시성 날짜 충돌. `2025-12-30`은 공식 근거 미확보 |
| ubicomp | HOLD | conference `2026-10-13~15`, Shanghai만 확정. IMWUT issue deadline은 이번 업데이트 제외 |
| tcc | HOLD | 후보값은 있으나 TCC 2026 공식 페이지 본문 재현 실패 |
| sgp | HOLD | conference `2026-07-01~03`, Bern은 확정 가능하나 deadline/timezone은 public page와 submission system 충돌 |
| fc 2027 | DO_NOT_APPLY | IFCA 공식 사이트에서 FC27/Barbados/CFP 확인 불가 |
| iccv 2027 abstract | DO_NOT_APPLY | official deadline 없음, city도 공식 페이지 간 불일치 |
| infocom 2028 | DO_NOT_APPLY | Santa Clara/date 공식 근거 미확보 |
| aaai/asiacrypt/cloud/colt/cogsci/cluster/edbt/conext/cseet/dac/cgo-r2 | HOLD | 고급 재검증 에이전트가 두 번 타임아웃. 기존 보류 유지 |

---

## Phase 1 결과 (2026-06-12)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| 3dv | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 2027 날짜는 맞지만 공식 deadline time은 2026-08-28 11:00 PDT. DB `11:00Z`는 timezone 보정 필요 |
| aaai | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 공식 AAAI-27: abstract 2026-07-21, paper 2026-07-28, 23:59 AoE. DB 07-25/08-01 수정 필요 |
| aacl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 ARR May cycle 05-25 AoE 확인, 2027 CFP 미발표 |
| aamas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 10-08 AoE 확인, 2027 CFP 미발표 |
| accv | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 2026 main conf 12-16~18 OK, 전체 행사 12-14~18. 2028 CFP 미발표 |
| acl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 01-05 23:59 AoE OK, 2027 CFP 미발표 |
| acml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 06-26 23:59 AoE OK, 2027 공식 페이지 404 |
| acsac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 05-26 23:59 AoE OK, 2027 공식 페이지 404 |
| aistats | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 09-25/paper 10-02 AoE OK, 2027 CFP 미발표 |
| ase | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 03-26 AoE OK, 2027 researchr 페이지 404 |
| asiaccs | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 C1 paper 2026-08-21 및 C2 paper 2026-12-11, 23:59 AoE 확인. 2028 미발표 |
| asiacrypt | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 IACR 기준 paper 2026-05-21 23:59 AoE 확인, 기존 05-22 충돌 해소 |
| asplos | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | DB Apr cycle 2026-04-15 OK, 공식 Sep cycle 2026-09-09 23:59 AoE 추가 가능 |
| assets | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 04-22 23:59 AoE OK, 2027 CFP 미발표 |
| atc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | USENIX ATC sunset 후 ACM SIGOPS ATC로 운영. 2026 공식 CFP URL/주최/시간 보정 필요. paper 2026-06-10 23:59:59 AoE |
| avss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 Round 2 paper 05-04 OK, 공식 time/timezone 미표기, 2027 미발표 |
| bibm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 07-05, Dallas TX OK, 공식 time/timezone 미표기, 2027 미발표 |
| bigdata | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 08-21, Phoenix AZ OK, 공식 time/timezone 미표기, 2027 미발표 |
| bmvc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-22/paper 05-29 23:59 AoE OK, 2027 미발표 |
| case | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 03-15 연장 확정 OK, 공식 time/timezone 미표기, 2027 미발표 |
| cases | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 03-23/paper 03-30 AoE OK, ESWEEK/CASES 2027 미발표 |
| cav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 01-28 23:59 AoE OK, 2027 미발표 |
| cc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 2025-11-11 23:59 AoE OK, 2027 미발표 |
| ccc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 02-06 23:59 AoE OK, 2027 chair만 공지 |
| ccgrid | 2026 | ✅ OK | 2027 | ✅ | 2026-12-08 | 2026-12-15 | 2027-05-17~20, Dallas-Fort Worth, TX | 2027 공식 페이지 발표, 23:59 AoE |
| ccs | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | DB Cycle A OK, 공식 Cycle B abs 2026-04-22/paper 2026-04-29 23:59 AoE 추가 가능 |
| cgo | 2027 | ➕ 보완 | 2028 | ❌ | - | - | Salt Lake City, UT (날짜 TBA) | R1 2026-06-11 OK, R2 2026-09-10 공식 확인. conf date는 아직 TBA |
| chi | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 paper 2026-09-10 AoE, Pittsburgh 2027-05-10~14 OK. 2028 미발표 |
| cikm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-16/paper 05-23 23:59 AoE OK, 2027 미발표 |
| cloud | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 03-22 extended and firm OK, 공식 time/timezone 미기재, 2027 미발표 |

**✅ 추가 대상 (1개):** ccgrid (2027 — abstract 2026-12-08, paper 2026-12-15, Dallas-Fort Worth)
**⚠️ DB 수정 필요 (3개):** 3dv (2027 deadline time timezone 보정), aaai (2027 abstract/paper 07-21/07-28), atc (공식 URL/주최/시간 보정)
**➕ 보완 (3개):** asplos (2027 Sep cycle paper 2026-09-09), ccs (2026 Cycle B abs 04-22/paper 04-29), cgo (2027 R2 paper 2026-09-10, conf date는 TBA)
**❌ 미발표/해당없음 (29개):** 3dv(2028), aaai(2028), aacl, aamas, accv(2028), acl, acml, acsac, aistats, ase, asiaccs(2028), asiacrypt, asplos(2028), assets, atc, avss, bibm, bigdata, bmvc, case, cases, cav, cc, ccc, ccs, cgo(2028), chi(2028), cikm, cloud

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| ccgrid | https://ccgrid2026.org/ | https://hpcclab.org/ccgrid27/ | 2026 마감 + 2027 CFP 발표 |

**참고 URL 수정 후보:** atc 현재 URL은 `https://usenix.org/conference/atc`이나, 2026 공식 CFP는 `https://sigops.org/s/conferences/atc/2026/cfp.html`. 다만 다음 연도 CFP가 아니므로 자동 website_url 업데이트 대상에서는 제외.

*conferences.json 업데이트: ccgrid website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: ccgrid 2027 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 2 결과 (2026-06-12)

| 구분 | 항목 | 내용 |
|------|------|------|
| ✅ 추가 대상 | 없음 | DB 최신 연도 다음 CFP 신규 발표 없음 |
| ⚠️ DB 수정 필요 | cogsci | DB paper `2026-02-01` → 공식 paper `2026-02-02`, time/timezone 공식 미표기 |
| ⚠️ DB 수정 필요 | cscw | DB paper `2025-05-13` → 공식 2026 신규 논문 마감 `2025-05-14 12:00 EDT`; 2027+ rolling 전환 |
| ⚠️ DB 수정 필요 | eacl | DB paper `2025-10-06`은 ARR 제출일 성격. EACL 2026 공식 main commitment는 `2025-12-14 23:59 AoE` |
| ➕ 보완 | cseet | abstract `2026-02-20` extended, paper `2026-03-01`, time/timezone 미표기 |
| ➕ 보완 | ecoop | Round 1 paper `2025-11-27 23:59 AoE`, Round 2 paper `2026-02-12 23:59 AoE`; DB는 Round 2만 있음 |
| ➕ 보완 | cscw | 2027+ rolling submission 구조 반영 검토 |
| ➕ 보완 | edbt | 2027 conf `2027-04-06~09` 확인, paper `2026-06-10` 공식 CFP 원문 URL 보강 필요 |

**❌ 미발표/OK (25개):** cluster, codes-isss, coling, colt, concur, conext, conll, corl, crypto, csf, cvpr, dac, dasfaa, date, dis, disc, dsn, ecai, eccv, ecml-pkdd, ecrts, egsr, emnlp, emsoft, edbt

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| cscw | https://cscw.acm.org/2026/ | https://cscw.acm.org/2026/rolling.html | 2026 신규 논문 마감 + 2027+ rolling CFP 공식 발표 |

*deadlines.json 업데이트: ⚠️/➕ 항목 검토 후 반영*

---

## Phase 3 결과 (2026-06-12)

| 구분 | 항목 | 내용 |
|------|------|------|
| ✅ 추가 대상 | 없음 | DB 최신 연도 다음 CFP 신규 발표 없음 |
| ⚠️ DB 수정 필요 | esorics | DB abstract `2026-04-21` 제거 필요. 공식은 Winter paper `2026-01-09 23:59 AoE`, Spring paper `2026-04-21 23:59 AoE` |
| ⚠️ DB 수정 필요 | eurocrypt | DB paper `2025-10-31` → 공식 paper `2025-10-02 23:59 AoE` |
| ⚠️ DB 수정 필요 | icdm | DB abstract `2026-05-30`은 공식 research main CFP에서 확인 불가. 공식 paper `2026-06-06` |
| ➕ 보완 | fast | 2027 Spring paper `2026-03-17 23:59 AoE`, Fall paper `2026-09-15 23:59 AoE` |
| ➕ 보완 | icde | 2027 Round 1 paper `2026-06-11 17:00 PT`, Round 2 paper `2026-11-11 17:00 PT` |

**❌ 미발표/OK (25개):** er, esa, esem, esop, eurographics, eurosys, fase, fc, fg, focs, fse, gecco, hipc, hipeac, hpca, hpdc, hri, i3d, icalp, icaps, iccad, iccd, iccv, icdcs, icfp

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| icaps | https://icaps26.icaps-conference.org/calls/cfp/ | https://icaps27.icaps-conference.org/ | 2026 마감 + 2027 공식 사이트 발표 |
| hpca | https://2026.hpca-conf.org/ | https://conf.researchr.org/home/hpca-2027 | 2026 마감 + 2027 공식 사이트 발표 |

*deadlines.json 업데이트: ⚠️/➕ 항목 검토 후 반영*

---

## Phase 4 결과 (2026-06-12)

| 구분 | 항목 | 내용 |
|------|------|------|
| ✅ 추가 후보 | icip | 2027 공식 사이트 확인. conf `2027-11-29~12-03`, Singapore. CFP/deadline은 아직 없음 |
| ⚠️ DB 수정 필요 | icmr | DB 2027 conf-only는 공식 확인 실패. 현재 공식 사이트는 ICMR 2026, paper `2026-02-13`, conf `2026-06-16~19 Amsterdam` |
| ➕ 보완 | ics | Cycle 2 abstract `2026-02-02`, paper `2026-02-09` 보완 가능 |
| ➕ 보완 | icsoc | conf `2026-12-01~04`, Lodz, Poland 누락 보완. abs `2026-07-05`, paper `2026-07-12`, AoE |
| ➕ 보완 | ieee-vr | 2027 abstract `2026-08-24`, paper `2026-08-31`, conf `2027-02-27~03-03 Melbourne`; full CFP는 coming soon |
| ➕ 보완 | interact | 2027 full paper/workshop deadline `2027-02-01`, conf `2027-08-23~27 Tallinn`, timezone 미표기 |
| ➕ 보완 | imc | 2026 Cycle 1 abstract `2025-11-13`, paper `2025-11-20`도 공식 존재. DB는 Cycle 2 중심 |

**✅ OK (19개):** iclp, iclr, icml, icnp, icpp, icpr, icra, icse, icsme, icst, icws, ieee-vis, iiswc, ijcai, ijcar, ipdps, isaac, isca, ismar
**❌ 미발표/일정만 확인 (7개):** iclp(2027), iclr(2027), icml(2027), icnp(2027), icpp(2027), iros(2027 conf-only), ismb(2027 conf-only)
**⚠️ 재확인 보류:** 없음. ispass는 frames 내부 `cfp.php`에서 deadline 본문 재검증 완료.

### 🔗 website_url 업데이트 후보

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| infocom | - | https://infocom2027.ieee-infocom.org/ | 공식 URL 후보이나 본문 재확인 필요 |

*deadlines.json 업데이트: icip/ieee-vr/interact 등 conf-only/보완 항목 검토 후 반영*

---

## Phase 5 결과 (2026-06-12)

| 구분 | 항목 | 내용 |
|------|------|------|
| ✅ 추가 대상 | 없음 | IUI 2027, NDSS 2027은 이미 DB 존재. ITS 2027은 Rome, 2027-06-16~18 일정만 확인, CFP 미발표 |
| ⚠️ DB 수정 필요 | its | DB conf `2026-06-01~05` → 공식 `2026-06-03~05`, Pafos, Cyprus |
| ⚠️ DB 수정 필요 | kdd | 공식 Cycle 2 abs `2026-02-01`, paper `2026-02-08`, end-of-day AoE 추가/최신 cycle 검토 필요 |
| ⚠️ DB 수정 필요 | mobicom | 공식 Winter cycle abs `2026-03-06 23:59 AoE`, paper `2026-03-13 23:59 AoE` 추가/최신 cycle 검토 필요 |
| ➕ 보완 | isrr | paper/conf OK, deadline time/timezone 공식 미표기 |
| ➕ 보완 | middleware | conf `2026-12-14~18` 확인, DB abs/paper 공식 CFP 근거 재확인 필요 |
| ➕ 보완 | msst | paper/conf OK, deadline time/timezone 공식 미표기 |
| ⚠️ DB 수정 필요 | noms | 공식 CFP 경로 `/authors/call-technical-session-paper`에서 paper final deadline `2025-11-10` 확인. DB `2025-10-13`은 최초 deadline |

**✅ OK 주요 (20개):** isrr, issre, issta, itcs, kr, lctes, lics, lrec, mascots, mass, mdm, mfcs, micro, mobihoc, mobilehci, mobisys, models, msr, ndss, neurips
**❌ 미발표/DB 없음:** miccai deadline 미발표, naacl 자체 CFP/DB 없음

### 🔗 website_url 업데이트 대상

없음.

*deadlines.json 업데이트: ⚠️/➕ 항목 검토 후 반영*

---

## Phase 6 결과 (2026-06-12)

| 구분 | 항목 | 내용 |
|------|------|------|
| ✅ 추가 대상 | 없음 | DB 최신 연도 다음 CFP 신규 발표 없음 |
| ⚠️ DB 수정 필요 | oopsla | 공식 R1 paper `2025-10-10`, R2 paper `2026-03-17`, AoE. DB는 R1만 있음 |
| ⚠️ DB 수정 필요 | sas | DB abs `2026-05-02`, paper `2026-05-08` → 공식 registration `2026-05-01`, paper `2026-05-07`, AoE |
| ➕ 보완 | pets | 2027 conf `2027-07-19~24`, Delft, The Netherlands 누락 보완. deadlines는 `23:59:59 AoE` |

**❌ 미발표 (24개):** nossdav, osdi, pact, pakdd, performance, pg, pldi, podc, ppopp, raid, re, recomb, recsys, rss, rtas, rtss, sac, sc, sca, sdm, sec, secon, sas, oopsla
**✅ OK 주요 (27개):** nossdav, nsdi, osdi, pact, pakdd, percom, performance, pg, pldi, podc, pods, popl, ppopp, raid, re, recomb, recsys, rss, rtas, rtss, sac, saner, sc, sdm, sec, pets(deadline), sas(conf)

### 🔗 website_url 업데이트 후보

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| sas | https://staticanalysis.org/ | https://conf.researchr.org/home/splash-issta-2026/sas-2026 | 현 연도 세부 공식 페이지 후보 |
| pg | https://pacificgraphics2026.github.io/ | https://pacificgraphics2026.github.io/cfp.html | 현 연도 CFP 세부 페이지 후보 |
| raid | https://raid2026.org/ | https://raid2026.org/call.html | 현 연도 CFP 세부 페이지 후보 |

*deadlines.json 업데이트: oopsla/sas/pets 검토 후 반영*

---

## Phase 7 결과 (2026-06-12)

| 구분 | 항목 | 내용 |
|------|------|------|
| ✅ 추가 대상 | 없음 | DB 최신 연도 다음 CFP 신규 발표 없음 |
| ⚠️ DB 수정 필요 | 없음 | 명확한 오류 없음 |
| ➕ 보완 | socc | 2026 Round 2 registration `2026-07-07`, paper `2026-07-14`, AoE |
| ➕ 보완 | sp | IEEE S&P 2027 Cycle 2 registration `2026-11-10`, paper `2026-11-17`, `23:59:59 AoE`; Montreal, 날짜 TBA |
| ➕ 보완 | usenix-security | USENIX Security 2027 Cycle 2 registration `2027-01-19`, paper `2027-01-26`, timezone 공식 미표기 |
| ➕ 보완 | vldb | 2027 monthly submission 구조. abstract 전월 25일, paper 매월 1일, `17:00 PT`; DB는 첫 cycle만 반영 |

**❌ 다음연도 미발표 (29개):** sensys, sgp, sigcomm, siggraph, siggraph-asia, sigir, sigmetrics, sigmod, socc, socg, soda, sosp, soups, sp, spaa, srds, stacs, stoc, tacas, tcc, uai, ubicomp, uist, usenix-security, vldb, vrst, wacv, wsdm, www
**✅ 현재 DB OK 주요:** sensys, sigcomm, siggraph, siggraph-asia, sigmod, socc, soda, sosp, soups, sp, spaa, srds, stacs, stoc, tacas, uai, ubicomp, uist, usenix-security, vldb, vrst, wacv, wsdm, www

### 🔗 website_url 업데이트 대상

없음.

*deadlines.json 업데이트: socc/sp/usenix-security/vldb cycle 보완 검토 후 반영*

---

## Phase 7 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| sensys | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 abs/paper OK, 장소 New York 추가 가능, 정확한 일정/2nd deadline TBD |
| sgp | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2nd paper 04-15 OK, 2nd abstract 04-13 및 1st round 추가 가능 |
| sigcomm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 01-30/paper 02-06 AoE |
| siggraph | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-08-08~12, Anaheim | 2027 행사 일정만 확인, Technical Papers CFP 미발표 |
| siggraph-asia | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-05/paper 05-12, 23:59 AoE |
| sigir | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 01-15/paper 01-22 AoE |
| sigmetrics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | DB는 winter cycle OK, 2027 CFP 미발표 |
| sigmod | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | DB는 Round 3 OK, Round 1/2/4 일정도 공식 존재 |
| socc | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | Round 1 OK, Round 2 abs 2026-07-07/paper 2026-07-14 추가 가능 |
| socg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 2025-11-25/paper 2025-12-02 AoE |
| soda | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 paper 07-09, 23:59 AoE |
| sosp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 03-26/paper 04-01 AoE |
| soups | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 2026-02-20→02-19, abstract/registration 02-12 추가 권장 |
| sp | 2026 | ➕ 보완 | 2027 | ✅ | 2026-06-04 / 2026-11-10 | 2026-06-11 / 2026-11-17 | 2027-05, Montreal (TBA) | 2027 CFP 발표, 2026 2nd cycle도 추가 가능 |
| spaa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 02-20/paper 02-27 AoE |
| srds | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 04-24→05-01, paper 05-01→05-08 연장 |
| stacs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 2025-09-25, 23:59 AoE |
| stoc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 공식 2025-11-04 16:59 EST, UTC 저장값은 21:59Z 검토 |
| tacas | 2026 | ✅ OK | 2027 | ✅ | - | 2026-10-15 | 2027-04-10~15, Copenhagen | ETAPS/TACAS 2027 CFP 발표, AoE |
| tcc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 날짜 OK, 공식 페이지 내 시간 표기는 보강 필요 |
| uai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 02-25, 23:59 AoE |
| ubicomp | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | IMWUT multi-issue 모델이라 DB 02-01 단일 deadline은 불완전 가능 |
| uist | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 03-24/paper 03-31, 11:59pm AoE |
| usenix-security | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | Cycle 1 OK, Cycle 2 registration 2027-01-19/paper 2027-01-26 추가 가능, timezone 미표기 |
| vldb | 2027 | ✅ OK | 2028 | ❌ | - | - | - | rolling 첫 cycle OK, 월별 rolling 마지막 2027-03-01까지 존재 |
| vrst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 06-17/paper 06-24, 23:59 AoE |
| wacv | 2026 | ➕ 보완 | 2027 | ✅ | 2026-06-19 | 2026-06-26 | 2027-01-05~09, 장소 재확인 필요 | 2027 CFP 발표, 2026 Round 2도 추가 가능. Disney Springs는 공식 CFP에서 재확인 못함 |
| wsdm | 2026 | ✅ OK | 2027 | ✅ | 2026-08-17 | 2026-08-24 | 2027-02-15~19, Hong Kong | 공식 2027 CFP 발표, 11:59pm AoE |
| www | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 전체 이벤트 06-29~07-03 OK, 2027 CFP 미발표 |

**✅ 추가 대상 (4개):** sp (2027 — 2-cycle, Montreal), tacas (2027 — paper 2026-10-15, Copenhagen), wacv (2027 — abs 2026-06-19/paper 2026-06-26, 장소 재확인 필요), wsdm (2027 — abs 2026-08-17/paper 2026-08-24, Hong Kong)
**⚠️ DB 수정/확인 필요 (6개):** soups (paper 02-19), srds (05-01/05-08 연장), stoc (UTC 변환값 검토), ubicomp (IMWUT multi-issue 모델), tcc (deadline time 근거 보강), sensys (2027 일정 TBD/incomplete)
**➕ 보완 (7개):** sgp (1st/2nd abstract), sigmod (Round 1/2/4), socc (Round 2), sp (2026 2nd cycle), usenix-security (Cycle 2), vldb (rolling 전체), wacv (2026 Round 2)
**❌ 미발표/해당없음 (24개):** sensys(2028), sgp, sigcomm, siggraph, siggraph-asia, sigir, sigmetrics, sigmod(2028), socc, socg, soda(2028), sosp, soups, spaa, srds, stacs, stoc, tcc, uai, ubicomp, uist, usenix-security(2028), vldb(2028), vrst, www

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| sp | https://sp2026.ieee-security.org | https://sp2027.ieee-security.org/cfpapers.html | 2026 마감 + 2027 CFP 발표 |
| tacas | https://etaps.org/2026/conferences/tacas/ | https://etaps.org/2027/cfp/ | 2026 마감 + 2027 CFP 발표 |
| wacv | https://wacv.thecvf.com/Conferences/2026/CallForPapers | https://wacv.thecvf.com/Conferences/2027/CallForPapers | 2026 마감 + 2027 CFP 발표 |
| wsdm | https://wsdm-conference.org/2026/index.php/call-for-papers/ | https://wsdm-conference.org/2027/cffp.html | 2026 마감 + 2027 CFP 발표 |

**참고 URL 수정 후보:** sensys는 2027 CFP가 현재 URL로 이미 열려 있으나 conference date가 TBD라 deadline 보완만 우선. siggraph 2027은 행사 일정만 있고 Technical Papers CFP가 없어 URL 업데이트 제외.

*conferences.json 업데이트: sp, tacas, wacv, wsdm website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 6 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| nossdav | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | Ghent, Belgium (날짜 TBA) | paper 01-16 OK, DB 04-04~08은 MMSys 전체 기간, NOSSDAV 단독은 04-08 |
| nsdi | 2027 | ✅ OK | 2028 | ❌ | - | - | - | Fall cycle abs 2026-09-10/paper 2026-09-17 OK. 재검증상 Spring cycle 없음 |
| oopsla | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | R1 paper 2025-10-10 OK, R2 paper 2026-03-17 추가 가능 |
| osdi | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-07-07~09, Baltimore | 2027 일정만 확인, CFP 미발표 |
| pact | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 04-23/paper 04-30 AoE |
| pakdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 2025-11-25, 23:59 PST |
| percom | 2026 | ✅ OK | 2027 | ✅ | 2026-09-04 | 2026-09-11 | 2027-03-08~12, Goa | 공식 2027 CFP 발표, AoE |
| performance | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 abs 05-15/paper 05-22/conf 11-03~05 Ghent 추가, URL 2025→2026 |
| pets | 2026 | ➕ 보완 | 2027 | ✅ | - | 2026-05-31 / 2026-08-31 / 2026-11-30 / 2027-02-28 | 2027, 장소 TBA | 2027 PoPETs 4 issues CFP 발표, 23:59:59 AoE. Europe TBA는 공식 CFP 재확인 못함 |
| pg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 06-01/paper 06-08 AoE |
| pldi | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 페이지 열림, calls/dates 미발표 |
| podc | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-06-21~25, Reykjavik (tentative) | 2027 일정만 확인, CFP 미발표 |
| pods | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 Cycle 1 OK, Cycle 2 abs 2026-12-03/paper 2026-12-10 추가 가능 |
| popl | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2027 paper 07-09 AoE |
| ppopp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 2025-09-01 AoE |
| raid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 04-16, 23:59:59 AoE |
| re | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 02-16/paper 02-23 AoE |
| recomb | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 2025-11-07/paper 2025-11-20 AoE |
| recsys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | main conference 09-28~10-02 OK. 09-27은 Doctoral Symposium 예정 |
| rss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 01-23/paper 01-30 AoE |
| rtas | 2026 | ✅ OK | 2027 | ❌ | - | - | New York (CPS-IoT Week) | RTAS 2027 CFP 미발표 |
| rtss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-21/paper 05-26 AoE |
| sac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 10-17 EDT, 2027 메인 CFP 미발표 |
| saner | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 abs 2026-09-21/paper 2026-09-25 AoE 추가 가능 |
| sas | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper registration 05-01→submission 05-07, SAS 자체 10-06~08 |
| sc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 04-01/paper 04-08, 23:59 AoE |
| sca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 04-10/paper 04-17, 23:59 UTC |
| sdm | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 abs 04-10/paper 04-17/conf 11-19~20 Salt Lake City 추가 가능 |
| sec | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 2026-03-03→2025-12-19, AoE |
| secon | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | 공식 본문 12-15/04-27~29 vs 확장 글 12-30 AoE 충돌, DB 06-03~05 검증 안 됨 |

**✅ 추가 대상 (2개):** percom (2027 — reg 2026-09-04, paper 2026-09-11, Goa), pets (2027 — Issue 1~4 paper 2026-05-31/08-31/11-30/2027-02-28, 장소 TBA)
**⚠️ DB 수정/확인 필요 (4개):** nossdav (단독 일정 04-08 vs 전체 04-04~08), sas (paper 05-07 및 심포지엄 10-06~08), sec (paper 2025-12-19), secon (공식 내부 충돌 재확인)
**➕ 보완 (7개):** oopsla (R2), performance (2026 complete), pets (2026 Issue 2~4), pods (2027 Cycle 2), saner (2027 complete), sdm (2026 complete), podc/osdi/rtas 일정 메모
**❌ 미발표/해당없음 (27개):** nossdav, nsdi(2028), oopsla, osdi, pact, pakdd, performance, pg, pldi, podc, pods(2028), popl(2028), ppopp, raid, re, recomb, recsys, rss, rtas, rtss, sac, saner(2028), sas, sc, sca, sdm, sec, secon

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| percom | https://percom.org/ | https://percom.org/call-for-papers/ | 2027 CFP 발표, 현재 루트는 최신 2027 사이트 |
| pets | https://petsymposium.org/cfp26.php | https://www.petsymposium.org/cfp27.php | 2026 Issue 1 마감 + 2027 CFP 발표 |
| performance | https://performance2025.sciencesconf.org/ | https://performance2026.github.io/call/ | 2026 공식 CFP 확인, 기존 URL 2025 |

**참고 URL 수정 후보:** podc는 현재 URL보다 `https://www.podc.org/podc2026/call-for-papers/`가 더 정확하지만 2027 CFP가 없어 자동 교체 대상은 아님. saner는 2027 CFP가 이미 현재 URL 하위에 있으므로 deadline 보완만 필요.

*conferences.json 업데이트: percom, pets, performance website_url 검토 후 `pnpm seed`*
*deadlines.json 업데이트: ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 5 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| isrr | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 2026 paper 05-15→05-31 연장, 공식 timezone 미표기 |
| issre | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper 04-24, 23:59 AoE |
| issta | 2026 | ✅ OK | 2027 | ❌ | - | - | Singapore (날짜 TBA) | 2027 개최지만 확인, CFP 미발표 |
| iswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-02/paper 05-07, 23:59 AoE |
| itcs | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 날짜는 OK, timezone EDT→PDT/16:59 PDT |
| its | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | paper 02-28 확인, conf 06-01~05(시리즈) vs 06-03~05(상세) 충돌 |
| iui | 2026 | ✅ OK | 2027 | ✅ | 2026-08-13 | 2026-08-20 | 2027-02-08~11, Helsinki | 공식 2027 CFP 발표, end of day AoE |
| kdd | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | DB는 Cycle 1 OK, Cycle 2 abs 2026-02-01/paper 2026-02-08 추가 가능 |
| kr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | main 07-20~23, DB 07-18~25는 전체 행사 범위 |
| lctes | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 03-06→03-13, paper 03-13→03-20 연장 |
| lics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 01-15/paper 01-22 AoE |
| lrec | 2026 | ✅ OK | 2027 | ❌ | - | - | - | biennial, 2027 정규 회차/CFP 미발표 |
| mascots | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 05-17 AoE |
| mass | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | paper 2026-05-24, conf 2026-10-21~23 추가 가능 |
| mdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 03-06, 23:59 AoE |
| mfcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 04-24 AoE |
| miccai | 2027 | ⚠️ 확인필요 | 2028 | ❌ | - | - | 2028-10-16~20, São Paulo | 2027 시작일 공식 페이지끼리 09-26/09-27 충돌. 확정 수정 보류 |
| micro | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 03-31/paper 04-07, 23:59 EDT |
| middleware | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 summer cycle paper 06-05, AoE |
| mobicom | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | DB는 Summer cycle, Winter cycle abs 2026-03-06/paper 2026-03-13 추가 검토 |
| mobihoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 registration 04-13/submission 04-20, 23:59 AoE |
| mobilehci | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-09-20~23, Limassol | 2027 행사 일정만 확인, CFP 미발표 |
| mobisys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 2025-11-28/paper 2025-12-05, 23:59 AoE |
| models | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 03-20/paper 03-27, 23:59 AoE |
| msr | 2026 | ✅ OK | 2027 | ❌ | - | - | Dublin, Ireland (날짜 TBA) | 2027 개최지만 확인, CFP 미발표 |
| msst | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | paper 2026-04-14 추가 가능, timezone 미표기 |
| naacl | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | NAACL 2026 대신 ACL 2026 안내, 별도 NAACL 2027 CFP 미발표 |
| ndss | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | summer paper 05-06 OK, fall paper 2026-08-19 추가 가능 |
| neurips | 2026 | ✅ OK | 2027 | ❌ | - | - | Europe (날짜 TBA) | 2026 abs 05-04/paper 05-06 AoE |
| noms | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 2026-06-12 재검증상 공식 CFP paper final deadline 2025-11-10. 기존 10-13은 최초 deadline |

**✅ 추가 대상 (1개):** iui (2027 — abstract 2026-08-13, paper 2026-08-20, Helsinki)
**⚠️ DB 수정/확인 필요 (6개):** isrr (paper 05-31 연장), itcs (timezone PDT), its (conference date 충돌 확인), lctes (03-13/03-20 연장), miccai (공식 날짜 충돌로 보류), naacl (ACL/NAACL 회차 확인)
**➕ 보완 (5개):** kdd (2026 Cycle 2), mass (2026 paper/conf), mobicom (2026 Winter cycle), msst (2026 paper), ndss (2027 Fall cycle)
**❌ 미발표/해당없음 (28개):** isrr, issre, issta, iswc, itcs, its, kdd, kr, lctes, lics, lrec, mascots, mass, mdm, mfcs, miccai(2028 CFP), micro, middleware, mobicom, mobihoc, mobilehci, mobisys, models, msr, msst, naacl, ndss(2028), neurips, noms

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| iui | https://iui.acm.org/2026/ | https://iui.acm.org/2027/call-for-papers/ | 2026 마감 + 2027 CFP 발표 |

**참고 URL 수정 후보:** miccai는 2028 개최 일정만 발표됐고 CFP가 없어 URL 자동 교체 대상에서 제외. mobilehci/msr/neurips는 2027 개최지 또는 행사 일정만 확인되어 CFP URL 업데이트 대상 아님.

*conferences.json 업데이트: iui website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: iui 2027 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 1 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| 3dv | 2026 | ✅ OK | 2027 | ✅ | - | 2026-08-28 | 2027-04-06~09, Thessaloniki, Greece | 11:00 PDT, 공식 CFP 발표 |
| aaai | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | DB 2027 abstract 07-25→07-21, paper 08-01→07-28, AoE |
| aacl | 2025 | ✅ OK | 2026 | ✅ | - | 2026-05-25 (마감) | 2026-11-06~10, Hengqin, China | ARR May cycle, AoE |
| aamas | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-05-03~07, Hanoi, Vietnam | 2027 사이트는 열림, CFP/데드라인 TBC |
| accv | 2026 | ✅ OK | 2027 | ❌ | - | - | - | biennial, 2027 회차 없음, 다음 정규 회차 2028 예상 |
| acl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ACL 2027 main CFP 미발표 |
| acml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| acsac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 05-26 마감, 2027 미발표 |
| aistats | 2026 | ✅ OK | 2027 | ❌ | - | - | Montréal, Canada (날짜 미정) | 2027 개최지만 언급, CFP 미발표 |
| ase | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP/홈 미발표 |
| asiaccs | 2026 | ✅ OK | 2027 | ✅ | - | 2026-08-21 / 2026-12-11 | 2027-07-12~16, Macau | 2-cycle, AoE |
| asiacrypt | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | DB 05-21과 보조 소스 05-22 충돌. 공식 IACR 페이지 재확인 필요 |
| asplos | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 Apr cycle 04-15 있음, Sep cycle 2026-09-09 추가 가능 |
| assets | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| atc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | USENIX ATC 종료 후 ACM SIGOPS ATC로 재개. URL/주최 변경 필요, 2026 paper 06-10 |
| avss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 날짜 일치, 공식 timezone 표기 없음 |
| bibm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 07-05, Dallas TX, 공식 timezone 표기 없음 |
| bigdata | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 08-21, Phoenix AZ, 공식 timezone 표기 없음 |
| bmvc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-22/paper 05-29 마감, AoE |
| case | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 03-15 마감, 공식 timezone 표기 없음 |
| cases | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 03-23/paper 03-30 마감, AoE |
| cav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 01-28 마감, AoE |
| cc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 2025-11-11 마감, AoE |
| ccc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 02-06 마감, 23:59 AoE. 2027 chair만 공지 |
| ccgrid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs/paper 2025-12-21 마감, AoE |
| ccs | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | Cycle A는 일치, Cycle B abs 04-22/paper 04-29 추가 가능 |
| cgo | 2026 | ➕ 보완 | 2027 | ✅ | - | 2026-06-11 / 2026-09-10 | Salt Lake City, UT (날짜 TBA) | 2026 R2 paper 2025-09-11 추가 가능, 2027 2-cycle AoE |
| chi | 2026 | ✅ OK | 2027 | ✅ | - | 2026-09-10 | 2027-05-10~14, Pittsburgh, PA | abstract 사전제출 없음, AoE |
| cikm | 2026 | ✅ OK | 2027 | ❌ | - | - | Sydney, Australia (날짜 TBA) | 2027 개최지만 공지, CFP 미발표 |
| cloud | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 03-22는 일치, DB의 AoE timezone은 공식 표기 확인 불가 |

**✅ 추가 대상 (5개):** 3dv (2027 — paper 2026-08-28, Thessaloniki), aacl (2026 — ARR 2026-05-25, Hengqin), asiaccs (2027 — C1 2026-08-21 / C2 2026-12-11, Macau), cgo (2027 — R1 2026-06-11 / R2 2026-09-10, Salt Lake City), chi (2027 — paper 2026-09-10, Pittsburgh)
**⚠️ DB 수정 필요 (5개):** aaai (2027 abstract/paper 앞당김), asiacrypt (공식 IACR 재확인 필요: 05-21 vs 05-22 충돌), atc (USENIX URL/주최 → ACM SIGOPS ATC), cloud (timezone 공식 표기 없음), accv (2027은 격년으로 없음)
**➕ 보완 (3개):** asplos (2027 Sep cycle paper 2026-09-09), ccs (2026 Cycle B abs 04-22/paper 04-29), cgo (2026 R2 paper 2025-09-11)
**❌ 미발표/해당없음 (22개):** aaai(2028), aamas(2027 CFP TBC), accv(2027 없음), acl, acml, acsac, aistats, ase, asiacrypt, assets, avss, bibm, bigdata, bmvc, case, cases, cav, cc, ccc, ccgrid, cikm, cloud

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| 3dv | https://3dvconf.github.io/2026/ | https://3dvconf.github.io/2027/call-for-papers/ | 2026 마감 + 2027 CFP 발표 |
| aacl | https://2025.aaclnet.org/calls/main_conference_papers/ | https://2026.aaclnet.org/calls/main_conference_papers/ | 2025 마감 + 2026 CFP 발표 |
| asiaccs | https://asiaccs2026.cse.iitkgp.ac.in/ | https://asiaccs2027.cityu.edu.mo/call-for-papers/index.html | 2026 마감 + 2027 CFP 발표 |
| cgo | https://2026.cgo.org/ | https://conf.researchr.org/track/cgo-2027/cgo-2027-papers | 2026 마감 + 2027 CFP 발표 |
| chi | https://chi2026.acm.org/authors/papers/ | https://chi2027.acm.org/authors/papers/ | 2026 마감 + 2027 CFP 발표 |

**참고 URL 수정 후보:** atc 현재 URL은 `https://usenix.org/conference/atc`이나, 2026 공식 CFP는 `https://sigops.org/s/conferences/atc/2026/cfp.html`. 다만 2026 paper deadline(2026-06-10)이 아직 지나지 않아 위 자동 교체 규칙의 website_url 업데이트 대상에서는 제외.

*conferences.json 업데이트: 3dv, aacl, asiaccs, cgo, chi website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 2 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| cluster | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs/paper 05-07 AoE 일치 |
| codes-isss | 2026 | ✅ OK | 2027 | ❌ | - | - | TBD | ESWEEK 2027 공식 CFP 미발표 |
| cogsci | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 2026-02-01→공식 2026-02-02 midnight UTC-11 |
| coling | 2026 | ✅ OK | 2027 | ✅ | TBD | TBD | 2027-05-09~14, Macau | 공식 2027 사이트 공개, deadline은 TBD, 23:59 UTC-12 |
| colt | 2026 | ✅ OK | 2027 | ✅ | - | TBD | 2027-06-28~07-02, Tokyo | 공식 2027 페이지 공개, deadline TBD |
| concur | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 04-20/paper 04-27 AoE, 2027 미발표 |
| conext | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 신규제출 abs 2025-12-05/paper 2025-12-12 AoE 기준 |
| conll | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 02-19 AoE, 2027 미발표 |
| corl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-26 22:00 UTC, paper 05-29 11:59 UTC |
| crypto | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 paper 02-12, Santa Barbara, PST/UTC 계열 확인 |
| cscw | 2026 | ⚠️ 수정 | 2027 | ✅ | - | rolling | - | 2026 신규 논문 2025-05-14 12:00 EDT, 2027+ rolling/no fixed deadline |
| cseet | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 abstract 02-20 추가 가능, timezone 공식 표기 없음 |
| csf | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 3-cycle 중 DB는 winter 01-29 보유, AoE |
| cvpr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| dac | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | 2027-07-10~16, San Jose | 2026 abs 11-11 17:00 PT, paper 11-19 17:00 PST |
| dasfaa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| date | 2026 | ✅ OK | 2027 | ✅ | 2026-09-13 | 2026-09-20 | 2027-03-22~24, Dresden | 공식 2027 CFP 공개, AoE |
| dis | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| disc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2026 abs 05-27/paper 06-01 AoE, 2027 미발표 |
| dsn | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| eacl | 2026 | ✅ OK | 2027 | ✅ | - | 2026-08-03 | 2027-03-09~14, Athens | ARR submission, AoE |
| ecai | 2026 | ✅ OK | 2027 | ❌ | - | - | Athens, Greece (날짜 미정) | 2027 개최 언급만 확인, CFP 미발표 |
| eccv | 2026 | ⚠️ 수정 | 2028 | ❌ | - | - | - | timezone UTC→CET/CEST 표기 권장, 23:00 CET |
| ecml-pkdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| ecoop | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| ecrts | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| edbt | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | 2027 3-cycle: 02-04 / 06-10 / 10-07, timezone AoE 권장 |
| egsr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 CFP 미발표 |
| emnlp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| emsoft | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ESWEEK/EMSOFT 2027 CFP 미발표 |

**✅ 추가/사이트 발표 대상 (5개):** coling 2027 (Macau, deadline TBD), colt 2027 (Tokyo, deadline TBD), date 2027 (abs 09-13, paper 09-20), eacl 2027 (ARR 08-03), cscw 2027 rolling CFP
**⚠️ DB 수정 필요 (5개):** cogsci (paper date/timezone), cscw (new submission 05-14 12:00 EDT + rolling 전환), dac (17:00 PT/PST 시간 반영), eccv (timezone CET/CEST), edbt (timezone/cycle 구조)
**➕ 보완 (2개):** cseet (abstract 2026-02-20), edbt (3-cycle 전체 기록)
**❌ 미발표 (20개):** cluster, codes-isss, concur, conext, conll, corl, crypto, csf, cvpr, dasfaa, dis, disc, dsn, ecai, ecml-pkdd, ecoop, ecrts, egsr, emnlp, emsoft

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| coling | N/A | https://2027.coling-iccl.org/ | 2027 공식 사이트 공개 |
| colt | https://learningtheory.org/colt2026/cfp.html | https://learningtheory.org/colt2027/ | 2026 마감 + 2027 사이트 공개 |
| date | https://www.date-conference.com/ | https://www.date-conference.com/date-2027-call-papers | 2026 마감 + 2027 CFP 발표 |
| eacl | https://2026.eacl.org/ | https://2027.eacl.org/calls/papers/ | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: coling, colt, date, eacl website_url 검토/교체 후 `pnpm seed`*
*deadlines.json 업데이트: date/eacl 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 3 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| er | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| esa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ALGO/ESA 2027 미발표 |
| esem | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ESEIW/ESEM 2027 미발표 |
| esop | 2026 | ✅ OK | 2027 | ✅ | - | 2026-05-28 / 2026-10-15 | 2027-04-10~15, Copenhagen | ETAPS 2027, 2-round, AoE |
| esorics | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB abstract 04-21은 별도 abstract가 아니라 Spring full paper. Winter paper 01-09도 존재 |
| eurocrypt | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 재검증상 공식 paper 2025-10-02 23:59 AoE. 10-31 수정 후보 취소 |
| eurographics | 2026 | ✅ OK | 2027 | ❌ | - | - | Pisa, Italy (날짜 미정) | 2027 개최지만 확인, CFP 미발표 |
| eurosys | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | conf end 2027-04-24→04-23, Spring cycle 2026-05-07/05-14 추가 가능 |
| fase | 2026 | ✅ OK | 2027 | ⚠️ | - | - | - | FASE는 2027부터 iFS로 통합. iFS paper 2026-10-15 |
| fast | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | timezone PDT→AoE, Spring cycle 2026-03-17도 있음 |
| fc | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | 재검증상 공식 deadline time은 23:59 AoE. UTC 변환값은 별도 확인 필요 |
| fg | 2026 | ➕ 보완 | 2027 | ❌ | - | - | April-May 2027 선호 | R1 extended 2025-10-06, R2 2026-01-09/01-15/01-25 추가 가능 |
| focs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 04-01 17:00 EDT |
| fse | 2027 | ✅ OK | 2028 | ❌ | - | - | Milan, Italy (날짜 미정) | FSE 2028 개최지만 확인 |
| gecco | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | 날짜 일치, 공식 CFP에서 timezone 확인 불가 |
| hipc | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 abs 06-17, paper 06-24, conf 12-16~19 Bengaluru 추가 필요 |
| hipeac | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | 2027-01-18~20, Glasgow | 2026 paper 날짜는 맞지만 timezone 공식 표기 없음, 2027 main CFP 미발표 |
| hpca | 2026 | ✅ OK | 2027 | ✅ | 2026-07-24 | 2026-07-31 | 2027-01-30~02-03, Salt Lake City? | 공식 페이지 under construction, 장소 재확인 필요 |
| hpdc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| hri | 2027 | ➕ 보완 | 2028 | ❌ | - | TBD | 2027-03-08~12, Santa Clara | Full paper deadline TBD |
| i3d | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | timezone PST→Pacific Time UTC-7, 23:59 |
| icalp | 2026 | ✅ OK | 2027 | ❌ | - | - | July 2027, Krakow | 공식 CFP 미발표, Track B 09-15 TBC는 보조출처 |
| icaps | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-06-30~07-02, Columbia SC | 2027 사이트/날짜만 공개, CFP 미발표 |
| iccad | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| iccd | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 재검증 정정: 2026 abs 05-15, paper 05-22, 23:59 AoE, Hong Kong |
| iccv | 2025 | ➕ 보완 | 2027 | ❌ | - | - | - | 2025 paper registration 03-03 HST 보완 가능, 2027 미발표 |
| icdcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| icde | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | deadline time 23:59Z→17:00 Pacific, R2 2026-11-11도 있음 |
| icdm | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 별도 abstract 없음. DB abstract 05-30 제거/수정 필요 |
| icfp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |

**✅ 추가/사이트 발표 대상 (4개):** esop 2027 (R1 05-28/R2 10-15), hpca 2027 (abs 07-24, paper 07-31), hipc 2026 (abs 06-17, paper 06-24), iccd 2026 (재검증 정정: abs 05-15, paper 05-22)
**⚠️ DB 수정/확인 필요 (9개):** esorics, eurosys, fast, fc(UTC 변환 확인), hipeac, i3d, icde, icdm, gecco(시간대 확인)
**➕ 보완 (6개):** fg, hipc, hri, iccd, iccv, eurosys(Spring cycle)
**⚠️ 구조 변경:** fase는 2027부터 iFS로 통합
**❌ 미발표 (19개):** er, esa, esem, eurographics, hpdc, icalp, icaps(CFP 미발표), iccad, iccv(2027), icdcs, icdm, icfp, fc, fg, focs, gecco, hipeac(main CFP), fse(2028), fast(2028)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| esop | https://etaps.org/2026/conferences/esop/ | https://www.etaps.org/2027/cfp/ | 2026 마감 + 2027 CFP 발표 |
| hpca | https://2026.hpca-conf.org/ | https://conf.researchr.org/track/hpca-2027/hpca-2027-main-conference/ | 2026 마감 + 2027 CFP 발표 |
| hipc | https://hipc.org/ | https://hipc.org/papers/ | 2026 CFP 보완 필요 |
| iccd | http://www.iccd-conf.com/ | https://www.iccd-conf.com/2026/CFP_ICCD2026.pdf | 2026 CFP 보완 필요 |

*conferences.json 업데이트: esop, hpca, hipc, iccd website_url 검토/교체 후 `pnpm seed`*
*deadlines.json 업데이트: ✅/⚠️/➕ 항목 반영 후 `pnpm seed`*

---

## Phase 4 결과 (2026-05-31)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| icip | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-11-29~12-03, Singapore | 2027 사이트만 공개, CFP 미발표 |
| iclp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| iclr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 공식 Future Meetings 2026까지만 확인 |
| icml | 2026 | ✅ OK | 2027 | ❌ | - | - | South America (세부 미정) | 2027 개최 지역만 공개, CFP 미발표 |
| icmr | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | 2027-06-07~10 tentative, Singapore | 공식 2026 abstract 확인 불가, paper 02-13만 표시 |
| icnp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| icpp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| icpr | 2026 | ✅ OK | 2028 | ✅ | - | TBD | 2028, Sydney | 2028 공식 사이트/CFP 페이지 공개, dates TBD |
| icra | 2026 | ⚠️ 수정 | 2027 | ✅ | - | TBD | 2027-05-24~28, Seoul | 2026 paper time 2025-09-15 11:59 PST, 2027 사이트만 공개 |
| ics | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | Cycle 2 abstract 2026-02-02 보완, Cycle 1 2025-12-09/12-16도 존재 |
| icse | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 공식 CFP 미발표 |
| icsme | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| icsoc | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | 2026 regular abs 07-05, paper 07-12, conf 12-01~04 Lodz 보완 필요 |
| icst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| icws | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 03-22 일치, 공식 timezone 표기 없음 |
| ieee-vis | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| ieee-vr | 2027 | ➕ 보완 | 2028 | ❌ | - | TBD | 2027-02-27~03-03, Melbourne | 2027 사이트/일정만 공개 |
| iiswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| ijcai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | IJCAI 2027 chair만 공개, CFP/장소 미발표 |
| ijcar | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 2026-02-13→02-15, biennial이라 2027 회차 없음 |
| imc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 CFP 미발표, DB URL은 /cfp/ 직접 링크 가능 |
| infocom | 2027 | ⚠️ 확인필요 | 2028 | ❌ | - | - | - | 공식 CFP 미확인. 보조 소스는 abstract/paper 모두 2026-07-24로 표시 |
| interact | 2027 | ➕ 보완 | 2029 | ❌ | - | 2027-02-01 | 2027-08-23~27, Tallinn | full papers/workshops 02-01, short papers 등 05-03 |
| ipdps | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| iros | 2026 | ✅ OK | 2027 | ✅ | - | 2027-03-01 | 2027-09-26~10-01, Florence | IEEE RAS 공식 deadline event 확인, timezone 미표기 |
| isaac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| isca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |
| ismar | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-10-11~15, Kobe | 2027 장소/일정만 공개, CFP 미발표 |
| ismb | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027-07-18~22, Copenhagen | 2027 일정만 공개, CFP 미발표 |
| ispass | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 공식 CFP 미발표 |

**✅ 추가/사이트 발표 대상 (6개):** icpr 2028 (Sydney, dates TBD), icra 2027 (Seoul, deadline TBD), iros 2027 (paper 2027-03-01, Florence), icsoc 2026 (abs 07-05/paper 07-12), interact 2027 (paper 02-01), icip 2027/ieee-vr 2027/ismar 2027/ismb 2027 사이트·일정만 공개
**⚠️ DB 수정 필요 (5개):** icmr (abstract 제거/확인), icra (2026 deadline time), ijcar (paper 02-15), infocom (공식 확인 필요), icws (timezone 공식 표기 없음)
**➕ 보완 (4개):** ics (Cycle 2 abstract + Cycle 1), icsoc (2026 정규 데이터), ieee-vr (2027 deadline TBD), interact (2027 deadlines)
**❌ 미발표 (20개):** iclp, iclr, icml(CFP), icnp, icpp, icse(2028), icsme, icst, ieee-vis, iiswc, ijcai, imc, ipdps, isaac, isca, ispass, ijcar(2027 없음), icpr(2028 dates TBD), ismar(CFP), ismb(CFP)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| icip | https://2026.ieeeicip.org/ | https://2027.ieeeicip.org/ | 2026 마감 + 2027 사이트 공개 |
| icpr | https://icpr2026.org/ | https://icpr2028.org/cfp/ | 2026 마감 + 2028 사이트 공개 |
| icra | https://2026.ieee-icra.org/contribute/call-for-icra-2026-papers-now-accepting-submissions/ | https://2027.ieee-icra.org/contribute/ | 2026 마감 + 2027 사이트 공개 |
| icsoc | https://icsoc2026.it.p.lodz.pl/ | https://icsoc2026.it.p.lodz.pl/important-dates.html | 2026 데이터 보완 |
| interact | https://interact2027.org/ | https://interact2027.org/ | 2027 deadlines 공개 |
| iros | https://2026.ieee-iros.org/ | https://www.ieee-ras.org/event/call-for-papers-paper-submission-deadline-iros-2027-ieee-rsj-international-conference-on-intelligent-robots-and-systems-iros-27403-0/ | 2026 마감 + 2027 paper deadline 발표 |

*conferences.json 업데이트: icip, icpr, icra, icsoc, interact, iros website_url 검토/교체 후 `pnpm seed`*
*deadlines.json 업데이트: ✅/⚠️/➕ 항목 반영 후 `pnpm seed`*

---

## Phase 1 결과 (2026-05-14)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| 3dv | 2026 | ✅ OK | 2027 | ❌ | - | - | Apr mid, Thessaloniki, Greece | timezone PT, 2027 데드라인 미발표 |
| aaai | 2027 | ✅ OK | 2028 | ❌ | - | - | - | Feb 16-23 Montreal, 데드라인 공식 미확정(TBD) |
| aacl | 2025 | ✅ OK | 2026 | ✅ | - | 2026-05-25 ← 임박 | Nov 6-10, Hengqin, China | ARR 기반, commitment 08-26 |
| aamas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-08), OpenReview 2027 그룹 생성 |
| accv | 2026 | ✅ OK | 2028 | ❌ | - | - | - | conf 12-16~18 main (전체 12-14~18), timezone GMT |
| acl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ARR 시스템, paper 마감 (01-05), 2027 미발표 |
| acml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 06-26, timezone PST, Melbourne Australia |
| acsac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 05-26 ← 임박, firm deadline, AoE |
| aistats | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-02), Tangier Morocco, AoE |
| ase | 2026 | ✅ OK | 2027 | ✅ | - | TBD | Oct 24, El Paso, USA | 2026 paper 마감 (03-26), Munich, AoE |
| asiaccs | 2026 | ✅ OK | 2027 | ✅ | - | 2026-08-21 (C1) / 2026-12-11 (C2) | Jul 12-16, Macau, China | AoE |
| asiacrypt | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 05-22→**05-21** (하루 앞당김), AoE |
| asplos | 2027 | ✅ OK | 2028 | ❌ | - | - | - | Apr cycle 마감, Sep cycle 09-09, Crete Greece, AoE |
| assets | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-22), Porto Portugal, AoE |
| atc | 2026 | ✅ OK | 2027 | ❌ | - | - | Jul, France (TBD) | SIGOPS 인수, paper 06-10, HK, AoE |
| avss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Round2 paper 05-04 (마감), Lecce Italy |
| bibm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 07-05, Dallas TX, 17:00 EDT |
| bigdata | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 08-21, Phoenix AZ |
| bmvc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-22 ← 임박, paper 05-29 ← 임박, Lancaster UK, AoE |
| case | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-15), Shenyang China |
| cases | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-30), ESWEEK Barcelona, AoE |
| cav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-28), FLoC 2026 Lisbon, AoE |
| cc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 학회 종료, Sydney, AoE |
| ccc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-06), Lisbon, AoE. 2027 chair 확정 |
| ccgrid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-21), Sydney, AoE |
| ccs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Cycle B paper 마감 (04-29), The Hague Netherlands, AoE |
| cgo | 2026 | ✅ OK | 2027 | ✅ | - | 2026-06-11 (R1) | TBD, Salt Lake City, UT | AoE, R2 deadline 미발표 |
| chi | 2026 | ✅ OK | 2027 | ✅ | - | 2026-09-10 | May 10-14, Pittsburgh, PA | abstract 사전제출 폐지, AoE |
| cikm | 2026 | ✅ OK | 2027 | ❌ | - | - | Oct 25-29, Sydney (tentative) | abs 05-16 ← 임박(이틀 후!), paper 05-23, Rome, AoE |
| cloud | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-22 연장), Sydney |

**✅ 추가 대상 (4개):** aacl (2026 — ARR 05-25, Hengqin), asiaccs (2027 — C1 08-21 / C2 12-11, Macau), cgo (2027 — R1 06-11, Salt Lake City), chi (2027 — paper 09-10, Pittsburgh)
**⚠️ DB 수정 필요 (1개):** asiacrypt (paper 05-22→**05-21**)
**❌ 미발표 (24개):** aaai(2028), acl, acml, acsac, aistats, ase(2027 장소만), asplos(2028), assets, atc(2027 장소만), avss, bibm, bigdata, bmvc, case, cases, cav, cc, ccc, ccgrid, ccs, cikm, cloud + accv(2028)
**참고:** ASE 2027은 El Paso USA 확정, 데드라인 미발표. ATC는 SIGOPS 인수로 계속 운영.

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| aacl | https://2025.aaclnet.org/calls/main_conference_papers/ | https://2026.aaclnet.org/calls/main_conference_papers/ | 2025 마감 + 2026 CFP 발표 |
| asiaccs | https://asiaccs2026.cse.iitkgp.ac.in/ | https://asiaccs2027.cityu.edu.mo/ | 2026 마감 + 2027 CFP 발표 |
| chi | https://chi2026.acm.org/authors/papers/ | https://chi2027.acm.org/authors/papers/ | 2026 마감 + 2027 CFP 발표 |
| cgo | https://2026.cgo.org/ | https://conf.researchr.org/home/cgo-2027 | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: aacl, asiaccs, chi, cgo website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️ 항목 수정 후 `pnpm seed`*

---

## Phase 2 결과 (2026-05-14)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| cluster | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abs/paper 둘 다 05-07로 변경(마감), AoE |
| codes-isss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-30), ESWEEK Barcelona, AoE |
| cogsci | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | Bilbao, Spain (날짜 미정) | paper 04-10→**02-01** (DB 오류!), 마감 |
| coling | - | - | 2026 | ✅ | ~02-12(마감) | N/A | Aug 24-30, Barcelona | DB 미등록, 2026 마감됨 |
| colt | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-04), San Diego, AoE |
| concur | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-27), Liverpool UK, AoE |
| conext | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB의 05-29/06-05는 Round2 major revision 전용, 신규제출 마감 2025-12-12 |
| conll | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-19), ACL 공동, AoE |
| corl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-26 ← 임박, paper 05-29 ← 임박, UTC (AoE 아님!) |
| crypto | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-12), Santa Barbara, 23:59 PST |
| cscw | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (05-13), Salt Lake City, rolling 전환 가능, AoE |
| cseet | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-01), Florence, 2027 ICSE SEET 흡수 가능 |
| csf | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 3-cycle, Winter 01-29(마감), FLoC Lisbon, AoE |
| cvpr | 2026 | ✅ OK | 2027 | ❌ | - | - | Jun 19-26, Seattle | paper 마감, CFP 미발표, AoE |
| dac | 2026 | ✅ OK | 2027 | ❌ | - | - | Jul 10-16, San Jose | paper 마감, CFP 미발표 |
| dasfaa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-27), Jeju Island |
| date | 2026 | ✅ OK | 2027 | ✅ | 2026-09-13 | 2026-09-20 | Mar 22-24, Dresden | AoE, firm deadline |
| dis | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-19), Singapore |
| disc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-27 ← 임박, paper 06-01, Rome, AoE |
| dsn | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-04), Charlotte NC, AoE |
| eacl | 2026 | ✅ OK | 2027 | ✅ | - | ARR 2026-08-03 | Mar 9-14, Athens, Greece | ARR commitment 방식, AoE |
| ecai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | IJCAI-ECAI 공동, paper 마감 (01-19), Bremen |
| eccv | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 짝수년, conf end 09-12(수정), 23:00 CET |
| ecml-pkdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-12), Naples |
| ecoop | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-12), Brussels |
| ecrts | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-26), Lund Sweden, AoE |
| edbt | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | Round 2 paper 06-11→**06-10**, Lille |
| egsr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-15), Bordeaux, UTC (AoE 아님!) |
| emnlp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ARR paper 05-25 ← 임박, Budapest Hungary, AoE |
| emsoft | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-30), ESWEEK Barcelona, AoE |

**✅ 추가 대상 (2개):** date (2027 — abs 09-13, paper 09-20, Dresden), eacl (2027 — ARR 08-03, Athens Mar 9-14)
**⚠️ DB 수정 필요 (3개):** cluster (abs/paper 둘 다 05-07), cogsci (paper 04-10→**02-01**), edbt (R2 06-11→**06-10**)
**➕ 보완 (2개):** coling (DB 미등록, 2026 데이터 확보), conext (Round2 데드라인 구분 필요)
**❌ 미발표 (23개):** codes-isss, colt, concur, conll, corl, crypto, cseet, csf, cvpr, dac, dasfaa, dis, disc, dsn, ecai, eccv(2028), ecml-pkdd, ecoop, ecrts, egsr, emnlp, emsoft + cogsci(2027 장소만)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| date | https://www.date-conference.com/ | https://www.date-conference.com/date-2027-call-papers | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: date website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: date 2027 + eacl 2027 추가 + ⚠️ 수정 항목 반영 후 `pnpm seed`*

---

## Phase 3 결과 (2026-05-14)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| er | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abs 05-05→**05-12**(마감), paper 05-12→**05-19**(마감), AoE |
| esa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-23), L'Aquila Italy, AoE |
| esem | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 04-22→**05-11**(마감), paper 05-18(마감), Munich, AoE |
| esop | 2026 | ✅ OK | 2027 | ✅ | - | R1: 2026-05-28 ← 임박 / R2: 2026-10-15 | ETAPS Copenhagen | AoE |
| esorics | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | Spring paper 마감 (04-21), timezone UTC→**AoE**, Rome |
| eurocrypt | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 재검증 정정: 공식 paper 2025-10-02 23:59 AoE. 기존 10-31 수정 후보 취소 |
| eurographics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-26), Aachen, UTC |
| eurosys | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | **Spring cycle 추가**: abs 마감 (05-07), paper 마감 (05-14), AoE |
| fase | 2026 | ✅ OK | 2027 | ⚠️ | - | - | - | **2026 마지막 회차, FASE 종료** → iFS로 대체 (ETAPS 2027~) |
| fast | 2027 | ✅ OK | 2028 | ❌ | - | - | - | Spring 마감 (03-17), Fall 09-15, Renton WA, AoE |
| fc | 2026 | ⚠️ 확인필요 | 2027 | ❌ | - | - | - | 재검증 정정: 공식 FC 2026은 23:59 AoE. 2027 Barbados/12:00 UTC 후보는 공식 확인 못함 |
| fg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감, Kyoto, AoE, 2027 site selection 중 |
| focs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-01), NYC, 17:00 EDT |
| fse | 2027 | ⚠️ 확인필요 | 2028 | ❌ | - | - | Milan (날짜 TBD) | 재검증 정정: FSE 2026 research track은 reg 2025-09-04/full paper 2025-09-11. 2027 paper 10-02 후보는 공식 확인 필요 |
| gecco | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-26), Costa Rica, AoE |
| hipc | - | ➕ 보완 | 2026 | ✅ | - | 2026-06-17 | Dec 16-19, Bengaluru | DB 전체 누락, 2025+2026 모두 입력 필요 |
| hipeac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-06-01), Krakow, AoE |
| hpca | 2026 | ✅ OK | 2027 | ❌ | - | - | Renton WA (비공식) | paper 마감 (2025-08-01), Sydney, EDT |
| hpdc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-05), Cleveland OH, AoE |
| hri | 2027 | ✅ OK | 2028 | ❌ | - | - | Mar 8-12, Santa Clara | deadline TBD, 2027 장소 확정 |
| i3d | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-09), timezone Pacific (AoE 아님!) |
| icalp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-06), AoE |
| icaps | 2026 | ✅ OK | 2027 | ✅ | - | TBD | TBD, Columbia SC | paper 마감 (2025-12-08), Dublin, AoE |
| iccad | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-14), San Jose, AoE |
| iccd | - | ➕ 보완 | 2026 | ✅ | 2026-05-15 | 2026-05-22 | Hong Kong SAR, China | 재검증 정정: 23:59 AoE |
| iccv | 2025 | ✅ OK | 2027 | ❌ | - | - | - | 홀수년, paper 마감 (2025-03-07), abs 03-03 추가 필요 |
| icdcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs+paper 마감 (01-21), Seoul, AoE |
| icde | 2027 | ✅ OK | 2028 | ❌ | - | - | - | R1 06-11, R2 11-11, Copenhagen, 5PM PT |
| icdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-30 ← 임박, paper 06-06, Shenyang, AoE |
| icfp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-19), Indianapolis, AoE |

**✅ 추가 대상 (4개):** esop (2027 R1 05-28 + R2 10-15, ETAPS Copenhagen), hipc (2025+2026 데이터), icaps (2027 Columbia SC), iccd (재검증 정정: 2026 abs 05-15, paper 05-22)
**⚠️ DB 수정/확인 필요 (3개):** er (abs→05-12, paper→05-19), esem (abstract 04-22→**05-11**), fse (2027 후보 공식 확인 필요)
**➕ 보완 (2개):** eurosys (Spring cycle 추가), iccv (abs 03-03 추가)
**⚠️ FASE 종료:** 2026 마지막 회차, ETAPS 2027부터 iFS로 대체
**❌ 미발표 (19개):** esa, eurographics, fast(2028), fg, focs, gecco, hipeac, hpca, hpdc, hri(deadline TBD), i3d, icalp, iccad, icde(2028), icdm, icfp + eurosys(2028)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| fc | (현재 URL) | 보류 | 재검증상 FC 2027 공식 CFP/URL 확인 못함 |

*deadlines.json 업데이트: hipc/iccd 추가 + esop 2027 추가 + ⚠️ 수정 항목 반영 후 `pnpm seed`*

---

## Phase 4 결과 (2026-05-14)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| icip | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Nov 29-Dec 3, Singapore | 2026 paper 마감 (02-04), AoE |
| iclp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-07), FLoC 2026, AoE |
| iclr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-24), AoE |
| icml | 2026 | ✅ OK | 2027 | ❌ | - | - | South America (도시 TBD) | paper 마감 (01-28), Seoul, AoE |
| icmr | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | TBD, Singapore | 2026 paper 마감 (02-13), AoE |
| icnp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-15 ← 임박(내일!), paper 05-22 ← 임박, AoE |
| icpp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (04-24), paper 마감 (05-01), Singapore, AoE |
| icpr | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 격년(짝수), 2027 Virtual(paper 10-25 마감), 2028 Sydney |
| icra | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | May 24-28, Seoul COEX | PST, 2027 deadline 미발표 |
| ics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2-cycle, C2 paper 마감 (02-09), Belfast |
| icse | 2027 | ✅ OK | 2028 | ❌ | - | - | - | abs 06-23, paper 06-30, Dublin, AoE |
| icsme | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-06), Benevento Italy, AoE |
| icsoc | - | - | 2026 | ✅ | 2026-07-05 | 2026-07-12 | TBD, Lodz, Poland | early 마감 (05-10), 정규 abs 07-05, AoE |
| icst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-22), Daejeon Korea, AoE |
| icws | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-22), Sydney |
| ieee-vis | 2026 | ✅ OK | 2027 | ❌ | - | - | Chicago (날짜 TBD) | paper 마감 (03-31), Boston, AoE |
| ieee-vr | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Feb 27-Mar 3, Melbourne | 2026 마감 완료, Daegu Korea |
| iiswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-14 ← 오늘!, paper 05-21 ← 임박, Boulder, AoE |
| ijcai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-19), IJCAI-ECAI Bremen, AoE |
| ijcar | 2026 | ✅ OK | - | ❌ | - | - | - | 격년(짝수), 2026 FLoC Lisbon. 2027은 CADE |
| imc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2-cycle, C2 paper 마감 (04-29), Karlsruhe, AoE |
| infocom | 2027 | ✅ OK | 2028 | ✅ | TBA | TBA | May 15-18, Santa Clara | 2027 abs 07-17, paper 07-24, Honolulu, AoE |
| interact | - | - | 2027 | ✅ | TBA | TBA | Aug 23-27, Tallinn, Estonia | 홀수년 개최, 데드라인 TBD |
| ipdps | 2026 | ✅ OK | 2027 | ❌ | - | - | Seattle/Bellevue (날짜 TBD) | paper 마감 (2025-10-09), AoE |
| iros | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Sep 26-Oct 1, Florence | 2026 paper 마감 (03-02), Pittsburgh, AoE |
| isaac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 06-26, Hangzhou China, AoE |
| isca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-17), Raleigh, AoE |
| ismar | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-16), Bari Italy, AoE |
| ismb | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | TBD, Copenhagen (ISMB/ECCB) | proceedings 마감 (01-20) |
| ispass | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-15), Seoul, 17:00 EST |

**✅ 추가 대상 (4개):** icsoc (2026 — abs 07-05, paper 07-12, Lodz), infocom (2028 — Santa Clara), icra (2027 — Seoul COEX), iros (2027 — Florence)
**✅ 사이트만 발표 (5개):** icip 2027 (Singapore), icmr 2027 (Singapore), ieee-vr 2027 (Melbourne), interact 2027 (Tallinn), ismb 2027 (Copenhagen) — 데드라인 미발표
**⚠️ DB 수정 필요 (0개):** 없음
**❌ 미발표 (17개):** iclp, iclr, icml, icnp, icpp, ics, icse(2028), icsme, icst, icws, ieee-vis, iiswc, ijcai, ijcar(격년), imc, ipdps, ispass
**⏰ 임박 데드라인:** iiswc abs 05-14(오늘!), icnp abs 05-15(내일!), icnp paper 05-22, iiswc paper 05-21

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| icip | https://2026.ieeeicip.org/ | https://2027.ieeeicip.org/ | 2026 마감 + 2027 사이트 발표 |
| icra | https://2026.ieee-icra.org/ | https://2027.ieee-icra.org/ | 2026 마감 + 2027 사이트 발표 |
| ieee-vr | https://ieeevr.org/2026/ | https://ieeevr.org/2027/ | 2026 마감 + 2027 사이트 발표 |
| iros | https://iros2026.org/ | https://iros2027.org/ | 2026 마감 + 2027 사이트 발표 |

*conferences.json 업데이트: 위 4개 학회 website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: icsoc 2026 추가 + icra 수정 + infocom 2028 추가 후 `pnpm seed`*

---

## Phase 5 결과 (2026-05-15)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| isrr | - | - | 2028 | ❌ | - | - | - | 격년, 2026 paper 05-31, Malacca Malaysia |
| issre | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-24), Limassol Cyprus, AoE |
| issta | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Singapore (날짜 TBD) | paper 마감 (01-29), Oakland CA, AoE |
| iswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (05-02), paper 마감 (05-07), Bari Italy, AoE |
| itcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-06), Milan Italy, EDT |
| its | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-28), Paphos Cyprus, PT |
| iui | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Feb 8-11, Helsinki, Finland | 마감 (2025-10-10), deadline TBD |
| kdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2-cycle, paper 마감 (02-08), Jeju Korea, AoE |
| kr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-13), FLoC Lisbon 7/18~25(워크숍 포함), AoE |
| lctes | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-13), PLDI co-located Boulder, AoE |
| lics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-22), FLoC Lisbon, AoE |
| lrec | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 짝수년 개최, paper 마감 (2025-10-24), Mallorca Spain, AoE |
| mascots | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (05-17), Genova Italy, AoE |
| mass | - | - | 2026 | ❌ | - | - | Oct 21-23, Hong Kong | DB 미등록, 데드라인 미공개(Coming Soon) |
| mdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-06), Athens Greece, AoE |
| mfcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-24), Paris France, AoE |
| miccai | 2027 | ➕ 보완 | 2028 | ❌ | - | - | Sep 27-Oct 1, Auckland NZ | deadline TBD, 2026 마감 (02-26), Strasbourg, PT |
| micro | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-07), Athens Greece, EDT |
| middleware | 2026 | ✅ OK | 2027 | ❌ | - | - | - | C2 abs 05-29 ← 임박, paper 06-05, Tarragona Spain, AoE |
| mobicom | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2-round, paper 마감, Austin TX, AoE |
| mobihoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-20), Tokyo Japan, AoE |
| mobilehci | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Sep 20-23, Limassol, Cyprus | 마감 (01-29), Swansea UK, AoE |
| mobisys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-05), Cambridge UK, AoE |
| models | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-27), Malaga Spain, AoE |
| msr | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Dublin, Ireland (날짜 TBD) | 마감 (2025-10-23), ICSE co-located, AoE |
| msst | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | **paper 04-14** 보완 가능(마감), Santa Clara CA |
| naacl | - | - | 2026 | ❌ | - | - | - | ARR 기반, 2026 CFP 미발표, ACL 통합 가능성 |
| ndss | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | abs→삭제, paper 04-23→**05-06**(마감), conf 02-23→**03-22~26**, Seoul, AoE. Fall 08-19 |
| neurips | 2026 | ✅ OK | 2027 | ❌ | - | - | Europe (도시 미정) | abs 마감 (05-04), paper 마감 (05-06), Sydney, AoE |
| noms | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper final deadline 2025-11-10 공식 확인, Rome Italy |

**✅ 사이트만 발표 (4개):** issta 2027 (Singapore), iui 2027 (Helsinki), mobilehci 2027 (Limassol), msr 2027 (Dublin) — 데드라인 미발표
**⚠️ DB 수정 필요 (1개):** ndss (abs 삭제 + paper 04-23→05-06 + conf 02-23→03-22~26, Seoul)
**➕ 보완 (2개):** miccai (2027 deadline 추가 대기), msst (paper 04-14 보완)
**❌ 미발표 (22개):** isrr(격년→2028), issre, iswc, itcs, its, kdd, lctes, lics, lrec(짝수→2028), mascots, mass(Coming Soon), mdm, mfcs, micro, middleware, mobicom, mobihoc, mobisys, models, naacl, neurips, noms
**⏰ 임박 데드라인:** middleware C2 abs 05-29, isrr 05-31, ndss Fall 08-19

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| (없음) | - | - | 다음연도 CFP URL이 확인된 학회 없음 |

*deadlines.json 업데이트: ⚠️ kr, ndss 수정 + ➕ msst paper 보완 후 `pnpm seed`*

---

## Phase 6 결과 (2026-05-15)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| nossdav | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | conf 날짜 수정(단일 행사), paper 마감 (01-16), Hong Kong, AoE |
| nsdi | 2027 | ✅ OK | 2028 | ❌ | - | - | - | Spring 마감, Fall abs 09-10, paper 09-17, EDT |
| oopsla | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Round 1 마감 (2025-10-10), Round 2 마감 (03-17), Oakland CA, AoE |
| osdi | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Jul 7-9, Baltimore | 마감 (2025-12-11), Seattle, 17:59 EST |
| pact | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (04-23), paper 마감 (04-30), Chicago, AoE |
| pakdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-25), Hong Kong, PST |
| percom | 2026 | ✅ OK | 2027 | ✅ | 2026-09-04 | 2026-09-11 | Mar, Goa, India | 마감 (2025-10-03), Pisa, AoE |
| performance | - | - | 2026 | ✅ | - | 2026-05-15 ← 오늘! | Ghent, Belgium | DB 미등록 |
| pets | 2026 | ✅ OK | 2027 | ✅ | - | rolling | Calgary, AoE | Issue 1: 05-31, 4개 issue |
| pg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 06-01, paper 06-08, Singapore, AoE |
| pldi | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-13), Boulder CO, AoE |
| podc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-16), Egham England, AoE |
| pods | 2027 | ✅ OK | 2028 | ❌ | - | - | - | C1 abs 05-23 ← 임박, paper 05-30 ← 임박, **C2 abs 12-03 paper 12-10** 추가, Huntington Beach, AoE |
| popl | 2027 | ✅ OK | 2028 | ❌ | - | - | - | paper 07-09, Mexico City, AoE |
| ppopp | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Mar 27-31, Salt Lake City | 마감 (2025-09-01), Sydney, AoE |
| raid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-16), Lancaster UK, AoE |
| re | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-23), Montreal, AoE |
| recomb | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-20), Thessaloniki Greece, AoE |
| recsys | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Sep, Hawaii | 마감 (04-21), Minneapolis, AoE |
| rss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-30), Sydney, AoE |
| rtas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-13), Saint-Malo France, AoE |
| rtss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-21 ← 임박, paper 05-26 ← 임박, Yokohama Japan, AoE |
| sac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 마감 (2025-10-17), Thessaloniki Greece, EDT |
| saner | 2027 | ➕ 보완 | 2028 | ❌ | - | - | Mar 9-12, Richmond VA | **abs 09-21, paper 09-25** 보완 가능 |
| sas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (05-01), artifact 05-08, Oakland CA, AoE |
| sc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-08), Chicago, AoE |
| sca | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | deadline time **21:59→23:59 UTC**, paper 마감 (04-17), Barcelona |
| sdm | - | - | 2026 | ✅ | 04-10(마감) | 04-17(마감) | Nov 19-20, Salt Lake City | DB 미등록, AoE |
| sec | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | Sweden (도시 TBD) | paper **03-13 vs 03-03** 불일치 확인 필요, Perth Australia |
| secon | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-30), Pisa Italy, AoE |

**✅ 추가 대상 (3개):** percom 2027 (abs 09-04, paper 09-11, Goa), performance 2026 (paper 05-15 오늘!, Ghent), sdm 2026 (마감, DB 미등록)
**✅ 사이트만 발표 (4개):** osdi 2027 (Baltimore), ppopp 2027 (Salt Lake City), recsys 2027 (Hawaii), pets 2027 (rolling) — 데드라인 미발표
**⚠️ DB 수정 필요 (3개):** nossdav (conf 날짜), sca (deadline time 21:59→23:59 UTC), sec (paper 03-13→03-03)
**➕ 보완 (2개):** saner (abs/paper 추가), pods (C2 추가)
**❌ 미발표 (16개):** pact, pakdd, pg, pldi, podc, popl(2028), raid, re, recomb, rss, rtas, rtss, sac, sc, secon + nsdi(2028)
**⏰ 임박 데드라인:** performance paper 05-15(오늘!), rtss abs 05-21 / paper 05-26, pods C1 abs 05-23 / paper 05-30, pets Issue 1: 05-31, pg abs 06-01 / paper 06-08

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| percom | https://percom.org/ | (2027 CFP URL 확인 필요) | 2026 마감 + 2027 CFP 발표 |
| osdi | https://www.usenix.org/conference/osdi26/call-for-papers | (2027 URL 확인 필요) | 2026 마감 + 2027 사이트 발표 |

*deadlines.json 업데이트: performance/sdm 신규 추가 + ⚠️ 수정 항목 반영 + ➕ saner/pods 보완 후 `pnpm seed`*

---

## Phase 7 결과 (2026-05-15)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| sensys | 2027 | ➕ 보완 | 2028 | ❌ | - | - | New York (CPS-IoT Week) | R1 abs 05-29 ← 임박, paper 06-05, conf dates 보완 필요, AoE |
| sgp | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 2-round, R2 마감 (04-15), Jul 1-3 Bern, **UTC** |
| sigcomm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-06), Denver CO, AoE |
| siggraph | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Aug 8-12, Anaheim CA | paper 마감 (01-22), LA, 22:00 UTC |
| siggraph-asia | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (05-05), paper 마감 (05-12), KL Malaysia, AoE |
| sigir | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-22), Melbourne, 12:00 UTC |
| sigmetrics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 3-round 전체 마감, Ann Arbor MI, AoE |
| sigmod | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 4-round, R3 abs 07-10, paper 07-17, Huntington Beach CA, AoE |
| socc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | R1 마감, R2 reg 07-07 / paper 07-14 (이미 DB 반영), Singapore, PST |
| socg | 2026 | ✅ OK | 2027 | ❌ | - | - | Bangalore, India (날짜 TBD) | paper 마감 (2025-12-02), Rutgers NJ, AoE |
| soda | 2027 | ✅ OK | 2028 | ❌ | - | - | - | paper 07-09, Philadelphia, AoE |
| sosp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-01), Prague, AoE |
| soups | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | registration **02-13** 추가, paper 02-19→**02-20**, Hannover, PST |
| sp | 2026 | ✅ OK | 2027 | ✅ | 2026-06-04 (C1) | 2026-06-11 (C1) | Montreal (날짜 TBD) | 마감, SF. C2 abs 11-10, paper 11-17, AoE |
| spaa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-27), London UK, AoE |
| srds | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (05-01), Rome, AoE |
| stacs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-25), Grenoble, AoE |
| stoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-04), Salt Lake City, 16:59 EST |
| tacas | 2026 | ✅ OK | 2027 | ✅ | - | 2026-10-15 | Apr 12-15, Copenhagen (ETAPS) | AoE. artifact 10-29 |
| tcc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 05-19 ← 임박, Nov 10-13 New York, AoE |
| uai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-25), Amsterdam, AoE |
| ubicomp | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | IMWUT rolling (02-01, 05-01 마감, **11-01**), Oct 13-15 Shanghai, AoE |
| uist | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-31), Detroit, AoE |
| usenix-security | 2027 | ✅ OK | 2028 | ❌ | - | - | - | C1 abs 08-18, paper 08-25, Denver, AoE. 2-cycle |
| vldb | 2027 | ✅ OK | 2028 | ❌ | - | - | - | rolling monthly (다음: 06-01), Athens, 17:00 PT |
| vrst | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abs 06-08→**06-17**, paper 06-15→**06-24**, Sendai Japan, AoE |
| wacv | 2026 | ✅ OK | 2027 | ✅ | 2026-06-19 (R1) | 2026-06-26 (R1) | Jan 5-9, 장소 재확인 필요 | 재검증 정정: Disney Springs는 공식 CFP에서 재확인 못함 |
| wsdm | 2026 | ✅ OK | 2027 | ✅ | 2026-08-17 | 2026-08-24 | Feb 15-19, Hong Kong | 마감 (2025-08-14), AoE |
| www | 2026 | ✅ OK | 2027 | ❌ | - | - | Dublin, Ireland (날짜 TBD) | 마감 (2025-10-07), Dubai, AoE |

**✅ 추가 대상 (4개):** sp 2027 C1 (abs 06-04, paper 06-11, Montreal), tacas 2027 (paper 10-15, Copenhagen), wacv 2027 R1 (재검증 정정: abs 06-19, paper 06-26, 장소 재확인 필요), wsdm 2027 (abs 08-17, paper 08-24, Hong Kong)
**✅ 사이트만 발표 (1개):** siggraph 2027 (Anaheim Aug 8-12) — 데드라인 미발표
**⚠️ DB 수정 필요 (4개):** sgp (timezone AoE→UTC), soups (registration 02-13 + paper 02-19→02-20), ubicomp (R3 08-01은 resubmission only, 제거 필요), vrst (abs 06-08→06-17, paper 06-15→06-24)
**➕ 보완 (1개):** sensys (conf dates 보완)
**❌ 미발표 (16개):** sigcomm, siggraph-asia, sigmetrics, sigmod(2028), socg, soda(2028), sosp, spaa, stacs, stoc, tcc, uai, uist, usenix-security(2028), www + vldb(2028)
**⏰ 임박 데드라인:** tcc paper 05-19, sensys R1 abs 05-29 / paper 06-05, sp 2027 C1 abs 06-04 / paper 06-11, vrst abs 06-17 / paper 06-24, wacv R1 abs 06-18 / paper 06-25, sigmod R3 07-10/17, socc R2 07-07/14

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| sp | https://sp2026.ieee-security.org | https://sp2027.ieee-security.org/ | 2026 마감 + 2027 CFP 발표 |
| wacv | https://wacv.thecvf.com/Conferences/2026/CallForPapers | (2027 CFP URL 확인 필요) | 2026 마감 + 2027 CFP 발표 |
| wsdm | https://wsdm-conference.org/2026/index.php/call-for-papers/ | https://wsdm-conference.org/2027/ | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: sp, wsdm website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: ⚠️ 수정 항목 반영 + ✅ sp/tacas/wacv/wsdm 추가 후 `pnpm seed`*

---
