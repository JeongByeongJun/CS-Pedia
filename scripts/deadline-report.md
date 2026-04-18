# Deadline Check Report
<!-- /deadline-check 스킬 자동 관리 -->

---

## Phase 1 결과 (2026-04-18)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| 3dv | 2026 | ✅ OK | 2027 | ❌ | - | - | Apr, Thessaloniki, Greece | timezone PT, 2027 CFP 미발표 |
| aaai | 2027 | ✅ OK | 2028 | ❌ | - | - | - | timezone UTC, 2028 미발표 |
| aacl | 2025 | ➕ 보완 | 2026 | ✅ | 2026-05-25 (마감) | 2026-05-25 (마감) | Nov 6-10, Hengqin, China | ARR 기반, abstract=paper 동일 |
| aamas | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | May 16-21, Toronto, Canada | DB abstract=10-01→01-19, paper=10-08→01-26 |
| accv | 2026 | ✅ OK | - | ❌ | - | - | - | 짝수년 주기, 2027 없음 (다음 2028) |
| acl | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ARR 시스템, 2027 미발표 |
| acml | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | DB 데드라인 누락: journal=05-30, conf=06-26 |
| acsac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abstract 없음 (single stage) |
| aistats | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| ase | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| asiaccs | 2026 | ✅ OK | 2027 | ✅ | - | 2026-08-21 | Jul 12-16, Macau, China | 2라운드: R1=08-21, R2=12-11 |
| asiacrypt | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone UTC, 2027 미발표 |
| asplos | 2027 | ✅ OK | 2028 | ❌ | - | - | - | cycle1 검증 완료, 2028 미발표 |
| assets | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 04-22 ← 임박 |
| atc | 2026 | ✅ OK | 2027 | ✅ | - | TBD | Jul, France | SIGOPS 인수 (USENIX 폐지 아님), 2027 개최 확정 |
| avss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 04-20 ← 임박 |
| bibm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone EST (17:00) |
| bigdata | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| bmvc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| case | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-15) |
| cases | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-30) |
| cav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abstract 없음 (single stage) |
| cc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 학회 종료 (01-31~02-01) |
| ccc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-06) |
| ccgrid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-21) |
| ccs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Cycle B: abs 04-22, paper 04-29 ← 임박 |
| cgo | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 학회 종료 (01-31~02-04) |
| chi | 2026 | ✅ OK | 2027 | ❌ | - | - | May 10-14, Pittsburgh, USA | CFP 미발표 |
| cikm | 2026 | ✅ OK | 2027 | ❌ | - | - | Oct 25-29, Sydney, Australia | CFP 미발표 |
| cloud | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | primary=03-08, DB에 extended(03-22)만 기록 |

**✅ 추가 대상 (2개):** aacl (2026, ARR), asiaccs (2027, Macau)
**⚠️ DB 수정 필요 (2개):** aamas (abstract/paper 날짜 오류), cloud (primary deadline 누락)
**➕ 보완 (2개):** aacl (2025 abstract 누락), acml (deadline 전체 누락)
**❌ 미발표 (24개):** aaai, accv, acl, acsac, aistats, ase, asiacrypt, asplos, assets, avss, bibm, bigdata, bmvc, case, cases, cav, cc, ccc, ccgrid, ccs, cgo, chi, cikm, cloud
**⚠️ ATC 상태 업데이트:** USENIX 폐지가 아닌 SIGOPS 인수로 2026/2027 계속 개최

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| asiaccs | https://asiaccs2026.cse.iitkgp.ac.in/ | https://asiaccs2027.cityu.edu.mo/ | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: asiaccs website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 2 결과 (2026-04-18)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| cluster | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 04-23, paper 04-30 ← 임박 |
| codes-isss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-30) |
| cogsci | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | Bilbao, Spain | DB paper=04-10 → 실제 02-02? 요검증 |
| coling | - | - | 2027 | ❌ | - | - | Macau | 격년제, 2026 없음, 2027 CFP 미발표 |
| colt | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-04) |
| concur | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 04-20, paper 04-27 ← 임박 |
| conext | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-29, paper 06-05 |
| conll | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-19) |
| corl | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | timezone UTC (not AoE) |
| crypto | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone PST, paper 마감 (02-12) |
| cscw | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027부터 rolling review 전환 |
| cseet | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | abstract=02-20 DB 누락 |
| csf | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 3-cycle rolling (S/F/W) |
| cvpr | 2026 | ✅ OK | 2027 | ❌ | - | - | Jun 19-26 (장소 TBD) | CFP 미발표 |
| dac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone PST (17:00) |
| dasfaa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-27) |
| date | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-14) |
| dis | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-19) |
| disc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-27, paper 06-01 |
| dsn | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-04) |
| eacl | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | commitment deadline=12-14 (DB: 10-06 다른 의미?) |
| ecai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | IJCAI-ECAI 공동, paper 마감 (01-19) |
| eccv | 2026 | ✅ OK | - | ❌ | - | - | - | 짝수년 주기, timezone CET, 다음 2028 |
| ecml-pkdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-12) |
| ecoop | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-12) |
| ecrts | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-26) |
| edbt | 2027 | ✅ OK | 2028 | ❌ | - | - | - | cycle2 paper 06-11 |
| egsr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-15) |
| emnlp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ARR, paper 05-25 |
| emsoft | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-30) |

