import {
  PATERNITY_LEAVE,
  calculateDailyRate,
  type CitizenshipStatus,
  type EmploymentType,
} from '@/lib/constants'

export interface PaternityLeaveInput {
  employmentType: EmploymentType
  babyCitizenship: CitizenshipStatus
  monthlySalary: number
  birthDate?: Date
  isMarried: boolean
  serviceStartDate?: Date
}

export interface PaternityLeaveResult {
  eligible: boolean
  eligibilityIssue?: string
  weeks: number
  days: number
  govPayTotal: number
  govPayCap: number
  dailyRate: number
  dailyRateCapped: boolean
  canSplit: boolean
  mustTakeWithinMonths: number
  lastDateToUse?: Date
  splitOptions: Array<{ label: string; weeks: number[] }>
  notes: string[]
}

export function calculatePaternityLeave(
  input: PaternityLeaveInput
): PaternityLeaveResult {
  const notes: string[] = []
  const babySC = input.babyCitizenship === 'SC'

  // ── Eligibility ─────────────────────────────────────────────────────────────
  let eligible = true
  let eligibilityIssue: string | undefined

  if (!input.isMarried) {
    eligible = false
    eligibilityIssue =
      'Paternity leave (GPPL) requires the father to be or have been lawfully married to the child\'s mother. Unwed fathers generally do not qualify for GPPL.'
  }

  if (input.serviceStartDate && input.birthDate) {
    const daysBefore = Math.floor(
      (input.birthDate.getTime() - input.serviceStartDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
    if (daysBefore < 90) {
      eligible = false
      eligibilityIssue = `You need at least 90 days of continuous service before your child's birth. You have approximately ${daysBefore} days.`
    }
  }

  if (input.employmentType === 'self-employed') {
    notes.push(
      'Self-employed fathers are eligible for GPPL if they have operated their business for at least 3 continuous months before the child\'s birth and suffer income loss during leave.'
    )
  }

  if (!eligible) {
    return {
      eligible: false,
      eligibilityIssue,
      weeks: 0,
      days: 0,
      govPayTotal: 0,
      govPayCap: 0,
      dailyRate: 0,
      dailyRateCapped: false,
      canSplit: false,
      mustTakeWithinMonths: 12,
      splitOptions: [],
      notes,
    }
  }

  // ── Entitlement ─────────────────────────────────────────────────────────────
  const config = babySC ? PATERNITY_LEAVE.sc : PATERNITY_LEAVE.nonSc
  const weeks = config.weeks
  const days = weeks * 7

  if (!babySC) {
    notes.push(
      'Your child is not a Singapore Citizen. You are entitled to 2 weeks of GPPL.'
    )
  } else {
    notes.push(
      'Your child is a Singapore Citizen. You are entitled to 4 weeks of GPPL (updated from 1 April 2025).'
    )
  }

  // ── Pay ──────────────────────────────────────────────────────────────────────
  const rawDailyRate = (input.monthlySalary * 12) / 365
  const dailyRate = calculateDailyRate(input.monthlySalary)
  const dailyRateCapped = input.monthlySalary > 0 && rawDailyRate > 357.14

  const govPayTotal =
    input.monthlySalary > 0
      ? Math.min(dailyRate * days, config.govCapTotal)
      : 0

  if (dailyRateCapped) {
    notes.push(
      'Government-paid leave is capped at $357.14/day ($2,500/week, up to $10,000 for 4 weeks including CPF).'
    )
  }

  // ── Split options ─────────────────────────────────────────────────────────
  const splitOptions =
    weeks === 4
      ? [
          { label: 'All at once (4 weeks continuous)', weeks: [4] },
          { label: '2 weeks + 2 weeks', weeks: [2, 2] },
          { label: '1 week + 1 week + 2 weeks', weeks: [1, 1, 2] },
          { label: '1 week + 3 weeks', weeks: [1, 3] },
        ]
      : [
          { label: 'All at once (2 weeks continuous)', weeks: [2] },
          { label: '1 week + 1 week', weeks: [1, 1] },
        ]

  // ── Last date to use ──────────────────────────────────────────────────────
  let lastDateToUse: Date | undefined
  if (input.birthDate) {
    lastDateToUse = new Date(input.birthDate)
    lastDateToUse.setMonth(lastDateToUse.getMonth() + 12)
  }

  notes.push(
    'GPPL must be taken within 12 months of your child\'s birth. You can take it in flexible blocks.'
  )
  notes.push(
    'From 1 April 2025, give your employer at least 4 weeks\' notice before taking paternity leave.'
  )
  notes.push(
    'These are estimates. Verify with your employer and MOM at mom.gov.sg.'
  )

  return {
    eligible: true,
    weeks,
    days,
    govPayTotal,
    govPayCap: config.govCapTotal,
    dailyRate,
    dailyRateCapped,
    canSplit: PATERNITY_LEAVE.canSplit,
    mustTakeWithinMonths: PATERNITY_LEAVE.mustTakeWithinMonths,
    lastDateToUse,
    splitOptions,
    notes,
  }
}
