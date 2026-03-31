import { CHILDCARE_LEAVE, UNPAID_INFANT_CARE_LEAVE } from '@/lib/constants'

export type ChildCitizenship = 'SC' | 'PR' | 'other'

export interface ChildInfo {
  age: number             // Age in completed years (0 = under 1 year old)
  citizenship: ChildCitizenship
}

export interface ChildcareLeaveInput {
  children: ChildInfo[]
  monthsEmployedThisYear: number  // For pro-rating (0–12)
}

export interface ChildcareLeaveResult {
  gcplDays: number          // Government-Paid Childcare Leave days
  eclDays: number           // Extended Childcare Leave days
  uiclDays: number          // Unpaid Infant Care Leave days
  totalPaidDays: number     // GPCL + ECL
  totalDays: number         // All leave types combined
  // Breakdown
  gcplEmployerPaid: number  // First 3 days employer-paid
  gcplGovPaid: number       // Last 3 days government-reimbursed
  eclGovPaid: number        // ECL: fully government-paid
  gcplGovCapPerDay: number
  eclGovCapPerDay: number
  // Pro-rating
  isProRated: boolean
  proRateFactor: number     // 0–1
  // Per-child breakdown
  childBreakdown: Array<{
    child: ChildInfo
    gcplDays: number
    eclDays: number
    uiclDays: number
    leaveCategory: string
  }>
  notes: string[]
}

