## 주간 업데이트 결과 (2026-09-09)

### ✅ 데드라인 연장 확인

- **FC 2027**: paper `2026-09-17 → 2026-09-24 23:59 AoE`, notification `11-05 → 11-12` 공식 연장.
- **PerCom 2027**: abstract `09-04 → 09-11`, paper `09-11 → 09-18 23:59 AoE`, notification `12-18` 공식 연장.
- 변경 없음: ASPLOS, CGO, CHI, HRI, DATE, FAST, ICRA, EUROCRYPT, NSDI, ICLR abstract, SPAA abstract, EuroSys fall, SANER abstract.
- 상세/공식 URL: `scripts/deadline-report.md`의 `2026-09-09 Phase 1~7 전수 재조사` 참조.

### 📋 새 CFP / deadline 업데이트

- Phase 1~7의 209개 학회를 phase별 sub-agent로 전수 확인.
- 신규 full CFP/새 cycle 작업: **18개 학회, 19개 deadline row** — 신규 16개 row + 기존 conference-only row 3개(HRI, ICAPS, ISMB/ECCB) 보완. OOPSLA는 2개 cycle.
- 주요 FIX: 3DV timezone/시간, ACML notification, FG 2026 cycles, MASCOTS 연장, NDSS notifications, FC/PerCom 연장. DASFAA deadline 충돌은 HOLD하고 공식 Research Track URL만 갱신함.
- 공식 페이지 내부 충돌 항목은 HOLD로 유지했고, clock/timezone만 미공개인 확정 일정은 값을 추정하지 않고 `timezone: null`로 반영함.

### 🏆 Best Paper 발표

- 최근 90일 종료 학회 중 seed 미반영 후보 **40개**를 공식 awards/program/proceedings 페이지로 확인.
- 공식 발표 확인: **23개 slug, 중복 제거 후 144개 고유 award-paper 후보**.
- 현재 enum에 정확히 맞아 반영한 후보: **135개**. award subtype 정책 결정 필요: **9개**.
  - VLDB Best Industry Paper/Industry HM 2
  - MobileHCI `Award Winning Paper` 4
  - DAC Most Influential Paper 1
  - ISMB Outstanding Student Paper 1
  - SIGMETRICS Outstanding Student Paper 1
- IJCAI/ECAI 공동 Distinguished Paper 3편은 한 세트만 저장해야 중복되지 않음.
- ICDCS는 공식 전체 5편 중 4편만 외부 기관 페이지로 확인돼 전부 HOLD.

| 학회 | 신규 후보 | award 구성 | 공식 출처 |
|------|----------:|-------------|-----------|
| CONCUR | 2 | Test of Time 2; main winner는 강조표시 추출 불가로 HOLD | https://confest-2026.github.io/concur/ |
| VLDB | 7 | Best 1, HM 3, Industry 2, Test of Time 1 | https://www.vldb.org/2026/conference-awards.html |
| MobileHCI | 4 | Award Winning Paper 4, subtype 미공개 | https://mobilehci.acm.org/2026/program/program-at-a-glance.html |
| ICFP | 4 | Distinguished 4 | https://icfp26.sigplan.org/track/icfp-2026-icfp-papers |
| MFCS | 3 | Best 1, Best Student 2 | https://mfcs2026.irif.fr/ |
| IJCAI/ECAI | 3 | 공동 Distinguished 3, 중복 저장 금지 | https://2026.ijcai.org/press/ |
| SIGCOMM | 2 | 공동 Best Paper 2 | https://conferences.sigcomm.org/sigcomm/2026/program/papers/ |
| UAI | 3 | Best 1, Runner-Up 1, HM 1 | https://www.auai.org/uai2026/schedule |
| USENIX Security | 9 | Distinguished 9 | https://www.usenix.org/conference/usenixsecurity26/technical-sessions |
| CCC | 3 | Best 1, Best Student 1, Test of Time 1 | https://computationalcomplexity.org/Archive/2026/program.html |
| CAV | 8 | Distinguished 8 | https://program.floc26.org/CAV-index |
| DAC | 2 | Best 1, Most Influential 1 | https://dac.com/dac-2026-general-society-awards |
| ICLP | 5 | Best 1, Best Student 1, Test of Time 3 | https://logicprogramming.org/2026/09/iclp-2026-report/ |
| CSEET | 2 | Best 2 | https://cseet26.techconf.org/track/award |
| GECCO | 10 | Best 10 | https://prod-www.acm.bloomreach.cloud/conferences/best-paper-awards |
| ISMB | 1 | Outstanding Student 1 | https://www.iscb.org/?id=122&view=category |
| SCA | 3 | Best 1, HM 2 | https://computeranimation.org/awards.html |
| ICS | 1 | Best 1 | https://dipsa-qub.github.io/ICS2026-webpage/ |
| MDM | 2 | Best 1, Test of Time 1 | https://mdm-2026.github.io/program.html |
| DIS | 63 | Best 16, HM 47 | https://dis.acm.org/2026/dis-2026-awards-and-recognition/ |
| SIGMETRICS | 5 | Best 1, Outstanding Student 1, Runner-Up 3 | https://sigmetrics.hosting.acm.org/awards.shtml |
| SEC | 2 | Best 1, Best Student 1 | https://www.ifipnews.org/ifip-tc11-brings-the-global-cybersecurity-community-to-perth-2/ |

재확인 HOLD 17개: ESA, AVSS, SOUPS, ICPR, CASE, RE, CRYPTO, KDD, CSF, IJCAR, SIGIR, CLOUD, ICWS, IUI, ICDCS, LCTES, PAKDD.

### 적용 상태

- `deadlines.json`: 344 → 368개(`+24` 순증). 신규 CFP·cycle·일정 row를 추가하고 기존 61개 row를 보정함.
- `conferences.json`: 공식 URL 19개를 최신 CFP/일정 페이지로 갱신함.
- `best-papers.json`: 2026 공식 수상작 135편을 추가함. 신규 논리 중복 0, enum/schema 오류 0.
- Best Paper 반영 구성: Best 41, Runner-Up 4, Best Student 5, Distinguished 24, Honorable Mention 53, Test of Time 8.
- IJCAI/ECAI 공동 3편은 `ijcai`에만 저장했고, subtype 정책이 필요한 9편과 HOLD 17개 학회는 제외함.
- 반영일: 2026-09-09. `public/data/**`는 기존 UUID·채택률·키워드 캐시를 보존해 재생성함. Supabase upsert는 설정된 프로젝트 도메인의 DNS `NXDOMAIN`으로 실행되지 않아 환경 URL 복구 후 재시도가 필요함.
