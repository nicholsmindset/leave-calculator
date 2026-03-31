import { formatSGD } from '@/lib/utils/formatters'

interface PayBreakdownRow {
  label: string
  amount: number
  paidBy?: 'employer' | 'government' | 'unpaid'
  isCapped?: boolean
}

interface PayResultProps {
  title?: string
  dailyRate?: number
  dailyRateCapped?: boolean
  rows: PayBreakdownRow[]
  totalPay: number
  className?: string
}

const paidByLabel: Record<string, string> = {
  employer: 'Employer',
  government: 'Government',
  unpaid: 'Unpaid',
}

const paidByColor: Record<string, string> = {
  employer: 'bg-primary/20 text-primary',
  government: 'bg-tertiary-fixed-dim/30 text-on-surface',
  unpaid: 'bg-outline-variant/30 text-on-surface-variant',
}

export default function PayResult({
  title = 'Estimated Pay During Leave',
  dailyRate,
  dailyRateCapped,
  rows,
  totalPay,
  className = '',
}: PayResultProps) {
  return (
    <div className={`card-surface space-y-5 ${className}`} role="region" aria-label={title}>
      <div>
        <h3 className="font-headline font-bold text-base text-on-surface">{title}</h3>
        <p className="text-3xl font-headline font-extrabold text-primary mt-1">
          {formatSGD(totalPay, { decimals: 0 })}
        </p>
        <p className="text-xs text-on-surface-variant mt-1">Gross estimate (before CPF deductions and income tax)</p>
      </div>

      {/* Daily rate */}
      {dailyRate !== undefined && (
        <div className="bg-surface-container rounded-xl px-4 py-3 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-on-surface">Your daily rate</p>
            {dailyRateCapped && (
              <p className="text-xs text-on-surface-variant">Capped at $357.14/day</p>
            )}
          </div>
          <p className="font-headline font-bold text-primary">{formatSGD(dailyRate)}<span className="text-xs font-normal text-on-surface-variant">/day</span></p>
        </div>
      )}

      {/* Breakdown */}
      {rows.length > 0 && (
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-outline-variant/20 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-on-surface truncate">{row.label}</p>
                {row.isCapped && (
                  <p className="text-xs text-on-surface-variant">Capped at government limit</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {row.paidBy && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paidByColor[row.paidBy]}`}>
                    {paidByLabel[row.paidBy]}
                  </span>
                )}
                <p className="text-sm font-semibold text-on-surface">
                  {row.paidBy === 'unpaid' ? '—' : formatSGD(row.amount, { decimals: 0 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-on-surface-variant leading-relaxed">
        Government-paid leave pay is reimbursed to your employer, who continues to pay your salary. CPF contributions still apply on these amounts.
      </p>
    </div>
  )
}
