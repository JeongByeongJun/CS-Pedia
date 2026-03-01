# 🎓 컨프코리아 (ConfKorea) — 서비스 설계서

> 한국 CS 연구자를 위한 학회 일정 · 우수학회 목록 · Best Paper 통합 플랫폼

---

## 1. 서비스 개요

### 문제 정의
한국 CS 대학원생/연구자는 다음 정보를 얻기 위해 **5개 이상의 사이트**를 돌아다녀야 함:
- BK21 우수학술대회 목록 (PDF)
- 한국정보과학회 우수학술대회 목록 (PDF)
- KAIST/서울대/포항공대 등 학교별 인정 학회 목록 (PDF, xlsx 등)
- 학회 데드라인 (aideadlin.es — 영문, 한국 맥락 없음)
- Best Paper 수상작 (jeffhuang.com — 영문, 한국 학교 연동 없음)

### 해결 방안
위 정보를 **하나의 한국어 웹 서비스**에 통합하여 제공

### 타겟 유저
| 유저 | 핵심 니즈 | 규모 (추정) |
|------|----------|------------|
| CS 석·박사 대학원생 | 졸업요건 학회 확인, 데드라인 관리 | ~15,000명 |
| CS 교수/연구원 | 연구 트렌드, Best Paper, 과제 실적 정리 | ~3,000명 |
| 산업계 연구자 | 학회 동향, 최신 연구 파악 | ~5,000명 |
| **합계** | | **~23,000명** |

---

## 2. 핵심 기능 (MVP)

### 2-1. 우수학회 통합 비교 ⭐ (핵심 차별화)
- BK21, 정보과학회, KAIST, 서울대, 포항공대, 성균관대 등 기관별 인정 여부를 한 테이블에서 비교
- "내 학교 설정" → 내 졸업요건에 맞는 학회만 필터링
- 학회 분야별 (AI/ML, Systems, Security, SE 등) 필터
- CCF 등급, CORE 랭킹 등 국제 지표도 함께 표시

### 2-2. 데드라인 트래커 (한국어)
- 한국 기관 인정 학회 기준으로 필터링된 데드라인
- 카운트다운 타이머 + 캘린더 뷰
- Google Calendar / 네이버 캘린더 연동 (ics export)
- 알림 설정 (이메일, 브라우저 푸시)

### 2-3. Best Paper 아카이브
- 연도별/학회별 Best Paper 수상작 정리
- 논문 제목, 저자, 초록, 원문 링크
- 간단한 트렌드 태그 (LLM, Diffusion, Systems 등)

### 2-4. 학회 상세 정보
- 학회별 acceptance rate 추이
- 개최 장소/일정 히스토리
- 관련 워크숍/튜토리얼 정보

---

## 3. 기술 스택

### 프론트엔드
```
Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
├── Shadcn/UI (컴포넌트)
└── Vercel (배포)
```

### 백엔드 / DB
```
Supabase (PostgreSQL + Auth + Realtime)
├── DB: 학회 목록, 데드라인, Best Paper 데이터
├── Auth: 소셜 로그인 (Google, Kakao)
├── Edge Functions: API 엔드포인트
└── Storage: 정적 파일 (PDF 등)
```

### 데이터 파이프라인
```
GitHub Actions (Cron Jobs)
├── DBLP API → 학회 메타데이터 동기화 (매주)
├── OpenAlex API → 논문 데이터 동기화 (매주)
├── aideadlin.es YAML → 데드라인 동기화 (매일)
└── Best Paper → 반자동 수집 (학회 시즌별)
```

### 선택 이유
- **Next.js + Vercel**: SSR/SSG로 SEO 최적화 (검색 유입 중요), 무료 티어 강력
- **Supabase**: PostgreSQL 기반이라 복잡한 쿼리 가능, 무료 티어로 시작 가능
- **GitHub Actions**: 무료 (월 2,000분), 데이터 파이프라인 충분

---

## 4. 데이터 소스 및 라이선스

| 데이터 | 소스 | 라이선스 | 상업적 이용 | 비용 |
|--------|------|---------|-----------|------|
| 학회 메타데이터 | DBLP API | CC0 | ✅ 자유 | 무료 |
| 논문 메타데이터 | OpenAlex API | CC0 | ✅ 자유 | 무료 ($1/일) |
| 데드라인 정보 | aideadlin.es YAML (MIT) | MIT | ✅ 저작권 표시 | 무료 |
| BK21 목록 | 한국연구재단 공개 PDF | 공공데이터 | ✅ (공공정보) | 무료 |
| 정보과학회 목록 | KIISE 공개 PDF | 공개자료 | ⚠️ 재배포 시 확인 필요 | 무료 |
| 학교별 목록 | 각 대학 공개 자료 | 공개자료 | ⚠️ 출처 표시 필요 | 무료 |
| Best Paper | 자체 수집 (학회 공식 발표) | 사실 정보 | ✅ (사실의 보도) | 무료 |

