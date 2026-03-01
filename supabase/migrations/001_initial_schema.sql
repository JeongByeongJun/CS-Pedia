-- ============================================
-- ConfKorea Initial Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- conferences: 학회 기본 정보
-- ============================================
CREATE TABLE conferences (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,
  name_en     TEXT NOT NULL,
  name_kr     TEXT,
  acronym     TEXT NOT NULL,
  field       TEXT NOT NULL,
  sub_field   TEXT,
  dblp_key    TEXT,
  website_url TEXT,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conferences_field ON conferences(field);
CREATE INDEX idx_conferences_acronym ON conferences(acronym);
CREATE INDEX idx_conferences_slug ON conferences(slug);

-- ============================================
-- institution_ratings: 기관별 인정 여부
-- ============================================
CREATE TABLE institution_ratings (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conference_id UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  institution   TEXT NOT NULL,
  tier          TEXT,
  year          INTEGER NOT NULL,
  notes         TEXT,
  UNIQUE(conference_id, institution, year)
);

CREATE INDEX idx_institution_ratings_conf ON institution_ratings(conference_id);
CREATE INDEX idx_institution_ratings_inst ON institution_ratings(institution);

-- ============================================
-- deadlines: 데드라인
-- ============================================
CREATE TABLE deadlines (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conference_id     UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  year              INTEGER NOT NULL,
  cycle             TEXT,
  abstract_deadline TIMESTAMPTZ,
  paper_deadline    TIMESTAMPTZ,
  notification_date TIMESTAMPTZ,
  camera_ready      TIMESTAMPTZ,
  conference_start  DATE,
  conference_end    DATE,
  venue             TEXT,
  timezone          TEXT DEFAULT 'UTC',
  notes             TEXT,
  UNIQUE(conference_id, year, cycle)
);

CREATE INDEX idx_deadlines_conf ON deadlines(conference_id);
CREATE INDEX idx_deadlines_paper ON deadlines(paper_deadline);

-- ============================================
-- acceptance_rates: Acceptance Rate 이력
-- ============================================
CREATE TABLE acceptance_rates (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conference_id UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  year          INTEGER NOT NULL,
  submitted     INTEGER,
  accepted      INTEGER,
  rate          NUMERIC(5,2),
  notes         TEXT,
  UNIQUE(conference_id, year)
);

CREATE INDEX idx_acceptance_rates_conf ON acceptance_rates(conference_id);

-- ============================================
-- best_papers: Best Paper 수상작
-- ============================================
CREATE TABLE best_papers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conference_id UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  year          INTEGER NOT NULL,
  paper_title   TEXT NOT NULL,
  authors       TEXT,
  award_type    TEXT NOT NULL DEFAULT 'best_paper',
  abstract      TEXT,
  paper_url     TEXT,
  doi           TEXT,
  tags          TEXT[],
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_best_papers_conf ON best_papers(conference_id);
CREATE INDEX idx_best_papers_year ON best_papers(year);

-- ============================================
-- users: 사용자
-- ============================================
CREATE TABLE users (
  id                       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                    TEXT,
  name                     TEXT,
  institution              TEXT,
  research_field           TEXT,
  notification_preferences JSONB DEFAULT '{}',
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- bookmarks: 북마크
-- ============================================
CREATE TABLE bookmarks (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conference_id     UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  notify_before_days INTEGER DEFAULT 7,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, conference_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE acceptance_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE best_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read conferences" ON conferences FOR SELECT USING (true);
CREATE POLICY "Public read institution_ratings" ON institution_ratings FOR SELECT USING (true);
CREATE POLICY "Public read deadlines" ON deadlines FOR SELECT USING (true);
CREATE POLICY "Public read acceptance_rates" ON acceptance_rates FOR SELECT USING (true);
CREATE POLICY "Public read best_papers" ON best_papers FOR SELECT USING (true);

-- User-scoped
CREATE POLICY "Users read own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users read own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- View: 다음 데드라인 + D-day 사전 계산
-- ============================================
CREATE OR REPLACE VIEW conference_with_next_deadline AS
SELECT
  c.*,
  d.paper_deadline AS next_deadline,
  d.year AS deadline_year,
  d.venue AS next_venue,
  d.conference_start,
  d.conference_end,
  EXTRACT(DAY FROM d.paper_deadline - NOW())::INTEGER AS days_until_deadline
FROM conferences c
LEFT JOIN LATERAL (
  SELECT *
  FROM deadlines
  WHERE deadlines.conference_id = c.id
    AND deadlines.paper_deadline >= NOW()
  ORDER BY deadlines.paper_deadline ASC
  LIMIT 1
) d ON true;

-- ============================================
-- updated_at 트리거
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER conferences_updated_at
  BEFORE UPDATE ON conferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
