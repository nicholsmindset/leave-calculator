import type { Metadata } from 'next'
import Link from 'next/link'
import CalculatorCard from '@/components/shared/CalculatorCard'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { homepageMetadata } from '@/lib/seo/metadata'
import { websiteSchema, organizationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = homepageMetadata

const calculators = [
  {
    href: '/maternity-leave/calculator',
    title: 'Maternity Leave Calculator',
    description: 'Calculate your GPML entitlement and estimated pay. Covers SC, PR, and non-SC babies. Updated for 2026.',
    icon: 'pregnant_woman',
    badge: 'Most popular',
    highlight: true,
  },
  {
    href: '/paternity-leave/calculator',
    title: 'Paternity Leave Calculator',
    description: '4 weeks GPPL for SC babies from April 2025. Calculate pay, split options, and last date to use.',
    icon: 'person',
    badge: 'Updated Apr 2025',
  },
  {
    href: '/shared-parental-leave/calculator',
    title: 'Shared Parental Leave Planner',
    description: 'Plan how to split up to 10 weeks of SPL between parents. See pay estimates for each split scenario.',
    icon: 'family_restroom',
    badge: 'Phase 2: 10 wks',
  },
  {
    href: '/childcare-leave/calculator',
    title: 'Childcare Leave Calculator',
    description: '6 days/year for SC/PR children under 7. Calculate GPCL, ECL, and UICL for all your children.',
    icon: 'child_care',
  },
  {
    href: '/baby-bonus/calculator',
    title: 'Baby Bonus Calculator',
    description: 'Cash Gift + CDA First Step + co-matching. Includes Large Families Scheme for 3rd+ children.',
    icon: 'savings',
  },
  {
    href: '/childcare-subsidy/calculator',
    title: 'Childcare Subsidy Calculator',
    description: 'Calculate Basic and Additional Subsidy for infant care and childcare. Based on household income.',
    icon: 'account_balance_wallet',
  },
  {
    href: '/tools/leave-planner',
    title: 'Leave Planner Calendar',
    description: 'Map your leave timeline with Singapore public holidays. Export to Google Calendar or iCal.',
    icon: 'calendar_month',
  },
  {
    href: '/tools/pay-calculator',
    title: 'Full Pay Calculator',
    description: 'See your month-by-month income during leave. Includes salary, AWS, bonus, and all leave types.',
    icon: 'payments',
  },
]

const stats = [
  { value: '16 weeks', label: 'Maternity Leave (SC baby)' },
  { value: '4 weeks', label: 'Paternity Leave (SC baby)' },
  { value: '10 weeks', label: 'Shared Parental Leave (Phase 2)' },
  { value: '30 weeks', label: 'Total family leave (Phase 2)' },
]

export default function HomePage() {
  return (
    <>
      <SchemaScript schema={websiteSchema()} />
      <SchemaScript schema={organizationSchema()} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="primary-gradient text-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <LastUpdated date="April 2025" className="text-white/70" />
              <GovernmentBadge
                href="https://www.mom.gov.sg/employment-practices/leave"
                label="Based on MOM 2026 guidelines"
                className="border-white/30 text-white/80 bg-white/10"
              />
            </div>

            <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Singapore&apos;s Most Complete<br />
              <span className="text-tertiary-fixed-dim">Leave Calculator Singapore</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Maternity, paternity, childcare, shared parental leave, baby bonus, and more — all in one place. Free, instant results based on 2026 MOM guidelines.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/maternity-leave/calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-headline font-semibold text-sm hover:bg-white/90 transition-colors shadow-float"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calculate</span>
                Calculate my leave
              </Link>
              <Link
                href="/tools/leave-planner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white rounded-xl font-headline font-semibold text-sm hover:bg-white/25 transition-colors border border-white/25"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_month</span>
                Plan my leave dates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key stats banner ────────────────────────────────────────────────── */}
      <section className="bg-surface-container border-b border-outline-variant/30" aria-label="Singapore parental leave 2026 at a glance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-headline font-bold text-2xl sm:text-3xl text-primary">{stat.value}</p>
                <p className="text-xs text-on-surface-variant mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" aria-labelledby="calculators-heading">
        <div className="mb-8">
          <h2 id="calculators-heading" className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-2">
            Choose your calculator
          </h2>
          <p className="text-on-surface-variant">
            All tools are free, instant, and based on the latest Singapore MOM and MSF guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
      </section>

      {/* ── Static SEO content ──────────────────────────────────────────────── */}
      <section className="bg-surface-container/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h2 className="font-headline font-bold text-xl text-on-surface mb-4">
              Singapore Parental Leave in 2026
            </h2>
            <div className="prose prose-sm text-on-surface-variant space-y-3">
              <p>
                Singapore significantly enhanced parental leave benefits in April 2025. Government-Paid Paternity Leave (GPPL) for fathers with Singapore Citizen babies doubled from 2 to 4 weeks. Shared Parental Leave (SPL) expanded from 4 weeks to a separate pool of 6 weeks (Phase 1, April 2025–March 2026) and 10 weeks (Phase 2, from April 2026), giving families up to 30 weeks of government-paid leave combined with GPML and GPPL.
              </p>
              <p>
                Mothers with SC babies continue to receive 16 weeks of Government-Paid Maternity Leave (GPML). For the 1st and 2nd child, the first 8 weeks are employer-paid (government-reimbursed) and the last 8 weeks are government-paid directly. For the 3rd and subsequent child, all 16 weeks are government-reimbursed up to $40,000.
              </p>
              <p>
                Childcare Leave provides working parents 6 days per year for SC/PR children under 7 years old, and 2 days for Extended Childcare Leave for children aged 7 to 12. Unpaid Infant Care Leave offers 12 additional days per year for each parent with a child under 2 years old.
              </p>
              <p>
                The Baby Bonus Scheme for 2026 provides Cash Gifts of $11,000 for the 1st and 2nd child and $13,000 for the 3rd and subsequent child, plus CDA First Step Grants and dollar-for-dollar government co-matching into the Child Development Account. Children born on or after 18 February 2025 who are 3rd or subsequent children receive an enhanced $10,000 CDA First Step Grant under the Large Families Scheme.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <GovernmentBadge href="https://www.mom.gov.sg/employment-practices/leave" />
              <GovernmentBadge
                href="https://www.msf.gov.sg/assistance/pages/familylifematters.aspx"
                label="MSF ProFamily Leave"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust signals ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: 'verified', title: 'MOM-Verified Data', desc: 'All figures verified against MOM and MSF official guidelines for 2026.' },
            { icon: 'flash_on', title: 'Instant Results', desc: 'No sign-up required. Calculate your leave entitlement in under a minute.' },
            { icon: 'share', title: 'Share with Your Partner', desc: 'Save and share your calculation via link or WhatsApp — plan together.' },
          ].map((item) => (
            <div key={item.title} className="card-surface flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-[20px]" aria-hidden="true">
                  {item.icon}
                </span>
              </div>
              <div>
                <h3 className="font-headline font-semibold text-sm text-on-surface mb-1">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
