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
  title: 'Adoption Leave Singapore 2026 — Complete Guide | MOM Guidelines',
  description:
    'Everything about adoption leave in Singapore 2026. 12 weeks for eligible adoptive mothers. Eligibility, pay, government reimbursement, and how to apply. Updated for latest MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/adoption-leave',
  },
  openGraph: {
    title: 'Adoption Leave Singapore 2026 — Complete Guide',
    description:
      '12 weeks adoption leave for eligible adoptive mothers in Singapore. Pay cap $357.14/day, child must be SC under 12 months. Free calculator included.',
    url: 'https://leavecalculator.sg/adoption-leave',
  },
}

const faqs = [
  {
    question: 'How much adoption leave do I get in Singapore?',
    answer:
      'Eligible adoptive mothers are entitled to 12 weeks of adoption leave — 8 weeks of employer-paid leave (employer is reimbursed by the government) and 4 weeks of flexible leave to be taken before the child turns 1 year old.',
  },
  {
    question: 'Who is eligible for adoption leave in Singapore?',
    answer:
      'You are eligible if you are the adoptive mother, the child is a Singapore Citizen and was under 12 months old at the formal intent to adopt, and you have worked for your current employer for at least 3 continuous months before the adoption order.',
  },
  {
    question: 'Does the child need to be a Singapore Citizen?',
    answer:
      'Yes. Adoption leave under the Government-Paid Maternity Leave (GPML) scheme applies only when the adopted child is a Singapore Citizen. Permanent Resident or foreign children do not qualify for the government-paid portion, though your employer may have contractual leave in place.',
  },
  {
    question: 'How much am I paid during adoption leave?',
    answer:
      'You receive your usual salary from your employer during the 8 employer-paid weeks, and your employer claims reimbursement from the government. Pay is capped at $357.14 per day ($10,000 per 28-day period). You may also be entitled to pay for the 4 flexible weeks depending on your employment contract.',
  },
  {
    question: 'When must the formal intent to adopt take place?',
    answer:
      'The formal intent to adopt (such as the filing of the adoption application or issuance of the court order) must occur when the child is below 12 months old. If the child is already 12 months or older at this point, you are not eligible for adoption leave under the GPML scheme.',
  },
  {
    question: 'Can I take adoption leave in flexible blocks?',
    answer:
      'The first 8 weeks of adoption leave must be taken as a continuous block starting from when the child is formally placed in your care. The remaining 4 weeks are flexible and can be taken in separate blocks before the child turns 1 year old, subject to mutual agreement with your employer.',
  },
]

const quickFacts = [
  { label: 'Total leave', value: '12 weeks', detail: 'For eligible adoptive mothers' },
  { label: 'Employer-paid', value: '8 weeks', detail: 'Govt reimburses employer' },
  { label: 'Flexible leave', value: '4 weeks', detail: 'Before child turns 1' },
  { label: 'Pay cap', value: '$357.14/day', detail: '$10,000 per 28 days' },
  { label: 'Child must be', value: 'SC', detail: 'Singapore Citizen only' },
  { label: 'Min service', value: '3 months', detail: 'Continuous employment' },
]

export default function AdoptionLeaveHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Adoption Leave', url: 'https://leavecalculator.sg/adoption-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Adoption Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Adoption Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Eligible adoptive mothers in Singapore are entitled to 12 weeks of adoption leave — 8 weeks employer-paid and 4 flexible weeks. The child must be a Singapore Citizen under 12 months old at formal intent to adopt.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/adoption-leave/calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Adoption Leave
          </Link>
        </div>

        {/* Quick facts */}
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

        {/* How it works */}
        <div className="card-surface mb-8 space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">How adoption leave works in Singapore</h2>
          <p className="text-sm text-on-surface-variant">
            Adoption leave in Singapore mirrors the structure of maternity leave. Eligible adoptive mothers receive 12 weeks of leave — the first 8 weeks must be taken as a continuous block starting from when the child is placed in your care. Your employer pays your salary during these 8 weeks and then claims reimbursement from the government.
          </p>
          <p className="text-sm text-on-surface-variant">
            The remaining 4 flexible weeks can be taken in any combination of blocks before the child&apos;s first birthday, subject to agreement with your employer. Pay during these weeks depends on your employment contract — the government only reimburses the first 8 weeks.
          </p>
          <p className="text-sm text-on-surface-variant">
            Government reimbursement is capped at $357.14 per day ($10,000 per 28-day period). To be eligible, you must have at least 3 months of continuous service with your employer prior to the adoption, and the child must be a Singapore Citizen under 12 months old at the time of formal intent to adopt.
          </p>
        </div>

        {/* Sub-page links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { href: '/adoption-leave/calculator', label: 'Adoption Leave Calculator', desc: 'Calculate your entitlement and estimated pay' },
            { href: '/maternity-leave/calculator', label: 'Maternity Leave Calculator', desc: 'For birth mothers — 16 weeks for SC babies' },
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

        <RelatedCalculators current="maternity" className="mt-10" />
      </div>
    </>
  )
}
