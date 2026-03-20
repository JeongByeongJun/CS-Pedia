# CS-Pedia 6-Agent 종합 분석 (2026-03-20)

## 에이전트 간 공통 발견 (3개 이상 동의)

| 주제 | 동의 에이전트 | 내용 |
|------|------------|------|
| **이메일 알림이 최우선** | 마케팅, 프로덕트, 디자인 | 리텐션의 핵심. 없으면 1회성 방문으로 끝남 |
| **inline style 정리** | 퍼포먼스, 디자인, 코드품질 | 다크모드/반응형/유지보수 3가지를 동시에 막는 기술 부채 |
| **모바일 기관 배지 숨김** | 디자인, 마케팅, 프로덕트 | 핵심 차별점(BK21/KIISE)이 모바일에서 안 보임 |
| **테스트 부재** | 코드품질, 프로덕트, 데이터 | 최소한 도메인 레이어 유닛테스트 필요 |
| **Zod validation 미사용** | 코드품질, 데이터 | 스키마가 타입 추출용으로만 쓰이고 실제 validation 0건 |

---

## 에이전트별 TOP 3 액션 아이템

### 1. 마케팅
| # | 액션 | 난이도 |
|---|------|--------|
| 1 | 에브리타임 주요 대학 CS 게시판 포스팅 | 즉시 |
| 2 | X/Twitter @cs_pedia 계정 + 주간 데드라인 트윗 | 즉시 |
| 3 | 네이버 서치어드바이저 등록 + "BK21 학회 목록" SEO 글 | 30분 |

### 2. 퍼포먼스
| # | 액션 | 효과 |
|---|------|------|
| 1 | 미들웨어 matcher 축소 (비보호 페이지 skip) | TTFB -50~100ms |
| 2 | ConferenceList 가상화 (초기 20개만 렌더) | LCP -200ms+ |
| 3 | recharts lazy loading (`next/dynamic`) | JS -350KB |

### 3. 코드 품질
| # | 액션 | 심각도 |
|---|------|--------|
| 1 | Zod safeParse를 mapper에 적용 | High |
| 2 | 검색 필터 LIKE 와일드카드 escape | High |
| 3 | 상세 페이지 430줄 -> 섹션별 컴포넌트 분리 | Medium |

### 4. 디자인/UX
| # | 액션 | 임팩트 |
|---|------|--------|
| 1 | 모바일 기관 배지 노출 (`hidden sm:block` 제거) | 핵심 정보 복원 |
| 2 | 네비게이션 활성 탭 표시 | 기본 UX |
| 3 | 북마크 터치 타겟 44px로 확대 | 접근성 |

### 5. 프로덕트/방향성
| # | 액션 | 타이밍 |
|---|------|--------|
| 1 | 이메일 알림 MVP (북마크 D-7) | 이번 달 |
| 2 | Google Calendar .ics 내보내기 | 1개월 |
| 3 | 학회 비교 기능 (2~3개 나란히) | 3개월 |

### 6. 데이터
| # | 액션 | 심각도 |
|---|------|--------|
| 1 | 파이프라인 데이터 충돌 방지 (seed 데이터 덮어쓰기 위험) | Critical |
| 2 | 파이프라인 timeout 해소 (Phase 분리) | Critical |
| 3 | Best Paper URL 1,108개 수집 (S2 API 키 해결 후) | High |

---

## 킬러 슬로건
- **한국어**: "학회 고를 때, 여기만 보면 됩니다"
- **영어**: "Every CS conference. One place."

## 수익화 핵심 공식
> **"보는 것"은 무료, "행동하게 해주는 것"은 유료**
> - 무료: 학회 정보 조회, 기관 인정, 채택률
> - 유료: 알림, 캘린더 동기화, 학회 비교, 키워드 상세

---

# 상세 리포트

---

## A. 마케팅 전략 (마케팅 전략가)

### 타겟 유저 세분화

**한국 대학원생 (핵심 타겟, 60%)**
- 핵심 니즈: "이 학회 BK21 몇 점?", "KIISE 우수학회?", "데드라인 언제?"
- 페인 포인트: BK21 PDF 뒤지기, KIISE 홈페이지 일일이 찾기
- 유입: 에브리타임, 학과 단톡방, 연구실 선배 추천

**한국 교수/PI (15%)**
- 핵심 니즈: 학생에게 추천할 학회 목록, BK21 실적 관리
- 활용: "cs-pedia.io에서 확인해봐" 한 마디 -> 연구실 전체 유입

**기업 연구원 (15%)**
- 핵심 니즈: 회사 연구 실적용 학회 등급, CORE/CCF 랭킹
- 차별점: CORE + CCF + CSRankings 동시 표시

**해외 연구자 (10%, 장기)**
- 핵심 니즈: deadline, acceptance rate, best paper
- 유입: Reddit, Twitter/X, Google

### 채널 전략

