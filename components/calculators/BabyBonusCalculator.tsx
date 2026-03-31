'use client'

import { useState, useMemo } from 'react'
import { calculateBabyBonus } from '@/lib/calculations/babyBonus'
import type { CitizenshipStatus } from '@/lib/constants'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD, formatSGDWhole, ordinal, formatDateShort } from '@/lib/utils/formatters'

const today = new Date()

const CITIZENSHIP_OPTIONS: { value: CitizenshipStatus; label: string; description: string }[] = [
  { value: 'SC', label: 'Singapore Citizen', description: 'Full Baby Bonus entitlement' },
  { value: 'PR', label: 'Permanent Resident', description: 'Not eligible for Baby Bonus' },
  { value: 'foreigner', label: 'Foreigner', description: 'Not eligible for Baby Bonus' },
]

export default function BabyBonusCalculator() {
  const [childOrder, setChildOrder] = useState(1)
  const [citizenship, setCitizenship] = useState<CitizenshipStatus>('SC')
  const [birthDate, setBirthDate] = useState(today)
  const [plannedCDA, setPlannedCDA] = useState(0)

  const result = useMemo(
    () => calculateBabyBonus({ childOrder, childCitizenship: citizenship, birthDate, plannedCDAContributions: plannedCDA }),
    [childOrder, citizenship, birthDate, plannedCDA]
  )

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: 'Cash Gift (5 payouts)', value: formatSGDWhole(result.cashGiftTotal), highlight: true },
        { label: 'CDA First Step Grant', value: formatSGDWhole(result.cdaFirstStep) },
        ...(result.cdaCoMatch > 0 ? [{ label: 'Govt CDA co-match', value: formatSGDWhole(result.cdaCoMatch), sub: `Based on $${plannedCDA.toLocaleString()} planned contributions` }] : []),
        { label: 'Co-match cap', value: formatSGDWhole(result.cdaCoMatchCap), sub: `For ${ordinal(childOrder)} child` },
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Baby details */}
          <StepSection step={1} title="Baby details">
            <div>
              <p className="label-stitch flex items-center gap-1 mb-2">
                Baby&apos;s citizenship
                <InfoTooltip content="Baby Bonus is only available for Singapore Citizen children." />
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
                Child order
                <InfoTooltip content="3rd+ children get higher cash gifts and $10,000 CDA First Step (Large Families Scheme) if born on/after 18 Feb 2025." />
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <RadioCard
                    key={n}
                    label={`${ordinal(n)}${n === 5 ? '+' : ''}`}
                    checked={childOrder === n}
                    onClick={() => setChildOrder(n)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="bb-birth" className="label-stitch flex items-center gap-1 mb-2">
                Birth date (or expected)
                <InfoTooltip content="Determines Large Families Scheme eligibility (3rd+ child born on/after 18 Feb 2025)." />
              </label>
              <input
                id="bb-birth"
                type="date"
                value={birthDate.toISOString().split('T')[0]}
                onChange={(e) => setBirthDate(new Date(e.target.value))}
                className="input-stitch"
              />
              {result.eligible && result.isLargeFamiliesScheme && (
                <p className="text-xs text-primary font-medium mt-1">
                  Large Families Scheme — enhanced CDA First Step of $10,000
                </p>
              )}
            </div>
          </StepSection>

          {/* Step 2 — CDA planning */}
          {result.eligible && (
            <StepSection step={2} title="CDA savings planning">
              <div>
                <label htmlFor="bb-cda" className="label-stitch flex items-center gap-1 mb-2">
                  Planned CDA contributions (SGD)
                  <InfoTooltip content="The government matches every dollar you save in the CDA, up to the co-match cap. Enter your planned lifetime contributions." />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    id="bb-cda"
                    type="number"
                    min={0}
                    step={500}
                    value={plannedCDA || ''}
                    onChange={(e) => setPlannedCDA(Number(e.target.value))}
                    placeholder="e.g. 3000"
                    className="input-stitch pl-7"
                  />
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Co-match cap: {formatSGD(result.cdaCoMatchCap, { decimals: 0 })} for {ordinal(childOrder)} child
                  {plannedCDA >= result.cdaCoMatchCap && ' — you will reach the maximum match!'}
                </p>
              </div>

              {/* Quick contribution buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[0, result.cdaCoMatchCap / 2, result.cdaCoMatchCap, result.cdaCoMatchCap * 1.5].map((amount, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPlannedCDA(Math.round(amount))}
                    className={`leave-radio-card justify-center py-2 text-xs ${plannedCDA === Math.round(amount) ? 'active' : ''}`}
                  >
                    {i === 0 ? 'None' : i === 3 ? 'Max+' : `${Math.round(amount / 1000)}k`}
                  </button>
                ))}
              </div>
            </StepSection>
          )}
        </div>

        {/* ── Right column: summary panel ──────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.eligible ? formatSGDWhole(result.totalBenefits) : '—'}
            statLabel={result.eligible ? 'total Baby Bonus' : undefined}
            rows={summaryRows}
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityNote}
          />

          {/* Cash gift payout schedule */}
          {result.eligible && (
            <div className="card-surface space-y-3">
              <h3 className="font-headline font-semibold text-sm text-on-surface">Cash Gift payout schedule</h3>
              <div className="space-y-1">
                {result.cashGiftPayouts.map((payout, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/20 last:border-0">
                    <div>
                      <p className="text-sm text-on-surface">{payout.milestone}</p>
                      {payout.estimatedDate && (
                        <p className="text-xs text-on-surface-variant">{formatDateShort(payout.estimatedDate)}</p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-primary">{formatSGDWhole(payout.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.eligible && <ShareCard leaveType="baby-bonus" />}
        </div>
      </div>

      {/* Notes */}
      {result.eligible && result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">How Baby Bonus works</h3>
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
