-- ============================================
-- 006: 교수 DB (연구실 랭킹 기반)
-- ============================================

CREATE TABLE professors (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ko      TEXT NOT NULL,
  name_en      TEXT,
  university   TEXT NOT NULL,  -- e.g., "KAIST"
  department   TEXT,           -- e.g., "School of Computing"
  rank         TEXT,           -- professor / associate_professor / assistant_professor
  dblp_pid     TEXT,           -- e.g., "50/7562"
  scholar_id   TEXT,           -- Google Scholar ID
  homepage_url TEXT,
  email        TEXT,
  dblp_status  TEXT NOT NULL DEFAULT 'pending',
  -- pending | confirmed | ambiguous | not_found
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name_ko, university)
);

CREATE INDEX idx_professors_university ON professors(university);
CREATE INDEX idx_professors_dblp_pid   ON professors(dblp_pid);
CREATE INDEX idx_professors_dblp_status ON professors(dblp_status);
