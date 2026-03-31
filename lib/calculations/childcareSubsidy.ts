import { CHILDCARE_SUBSIDY, formatSGD } from '@/lib/constants'

export type FacilityType = 'infant-care' | 'childcare'
export type CentreType = 'anchor-operator' | 'partner-operator' | 'private'

export interface ChildcareSubsidyInput {
  facilityType: FacilityType
  centreType: CentreType
  grossMonthlyHouseholdIncome: number  // 0 for single-income families
  childCitizenship: 'SC' | 'PR' | 'other'
  bothParentsWorking: boolean          // affects basic subsidy quantum
  monthlyFees: number                  // actual fees charged by centre
}

export interface SubsidyTier {
  incomeRange: string
  basicSubsidy: number
  additionalSubsidy: number
  totalSubsidy: number
  netFeeAfterSubsidy: number
}

export interface ChildcareSubsidyResult {
  eligible: boolean
  eligibilityNote?: string
  facilityType: FacilityType
  centreType: CentreType
  // Fee cap (max chargeable fees at AO/POP centres)
  feeCap?: number
  actualFees: number
  effectiveFees: number              // min(actualFees, feeCap if applicable)
  // Subsidies
  basicSubsidy: number               // ECDA Basic Subsidy
  additionalSubsidy: number          // Additional Subsidy (income-tested)
  totalSubsidy: number
  netFeePayable: number              // effectiveFees - totalSubsidy (min 0)
  // Info
  incomeRange: string
  notes: string[]
}

// Additional Subsidy income tiers (MSF 2026)
// Source: ecda.gov.sg/childcare-subsidies
const ADDITIONAL_SUBSIDY_TIERS: Record<FacilityType, Array<{ maxIncome: number; amount: number; label: string }>> = {
  'infant-care': [
    { maxIncome: 3000,  amount: 710, label: '$0 – $3,000' },
    { maxIncome: 4500,  amount: 600, label: '$3,001 – $4,500' },
    { maxIncome: 6000,  amount: 490, label: '$4,501 – $6,000' },
    { maxIncome: 8000,  amount: 340, label: '$6,001 – $8,000' },
    { maxIncome: 10000, amount: 190, label: '$8,001 – $10,000' },
    { maxIncome: 12000, amount: 40,  label: '$10,001 – $12,000' },
  ],
  'childcare': [
    { maxIncome: 3000,  amount: 467, label: '$0 – $3,000' },
    { maxIncome: 4500,  amount: 394, label: '$3,001 – $4,500' },
    { maxIncome: 6000,  amount: 322, label: '$4,501 – $6,000' },
    { maxIncome: 8000,  amount: 224, label: '$6,001 – $8,000' },
    { maxIncome: 10000, amount: 126, label: '$8,001 – $10,000' },
    { maxIncome: 12000, amount: 27,  label: '$10,001 – $12,000' },
  ],
}

/** Map gross household income to Additional Subsidy quantum */
function getAdditionalSubsidy(
  grossIncome: number,
  facilityType: FacilityType
): { additionalSubsidy: number; incomeRange: string } {
  const tiers = ADDITIONAL_SUBSIDY_TIERS[facilityType]

  for (const tier of tiers) {
    if (grossIncome <= tier.maxIncome) {
      return { additionalSubsidy: tier.amount, incomeRange: tier.label }
    }
  }
  // Above highest income tier: no additional subsidy
  return { additionalSubsidy: 0, incomeRange: `Above $${CHILDCARE_SUBSIDY.additionalSubsidy.grossIncomeCeilingMonthly.toLocaleString()}` }
}

