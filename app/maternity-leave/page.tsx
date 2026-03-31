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
  title: 'Maternity Leave Singapore 2026 — Complete Guide | MOM Guidelines',
  description:
    'Everything about maternity leave in Singapore 2026. 16 weeks for SC babies, 12 weeks for non-SC. Pay cap, eligibility, self-employed rights, and how to apply. Updated for latest MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/maternity-leave',
  },
  openGraph: {
    title: 'Maternity Leave Singapore 2026 — Complete Guide',
    description:
      'Everything about maternity leave in Singapore. 16 weeks for SC babies, pay cap $10,000/28 days, self-employed eligibility. Free calculator included.',
    url: 'https://leavecalculator.sg/maternity-leave',
  },
}

const faqs = [
  {
    question: 'How many weeks of maternity leave do I get in Singapore?',
    answer:
      'You get 16 weeks of maternity leave if your baby is a Singapore Citizen. This includes 8 weeks of employer-paid leave and 8 weeks of Government-Paid Maternity Leave (GPML). For a non-SC baby (PR or foreigner), you get 12 weeks (8 employer-paid + 4 GPML), provided the mother is a Singapore Citizen or PR.',
  },
  {
    question: 'Am I eligible for maternity leave in Singapore?',
    answer:
      'You are eligible if you have worked for your employer for at least 90 continuous days before your baby\'s expected delivery date. This applies to employees, self-employed persons (if MediSave contributions were made for 3 months before delivery), and contract workers employed for at least 90 days before delivery.',
  },
  {
    question: 'How much is the maternity leave pay cap?',
    answer:
      'The government-reimbursed portion of maternity leave is capped at $10,000 per 28 days, which works out to $357.14 per day. For the 8 weeks of GPML for a SC baby, the maximum you can receive is $20,000. For the 3rd+ child, all 16 weeks are government-reimbursed (up to $40,000).',
  },
  {
    question: 'Can self-employed women get maternity leave pay?',
    answer:
      'Yes. Self-employed women are eligible for GPML if they have been self-employed and made MediSave contributions for at least 3 continuous months immediately before the delivery. The pay is calculated based on your income, capped at the same daily rate of $357.14.',
  },
  {
    question: 'When must I take maternity leave?',
    answer:
      'You can start maternity leave from 4 weeks before your expected delivery date. The first 8 weeks must be taken as a continuous block (compulsory leave). The remaining 8 weeks (for SC baby) can be taken flexibly within 12 months of delivery, subject to mutual agreement with your employer.',
  },
  {
    question: 'What happens to my maternity leave if I have a miscarriage?',
    answer:
      'If you have a stillbirth or your baby dies after delivery, you are still entitled to your full maternity leave entitlement. If you have a miscarriage before 28 weeks of pregnancy, you may be entitled to sick leave. Contact MOM for guidance on your specific situation.',
  },
]

const quickFacts = [
  { label: 'SC baby total', value: '16 weeks', detail: '8 employer + 8 GPML' },
  { label: 'Non-SC baby total', value: '12 weeks', detail: '8 employer + 4 GPML' },
  { label: 'Pay cap', value: '$357.14/day', detail: '$10,000 per 28 days' },
  { label: 'Min service', value: '90 days', detail: 'Before delivery date' },
  { label: '3rd+ child max pay', value: '$40,000', detail: 'All 16 weeks gov-paid' },
  { label: 'Flexible leave', value: '8 weeks', detail: 'Within 12 months of birth' },
]

export default function MaternityLeaveHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Maternity Leave', url: 'https://leavecalculator.sg/maternity-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Maternity Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Maternity Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Singapore employees are entitled to 16 weeks of maternity leave for a Singapore Citizen baby, or 12 weeks for a non-SC baby. Use our calculator to find your exact entitlement and estimated pay.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/maternity-leave/calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Maternity Leave
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
          <h2 className="font-headline font-bold text-lg text-on-surface">How maternity leave works in Singapore</h2>
          <p className="text-sm text-on-surface-variant">
            Singapore&apos;s maternity leave is split into two parts: employer-paid leave and Government-Paid Maternity Leave (GPML). For a Singapore Citizen baby, you get a total of 16 weeks — the first 8 weeks are paid by your employer (who is then reimbursed by the government), and the final 8 weeks are paid directly by the government as GPML.
          </p>
          <p className="text-sm text-on-surface-variant">
            For a 3rd or subsequent Singapore Citizen child, all 16 weeks are government-reimbursed, meaning your employer pays you and claims back every cent from the government. The pay is capped at $10,000 per 28-day period ($357.14 per day).
          </p>
          <p className="text-sm text-on-surface-variant">
            The first 8 weeks must be taken as a continuous block starting from your delivery date. The remaining 8 weeks can be taken flexibly — in any number of blocks — within 12 months of your baby&apos;s birth, subject to agreement with your employer.
          </p>
        </div>

        {/* Sub-page links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/maternity-leave/calculator', label: 'Maternity Leave Calculator', desc: 'Calculate your exact entitlement and pay estimate' },
            { href: '/maternity-leave/eligibility', label: 'Eligibility Guide', desc: 'Who qualifies for maternity leave in Singapore' },
            { href: '/maternity-leave/self-employed', label: 'Self-Employed Mothers', desc: 'GPML for self-employed and freelance workers' },
            { href: '/maternity-leave/first-child', label: '1st & 2nd Child', desc: '16 weeks for Singapore Citizen babies' },
            { href: '/maternity-leave/third-child', label: '3rd+ Child', desc: 'Enhanced benefits — all 16 weeks government-reimbursed' },
            { href: '/maternity-leave/faq', label: 'Maternity Leave FAQ', desc: '20+ frequently asked questions answered' },
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
