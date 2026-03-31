/**
 * Singapore Parental Leave & Baby Benefits — 2026 Policy Constants
 *
 * Sources:
 * - Ministry of Manpower (MOM): mom.gov.sg/employment-practices/leave
 * - Made for Families: madeforfamilies.gov.sg/parental-leave-and-benefits
 * - MSF ProFamilyLeave portal
 * - CPF Board: cpf.gov.sg
 * - LifeSG: life.gov.sg/family-parenting/benefits-support/baby-bonus-scheme
 *
 * All figures verified against "Singapore Parental Leave & Baby Benefits in 2026"
 * reference document (March 2026 edition).
 *
 * IMPORTANT: Do not edit policy figures without cross-referencing MOM.
 */

// ─────────────────────────────────────────────────────────────────────────────
// MATERNITY LEAVE — Government-Paid Maternity Leave (GPML)
// Source: mom.gov.sg/employment-practices/leave/maternity-leave/eligibility-and-entitlement
// ─────────────────────────────────────────────────────────────────────────────

export const MATERNITY_LEAVE = {
  // Singapore Citizen child
  sc: {
    totalWeeks: 16,
    // 1st and 2nd child order: first 8 employer-paid, last 8 government-reimbursed
    firstSecondOrder: {
      employerPaidWeeks: 8,
      govPaidWeeks: 8,
      // Government caps: $10,000 per 4-week period, up to $20,000 per child order (incl. CPF)
      govCapPer4Weeks: 10000,
      govCapTotal: 20000,
    },
    // 3rd+ child order: ALL 16 weeks government-reimbursed
    thirdPlusOrder: {
      employerPaidWeeks: 0,
      govPaidWeeks: 16,
      // Government caps: $10,000 per 4-week period, up to $40,000 per child order (incl. CPF)
      govCapPer4Weeks: 10000,
      govCapTotal: 40000,
    },
    // Timing flexibility (from 1 April 2025)
    canStartWeeksBeforeDelivery: 4,
    firstBlockMustBeContinuousWeeks: 8, // first 8 weeks: continuous
    lastBlockFlexibleWithinMonths: 12,  // last 8 weeks: flexible within 12 months
  },
  // Non-SC child (Employment Act — not GPML)
  nonSc: {
    totalWeeks: 12,
    employerPaidWeeks: 12,
    govPaidWeeks: 0, // No government reimbursement for non-SC child
  },
  // Eligibility
  eligibility: {
    minServiceDays: 90,        // 90 days continuous employment before delivery
    selfEmployedMonths: 3,     // 3 continuous months of self-employment + income loss
    noticeWeeksRequired: 4,    // Must inform employer ≥4 weeks before (from 1 Apr 2025)
  },
  // Pay cap: $10,000 per 28-day (4-week) period → $357.14/day
  payCapPer28Days: 10000,
  dailyPayCap: 357.14, // = $10,000 / 28
} as const

// ─────────────────────────────────────────────────────────────────────────────
// PATERNITY LEAVE — Government-Paid Paternity Leave (GPPL)
// Source: mom.gov.sg/employment-practices/leave/paternity-leave
// Updated: 1 April 2025 — increased from 2 to 4 weeks for SC child
// ─────────────────────────────────────────────────────────────────────────────

