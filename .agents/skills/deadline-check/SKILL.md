---
name: deadline-check
description: "ConfKorea 209개 CS 학회 CFP 데드라인 조사 스킬. 사용자가 '/deadline-check phase1' ~ '/deadline-check phase7', 또는 'phase1 조사해줘', 'deadline phase3 돌려줘' 등으로 호출. 각 phase(~30개 학회)를 6개 병렬 백그라운드 에이전트로 조사하고 scripts/deadline-report.md에 결과 기록. deadlines.json은 자동 수정 안 함. 다음 연도 CFP URL 발견 시 conferences.json website_url 업데이트 대상도 보고."
---

# Deadline Check

각 phase의 학회 목록을 병렬 에이전트로 조사하고 `scripts/deadline-report.md`에 결과를 기록한다.

**파일 자동 수정 없음.** deadlines.json / conferences.json 업데이트는 사용자가 결정 후 직접 진행.

---

## Phase별 학회 목록

**Phase 1 (30개):**
3dv, aaai, aacl, aamas, accv, acl, acml, acsac, aistats, ase, asiaccs, asiacrypt, asplos, assets, atc, avss, bibm, bigdata, bmvc, case, cases, cav, cc, ccc, ccgrid, ccs, cgo, chi, cikm, cloud

**Phase 2 (30개):**
cluster, codes-isss, cogsci, coling, colt, concur, conext, conll, corl, crypto, cscw, cseet, csf, cvpr, dac, dasfaa, date, dis, disc, dsn, eacl, ecai, eccv, ecml-pkdd, ecoop, ecrts, edbt, egsr, emnlp, emsoft

**Phase 3 (30개):**
er, esa, esem, esop, esorics, eurocrypt, eurographics, eurosys, fase, fast, fc, fg, focs, fse, gecco, hipc, hipeac, hpca, hpdc, hri, i3d, icalp, icaps, iccad, iccd, iccv, icdcs, icde, icdm, icfp

**Phase 4 (30개):**
icip, iclp, iclr, icml, icmr, icnp, icpp, icpr, icra, ics, icse, icsme, icsoc, icst, icws, ieee-vis, ieee-vr, iiswc, ijcai, ijcar, imc, infocom, interact, ipdps, iros, isaac, isca, ismar, ismb, ispass

**Phase 5 (30개):**
isrr, issre, issta, iswc, itcs, its, iui, kdd, kr, lctes, lics, lrec, mascots, mass, mdm, mfcs, miccai, micro, middleware, mobicom, mobihoc, mobilehci, mobisys, models, msr, msst, naacl, ndss, neurips, noms

**Phase 6 (30개):**
nossdav, nsdi, oopsla, osdi, pact, pakdd, percom, performance, pets, pg, pldi, podc, pods, popl, ppopp, raid, re, recomb, recsys, rss, rtas, rtss, sac, saner, sas, sc, sca, sdm, sec, secon

**Phase 7 (29개):**
sensys, sgp, sigcomm, siggraph, siggraph-asia, sigir, sigmetrics, sigmod, socc, socg, soda, sosp, soups, sp, spaa, srds, stacs, stoc, tacas, tcc, uai, ubicomp, uist, usenix-security, vldb, vrst, wacv, wsdm, www

---

## 실행 단계

### Step 1: 현재 DB 상태 파악

**두 파일을 병렬로 읽는다:**
1. `src/infrastructure/seed/deadlines.json` — 해당 phase 학회들의 현재 최신 연도(max year per slug)와 데이터 완성도
2. `src/infrastructure/seed/conferences.json` — 각 학회의 현재 `website_url` (공식 CFP 페이지 URL)

각 학회별로 확인:
- max year의 데이터 완성도 (abstract_deadline, paper_deadline, conference_start 등이 있는지)
- 데이터가 불완전하면 (예: 학회 일정만 있고 데드라인 없음) → **현재 연도도 조사 대상에 포함**
- 현재 `website_url` 값 (에이전트에게 조사 시작점으로 전달)