export function calculateChildcareLeave(
  input: ChildcareLeaveInput
): ChildcareLeaveResult {
  const notes: string[] = []

  // ── Pro-rating factor ─────────────────────────────────────────────────────
  const isProRated = input.monthsEmployedThisYear < 12
  const proRateFactor = isProRated
    ? Math.min(input.monthsEmployedThisYear / 12, 1)
    : 1

  if (isProRated) {
    notes.push(
      `You've been employed for ${input.monthsEmployedThisYear} months this year. Childcare leave is pro-rated accordingly.`
    )
  }

  // ── Per-child calculations ─────────────────────────────────────────────────
  let totalGpcl = 0
  let totalEcl = 0
  let totalUicl = 0

  const childBreakdown = input.children.map((child) => {
    const scOrPr = child.citizenship === 'SC' || child.citizenship === 'PR'
    let gcplDays = 0
    let eclDays = 0
    let uiclDays = 0
    let leaveCategory = ''

    if (child.age < 2 && scOrPr) {
      // Under 2 and SC/PR: eligible for GPCL + UICL
      gcplDays = CHILDCARE_LEAVE.gpcl.scPrChild.daysPerYear
      uiclDays = UNPAID_INFANT_CARE_LEAVE.daysPerYear
      leaveCategory = 'GPCL (6 days) + UICL (12 days unpaid) — child under 2'
      notes.push(
        `Child under 2 (SC/PR): entitled to 6 days of Childcare Leave AND 12 days of Unpaid Infant Care Leave per year.`
      )
    } else if (child.age < 7) {
      // Under 7: GPCL
      if (scOrPr) {
        gcplDays = CHILDCARE_LEAVE.gpcl.scPrChild.daysPerYear
        leaveCategory = 'GPCL 6 days — SC/PR child under 7'
      } else {
        gcplDays = CHILDCARE_LEAVE.gpcl.nonScChild.daysPerYear
        leaveCategory = 'GPCL 2 days — non-SC/PR child under 7'
        notes.push(
          'Non-SC/PR children under 7 are entitled to only 2 days of childcare leave per year.'
        )
      }
    } else if (child.age >= 7 && child.age <= 12) {
      // 7–12: ECL
      if (scOrPr) {
        eclDays = CHILDCARE_LEAVE.ecl.scPrChild.daysPerYear
        leaveCategory = 'Extended Childcare Leave 2 days — SC/PR child aged 7–12'
      } else {
        leaveCategory = 'Not eligible — non-SC/PR child aged 7–12'
        notes.push(
          'Non-SC/PR children aged 7–12 are not eligible for Extended Childcare Leave.'
        )
      }
    } else {
      leaveCategory = 'Not eligible — child is 13 or older'
    }

    return { child, gcplDays, eclDays, uiclDays, leaveCategory }
  })

  // GPCL: max 6 days per parent per year (regardless of number of qualifying children)
  // Determined by the youngest qualifying child
  const youngestQualifyingChild = input.children.find(
    (c) => c.age < 7 && (c.citizenship === 'SC' || c.citizenship === 'PR')
  )
  const youngestNonScChild = input.children.find(
    (c) => c.age < 7 && c.citizenship === 'other'
  )

  if (youngestQualifyingChild) {
    totalGpcl = CHILDCARE_LEAVE.gpcl.scPrChild.daysPerYear // 6
  } else if (youngestNonScChild) {
    totalGpcl = CHILDCARE_LEAVE.gpcl.nonScChild.daysPerYear // 2
  }

  // ECL: max 2 days per parent per year (youngest qualifying child aged 7–12)
  const youngestEclChild = input.children.find(
    (c) =>
      c.age >= 7 &&
      c.age <= 12 &&
      (c.citizenship === 'SC' || c.citizenship === 'PR')
  )
  if (youngestEclChild && !youngestQualifyingChild) {
    // ECL only applies if no GPCL-eligible child
    totalEcl = CHILDCARE_LEAVE.ecl.scPrChild.daysPerYear // 2
    notes.push(
      'Extended Childcare Leave applies to your youngest child aged 7–12 (SC/PR).'
    )
  }

  // UICL: per eligible child under 2
  const under2ScPrChildren = input.children.filter(
    (c) => c.age < 2 && (c.citizenship === 'SC' || c.citizenship === 'PR')
  )
  if (under2ScPrChildren.length > 0) {
    totalUicl = UNPAID_INFANT_CARE_LEAVE.daysPerYear // 12 days
    notes.push(
      `You have ${under2ScPrChildren.length} child(ren) under 2 (SC/PR). You are entitled to 12 days of Unpaid Infant Care Leave per year, in addition to your Childcare Leave.`
    )
  }

  // ── Apply pro-rating to GPCL ──────────────────────────────────────────────
  const gcplProRated = Math.floor(totalGpcl * proRateFactor)
  const eclProRated = totalEcl // ECL is NOT pro-rated for part-year service
  // UICL is not pro-rated

  // ── Funding breakdown ─────────────────────────────────────────────────────
  const gcplEmployerPaid = Math.min(
    gcplProRated,
    CHILDCARE_LEAVE.gpcl.scPrChild.employerPaidDays
  ) // first 3 days
  const gcplGovPaid = Math.max(0, gcplProRated - gcplEmployerPaid) // last 3 days

  const totalPaidDays = gcplProRated + eclProRated
  const totalDays = totalPaidDays + totalUicl

  notes.push(
    'For childcare leave: the first 3 days are paid by your employer; the last 3 days are government-reimbursed (up to $500/day including CPF).'
  )
  notes.push(
    'Childcare leave entitlement is determined by your youngest qualifying child.'
  )
  notes.push(
    'Verify with MOM at mom.gov.sg/employment-practices/leave/childcare-leave'
  )

  return {
    gcplDays: gcplProRated,
    eclDays: eclProRated,
    uiclDays: totalUicl,
    totalPaidDays,
    totalDays,
    gcplEmployerPaid,
    gcplGovPaid,
    eclGovPaid: eclProRated,
    gcplGovCapPerDay: CHILDCARE_LEAVE.gpcl.scPrChild.govCapPerDay,
    eclGovCapPerDay: CHILDCARE_LEAVE.ecl.scPrChild.govCapPerDay,
    isProRated,
    proRateFactor,
    childBreakdown,
    notes,
  }
}
