'use client'

import { useState, useMemo } from 'react'
import { calculateChildcareLeave } from '@/lib/calculations/childcare'
import type { ChildInfo, ChildCitizenship } from '@/lib/calculations/childcare'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { ordinal } from '@/lib/utils/formatters'

const DEFAULT_CHILD: ChildInfo = { age: 2, citizenship: 'SC' }

export default function ChildcareLeaveCalculator() {
  const [children, setChildren] = useState<ChildInfo[]>([DEFAULT_CHILD])
  const [monthsEmployed, setMonthsEmployed] = useState(12)

  const result = useMemo(
    () => calculateChildcareLeave({ children, monthsEmployedThisYear: monthsEmployed }),
    [children, monthsEmployed]
  )

  function addChild() {
    if (children.length >= 6) return
    setChildren((prev) => [...prev, { age: 2, citizenship: 'SC' }])
  }

  function removeChild(index: number) {
    setChildren((prev) => prev.filter((_, i) => i !== index))
  }

  function updateChild(index: number, field: keyof ChildInfo, value: number | ChildCitizenship) {
    setChildren((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)))
  }

  const summaryRows: SummaryRow[] = [
    { label: 'GPCL (paid childcare leave)', value: `${result.gcplDays} days`, highlight: true },
    { label: 'Employer-paid (first 3 days)', value: `${result.gcplEmployerPaid} days` },
    { label: 'Government-paid (last 3 days)', value: `${result.gcplGovPaid} days`, sub: 'Capped at $500/day' },
    ...(result.eclDays > 0 ? [{ label: 'ECL (ages 7–12)', value: `${result.eclDays} days` }] : []),
    ...(result.uiclDays > 0 ? [{ label: 'UICL (under 2, unpaid)', value: `${result.uiclDays} days` }] : []),
    ...(result.isProRated ? [{ label: 'Pro-rated at', value: `${Math.round(result.proRateFactor * 100)}%`, sub: `${monthsEmployed} months employed` }] : []),
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Children */}
          <StepSection step={1} title="Your children">
            <div className="flex justify-end mb-1">
              <button
                type="button"
                onClick={addChild}
                disabled={children.length >= 6}
                className="flex items-center gap-1 text-sm text-primary font-medium hover:opacity-80 disabled:opacity-40 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">add_circle</span>
                Add child
              </button>
            </div>

            <div className="space-y-3">
              {children.map((child, index) => (
                <div key={index} className="bg-surface-container rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-semibold text-sm text-on-surface">
                      {ordinal(index + 1)} child
                    </span>
                    {children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="text-on-surface-variant hover:text-error transition-colors"
                        aria-label={`Remove ${ordinal(index + 1)} child`}
                      >
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">remove_circle</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label-stitch flex items-center gap-1 mb-1.5">
                        Age (years)
                        <InfoTooltip content="Under 7 = GPCL. Ages 7–12 = ECL. Under 2 = also UICL (unpaid)." />
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={18}
                        value={child.age}
                        onChange={(e) => updateChild(index, 'age', Number(e.target.value))}
                        className="input-stitch"
                        aria-label={`Age of ${ordinal(index + 1)} child`}
                      />
                    </div>

                    <div>
                      <p className="label-stitch mb-1.5">Citizenship</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['SC', 'PR', 'other'] as ChildCitizenship[]).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => updateChild(index, 'citizenship', c)}
                            className={`leave-radio-card justify-center py-2 text-xs font-medium ${child.citizenship === c ? 'active' : ''}`}
                          >
                            {c === 'other' ? 'Other' : c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {result.childBreakdown[index] && (
                    <p className="text-xs text-primary font-medium">
                      {result.childBreakdown[index].leaveCategory}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </StepSection>

          {/* Step 2 — Employment duration */}
          <StepSection step={2} title="Employment duration">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Months employed this year
                <InfoTooltip content="Leave is pro-rated if you've been with your employer for less than 12 months this year." />
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
              {monthsEmployed !== 12 && (
                <p className="text-xs text-amber-600 font-medium mt-2">
                  Leave will be pro-rated &mdash; you&apos;ve worked {monthsEmployed} of 12 months.
                </p>
              )}
            </div>
          </StepSection>
        </div>

        {/* ── Right column: summary panel ──────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={`${result.totalPaidDays} days`}
            statLabel="total paid leave this year"
            rows={summaryRows}
          />
          <ShareCard leaveType="childcare-leave" />
        </div>
      </div>

      {/* Notes */}
      {result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">About childcare leave</h3>
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
