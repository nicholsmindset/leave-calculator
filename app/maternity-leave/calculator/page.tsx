import type { Metadata } from 'next'
import MaternityCalculator from '@/components/calculators/MaternityCalculator'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { generateCalculatorMetadata } from '@/lib/seo/metadata'
import { webApplicationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = generateCalculatorMetadata({
  leaveType: 'Maternity Leave',
  path: '/maternity-leave/calculator',
  description:
    'Calculate your exact maternity leave entitlement and estimated pay in Singapore. Covers SC, PR and non-SC babies, all employment types. Updated for 2026 MOM guidelines.',
})

const faqs = [
  {
    question: 'How many weeks of maternity leave am I entitled to in Singapore?',
    answer:
      'If your baby is a Singapore Citizen, you are entitled to 16 weeks of maternity leave (Government-Paid Maternity Leave / GPML). If your baby is not a Singapore Citizen, you are entitled to 12 weeks under the Employment Act.',
  },
  {
    question: 'Who pays for maternity leave in Singapore?',
    answer:
      'For the 1st and 2nd child (SC baby): Your employer pays for the first 8 weeks and the government pays for the last 8 weeks. For the 3rd or subsequent child, the government reimburses all 16 weeks (up to $40,000). Your employer continues to pay your salary directly — the government reimburses your employer.',
  },
  {
    question: 'What is the government pay cap for maternity leave?',
    answer:
      'The government pay cap is $10,000 per 28-day period (approximately $357.14/day). If your salary is above this level, you will receive the capped amount for the government-paid portion. There is no cap on employer-paid portions.',
  },
  {
    question: 'How do I qualify for GPML in Singapore?',
    answer:
      'To qualify for GPML, you need: (1) Your baby must be a Singapore Citizen. (2) You must be employed and have worked for your employer for at least 90 days before your baby\'s birth. (3) If self-employed, you must have been continuously self-employed for at least 3 months before delivery and suffered income loss.',
  },
  {
    question: 'Can I take maternity leave before my due date?',
    answer:
      'From 1 April 2025, you can start maternity leave up to 4 weeks before your expected delivery date. The first 8 weeks must be taken as a continuous block. The remaining weeks can be taken flexibly within 12 months of birth (by agreement with your employer).',
  },
  {
    question: 'What happens to my maternity leave if my baby is not a Singapore Citizen?',
    answer:
      'If your baby is not a Singapore Citizen, you are entitled to 12 weeks of maternity leave under the Employment Act. This is paid entirely by your employer — there is no government reimbursement. The pay cap does not apply to employer-paid leave.',
  },
]

export default function MaternityCalculatorPage() {
  const schema = webApplicationSchema({
    name: 'Maternity Leave Calculator Singapore 2026',
    url: 'https://leavecalculator.sg/maternity-leave/calculator',
    description:
      'Free online maternity leave calculator for Singapore. Calculate GPML entitlement, pay estimates, and leave dates. Updated for 2026.',
  })

  return (
    <>
      <SchemaScript schema={schema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Maternity Leave', href: '/maternity-leave' },
            { label: 'Calculator' },
          ]}
        />

        {/* Static SEO content — above the fold, crawlable */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Maternity Leave Calculator Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Calculate your exact maternity leave entitlement and estimated pay in Singapore. Enter your details below to get instant results based on the latest 2026 MOM guidelines — covering Government-Paid Maternity Leave (GPML) for Singapore Citizens and Employment Act leave for all mothers.
          </p>
        </div>

        {/* Interactive calculator component */}
        <MaternityCalculator />

        {/* FAQ section */}
        <div className="mt-12">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related calculators */}
        <RelatedCalculators current="maternity" className="mt-10" />
      </div>
    </>
  )
}
