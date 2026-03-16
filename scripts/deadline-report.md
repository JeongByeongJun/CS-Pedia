# Deadline Check Report
<!-- /deadline-check 스킬 자동 관리 -->

---

## Phase 1 결과 (2026-03-16)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| 3dv | 2026 | - | 2027 | ❌ | - | - | - | 2026 진행 중, 2027 미발표 |
| aaai | 2027 | - | 2028 | ❌ | - | - | - | 2028 미발표 |
| aacl | 2025 | - | 2026 | ❌ | - | ARR | Nov 6-10, Zhuhai | venue 확정, ARR commitment 미발표 |
| aamas | 2026 | - | 2027 | ❌ | - | - | - | 2026 하반기 CFP 예상 |
| accv | 2026 | - | 2028 | ❌ | - | - | - | 짝수년만 개최, 2028 미발표 |
| acl | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | location 추가: San Diego, CA |
| acml | (없음) | - | 2026 | ❌ | - | - | Dec, Melbourne | deadline 미발표 |
| acsac | (없음) | - | 2026 | ❌ | - | - | Dec 7-11, LA | deadline 미발표 |
| aistats | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | location 추가: Tangier, Morocco |
| ase | 2026 | ➕ 보완 | 2027 | ❌ | - | - | - | location 추가: Munich, Germany |
| asiacrypt | (없음) | - | 2026 | ❌ | - | - | - | IACR 미등록, 추후 재조사 |
| asplos | 2027 | - | 2028 | ❌ | - | - | - | 2028 먼 미래 |
| assets | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| atc | (없음) | - | - | ❌ | - | - | - | ⚠️ 영구 폐지 |
| bigdata | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| bmvc | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| case | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| ccc | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| ccs | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| cgo | (없음) | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| chi | 2026 | - | 2027 | ❌ | - | - | May 10-14, Pittsburgh | chairs 발표, CFP 미공개 |
| cikm | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | Oct 25-29, Sydney (tentative) | DB 날짜 Oct→Nov 수정 |
| cluster | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락, paper 날짜 수정 |
| coling | (없음) | - | 2027 | ❌ | - | - | 2027, Macau | 홀수년, CFP 미공개 |
| colt | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| conext | 2026 | - | 2027 | ❌ | - | - | - | PACMNET 2-cycle |
| conll | 2026 | - | 2027 | ❌ | - | - | - | ACL co-locate |
| corl | 2026 | - | 2027 | ❌ | - | - | - | 2027 미발표 |
| crypto | 2026 | - | 2027 | ❌ | - | - | Aug 2027, Santa Barbara (예상) | 2027 미발표 |
| cscw | 2026 | - | 2027 | ❌ | - | - | - | ⚠️ 2027 완전 rolling review 전환 |

**✅ 추가 대상: 없음**
**➕ DB 보완 필요 (3개):** acl (location), aistats (location), ase (location)
**⚠️ DB 수정 필요 (2개):** cikm (날짜+데드라인), cluster (abstract+paper)
**❌ 미발표: 30개**

---

### ⚠️ DB 수정 상세

1. **CIKM 2026**: 날짜 Oct 26-30 → **Nov 7-11** 수정, abstract **May 18** / paper **May 25** 추가
2. **Cluster 2026**: abstract **Apr 23** 누락, paper Apr 25 → **Apr 30** 수정 필요

### ➕ DB 보완 상세

1. **ACL 2026**: location → **San Diego, California, USA**
2. **AISTATS 2026**: location → **Tangier, Morocco**
3. **ASE 2026**: location → **Munich, Germany**

### 참고 사항

- **CSCW**: 2027년부터 완전 rolling review 전환 예정. Jan 2027이 마지막 전통적 데드라인.
- **COLING**: 홀수년만 개최, 2027 Macau 확정이나 CFP 미공개.
- **CHI 2027**: Pittsburgh, chairs 발표됨. 과거 패턴 기준 2026년 9월 초 마감 예상.
- **ACML 2026**: Dec Melbourne 확정, deadline 미발표 (2025 패턴: 6월 submission).
- **ACSAC 2026**: Dec 7-11 LA 확정, deadline 미발표 (2025 패턴: 5/30 submission).

