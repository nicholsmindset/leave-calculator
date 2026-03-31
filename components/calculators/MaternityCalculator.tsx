'use client'

import { useState, useMemo } from 'react'
import { calculateMaternityLeave } from '@/lib/calculations/maternity'
import type { MaternityLeaveInput } from '@/lib/calculations/maternity'
import type { EmploymentType, CitizenshipStatus } from '@/lib/constants'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD, formatDateShort, ordinal } from '@/lib/utils/formatters'

const INITIAL: MaternityLeaveInput = {
  employmentType: 'employee',
  motherCitizenship: 'SC',
  babyCitizenship: 'SC',
  childOrder: 1,
  monthlySalary: 4500,
  deliveryDate: new Date(),
  serviceStartDate: undefined,
}

const EMPLOYMENT_OPTIONS: { value: EmploymentType; label: string; description: string }[] = [
  { value: 'employee', label: 'Employee', description: 'Working for an employer' },
  { value: 'self-employed', label: 'Self-employed', description: 'Own business or freelance' },
  { value: 'contract', label: 'Contract', description: 'Fixed-term or contract worker' },
]

const CITIZENSHIP_OPTIONS: { value: CitizenshipStatus; label: string; description: string }[] = [
  { value: 'SC', label: 'Singapore Citizen', description: 'SC passport holder' },
  { value: 'PR', label: 'Permanent Resident', description: 'Blue IC holder' },
  { value: 'foreigner', label: 'Foreigner / EP holder', description: 'Work pass holder' },
]

export default function MaternityCalculator() {
  const [form, setForm] = useState<MaternityLeaveInput>(INITIAL)
  const result = useMemo(() => calculateMaternityLeave(form), [form])

  function setField<K extends keyof MaternityLeaveInput>(key: K, value: MaternityLeaveInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: 'Employer-paid weeks', value: `${result.employerPaidWeeks} weeks`, sub: 'Govt reimburses employer' },
        { label: 'Government-paid (GPML)', value: `${result.govPaidWeeks} weeks` },
        ...(result.leaveEndDate ? [{ label: 'Return to work', value: formatDateShort(result.leaveEndDate) }] : []),
        { label: `${ordinal(form.childOrder)} child`, value: result.leaveType === 'GPML' ? 'GPML eligible' : 'Employment Act' },
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column: form steps ──────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Employment */}
          <StepSection step={1} title="Your employment type">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EMPLOYMENT_OPTIONS.map((opt) => (
                <RadioCard
                  key={opt.value}
                  label={opt.label}
                  description={opt.description}
                  checked={form.employmentType === opt.value}
                  onClick={() => setField('employmentType', opt.value)}
                />
              ))}
            </div>
          </StepSection>

          {/* Step 2 — Citizenship */}
          <StepSection step={2} title="Citizenship details">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Mother&apos;s citizenship
                <InfoTooltip content="Your citizenship affects GPML eligibility for non-SC babies." />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CITIZENSHIP_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={form.motherCitizenship === opt.value}
                    onClick={() => setField('motherCitizenship', opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="label-stitch flex items-center gap-1 mb-2">
                Baby&apos;s citizenship
                <InfoTooltip content="SC babies get 16 weeks GPML. Non-SC babies get 12 weeks under Employment Act." />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CITIZENSHIP_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={form.babyCitizenship === opt.value}
                    onClick={() => setField('babyCitizenship', opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="label-stitch flex items-center gap-1 mb-2">
                Child order
                <InfoTooltip content="3rd+ child: all 16 weeks are government-reimbursed (up to $40,000 cap)." />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <RadioCard
                    key={n}
                    label={`${ordinal(n)}${n === 4 ? '+' : ''}`}
                    checked={form.childOrder === n}
                    onClick={() => setField('childOrder', n)}
                  />
                ))}
              </div>
            </div>
          </StepSection>

          {/* Step 3 — Pay & Dates */}
          <StepSection step={3} title="Salary & dates">
            <div>
              <label htmlFor="mat-salary" className="label-stitch flex items-center gap-1 mb-2">
                Gross monthly salary (SGD)
                <InfoTooltip content="Government pay is capped at $357.14/day ($10,000/28 days)." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input
                  id="mat-salary"
                  type="number"
                  min={0}
                  step={100}
                  value={form.monthlySalary || ''}
                  onChange={(e) => setField('monthlySalary', Number(e.target.value))}
                  placeholder="e.g. 4500"
                  className="input-stitch pl-7"
                />
              </div>
              {form.monthlySalary > 0 && (
                <p className="text-xs text-on-surface-variant mt-1">
                  Daily rate: {formatSGD(Math.min((form.monthlySalary * 12) / 365, 357.14))}/day
                  {(form.monthlySalary * 12) / 365 > 357.14 && ' (capped at $357.14)'}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="mat-delivery" className="label-stitch mb-2 block">
                Expected delivery date
              </label>
              <input
                id="mat-delivery"
                type="date"
                value={form.deliveryDate.toISOString().split('T')[0]}
                onChange={(e) => setField('deliveryDate', new Date(e.target.value))}
                className="input-stitch"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="mat-service" className="label-stitch flex items-center gap-1 mb-2">
                Employment start date (optional)
                <InfoTooltip content="We'll check if you meet the 90-day eligibility requirement before delivery." />
              </label>
              <input
                id="mat-service"
                type="date"
                value={form.serviceStartDate?.toISOString().split('T')[0] ?? ''}
                onChange={(e) => setField('serviceStartDate', e.target.value ? new Date(e.target.value) : undefined)}
                className="input-stitch"
              />
            </div>
          </StepSection>
        </div>

        {/* ── Right column: summary panel ──────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.eligible ? `${result.totalWeeks} weeks` : '—'}
            statLabel={result.eligible ? 'total maternity leave' : undefined}
            rows={summaryRows}
            payTotal={result.eligible && form.monthlySalary > 0 ? result.totalPayEstimate : undefined}
            payLabel="Estimated total pay"
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityIssue}
          />

          {result.eligible && (
            <ShareCard leaveType="maternity" />
          )}
        </div>
      </div>

      {/* Notes */}
      {result.eligible && result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">Important notes</h3>
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