**Tier 1 (즉시)**
- 에브리타임: 주요 대학 CS/AI 게시판. "BK21/KIISE 학회 점수 한눈에 보는 사이트"
- X/Twitter: @cs_pedia. 주간 데드라인, 채택률 업데이트, Best Paper 속보
- 카카오톡: 연구실/학과 단톡방에 직접 공유

**Tier 2 (1-3개월)**
- Reddit: r/MachineLearning "I built a tool..." 포스트
- 네이버 블로그: "BK21 학회 목록 2026", "KIISE 우수학회 리스트" SEO

**Tier 3 (3-6개월)**
- 교수/PI 침투: 교수 한 명이 추천하면 연구실 10-20명 동시 유입
- 뉴스레터: 주간 "마감 학회 + 학회 결과 + 트렌드"

### Viral 콘텐츠
1. "2026 CS 학회 채택률 랭킹" 인포그래픽
2. "이번 주 마감 학회" 위클리 트윗 (자동화 가능)
3. "Best Paper로 보는 CS 연구 트렌드" 연간 보고서
4. "BK21 학회 선택 가이드" (매 학기 초 입학생 시즌)

### SEO 추가 기회
- FAQ JSON-LD 추가 (학회별 "데드라인은?", "BK21 몇 점?")
- Best Paper 개별 URL (`/best-papers/cvpr/2025`) -> 검색 트래픽
- hreflang 태그 (한국어/영어 별도 인덱싱)
- 네이버 서치어드바이저 등록

### 경쟁사 대비 차별점

| 기능 | cs-pedia | aideadlin.es | WikiCFP | ccfddl |
|------|----------|--------------|---------|--------|
| BK21/KIISE 등급 | **유일** | X | X | X |
| CORE/CCF/CSRankings 통합 | **3개 동시** | 일부 | X | CCF만 |
| Acceptance Rate 차트 | O | X | X | X |
| Best Paper 아카이브 | 1443개 | X | X | X |
| 키워드 트렌드 | O | X | X | X |
| 한국어 지원 | 네이티브 | X | X | 중국어 |

### 유저 확보 로드맵
- **0->100명** (1-2주): 개인 네트워크 + 에브리타임 1차 포스팅 + 빠른 피드백 반영
- **100->500명** (1-2개월): X 계정 운영 + Reddit + 네이버 SEO + 학회 시즌 활용
- **500->1,000명** (3-6개월): 교수/PI 침투 + 뉴스레터 + 캘린더 연동 + Product Hunt

---

## B. 퍼포먼스 분석 (퍼포먼스 엔지니어)

### 현재 수치
| 항목 | 값 |
|------|-----|
| conferences.json | 164KB (gzip ~31KB) |
| 클라이언트 컴포넌트 | 25/30 (83%) |
| recharts 번들 | ~350KB minified |
| ISR 메인 | 1시간 |
| ISR 상세/트렌드 | 24시간 |

### Core Web Vitals 병목

**LCP**: 154개 ConferenceCard 동시 렌더 + conferences.json 164KB
- 개선: 가상화 (초기 20개) + latestBestPapers 49KB 분리

**FID/INP**: 필터 시 154개 카드 리렌더
- 개선: bookmarkedIds를 Set으로, React.memo, 검색 debounce

**CLS**: DeadlineTime 컴포넌트 SSR->CSR 교체 시 텍스트 길이 변화
- 개선: 고정 min-width 또는 placeholder 공간 확보

### P0 액션 (즉시)
1. 미들웨어 matcher 축소 -> 비보호 페이지 TTFB -50~100ms
2. ConferenceList 가상화 -> LCP -200ms+
3. recharts lazy loading -> JS -350KB
4. bookmarkedIds Set 변환

### P1 액션 (중기)
5. auth를 클라이언트로 분리 -> ISR 캐시 히트율 대폭 상승
6. conferences.json에서 latestBestPapers 분리 -> payload -49KB
7. 상세 페이지 쿼리 워터폴 3단계->2단계
8. next.config.ts 정적 자산 캐시 헤더

---

## C. 코드 품질 (시니어 코드 리뷰어)

### 좋은 점
- Clean Architecture 3계층 분리 잘 됨
- domain->infrastructure 의존성 방향 올바름
- Factory 패턴 use case + DI container 깔끔

### High 심각도
1. **Zod validation 미사용**: 모든 mapper에서 DB row를 그대로 캐스팅. `.parse()`/`.safeParse()` 호출 0건
2. **검색 LIKE 와일드카드 미escape**: `supabase-conference-repository.ts`에서 사용자 입력이 `.or()` 문자열에 직접 interpolation
3. **에러 핸들링 부재**: Repository에서 `throw error` 관통, 대부분 페이지에 catch 없음

### Medium 심각도
4. `as any`/`as never` 5곳 (Supabase 타입 불일치 강제 우회)
5. 상세 페이지 430줄 God Component
6. 정렬 로직 중복 (domain use-case + presentation)
7. authUser 구성 5개 페이지에서 반복
8. findTopKeywords: 전체 fetch 후 JS 집계 (DB GROUP BY로 해야)

