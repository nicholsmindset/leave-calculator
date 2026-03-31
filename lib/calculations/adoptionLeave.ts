import { ADOPTION_LEAVE, calculateDailyRate } from '@/lib/constants'

export interface AdoptionLeaveInput {
  childCitizenship: 'SC' | 'PR' | 'other'
  childAgeAtIntentMonths: number   // age of child at formal intent to adopt
  monthlySalary: number
  serviceMonths: number            // months of continuous service
}

export interface AdoptionLeaveResult {
  eligible: boolean
  eligibilityNote?: string
  totalWeeks: number
  employerPaidWeeks: number
  flexibleWeeks: number
  totalDays: number
  // Pay
  dailyRate: number
  dailyRateCapped: boolean
  govPayTotal: number
  govPayCap: number
  // Notes
  notes: string[]
}

export function calculateAdoptionLeave(input: AdoptionLeaveInput): AdoptionLeaveResult {
  const notes: string[] = []

  // ── Eligibility ─────────────────────────────────────────────────────────────
  if (input.childCitizenship !== 'SC') {
    return {
      eligible: false,
      eligibilityNote: 'Adoption Leave under the Government-Paid Maternity Leave scheme is only available when adopting a Singapore Citizen child.',
      totalWeeks: 0,
      employerPaidWeeks: 0,
      flexibleWeeks: 0,
      totalDays: 0,
      dailyRate: 0,
      dailyRateCapped: false,
      govPayTotal: 0,
      govPayCap: 0,
      notes: [],
    }
  }

  if (input.childAgeAtIntentMonths >= 12) {
    return {
      eligible: false,
      eligibilityNote: 'The child must be below 12 months old at the time of the formal intent to adopt.',
      totalWeeks: 0,
      employerPaidWeeks: 0,
      flexibleWeeks: 0,
      totalDays: 0,
      dailyRate: 0,
      dailyRateCapped: false,
      govPayTotal: 0,
      govPayCap: 0,
      notes: [],
    }
  }

  if (input.serviceMonths < ADOPTION_LEAVE.eligibility.minServiceMonths) {
    return {
      eligible: false,
      eligibilityNote: `You need at least ${ADOPTION_LEAVE.eligibility.minServiceMonths} months of continuous service with your employer to qualify for Adoption Leave.`,
      totalWeeks: 0,
      employerPaidWeeks: 0,
      flexibleWeeks: 0,
      totalDays: 0,
      dailyRate: 0,
      dailyRateCapped: false,
      govPayTotal: 0,
      govPayCap: 0,
      notes: [],
    }
  }

  // ── Eligible ─────────────────────────────────────────────────────────────────
  const totalWeeks = ADOPTION_LEAVE.weeks
  const employerPaidWeeks = ADOPTION_LEAVE.employerPaidWeeks
  const flexibleWeeks = ADOPTION_LEAVE.flexibleWeeks
  const totalDays = totalWeeks * 7

  const dailyRate = calculateDailyRate(input.monthlySalary)
  const rawDailyRate = (input.monthlySalary * 12) / 365
  const dailyRateCapped = input.monthlySalary > 0 && rawDailyRate > ADOPTION_LEAVE.dailyPayCap

  const govPayTotal = Math.min(dailyRate * totalDays, ADOPTION_LEAVE.govCapTotal)
  const govPayCap = ADOPTION_LEAVE.govCapTotal

  notes.push('Adoption Leave of 12 weeks is available to eligible adoptive mothers for a Singapore Citizen child.')
  notes.push(`First ${employerPaidWeeks} weeks are employer-paid (government reimburses up to $10,000 per 4-week period). The last ${flexibleWeeks} weeks can be taken flexibly.`)
  notes.push('Leave must be completed before the adopted child turns 1 year old.')
  notes.push('The government pay cap is $10,000 per 4-week period (incl. CPF), capped at $30,000 total.')
  notes.push('Apply through your employer. Verify current eligibility at mom.gov.sg/employment-practices/leave/adoption-leave')

  return {
    eligible: true,
    totalWeeks,
    employerPaidWeeks,
    flexibleWeeks,
    totalDays,
    dailyRate,
    dailyRateCapped,
    govPayTotal,
    govPayCap,
    notes,
  }
}