*deadlines.json 업데이트: ⚠️ 수정 2건 + ➕ 보완 3건 반영 후 `npm run seed`*

---

## Phase 2 결과 (2026-03-16)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| csf | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| cvpr | 2026 | ✅ OK | 2027 | ❌ | - | - | Jun 19-26, Seattle | 장소만 확정 |
| dac | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | Jul 10-16, San Jose | conf_start 수정 + abstract 누락 |
| dasfaa | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 |
| date | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 |
| dis | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 |
| dsn | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 |
| eacl | (없음) | - | 2026 | ✅ | - | Dec 14 (마감) | Mar 24-29, Rabat | 신규 추가 가능 (ARR commitment) |
| ecai | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | 2027, Athens | abstract 누락, 2027 장소 확정 |
| eccv | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 짝수년, 2028 미발표 |
| ecml-pkdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| edbt | 2026 | ✅ OK | 2027 | ❌ | - | - | Apr 6-9, Lille | 장소 확정, deadline 미발표 |
| egsr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| emnlp | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | conf_date 10/22→10/24, 10/26→10/29 |
| er | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| esa | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| esem | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | ab 4/22→5/08, pa 4/29→5/14 |
| esorics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| eurocrypt | 2026 | ✅ OK | 2027 | ❌ | - | - | Apr 11-15, Eindhoven | 장소 확정, deadline 미발표 |
| eurographics | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | 2027, Pisa | abstract 누락 (2025-09-22) |
| eurosys | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| fase | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| fast | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| fg | (없음) | - | 2026 | ✅ | Jan 9 (마감) | Jan 15 (마감) | May 25-29, Kyoto | 신규 추가 가능 (마감됨) |
| focs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ⚠️ timezone EDT (AoE 아님) |
| fse | 2027 | ✅ OK | 2028 | ❌ | - | - | 2028, Milan | 장소만 확정 |
| gecco | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 (2026-01-19) |
| hpca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| hpdc | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 (2026-01-29) |
| hri | 2026 | ✅ OK | 2027 | ❌ | - | - | Mar 8-12, San Jose | 장소 확정, deadline 미발표 |

**✅ 신규 추가 가능 (2개):** eacl 2026, fg 2026 (둘 다 마감됨)
**⚠️ DB 수정 필요 (11개):** dac, dasfaa, date, dis, dsn, ecai, emnlp, esem, eurographics, gecco, hpdc
**❌ 미발표: 30개**

---

### ⚠️ DB 수정 상세

| 학회 | 필드 | 현재 DB 값 | 수정 값 |
|------|------|-----------|---------|
| dac | conf_start | 2026-07-25 | **2026-07-26** |
| dac | abstract | null | **2025-11-11** |
| dasfaa | abstract | null | **2025-10-20** |
| date | abstract | null | **2025-09-07** |
| dis | abstract | null | **2026-01-09** |
| dsn | abstract | null | **2025-11-27** |
| ecai | abstract | null | **2026-01-12** |
| emnlp | conf_start | 2026-10-22 | **2026-10-24** |
| emnlp | conf_end | 2026-10-26 | **2026-10-29** |
| esem | abstract | 2026-04-22 | **2026-05-08** |
| esem | paper | 2026-04-29 | **2026-05-14** |
| eurographics | abstract | null | **2025-09-22** |
| gecco | abstract | null | **2026-01-19** |
| hpdc | abstract | null | **2026-01-29** |

### 참고 사항

- **FOCS**: timezone이 EDT 17:00 (AoE 아님). DB는 AoE로 저장하는 컨벤션이므로 주의.
- **ECCV**: timezone이 UTC 22:00 (AoE 아님). DB에 AoE로 저장되어 있으나 참고.
- **ECAI 2026**: IJCAI-ECAI 합동 개최.

