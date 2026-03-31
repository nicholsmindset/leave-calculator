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
  title: 'Annual Leave Singapore 2026 — Complete Guide | MOM Guidelines',
  description:
    'Everything about annual leave in Singapore 2026. Statutory entitlement by years of service, pro-rated leave, carry-forward rules, and encashment. Based on the Employment Act.',
  alternates: {
    canonical: 'https://leavecalculator.sg/annual-leave',
  },
}

const faqs = [
  {
    question: 'How many days of annual leave am I entitled to in Singapore?',
    answer:
      'Under the Employment Act, annual leave starts at 7 days in your first year of service and increases by 1 day each year, reaching 14 days from year 8 onwards. Your employer may contractually provide more, but cannot give less than the statutory minimum.',
  },
  {
    question: 'Is annual leave pro-rated if I joined mid-year?',
    answer:
      'Yes. If you did not work for the full year (e.g. you joined mid-year or resigned before year end), your annual leave entitlement is pro-rated based on the number of completed months of service. Partial months are not counted.',
  },
  {
    question: 'Can I carry forward unused annual leave?',
    answer:
      'Statutory annual leave can be carried forward up to 12 months after the end of the leave year, unless your employer agrees to a longer period. Unused leave after this period can be encashed if your employer agrees.',
  },
  {
    question: 'Can I encash unused annual leave?',
    answer:
      'There is no statutory right to encash unused annual leave while you are still employed. However, when you resign or your employment is terminated, you are entitled to payment for any unused annual leave that has been earned and accrued.',
  },
  {
    question: 'Do I get annual leave during my probation period?',
    answer:
      'Yes. You are entitled to annual leave from the first day of employment. However, if you resign or are dismissed before completing 3 months of service, you lose your entitlement to annual leave.',
  },
]

const quickFacts = [
  { label: 'Year 1', value: '7 days', detail: 'Statutory minimum' },
  { label: 'Year 2', value: '8 days', detail: '+1 day per year' },
  { label: 'Year 8+', value: '14 days', detail: 'Maximum statutory' },
  { label: 'Pro-rated', value: 'Yes', detail: 'If employed < 12 months' },
  { label: 'Carry forward', value: '12 months', detail: 'After leave year ends' },
  { label: 'Min service', value: '3 months', detail: 'To retain entitlement' },
]

export default function AnnualLeaveHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Annual Leave', url: 'https://leavecalculator.sg/annual-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Annual Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="January 2026" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Annual Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Under Singapore&apos;s Employment Act, employees are entitled to 7–14 days of paid annual leave depending on years of service. Use our calculator to find your exact entitlement, including pro-rated leave and carried-forward days.
          </p>
        </div>

        <div className="mb-8">
          <Link href="/annual-leave/calculator" className="btn-primary inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Annual Leave
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

        <div className="card-surface mb-8 space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">How annual leave works in Singapore</h2>
          <p className="text-sm text-on-surface-variant">
            Annual leave entitlement in Singapore is governed by the Employment Act. The statutory minimum starts at 7 days in your first year and increases by one day for each subsequent year of service, up to a maximum of 14 days from year 8 onwards. Your employer may grant more days contractually, but cannot provide less than the statutory amount.
          </p>
          <p className="text-sm text-on-surface-variant">
            If you did not work the full year — for example, you joined your employer partway through the year — your leave entitlement is pro-rated based on completed months of service. Partial months do not count toward pro-ration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { href: '/annual-leave/calculator', label: 'Annual Leave Calculator', desc: 'Calculate your exact entitlement for 2026' },
            { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator', desc: '6 days/year for parents of children under 7' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="card-surface hover:border-primary/30 transition-colors group">
              <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors mb-1">{link.label}</p>
              <p className="text-xs text-on-surface-variant">{link.desc}</p>
            </Link>
          ))}
        </div>

        <FAQSection faqs={faqs} />
        <RelatedCalculators current="childcare" className="mt-10" />
      </div>
    </>
  )
}