### 테스트 전략 (우선순위)
1. Domain use cases + value objects (순수 함수, mock 불필요)
2. Mappers (DB row fixture -> 도메인 엔티티 검증)
3. Repository integration tests
4. E2E (Playwright)

---

## D. 디자인/UX (UX/UI 디자이너)

### P0 (즉시)
1. **모바일 기관 배지**: `hidden sm:block` -> 모바일에서도 축약 표시
2. **북마크 터치 타겟**: `p-1.5` (28px) -> `p-2.5` (44px+)
3. **네비게이션 활성 탭**: 현재 페이지 하이라이트 없음

### P1 (중기)
4. inline style -> Tailwind 통일 (다크모드 기반)
5. 이모지 -> Lucide 아이콘 교체
6. 필터 초기화 버튼 추가
7. Best Papers 페이지 locale 분기

### P2 (장기)
8. 다크모드 (`.dark` CSS 변수 이미 정의, shadcn 내장 지원)
9. 마이크로 애니메이션 (북마크 바운스, 필터 전환 페이드)
10. 차트 선택 제한 8~10개

### 가장 큰 기술 부채
> inline style (site-header, best-papers, trends-tabs)이 다크모드/반응형/유지보수 세 가지를 동시에 막고 있음

---

## E. 프로덕트/방향성 (프로덕트 매니저)

### PMF 진단
> "정보는 있는데, 유저를 다시 오게 만드는 장치(알림/리마인더)가 없다."

- 데드라인: "보기만" 가능. 알림 없으면 결국 다른 사이트 또 씀
- 기관인정: 한국 시장 진짜 차별점. 잘 되어 있음
- 비교: 학회 간 나란히 비교 기능 없음
- 트렌드: 잘 구현됨. 프리미엄 후보

### 로드맵

**Phase 1 (3개월)**: 리텐션 엔진
1. 이메일 알림 MVP (D-30, D-7)
2. Google Calendar .ics 내보내기
3. 모바일 UX 개선
4. 학회 비교 기능

**Phase 2 (6개월)**: 유저 확보 + 프리미엄 준비
5. 맞춤 추천 대시보드
6. Telegram/Discord 봇
7. 프리미엄 결제 (Stripe/토스)

**Phase 3 (1년)**: 수익 다각화
8. 채용 게시판
9. 워크숍/튜토리얼 데이터
10. 국제화

### 수익화 타이밍
- **즉시**: AdSense (월 5~20만원)
- **3개월 후**: 무료 월 2회 알림 / 프리미엄 5,000원 무제한 + 캘린더
- **1년 후**: 채용 게시판 (건당 10~30만원)

### 킬러 피처
> **"10분 -> 3초" 압축**: WikiCFP(데드라인) + BK21 PDF + Google Calendar = 10분 vs cs-pedia 북마크 -> 알림 -> 캘린더 = 3초

### 리스크
| 리스크 | 대응 |
|--------|------|
| aideadlin.es 경쟁 | 한국 니치 (BK21/KIISE)로 차별화 |
| 데이터 품질 | 에러 리포트 버튼 + 유저 피드백 루프 |
| 1인 개발 번아웃 | 데드라인 자동화 or 커뮤니티 기여(GitHub PR) |
| 수익화 한계 | 한국 CS 연구자 ~10,000명, 전환율 5% = 500명 x 5,000원 = 월 250만원 상한 |

---

## F. 데이터 분석 (데이터 엔지니어)

### 데이터 완성도
| 데이터셋 | 커버리지 | 주요 공백 |
|----------|---------|----------|
| conferences | 154/154 (100%) | website_url 93개 누락 |
| deadlines | 144/154 (93.5%) | 10개 학회 누락 |
| best-papers | 138/154 (89.6%) | **paper_url 1,108개 누락 (76.8%)** |
| acceptance-rates | **50/154 (32.5%)** | 104개 학회 누락 |
| institution-ratings | 1,232/1,232 (100%) | 완벽 |

### Critical 이슈
1. **파이프라인 데이터 충돌**: `upsertAcceptanceRates`가 seed의 수동 데이터를 `rate: null`로 덮어쓸 위험
2. **파이프라인 timeout**: 예상 ~244분, GH Actions 240분 제한과 거의 같음

### 자동화 현황
- 자동: Acceptance Rate (DBLP+OpenAlex), Keyword Trends (DBLP) = 30%
- 수동: Deadlines, Best Papers, Institution Ratings = 70%

### 개선 우선순위
1. 파이프라인 데이터 충돌 방지 (partial upsert)
2. Phase 1/2 별도 workflow 분리 (timeout 해소)
3. Seed 시 Zod validation 추가
4. Best Paper URL 1,108개 수집 (S2 API 키 해결 후)
5. Stale 데이터 감지 자동화 (주간 품질 리포트)