**✅ 추가 대상 (0개):** 없음
**⚠️ DB 수정 필요 (3개):** cogsci (paper deadline 날짜 요검증), corl (timezone UTC), eacl (commitment deadline 해석)
**➕ 보완 (1개):** cseet (abstract=02-20 추가)
**❌ 미발표 (30개):** 전체 (2027/2028 CFP 없음)

### 🔗 website_url 업데이트 대상

없음 (다음 연도 CFP URL 발견된 학회 없음)

*deadlines.json 업데이트: ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 3 결과 (2026-04-18)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| er | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-05, paper 05-12, AoE |
| esa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 04-21 ← 임박, paper 04-23 ← 임박, AoE |
| esem | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-11, paper 05-18, AoE |
| esop | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | Round 1 (06-03) 누락, DB는 Round 2 (10-16)만 기록 |
| esorics | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | Winter cycle (01-09) 누락, DB는 Spring (04-21)만 기록 ← 임박 |
| eurocrypt | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract deadline 누락, paper 마감 (10-02) |
| eurographics | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027 Pisa, Italy (날짜 미정) | timezone UTC, paper 마감 (09-26) |
| eurosys | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | spring abs=05-07, paper=05-14 (DB: fall 09-17/09-24와 다름) |
| fase | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract=10-16 DB 누락, conf start 04-13→04-11 |
| fast | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | paper 09-15→09-16 (1일), venue Renton→Santa Clara, tz PDT |
| fc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 09-20→09-21 (1일), timezone AoE→EDT |
| fg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | R2 paper 마감 (01-25) |
| focs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-01), tz EDT |
| fse | 2027 | ✅ OK | 2028 | ❌ | - | - | Jul 12-16, Shenzhen | paper 10-09, AoE |
| gecco | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-26), AoE |
| hipc | - | ➕ 보완 | 2027 | ❌ | - | - | Dec 16-19, 2026 | DB 데이터 없음, paper 04-06 (마감) |
| hipeac | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | abstract deadline 누락, paper 마감 (06-01) |
| hpca | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | timezone UTC→EDT (19:59 EDT), paper 마감 (08-01) |
| hpdc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 01-29→02-05 (날짜 오류), AoE |
| hri | 2026 | ✅ OK | 2027 | ✅ | N/A | N/A | Mar 8-12, Santa Clara | CFP URL 있음, deadline 미공시 |
| i3d | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-09), tz PST |
| icalp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-06), AoE |
| icaps | 2026 | ✅ OK | 2027 | ✅ | N/A | N/A | Columbia, SC, USA | CFP URL 있음, deadline 미공시 |
| iccad | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 04-14 (마감), AoE |
| iccd | - | ➕ 보완 | 2027 | ❌ | - | - | - | DB 데이터 없음, 웹사이트 접근 제한 |
| iccv | 2025 | ✅ OK | 2027 | ❌ | - | - | - | 홀수년 주기, 2027 CFP 미발표, tz HST |
| icdcs | 2026 | ➕ 보완 | 2027 | ❌ | - | - | Jun 22-25, Seoul | timezone 미확인 |
| icde | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | May 17-21, Copenhagen | paper 06-11→11-11 (DB 날짜 오류) |
| icdm | 2026 | ➕ 보완 | 2027 | ❌ | - | - | Nov 12-15, Shenyang | 메인 deadline 재확인 필요 |
| icfp | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | conf start 08-24→08-23, paper 마감 (02-19), AoE |

