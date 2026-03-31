import {
  BABY_BONUS,
  getCashGift,
  getCDAFirstStep,
  getCDACoMatchCap,
  formatSGD,
  type CitizenshipStatus,
} from '@/lib/constants'

export interface BabyBonusInput {
  childOrder: number              // 1, 2, 3, 4, 5 (use 5 for 5th+)
  childCitizenship: CitizenshipStatus
  birthDate: Date                 // To determine Large Families Scheme eligibility (≥18 Feb 2025)
  plannedCDAContributions: number // How much parent plans to contribute to CDA (0+)
}

export interface CashGiftPayout {
  milestone: string
  ageMonths: number
  amount: number
  cumulativeAmount: number
  estimatedDate?: Date
}

export interface BabyBonusResult {
  eligible: boolean
  eligibilityNote?: string
  // Cash Gift
  cashGiftTotal: number
  cashGiftPayouts: CashGiftPayout[]
  // CDA
  cdaFirstStep: number
  cdaCoMatchCap: number
  cdaParentContribution: number    // min(plannedContributions, coMatchCap)
  cdaCoMatch: number               // government co-match = cdaParentContribution (1:1)
  cdaBalance: number               // firstStep + parentContribution + coMatch
  // Grand total
  totalBenefits: number
  maxPossibleTotal: number         // if parent contributes up to co-match cap
  // Info
  isLargeFamiliesScheme: boolean
  notes: string[]
}

/** Singapore Citizen birth date cutoff for large families CDA First Step */
const LARGE_FAMILIES_CUTOFF = new Date('2025-02-18')

export function calculateBabyBonus(input: BabyBonusInput): BabyBonusResult {
  const notes: string[] = []

  // ── Eligibility ───────────────────────────────────────────────────────────
  if (input.childCitizenship !== 'SC') {
    return {
      eligible: false,
      eligibilityNote:
        'Baby Bonus Scheme is only available for Singapore Citizen children.',
      cashGiftTotal: 0,
      cashGiftPayouts: [],
      cdaFirstStep: 0,
      cdaCoMatchCap: 0,
      cdaParentContribution: 0,
      cdaCoMatch: 0,
      cdaBalance: 0,
      totalBenefits: 0,
      maxPossibleTotal: 0,
      isLargeFamiliesScheme: false,
      notes,
    }
  }

  const order = Math.min(input.childOrder, 5)

  // ── Cash Gift ────────────────────────────────────────────────────────────
  const cashGiftTotal = getCashGift(order)

  // Payout schedule (milestones and fractions vary by child order)
  // 1st and 2nd child: $11,000 total
  // 3rd+ child: $13,000 total
  // Schedule based on MOM/MSF 2026 guidelines
  const payoutSchedule: Array<{ milestone: string; ageMonths: number; fraction: number }> =
    order <= 2
      ? [
          { milestone: 'At birth', ageMonths: 0, fraction: 3000 / cashGiftTotal },
          { milestone: 'Age 6 months', ageMonths: 6, fraction: 1500 / cashGiftTotal },
          { milestone: 'Age 12 months', ageMonths: 12, fraction: 1500 / cashGiftTotal },
          { milestone: 'Age 15 months', ageMonths: 15, fraction: 2500 / cashGiftTotal },
          { milestone: 'Age 18 months', ageMonths: 18, fraction: 2500 / cashGiftTotal },
        ]
      : [
          { milestone: 'At birth', ageMonths: 0, fraction: 4000 / cashGiftTotal },
          { milestone: 'Age 6 months', ageMonths: 6, fraction: 2000 / cashGiftTotal },
          { milestone: 'Age 12 months', ageMonths: 12, fraction: 2000 / cashGiftTotal },
          { milestone: 'Age 15 months', ageMonths: 15, fraction: 2500 / cashGiftTotal },
          { milestone: 'Age 18 months', ageMonths: 18, fraction: 2500 / cashGiftTotal },
        ]

  let cumulative = 0
  const cashGiftPayouts: CashGiftPayout[] = payoutSchedule.map((p) => {
    const amount = Math.round(cashGiftTotal * p.fraction)
    cumulative += amount
    const estimatedDate = new Date(input.birthDate)
    estimatedDate.setMonth(estimatedDate.getMonth() + p.ageMonths)
    return {
      milestone: p.milestone,
      ageMonths: p.ageMonths,
      amount,
      cumulativeAmount: cumulative,
      estimatedDate,
    }
  })

  // ── Large Families Scheme ─────────────────────────────────────────────────
  const isLargeFamiliesScheme =
    order >= 3 && input.birthDate >= LARGE_FAMILIES_CUTOFF

  // ── CDA First Step ────────────────────────────────────────────────────────
  const cdaFirstStep = getCDAFirstStep(order, input.birthDate)

  if (isLargeFamiliesScheme) {
    notes.push(
      `Your child qualifies for the Large Families Scheme (3rd or subsequent child born on/after 18 Feb 2025). CDA First Step Grant is ${formatSGD(cdaFirstStep)} — doubled from the standard ${formatSGD(BABY_BONUS.cdaFirstStep.standard)}.`
    )
  }

  // ── CDA Co-matching ───────────────────────────────────────────────────────
  const cdaCoMatchCap = getCDACoMatchCap(order)
  const cdaParentContribution = Math.min(
    input.plannedCDAContributions,
    cdaCoMatchCap
  )
  const cdaCoMatch = cdaParentContribution // 1:1 match
  const cdaBalance = cdaFirstStep + cdaParentContribution + cdaCoMatch

  // ── Totals ────────────────────────────────────────────────────────────────
  const totalBenefits = cashGiftTotal + cdaBalance
  const maxPossibleTotal = cashGiftTotal + cdaFirstStep + cdaCoMatchCap * 2 // firstStep + max parent + max co-match

  // ── Notes ─────────────────────────────────────────────────────────────────
  notes.push(
    `Cash Gift of ${formatSGD(cashGiftTotal)} is paid out in 5 instalments over 18 months via PayNow or GIRO.`
  )
  notes.push(
    `The CDA First Step Grant of ${formatSGD(cdaFirstStep)} is automatically credited within 2 weeks of CDA opening.`
  )
  notes.push(
    `The government will co-match every dollar you save in your child's CDA, up to ${formatSGD(cdaCoMatchCap)} over the child's lifetime.`
  )
  if (input.plannedCDAContributions > cdaCoMatchCap) {
    notes.push(
      `You've entered more than the co-match cap. The government will match up to ${formatSGD(cdaCoMatchCap)}. Contributions above this cap do not receive co-matching but can still be used for approved expenses.`
    )
  }
  notes.push(
    'CDA funds can be used at approved institutions for childcare, medical, and educational expenses.'
  )
  notes.push(
    'Open a CDA at any participating bank (DBS, OCBC, UOB) or via LifeSG app within 12 months of birth.'
  )
  notes.push('Verify at life.gov.sg/family-parenting/benefits-support/baby-bonus-scheme')

  return {
    eligible: true,
    cashGiftTotal,
    cashGiftPayouts,
    cdaFirstStep,
    cdaCoMatchCap,
    cdaParentContribution,
    cdaCoMatch,
    cdaBalance,
    totalBenefits,
    maxPossibleTotal,
    isLargeFamiliesScheme,
    notes,
  }
}
