import { formatSGD, formatWeeksAndDays } from '@/lib/utils/formatters'
import GovernmentBadge from '@/components/ui/GovernmentBadge'

interface LeaveResultRow {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}

interface LeaveResultProps {
  title?: string
  rows: LeaveResultRow[]
  totalWeeks?: number
  totalDays?: number
  govPayTotal?: number
  employerPayTotal?: number
  govPayCap?: number
  govSource?: string
  className?: string
  notes?: string[]
}

export default function LeaveResult({
  title = 'Your Leave Entitlement',
  rows,
  totalWeeks,
  totalDays,
  govPayTotal,
  employerPayTotal,
  govPayCap,
  govSource = 'https://www.mom.gov.sg/employment-practices/leave',
  className = '',
  notes = [],
}: LeaveResultProps) {
  return (
    <div
      className={`result-panel rounded-2xl p-6 space-y-5 ${className}`}
      role="region"
      aria-label={title}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-headline font-bold text-lg text-white">{title}</h2>
          {(totalWeeks !== undefined || totalDays !== undefined) && (
            <p className="text-3xl font-headline font-extrabold text-white mt-1">
              {totalWeeks !== undefined
                ? `${totalWeeks} weeks`
                : formatWeeksAndDays(totalDays!)}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white text-[24px]" aria-hidden="true">
            event_available
          </span>
        </div>
      </div>

      {/* Breakdown rows */}
      {rows.length > 0 && (
        <div className="bg-white/10 rounded-xl p-4 space-y-3">
          {rows.map((row, i) => (
            <div key={i} className={`flex justify-between items-start gap-2 ${row.highlight ? 'font-semibold' : ''}`}>
              <span className="text-sm text-white/80 leading-snug">{row.label}</span>
              <div className="text-right flex-shrink-0">
                <span className="text-sm text-white font-medium">{row.value}</span>
                {row.sub && <p className="text-xs text-white/60 mt-0.5">{row.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pay summary */}
      {(govPayTotal !== undefined || employerPayTotal !== undefined) && (
        <div className="border-t border-white/20 pt-4 space-y-2">
          <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">Estimated Pay</p>
          {employerPayTotal !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Employer-paid portion</span>
              <span className="text-white font-medium">{formatSGD(employerPayTotal, { decimals: 0 })}</span>
            </div>
          )}
          {govPayTotal !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Government-paid portion</span>
              <span className="text-white font-medium">{formatSGD(govPayTotal, { decimals: 0 })}</span>
            </div>
          )}
          {govPayCap !== undefined && (
            <p className="text-xs text-white/50 mt-1">
              Gov pay capped at {formatSGD(govPayCap, { decimals: 0 })} (incl. CPF)
            </p>
          )}
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="bg-white/10 rounded-xl p-3 space-y-1.5">
          {notes.map((note, i) => (
            <p key={i} className="text-xs text-white/70 leading-relaxed flex gap-1.5">
              <span className="material-symbols-outlined text-[13px] flex-shrink-0 mt-0.5" aria-hidden="true">info</span>
              {note}
            </p>
          ))}
        </div>
      )}

      {/* Source badge */}
      <GovernmentBadge
        href={govSource}
        className="border-white/30 text-white/80 bg-white/10 hover:bg-white/20"
      />
    </div>
  )
}
