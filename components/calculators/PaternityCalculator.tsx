'use client'

import { useState, useMemo } from 'react'
import { calculatePaternityLeave } from '@/lib/calculations/paternity'
import type { PaternityLeaveInput } from '@/lib/calculations/paternity'
import type { EmploymentType, CitizenshipStatus } from '@/lib/constants'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD, formatDateShort } from '@/lib/utils/formatters'

const INITIAL: PaternityLeaveInput = {
  employmentType: 'employee',
  babyCitizenship: 'SC',
  monthlySalary: 5000,
  isMarried: true,
  birthDate: undefined,
  serviceStartDate: undefined,
}

const EMPLOYMENT_OPTIONS: { value: EmploymentType; label: string; description: string }[] = [
  { value: 'employee', label: 'Employee', description: 'Working for an employer' },
  { value: 'self-employed', label: 'Self-employed', description: 'Own business or freelance' },
  { value: 'contract', label: 'Contract', description: 'Fixed-term contract' },
]

const CITIZENSHIP_OPTIONS: { value: CitizenshipStatus; label: string; description: string }[] = [
  { value: 'SC', label: 'Singapore Citizen', description: '4 weeks GPPL from Apr 2025' },
  { value: 'PR', label: 'Permanent Resident', description: '2 weeks GPPL' },
  { value: 'foreigner', label: 'Foreigner / EP holder', description: '2 weeks GPPL' },
]

export default function PaternityCalculator() {
  const [form, setForm] = useState<PaternityLeaveInput>(INITIAL)
  const result = useMemo(() => calculatePaternityLeave(form), [form])

  function setField<K extends keyof PaternityLeaveInput>(key: K, value: PaternityLeaveInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: 'Government-Paid Paternity Leave', value: `${result.weeks} weeks`, highlight: true },
        { label: 'Paid by', value: 'Government (via employer)', sub: 'Reimbursed to your employer' },
        ...(result.lastDateToUse ? [{ label: 'Must use by', value: formatDateShort(result.lastDateToUse), sub: '12 months from birth' }] : []),
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Eligibility */}
          <StepSection step={1} title="Your situation">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Marital status
                <InfoTooltip content="GPPL requires you to be or have been lawfully married to the child's mother." />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RadioCard
                  label="Married / was married"
                  description="Lawfully married to the child's mother"
                  checked={form.isMarried}
                  onClick={() => setField('isMarried', true)}
                />
                <RadioCard
                  label="Not married"
                  description="Not in a qualifying marriage"
                  checked={!form.isMarried}
                  onClick={() => setField('isMarried', false)}
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="label-stitch mb-2">Employment type</p>
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
            </div>
          </StepSection>

          {/* Step 2 — Baby details */}
          <StepSection step={2} title="Baby details">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Baby&apos;s citizenship
                <InfoTooltip content="SC babies get 4 weeks GPPL (from April 2025). Non-SC babies get 2 weeks." />
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
              <label htmlFor="pat-birth" className="label-stitch block mb-2">
                Birth date (or expected)
              </label>
              <input
                id="pat-birth"
                type="date"
                value={form.birthDate?.toISOString().split('T')[0] ?? ''}
                onChange={(e) => setField('birthDate', e.target.value ? new Date(e.target.value) : undefined)}
                className="input-stitch"
              />
            </div>
          </StepSection>

          {/* Step 3 — Pay */}
          <StepSection step={3} title="Pay details">
            <div>
              <label htmlFor="pat-salary" className="label-stitch flex items-center gap-1 mb-2">
                Gross monthly salary (SGD)
                <InfoTooltip content="Government pay is capped at $357.14/day ($2,500/week, $10,000 for 4 weeks)." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input
                  id="pat-salary"
                  type="number"
                  min={0}
                  step={100}
                  value={form.monthlySalary || ''}
                  onChange={(e) => setField('monthlySalary', Number(e.target.value))}
                  placeholder="e.g. 5000"
                  className="input-stitch pl-7"
                />
              </div>
              {form.monthlySalary > 0 && (
                <p className="text-xs text-on-surface-variant mt-1">
                  Daily rate: {formatSGD(Math.min((form.monthlySalary * 12) / 365, 357.14))}/day
                  {(form.monthlySalary * 12) / 365 > 357.14 && ' (capped)'}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="pat-service" className="label-stitch flex items-center gap-1 mb-2">
                Employment start date (optional)
                <InfoTooltip content="We'll check if you have 90 days of continuous service before birth." />
              </label>
              <input
                id="pat-service"
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
            stat={result.eligible ? `${result.weeks} weeks` : '—'}
            statLabel={result.eligible ? 'Government-Paid Paternity Leave' : undefined}
            rows={summaryRows}
            payTotal={result.eligible && form.monthlySalary > 0 ? result.govPayTotal : undefined}
            payLabel="Estimated GPPL pay"
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityIssue}
          />

          {result.eligible && result.canSplit && result.splitOptions.length > 0 && (
            <div className="card-surface space-y-3">
              <h3 className="font-headline font-semibold text-sm text-on-surface">Flexible split options</h3>
              <p className="text-xs text-on-surface-variant">Take GPPL in blocks within 12 months of birth.</p>
              <div className="space-y-2">
                {result.splitOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px] text-primary" aria-hidden="true">check_circle</span>
                    {opt.label} ({opt.weeks.join(' + ')} wks)
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.eligible && <ShareCard leaveType="paternity" />}
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