### ⚠️ 법적 주의사항
- 정보과학회/대학 목록: "공개된 사실 정보의 정리"이므로 저작권 이슈 낮음, 단 출처 명시 필수
- Best Paper: 수상 사실은 보도 가능, 논문 원문 무단 복제 불가 (링크만 제공)
- BK21 목록: 정부 사업 관련 공공정보이므로 활용 자유도 높음

---

## 5. DB 스키마 (핵심 테이블)

```sql
-- 학회 기본 정보
conferences (
  id, slug, name_en, name_kr, acronym,
  field, sub_field, dblp_key,
  website_url, description,
  created_at, updated_at
)

-- 기관별 인정 여부
institution_ratings (
  id, conference_id, institution,  -- 'BK21', 'KIISE', 'KAIST', 'SNU', 'POSTECH'...
  tier,                             -- 'S', 'A', 'B', 'Top' 등
  year,                             -- 목록 기준 연도
  notes
)

-- 데드라인
deadlines (
  id, conference_id, year, cycle,   -- 'spring', 'fall' 등
  abstract_deadline, paper_deadline,
  notification_date, camera_ready,
  conference_start, conference_end,
  venue, timezone, notes
)

-- Best Paper
best_papers (
  id, conference_id, year,
  paper_title, authors,
  award_type,                       -- 'best_paper', 'best_paper_runner_up', 'best_student_paper'
  abstract, paper_url, doi,
  tags                              -- ['LLM', 'RL', 'Systems']
)

-- 사용자
users (
  id, email, name,
  institution,                      -- 소속 학교
  research_field,
  notification_preferences
)

-- 사용자 북마크
bookmarks (
  id, user_id, conference_id,
  notify_before_days               -- 알림 D-day 설정
)
```

---

## 6. 비용 산출

### Phase 1: MVP (0~6개월) — 거의 무료

| 항목 | 서비스 | 티어 | 월 비용 |
|------|--------|------|--------|
| 도메인 | confkorea.com 또는 .kr | - | ₩1,250/월 (연 ₩15,000) |
| 호스팅 (프론트) | Vercel | Hobby (무료) | ₩0 |
| DB + Auth | Supabase | Free | ₩0 |
| 데이터 파이프라인 | GitHub Actions | Free (2,000분/월) | ₩0 |
| 학술 데이터 API | DBLP + OpenAlex | Free | ₩0 |
| 이메일 알림 | Resend | Free (100통/일) | ₩0 |
| 에러 모니터링 | Sentry | Free | ₩0 |
| 분석 | Google Analytics / Plausible | Free | ₩0 |
| **합계** | | | **≈ ₩1,250/월** |

### Phase 2: 성장기 (6~12개월, 유저 1,000~5,000명)

| 항목 | 서비스 | 티어 | 월 비용 |
|------|--------|------|--------|
| 도메인 | confkorea.com | - | ₩1,250/월 |
| 호스팅 | Vercel | Pro | ₩27,000/월 ($20) |
| DB + Auth | Supabase | Pro | ₩34,000/월 ($25) |
| 데이터 파이프라인 | GitHub Actions | Free | ₩0 |
| 학술 데이터 API | OpenAlex | Premium 검토 | ₩0~68,000/월 |
| 이메일 알림 | Resend | Pro | ₩27,000/월 ($20) |
| 에러 모니터링 | Sentry | Free | ₩0 |
| 분석 | Plausible | Growth | ₩12,000/월 ($9) |
| **합계** | | | **≈ ₩100,000~170,000/월** |

### Phase 3: 안정기 (12개월+, 유저 5,000명+)

| 항목 | 서비스 | 티어 | 월 비용 |
|------|--------|------|--------|
| 도메인 | - | - | ₩1,250/월 |
| 호스팅 | Vercel | Pro | ₩27,000/월 |
| DB | Supabase 또는 자체 DB | Pro+ | ₩68,000~135,000/월 |
| CDN / 캐싱 | Cloudflare | Free~Pro | ₩0~27,000/월 |
| 이메일 | Resend / AWS SES | - | ₩27,000~54,000/월 |
| LLM API (Best Paper 요약 등) | Claude API | - | ₩40,000~135,000/월 |
| **합계** | | | **≈ ₩200,000~400,000/월** |

---

## 7. 비용 요약 (한눈에)

```
Phase 1 (MVP, 0~6개월)
├── 고정비: ≈ ₩1,250/월 (도메인만)
├── 총 6개월: ≈ ₩7,500 + 본인 인건비
└── 핵심: 거의 무료로 시작 가능

Phase 2 (성장기, 6~12개월)
├── 고정비: ≈ ₩10~17만/월
├── 총 6개월: ≈ ₩60~100만
└── 이 시점에 수익모델 필요

Phase 3 (안정기, 12개월+)
├── 고정비: ≈ ₩20~40만/월
├── 연간: ≈ ₩240~480만
└── 안정적 수익 필요
```

---

## 8. 수익 모델 (선택지)

