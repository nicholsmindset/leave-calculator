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
  title: 'Unpaid Infant Care Leave Singapore 2026 — Complete Guide | MOM',
  description:
    'Everything about Unpaid Infant Care Leave (UICL) in Singapore 2026. 12 days per parent per year for children under 2. Eligibility, how to apply, and lifetime caps.',
  alternates: {
    canonical: 'https://leavecalculator.sg/unpaid-infant-care-leave',
  },
}

const faqs = [
  {
    question: 'How many days of Unpaid Infant Care Leave do I get?',
    answer:
      'Each parent is entitled to 12 days of Unpaid Infant Care Leave (UICL) per year, regardless of how many qualifying children they have. The leave is split into 6 days per half-year period (January–June and July–December).',
  },
  {
    question: 'Who is eligible for UICL?',
    answer:
      'You are eligible if your child is a Singapore Citizen or Permanent Resident below 2 years old, and you have worked for your current employer for at least 3 continuous months. UICL does not apply to foreign children.',
  },
  {
    question: 'Is UICL paid or unpaid?',
    answer:
      'UICL is unpaid. Your employer is not required to pay you during these days, and there is no government reimbursement. You can take UICL on top of any paid childcare leave you are entitled to.',
  },
  {
    question: 'Is there a lifetime cap on UICL?',
    answer:
      'Yes. There is a lifetime cap of 24 days of UICL per child. Since UICL applies while the child is below 2 years old and you get 12 days per year, you can take up to 24 days per child across the two years.',
  },
  {
    question: 'Can UICL be encashed or carried forward?',
    answer:
      'No. Unused UICL days cannot be encashed or carried forward to the next half-year period. The entitlement resets on 1 January and 1 July each year.',
  },
]

const quickFacts = [
  { label: 'Days per year', value: '12 days', detail: 'Per parent' },
  { label: 'Per half-year', value: '6 days', detail: 'Jan–Jun and Jul–Dec' },
  { label: 'Child age limit', value: 'Under 2', detail: 'Years old' },
  { label: 'Paid?', value: 'No', detail: 'Unpaid leave' },
  { label: 'Lifetime cap', value: '24 days', detail: 'Per child' },
  { label: 'Min service', value: '3 months', detail: 'Continuous employment' },
]

export default function UICLHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Unpaid Infant Care Leave', url: 'https://leavecalculator.sg/unpaid-infant-care-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Unpaid Infant Care Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="January 2024" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Unpaid Infant Care Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Both parents are entitled to 12 days of Unpaid Infant Care Leave (UICL) per year for Singapore Citizen or PR children below 2 years old. UICL is in addition to paid childcare leave and does not affect your paid leave entitlement.
          </p>
        </div>

        <div className="mb-8">
          <Link href="/unpaid-infant-care-leave/calculator" className="btn-primary inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Check My UICL Entitlement
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
          <h2 className="font-headline font-bold text-lg text-on-surface">About Unpaid Infant Care Leave</h2>
          <p className="text-sm text-on-surface-variant">
            Unpaid Infant Care Leave (UICL) gives parents additional time off to care for their infant beyond paid childcare leave. Both parents are entitled to 12 days per year while their child is below 2 years old, as long as the child is a Singapore Citizen or Permanent Resident.
          </p>
          <p className="text-sm text-on-surface-variant">
            Since 1 January 2024, UICL was doubled from 6 to 12 days per year per parent. The leave is split into two half-year periods (6 days from January to June, and 6 days from July to December). Unused days in each period cannot be carried forward and cannot be encashed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { href: '/unpaid-infant-care-leave/calculator', label: 'UICL Calculator', desc: 'Check eligibility and days entitlement' },
            { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator', desc: '6 paid days/year for children under 7' },
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
