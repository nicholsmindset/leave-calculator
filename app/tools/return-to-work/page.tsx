import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Return to Work Calculator Singapore 2026 | Plan Your Return Date',
  description: 'Calculate your return-to-work date after maternity, paternity, or parental leave in Singapore. Factor in public holidays, childcare leave balance, and annual leave.',
  alternates: { canonical: 'https://leavecalculator.sg/tools/return-to-work' },
}

export default function ReturnToWorkPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Return to Work' }]} />

      <div className="mb-8">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Return to Work Planner
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Plan your return to work after parental leave. Use the tools below to calculate your leave end date, review childcare options, and see what leave you have remaining after your return.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { href: '/maternity-leave/calculator', icon: 'pregnant_woman', label: 'Maternity Leave Calculator', desc: 'Find your leave end date and return-to-work date' },
          { href: '/paternity-leave/calculator', icon: 'man', label: 'Paternity Leave Calculator', desc: 'Calculate when your paternity leave ends' },
          { href: '/tools/leave-planner', icon: 'calendar_month', label: 'Leave Planner', desc: 'Map out your leave on a calendar with SG public holidays' },
          { href: '/childcare-leave/calculator', icon: 'child_care', label: 'Childcare Leave', desc: 'See how many childcare leave days you have left after returning' },
          { href: '/childcare-subsidy/calculator', icon: 'school', label: 'Childcare Subsidy', desc: 'Calculate your net monthly childcare fee after subsidies' },
          { href: '/guides/going-back-to-work-after-maternity-leave', icon: 'work', label: 'Return to Work Guide', desc: 'Practical advice on returning, childcare, and flexible work' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-surface hover:border-primary/30 transition-colors group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">{item.icon}</span>
            </div>
            <div>
              <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors mb-1">{item.label}</p>
              <p className="text-xs text-on-surface-variant">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="card-surface space-y-3">
        <h2 className="font-headline font-semibold text-sm text-on-surface">Planning your return</h2>
        <p className="text-sm text-on-surface-variant">
          Use the Maternity Leave Calculator to find your exact return-to-work date, then check the Leave Planner to see how your return date falls relative to Singapore public holidays. Remember you still have 6 days of childcare leave per year once you are back at work.
        </p>
        <p className="text-sm text-on-surface-variant">
          If you plan to use infant care or childcare centres, apply early — popular centres often have waiting lists of 6–12 months. Check your childcare subsidy entitlement to budget accurately.
        </p>
      </div>
    </main>
  )
}
