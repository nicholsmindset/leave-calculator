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
  title: 'Paternity Leave Singapore 2026 — 4 Weeks for Fathers | MOM Guidelines',
  description:
    'Singapore paternity leave guide 2026. 4 weeks Government-Paid Paternity Leave (GPPL) for SC baby fathers, 2 weeks for non-SC babies. Updated from 1 April 2025.',
  alternates: {
    canonical: 'https://leavecalculator.sg/paternity-leave',
  },
}

const faqs = [
  {
    question: 'How many weeks of paternity leave do fathers get in Singapore?',
    answer:
      'From 1 April 2025, fathers are entitled to 4 weeks of Government-Paid Paternity Leave (GPPL) if their baby is a Singapore Citizen. For a non-SC baby (PR or foreigner), fathers get 2 weeks of GPPL. This was a significant increase from the previous 2 weeks for SC babies.',
  },
  {
    question: 'Who is eligible for paternity leave in Singapore?',
    answer:
      'To be eligible, you must be the lawful father (married to the child\'s mother), have worked for your current employer for at least 90 continuous days before the birth, and your baby must be born in Singapore. Self-employed fathers are also eligible for GPPL provided they have been self-employed and made MediSave contributions for at least 3 continuous months before delivery.',
  },
  {
    question: 'When must I take paternity leave?',
    answer:
      'Paternity leave must be used within 12 months of your baby\'s birth. You can take it flexibly — in separate blocks — as long as you give your employer at least 5 days\' notice before each block. The full 4 weeks does not have to be taken all at once.',
  },
  {
    question: 'How much will I be paid during paternity leave?',
    answer:
      'Your paternity leave pay is based on your gross daily rate (monthly salary × 12 ÷ 365), capped at $357.14 per day (equivalent to $10,000 per 28 days or $2,500 per week). Your employer pays you and is then fully reimbursed by the government.',
  },
  {
    question: 'Can I take paternity leave if I am not married to the mother?',
    answer:
      'No. Government-Paid Paternity Leave (GPPL) is only available to the lawful father, meaning you must be legally married to the child\'s mother. Unwed fathers are not eligible for GPPL under current MOM guidelines.',
  },
]

const quickFacts = [
  { label: 'SC baby (from Apr 2025)', value: '4 weeks', detail: 'All government-paid (GPPL)' },
  { label: 'Non-SC baby', value: '2 weeks', detail: 'Government-paid (GPPL)' },
  { label: 'Pay cap', value: '$357.14/day', detail: '$2,500/week maximum' },
  { label: 'Min service', value: '90 days', detail: 'With same employer before birth' },
  { label: 'Must use within', value: '12 months', detail: 'Of baby\'s birth' },
  { label: 'Self-employed', value: 'Eligible', detail: '3 months MediSave contributions' },
]

export default function PaternityLeaveHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Paternity Leave', url: 'https://leavecalculator.sg/paternity-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Paternity Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
            <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Updated: 4 weeks from Apr 2025
            </span>
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Paternity Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            From 1 April 2025, Singapore fathers get 4 weeks of Government-Paid Paternity Leave (GPPL) for a Singapore Citizen baby — doubled from the previous 2 weeks. Use our calculator to see your entitlement and estimated pay.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/paternity-leave/calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Paternity Leave
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
          <h2 className="font-headline font-bold text-lg text-on-surface">April 2025 update — 4 weeks GPPL</h2>
          <p className="text-sm text-on-surface-variant">
            Starting 1 April 2025, the Government-Paid Paternity Leave entitlement for fathers with a Singapore Citizen child doubled from 2 weeks to 4 weeks. This is part of Singapore&apos;s broader push to encourage shared parenting and support fathers in taking an active role from birth.
          </p>
          <p className="text-sm text-on-surface-variant">
            All 4 weeks are fully government-funded — your employer pays your full salary during leave and claims back the full amount (up to the $357.14/day cap) from the government. You can take the 4 weeks in separate blocks within 12 months of your baby&apos;s birth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/paternity-leave/calculator', label: 'Paternity Leave Calculator', desc: 'Calculate your GPPL entitlement and pay estimate' },
            { href: '/paternity-leave/eligibility', label: 'Eligibility Guide', desc: 'Who qualifies for GPPL in Singapore' },
            { href: '/paternity-leave/citizen', label: 'SC Baby (4 weeks)', desc: 'Full 4 weeks GPPL for Singapore Citizen babies' },
            { href: '/paternity-leave/pr', label: 'PR / Non-SC Baby', desc: '2 weeks GPPL for permanent resident children' },
            { href: '/shared-parental-leave/calculator', label: 'Shared Parental Leave', desc: 'Additional 10 weeks split between parents' },
            { href: '/paternity-leave/faq', label: 'Paternity Leave FAQ', desc: 'Common questions about GPPL answered' },
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

        <RelatedCalculators current="paternity" className="mt-10" />
      </div>
    </>
  )
}
