import {
  MATERNITY_LEAVE,
  calculateDailyRate,
  calculateGovLeavePayTotal,
  calculateEmployerLeavePayTotal,
  type CitizenshipStatus,
  type EmploymentType,
} from '@/lib/constants'

export interface MaternityLeaveInput {
  employmentType: EmploymentType
  motherCitizenship: CitizenshipStatus
  babyCitizenship: CitizenshipStatus
  childOrder: number           // 1, 2, 3+ (use 3 for all 3rd and above)
  monthlySalary: number        // 0 if not provided
  deliveryDate: Date
  serviceStartDate?: Date      // to check 90-day eligibility
}

export interface MaternityLeaveResult {
  eligible: boolean
  eligibilityIssue?: string
  leaveType: 'GPML' | 'EmploymentAct' | 'NotEligible'
  totalWeeks: number
  totalDays: number
  employerPaidWeeks: number
  employerPaidDays: number
  govPaidWeeks: number
  govPaidDays: number
  // Pay estimates (only if monthlySalary > 0)
  dailyRate: number
  dailyRateCapped: boolean
  employerPayTotal: number
  govPayTotal: number
  totalPayEstimate: number
  // Caps
  govPayCap: number
  // Timeline
  leaveStartDate?: Date
  leaveEndDate?: Date          // if delivery date provided
  flexibleEndDate?: Date       // latest date to end flexible portion
  // Notes
  notes: string[]
}

export function calculateMaternityLeave(
  input: MaternityLeaveInput
): MaternityLeaveResult {
  const notes: string[] = []
  const babySC = input.babyCitizenship === 'SC'
  const order = Math.min(input.childOrder, 3) // treat 3+ as 3

  // ── Eligibility check ──────────────────────────────────────────────────────
  let eligible = true
  let eligibilityIssue: string | undefined

  if (input.serviceStartDate) {
    const daysBefore = Math.floor(
      (input.deliveryDate.getTime() - input.serviceStartDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
    if (daysBefore < 90) {
      eligible = false
      eligibilityIssue = `You need at least 90 days of continuous service before delivery. You have approximately ${daysBefore} days.`
    }
  }

  if (input.employmentType === 'self-employed') {
    notes.push(
      'Self-employed mothers are eligible for GPML if they have operated their business for at least 3 continuous months before delivery and suffer income loss during leave.'
    )
  }

  if (!eligible) {
    return {
      eligible: false,
      eligibilityIssue,
      leaveType: 'NotEligible',
      totalWeeks: 0,
      totalDays: 0,
      employerPaidWeeks: 0,
      employerPaidDays: 0,
      govPaidWeeks: 0,
      govPaidDays: 0,
      dailyRate: 0,
      dailyRateCapped: false,
      employerPayTotal: 0,
      govPayTotal: 0,
      totalPayEstimate: 0,
      govPayCap: 0,
      notes,
    }
  }

  // ── Entitlement ────────────────────────────────────────────────────────────
  let leaveType: MaternityLeaveResult['leaveType']
  let totalWeeks: number
  let employerPaidWeeks: number
  let govPaidWeeks: number
  let govPayCap: number

  if (babySC) {
    leaveType = 'GPML'
    totalWeeks = MATERNITY_LEAVE.sc.totalWeeks // 16

    if (order >= 3) {
      // 3rd+ child: ALL 16 weeks government-reimbursed
      employerPaidWeeks = MATERNITY_LEAVE.sc.thirdPlusOrder.employerPaidWeeks
      govPaidWeeks = MATERNITY_LEAVE.sc.thirdPlusOrder.govPaidWeeks
      govPayCap = MATERNITY_LEAVE.sc.thirdPlusOrder.govCapTotal
      notes.push(
        'For 3rd or subsequent child, all 16 weeks are government-reimbursed (up to $40,000 per child order including CPF).'
      )
    } else {
      // 1st or 2nd child: first 8 employer-paid, last 8 government-reimbursed
      employerPaidWeeks = MATERNITY_LEAVE.sc.firstSecondOrder.employerPaidWeeks
      govPaidWeeks = MATERNITY_LEAVE.sc.firstSecondOrder.govPaidWeeks
      govPayCap = MATERNITY_LEAVE.sc.firstSecondOrder.govCapTotal
      notes.push(
        'First 8 weeks are paid by your employer (government reimburses). Last 8 weeks are government-paid (GPML) up to $20,000 including CPF.'
      )
    }
  } else {
    // Non-SC child: 12 weeks Employment Act (employer-paid only)
    leaveType = 'EmploymentAct'
    totalWeeks = MATERNITY_LEAVE.nonSc.totalWeeks // 12
    employerPaidWeeks = MATERNITY_LEAVE.nonSc.employerPaidWeeks
    govPaidWeeks = MATERNITY_LEAVE.nonSc.govPaidWeeks
    govPayCap = 0
    notes.push(
      'Your child is not a Singapore Citizen. You are entitled to 12 weeks of maternity leave under the Employment Act, paid entirely by your employer — no government reimbursement applies.'
    )
  }

  const totalDays = totalWeeks * 7
  const employerPaidDays = employerPaidWeeks * 7
  const govPaidDays = govPaidWeeks * 7

  // ── Pay calculation ─────────────────────────────────────────────────────────
  const rawDailyRate = (input.monthlySalary * 12) / 365
  const dailyRate = calculateDailyRate(input.monthlySalary)
  const dailyRateCapped = input.monthlySalary > 0 && rawDailyRate > 357.14

  if (dailyRateCapped) {
    notes.push(
      `Your salary exceeds the government pay cap. Government-paid leave is capped at $357.14/day ($10,000 per 28 days).`
    )
  }

  const employerPayTotal =
    input.monthlySalary > 0
      ? calculateEmployerLeavePayTotal(input.monthlySalary, employerPaidDays)
      : 0

  // Government pay is at the capped daily rate
  const govPayTotal =
    input.monthlySalary > 0 && govPaidDays > 0
      ? Math.min(
          calculateGovLeavePayTotal(input.monthlySalary, govPaidDays),
          govPayCap
        )
      : 0

  const totalPayEstimate = employerPayTotal + govPayTotal

  // ── Timeline ───────────────────────────────────────────────────────────────
  const leaveStartDate = new Date(input.deliveryDate)
  const leaveEndDate = new Date(input.deliveryDate)
  leaveEndDate.setDate(leaveEndDate.getDate() + employerPaidDays + govPaidDays)

  // Flexible portion can be taken up to 12 months after birth
  const flexibleEndDate = new Date(input.deliveryDate)
  flexibleEndDate.setFullYear(flexibleEndDate.getFullYear() + 1)

  notes.push(
    'The first 8 weeks must be taken as a continuous block. The remaining weeks can be taken flexibly (by mutual agreement with your employer) within 12 months of your child\'s birth.'
  )
  notes.push(
    'From 1 April 2025, you must give your employer at least 4 weeks\' notice before starting maternity leave.'
  )
  notes.push(
    'These are estimates. Verify your exact entitlement with your employer and MOM at mom.gov.sg.'
  )

  return {
    eligible: true,
    leaveType,
    totalWeeks,
    totalDays,
    employerPaidWeeks,
    employerPaidDays,
    govPaidWeeks,
    govPaidDays,
    dailyRate,
    dailyRateCapped,
    employerPayTotal,
    govPayTotal,
    totalPayEstimate,
    govPayCap,
    leaveStartDate,
    leaveEndDate,
    flexibleEndDate,
    notes,
  }
}
