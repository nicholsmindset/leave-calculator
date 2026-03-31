import { UNPAID_INFANT_CARE_LEAVE } from '@/lib/constants'

export interface UICLInput {
  numberOfChildrenUnder2: number
  childCitizenship: 'SC' | 'PR' | 'other'
  monthsEmployedThisYear: number
}

export interface UICLResult {
  eligible: boolean
  eligibilityNote?: string
  daysPerYear: number          // per parent (12 days, effective 1 Jan 2024)
  lifetimeCap: number          // 24-day lifetime cap per parent per child
  isPaid: boolean              // always false (unpaid)
  notes: string[]
}

export function calculateUICL(input: UICLInput): UICLResult {
  const notes: string[] = []

  if (input.childCitizenship === 'other') {
    return {
      eligible: false,
      eligibilityNote: 'Unpaid Infant Care Leave (UICL) is only available for Singapore Citizen or Permanent Resident children under 2 years old.',
      daysPerYear: 0,
      lifetimeCap: 0,
      isPaid: false,
      notes: [],
    }
  }

  if (input.numberOfChildrenUnder2 === 0) {
    return {
      eligible: false,
      eligibilityNote: 'You must have at least one child below 2 years old to be eligible for Unpaid Infant Care Leave.',
      daysPerYear: 0,
      lifetimeCap: 0,
      isPaid: false,
      notes: [],
    }
  }

  if (input.monthsEmployedThisYear < 3) {
    return {
      eligible: false,
      eligibilityNote: 'You need at least 3 months of continuous service with your employer to qualify for UICL.',
      daysPerYear: 0,
      lifetimeCap: 0,
      isPaid: false,
      notes: [],
    }
  }

  // From 1 January 2024: 12 days per year per parent (doubled from 6)
  const daysPerYear = UNPAID_INFANT_CARE_LEAVE.daysPerYear
  const lifetimeCap = UNPAID_INFANT_CARE_LEAVE.lifetimeCapDays

  notes.push(`Unpaid Infant Care Leave gives you ${daysPerYear} days per year per parent for each child below 2 years old (doubled from 6 days, effective 1 January 2024).`)
  notes.push('UICL is in addition to GPCL — it does not replace your paid childcare leave entitlement.')
  notes.push('The leave is unpaid. You will not receive salary for these days.')
  notes.push(`There is a ${lifetimeCap}-day lifetime cap per parent per qualifying child.`)
  notes.push('Both parents can each take UICL independently — giving a combined 24 days per year per household.')
  notes.push('Source: mom.gov.sg/employment-practices/leave/unpaid-infant-care-leave')

  return {
    eligible: true,
    daysPerYear,
    lifetimeCap,
    isPaid: false,
    notes,
  }
}
