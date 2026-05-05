-- ============================================
-- 007: 교수 논문-학회 매핑 테이블
-- ============================================

CREATE TABLE professor_publications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professor_id    UUID NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
  conference_id   UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  year            INTEGER NOT NULL,
  paper_title     TEXT,
  dblp_key        TEXT,   -- DBLP paper key (e.g., "conf/nips/LeeK23")
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(professor_id, dblp_key)
);

CREATE INDEX idx_prof_pub_professor  ON professor_publications(professor_id);
CREATE INDEX idx_prof_pub_conference ON professor_publications(conference_id);
CREATE INDEX idx_prof_pub_year       ON professor_publications(year);
