'use client'

import { useState, useMemo } from 'react'
import { calculateSPL } from '@/lib/calculations/spl'
import type { SPLInput } from '@/lib/calculations/spl'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD } from '@/lib/utils/formatters'

const today = new Date()

const INITIAL: SPLInput = {
  birthDate: today,
  motherEmploymentType: 'employee',
  fatherEmploymentType: 'employee',
  motherMonthlySalary: 4500,
  fatherMonthlySalary: 5000,
  weeksSplitToFather: undefined,
  motherEligible: true,
  fatherEligible: true,
  fatherIsMarried: true,
}

export default function SPLPlanner() {
  const [form, setForm] = useState<SPLInput>(INITIAL)
  const [customSplit, setCustomSplit] = useState<number | undefined>(undefined)

  const inputWithSplit: SPLInput = { ...form, weeksSplitToFather: customSplit }
  const result = useMemo(() => calculateSPL(inputWithSplit), [inputWithSplit])

  function setField<K extends keyof SPLInput>(key: K, value: SPLInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const totalWeeks = result.totalSPLWeeks
  const fatherWeeks = customSplit ?? result.fatherSPLWeeks
  const motherWeeks = totalWeeks - fatherWeeks
  const fatherPct = totalWeeks > 0 ? Math.round((fatherWeeks / totalWeeks) * 100) : 0
  const motherPct = 100 - fatherPct

  const summaryRows: SummaryRow[] = result.eligible
    ? [
        { label: `Phase ${result.phase} SPL pool`, value: `${totalWeeks} weeks`, highlight: true },
        { label: "Mother's SPL", value: `${motherWeeks} weeks` },
        { label: "Father's SPL", value: `${fatherWeeks} weeks` },
        { label: 'Total family leave', value: `${result.totalFamilyLeaveWeeks} weeks`, sub: 'GPML + GPPL + SPL' },
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Birth & Eligibility */}
          <StepSection step={1} title="Family details">
            <div>
              <label htmlFor="spl-birth" className="label-stitch flex items-center gap-1 mb-2">
                Baby&apos;s birth date (or expected)
                <InfoTooltip content="SPL pool size depends on birth date: Phase 1 (before Apr 2026) = 6 weeks; Phase 2 (Apr 2026+) = 10 weeks." />
              </label>
              <input
                id="spl-birth"
                type="date"
                value={form.birthDate.toISOString().split('T')[0]}
                onChange={(e) => setField('birthDate', new Date(e.target.value))}
                className="input-stitch"
              />
              {result.phase === 2 && (
                <p className="text-xs text-primary font-medium mt-1">
                  Phase 2 — 10 weeks SPL (born Apr 2026 or later)
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="label-stitch flex items-center gap-1 mb-2">
                  Mother eligible for GPML?
                  <InfoTooltip content="Mother must be eligible for GPML before SPL is available." />
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <RadioCard label="Yes" checked={form.motherEligible} onClick={() => setField('motherEligible', true)} />
                  <RadioCard label="No" checked={!form.motherEligible} onClick={() => setField('motherEligible', false)} />
                </div>
              </div>
              <div>
                <p className="label-stitch flex items-center gap-1 mb-2">
                  Father married to mother?
                  <InfoTooltip content="Father must be or have been lawfully married to the mother." />
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <RadioCard label="Yes" checked={form.fatherIsMarried} onClick={() => setField('fatherIsMarried', true)} />
                  <RadioCard label="No" checked={!form.fatherIsMarried} onClick={() => setField('fatherIsMarried', false)} />
                </div>
              </div>
            </div>
          </StepSection>

          {/* Step 2 — Salaries */}
          <StepSection step={2} title="Monthly salaries">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="spl-msalary" className="label-stitch block mb-2">Mother&apos;s salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    id="spl-msalary"
                    type="number"
                    min={0}
                    step={100}
                    value={form.motherMonthlySalary || ''}
                    onChange={(e) => setField('motherMonthlySalary', Number(e.target.value))}
                    placeholder="e.g. 4500"
                    className="input-stitch pl-7"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="spl-fsalary" className="label-stitch block mb-2">Father&apos;s salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    id="spl-fsalary"
                    type="number"
                    min={0}
                    step={100}
                    value={form.fatherMonthlySalary || ''}
                    onChange={(e) => setField('fatherMonthlySalary', Number(e.target.value))}
                    placeholder="e.g. 5000"
                    className="input-stitch pl-7"
                  />
                </div>
              </div>
            </div>
          </StepSection>

          {/* Step 3 — Split slider */}
          {result.eligible && (
            <StepSection step={3} title="Plan your SPL split">
              <div>
                <p className="label-stitch flex items-center gap-1 mb-3">
                  How many weeks does the father take?
                  <InfoTooltip content="SPL can be split freely between parents. Drag the slider to plan your split." />
                </p>
                <input
                  type="range"
                  min={0}
                  max={totalWeeks}
                  step={1}
                  value={fatherWeeks}
                  onChange={(e) => setCustomSplit(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label={`Father takes ${fatherWeeks} weeks, mother takes ${motherWeeks} weeks`}
                />
                {/* Visual bar */}
                <div className="h-3 rounded-full overflow-hidden flex mt-3">
                  <div className="bg-primary transition-all" style={{ width: `${motherPct}%` }} title={`Mother: ${motherWeeks} weeks`} />
                  <div className="bg-primary-fixed-dim transition-all" style={{ width: `${fatherPct}%` }} title={`Father: ${fatherWeeks} weeks`} />
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                  <span>Mother: <strong className="text-primary">{motherWeeks} wks</strong></span>
                  <span>Father: <strong className="text-primary">{fatherWeeks} wks</strong></span>
                </div>
              </div>

              {/* Scenario quick-picks */}
              <div className="mt-4 space-y-2">
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wide">Quick scenarios</p>
                {result.scenarios.map((sc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCustomSplit(sc.fatherWeeks)}
                    className={`w-full flex justify-between items-center text-xs px-3 py-2.5 rounded-xl transition-colors ${
                      sc.fatherWeeks === fatherWeeks
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'bg-surface-container text-on-surface-variant hover:bg-primary/5'
                    }`}
                  >
                    <span>{sc.label}</span>
                    <span>
                      {sc.motherPay > 0 || sc.fatherPay > 0
                        ? formatSGD(sc.motherPay + sc.fatherPay, { decimals: 0 })
                        : ''}
                    </span>
                  </button>
                ))}
              </div>
            </StepSection>
          )}
        </div>

        {/* ── Right column: summary panel ──────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.eligible ? `${totalWeeks} weeks` : '—'}
            statLabel={result.eligible ? `SPL pool (Phase ${result.phase})` : undefined}
            rows={summaryRows}
            payTotal={result.eligible && (form.motherMonthlySalary > 0 || form.fatherMonthlySalary > 0) ? result.totalSPLPay : undefined}
            payLabel="Combined SPL pay"
            notEligible={!result.eligible}
            notEligibleReason={result.eligibilityIssue}
          />

          {result.eligible && <ShareCard leaveType="spl" />}
        </div>
      </div>

      {/* Notes */}
      {result.eligible && result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">How SPL works</h3>
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
