# Post-Conference Follow-up Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a repeatable post-conference workflow for best paper and keyword updates after tracked conferences end.

**Architecture:** Keep the first version read-only and report-driven. A local script reads seed/static data, classifies recently ended conferences, and produces a Markdown checklist; humans or agents then update best paper seed data and run the existing keyword pipeline when DBLP data is ready.

**Tech Stack:** TypeScript, Node.js `fs/path`, existing JSON seed files, existing Supabase seed and keyword pipeline scripts.

---

### Task 1: Add Read-Only Candidate Report

**Files:**
- Create: `scripts/post-conference-report.ts`
- Modify: `package.json`
- Output: `scripts/post-conf-report.md`

**Steps:**
1. Read `src/infrastructure/seed/deadlines.json`, `conferences.json`, and `best-papers.json`.
2. Collapse deadline cycles by `conference_slug + year`, keeping the latest `conference_end`.
3. Select conferences ending within the last 120 days or next 30 days.
4. Mark best paper status as `done`, `check`, or `too-early`.
5. Mark keyword status as `done`, `ready`, `wait`, or `no-dblp`.
6. Write `scripts/post-conf-report.md`.
7. Add `post-conf` npm script.

### Task 2: Add Classification Tests

**Files:**
- Create: `scripts/__tests__/post-conference-report.test.ts`

**Steps:**
1. Test ended conference classification.
2. Test upcoming conference classification.
3. Run `corepack pnpm test`.

### Task 3: Weekly Operation

**Commands:**
```bash
corepack pnpm post-conf
```

Review:
- `Best Paper 확인 대상`: official award/news/proceedings pages only.
- `Keyword 갱신 가능 후보`: run the existing keyword pipeline if enough DBLP titles exist.

Update:
```bash
corepack pnpm exec tsx scripts/pipeline/keywords-only.ts
corepack pnpm seed
```

### Task 4: Future Automation

Add a dedicated skill only after the report format stabilizes for 2-3 weekly runs. The skill should delegate official source verification, keep HOLD items out of seed updates, and reuse this report as its input queue.
