## 업데이트 결과 (2026-09-28)

### 적용 요약

- Deadline Check: Phase 1–7, 등록 학회 209개 모두 조사 시도. 접근 실패·잠정 일정·공식 문서 충돌은 확정 검증과 구분해 기록했다.
- Deadline: 368 → 403행. 새 행 35개(제출 일정 8개, 행사 일정만 27개), 기존 53행 보정. 총 74개 학회 관련 변경.
- 기존 행사-only ICMR 2027에 확정 CFP를 보완했다. 따라서 새 CFP/마감 확보는 9개 학회.
- 공식 홈페이지/CFP 링크 10개 갱신.
- Best Paper: 39개 회차 확인, 8개 학회 수상작 42편 추가. 기존 CONCUR DOI 링크 2건 보강. 전체 1,980 → 2,022편.
- 화면 업데이트 일자: 2026.09.28. Best Paper 화면·메타데이터 건수도 2,022로 수정.

### Phase별 적용

| Phase | 조사 대상 | 신규 행 | 기존 수정 |
| --- | ---: | ---: | ---: |
| 1 | 30 | 1 | 10 |
| 2 | 30 | 5 | 13 |
| 3 | 30 | 6 | 2 |
| 4 | 30 | 2 | 6 |
| 5 | 30 | 7 | 5 |
| 6 | 30 | 7 | 13 |
| 7 | 29 | 7 | 4 |
| 합계 | 209 | 35 | 53 |

### 주요 deadline 변경

- 새 CFP: DAC, ICDM, ICMR, MobiSys, NOMS, PAKDD, RECOMB, RSS, STOC의 2027 회차.
- ICRA 2027: paper 9월 15일 → 16일 23:59 PST 공식 연장.
- HiPC·KR·Pacific Graphics·IFIP SEC: UTC로 변환된 값을 다시 현지 시각으로 해석하던 seed 값을 공식 현지 날짜 + 별도 timezone 관례로 보정.
- IPDPS: 자정 값 → 공식 end-of-day AoE, notification 2027-02-02 보완.
- CRYPTO: AoE → 공식 US Pacific/PST. EDBT 6월·10월 cycle: 공식 PT에 맞춰 PDT.
- SenSys·RTAS 2027: Boulder, 2027-05-17–20 개최 정보 반영.
- NDSS fall notification 11월 4일 → 24일, INTERACT는 reviews 발송일 대신 실제 acceptance notification 4월 22일 반영.
- RSS 2027: 신규 투고 진입 마감인 2026-12-04 6쪽 extended-abstract manuscript를 paper deadline으로 저장. 2027-04-16은 초청된 final paper만 제출 가능하므로 신규 투고 마감으로 표시하지 않음.
- NOMS 2027: IM 통합 후 2027 회차 존재 확인. paper 2026-11-09는 날짜만 확정되어 자정 sentinel + timezone null; 마감 시각을 추정하지 않음.

### Best Paper

| 학회 | 추가 |
| --- | ---: |
| CSCW | 24 |
| ICSME | 8 |
| SRDS | 2 |
| DISC | 2 |
| NOMS | 2 |
| CRYPTO | 2 |
| CONCUR | 1 |
| PAKDD | 1 |

구성: Best 14, Best Student 3, Distinguished 8, Honorable Mention 16, Early Career 1.
직접 논문 URL을 확인하지 못한 31편은 null 유지. nominee/finalist, 워크숍·도구·데모 상, 불명확한 세부 수상 분류는 임의 반영하지 않았다.
독립 리뷰에서 누락된 CRYPTO CORAL Early Career 수상을 발견해 최종 반영했다.

### 보류·검증 한계

- DASFAA 2027: 공식 Research CFP/홈과 Important Dates가 서로 충돌. 기존 날짜도 행사 이후로 표시되는 문제가 있어 신뢰 가능한 마감으로 간주하면 안 되며, 이번에는 값 보류.
- SIGIR 2027: 공식 일정이 PROPOSED. AVSS 2027도 잠정 일정으로 명시되어 미반영.
- SAC 2027: 공식 날짜 10월 2일 EST는 확인했으나 정확한 cutoff clock은 확인하지 못했다. 기존 10월 3일 04:59 + EST 인코딩은 재검증 필요하며 이번에는 보류.
- CGO notification, ICRA/ICPR 2028 행사 날짜, NOMS notification 등 공식 문서 충돌은 보류.
- ISAAC notification은 공식 도메인의 검색 색인 자료로 확인했으며 실시간 페이지 접근은 실패했다.
- ECCV awards coming soon, ECML-PKDD 링크는 2025 자료, CLOUD/ICWS의 2026 URL도 2025 awards를 제공하므로 새로운 2026 수상작으로 가져오지 않았다.
- PAKDD 학생상 제목·저자 모순, MobileHCI 수상 subtype, CSCW Lasting Impact 등은 보류.
- 세부 209개 coverage 및 접근 실패는 각 phase 보고서에 명시.

### 저장·검증 상태

- seed 및 배포용 public/data 정적 데이터 반영 완료. 기존 209개 UUID와 개별 학회 채택률·키워드 배열 보존.
- acceptance-rates.json(사용자 기존 수정 포함), keyword-trends.json, top-keywords.json 원본 바이트 보존.
- Supabase 프로젝트 도메인 DNS가 ENOTFOUND여서 DB upsert는 미실행. URL/프로젝트 복구 후 DB 동기화 필요.
- 데이터 검증: 신규 논리 중복 0, 변경 행 날짜 순서·enum·정적 데이터 일치 검사 통과. 기존 author 배열형 546건은 수정하지 않고 검증 과정에서만 문자열로 정규화.
- 자동 테스트 26개, TypeScript, 변경 화면 ESLint 통과. 프로덕션 빌드는 네트워크 제한 밖 재시도로 통과(기존 chart/middleware 경고는 유지).
- 최종 별도 리뷰: review-2026-09-28-best-papers.md 및 review-2026-09-28-data.md 참조.
- 2026-09-28 사용자 승인으로 이번 데이터 변경의 main 커밋·푸시 및 배포 빌드를 진행한다. DB 동기화는 위 DNS 문제로 별도 미완료 상태다.

상세: [Deadline 보고서](deadline-report.md), [Best Paper 조사](research-2026-09-28-best-papers.md), [전체 변경 근거 JSON](research-2026-09-28-changes.json), [종료 학회 후속 목록](post-conf-report.md).
