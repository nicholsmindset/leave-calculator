-- ============================================================
-- parentalleavecalculator.com — Initial Schema
-- Run in Supabase SQL editor (region: ap-southeast-1 / Singapore)
-- ============================================================

-- ── Shareable calculation results ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leave_calculations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_code  VARCHAR(12) UNIQUE NOT NULL,
  leave_type  VARCHAR(50) NOT NULL,  -- 'maternity' | 'paternity' | 'childcare' | 'spl' | 'baby-bonus' | 'pay'
  inputs      JSONB NOT NULL,        -- calculator inputs (serialised)
  results     JSONB NOT NULL,        -- calculated outputs (serialised)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '90 days'
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_leave_calculations_share_code
  ON leave_calculations (share_code);

CREATE INDEX IF NOT EXISTS idx_leave_calculations_expires_at
  ON leave_calculations (expires_at);

-- ── Live policy data (update without redeploy) ────────────────────────────────

CREATE TABLE IF NOT EXISTS leave_policies (
  id             SERIAL PRIMARY KEY,
  leave_type     VARCHAR(50) NOT NULL,
  effective_date DATE NOT NULL,
  policy_data    JSONB NOT NULL,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leave_policies_leave_type
  ON leave_policies (leave_type, effective_date DESC);

-- ── Anonymous analytics (no PII) ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS calculation_events (
  id                SERIAL PRIMARY KEY,
  leave_type        VARCHAR(50),
  employment_type   VARCHAR(50),
  child_order       INT,
  citizenship       VARCHAR(10),
  has_salary        BOOLEAN,
  result_shared     BOOLEAN DEFAULT FALSE,
  session_id        VARCHAR(50),    -- random session ID, never tied to a user
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calculation_events_created_at
  ON calculation_events (created_at);

CREATE INDEX IF NOT EXISTS idx_calculation_events_leave_type
  ON calculation_events (leave_type, created_at DESC);

-- ── Email subscribers (policy update notifications) ───────────────────────────

CREATE TABLE IF NOT EXISTS subscribers (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  leave_types TEXT[],          -- which leave types they want to hear about
  confirmed   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE leave_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public can read any leave_calculation (to load shared results)
DROP POLICY IF EXISTS "Public read by share_code" ON leave_calculations;
CREATE POLICY "Public read by share_code" ON leave_calculations
  FOR SELECT USING (true);

-- Public can insert new calculations
DROP POLICY IF EXISTS "Public insert calculations" ON leave_calculations;
CREATE POLICY "Public insert calculations" ON leave_calculations
  FOR INSERT WITH CHECK (true);

-- Public can read all active leave policies
DROP POLICY IF EXISTS "Public read policies" ON leave_policies;
CREATE POLICY "Public read policies" ON leave_policies
  FOR SELECT USING (true);

-- Public can insert analytics events (no PII)
DROP POLICY IF EXISTS "Public insert events" ON calculation_events;
CREATE POLICY "Public insert events" ON calculation_events
  FOR INSERT WITH CHECK (true);

-- ── Automatic cleanup of expired calculations ──────────────────────────────────
-- Run nightly via pg_cron or a scheduled Edge Function

-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule('cleanup-expired-calculations', '0 3 * * *',
--   'DELETE FROM leave_calculations WHERE expires_at < NOW()');
