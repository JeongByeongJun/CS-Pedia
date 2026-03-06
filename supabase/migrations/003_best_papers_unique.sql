-- 중복 best_papers 제거 (같은 conference_id + year + paper_title, 가장 오래된 것만 유지)
DELETE FROM best_papers
WHERE id NOT IN (
  SELECT DISTINCT ON (conference_id, year, paper_title, award_type) id
  FROM best_papers
  ORDER BY conference_id, year, paper_title, award_type, created_at ASC
);

-- UNIQUE 제약 추가
ALTER TABLE best_papers
  ADD CONSTRAINT best_papers_unique
  UNIQUE (conference_id, year, paper_title, award_type);
