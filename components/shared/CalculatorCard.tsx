import Link from 'next/link'

interface CalculatorCardProps {
  href: string
  title: string
  description: string
  icon: string
  badge?: string
  highlight?: boolean
}

export default function CalculatorCard({
  href,
  title,
  description,
  icon,
  badge,
  highlight = false,
}: CalculatorCardProps) {
  return (
    <Link
      href={href}
      className={`group card-surface flex flex-col gap-4 hover:shadow-card hover:border-primary/30 transition-all ${
        highlight ? 'border-primary/40 bg-primary/5' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            highlight
              ? 'primary-gradient'
              : 'bg-surface-container group-hover:bg-primary/10 transition-colors'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] ${
              highlight ? 'text-white' : 'text-primary'
            }`}
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>
        {badge && (
          <span className="text-xs font-semibold bg-tertiary-fixed-dim/30 text-on-surface px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-auto">
        Calculate
        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
          arrow_forward
        </span>
      </div>
    </Link>
  )
}