export function calculateChildcareSubsidy(
  input: ChildcareSubsidyInput
): ChildcareSubsidyResult {
  const notes: string[] = []

  // ── Eligibility ───────────────────────────────────────────────────────────
  if (input.childCitizenship === 'other') {
    return {
      eligible: false,
      eligibilityNote:
        'Childcare subsidies under the Child Care Subsidy scheme are available for Singapore Citizen and Permanent Resident children only.',
      facilityType: input.facilityType,
      centreType: input.centreType,
      actualFees: input.monthlyFees,
      effectiveFees: input.monthlyFees,
      basicSubsidy: 0,
      additionalSubsidy: 0,
      totalSubsidy: 0,
      netFeePayable: input.monthlyFees,
      incomeRange: '',
      notes,
    }
  }

  // ── Fee cap ───────────────────────────────────────────────────────────────
  let feeCap: number | undefined
  if (input.centreType === 'anchor-operator') {
    feeCap = CHILDCARE_SUBSIDY.feeCaps.anchorOperator
    notes.push(
      `Anchor Operator (AO) centres charge capped fees of up to ${formatSGD(feeCap)}/month. If your centre charges less, subsidy is applied to the actual fee.`
    )
  } else if (input.centreType === 'partner-operator') {
    feeCap = CHILDCARE_SUBSIDY.feeCaps.partnerOperator
    notes.push(
      `Partner Operator (POP) centres charge capped fees of up to ${formatSGD(feeCap)}/month.`
    )
  } else {
    notes.push(
      'Private centres are not subject to fee caps. Subsidies still apply but the net payable may be higher.'
    )
  }

  const effectiveFees =
    feeCap !== undefined
      ? Math.min(input.monthlyFees, feeCap)
      : input.monthlyFees

  // ── Basic Subsidy ─────────────────────────────────────────────────────────
  // SC child: full basic subsidy; PR child: 50% of SC basic subsidy
  const basicSubsidyConfig =
    input.facilityType === 'infant-care'
      ? CHILDCARE_SUBSIDY.basicSubsidy.infantCare
      : CHILDCARE_SUBSIDY.basicSubsidy.childcare

  const baseBasic = input.bothParentsWorking
    ? basicSubsidyConfig.working
    : basicSubsidyConfig.nonWorking

  const basicSubsidy =
    input.childCitizenship === 'SC' ? baseBasic : Math.round(baseBasic * 0.5)

  if (input.childCitizenship === 'PR') {
    notes.push(
      `Singapore Permanent Resident children receive 50% of the Citizen basic subsidy (${formatSGD(basicSubsidy)}/month).`
    )
  }

  if (!input.bothParentsWorking) {
    notes.push(
      `At least one parent is not working. The basic subsidy is ${formatSGD(basicSubsidy)}/month. If both parents are working, the basic subsidy increases to ${formatSGD(basicSubsidyConfig.working)}/month.`
    )
  }

  // ── Additional Subsidy ────────────────────────────────────────────────────
  const { additionalSubsidy, incomeRange } = getAdditionalSubsidy(
    input.grossMonthlyHouseholdIncome,
    input.facilityType
  )

  // PR children are NOT eligible for Additional Subsidy
  const finalAdditionalSubsidy =
    input.childCitizenship === 'SC' ? additionalSubsidy : 0

  if (input.childCitizenship === 'PR' && additionalSubsidy > 0) {
    notes.push(
      'Additional Subsidy (income-tested) is only available for Singapore Citizen children.'
    )
  }

  // ── Totals ────────────────────────────────────────────────────────────────
  const totalSubsidy = basicSubsidy + finalAdditionalSubsidy
  const netFeePayable = Math.max(0, effectiveFees - totalSubsidy)

  // ── Notes ─────────────────────────────────────────────────────────────────
  if (finalAdditionalSubsidy > 0) {
    notes.push(
      `Based on your gross household income of ${formatSGD(input.grossMonthlyHouseholdIncome)}/month, you qualify for an Additional Subsidy of ${formatSGD(finalAdditionalSubsidy)}/month.`
    )
  } else if (input.childCitizenship === 'SC') {
    notes.push(
      `Your household income exceeds the threshold for Additional Subsidy. You still receive the Basic Subsidy of ${formatSGD(basicSubsidy)}/month.`
    )
  }
  notes.push(
    'Apply for childcare subsidies through LifeSG app or at the ECDA website (ecda.gov.sg/Parentsguide).'
  )
  notes.push(
    'Subsidies are credited directly to the childcare centre — you pay the net fee only.'
  )
  notes.push(
    'Re-assessment happens automatically if your income changes significantly. Inform ECDA to update.'
  )

  return {
    eligible: true,
    facilityType: input.facilityType,
    centreType: input.centreType,
    feeCap,
    actualFees: input.monthlyFees,
    effectiveFees,
    basicSubsidy,
    additionalSubsidy: finalAdditionalSubsidy,
    totalSubsidy,
    netFeePayable,
    incomeRange,
    notes,
  }
}
