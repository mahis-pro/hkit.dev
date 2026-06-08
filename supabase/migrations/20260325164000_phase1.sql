-- Migration Phase 1: Hardening the Core

-- 1. Real-Time Aggregations

-- Function to get Event Stream Data (Time-series bucketing)
CREATE OR REPLACE FUNCTION get_event_stream_data()
RETURNS TABLE(bucket_time text, events bigint) AS $$
BEGIN
  -- We return the last 24 hours grouped by every 4 hours, or similar.
  -- For better visualization, we'll bucket by 4 hours.
  RETURN QUERY
  SELECT 
    to_char(date_trunc('hour', timestamp), 'HH24:00') as bucket_time,
    count(*)::bigint as events
  FROM audit_logs
  WHERE timestamp >= NOW() - INTERVAL '24 hours'
  GROUP BY date_trunc('hour', timestamp)
  ORDER BY date_trunc('hour', timestamp) ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get LGA Distribution
CREATE OR REPLACE FUNCTION get_lga_distribution()
RETURNS TABLE(name text, facilities bigint, active bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(lga, 'Unknown') as name,
    count(*)::bigint as facilities,
    SUM(CASE WHEN status = 'verified' THEN 1 ELSE 0 END)::bigint as active
  FROM facilities
  GROUP BY lga
  ORDER BY facilities DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. Master Patient Index (probabilistic matching function placeholder)
-- In a real scenario, this would use pg_trgm for fuzzy matching or a custom algorithm

CREATE OR REPLACE FUNCTION find_patient_match(
    p_first_name text,
    p_last_name text,
    p_dob date,
    p_gender text
)
RETURNS TABLE(id uuid, state_health_id text, match_score float) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.state_health_id,
    -- Simple scoring mechanism:
    -- +0.4 for exact first name
    -- +0.4 for exact last name
    -- +0.1 for exact dob
    -- +0.1 for exact gender
    (
        (CASE WHEN lower(m.first_name) = lower(p_first_name) THEN 0.4 ELSE 0 END) +
        (CASE WHEN lower(m.last_name) = lower(p_last_name) THEN 0.4 ELSE 0 END) +
        (CASE WHEN m.date_of_birth = p_dob THEN 0.1 ELSE 0 END) +
        (CASE WHEN lower(m.gender) = lower(p_gender) THEN 0.1 ELSE 0 END)
    )::float AS match_score
  FROM mpi_records m
  WHERE 
    -- Only check against potential matches (e.g., share first 3 letters of last name)
    substring(lower(m.last_name) from 1 for 3) = substring(lower(p_last_name) from 1 for 3)
  ORDER BY match_score DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