*deadlines.json 업데이트: ⚠️ 수정 14건 + 신규 2건 반영 후 `npm run seed`*

---

## Phase 3 결과 (2026-03-16)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| i3d | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| icalp | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 (2026-02-03) |
| icaps | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | Summer 2027, Columbia SC | abstract 누락 (2025-12-02) |
| iccad | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| iccv | 2025 | ✅ OK | 2027 | ❌ | - | - | Oct 2027, Hong Kong | 홀수년만, 장소 확정 |
| icdcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| icde | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | 날짜 혼재 (타이틀 May10-14 vs 본문 May17-21), 재확인 필요 |
| icdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| icip | 2026 | ✅ OK | 2027 | ❌ | - | - | Nov 29-Dec 3, Singapore | deadline 미발표 |
| iclr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 (비공식: Singapore 4월) |
| icml | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 South America (도시 미정) |
| icnp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| icpr | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 격년(짝수년), 2028 미발표 |
| icra | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | May 24-28, Seoul | paper 09-15→09-16 (PST 연장) |
| ics | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| icse | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| icsme | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 (2026-02-27) |
| icst | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| ijcai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | chairs만 확정, ECAI 합동(2026) |
| imc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| infocom | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| interact | 2027 | ➕ 보완 | 2029 | ❌ | - | - | - | 홀수년만, 2027 데드라인 미발표 |
| iros | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| isaac | (없음) | - | 2026 | ❌ | - | - | - | 2026 미발표 (보통 12월 아시아 개최) |
| isca | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| isrr | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 짝수년 전환, 2028 미발표 |
| issre | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| issta | 2026 | ✅ OK | 2027 | ❌ | - | - | Singapore (날짜 미정) | chairs 확정, deadline 미발표 |
| itcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| iui | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | abstract 누락 (2025-10-03) |

**✅ 추가 대상: 없음**
**⚠️ DB 수정 필요 (6개):** icalp, icaps, icra, icsme, iui, icde (재확인)
**➕ DB 보완 필요 (1개):** interact (데드라인 미발표 상태)
**❌ 미발표: 30개**

---

### ⚠️ DB 수정 상세

| 학회 | 필드 | 현재 DB 값 | 수정 값 |
|------|------|-----------|---------|
| icalp | abstract | null | **2026-02-03** |
| icaps | abstract | null | **2025-12-02** |
| icra | paper | 2025-09-15 | **2025-09-16** (PST 연장) |
| icsme | abstract | null | **2026-02-27** |
| iui | abstract | null | **2025-10-03** |
| icde | conf dates | May 17-21 | 재확인 필요 (타이틀 May 10-14 vs 본문 May 17-21) |

### 참고 사항

- **ICRA 2027**: 서울 개최 확정 (May 24-28), General Chair: 서울대 조규진 교수. 26년 만에 서울 재개최.
- **ICCV 2027**: Hong Kong 확정, 구체적 날짜/deadline 미발표.
- **ICIP 2027**: Singapore 개최 확정 (Nov 29-Dec 3), deadline 미발표. 2026년 9월→11월로 시기 변경.
- **ICPR**: 격년(짝수년) 개최. 2028 개최지 ICPR 2026(Lyon) 기간 중 선정 예정.
- **ISRR**: 홀수년→짝수년 전환 (2022→2024→2026). 다음은 2028.
- **ICDE 2027**: 공식 사이트 타이틀(May 10-14)과 본문(May 17-21) 불일치. 현재 DB 값(17-21) 유지, 추후 재확인.
- **ICS 2026**: 2-cycle 시스템. DB에 Cycle 2만 저장 (abstract 2/2, paper 2/9).

*deadlines.json 업데이트: ⚠️ 수정 5건 확정 + 1건 재확인 반영 후 `npm run seed`*

---

