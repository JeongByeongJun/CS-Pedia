-- Fix: recreate views with SECURITY INVOKER to respect RLS policies of the querying user.
-- Without this, views default to SECURITY DEFINER behavior (view creator's privileges),
-- which bypasses RLS and triggers Supabase Security Advisor errors.

CREATE OR REPLACE VIEW conference_with_next_deadline
WITH (security_invoker = true)
AS
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
  ORDER BY
    CASE WHEN deadlines.paper_deadline >= NOW() THEN 0 ELSE 1 END,
    CASE WHEN deadlines.paper_deadline >= NOW() THEN deadlines.paper_deadline END ASC,
    CASE WHEN deadlines.paper_deadline < NOW() THEN deadlines.paper_deadline END DESC NULLS LAST
  LIMIT 1
) d ON true;

CREATE OR REPLACE VIEW conference_latest_best_papers
WITH (security_invoker = true)
AS
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
