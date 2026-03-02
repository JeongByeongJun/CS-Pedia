-- ============================================
-- keyword_trends: 학회별 키워드 빈도 추이
-- ============================================
CREATE TABLE keyword_trends (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conference_id UUID NOT NULL REFERENCES conferences(id) ON DELETE CASCADE,
  year          INTEGER NOT NULL,
  keyword       TEXT NOT NULL,
  count         INTEGER NOT NULL DEFAULT 0,
  UNIQUE(conference_id, year, keyword)
);

CREATE INDEX idx_keyword_trends_conf ON keyword_trends(conference_id);
CREATE INDEX idx_keyword_trends_year ON keyword_trends(year);
CREATE INDEX idx_keyword_trends_keyword ON keyword_trends(keyword);

ALTER TABLE keyword_trends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read keyword_trends" ON keyword_trends FOR SELECT USING (true);
