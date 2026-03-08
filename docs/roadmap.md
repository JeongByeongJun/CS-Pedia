# CS-Pedia 로드맵

> 작성일: 2026-03-08

## 경쟁 환경 요약

| 사이트 | 상태 | 관련성 |
|--------|------|--------|
| aideadlin.es | 유지보수 중단 (2025) | 직접 대체 기회 |
| Papers with Code | 2025.07 종료 | Best Paper 공백 |
| CSERIC | 서버 다운 | 한국 경쟁자 없음 |
| CCFDdl | 중국용, 활성 | 참고 모델 |
| CSRankings | 활성, 영어전용 | 부분 겹침 |

**결론: 한국어 + BK21/KIISE + 데드라인 + 채택률 + Best Paper = CS-Pedia가 유일**

---

## 즉시 할 것

### 1. award_type 정규화
현재 best-papers.json에 "best_paper"(enum)과 "Best Paper Award"(문자열)이 섞여 있음.

목표 enum:
```
best_paper, best_paper_runner_up, best_student_paper,
distinguished_paper, test_of_time, honorable_mention, outstanding_paper
```

작업: Python 스크립트로 전체 일괄 변환 → seed → Zod 스키마 확장

### 2. 데드라인 빈 학회 채우기
현재 144개 학회 중 81개만 데드라인 있음. weekly-update 스킬의 New CFP Check 태스크 실행.

### 3. CHI 2024 / 이전 연도 Best Papers
CHI 2025 50개 완료. 2024, 2023, 2022, 2021도 같은 방식으로 추가.

---

## 1~2주

### 4. 캘린더 내보내기 (.ics)
- `/api/calendar/[slug].ics` 엔드포인트 (개별 학회)
- `/api/calendar/bookmarks.ics` (북마크 전체, 로그인 필요)
- 학회 상세 페이지에 "Google Calendar 추가" 버튼

### 5. Best Paper에 arXiv / 코드 링크
- best_papers 테이블에 `arxiv_url`, `code_url` 컬럼 추가
- 주요 학회(NeurIPS/ICML/ICLR) 수동 입력
- 장기: Semantic Scholar API로 자동 enrichment

### 6. NeurIPS / ICML / ICLR Best Papers
연도별 best paper 리스트 수집 및 추가 (2021-2024)

---

## 1달

### 7. 이메일 알림 시스템
- 북마크 학회 데드라인 D-30, D-7, D-1 이메일
- Supabase Edge Functions + Resend API
- 알림 설정 UI (mypage에 통합)

### 8. 개인화 데드라인 뷰
- 유저 research_field 기반 추천 학회
- mypage에 "내 분야 다음 데드라인" 섹션

### 9. 오류 신고 기능
- 각 학회 페이지에 "정보 오류 신고" 버튼
- GitHub Issue 자동 생성 or 폼 제출

---

## 장기 전략

### 10. 논문 제출 트래커 (개인)
상태: 준비중 → 제출완료 → 리뷰중 → 결과대기 → 채택/불채택
데드라인 정보와 자연 연동

### 11. 기관별 실적 뷰
"KAIST 전산학부가 많이 채택된 학회 TOP 10"
Semantic Scholar API 기관 필터 활용

### 12. OpenReview 데이터 연동
ICLR/NeurIPS 리뷰 점수 분포 시각화

### 13. 카카오 알림톡
이메일 알림 이후 단계. 한국 연구자 대상 임팩트 최대.

---

## UX 개선 목록

| 현재 문제 | 개선 방향 |
|-----------|----------|
| 학회 카드에 BK21 티어 안 보임 | 카드에 인정 기관 뱃지 표시 |
| 채택률 없는 학회 구분 안 됨 | "채택률 데이터 없음" 명시 |
| 모바일 필터 불편 | 모바일 전용 필터 시트 |
| 데드라인 없는 학회 구분 안 됨 | "올해 CFP 미발표" 뱃지 |
| 정렬 옵션 부족 | "BK21 점수순" 정렬 추가 |

---

## 데이터 현황 (2026-03-08 기준)

| 항목 | 수량 | 비고 |
|------|------|------|
| 학회 | 144개 | 13개 분야 |
| 데드라인 | 81개 | 주로 2026 |
| Best Papers | 983개 | 2020-2025 |
| Acceptance Rates | 198개 | 2020+ |
| 기관 인정 | 373개 | BK21/KIISE 중심 |
