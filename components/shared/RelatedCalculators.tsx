import Link from 'next/link'

interface RelatedLink {
  href: string
  label: string
  description: string
  icon: string
}

const allRelated: Record<string, RelatedLink[]> = {
  maternity: [
    { href: '/paternity-leave/calculator', label: 'Paternity Leave', description: 'Calculate GPPL for fathers', icon: 'person' },
    { href: '/shared-parental-leave/calculator', label: 'Shared Parental Leave', description: 'Plan your family SPL split', icon: 'family_restroom' },
    { href: '/tools/leave-planner', label: 'Leave Planner Calendar', description: 'Plan your leave timeline', icon: 'calendar_month' },
  ],
  paternity: [
    { href: '/maternity-leave/calculator', label: 'Maternity Leave', description: 'Calculate GPML for mothers', icon: 'pregnant_woman' },
    { href: '/shared-parental-leave/calculator', label: 'Shared Parental Leave', description: 'Plan your family SPL split', icon: 'family_restroom' },
    { href: '/childcare-leave/calculator', label: 'Childcare Leave', description: 'Annual childcare leave days', icon: 'child_care' },
  ],
  childcare: [
    { href: '/maternity-leave/calculator', label: 'Maternity Leave', description: 'Calculate GPML for mothers', icon: 'pregnant_woman' },
    { href: '/extended-childcare-leave', label: 'Extended Childcare Leave', description: 'For children aged 7–12', icon: 'school' },
    { href: '/unpaid-infant-care-leave', label: 'Unpaid Infant Care Leave', description: '12 days for children under 2', icon: 'child_friendly' },
  ],
  spl: [
    { href: '/maternity-leave/calculator', label: 'Maternity Leave', description: 'Your core 16-week entitlement', icon: 'pregnant_woman' },
    { href: '/paternity-leave/calculator', label: 'Paternity Leave', description: 'Father&apos;s own 4-week entitlement', icon: 'person' },
    { href: '/tools/leave-planner', label: 'Leave Planner', description: 'Map out all your leave together', icon: 'calendar_month' },
  ],
  'baby-bonus': [
    { href: '/childcare-subsidy/calculator', label: 'Childcare Subsidy', description: 'Monthly fee savings at MOM centres', icon: 'savings' },
    { href: '/maternity-leave/calculator', label: 'Maternity Leave', description: 'Calculate your leave pay', icon: 'pregnant_woman' },
    { href: '/tools/pay-calculator', label: 'Full Pay Calculator', description: 'Month-by-month income during leave', icon: 'payments' },
  ],
  default: [
    { href: '/maternity-leave/calculator', label: 'Maternity Leave', description: 'Calculate GPML entitlement', icon: 'pregnant_woman' },
    { href: '/paternity-leave/calculator', label: 'Paternity Leave', description: 'Calculate GPPL entitlement', icon: 'person' },
    { href: '/tools/leave-planner', label: 'Leave Planner', description: 'Plan your leave calendar', icon: 'calendar_month' },
  ],
}

interface RelatedCalculatorsProps {
  current?: string
  className?: string
}

export default function RelatedCalculators({
  current = 'default',
  className = '',
}: RelatedCalculatorsProps) {
  const links = allRelated[current] ?? allRelated.default

  return (
    <section className={className} aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-headline font-bold text-lg text-on-surface mb-4">
        You might also need
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="card-surface flex items-start gap-3 hover:border-primary/30 hover:shadow-card transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">
                {link.icon}
              </span>
            </div>
            <div>
              <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5" dangerouslySetInnerHTML={{ __html: link.description }} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