**✅ 추가 대상 (0개):** 없음 (HRI/ICAPS 2027은 deadline 미공시)
**⚠️ DB 수정 필요 (10개):** esop (R1 누락), esorics (Winter 누락), eurocrypt (abstract 누락), eurosys (spring deadline), fase (abstract+conf date), fast (paper+venue), fc (paper+tz), hpca (tz), hpdc (abstract 날짜), icde (paper 날짜), icfp (conf start)
**➕ 보완 (5개):** hipc (전체 누락), hipeac (abstract 누락), iccd (전체 누락), icdcs (tz 확인), icdm (deadline 재확인)
**❌ 미발표 (28개):** er, esa, esem, esop, esorics, eurocrypt, eurographics, eurosys, fase, fast, fc, fg, focs, fse, gecco, hipc, hipeac, hpca, hpdc, i3d, icalp, iccad, iccd, iccv, icdcs, icde, icdm, icfp

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| hri | https://humanrobotinteraction.org/2026/ | https://humanrobotinteraction.org/2027/ | 2026 마감 + 2027 사이트 발표 |
| icaps | https://icaps26.icaps-conference.org/calls/cfp/ | https://icaps27.icaps-conference.org/ | 2026 마감 + 2027 사이트 발표 |

*conferences.json 업데이트: hri, icaps website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 4 결과 (2026-04-18)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| icip | 2026 | ✅ OK | 2027 | ✅ | TBA | TBA | Nov 29-Dec 3, Singapore | paper 마감 (02-04), AoE |
| iclp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-07), AoE. FLoC 2026 연계 |
| iclr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-24), AoE |
| icml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-28), AoE. 2027 South America |
| icmr | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | paper 02-06→02-13, abstract 02-13 추가, AoE |
| icnp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-15, paper 05-22, AoE |
| icpp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 04-24 ← 임박, paper 05-01 ← 임박, AoE |
| icpr | 2026 | ✅ OK | 2028 | ❌ | - | - | - | paper 마감 (01-10), 2년 주기(다음 2028), AoE |
| icra | 2026 | ✅ OK | 2027 | ❌ | - | - | 2027 Seoul, May 24-28 | paper 마감 (2025-09-16), PDT |
| ics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-09), AoE |
| icse | 2027 | ✅ OK | 2028 | ❌ | - | - | Hawaii (날짜 TBD) | abs 06-23, paper 06-30, AoE |
| icsme | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-06), AoE |
| icsoc | - | ➕ 보완 | 2026 | ✅ | 2026-07-05 | 2026-07-12 | Dec 1-4, Lodz, Poland | DB 데이터 없음, 신규 추가 필요, AoE |
| icst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-22), AoE |
| icws | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-22), AoE |
| ieee-vis | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-31), AoE |
| ieee-vr | 2027 | ➕ 보완 | 2028 | ❌ | - | - | Feb 27-Mar 3, Melbourne | 2027 데드라인 미발표 |
| iiswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-14, paper 05-21, AoE |
| ijcai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-19), AoE |
| ijcar | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-13), AoE. FLoC 3년 주기→2029 |
| imc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 04-22 ← 임박, paper 04-29 ← 임박, AoE |
| infocom | 2027 | ✅ OK | 2028 | ❌ | - | - | - | abs 07-17, paper 07-24, AoE |
| interact | 2027 | ➕ 보완 | 2028 | ❌ | - | - | Aug 23-27, Tallinn | full paper 02-01 발견, DB에 추가 필요 |
| ipdps | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-09), AoE |
| iros | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-02), AoE |
| isaac | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 06-26, AoE |
| isca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-17), AoE |
| ismar | 2026 | ✅ OK | 2027 | ❌ | - | - | Jul 4-8, Lyon, France | paper 마감 (03-16), AoE. 2027 위치 확정 |
| ismb | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 04-09 DB 누락 (마감), paper 마감 (01-20), AoE |
| ispass | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-15), EST |

