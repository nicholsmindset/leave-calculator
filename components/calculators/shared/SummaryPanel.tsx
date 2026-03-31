import GovernmentBadge from '@/components/ui/GovernmentBadge'

export interface SummaryRow {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}

interface SummaryPanelProps {
  title?: string
  stat: string           // large number shown prominently
  statLabel?: string     // e.g. "total leave"
  rows?: SummaryRow[]
  payTotal?: number
  payLabel?: string
  govSource?: string
  children?: React.ReactNode   // optional extra content (sliders, etc.)
  notEligible?: boolean
  notEligibleReason?: string
}

export default function SummaryPanel({
  title = 'Real-time Summary',
  stat,
  statLabel,
  rows = [],
  payTotal,
  payLabel = 'Estimated pay',
  govSource = 'https://www.mom.gov.sg/employment-practices/leave',
  children,
  notEligible,
  notEligibleReason,
}: SummaryPanelProps) {
  if (notEligible) {
    return (
      <div className="card-surface border border-amber-200 bg-amber-50/50 space-y-3" role="alert">
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-amber-600 text-[22px] flex-shrink-0 mt-0.5" aria-hidden="true">
            warning
          </span>
          <div>
            <p className="font-headline font-semibold text-sm text-on-surface">Not eligible</p>
            <p className="text-sm text-on-surface-variant mt-1">{notEligibleReason}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="result-panel rounded-3xl p-6 space-y-5" role="region" aria-label={title}>
      {/* Header */}
      <div>
        <p className="text-xs text-white/60 uppercase tracking-widest font-semibold">{title}</p>
        <p className="text-4xl font-headline font-extrabold text-white mt-2 leading-none">{stat}</p>
        {statLabel && <p className="text-sm text-white/60 mt-1">{statLabel}</p>}
      </div>

      {/* Optional extra content (e.g. slider) */}
      {children && (
        <div className="bg-white/10 rounded-2xl p-4">
          {children}
        </div>
      )}

      {/* Breakdown rows */}
      {rows.length > 0 && (
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className={`flex justify-between items-start gap-3 ${
              i < rows.length - 1 ? 'pb-3 border-b border-white/10' : ''
            }`}>
              <div className="min-w-0">
                <p className={`text-sm leading-snug ${row.highlight ? 'text-white font-semibold' : 'text-white/70'}`}>
                  {row.label}
                </p>
                {row.sub && <p className="text-xs text-white/50 mt-0.5">{row.sub}</p>}
              </div>
              <p className={`text-sm flex-shrink-0 ${row.highlight ? 'text-white font-bold' : 'text-white font-medium'}`}>
                {row.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pay total */}
      {payTotal !== undefined && (
        <div className="border-t border-white/20 pt-4 flex justify-between items-center">
          <p className="text-sm text-white/70">{payLabel}</p>
          <p className="text-2xl font-headline font-extrabold text-accent">
            ${payTotal.toLocaleString('en-SG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
      )}

      {/* Source badge */}
      <GovernmentBadge
        href={govSource}
        className="border-white/25 text-white/70 bg-white/10 hover:bg-white/20"
      />
    </div>
  )
}
