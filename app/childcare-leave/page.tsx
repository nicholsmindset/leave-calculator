import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { faqPageSchema, breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Childcare Leave Singapore 2026 — GPCL, ECL & UICL Guide | MOM',
  description:
    'Complete guide to childcare leave in Singapore 2026. GPCL (6 days for SC/PR child under 7), ECL (2 days for 7–12), and UICL (12 unpaid days for infants). Calculate your entitlement.',
  alternates: {
    canonical: 'https://leavecalculator.sg/childcare-leave',
  },
}

const faqs = [
  {
    question: 'How many days of childcare leave do I get in Singapore?',
    answer:
      'For each parent per year: 6 days of Government-Paid Childcare Leave (GPCL) if you have a Singapore Citizen or PR child under 7; 2 days of Extended Childcare Leave (ECL) if your SC/PR child is aged 7–12; and an additional 12 days of Unpaid Infant Care Leave (UICL) if your child is under 2 years old.',
  },
  {
    question: 'Who pays for childcare leave in Singapore?',
    answer:
      'The first 3 days of GPCL are paid by your employer. The last 3 days are government-reimbursed to your employer, capped at $500 per day (including CPF contributions). Extended Childcare Leave (2 days) is fully government-paid. Unpaid Infant Care Leave is unpaid — no compensation from employer or government.',
  },
  {
    question: 'Is childcare leave pro-rated?',
    answer:
      'GPCL is pro-rated if you have been employed with your current employer for less than 12 months during the year. ECL is not pro-rated. The pro-ration is based on the number of months you have been continuously employed.',
  },
  {
    question: 'Do I get more childcare leave if I have multiple children?',
    answer:
      'No. Your total annual childcare leave entitlement is based on your youngest qualifying child. Having multiple children does not increase your total entitlement. Each parent gets up to 6 days GPCL and 12 days UICL per year regardless of how many children you have.',
  },
  {
    question: 'What is Unpaid Infant Care Leave (UICL)?',
    answer:
      'UICL provides 12 days per year of unpaid leave for each parent with a Singapore Citizen or PR child below 2 years old. It is in addition to (not instead of) GPCL. It is entirely unpaid — no employer or government compensation. It is a right to take time off, not a paid benefit.',
  },
  {
    question: 'Can I use childcare leave for any purpose?',
    answer:
      'Childcare leave is specifically for caring for your child. You should take it when your child is sick, during school holidays, or for other child-related needs. It is typically taken in individual days rather than blocks.',
  },
]

const quickFacts = [
  { label: 'GPCL (SC/PR child <7)', value: '6 days/year', detail: 'Per parent' },
  { label: 'ECL (SC/PR child 7–12)', value: '2 days/year', detail: 'Per parent' },
  { label: 'UICL (SC/PR child <2)', value: '12 days/year', detail: 'Unpaid, per parent' },
  { label: 'Non-SC child (<7)', value: '2 days/year', detail: 'Government-paid' },
  { label: 'Gov-reimbursed cap', value: '$500/day', detail: 'Last 3 days of GPCL' },
  { label: 'Min service', value: '3 months', detail: 'With same employer' },
]

export default function ChildcareLeaveHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Childcare Leave', url: 'https://leavecalculator.sg/childcare-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Childcare Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Childcare Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Working parents in Singapore are entitled to Government-Paid Childcare Leave (GPCL), Extended Childcare Leave (ECL), and Unpaid Infant Care Leave (UICL). Use our calculator to find your exact entitlement across all your children.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/childcare-leave/calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Childcare Leave
          </Link>
        </div>

        <div className="card-surface mb-8">
          <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Quick facts — 2026</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="bg-surface-container rounded-xl p-4">
                <p className="text-xs text-on-surface-variant mb-1">{fact.label}</p>
                <p className="font-headline font-bold text-lg text-primary">{fact.value}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{fact.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leave types explained */}
        <div className="space-y-4 mb-8">
          {[
            {
              title: 'Government-Paid Childcare Leave (GPCL)',
              desc: '6 days per year for each parent with a Singapore Citizen or PR child under 7. The first 3 days are employer-paid; the last 3 days are government-reimbursed at up to $500/day. If your child is not SC/PR, you get 2 days (all government-paid).',
              badge: 'Age < 7',
            },
            {
              title: 'Extended Childcare Leave (ECL)',
              desc: '2 days per year for each parent once your youngest SC or PR child turns 7, up until the child turns 13. Both days are fully government-paid. ECL is not pro-rated.',
              badge: 'Age 7–12',
            },
            {
              title: 'Unpaid Infant Care Leave (UICL)',
              desc: '12 days per year per parent for any parent with a SC or PR child below 2. This is unpaid — no employer or government compensation applies. It is an additional entitlement on top of GPCL.',
              badge: 'Age < 2',
            },
          ].map((item) => (
            <div key={item.title} className="card-surface">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-headline font-semibold text-sm text-on-surface mb-2">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator', desc: 'Calculate GPCL, ECL, and UICL for all your children' },
            { href: '/childcare-leave/1-child', label: '1 Child', desc: 'Leave entitlement with one qualifying child' },
            { href: '/childcare-leave/2-children', label: '2 Children', desc: 'Leave entitlement with two children' },
            { href: '/childcare-leave/3-children', label: '3 Children', desc: 'Leave entitlement with three or more children' },
            { href: '/childcare-leave/pro-rated', label: 'Pro-Rated Leave', desc: 'How GPCL is calculated if employed < 12 months' },
            { href: '/childcare-leave/faq', label: 'Childcare Leave FAQ', desc: 'Common questions about GPCL and ECL' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-surface hover:border-primary/30 transition-colors group"
            >
              <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors mb-1">
                {link.label}
              </p>
              <p className="text-xs text-on-surface-variant">{link.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <FAQSection faqs={faqs} />
        </div>

        <RelatedCalculators current="childcare" className="mt-10" />
      </div>
    </>
  )
}