export const PATERNITY_LEAVE = {
  // SC child (born on/after 1 April 2025, including all 2026 births)
  sc: {
    weeks: 4,
    govPaidWeeks: 4,
    // Employer reimbursement: $2,500/week, up to $10,000 for 4 weeks (incl. CPF)
    govCapPerWeek: 2500,
    govCapTotal: 10000,
  },
  // Non-SC child
  nonSc: {
    weeks: 2,
    govPaidWeeks: 2,
    govCapPerWeek: 2500,
    govCapTotal: 5000,
  },
  eligibility: {
    minServiceDays: 90,
    mustBeMarried: true,       // Must be/have been lawfully married to child's mother
    selfEmployedMonths: 3,
    noticeWeeksRequired: 4,    // From 1 April 2025
  },
  // Must be taken within 12 months of birth; can be split into blocks
  mustTakeWithinMonths: 12,
  canSplit: true,
  // Pay cap (same as maternity)
  dailyPayCap: 357.14,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PARENTAL LEAVE (SPL)
// Source: mom.gov.sg/employment-practices/leave/shared-parental-leave
// NEW SCHEME — NOT a transfer from mother's leave. SPL is a SEPARATE pool.
// Two phases:
//   Phase 1: 1 Apr 2025 → 31 Mar 2026 babies = 6 weeks SPL (shared)
//   Phase 2: From 1 Apr 2026 babies = 10 weeks SPL (shared)
// ─────────────────────────────────────────────────────────────────────────────

export const SHARED_PARENTAL_LEAVE = {
  // Phase 1: babies born 1 Apr 2025 – 31 Mar 2026
  phase1: {
    totalWeeks: 6,
    defaultPerParent: 3, // Default 3 weeks each, but can reallocate 0–6
    validFrom: '2025-04-01',
    validTo: '2026-03-31',
  },
  // Phase 2: babies born from 1 Apr 2026
  phase2: {
    totalWeeks: 10,
    defaultPerParent: 5, // Default 5 weeks each, but can reallocate 0–10
    validFrom: '2026-04-01',
    validTo: null, // ongoing
  },
  eligibility: {
    childMustBe: 'SC' as const,
    minServiceDays: 90,
    selfEmployedMonths: 3,
    fatherMustBeMarried: true,
    noticeWeeksRequired: 4,
    // SPL must be taken AFTER parent has consumed their GPML or GPPL
    mustConsumeParentalLeaveFirst: true,
  },
  // Must be taken within 12 months of birth
  mustTakeWithinMonths: 12,
  // Pay cap: $2,500/week → $357.14/day
  govCapPerWeek: 2500,
  dailyPayCap: 357.14,
  // Total leave potential for 2026 SC babies
  totalFamilyLeave2026Weeks: 30, // 16 GPML + 4 GPPL + 10 SPL
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CHILDCARE LEAVE — Government-Paid Childcare Leave (GPCL)
// Source: mom.gov.sg/employment-practices/leave/childcare-leave/eligibility-and-entitlement
// ─────────────────────────────────────────────────────────────────────────────

export const CHILDCARE_LEAVE = {
  // Government-Paid Childcare Leave — child under 7
  gpcl: {
    scPrChild: {
      daysPerYear: 6,
      // First 3 days: employer-paid at gross rate
      // Last 3 days: government-reimbursed
      employerPaidDays: 3,
      govPaidDays: 3,
      govCapPerDay: 500, // capped at $500/day including CPF
      childAgeUnder: 7,
    },
    nonScChild: {
      daysPerYear: 2,
      employerPaidDays: 2,
      govPaidDays: 0,
      childAgeUnder: 7,
    },
    // Lifetime cap: 42 days over the child's early years
    lifetimeCapDays: 42,
  },
  // Extended Childcare Leave (ECL) — child aged 7–12
  ecl: {
    scPrChild: {
      daysPerYear: 2,
      govPaidDays: 2,
      govCapPerDay: 500, // fully government-paid, $500/day cap incl. CPF
      childAgeMin: 7,
      childAgeMax: 12,
    },
    nonScChild: {
      daysPerYear: 0, // Not eligible
    },
  },
  eligibility: {
    minServiceMonths: 3,
    proRated: true, // Pro-rated if employed < 12 months in the year
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// UNPAID INFANT CARE LEAVE (UICL)
// Source: mom.gov.sg/employment-practices/leave/unpaid-infant-care-leave
// UPDATED: Doubled from 6 to 12 days/year from 1 January 2024
// ─────────────────────────────────────────────────────────────────────────────

export const UNPAID_INFANT_CARE_LEAVE = {
  daysPerYear: 12,          // 12 days/year per parent (doubled from 6 on 1 Jan 2024)
  childAgeUnderYears: 2,    // Child must be below 2 years old
  childMustBe: ['SC'] as const,
  paidDays: 0,              // Fully unpaid
  lifetimeCapDays: 24,      // 24-day lifetime cap per parent per child
  // Note: In addition to GPCL (not instead of)
  isInAdditionToGPCL: true,
  eligibility: {
    minServiceMonths: 3,
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// ADOPTION LEAVE
// Source: mom.gov.sg/employment-practices/leave/adoption-leave
// ─────────────────────────────────────────────────────────────────────────────

export const ADOPTION_LEAVE = {
  // For eligible adoptive mothers
  weeks: 12,
  // First 8 weeks: employer-paid, government-reimbursed; last 4 weeks: flexible
  employerPaidWeeks: 8,
  flexibleWeeks: 4,
  // Government cap: $10,000 per 4-week period (same as GPML)
  govCapPer4Weeks: 10000,
  govCapTotal: 30000, // 12 weeks / 4 = 3 × $10,000
  eligibility: {
    childMaxAgeAtIntentMonths: 12, // Child must be < 12 months at formal intent to adopt
    childMustBe: 'SC' as const,
    minServiceMonths: 3,
  },
  // Timing: starts from formal intent to adopt; must be fully consumed before child turns 1
  firstBlockMustBeContinuous: true,
  dailyPayCap: 357.14,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// BABY BONUS SCHEME (2026)
// Source: life.gov.sg/family-parenting/benefits-support/baby-bonus-scheme
//         cpf.gov.sg/member/infohub/educational-resources/baby-bonus-benefits-and-support-for-new-parents
// Enhanced amounts effective 1 August 2023, continuing in 2026
// ─────────────────────────────────────────────────────────────────────────────

export const BABY_BONUS = {
  // Cash Gift amounts (SGD)
  cashGift: {
    1: 11000,
    2: 11000,
    3: 13000,
    4: 13000,
    5: 13000,
  } as Record<number, number>,

  // CDA First Step Grant — automatically deposited when CDA is opened
  cdaFirstStep: {
    standard: 5000,
    // Large Families Scheme: 3rd+ child born on/after 18 Feb 2025
    // receives $10,000 ($5,000 base + $5,000 top-up)
    largeFamilies3rdPlus: 10000,
    largeFamiliesValidFrom: '2025-02-18',
  },

  // Government CDA co-matching (dollar-for-dollar matching)
  cdaCoMatchCap: {
    1: 6000,
    2: 6000,
    3: 12000,
    4: 12000,
    5: 18000,
  } as Record<number, number>,

  // Cash Gift payout schedule (approximate milestones for SC child)
  cashGiftPayoutSchedule: {
    // 1st and 2nd child: total $11,000
    firstSecond: [
      { milestone: 'At birth', amount: 3000 },
      { milestone: '6 months', amount: 1500 },
      { milestone: '12 months', amount: 1500 },
      { milestone: '15 months', amount: 2500 },
      { milestone: '18 months', amount: 2500 },
    ],
    // 3rd+ child: total $13,000
    thirdPlus: [
      { milestone: 'At birth', amount: 4000 },
      { milestone: '6 months', amount: 2000 },
      { milestone: '12 months', amount: 2000 },
      { milestone: '15 months', amount: 2500 },
      { milestone: '18 months', amount: 2500 },
    ],
  },

  // Budget 2026 additions: Child LifeSG Credits ($500 per SC child aged ≤12)
  lifeSgCredits2026PerChild: 500,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CHILDCARE SUBSIDY (2026)
// Source: ECDA via halfhalfparenting.com/articles/childcare-subsidy-singapore-2026
//         myfirstskool.com/resources/ecda-childcare-subsidy-calculator
// ─────────────────────────────────────────────────────────────────────────────

export const CHILDCARE_SUBSIDY = {
  // Fee caps at subsidised centres (before subsidies)
  feeCaps: {
    anchorOperator: 610,      // AO preschools: $610/month (from 2026)
    partnerOperator: 650,     // POP preschools: $650/month (from Jan 2026)
  },
  // Basic Subsidy (non-means-tested) for working mothers / single fathers
  basicSubsidy: {
    infantCare: { working: 600, nonWorking: 150 },   // 2–18 months
    childcare: { working: 300, nonWorking: 150 },    // 18 months – 6 years
  },
  // Additional Subsidy (means-tested) income ceiling
  additionalSubsidy: {
    grossIncomeCeilingMonthly: 12000,
    perCapitaCeilingMonthly: 3000, // for larger families
    // Max additional subsidy amounts (at lowest income tier)
    maxAdditional: {
      infantCare: 710,
      childcare: 467,
    },
    // Note: From Jan 2027, income ceiling increases to $15,000
    plannedCeilingIncrease2027: 15000,
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// ANNUAL LEAVE (Employment Act)
// Source: mom.gov.sg/employment-practices/leave/annual-leave/eligibility-and-entitlement
// ─────────────────────────────────────────────────────────────────────────────

export const ANNUAL_LEAVE = {
  // Statutory minimum (for employees covered under Employment Act)
  // Entitlement increases 1 day per year of service, from year 1 (7 days) to year 8+ (14 days)
  statutoryDaysByYear: {
    1: 7,
    2: 8,
    3: 9,
    4: 10,
    5: 11,
    6: 12,
    7: 13,
    8: 14,
  } as Record<number, number>,
  maxStatutoryDays: 14,
  minStatutoryDays: 7,
  minServiceMonthsForEntitlement: 3,
  proRatedIfPartYear: true,
  // Carry-forward: unused statutory leave can be carried ≤12 months (Part IV employees)
  carryForwardMonths: 12,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// SINGAPORE 2026 PUBLIC HOLIDAYS
// Source: mom.gov.sg/employment-practices/public-holidays
// ─────────────────────────────────────────────────────────────────────────────

export const PUBLIC_HOLIDAYS_2026 = [
  { date: '2026-01-01', name: "New Year's Day" },
  { date: '2026-01-29', name: 'Chinese New Year (Day 1)' },
  { date: '2026-01-30', name: 'Chinese New Year (Day 2)' },
  { date: '2026-04-03', name: 'Good Friday' },
  { date: '2026-05-01', name: 'Labour Day' },
  { date: '2026-05-19', name: 'Vesak Day' },
  { date: '2026-06-15', name: 'Hari Raya Haji' },
  { date: '2026-08-09', name: 'National Day' },
  { date: '2026-10-18', name: 'Deepavali' },
  { date: '2026-12-25', name: 'Christmas Day' },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// PAY CALCULATION UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate daily rate from monthly salary.
 * Formula: (Monthly Salary × 12) / 365
 * Capped at $357.14/day ($10,000 per 28-day period)
 */
export function calculateDailyRate(monthlySalary: number): number {
  const annualSalary = monthlySalary * 12
  const rawDailyRate = annualSalary / 365
  return Math.min(rawDailyRate, 357.14)
}

/**
 * Calculate total government-paid leave pay for a given number of days.
 */
export function calculateGovLeavePayTotal(
  monthlySalary: number,
  govPaidDays: number
): number {
  const dailyRate = calculateDailyRate(monthlySalary)
  return Math.round(dailyRate * govPaidDays * 100) / 100
}

/**
 * Calculate employer-paid leave pay (at actual salary, no cap).
 */
export function calculateEmployerLeavePayTotal(
  monthlySalary: number,
  employerPaidDays: number
): number {
  const actualDailyRate = (monthlySalary * 12) / 365
  return Math.round(actualDailyRate * employerPaidDays * 100) / 100
}

/**
 * Get SPL entitlement based on baby's birth date.
 * Phase 1: born 1 Apr 2025 – 31 Mar 2026 → 6 weeks
 * Phase 2: born from 1 Apr 2026 → 10 weeks
 */
export function getSPLEntitlementWeeks(birthDate: Date): 6 | 10 {
  const phase2Start = new Date('2026-04-01')
  return birthDate >= phase2Start ? 10 : 6
}

/**
 * Get Baby Bonus CDA First Step Grant.
 * Accounts for Large Families Scheme (3rd+ child born ≥ 18 Feb 2025).
 */
export function getCDAFirstStep(
  childOrder: number,
  birthDate: Date
): number {
  const largeFamiliesDate = new Date('2025-02-18')
  if (childOrder >= 3 && birthDate >= largeFamiliesDate) {
    return BABY_BONUS.cdaFirstStep.largeFamilies3rdPlus // $10,000
  }
  return BABY_BONUS.cdaFirstStep.standard // $5,000
}

/**
 * Get Baby Bonus Cash Gift for child order (capped at 5th for same rate).
 */
export function getCashGift(childOrder: number): number {
  const order = Math.min(childOrder, 5) as keyof typeof BABY_BONUS.cashGift
  return BABY_BONUS.cashGift[order]
}

/**
 * Get CDA co-matching cap for child order.
 */
export function getCDACoMatchCap(childOrder: number): number {
  const order = Math.min(childOrder, 5) as keyof typeof BABY_BONUS.cdaCoMatchCap
  return BABY_BONUS.cdaCoMatchCap[order]
}

/**
 * Format currency as SGD string.
 */
export function formatSGD(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'ParentalLeave.sg',
  domain: 'leavecalculator.sg',
  baseUrl: 'https://leavecalculator.sg',
  description:
    "Singapore's most complete parental leave calculator suite. Calculate maternity, paternity, childcare, and shared parental leave entitlements. Updated for 2026 MOM guidelines.",
  currentYear: 2026,
  policyLastUpdated: 'April 2025',
  momUrl: 'https://www.mom.gov.sg/employment-practices/leave',
  msfUrl: 'https://www.madeforfamilies.gov.sg/parental-leave-and-benefits',
} as const

export type CitizenshipStatus = 'SC' | 'PR' | 'EP' | 'foreigner'
export type EmploymentType = 'employee' | 'self-employed' | 'contract'
export type LeaveType =
  | 'maternity'
  | 'paternity'
  | 'spl'
  | 'childcare'
  | 'ecl'
  | 'uicl'
  | 'adoption'
  | 'annual'
  | 'baby-bonus'