### A. 프리미엄 구독 (₩3,900~9,900/월)
- 무료: 학회 목록 조회, 기본 데드라인
- 유료: 맞춤 알림, 캘린더 연동, Best Paper 요약, 내 졸업요건 매칭
- **목표**: 유료 전환 5% → 유저 5,000명 기준 250명 × ₩5,000 = ₩125만/월

### B. 대학/연구실 단체 구독
- 연구실/학과 단위 연간 구독 (₩10~30만/년)
- BK21 사업단에 실적 관리 도구로 제안 가능

### C. 학회/학술 광고
- CS 관련 채용공고, 학회 홍보 배너
- 단가 낮지만 타겟팅 정확 (CS 대학원생)

### D. 데이터 / API 제공
- 정리된 학회 데이터를 API로 제공 (연구실, 교수 개인)
- 기관 대상 벌크 데이터

### 추천 조합
> Phase 1에서는 **완전 무료**로 유저 확보
> Phase 2에서 **프리미엄 구독(A) + 학회 광고(C)** 도입
> Phase 3에서 **대학 단체 구독(B)** 추가

---

## 9. 개발 로드맵

### Sprint 1 (1~2주): 기반 구축
- [ ] Next.js + Supabase 프로젝트 세팅
- [ ] DB 스키마 생성
- [ ] BK21/KIISE/대학별 우수학회 데이터 초기 입력 (수동, ~200개 학회)
- [ ] 기본 UI: 학회 목록 테이블 + 필터

### Sprint 2 (3~4주): 데드라인 연동
- [ ] aideadlin.es YAML 데이터 파싱 + DB 연동
- [ ] DBLP API 연동 (학회 메타데이터 보강)
- [ ] 데드라인 카운트다운 UI
- [ ] 캘린더 뷰 구현

### Sprint 3 (5~6주): 사용자 기능
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] "내 학교 설정" + 졸업요건 필터
- [ ] 학회 북마크 + 알림 설정
- [ ] ics 파일 내보내기

### Sprint 4 (7~8주): Best Paper + 마무리
- [ ] Best Paper 데이터 초기 입력 (최근 3년)
- [ ] 검색 기능 (학회명, 분야, 키워드)
- [ ] SEO 최적화 (SSG)
- [ ] 랜딩 페이지 + 소셜 공유
- [ ] **MVP 출시** 🚀

### Post-MVP
- [ ] 이메일 알림 시스템
- [ ] OpenAlex 연동 (논문 상세 데이터)
- [ ] 커뮤니티 기여 시스템 (데이터 제보/수정)
- [ ] 프리미엄 기능

---

## 10. 경쟁 분석

| 항목 | aideadlin.es | Jeff Huang | Pusnow Gist | **ConfKorea** |
|------|-------------|------------|-------------|---------------|
| 한국어 | ❌ | ❌ | ⚠️ 반반 | ✅ |
| BK21/KIISE 연동 | ❌ | ❌ | ✅ (정적) | ✅ (동적) |
| 학교별 비교 | ❌ | ❌ | ✅ (정적) | ✅ (필터) |
| 데드라인 | ✅ | ❌ | ❌ | ✅ |
| Best Paper | ❌ | ✅ | ❌ | ✅ |
| 알림 | ❌ | ❌ | ❌ | ✅ |
| 졸업요건 매칭 | ❌ | ❌ | ❌ | ✅ |
| 캘린더 연동 | ⚠️ ics만 | ❌ | ❌ | ✅ |

### 핵심 차별점
> "한국 CS 대학원생의 졸업요건과 학회 데드라인을 연결해주는 유일한 서비스"

---

## 11. 리스크 & 대응

| 리스크 | 확률 | 영향 | 대응 |
|--------|------|------|------|
| 유저 확보 실패 | 중 | 높음 | 김박사넷, 에브리타임, 학과 커뮤니티 타겟 마케팅 |
| 데이터 정확성 이슈 | 높음 | 중 | 커뮤니티 기여 시스템 + "제보하기" 버튼 |
| BK21/KIISE 목록 변경 | 낮음 | 중 | 연 1~2회 수동 업데이트 (발표 시점 모니터링) |
| 무료 서비스와 경쟁 | 중 | 중 | 한국 맥락 특화가 핵심 moat |
| 수익화 실패 | 중 | 높음 | 비용 구조가 워낙 낮아 장기 운영 가능 |

---

## 12. 요약

| 항목 | 내용 |
|------|------|
| 서비스명 | ConfKorea (가칭) |
| 타겟 | 한국 CS 대학원생·연구자 (~23,000명) |
| 핵심 기능 | BK21 학회 비교 + 데드라인 + Best Paper |
| 기술 스택 | Next.js + Supabase + Vercel |
| MVP 비용 | **≈ ₩1,250/월** (도메인만) |
| MVP 기간 | **약 8주** |
| 수익 모델 | 프리미엄 구독 + 대학 단체 구독 |
| BEP 도달 | 유료 유저 40~80명 (₩5,000/월 기준) |