각 학회의 **조사할 연도** 결정:
- DB 항목 있고 데이터 완전 → `max_year` (검증) + `max_year + 1` (신규)
- DB 항목 있고 데이터 불완전 → `max_year` (보완 필수) + `max_year + 1` (신규)
- DB 항목 없음 → 현재 연도 (예: 2026)
- 짝수/홀수년 패턴 학회는 그에 맞게 조정 (예: ECCV는 짝수년만, ICCV는 홀수년만)

### Step 2: 6개 그룹으로 분할

phase의 학회들을 6개 그룹으로 균등 분할 (각 5개 내외). 마지막 그룹은 더 적을 수 있음.

### Step 3: 병렬 에이전트 6개 동시 실행

`run_in_background=true`로 **단일 메시지에 6개 모두** 동시 실행.

Codex 환경에서 `run_in_background`가 없고 `multi_agent_v1` 도구가 노출된 경우:
- 6개 그룹을 각각 `multi_agent_v1.spawn_agent`로 실행한다.
- 에이전트 타입은 조사 작업이므로 기본값 또는 `explorer`를 사용한다.
- 각 에이전트는 파일을 수정하지 않고 조사 결과만 반환한다.
- 모든 에이전트가 끝난 뒤 `multi_agent_v1.wait_agent`로 결과를 취합한다.
- 최신 CFP/데드라인 정보는 반드시 웹으로 확인한다.

각 에이전트에 전달할 프롬프트 형식:
```
다음 CS 학회들의 CFP/데드라인을 조사해줘. 오늘 날짜: [TODAY]

학회 목록:
- [slug] ([year_current]년 검증 + [year_next]년 신규 조사)
  DB 현재 데이터: abstract=[값], paper=[값], conf_date=[값] (불완전/완전)
  현재 CFP URL: [website_url 또는 "없음"]
- ...

각 학회에 대해 **두 가지** 작업:
1. **현재 연도 검증**: DB 데이터가 맞는지 공식 웹사이트에서 확인. 날짜 변경, 누락된 데드라인 있으면 보고.
   - 현재 CFP URL이 제공된 경우 **그 URL을 먼저** 방문해서 조사.
2. **다음 연도 조사**: CFP 발표 여부, abstract/paper deadline, 학회 날짜/장소.
   - 다음 연도 CFP가 발견되면 **해당 CFP 페이지 URL도 반드시 보고**.

조사 소스: 제공된 CFP URL → 공식 웹사이트 → wikicfp, conf.researchr 등

중요: ATC는 2025년에 영구 폐지됨.

**중요: 마감 시간과 timezone도 반드시 확인해줘.**
- 대부분 학회는 AoE (Anywhere on Earth) = UTC-12
- 일부 학회는 UTC, PST, EST 등 다른 timezone 사용
- 공식 CFP 페이지에서 "11:59 PM AoE", "5:00 PM EST" 등의 표기를 찾아서 보고

결과를 다음 형식으로 반환:

CONF: [slug]
--- 현재 연도 검증 ([year]) ---
VERIFY: ok / updated / incomplete
CHANGES: [변경사항 있으면 기술, 없으면 "없음"]
DEADLINE_TIME: [시간 표기, 예: "23:59 AoE", "17:00 EST", "22:00 UTC"]
--- 다음 연도 ([year+1]) ---
STATUS: found / not_announced / discontinued
ABSTRACT: [YYYY-MM-DD or N/A]
PAPER: [YYYY-MM-DD or N/A]
DEADLINE_TIME: [시간+timezone, 예: "23:59 AoE"]
CONF_DATE: [날짜 범위, 장소]
CFP_URL: [다음 연도 CFP 페이지 URL, 없으면 N/A]
NOTES: [특이사항]
```

### Step 4: 에이전트 완료 대기

모든 6개 에이전트 완료 후 결과 취합. 사용자에게 진행 상황 간략히 알림.

### Step 5: deadline-report.md 업데이트

`scripts/deadline-report.md`를 읽어서 해당 phase 섹션을 **추가** (기존 다른 phase 섹션은 유지). 파일 없으면 새로 생성.

### Step 6: website_url 업데이트 대상 판별

