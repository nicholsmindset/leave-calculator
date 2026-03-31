import type { Metadata } from 'next'
import PaternityCalculator from '@/components/calculators/PaternityCalculator'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { generateCalculatorMetadata } from '@/lib/seo/metadata'
import { webApplicationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = generateCalculatorMetadata({
  leaveType: 'Paternity Leave',
  path: '/paternity-leave/calculator',
  description:
    'Calculate your GPPL (Government-Paid Paternity Leave) entitlement in Singapore. Updated for April 2025: 4 weeks for SC babies. Instant pay estimates included.',
})

const faqs = [
  {
    question: 'How many weeks of paternity leave do I get in Singapore?',
    answer:
      'From 1 April 2025, fathers with Singapore Citizen babies are entitled to 4 weeks of Government-Paid Paternity Leave (GPPL). Fathers with non-SC babies continue to receive 2 weeks of GPPL.',
  },
  {
    question: 'When did paternity leave increase to 4 weeks?',
    answer:
      'The increase from 2 weeks to 4 weeks of GPPL for Singapore Citizen babies took effect from 1 April 2025. Babies born on or after this date are eligible for the 4-week entitlement.',
  },
  {
    question: 'Can I split my paternity leave into blocks?',
    answer:
      'Yes. Paternity leave can be taken flexibly in blocks within 12 months of your child\'s birth. For 4-week GPPL, you can take it as: all 4 weeks at once, 2+2 weeks, 1+3 weeks, or 1+1+2 weeks. All blocks must be agreed with your employer.',
  },
  {
    question: 'How much will I be paid during paternity leave?',
    answer:
      'You receive your normal salary during paternity leave. The government reimburses your employer up to $2,500 per week (equivalent to $357.14/day, or $10,000 for 4 weeks, including CPF). If your salary is below the cap, you receive your full salary.',
  },
  {
    question: 'Who qualifies for GPPL in Singapore?',
    answer:
      'To qualify for GPPL: (1) You must be or have been lawfully married to the child\'s mother. (2) You must have worked for the same employer for at least 90 days before the birth. (3) Self-employed fathers must have been self-employed for at least 3 continuous months before the birth and suffered income loss.',
  },
  {
    question: 'Do I need to give notice before taking paternity leave?',
    answer:
      'From 1 April 2025, you must give your employer at least 4 weeks\' notice before taking paternity leave, unless the birth is earlier than expected. Employers are required by law to grant GPPL to eligible employees.',
  },
]

export default function PaternityCalculatorPage() {
  const schema = webApplicationSchema({
    name: 'Paternity Leave Calculator Singapore 2026',
    url: 'https://leavecalculator.sg/paternity-leave/calculator',
    description:
      'Free online paternity leave calculator for Singapore. Calculate GPPL entitlement (4 weeks from April 2025), pay estimates, and flexible split options.',
  })

  return (
    <>
      <SchemaScript schema={schema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Paternity Leave', href: '/paternity-leave' },
            { label: 'Calculator' },
          ]}
        />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
            <span className="text-xs font-semibold bg-tertiary-fixed-dim/30 text-on-surface px-2 py-0.5 rounded-full">
              Updated: 4 weeks for SC babies
            </span>
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Paternity Leave Calculator Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Calculate your Government-Paid Paternity Leave (GPPL) entitlement in Singapore. From 1 April 2025, fathers with Singapore Citizen babies receive 4 weeks of GPPL. Enter your details below to see your entitlement, estimated pay, and flexible leave split options.
          </p>
        </div>

        <PaternityCalculator />

        <div className="mt-12">
          <FAQSection faqs={faqs} />
        </div>

        <RelatedCalculators current="paternity" className="mt-10" />
      </div>
    </>
  )
}
