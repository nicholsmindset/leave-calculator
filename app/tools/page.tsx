import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import SchemaScript from '@/components/seo/SchemaScript'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Parental Leave Tools Singapore 2026 | Free Calculators & Planners',
  description:
    'Free tools for Singapore parents: pay calculator, leave planner with iCal export, childcare subsidy calculator, and more. Plan your parental leave with confidence.',
  alternates: {
    canonical: 'https://leavecalculator.sg/tools',
  },
}

const tools = [
  {
    href: '/tools/pay-calculator',
    icon: 'payments',
    label: 'Leave Pay Calculator',
    desc: 'Calculate your total income during maternity, paternity, and shared parental leave month-by-month.',
  },
  {
    href: '/tools/leave-planner',
    icon: 'calendar_month',
    label: 'Leave Planner',
    desc: 'Plan your leave around Singapore public holidays and export to Google Calendar or iCal.',
  },
  {
    href: '/maternity-leave/calculator',
    icon: 'pregnant_woman',
    label: 'Maternity Leave Calculator',
    desc: '16 weeks for SC babies. Calculate your entitlement, pay, and return-to-work date.',
  },
  {
    href: '/paternity-leave/calculator',
    icon: 'man',
    label: 'Paternity Leave Calculator',
    desc: '4 weeks for SC babies (from April 2025). Check eligibility and estimated pay.',
  },
  {
    href: '/shared-parental-leave/calculator',
    icon: 'family_restroom',
    label: 'Shared Parental Leave Planner',
    desc: 'Split up to 12 weeks of leave between parents and compare income side-by-side.',
  },
  {
    href: '/childcare-leave/calculator',
    icon: 'child_care',
    label: 'Childcare Leave Calculator',
    desc: '6 government-paid days/year per parent. Add multiple children for a combined total.',
  },
  {
    href: '/baby-bonus/calculator',
    icon: 'redeem',
    label: 'Baby Bonus Calculator',
    desc: 'Calculate cash gift, CDA First Step, and government co-matching for any birth order.',
  },
  {
    href: '/childcare-subsidy/calculator',
    icon: 'school',
    label: 'Childcare Subsidy Calculator',
    desc: 'Find your Basic and Additional Subsidy and see your net monthly childcare fee.',
  },
  {
    href: '/annual-leave/calculator',
    icon: 'event_available',
    label: 'Annual Leave Calculator',
    desc: 'Statutory annual leave by years of service, with pro-ration for partial years.',
  },
  {
    href: '/adoption-leave/calculator',
    icon: 'favorite',
    label: 'Adoption Leave Calculator',
    desc: '12 weeks for eligible adoptive mothers. Check eligibility and pay estimate.',
  },
  {
    href: '/unpaid-infant-care-leave/calculator',
    icon: 'baby_changing_station',
    label: 'Unpaid Infant Care Leave',
    desc: '12 days/year per parent for children under 2. Check your eligibility.',
  },
]

export default function ToolsHubPage() {
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Tools', url: 'https://leavecalculator.sg/tools' },
  ])

  return (
    <>
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Tools' }]} />

        <div className="mb-8">
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Singapore Parental Leave Tools
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Free calculators and planners for Singapore parents. All tools are updated for 2026 MOM guidelines and work instantly in your browser — no sign-up required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card-surface hover:border-primary/30 transition-colors group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">{tool.icon}</span>
              </div>
              <div>
                <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors mb-1">
                  {tool.label}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
