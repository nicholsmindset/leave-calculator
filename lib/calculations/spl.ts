import {
  SHARED_PARENTAL_LEAVE,
  getSPLEntitlementWeeks,
  calculateDailyRate,
  type EmploymentType,
} from '@/lib/constants'

export interface SPLInput {
  birthDate: Date
  motherEmploymentType: EmploymentType
  fatherEmploymentType: EmploymentType
  motherMonthlySalary: number
  fatherMonthlySalary: number
  // How many weeks the father wants to take (0 to totalWeeks)
  weeksSplitToFather?: number
  // Both parents must meet eligibility
  motherEligible: boolean
  fatherEligible: boolean
  fatherIsMarried: boolean
}

export interface SPLResult {
  eligible: boolean
  eligibilityIssue?: string
  phase: 1 | 2
  totalSPLWeeks: 6 | 10
  totalFamilyLeaveWeeks: number    // GPML + GPPL + SPL
  // Split
  motherSPLWeeks: number
  fatherSPLWeeks: number
  motherSPLDays: number
  fatherSPLDays: number
  // Pay
  motherDailyRate: number
  fatherDailyRate: number
  motherSPLPay: number
  fatherSPLPay: number
  totalSPLPay: number
  govCapPerWeek: number
  // Scenarios for "what-if" display
  scenarios: Array<{
    label: string
    motherWeeks: number
    fatherWeeks: number
    motherPay: number
    fatherPay: number
  }>
  notes: string[]
}

export function calculateSPL(input: SPLInput): SPLResult {
  const notes: string[] = []

  // ── Eligibility ──────────────────────────────────────────────────────────
  let eligible = true
  let eligibilityIssue: string | undefined

  if (!input.motherEligible) {
    eligible = false
    eligibilityIssue = 'Mother must be eligible for GPML (at least 90 days\' service, SC child) before SPL can be used.'
  } else if (!input.fatherIsMarried) {
    eligible = false
    eligibilityIssue = 'Father must be or have been lawfully married to the mother to be eligible for SPL.'
  } else if (!input.fatherEligible) {
    eligible = false
    eligibilityIssue = 'Father must also meet eligibility (at least 90 days\' service with the same employer).'
  }

  // ── Phase and entitlement ─────────────────────────────────────────────────
  const totalSPLWeeks = getSPLEntitlementWeeks(input.birthDate)
  const phase: 1 | 2 = totalSPLWeeks === 10 ? 2 : 1

  if (phase === 1) {
    notes.push(
      `Your baby was born before 1 April 2026. You have access to ${totalSPLWeeks} weeks of Shared Parental Leave (Phase 1).`
    )
  } else {
    notes.push(
      `Your baby was born on or after 1 April 2026. You have access to ${totalSPLWeeks} weeks of Shared Parental Leave (Phase 2). Combined with 16 weeks GPML and 4 weeks GPPL, your family has a total of 30 weeks of paid parental leave!`
    )
  }

  if (!eligible) {
    return {
      eligible: false,
      eligibilityIssue,
      phase,
      totalSPLWeeks,
      totalFamilyLeaveWeeks: 0,
      motherSPLWeeks: 0,
      fatherSPLWeeks: 0,
      motherSPLDays: 0,
      fatherSPLDays: 0,
      motherDailyRate: 0,
      fatherDailyRate: 0,
      motherSPLPay: 0,
      fatherSPLPay: 0,
      totalSPLPay: 0,
      govCapPerWeek: SHARED_PARENTAL_LEAVE.govCapPerWeek,
      scenarios: [],
      notes,
    }
  }

  // ── Split ────────────────────────────────────────────────────────────────
  const defaultFatherWeeks =
    phase === 2
      ? SHARED_PARENTAL_LEAVE.phase2.defaultPerParent
      : SHARED_PARENTAL_LEAVE.phase1.defaultPerParent

  const fatherSPLWeeks = Math.min(
    Math.max(input.weeksSplitToFather ?? defaultFatherWeeks, 0),
    totalSPLWeeks
  )
  const motherSPLWeeks = totalSPLWeeks - fatherSPLWeeks

  const motherSPLDays = motherSPLWeeks * 7
  const fatherSPLDays = fatherSPLWeeks * 7

  // ── Pay ─────────────────────────────────────────────────────────────────
  const motherDailyRate = calculateDailyRate(input.motherMonthlySalary)
  const fatherDailyRate = calculateDailyRate(input.fatherMonthlySalary)

  const motherSPLPay =
    input.motherMonthlySalary > 0
      ? Math.min(
          motherDailyRate * motherSPLDays,
          motherSPLWeeks * SHARED_PARENTAL_LEAVE.govCapPerWeek
        )
      : 0

  const fatherSPLPay =
    input.fatherMonthlySalary > 0
      ? Math.min(
          fatherDailyRate * fatherSPLDays,
          fatherSPLWeeks * SHARED_PARENTAL_LEAVE.govCapPerWeek
        )
      : 0

  const totalSPLPay = motherSPLPay + fatherSPLPay
  const totalFamilyLeaveWeeks = 16 + (phase === 2 ? 4 : 4) + totalSPLWeeks // GPML + GPPL + SPL

  // ── Scenarios ────────────────────────────────────────────────────────────
  const buildScenario = (
    label: string,
    mWeeks: number,
    fWeeks: number
  ) => {
    const mDays = mWeeks * 7
    const fDays = fWeeks * 7
    return {
      label,
      motherWeeks: mWeeks,
      fatherWeeks: fWeeks,
      motherPay:
        input.motherMonthlySalary > 0
          ? Math.min(motherDailyRate * mDays, mWeeks * SHARED_PARENTAL_LEAVE.govCapPerWeek)
          : 0,
      fatherPay:
        input.fatherMonthlySalary > 0
          ? Math.min(fatherDailyRate * fDays, fWeeks * SHARED_PARENTAL_LEAVE.govCapPerWeek)
          : 0,
    }
  }

  const defaultLabel =
    totalSPLWeeks === 10 ? '5 weeks each (default)' : '3 weeks each (default)'
  const defaultSplit = totalSPLWeeks === 10 ? 5 : 3

  const scenarios = [
    buildScenario(defaultLabel, defaultSplit, defaultSplit),
    buildScenario('Father takes all', 0, totalSPLWeeks),
    buildScenario('Mother takes all', totalSPLWeeks, 0),
    buildScenario(
      totalSPLWeeks === 10 ? 'Father 7 weeks, Mother 3' : 'Father 4, Mother 2',
      totalSPLWeeks === 10 ? 3 : 2,
      totalSPLWeeks === 10 ? 7 : 4
    ),
  ]

  notes.push(
    'SPL is a separate pool of leave from GPML and GPPL — it is taken AFTER each parent has fully used their own parental leave entitlement.'
  )
  notes.push(
    'Both parents can reallocate SPL freely (0 to the total pool). The default split is equal, but one parent can take all weeks.'
  )
  notes.push(
    'Give your employer at least 4 weeks\' notice. SPL must be taken within 12 months of your child\'s birth.'
  )
  notes.push(
    'Pay is capped at $2,500 per week per parent ($357.14/day) including CPF.'
  )

  return {
    eligible: true,
    phase,
    totalSPLWeeks,
    totalFamilyLeaveWeeks,
    motherSPLWeeks,
    fatherSPLWeeks,
    motherSPLDays,
    fatherSPLDays,
    motherDailyRate,
    fatherDailyRate,
    motherSPLPay,
    fatherSPLPay,
    totalSPLPay,
    govCapPerWeek: SHARED_PARENTAL_LEAVE.govCapPerWeek,
    scenarios,
    notes,
  }
}
