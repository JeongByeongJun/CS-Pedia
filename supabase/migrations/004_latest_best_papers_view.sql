-- View: conference_latest_best_papers
-- Returns only the most recent year's best papers per conference.
-- Used by the conference listing query to avoid fetching all historical best papers.

CREATE OR REPLACE VIEW conference_latest_best_papers AS
WITH latest_year AS (
  SELECT conference_id, MAX(year) AS max_year
  FROM best_papers
  GROUP BY conference_id
)
SELECT bp.conference_id, bp.paper_title, bp.year, bp.award_type
FROM best_papers bp
INNER JOIN latest_year ly
  ON bp.conference_id = ly.conference_id
  AND bp.year = ly.max_year;
