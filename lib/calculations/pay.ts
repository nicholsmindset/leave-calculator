import { calculateDailyRate, MATERNITY_LEAVE } from '@/lib/constants'

export type LeaveSegmentType =
  | 'maternity-employer'
  | 'maternity-gov'
  | 'paternity'
  | 'spl'
  | 'childcare'
  | 'ecl'
  | 'unpaid'

export interface LeaveSegment {
  type: LeaveSegmentType
  label: string
  days: number
  paidBy: 'employer' | 'government' | 'unpaid'
  dailyAmount: number
  totalAmount: number
  cappedAt?: number
}

export interface MonthlyIncome {
  month: number               // 1-indexed
  label: string               // e.g. "Month 1 (Apr 2026)"
  grossIncome: number
  leaveIncome: number
  inLeave: boolean
  leaveType?: string
}

export interface PayCalculatorInput {
  monthlySalary: number
  annualBonus: number         // one-off AWS / bonus (0 if none)
  bonusPayMonth: number       // which month bonus is paid (1–12)
  // Which leave types to include
  maternityWeeks?: number     // total weeks (0 = not included)
  paternityWeeks?: number
  splWeeks?: number
  leaveStartMonth: number     // 1 = Jan, 12 = Dec
  leaveStartYear: number
  // Options
  includeCPFNote: boolean
}

export interface PayCalculatorResult {
  segments: LeaveSegment[]
  monthlyBreakdown: MonthlyIncome[]
  totalLeaveIncome: number
  totalGovernmentPaid: number
  totalEmployerPaid: number
  totalUnpaid: number
  dailyRate: number
  dailyRateCapped: boolean
  cpfNote: string
  notes: string[]
}

/** Build a label like "Apr 2026" from month (1-based) and year */
function monthLabel(month: number, year: number): string {
  return new Date(year, month - 1, 1).toLocaleString('en-SG', {
    month: 'short',
    year: 'numeric',
  })
}

