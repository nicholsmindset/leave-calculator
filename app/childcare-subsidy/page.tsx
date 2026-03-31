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
  title: 'Childcare Subsidy Singapore 2026 — Complete Guide | ECDA',
  description:
    'Everything about childcare and infant care subsidies in Singapore 2026. Basic Subsidy, Additional Subsidy, income tiers, AO vs POP centres. Calculate your net monthly fee after subsidy.',
  alternates: {
    canonical: 'https://leavecalculator.sg/childcare-subsidy',
  },
}

const faqs = [
  {
    question: 'What childcare subsidies are available in Singapore?',
    answer:
      'There are two main subsidies: the Basic Subsidy (available to all working mothers with SC children in licensed centres) and the Additional Subsidy (means-tested, for households earning up to $12,000/month). The amounts vary depending on whether both parents are working and the type of centre.',
  },
  {
    question: 'How much is the Basic Subsidy for childcare?',
    answer:
      'For childcare centres (18 months–6 years), the Basic Subsidy is $600/month for working mothers and $150/month for non-working mothers (SC child). For infant care (2–18 months), the Basic Subsidy is $710/month for working mothers and $190/month for non-working mothers.',
  },
  {
    question: 'What is the Additional Subsidy?',
    answer:
      'The Additional Subsidy is means-tested and available to Singapore Citizen children in licensed centres whose household income is $12,000/month or below. The subsidy amount increases as household income decreases, with the highest subsidies for households earning $3,000 or less per month.',
  },
  {
    question: 'What is the difference between Anchor Operator and Partner Operator centres?',
    answer:
      'Anchor Operators (AO) and Partner Operators (POP) are government-supported childcare centres with fee caps — AO centres cap fees at $610/month for childcare and $1,395/month for infant care; POP centres have slightly higher caps. Private centres have no fee caps, but subsidies still apply to the actual fees charged.',
  },
  {
    question: 'Is my child eligible for the childcare subsidy?',
    answer:
      'To receive the Basic Subsidy and Additional Subsidy, your child must be a Singapore Citizen enrolled in a licensed childcare or infant care centre. Permanent Resident children are only eligible for a lower Basic Subsidy rate. Foreign children are generally not eligible.',
  },
]

const quickFacts = [
  { label: 'Basic Subsidy (CC)', value: '$600/mo', detail: 'Working mother, SC child' },
  { label: 'Basic Subsidy (IC)', value: '$710/mo', detail: 'Working mother, SC child' },
  { label: 'Additional Subsidy', value: 'Up to $467/mo', detail: 'Means-tested, income ≤$3,000' },
  { label: 'AO fee cap (CC)', value: '$610/mo', detail: 'Anchor operator centres' },
  { label: 'AO fee cap (IC)', value: '$1,395/mo', detail: 'Anchor operator infant care' },
  { label: 'Income threshold', value: '$12,000/mo', detail: 'For Additional Subsidy' },
]

export default function ChildcareSubsidyHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Childcare Subsidy', url: 'https://leavecalculator.sg/childcare-subsidy' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Childcare Subsidy' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="January 2026" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Childcare Subsidy Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Singapore parents can receive up to $600/month in Basic Subsidy and up to $467/month in Additional Subsidy for licensed childcare and infant care. Use our calculator to see your net monthly fee after all subsidies.
          </p>
        </div>

        <div className="mb-8">
          <Link href="/childcare-subsidy/calculator" className="btn-primary inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Subsidy
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
          <h2 className="font-headline font-bold text-lg text-on-surface">How childcare subsidies work in Singapore</h2>
          <p className="text-sm text-on-surface-variant">
            The Singapore government provides two layers of childcare subsidy for licensed centres. The Basic Subsidy is available to all working mothers with Singapore Citizen children. The amount depends on whether both parents are working and the type of centre (childcare vs infant care).
          </p>
          <p className="text-sm text-on-surface-variant">
            On top of the Basic Subsidy, lower- to middle-income families may receive the Additional Subsidy, which is means-tested based on gross monthly household income. The total subsidy is deducted directly from your monthly childcare bill.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { href: '/childcare-subsidy/calculator', label: 'Childcare Subsidy Calculator', desc: 'Calculate your net monthly fee after subsidy' },
            { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator', desc: '6 government-paid days/year for parents' },
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
