'use client'

import { useState, useMemo } from 'react'
import { calculatePayDuringLeave } from '@/lib/calculations/pay'
import type { PayCalculatorInput } from '@/lib/calculations/pay'
import StepSection from '@/components/calculators/shared/StepSection'
import RadioCard from '@/components/calculators/shared/RadioCard'
import SummaryPanel from '@/components/calculators/shared/SummaryPanel'
import type { SummaryRow } from '@/components/calculators/shared/SummaryPanel'
import ShareCard from '@/components/calculators/results/ShareCard'
import InfoTooltip from '@/components/ui/InfoTooltip'
import { formatSGD } from '@/lib/utils/formatters'

const today = new Date()

export default function PayCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(5000)
  const [annualBonus, setAnnualBonus] = useState(0)
  const [bonusPayMonth, setBonusPayMonth] = useState(12)
  const [maternityWeeks, setMaternityWeeks] = useState(16)
  const [paternityWeeks, setPaternityWeeks] = useState(0)
  const [splWeeks, setSplWeeks] = useState(0)
  const [leaveStartMonth, setLeaveStartMonth] = useState(today.getMonth() + 1)
  const [leaveStartYear] = useState(today.getFullYear())

  const input: PayCalculatorInput = {
    monthlySalary,
    annualBonus,
    bonusPayMonth,
    maternityWeeks: maternityWeeks || undefined,
    paternityWeeks: paternityWeeks || undefined,
    splWeeks: splWeeks || undefined,
    leaveStartMonth,
    leaveStartYear,
    includeCPFNote: true,
  }

  const result = useMemo(() => calculatePayDuringLeave(input), [input])

  const summaryRows: SummaryRow[] = result.segments.length > 0
    ? [
        ...(result.totalEmployerPaid > 0
          ? [{ label: 'Employer-paid portion', value: formatSGD(result.totalEmployerPaid, { decimals: 0 }) }]
          : []),
        ...(result.totalGovernmentPaid > 0
          ? [{ label: 'Government-paid portion', value: formatSGD(result.totalGovernmentPaid, { decimals: 0 }), sub: 'Via employer reimbursement' }]
          : []),
        { label: 'Total weeks of leave', value: `${result.segments.reduce((s, seg) => s + seg.days, 0) / 7} weeks` },
        { label: 'Daily rate', value: `${formatSGD(result.dailyRate)}/day`, sub: result.dailyRateCapped ? 'Capped at $357.14/day' : undefined },
      ]
    : []

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="md:col-span-7 space-y-4">

          {/* Step 1 — Salary */}
          <StepSection step={1} title="Your salary">
            <div>
              <label htmlFor="pc-salary" className="label-stitch flex items-center gap-1 mb-2">
                Gross monthly salary (SGD)
                <InfoTooltip content="Government-paid leave is capped at $357.14/day ($10,000 per 28 days). Employer-paid portion has no cap." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                <input
                  id="pc-salary"
                  type="number"
                  min={0}
                  step={100}
                  value={monthlySalary || ''}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  placeholder="e.g. 5000"
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

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pc-bonus" className="label-stitch block mb-2">Annual bonus / AWS (SGD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    id="pc-bonus"
                    type="number"
                    min={0}
                    step={100}
                    value={annualBonus || ''}
                    onChange={(e) => setAnnualBonus(Number(e.target.value))}
                    placeholder="0"
                    className="input-stitch pl-7"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pc-bonus-month" className="label-stitch block mb-2">Bonus pay month</label>
                <select
                  id="pc-bonus-month"
                  value={bonusPayMonth}
                  onChange={(e) => setBonusPayMonth(Number(e.target.value))}
                  className="input-stitch"
                  disabled={!annualBonus}
                >
                  {months.map((m, i) => (
                    <option key={i} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </StepSection>

          {/* Step 2 — Leave types */}
          <StepSection step={2} title="Leave types to include">
            <p className="text-sm text-on-surface-variant mb-3">Select 0 weeks to exclude a leave type.</p>

            <div className="space-y-4">
              <div>
                <p className="label-stitch mb-2">Maternity leave weeks (0–16)</p>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 4, 8, 12, 16].map((w) => (
                    <RadioCard
                      key={w}
                      label={`${w}w`}
                      checked={maternityWeeks === w}
                      onClick={() => setMaternityWeeks(w)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="label-stitch mb-2">Paternity leave weeks (0–4)</p>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map((w) => (
                    <RadioCard
                      key={w}
                      label={`${w}w`}
                      checked={paternityWeeks === w}
                      onClick={() => setPaternityWeeks(w)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="label-stitch mb-2">Shared parental leave weeks (0–10)</p>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 2, 4, 6, 10].map((w) => (
                    <RadioCard
                      key={w}
                      label={`${w}w`}
                      checked={splWeeks === w}
                      onClick={() => setSplWeeks(w)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepSection>

          {/* Step 3 — Timeline */}
          <StepSection step={3} title="Leave start month">
            <div>
              <p className="label-stitch mb-2">Which month does leave start?</p>
              <div className="grid grid-cols-4 gap-2">
                {months.map((m, i) => (
                  <RadioCard
                    key={i}
                    label={m}
                    checked={leaveStartMonth === i + 1}
                    onClick={() => setLeaveStartMonth(i + 1)}
                  />
                ))}
              </div>
            </div>
          </StepSection>
        </div>

        {/* ── Right column ─────────────────────────────────────────────────── */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
          <SummaryPanel
            stat={result.segments.length > 0 ? formatSGD(result.totalLeaveIncome, { decimals: 0 }) : '—'}
            statLabel={result.segments.length > 0 ? 'estimated total leave income' : 'Select at least one leave type'}
            rows={summaryRows}
          />

          {/* Monthly breakdown */}
          {result.monthlyBreakdown.length > 0 && (
            <div className="card-surface space-y-3">
              <h3 className="font-headline font-semibold text-sm text-on-surface">Monthly income breakdown</h3>
              <div className="space-y-1">
                {result.monthlyBreakdown.map((month, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-outline-variant/15 last:border-0">
                    <div>
                      <p className="text-sm text-on-surface">{month.label}</p>
                      {month.inLeave && month.leaveType && (
                        <p className="text-xs text-on-surface-variant truncate max-w-[180px]">{month.leaveType.split('(')[0].trim()}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-sm font-semibold ${month.inLeave ? 'text-primary' : 'text-on-surface'}`}>
                        {formatSGD(month.grossIncome, { decimals: 0 })}
                      </p>
                      {month.inLeave && (
                        <p className="text-xs text-on-surface-variant">Leave pay</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant">{result.cpfNote}</p>
            </div>
          )}

          <ShareCard leaveType="pay-calculator" />
        </div>
      </div>

      {/* Notes */}
      {result.notes.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">Pay notes</h3>
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