**✅ 추가 대상 (1개):** icsoc (2026 신규 — abs 07-05, paper 07-12, conf 12-01~04, Lodz, Poland)
**⚠️ DB 수정 필요 (2개):** icmr (paper 02-06→02-13, abstract 02-13 추가), ismb (abstract 04-09 추가)
**➕ 보완 (2개):** ieee-vr (2027 데드라인 미발표), interact (2027 paper 02-01)
**❌ 미발표 (27개):** iclp, iclr, icml, icnp, icpp, icpr, icra, ics, icse, icsme, icst, icws, ieee-vis, iiswc, ijcai, ijcar, imc, infocom, ipdps, iros, isaac, isca, ismar, ispass + ieee-vr/interact (데드라인만 미발표)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| icip | https://2026.ieeeicip.org/ | https://2027.ieeeicip.org/ | 2026 마감 + 2027 사이트 발표 |

*conferences.json 업데이트: icip website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 5 결과 (2026-04-19)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| isrr | 2026 | ✅ OK | - | ❌ | - | - | - | 격년 주기, 2027 없음 (다음 2028) |
| issre | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB paper 04-17→04-24 연장, ← 임박 |
| issta | 2026 | ✅ OK | 2027 | ❌ | - | - | Singapore (예정) | paper 마감 (01-29), 2027 미발표 |
| iswc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abstract 05-02, paper 05-07 |
| itcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone EDT, paper 마감 (09-06) |
| its | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-28), Pafos, Cyprus |
| iui | 2026 | ✅ OK | 2027 | ❌ | - | - | Feb 8-11, Helsinki, Finland | paper 마감 (10-10), 2027 위치만 확정 |
| kdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2 cycles, paper 마감, Jeju 2026 |
| kr | 2026 | ⚠️ 수정 | - | ❌ | - | - | - | 격년 주기, conf_start 07-18→07-20 (18-19 워크숍) |
| lctes | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-13), PLDI co-located |
| lics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-22) |
| lrec | 2026 | ✅ OK | - | ❌ | - | - | - | 격년 주기, 2027 없음 (다음 2028) |
| mascots | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 05-17 |
| mass | - | - | 2026 | ✅ | - | 2026-05-03 | Sep, Guanajuato, Mexico | DB 미등록, 신규 추가 대상 |
| mdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-06) |
| mfcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 04-24 ← 임박, Paris 2026 |
| miccai | 2027 | ⚠️ 수정 | 2027 | ❌ | - | - | Sep 27-Oct 1, Auckland, NZ | DB 연도 2027→2026 수정, deadlines 누락, 2027 Auckland 확정 CFP 미발표 |
| micro | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone EDT, paper 마감 (04-07) |
| middleware | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | conf 11-30~12-04→12-14~12-18, venue Tarragona Spain, winter cycle 누락 |
| mobicom | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2 cycles, paper 마감, 2027 위치 선정중 |
| mobihoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 04-20 ← 임박 |
| mobilehci | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-29) |
| mobisys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (12-05), Cambridge 2026 |
| models | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-27), Málaga 2026 |
| msr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (10-23), ICSE co-located |
| msst | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | DB에 데드라인 누락, 공식 사이트에서도 미확인 |
| naacl | - | - | 2026 | ❌ | - | - | - | DB 미등록, ARR 시스템 사용 |
| ndss | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2 cycles (C1 abs 04-16 paper 04-23 ← 임박), 2028 미발표 |
| neurips | 2026 | ✅ OK | 2027 | ❌ | - | - | Europe (위치 미정) | abstract 05-04, paper 05-06 |
| noms | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (10-13) |

