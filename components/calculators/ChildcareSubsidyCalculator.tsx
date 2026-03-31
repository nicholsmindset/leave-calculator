'use client'

import { useState, useMemo } from 'react'
import { calculateChildcareSubsidy } from '@/lib/calculations/childcareSubsidy'
import type { ChildcareSubsidyInput, FacilityType, CentreType } from '@/lib/calculations/childcareSubsidy'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD } from '@/lib/utils/formatters'

const INITIAL: ChildcareSubsidyInput = {
  facilityType: 'childcare',
  centreType: 'anchor-operator',
  grossMonthlyHouseholdIncome: 5000,
  childCitizenship: 'SC',
  bothParentsWorking: true,
  monthlyFees: 500,
}

const FACILITY_OPTIONS: { value: FacilityType; label: string; description: string }[] = [
  { value: 'childcare', label: 'Childcare Centre', description: '18 months – 6 years old' },
  { value: 'infant-care', label: 'Infant Care Centre', description: '2 – 18 months old' },
]

const CENTRE_OPTIONS: { value: CentreType; label: string; description: string }[] = [
  { value: 'anchor-operator', label: 'Anchor Operator (AO)', description: 'Fee-capped at $610/month' },
  { value: 'partner-operator', label: 'Partner Operator (POP)', description: 'Fee-capped at $650/month' },
  { value: 'private', label: 'Private Centre', description: 'No fee cap — subsidies still apply' },
]

const CITIZENSHIP_OPTIONS: { value: 'SC' | 'PR' | 'other'; label: string; description: string }[] = [
  { value: 'SC', label: 'Singapore Citizen', description: 'Full subsidy entitlement' },
  { value: 'PR', label: 'Permanent Resident', description: 'Basic subsidy only' },
  { value: 'other', label: 'Other', description: 'Not eligible for subsidy' },
]

export default function ChildcareSubsidyCalculator() {
  const [form, setForm] = useState<ChildcareSubsidyInput>(INITIAL)

  const result = useMemo(() => calculateChildcareSubsidy(form), [form])

  function setField<K extends keyof ChildcareSubsidyInput>(key: K, value: ChildcareSubsidyInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: 'Basic Subsidy', value: formatSGD(result.basicSubsidy, { decimals: 0 }) + '/month' },
        ...(result.additionalSubsidy > 0
          ? [{ label: 'Additional Subsidy', value: formatSGD(result.additionalSubsidy, { decimals: 0 }) + '/month', sub: `Income range: ${result.incomeRange}` }]
          : []),
        { label: 'Total Subsidy', value: formatSGD(result.totalSubsidy, { decimals: 0 }) + '/month', highlight: true },
        { label: 'Monthly fees charged', value: formatSGD(result.actualFees, { decimals: 0 }) },
        ...(result.feeCap ? [{ label: 'Fee cap (max)', value: formatSGD(result.feeCap, { decimals: 0 }) }] : []),
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Facility type */}
          <StepSection step={1} title="Type of childcare">
            <div>
              <p className="label-stitch mb-2">Facility type</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FACILITY_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={form.facilityType === opt.value}
                    onClick={() => setField('facilityType', opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="label-stitch flex items-center gap-1 mb-2">
                Centre type
                <InfoTooltip content="AO and POP centres have fee caps. Private centres have no cap but subsidies still apply." />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CENTRE_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={form.centreType === opt.value}
                    onClick={() => setField('centreType', opt.value)}
                  />
                ))}
              </div>
            </div>
          </StepSection>

          {/* Step 2 — Child & Parents */}
          <StepSection step={2} title="Child & parents">
            <div>
              <p className="label-stitch mb-2">Child&apos;s citizenship</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CITIZENSHIP_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    description={opt.description}
                    checked={form.childCitizenship === opt.value}
                    onClick={() => setField('childCitizenship', opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="label-stitch flex items-center gap-1 mb-2">
                Are both parents working?
                <InfoTooltip content="The working mother/single father Basic Subsidy is higher if both parents are employed." />
              </p>
              <div className="grid grid-cols-2 gap-3">
                <RadioCard
                  label="Yes, both working"
                  description="Higher basic subsidy"
                  checked={form.bothParentsWorking}
                  onClick={() => setField('bothParentsWorking', true)}
                />
                <RadioCard
                  label="Only one working"
                  description="Lower basic subsidy"
                  checked={!form.bothParentsWorking}
                  onClick={() => setField('bothParentsWorking', false)}
                />
              </div>
            </div>
          </StepSection>

          {/* Step 3 — Income & Fees */}
          <StepSection step={3} title="Income & fees">
            <div>
              <label htmlFor="cs-income" className="label-stitch flex items-center gap-1 mb-2">
                Gross monthly household income
                <InfoTooltip content="Combined income of both parents. Additional Subsidy is means-tested up to $12,000/month." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input
                  id="cs-income"
                  type="number"
                  min={0}
                  step={500}
                  value={form.grossMonthlyHouseholdIncome || ''}
                  onChange={(e) => setField('grossMonthlyHouseholdIncome', Number(e.target.value))}
                  placeholder="e.g. 5000"
                  className="input-stitch pl-7"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="cs-fees" className="label-stitch flex items-center gap-1 mb-2">
                Monthly fees charged by centre
                <InfoTooltip content="Subsidies are applied to your actual fees or the fee cap (whichever is lower for AO/POP centres)." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input
                  id="cs-fees"
                  type="number"
                  min={0}
                  step={50}
                  value={form.monthlyFees || ''}
                  onChange={(e) => setField('monthlyFees', Number(e.target.value))}
                  placeholder="e.g. 500"
                  className="input-stitch pl-7"
                />
              </div>
            </div>
          </StepSection>
        </div>

        {/* ── Right column: summary panel ──────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.eligible ? formatSGD(result.netFeePayable, { decimals: 0 }) + '/mo' : '—'}
            statLabel={result.eligible ? 'net monthly fee after subsidy' : undefined}
            rows={summaryRows}
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityNote}
            govSource="https://www.ecda.gov.sg/parents/subsidies-financial-assistance"
          />
          {result.eligible && <ShareCard leaveType="childcare-subsidy" />}
        </div>
      </div>

      {/* Notes */}
      {result.eligible && result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">About childcare subsidies</h3>
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