export function calculatePayDuringLeave(
  input: PayCalculatorInput
): PayCalculatorResult {
  const notes: string[] = []
  const segments: LeaveSegment[] = []

  const dailyRate = calculateDailyRate(input.monthlySalary)
  const rawDailyRate = (input.monthlySalary * 12) / 365
  const dailyRateCapped = input.monthlySalary > 0 && rawDailyRate > MATERNITY_LEAVE.dailyPayCap

  const weeklyRate = dailyRate * 7
  const perWeekGovCap = 2500 // = $357.14 × 7 ≈ $2,500

  // ── Maternity leave segments ─────────────────────────────────────────────
  if (input.maternityWeeks && input.maternityWeeks > 0) {
    const matWeeks = input.maternityWeeks
    // Typical: first 8 employer-paid, next 8 government-paid
    const employerWeeks = Math.min(matWeeks, 8)
    const govWeeks = Math.max(0, matWeeks - 8)

    const employerDays = employerWeeks * 7
    const govDays = govWeeks * 7

    const employerTotal = dailyRate * employerDays
    const govTotal = Math.min(dailyRate * govDays, govWeeks * perWeekGovCap)

    segments.push({
      type: 'maternity-employer',
      label: `Maternity Leave — Employer Paid (${employerWeeks} wks)`,
      days: employerDays,
      paidBy: 'employer',
      dailyAmount: dailyRate,
      totalAmount: employerTotal,
    })

    if (govDays > 0) {
      segments.push({
        type: 'maternity-gov',
        label: `Maternity Leave — Government Paid / GPML (${govWeeks} wks)`,
        days: govDays,
        paidBy: 'government',
        dailyAmount: dailyRate,
        totalAmount: govTotal,
        cappedAt: govWeeks * perWeekGovCap,
      })
    }
  }

  // ── Paternity leave ──────────────────────────────────────────────────────
  if (input.paternityWeeks && input.paternityWeeks > 0) {
    const pDays = input.paternityWeeks * 7
    const pTotal = Math.min(dailyRate * pDays, input.paternityWeeks * perWeekGovCap)
    segments.push({
      type: 'paternity',
      label: `Paternity Leave / GPPL (${input.paternityWeeks} wks)`,
      days: pDays,
      paidBy: 'government',
      dailyAmount: dailyRate,
      totalAmount: pTotal,
      cappedAt: input.paternityWeeks * perWeekGovCap,
    })
  }

  // ── Shared Parental Leave ────────────────────────────────────────────────
  if (input.splWeeks && input.splWeeks > 0) {
    const splDays = input.splWeeks * 7
    const splTotal = Math.min(dailyRate * splDays, input.splWeeks * perWeekGovCap)
    segments.push({
      type: 'spl',
      label: `Shared Parental Leave / SPL (${input.splWeeks} wks)`,
      days: splDays,
      paidBy: 'government',
      dailyAmount: dailyRate,
      totalAmount: splTotal,
      cappedAt: input.splWeeks * perWeekGovCap,
    })
  }

  // ── Totals from segments ─────────────────────────────────────────────────
  const totalLeaveIncome = segments.reduce((sum, s) => sum + s.totalAmount, 0)
  const totalGovernmentPaid = segments
    .filter((s) => s.paidBy === 'government')
    .reduce((sum, s) => sum + s.totalAmount, 0)
  const totalEmployerPaid = segments
    .filter((s) => s.paidBy === 'employer')
    .reduce((sum, s) => sum + s.totalAmount, 0)
  const totalUnpaid = segments
    .filter((s) => s.paidBy === 'unpaid')
    .reduce((sum, s) => sum + s.totalAmount, 0)

  // ── Monthly income breakdown ─────────────────────────────────────────────
  const totalLeaveDays = segments.reduce((sum, s) => sum + s.days, 0)
  const totalLeaveWeeks = Math.ceil(totalLeaveDays / 7)
  const totalLeaveMonths = Math.ceil(totalLeaveWeeks / 4) + 1 // add 1 buffer

  const monthlyBreakdown: MonthlyIncome[] = []

  let remainingLeaveDays = totalLeaveDays
  let segmentIndex = 0
  let segmentDaysUsed = 0

  for (let i = 0; i < Math.max(totalLeaveMonths + 2, 6); i++) {
    const month = ((input.leaveStartMonth - 1 + i) % 12) + 1
    const year =
      input.leaveStartYear + Math.floor((input.leaveStartMonth - 1 + i) / 12)
    const daysInMonth = new Date(year, month, 0).getDate()

    const inLeave = remainingLeaveDays > 0

    let leaveIncome = 0
    let leaveType: string | undefined
    const daysAccountedThisMonth = Math.min(remainingLeaveDays, daysInMonth)

    if (inLeave && daysAccountedThisMonth > 0) {
      // Distribute daily rate across current leave segment
      let daysLeft = daysAccountedThisMonth
      let monthSegmentIncome = 0
      let segIdx = segmentIndex
      let segDaysUsed = segmentDaysUsed

      while (daysLeft > 0 && segIdx < segments.length) {
        const seg = segments[segIdx]
        const availInSeg = seg.days - segDaysUsed
        const take = Math.min(daysLeft, availInSeg)
        const rate = seg.days > 0 ? seg.totalAmount / seg.days : 0
        monthSegmentIncome += rate * take
        daysLeft -= take
        segDaysUsed += take
        if (segDaysUsed >= seg.days) {
          segIdx++
          segDaysUsed = 0
        }
        if (!leaveType) leaveType = seg.label
      }
      leaveIncome = monthSegmentIncome

      // Advance trackers
      let daysLeftForTracking = daysAccountedThisMonth
      while (daysLeftForTracking > 0 && segmentIndex < segments.length) {
        const seg = segments[segmentIndex]
        const avail = seg.days - segmentDaysUsed
        const take = Math.min(daysLeftForTracking, avail)
        daysLeftForTracking -= take
        segmentDaysUsed += take
        if (segmentDaysUsed >= seg.days) {
          segmentIndex++
          segmentDaysUsed = 0
        }
      }

      remainingLeaveDays -= daysAccountedThisMonth
    }

    // Bonus month
    const isBonus = input.annualBonus > 0 && month === input.bonusPayMonth

    const grossIncome = inLeave
      ? leaveIncome + (isBonus ? input.annualBonus : 0)
      : input.monthlySalary + (isBonus ? input.annualBonus : 0)

    monthlyBreakdown.push({
      month: i + 1,
      label: `${monthLabel(month, year)}${isBonus ? ' (+ Bonus)' : ''}`,
      grossIncome,
      leaveIncome: inLeave ? leaveIncome : 0,
      inLeave,
      leaveType: inLeave ? leaveType : undefined,
    })
  }

  // ── CPF note ─────────────────────────────────────────────────────────────
  const cpfNote =
    'CPF contributions continue to apply on leave pay during government-paid leave. ' +
    'The government cap figures shown include the employer CPF contribution (typically 17%). ' +
    'Your take-home cash will be lower than the gross cap by the CPF contribution amount.'

  // ── Notes ─────────────────────────────────────────────────────────────────
  if (dailyRateCapped) {
    notes.push(
      `Your gross daily rate of $${rawDailyRate.toFixed(2)} exceeds the government pay cap of $357.14/day ($2,500/week, $10,000/28 days). Your government-paid leave income is capped accordingly.`
    )
  }
  notes.push(
    'Government-paid leave is fully reimbursed to your employer, who continues to pay your salary.'
  )
  notes.push(
    'Amounts shown are gross estimates before CPF deductions and income tax.'
  )
  notes.push(
    'Verify with MOM at mom.gov.sg/employment-practices/leave and your HR department.'
  )

  if (weeklyRate < perWeekGovCap) {
    notes.push(
      `Your weekly leave pay ($${weeklyRate.toFixed(2)}) is below the government cap of $2,500/week, so you receive your full salary rate during government-paid leave.`
    )
  }

  return {
    segments,
    monthlyBreakdown,
    totalLeaveIncome,
    totalGovernmentPaid,
    totalEmployerPaid,
    totalUnpaid,
    dailyRate,
    dailyRateCapped,
    cpfNote,
    notes,
  }
}