## Phase 4 결과 (2026-03-16)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| kdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2nd cycle (ab 02-01, pa 02-08) 추가 가능 |
| lrec | 2026 | ✅ OK | 2028 | ❌ | - | - | - | 격년(짝수년), 2028 미발표 |
| mdm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| mfcs | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| miccai | 2026 | ✅ OK | 2027 | ❌ | - | - | Sep 26-Oct 1, Auckland | ⚠️ timezone PT (AoE 아님) |
| micro | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| middleware | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2nd cycle 저장, 정확 |
| mobicom | 2026 | ✅ OK | 2027 | ❌ | - | - | - | Winter round 이미 마감 |
| mobihoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| mobilehci | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| mobisys | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| models | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| msr | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| naacl | (없음) | - | 2027 | ❌ | - | - | - | 2026 로테이션 없음, 2027 예정 |
| ndss | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| neurips | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | ab 05-05→05-04, pa 05-07→05-06 |
| nsdi | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| oopsla | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | notification 02-17→12-17 (1st cycle) |
| osdi | 2026 | ✅ OK | 2027 | ❌ | - | - | Jul 7-9, Baltimore | CFP 미발표, 매년 전환 |
| pact | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| pakdd | 2026 | ✅ OK | 2027 | ❌ | - | - | - | ⚠️ timezone PST (AoE 아님) |
| pets | 2026 | ✅ OK | 2027 | ❌ | - | - | - | rolling 4-issue, Issue 1 저장 |
| pg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| pldi | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| pods | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | cycle 레이블 round2→round1 |
| popl | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| ppopp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| raid | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| recsys | 2026 | ✅ OK | 2027 | ❌ | - | - | Hawaii (날짜 미정) | chairs 확정, deadline 미발표 |
| rss | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |

**✅ 추가 대상: 없음**
**⚠️ DB 수정 필요 (3개):** neurips (날짜), oopsla (notification), pods (cycle 레이블)
**❌ 미발표: 30개**

---

### ⚠️ DB 수정 상세

| 학회 | 필드 | 현재 DB 값 | 수정 값 |
|------|------|-----------|---------|
| neurips | abstract | 2026-05-05 | **2026-05-04** |
| neurips | paper | 2026-05-07 | **2026-05-06** |
| neurips | notification | 2026-09-20 | **2026-09-24** |
| oopsla (1st) | notification | 2026-02-17 | **2025-12-17** |
| pods | cycle | round2 | **round1** |

### 참고 사항

- **MICCAI 2026**: timezone이 Pacific Time (AoE 아님). DB는 AoE 컨벤션이므로 주의.
- **MICCAI 2027**: Auckland, New Zealand 확정 (Sep 26-Oct 1). MICCAI 2028은 São Paulo 예정.
- **OSDI**: 격년→매년 전환 (2025, 2026, 2027 연속). 2027 Baltimore 확정.
- **NAACL**: 2026 로테이션에서 빠짐. 다음은 NAACL 2027.
- **LREC**: 격년(짝수년). 다음은 LREC 2028.
- **NeurIPS 2027**: Europe (도시 미정). 2028은 Western US.
- **RecSys 2027**: Hawaii 확정, deadline 미발표.
- **KDD 2026**: 2nd cycle (ab 02-01, pa 02-08) 존재. 현재 DB에 1st cycle만 저장.

*deadlines.json 업데이트: ⚠️ 수정 5건 반영 후 `npm run seed`*

---

