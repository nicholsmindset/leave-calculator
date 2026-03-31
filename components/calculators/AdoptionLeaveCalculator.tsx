'use client'

import { useState, useMemo } from 'react'
import { calculateAdoptionLeave } from '@/lib/calculations/adoptionLeave'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD } from '@/lib/utils/formatters'

const CITIZENSHIP_OPTIONS: { value: 'SC' | 'PR' | 'other'; label: string; description: string }[] = [
  { value: 'SC', label: 'Singapore Citizen', description: '12 weeks adoption leave' },
  { value: 'PR', label: 'Permanent Resident', description: 'Not eligible under GPML scheme' },
  { value: 'other', label: 'Foreigner', description: 'Not eligible' },
]

export default function AdoptionLeaveCalculator() {
  const [childCitizenship, setChildCitizenship] = useState<'SC' | 'PR' | 'other'>('SC')
  const [childAgeMonths, setChildAgeMonths] = useState(3)
  const [monthlySalary, setMonthlySalary] = useState(4500)
  const [serviceMonths, setServiceMonths] = useState(12)

  const result = useMemo(
    () => calculateAdoptionLeave({ childCitizenship, childAgeAtIntentMonths: childAgeMonths, monthlySalary, serviceMonths }),
    [childCitizenship, childAgeMonths, monthlySalary, serviceMonths]
  )

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: 'Total adoption leave', value: `${result.totalWeeks} weeks`, highlight: true },
        { label: 'Employer-paid (first block)', value: `${result.employerPaidWeeks} weeks`, sub: 'Govt reimburses employer' },
        { label: 'Flexible portion', value: `${result.flexibleWeeks} weeks`, sub: 'Take anytime before child turns 1' },
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Child details */}
          <StepSection step={1} title="Child details">
            <div>
              <p className="label-stitch mb-2">Child&apos;s citizenship</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CITIZENSHIP_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={childCitizenship === opt.value}
                    onClick={() => setChildCitizenship(opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="al-age" className="label-stitch flex items-center gap-1 mb-2">
                Child&apos;s age at formal intent to adopt (months)
                <InfoTooltip content="Child must be below 12 months old at the formal intent to adopt for Adoption Leave to apply." />
              </label>
              <input
                id="al-age"
                type="number"
                min={0}
                max={24}
                value={childAgeMonths}
                onChange={(e) => setChildAgeMonths(Number(e.target.value))}
                className="input-stitch"
              />
              {childAgeMonths >= 12 && (
                <p className="text-xs text-amber-600 font-medium mt-1">
                  Child must be under 12 months at formal intent to adopt.
                </p>
              )}
            </div>
          </StepSection>

          {/* Step 2 — Employment & Pay */}
          <StepSection step={2} title="Employment & pay">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Months of continuous service with current employer
                <InfoTooltip content="You need at least 3 months of continuous service to be eligible." />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 6, 12].map((m) => (
                  <RadioCard
                    key={m}
                    label={`${m} month${m !== 1 ? 's' : ''}`}
                    checked={serviceMonths === m}
                    onClick={() => setServiceMonths(m)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="adop-salary" className="label-stitch flex items-center gap-1 mb-2">
                Gross monthly salary (SGD)
                <InfoTooltip content="Government pay is capped at $357.14/day ($10,000 per 28-day period)." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input
                  id="adop-salary"
                  type="number"
                  min={0}
                  step={100}
                  value={monthlySalary || ''}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  placeholder="e.g. 4500"
                  className="input-stitch pl-7"
                />
              </div>
              {monthlySalary > 0 && (
                <p className="text-xs text-on-surface-variant mt-1">
                  Daily rate: {formatSGD(Math.min((monthlySalary * 12) / 365, 357.14))}/day
                  {(monthlySalary * 12) / 365 > 357.14 && ' (capped)'}
                </p>
              )}
            </div>
          </StepSection>
        </div>

        {/* ── Right column ─────────────────────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.eligible ? `${result.totalWeeks} weeks` : '—'}
            statLabel={result.eligible ? 'adoption leave entitlement' : undefined}
            rows={summaryRows}
            payTotal={result.eligible && monthlySalary > 0 ? result.govPayTotal : undefined}
            payLabel="Estimated total pay"
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityNote}
            govSource="https://www.mom.gov.sg/employment-practices/leave/adoption-leave"
          />
          {result.eligible && <ShareCard leaveType="adoption-leave" />}
        </div>
      </div>

      {/* Notes */}
      {result.eligible && result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">About Adoption Leave</h3>
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
