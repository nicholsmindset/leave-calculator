'use client'

import { useState, useMemo } from 'react'
import { calculateAnnualLeave } from '@/lib/calculations/annualLeave'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import InfoTooltip from '@/components/ui/InfoTooltip'
import ShareCard from '@/components/calculators/results/ShareCard'

export default function AnnualLeaveCalculator() {
  const [yearsOfService, setYearsOfService] = useState(2)
  const [monthsEmployed, setMonthsEmployed] = useState(12)
  const [contractualDays, setContractualDays] = useState(0)
  const [unusedDays, setUnusedDays] = useState(0)

  const result = useMemo(
    () => calculateAnnualLeave({ yearsOfService, monthsEmployedThisYear: monthsEmployed, contractualDays: contractualDays || undefined, unusedDaysCarriedForward: unusedDays || undefined }),
    [yearsOfService, monthsEmployed, contractualDays, unusedDays]
  )

  const summaryRows: SummaryRow[] = [
    { label: 'Statutory entitlement', value: `${result.statutoryDays} days`, sub: `Year ${result.yearOfService} of service` },
    ...(contractualDays > result.statutoryDays
      ? [{ label: 'Contractual entitlement', value: `${result.contractualDays} days`, sub: 'Your employer gives more' }]
      : []),
    ...(result.proRated
      ? [{ label: 'Pro-rated entitlement', value: `${result.effectiveDays} days`, sub: `${monthsEmployed} of 12 months` }]
      : []),
    ...(unusedDays > 0
      ? [{ label: 'Carried forward from last year', value: `${result.carryForwardDays} days` }]
      : []),
    { label: 'Total available this year', value: `${result.totalDaysThisYear} days`, highlight: true },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Service duration */}
          <StepSection step={1} title="Length of service">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Completed years with current employer
                <InfoTooltip content="Annual leave entitlement increases 1 day per year of service, from 7 days (year 1) to 14 days (year 8+)." />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((yr) => (
                  <RadioCard
                    key={yr}
                    label={`${yr}${yr >= 8 ? '+' : ''} yr${yr !== 1 ? 's' : ''}`}
                    checked={yearsOfService === yr}
                    onClick={() => setYearsOfService(yr)}
                  />
                ))}
              </div>
              <p className="text-xs text-primary font-medium mt-2">
                Year {Math.min(yearsOfService, 8)} entitlement: {result.statutoryDays} statutory days
              </p>
            </div>

            <div className="mt-4">
              <p className="label-stitch flex items-center gap-1 mb-2">
                Months employed this year
                <InfoTooltip content="Annual leave is pro-rated if you joined mid-year or changed jobs." />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 9, 12].map((m) => (
                  <RadioCard
                    key={m}
                    label={m === 12 ? 'Full year' : `${m} months`}
                    checked={monthsEmployed === m}
                    onClick={() => setMonthsEmployed(m)}
                  />
                ))}
              </div>
            </div>
          </StepSection>

          {/* Step 2 — Optional details */}
          <StepSection step={2} title="Optional details">
            <div>
              <label htmlFor="al-contractual" className="label-stitch flex items-center gap-1 mb-2">
                Employer&apos;s contractual annual leave days (if more than statutory)
                <InfoTooltip content="Leave blank if you're not sure. We'll use the statutory minimum." />
              </label>
              <input
                id="al-contractual"
                type="number"
                min={0}
                max={60}
                value={contractualDays || ''}
                onChange={(e) => setContractualDays(Number(e.target.value))}
                placeholder="e.g. 18"
                className="input-stitch"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="al-unused" className="label-stitch flex items-center gap-1 mb-2">
                Unused days carried forward from last year
                <InfoTooltip content="Unused statutory leave can be carried forward up to 12 months." />
              </label>
              <input
                id="al-unused"
                type="number"
                min={0}
                max={30}
                value={unusedDays || ''}
                onChange={(e) => setUnusedDays(Number(e.target.value))}
                placeholder="e.g. 5"
                className="input-stitch"
              />
            </div>
          </StepSection>
        </div>

        {/* ── Right column: summary panel ──────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={`${result.totalDaysThisYear} days`}
            statLabel="total annual leave available"
            rows={summaryRows}
            govSource="https://www.mom.gov.sg/employment-practices/leave/annual-leave"
          />
          <ShareCard leaveType="annual-leave" />
        </div>
      </div>

      {/* Notes */}
      {result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">About annual leave</h3>
          <ul className="space-y-1.5">
            {result.notes.map((note, i) => (
              <li key={i} className="flex gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0 mt-0.5" aria-hidden="true">info</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