에이전트 결과의 `CFP_URL`을 바탕으로, 아래 규칙에 따라 `conferences.json`의 `website_url` 업데이트 대상을 판별하고 리포트에 기록한다.

**website_url 업데이트 규칙:**
1. **현재 연도 deadline이 안 지남** → 현재 URL 유지 (변경 없음)
2. **현재 연도 deadline이 지남 + 다음 연도 CFP 없음** → 현재 URL 유지 (변경 없음)
3. **현재 연도 deadline이 지남 + 다음 연도 CFP 있음** → 다음 연도 CFP URL로 교체

판별 기준:
- "deadline이 지났는지"는 `deadlines.json`의 `paper_deadline` (없으면 `abstract_deadline`)을 오늘 날짜와 비교
- 다음 연도 CFP가 있는지는 에이전트 결과의 `STATUS: found` + `CFP_URL`이 N/A가 아닌 경우

---

## deadline-report.md 형식

```markdown
# Deadline Check Report
<!-- /deadline-check 스킬 자동 관리 -->

---

## Phase N 결과 (YYYY-MM-DD)

| 학회 | DB 최신 | 검증 | 다음연도 | 상태 | Abstract | Paper | 학회 일정 | 비고 |
|------|--------|------|---------|------|----------|-------|----------|------|
| aaai | 2027 | ✅ OK | 2028 | ❌ | - | - | - | 2028 미발표 |
| cikm | 2026 | ⚠️ 수정 | 2027 | ❌ | - | - | - | DB 날짜 Oct→Nov 수정 필요 |
| atc | - | - | - | ❌ | - | - | - | ⚠️ 영구 폐지 |

**✅ 추가 대상 (N개):** slug1, slug2, ...
**⚠️ DB 수정 필요 (N개):** slug1 (내용), slug2 (내용), ...
**❌ 미발표 (N개):** slug1, slug2, ...

### 🔗 website_url 업데이트 대상

| 학회 | 현재 URL | → 새 URL | 사유 |
|------|----------|----------|------|
| icml | https://icml.cc/.../2026/... | https://icml.cc/.../2027/... | 2026 마감 + 2027 CFP 발표 |

*conferences.json 업데이트: 위 학회들의 website_url 교체 후 `pnpm seed`*

---
```

그룹 구분 없이 **Phase 단위로 알파벳순** 정렬하여 하나의 테이블로 작성.

상태 기호:
- **✅** = CFP 발표됨 (이미 마감됐더라도 데이터 가치 있음)
- **❌** = 미발표 / 해당 연도 없음 / 폐지
- **⚠️** = 폐지 또는 구조 변경

검증 열:
- **✅ OK** = DB 데이터 정확
- **⚠️ 수정** = DB 데이터에 오류 또는 누락 발견
- **➕ 보완** = DB에 데드라인 누락, 보완 가능

마지막에 항상 추가:
```
*deadlines.json 업데이트: 해당 ✅ 항목 추가 + ⚠️/➕ 항목 수정 후 `npm run seed`*
```

---

## 에이전트에서 받은 결과 해석

- `VERIFY: ok` → 검증 열에 ✅ OK
- `VERIFY: updated` → 검증 열에 ⚠️ 수정, 변경사항을 비고에 기록
- `VERIFY: incomplete` → 검증 열에 ➕ 보완, 보완할 데이터를 비고에 기록
- `STATUS: found` → ✅, abstract/paper/conf_date 기록
- `STATUS: not_announced` → ❌, 알려진 학회 날짜/장소만 비고에 기록
- `STATUS: discontinued` → ❌, 비고에 ⚠️ 폐지 표시
- Paper deadline이 이미 지났으면 날짜 뒤에 `(마감)` 표시
- 임박한 데드라인 (14일 이내)은 `← 임박` 표시
- `CFP_URL`이 유효한 URL이고 + 현재 연도 paper_deadline이 지났으면 → website_url 업데이트 대상 테이블에 추가
- `CFP_URL: N/A`이거나 현재 연도 deadline이 안 지났으면 → URL 변경 없음
