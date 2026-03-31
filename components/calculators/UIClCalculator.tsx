'use client'

import { useState, useMemo } from 'react'
import { calculateUICL } from '@/lib/calculations/uicl'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'

const CITIZENSHIP_OPTIONS: { value: 'SC' | 'PR' | 'other'; label: string; description: string }[] = [
  { value: 'SC', label: 'Singapore Citizen', description: 'Full UICL entitlement' },
  { value: 'PR', label: 'Permanent Resident', description: 'Full UICL entitlement' },
  { value: 'other', label: 'Foreigner', description: 'Not eligible for UICL' },
]

export default function UIClCalculator() {
  const [numChildren, setNumChildren] = useState(1)
  const [citizenship, setCitizenship] = useState<'SC' | 'PR' | 'other'>('SC')
  const [monthsEmployed, setMonthsEmployed] = useState(12)

  const result = useMemo(
    () => calculateUICL({ numberOfChildrenUnder2: numChildren, childCitizenship: citizenship, monthsEmployedThisYear: monthsEmployed }),
    [numChildren, citizenship, monthsEmployed]
  )

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: 'UICL per parent per year', value: `${result.daysPerYear} days`, highlight: true },
        { label: 'Per parent (both can claim)', value: `${result.daysPerYear} days each`, sub: 'Combined: 24 days/year' },
        { label: 'Lifetime cap per child', value: `${result.lifetimeCap} days` },
        { label: 'Paid?', value: 'Unpaid', sub: 'No salary during UICL' },
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
              <p className="label-stitch flex items-center gap-1 mb-2">
                Child&apos;s citizenship
                <InfoTooltip content="UICL applies to SC or PR children below 2 years old." />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CITIZENSHIP_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={citizenship === opt.value}
                    onClick={() => setCitizenship(opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="label-stitch flex items-center gap-1 mb-2">
                Number of children below 2 years old
                <InfoTooltip content="UICL is 12 days per year per parent regardless of how many qualifying children you have." />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((n) => (
                  <RadioCard
                    key={n}
                    label={n === 0 ? 'None' : n === 3 ? '3+' : `${n}`}
                    checked={numChildren === n}
                    onClick={() => setNumChildren(n)}
                  />
                ))}
              </div>
            </div>
          </StepSection>

          {/* Step 2 — Employment */}
          <StepSection step={2} title="Employment">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Months of continuous service with current employer
                <InfoTooltip content="You need at least 3 months of service to be eligible for UICL." />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 6, 12].map((m) => (
                  <RadioCard
                    key={m}
                    label={m === 12 ? 'Full year' : `${m} mo${m !== 1 ? 's' : ''}`}
                    checked={monthsEmployed === m}
                    onClick={() => setMonthsEmployed(m)}
                  />
                ))}
              </div>
            </div>
          </StepSection>
        </div>

        {/* ── Right column ─────────────────────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.eligible ? `${result.daysPerYear} days` : '—'}
            statLabel={result.eligible ? 'UICL per parent per year (unpaid)' : undefined}
            rows={summaryRows}
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityNote}
            govSource="https://www.mom.gov.sg/employment-practices/leave/unpaid-infant-care-leave"
          />
          {result.eligible && <ShareCard leaveType="unpaid-infant-care-leave" />}
        </div>
      </div>

      {/* Notes */}
      {result.eligible && result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">About Unpaid Infant Care Leave</h3>
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
