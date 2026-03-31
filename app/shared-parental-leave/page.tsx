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
  title: 'Shared Parental Leave Singapore 2026 — 10 Weeks SPL | MOM Guidelines',
  description:
    'Shared Parental Leave (SPL) in Singapore 2026. 10 weeks from April 2026 (Phase 2), on top of 16 weeks maternity and 4 weeks paternity. Total 30 weeks for the family. Free planner tool.',
  alternates: {
    canonical: 'https://leavecalculator.sg/shared-parental-leave',
  },
}

const faqs = [
  {
    question: 'What is Shared Parental Leave (SPL) in Singapore?',
    answer:
      'Shared Parental Leave (SPL) is a separate government-funded pool of leave that parents can split between themselves in any combination. It is completely separate from — and in addition to — the mother\'s 16-week maternity leave and the father\'s 4-week paternity leave.',
  },
  {
    question: 'How many weeks of SPL are available in 2026?',
    answer:
      'From April 2026 (Phase 2), the SPL pool is 10 weeks. This brings the total paid family leave to 30 weeks: 16 weeks GPML + 4 weeks GPPL + 10 weeks SPL. In Phase 1 (April 2025 – March 2026), the pool was 6 weeks, giving a total of 26 weeks.',
  },
  {
    question: 'Is SPL separate from the mother\'s maternity leave?',
    answer:
      'Yes, completely separate. Neither parent gives up any of their own leave to use SPL. The mother keeps all 16 weeks of maternity leave. The father keeps all 4 weeks of paternity leave. The 10 weeks of SPL is a new, additional government-funded leave pool on top of both.',
  },
  {
    question: 'How do parents split the SPL weeks?',
    answer:
      'Parents can split the SPL pool in any combination — all 10 weeks to one parent, an equal 5/5 split, or any other arrangement. The only rule is that neither parent can exceed the total pool size. Use our SPL Planner to explore different scenarios.',
  },
  {
    question: 'When can SPL be taken?',
    answer:
      'SPL must be taken within 12 months of your child\'s birth. Each parent should give their employer at least 4 weeks\' notice. SPL is typically taken after each parent has completed (or started) their own GPML/GPPL.',
  },
  {
    question: 'How much is SPL pay?',
    answer:
      'SPL pay is capped at $2,500 per week per parent ($357.14/day), including CPF. This is the same daily cap as GPML and GPPL. Both parents\' SPL is fully government-funded — your employer pays you and is reimbursed by the government.',
  },
]

const quickFacts = [
  { label: 'Phase 2 (Apr 2026+)', value: '10 weeks', detail: 'Separate SPL pool' },
  { label: 'Phase 1 (Apr–Mar 2025/26)', value: '6 weeks', detail: 'Separate SPL pool' },
  { label: 'Total family leave (Phase 2)', value: '30 weeks', detail: '16 + 4 + 10 weeks' },
  { label: 'Pay cap', value: '$2,500/week', detail: 'Per parent, government-paid' },
  { label: 'Split flexibility', value: 'Any combination', detail: '0–10 weeks to either parent' },
  { label: 'Must use within', value: '12 months', detail: 'Of baby\'s birth' },
]

export default function SPLHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Shared Parental Leave', url: 'https://leavecalculator.sg/shared-parental-leave' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Shared Parental Leave' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
            <span className="text-xs font-semibold bg-tertiary-fixed-dim/30 text-on-surface px-2 py-0.5 rounded-full">
              Phase 2: 10 weeks from Apr 2026
            </span>
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Shared Parental Leave Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            From April 2026, Singapore families get 10 weeks of Shared Parental Leave (SPL) — a separate government-funded pool on top of the mother&apos;s 16 weeks and the father&apos;s 4 weeks. Total: 30 weeks of paid leave for the family.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/shared-parental-leave/calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Plan My SPL Split
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

        {/* Phase timeline */}
        <div className="card-surface mb-8 space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">SPL phases — what changed and when</h2>
          <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-surface-container rounded-xl">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-on-surface">Phase 1: April 2025 – March 2026</p>
                <p className="text-sm text-on-surface-variant mt-1">6 weeks SPL pool. Total family leave = 26 weeks. Applies to babies born between 1 April 2025 and 31 March 2026.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-primary">Phase 2: From April 2026 onwards</p>
                <p className="text-sm text-on-surface-variant mt-1">10 weeks SPL pool. Total family leave = 30 weeks. Applies to babies born on or after 1 April 2026.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/shared-parental-leave/calculator', label: 'SPL Planner', desc: 'Plan your 10-week split and see pay estimates' },
            { href: '/shared-parental-leave/how-to-split', label: 'How to Split SPL', desc: 'Strategies for dividing SPL weeks between parents' },
            { href: '/shared-parental-leave/2026', label: 'SPL 2026 Changes', desc: 'What changed in Phase 2 — 10 weeks from April 2026' },
            { href: '/maternity-leave/calculator', label: 'Maternity Leave', desc: '16 weeks GPML calculator' },
            { href: '/paternity-leave/calculator', label: 'Paternity Leave', desc: '4 weeks GPPL calculator' },
            { href: '/shared-parental-leave/faq', label: 'SPL FAQ', desc: 'Common questions about Shared Parental Leave' },
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

        <RelatedCalculators current="spl" className="mt-10" />
      </div>
    </>
  )
}