## Phase 5 결과 (2026-03-16)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| saner | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| sc | 2026 | ✅ OK | 2027 | ❌ | - | - | Nov 2027 (장소 미정) | 2027 미발표 |
| sca | (없음) | - | 2026 | ❌ | - | - | Jul 8-10, Barcelona | deadline 미공개 (마감 추정) |
| sdm | (없음) | - | 2026 | ❌ | - | - | Nov 19-20, Salt Lake City | CFP 미발표, 봄→가을 변경 |
| sensys | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | ab/pa 날짜 수정 (2nd deadline) |
| sigcomm | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 wild-card year (북미/유럽 외) |
| siggraph | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | ab 누락 (2026-01-15) |
| siggraph-asia | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 개최지 미확정 |
| sigir | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| sigmod | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| socc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| socg | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| soda | 2027 | ⚠️ 수정 | 2028 | ❌ | - | - | - | pa 누락 (2026-07-09) |
| sosp | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 매년 전환, 2027 미발표 |
| sp | 2026 | ✅ OK | 2027 | ❌ | - | - | May 2027, Montreal | 장소만 확정, CFP 미발표 |
| stoc | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| uai | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| ubicomp | 2026 | ⚠️ 수정 | 2027 | ✅ | - | rolling | May 10-14, Pittsburgh | conf_start 수정, 2027 확정 |
| uist | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| usenix-security | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| vldb | 2027 | ➕ 보완 | 2028 | ❌ | - | - | - | notif 추가 가능 (2026-05-15) |
| wacv | 2026 | ✅ OK | 2027 | ❌ | - | - | - | 2027 미발표 |
| wsdm | 2026 | ✅ OK | 2027 | ❌ | - | - | 아시아/오세아니아 (도시 미정) | 2027 host bid 완료 |
| www | 2026 | ✅ OK | 2027 | ❌ | - | - | Dublin, Ireland | 장소 확정, CFP 미발표 |

**✅ 추가 대상: 없음** (UbiComp 2027은 IMWUT rolling이므로 기존 구조에 맞춰 별도 추가)
**⚠️ DB 수정 필요 (4개):** sensys (ab/pa), siggraph (ab), soda (pa), ubicomp (conf_start)
**➕ DB 보완 가능 (1개):** vldb (notification)
**❌ 미발표: 24개**

---

### ⚠️ DB 수정 상세

| 학회 | 필드 | 현재 DB 값 | 수정 값 |
|------|------|-----------|---------|
| sensys | abstract | None | **2025-11-06** |
| sensys | paper | 2025-11-06 | **2025-11-13** |
| siggraph | abstract | None | **2026-01-15** |
| soda | paper | None | **2026-07-09** |
| ubicomp | conf_start | 2026-10-11 | **2026-10-13** |

### ➕ DB 보완 상세

| 학회 | 필드 | 현재 DB 값 | 보완 값 |
|------|------|-----------|---------|
| vldb | notification | None | **2026-05-15** (첫 사이클 기준, rolling monthly) |

### 참고 사항

- **SenSys 2026**: ACM+IEEE 통합 학회로 리브랜딩 ("Embedded AI and Sensing Systems"). SenSys+IPSN+IoTDI 합병. 2-deadline 시스템 (1st: Jul 1 마감, 2nd: Nov 13 마감).
- **SCA**: DB 미등록. 2026 Barcelona 개최 확정이나 deadline 미공개 (이미 마감 추정).
- **SDM**: DB 미등록. 2026년부터 봄(May)→가을(Nov) 개최로 변경. SIAM IS26/MDS26과 합동.
- **SIGCOMM 2027**: "wild-card year"로 북미/유럽 외 지역 개최 예정.
- **S&P 2027**: Montreal, Canada 확정 (공식 미발표, Adam Bates 발표).
- **UbiComp 2027**: Pittsburgh, May 10-14 확정. IMWUT rolling R1(Feb 1)/R2(May 1)/R4(Nov 1) 신규제출, R3(Aug 1) revision only.
- **VLDB**: 2027부터 rolling monthly deadline. Abstract 매월 25일, Paper 매월 1일 (5PM PT), Notification 다음달 15일.
- **WWW 2027**: Dublin, Ireland 확정. General Co-chairs 발표됨.
- **WSDM 2027**: 아시아/오세아니아 개최 확정, host city 미발표.

*deadlines.json 업데이트: ⚠️ 수정 5건 + ➕ 보완 1건 반영 후 `npm run seed`*
