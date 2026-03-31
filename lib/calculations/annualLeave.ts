import { ANNUAL_LEAVE } from '@/lib/constants'

export interface AnnualLeaveInput {
  yearsOfService: number       // completed years with current employer
  monthsEmployedThisYear: number // 1–12 for pro-ration
  contractualDays?: number     // if employer gives more than statutory minimum
  unusedDaysCarriedForward?: number
}

export interface AnnualLeaveResult {
  statutoryDays: number
  contractualDays: number      // = max(statutory, input contractual)
  effectiveDays: number        // after pro-ration
  proRated: boolean
  proRateFactor: number
  totalDaysThisYear: number    // effective + carried forward
  carryForwardDays: number
  yearOfService: number        // capped at 8
  notes: string[]
}

export function calculateAnnualLeave(input: AnnualLeaveInput): AnnualLeaveResult {
  const notes: string[] = []

  // Determine statutory days (cap at year 8)
  const cappedYear = Math.min(Math.max(input.yearsOfService, 1), 8)
  const statutoryDays = ANNUAL_LEAVE.statutoryDaysByYear[cappedYear] ?? ANNUAL_LEAVE.maxStatutoryDays

  // Effective annual entitlement (max of statutory and contractual)
  const baseContractualDays = input.contractualDays ?? 0
  const contractualDays = Math.max(statutoryDays, baseContractualDays)

  // Pro-ration for partial-year employment
  const months = Math.min(input.monthsEmployedThisYear, 12)
  const proRated = months < 12
  const proRateFactor = months / 12
  const effectiveDays = proRated
    ? Math.floor(contractualDays * proRateFactor)
    : contractualDays

  const carryForwardDays = Math.max(0, input.unusedDaysCarriedForward ?? 0)
  const totalDaysThisYear = effectiveDays + carryForwardDays

  if (proRated) {
    notes.push(
      `Leave is pro-rated because you've been employed for ${months} of 12 months this year. Your entitlement is ${effectiveDays} of ${contractualDays} days.`
    )
  }

  if (input.yearsOfService < 1) {
    notes.push('You must complete 3 months of service before annual leave entitlement begins under the Employment Act.')
  }

  if (input.yearsOfService >= 8) {
    notes.push('You have reached the maximum statutory entitlement of 14 days per year.')
  } else {
    const nextYear = Math.min(cappedYear + 1, 8)
    const nextDays = ANNUAL_LEAVE.statutoryDaysByYear[nextYear]
    notes.push(`After completing year ${cappedYear + 1} with the same employer, your entitlement increases to ${nextDays} days.`)
  }

  notes.push('Annual leave entitlement shown is the statutory minimum under the Employment Act. Your employer may provide more.')
  notes.push('Unused annual leave can be carried forward up to 12 months or encashed upon resignation/termination.')
  notes.push('Verify with your employment contract and HR for your actual entitlement.')

  return {
    statutoryDays,
    contractualDays,
    effectiveDays,
    proRated,
    proRateFactor,
    totalDaysThisYear,
    carryForwardDays,
    yearOfService: cappedYear,
    notes,
  }
}