**✅ 추가 대상 (1개):** mass (2026 신규 — paper 05-03, Sep Guanajuato Mexico)
**⚠️ DB 수정 필요 (4개):** issre (paper 04-17→04-24 연장), kr (conf_start 07-18→07-20), miccai (DB 연도 2027→2026 수정 + deadlines 누락), middleware (conf 11-30~12-04→12-14~12-18 + venue Tarragona)
**➕ 보완 (1개):** msst (데드라인 정보 누락)
**❌ 미발표 (24개):** isrr(격년), issta, iswc, itcs, its, iui, kdd, lctes, lics, lrec(격년), mascots, mdm, mfcs, micro, mobicom, mobihoc, mobilehci, mobisys, models, msr, naacl(ARR), neurips, noms + kr(격년)

### 🔗 website_url 업데이트 대상

해당 없음 — 2027 CFP가 발표된 학회 없음

*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 6 결과 (2026-04-19)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| nossdav | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-16), AoE |
| nsdi | 2027 | ✅ OK | 2028 | ❌ | - | - | - | abs 04-16 (마감), paper 04-23 ← 임박, EDT |
| oopsla | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2 rounds, R1 마감 (10-10), R2 마감 (03-17), AoE |
| osdi | 2026 | ✅ OK | - | ❌ | - | - | - | 격년 주기 (짝수년), 2027 없음, EST |
| pact | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | 연장: abs 04-17→04-23 ← 임박, paper 04-24→04-30 ← 임박 |
| pakdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-25), PST |
| percom | 2026 | ✅ OK | 2027 | ✅ | N/A | N/A | Goa, India | 2026 마감 (10-03), 2027 위치 확정 CFP 미발표 |
| performance | - | - | - | ❌ | - | - | - | DB 데이터 없음, 2025 Amsterdam 완료, 2026 미발표 |
| pets | 2026 | ✅ OK | 2027 | ❌ | - | - | Jul 20-25, Calgary | rolling (4 issues), paper 마감 (02-28 Issue 4), AoE |
| pg | 2026 | ✅ OK | 2027 | ❌ | - | - | Oct 6-9, Singapore | abs 06-01, paper 06-08, AoE |
| pldi | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-13), AoE |
| podc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-16), AoE |
| pods | 2027 | ✅ OK | 2028 | ❌ | - | - | - | abs 12-03, paper 12-10, AoE |
| popl | 2027 | ✅ OK | 2028 | ❌ | - | - | - | paper 07-09, AoE |
| ppopp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abstract 없음 (single stage), paper 마감 (2025-09-01), AoE |
| raid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (04-16), AoE |
| re | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (02-16), paper 마감 (02-23), AoE |
| recomb | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-20), AoE |
| recsys | 2026 | ✅ OK | 2027 | ✅ | N/A | N/A | Hawaii | abs 04-14 (마감), paper 04-21 ← 임박, 2027 위치만 확정 |
| rss | 2026 | ✅ OK | 2027 | ✅ | N/A | N/A | Jul 13-17, Sydney | paper 마감 (01-30), 2027 비공식 정보 |
| rtas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-11-13), AoE |
| rtss | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 05-21 발견 (DB 누락), paper 05-21→05-26? 요확인 |
| sac | 2026 | ✅ OK | 2027 | ✅ | N/A | 2026-09-10 | Apr 5-9, Gwangju, Korea | 2026 마감 (10-17), 2027 한국 개최! |
| saner | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | CFP 미발표 ("No calls yet"), 데드라인 없음 |
| sas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 05-01 ← 임박, AoE |
| sc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (04-01), paper 마감 (04-08), AoE |
| sca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 마감 (04-10), paper 마감 (04-17), UTC |
| sdm | - | ➕ 보완 | - | ❌ | - | - | Nov 19-20, Salt Lake City | DB 미등록, abs 04-10 paper 04-17 (마감) |
| sec | 2026 | ✅ OK | 2027 | ❌ | - | - | Sweden (위치 확정) | paper 마감 (03-13), abstract 없음, AoE |
| secon | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB paper=03-06은 notification, 실제 paper 2025-12-30 |

