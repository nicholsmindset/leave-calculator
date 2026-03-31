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
  title: 'Extended Childcare Leave Singapore 2026 — Complete Guide | MOM',
  description: 'Everything about Extended Childcare Leave (ECL) in Singapore 2026. 2 days per year for parents of SC/PR children aged 7–12. Eligibility, pay, and how to apply.',
  alternates: { canonical: 'https://leavecalculator.sg/extended-childcare-leave' },
}

const faqs = [
  {
    question: 'What is Extended Childcare Leave (ECL)?',
    answer: 'Extended Childcare Leave (ECL) provides 2 days of paid leave per year to each parent with a Singapore Citizen or Permanent Resident child aged 7 to 12 years old. It is separate from and in addition to the 6 days of Government-Paid Childcare Leave (GPCL) for children under 7.',
  },
  {
    question: 'How many days of ECL do I get?',
    answer: '2 days per year per parent, regardless of how many qualifying children you have. If both parents are eligible, each parent gets 2 days — a combined total of 4 days per family.',
  },
  {
    question: 'Who is eligible for ECL?',
    answer: 'You are eligible if your child is a Singapore Citizen or Permanent Resident aged 7 to 12 years old, and you have worked for your current employer for at least 3 continuous months. Foreign children are not eligible.',
  },
  {
    question: 'Is ECL paid?',
    answer: 'Yes. ECL is government-paid, capped at $500 per day. Your employer pays your salary and claims reimbursement from the government, up to the cap.',
  },
  {
    question: 'Can ECL be carried forward?',
    answer: 'No. Unused ECL days cannot be carried forward to the next year. They also cannot be encashed.',
  },
  {
    question: 'What is the difference between GPCL and ECL?',
    answer: 'Government-Paid Childcare Leave (GPCL) gives 6 days/year per parent for children below 7. Extended Childcare Leave (ECL) gives 2 days/year per parent for children aged 7–12. You transition from GPCL to ECL when your youngest qualifying child turns 7.',
  },
]

const quickFacts = [
  { label: 'Days per year', value: '2 days', detail: 'Per parent' },
  { label: 'Child age', value: '7–12 years', detail: 'SC or PR child' },
  { label: 'Pay cap', value: '$500/day', detail: 'Government-paid' },
  { label: 'Min service', value: '3 months', detail: 'Continuous employment' },
  { label: 'Carry forward?', value: 'No', detail: 'Cannot encash or carry forward' },
  { label: 'Combined (both parents)', value: '4 days', detail: 'Per family per year' },
]

export default function ExtendedChildcareLeavePage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Extended Childcare Leave', url: 'https://leavecalculator.sg/extended-childcare-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Extended Childcare Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="January 2026" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Extended Childcare Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Parents of Singapore Citizen or PR children aged 7–12 are entitled to 2 days of government-paid Extended Childcare Leave (ECL) per year. ECL bridges the gap after your Government-Paid Childcare Leave (GPCL) ends when your child turns 7.
          </p>
        </div>

        <div className="mb-8">
          <Link href="/childcare-leave/calculator" className="btn-primary inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate Childcare + ECL Entitlement
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
          <h2 className="font-headline font-bold text-lg text-on-surface">How Extended Childcare Leave works</h2>
          <p className="text-sm text-on-surface-variant">
            When your child turns 7, your entitlement to 6 days of Government-Paid Childcare Leave (GPCL) ends. Extended Childcare Leave (ECL) then kicks in, giving you 2 government-paid days per year until your child turns 12.
          </p>
          <p className="text-sm text-on-surface-variant">
            ECL is paid at your usual daily rate, capped at $500 per day. Your employer pays you and claims reimbursement from the government. You need to have worked for your employer for at least 3 continuous months to be eligible.
          </p>
          <p className="text-sm text-on-surface-variant">
            Note: The Childcare Leave Calculator covers both GPCL and ECL entitlements. If you have children across multiple age groups, use the calculator to get your combined entitlement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator', desc: 'Calculate GPCL (under 7) + ECL (7–12) together' },
            { href: '/childcare-leave', label: 'Childcare Leave Guide', desc: '6 days/year per parent for children under 7' },
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
