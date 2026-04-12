# Deadline Check Report
<!-- /deadline-check 스킬 자동 관리 -->

---

## Phase 7 결과 (2026-04-12)

**대상**: sensys, sgp, sigcomm, siggraph, siggraph-asia, sigir, sigmetrics, sigmod, socc, socg, soda, sosp, soups, sp, spaa, srds, stacs, stoc, tacas, tcc, uai, ubicomp, uist, usenix-security, vldb, vrst, wacv, wsdm, www (29개)

### 개별 결과

| # | 학회 | 상태 | 비고 |
|---|------|------|------|
| 1 | sensys | ⚠️ 수정 | 학회명 변경 (SenSys+IPSN+IoTDI 통합), 2라운드 구조 반영 |
| 2 | sgp | ⚠️ 수정 | Round 2 abstractDeadline 2026-04-13 추가 필요 |
| 3 | sigcomm | ✅ OK | |
| 4 | siggraph | ✅ OK | **2027 발견**: Anaheim, 2027-08-08~12, deadline 미발표 |
| 5 | siggraph-asia | ✅ OK | |
| 6 | sigir | ✅ OK | |
| 7 | sigmetrics | ✅ OK | |
| 8 | sigmod | ✅ OK | 2027 이미 DB에 존재, 검증 완료 |
| 9 | socc | ✅ OK | |
| 10 | socg | ✅ OK | **2027 venue 발견**: IISc Bengaluru |
| 11 | soda | ✅ OK | 2027 이미 DB에 존재 |
| 12 | sosp | ✅ OK | |
| 13 | soups | ⚠️ 수정 | abstractDeadline 2026-02-12 추가 권장 (mandatory paper registration) |
| 14 | sp | ✅ OK | AoE/EDT timezone 변환 검증 완료 |
| 15 | spaa | ✅ OK | |
| 16 | srds | ✅ OK | |
| 17 | stacs | ✅ OK | |
| 18 | stoc | ✅ OK | |
| 19 | tacas | ✅ OK | **2027 발견**: ETAPS Copenhagen, 2027-04-10~15 |
| 20 | tcc | ✅ OK | |
| 21 | uai | ⚠️ 수정 | conf dates 튜토리얼 포함 여부 minor 수정 |
| 22 | ubicomp | ✅ OK | R3 Aug 1은 resubmit-only 확인 |
| 23 | uist | ✅ OK | |
| 24 | usenix-security | ✅ OK | **2027 발견**: Denver, 2027-08-11~13, cycle1 abs=2026-08-18 paper=2026-08-25, cycle2 abs=2027-01-19 paper=2027-01-26 |
| 25 | vldb | ✅ OK | **2027 발견**: Athens, 2027-08-23~27, rolling monthly |
| 26 | vrst | ✅ OK | |
| 27 | wacv | ✅ OK | |
| 28 | wsdm | ✅ OK | |
| 29 | www | ✅ OK | **2027 발견**: Dublin, Ireland, dates TBA |

### 요약

**✅ OK (22개):** sigcomm, siggraph, siggraph-asia, sigir, sigmetrics, sigmod, socc, socg, soda, sosp, sp, spaa, srds, stacs, stoc, tacas, tcc, ubicomp, uist, vrst, wacv, wsdm

**⚠️ DB 수정 필요 (4개):** sensys (학회명 변경), sgp (abstract deadline 추가), soups (abstract deadline 추가), uai (conf dates minor)

**🔮 2027 데이터 발견 (6개):** siggraph (Anaheim), tacas/ETAPS (Copenhagen), usenix-security (Denver, 2 cycles), vldb (Athens, rolling), www (Dublin), socg (Bengaluru venue only)

**❌ 미발표:** 없음 (Phase 7 전체 DB 데이터 존재)

*Phase 7 학회는 개별 JSON 파일(public/data/conferences/[slug].json)에서 직접 관리*

---

## 전체 완료 요약 (Phase 1~7)

- **총 대상**: 209개 학회
- **진행 기간**: 2026-04-06 ~ 2026-04-12
- 전체 학회 데드라인 검증 완료

### DB 수정 적용 내역 (2026-04-12 검증 후 반영)

haiku 모델로 2차 검증 후 CONFIRMED 항목만 반영함.

**deadlines.json 수정 (17개):**
| 학회 | 변경 내용 |
|------|----------|
| ACCV | timezone → GMT |
| ACSAC | paper 05-30 → 05-26 |
| Asiacrypt | conf 12-07~11, deadline 11:59 UTC |
| ASPLOS 2027 | conf 04-11~15 Crete |
| AVSS | conf end 09-03 |
| CCGrid | abstract 12-21 추가 |
| Cloud | paper 03-22 |
| CoRL | deadline 11:59 UTC |
| ESEM | abstract 04-22 |
| ESORICS | winter round 01-09 추가 |
| FG | Round 2 abs=01-09, paper=01-15 추가 |
| ICWS | paper 03-22 |
| IROS | timezone → AoE |
| ISPASS | abs 12-08, paper 12-15, timezone → EST |
| IUI | notification 12-12 추가 |
| KDD C2 | notification 05-16 추가 |
| KR | notification 04-13 |

**개별 JSON 수정 (9개):**
| 학회 | 변경 내용 |
|------|----------|
| NOSSDAV | confDate → 04-08 |
| OSDI | abstract → T22:59:00Z |
| PerCom | notification → 12-22 |
| SAC | timezone → EDT |
| SAS | conf Oct 6-8 |
| SenSys | 학회명 변경 (IoT/CPS 통합) |
| SGP | abstract 04-13 추가 |
| SOUPS | abstract 02-12 추가 |
| UAI | confStart → 08-17 (tutorials) |

**2027 신규 추가 (10개):**
AsiaCCS (Macau), CogSci (SF), CVPR (Seattle), EMNLP (Toronto), SDM 2026 (Salt Lake City), ICIP (Singapore), ICRA (Seoul), MICCAI (Auckland), ISMB (Copenhagen), SIGGRAPH (Anaheim)

**REJECT (미반영, 12개):**
DASFAA, ICDE, HiPC, ICMR, INFOCOM, ISSRE, MobiCom, MobiHoc, NOMS, OOPSLA, RTSS, SECON

---