**✅ 추가 대상 (1개):** sac (2027 — paper 09-10, Apr 5-9 Gwangju Korea)
**⚠️ DB 수정 필요 (3개):** pact (abs/paper 연장), rtss (abstract 추가 + paper 날짜 확인), secon (paper deadline 수정 2025-12-30)
**➕ 보완 (2개):** saner (CFP 미발표), sdm (DB 미등록, 2026 데이터 발견)
**❌ 미발표 (24개):** nossdav, nsdi, oopsla, osdi(격년), pakdd, performance, pets, pg, pldi, podc, pods, popl, ppopp, raid, re, recomb, rtas, rtss, sas, sc, sca, sec, secon + percom/recsys/rss(위치만 확정)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| percom | https://percom.org/PerCom2026/ | https://percom.org/percom-2027-in-goa-india/ | 2026 마감 + 2027 사이트 발표 |

*conferences.json 업데이트: percom website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---

## Phase 7 결과 (2026-04-19)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| sensys | 2026 | ⚠️ 수정 | 2027 | ✅ | 2026-05-29 | 2026-06-05 | Sep, TBD | 2027 R1 발견, 2026 paper 마감 (2025-11-13) |
| sgp | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | R2 abstract 04-13 DB 누락, paper 마감 (04-15) |
| sigcomm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-06) |
| siggraph | 2026 | ✅ OK | 2027 | ❌ | - | - | - | timezone UTC, paper 마감 (01-22) |
| siggraph-asia | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 05-05, paper 05-12 |
| sigir | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (01-22) |
| sigmetrics | 2026 | ✅ OK | 2027 | ❌ | - | - | Atlanta | paper 마감 (01-13), 2027 위치만 확정 |
| sigmod | 2027 | ✅ OK | 2028 | ❌ | - | - | - | abs 07-10, paper 07-17 |
| socc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-13) |
| socg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-12-02) |
| soda | 2027 | ✅ OK | 2028 | ❌ | - | - | - | paper 07-09 |
| sosp | 2026 | ⚠️ 수정 | - | ❌ | - | - | - | 격년(다음 2028), conf_start 09-29→09-30? |
| soups | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-19) |
| sp | 2026 | ➕ 보완 | 2027 | ✅ | N/A | N/A | TBD | rolling 4 cycles, DB는 C1만, sp2027 사이트 존재 |
| spaa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (02-27) |
| srds | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 04-24 ← 임박, paper 05-01 ← 임박 |
| stacs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-09-25) |
| stoc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | deadline 4:59pm EST (not 23:59), paper 마감 (2025-11-04) |
| tacas | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-16) |
| tcc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 05-19 |
| uai | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | conf_start 08-18→08-17, paper 마감 (02-25) |
| ubicomp | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | rolling (Feb/May/Nov), DB는 R2 Feb만 |
| uist | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (03-31) |
| usenix-security | 2027 | ✅ OK | 2028 | ❌ | - | - | - | C1 abs 08-18, paper 08-25 |
| vldb | 2027 | ✅ OK | 2028 | ❌ | - | - | - | rolling monthly, timezone PDT |
| vrst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | abs 06-08, paper 06-15 |
| wacv | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-07-18) |
| wsdm | 2026 | ✅ OK | 2027 | ✅ | N/A | N/A | Asia/Oceania | paper 마감 (2025-08-14), 2027 호스트 공모 단계 |
| www | 2026 | ✅ OK | 2027 | ❌ | - | - | - | paper 마감 (2025-10-07) |

**✅ 추가 대상 (1개):** sensys (2027 R1 — abs 05-29, paper 06-05)
**⚠️ DB 수정 필요 (3개):** sosp (conf_start 09-29→09-30?), stoc (deadline time 4:59pm EST), uai (conf_start 08-18→08-17)
**➕ 보완 (3개):** sgp (R2 abstract 누락), sp (rolling cycles DB 미반영), ubicomp (rolling cycles 보완)
**❌ 미발표 (25개):** sgp, sigcomm, siggraph, siggraph-asia, sigir, sigmetrics, sigmod, socc, socg, soda, spaa, srds, stacs, stoc, tacas, tcc, uist, usenix-security, vldb, vrst, wacv, www + sosp(격년), sigmetrics/wsdm(위치만 확정)

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| sensys | https://sensys.acm.org/2026/ | https://sensys.acm.org/2027/cfp.html | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: sensys website_url 교체 후 `pnpm seed`*
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `pnpm seed`*

---
