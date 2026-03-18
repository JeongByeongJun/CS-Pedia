# CS-Pedia 플랫폼 리서치 (2026-03-11)

경쟁사 분석, 기능 아이디어, 수익화 방향 정리.

---

## 경쟁사 핵심 기능 비교

| 기능 | aideadlin.es | ccf-deadlines | deadlines.info | CS-Pedia |
|------|-------------|---------------|----------------|----------|
| 실시간 카운트다운 | ✅ | ✅ | ✅ | ❌ |
| 구글캘린더/iCal export | ✅ | ✅ | ✅ | ❌ |
| 이메일 알림 | ❌ | ❌ | ❌ | ❌ |
| 분야별 멀티셀렉트 | ✅ | ✅ | ✅ | 부분 |
| 다크모드 | ❌ | ✅ | ✅ | ❌ |
| CORE 랭킹 (A*/A/B/C) | ❌ | ✅ | ✅ | ❌ |
| 캘린더 뷰 | ❌ | ❌ | ✅ | ❌ |
| Abstract deadline 분리 | ✅ | ✅ | ✅ | 부분 |
| BK21/KIISE 등급 | ❌ | ❌ | ❌ | ✅ |
| Acceptance rate | ❌ | ❌ | 부분 | ✅ |
| Best papers | ❌ | ❌ | ❌ | ✅ |
| 한국어 UI | ❌ | ❌ | ❌ | ✅ |

---

## 새 기능 아이디어 (우선순위순)

### P0 — 빠르게, 임팩트 큼

**1. 이메일 알림 (D-30 / D-7 / D-1)**
- 북마크한 학회 데드라인 알림
- Supabase Edge Functions + Resend로 구현 가능
- 경쟁사 전부 없음 → 독보적 retention 기능

**2. 구글 캘린더 / iCal export**
- 북마크 학회를 .ics 파일로 export
- ccf-deadlines GitHub 8.8k stars의 핵심 이유
- `ical.js` 라이브러리로 3~5일 구현

**3. 다크모드**
- 개발자/연구자 타겟 도구에서 사실상 필수
- `next-themes` + Tailwind CSS 4로 1~2일

**4. 실시간 카운트다운**
- "D-47" 대신 "47일 13시간" 실시간 표시
- 마감 임박 시 빨간색 하이라이트

### P1 — 차별화 강화

**5. BK21 점수 계산기**
- "내 논문 목록 입력 → BK21 IF 점수 자동 계산"
- 전 세계 어떤 사이트도 없는 기능
- 대학원생 retention 극대화

**6. 기관별 필터**
- "KAIST 기준만 보기", "BK21 기준만 보기"
- 현재 기관 등급 데이터 있으나 필터 미활용

**7. 캘린더 뷰 (월간)**
- 데드라인 분포를 달력으로 시각화

**8. Acceptance Rate 스파크라인 트렌드**
- 컨퍼런스 카드에 미니 트렌드 차트 삽입
- "올해 더 어려워지고 있나?" 한눈에

### P2 — 중장기

**9. AI 논문-학회 매칭 추천**
- 초록 입력 → 맞는 학회 Top 5 추천 (BK21 등급 + acceptance rate 종합)
- CSPaper.org가 이 방향 개척 중

**10. 학회 리뷰/후기**
- "이 학회 가봤어요" — 분위기, 네트워킹, 위치
- 김박사넷 교수 평가 모델을 학회에 적용

**11. Best Paper 키워드 트렌드 분석**
- "최근 3년 Best Paper에서 자주 나오는 키워드"
- 이미 1271개 데이터 있음 — 활용 미흡

---

## 수익화 아이디어

### 단기
- **Google AdSense** — 이미 적용 중. 트래픽 1,000명/일 기준 월 $30~300
- **Ko-fi / GitHub Sponsors** — 오픈소스 기부 모델

### 중기
- **Freemium 구독** (월 ₩7,000~15,000)
  - 무료: 학회 조회, 북마크 5개
  - 유료: 이메일 알림 + 무제한 북마크 + BK21 계산기 + iCal export + 광고 없음
  - Connected Papers가 월 $3으로 성공한 모델

- **연구실/기관 팀 플랜** (월 $20~50)
  - PI가 팀 전체 구독 → BK21 사업단 단위 접근

### 장기
- **채용 공고 보드** — AI/ML 인턴십, RA 포지션
  - 우리 타겟(CS 대학원생)이 정확히 채용 타겟
  - 공고 1건 게재료 ₩50,000~200,000
- **학회 스폰서십** — 한국 개최 학회 (AAAI 2026 서울 등) 상단 노출

---

## 지적할 점 (Fix)

1. **Abstract deadline이 Full paper deadline과 분리 안 됨** — 실제로 먼저 제출해야 하는데 놓칠 위험
2. **데드라인 마지막 업데이트 날짜 미표시** — 신뢰성 문제
3. **학회 검색 자동완성 없음** — "neur" 치면 NeurIPS 나와야 함
4. **모바일 UX** — 데드라인 확인은 스마트폰에서 많이 함

---

## CS-Pedia의 고유 경쟁 우위

경쟁사 어디에도 없는 것:
- **한국어 UI** — 진입장벽 0
- **BK21/KIISE/KAIST/SNU/POSTECH 통합 등급** — 전 세계 유일
- **데드라인 + 등급 + Acceptance Rate + Best Paper 원스톱**

**전략:** 해외 경쟁사 모방 말고 "Korean CS Research Hub"로 포지셔닝. 한국 연구자가 학회 결정할 때 CS-Pedia만 열면 되는 플랫폼.

---

## 참고 사이트
- [aideadlin.es](https://aideadlin.es) — 실시간 카운트다운 UX 참고
- [ccf-deadlines](https://ccfddl.github.io) — 8.8k stars, iCal/커뮤니티 기여 모델
- [deadlines.info](https://deadlines.info) — 캘린더 뷰, CORE 랭킹
- [openaccept.org](https://openaccept.org) — Acceptance rate 스파크라인
- [cspaper.org](https://cspaper.org) — AI 리뷰 프리미엄 수익화 모델
- [research.com](https://research.com/conference-rankings/computer-science) — Impact Score
- [김박사넷 BK21 토론](https://phdkim.net/board/free/60348) — 한국 pain point
