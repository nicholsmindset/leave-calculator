import type { Metadata } from 'next'
import ChildcareLeaveCalculator from '@/components/calculators/ChildcareLeaveCalculator'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { generateCalculatorMetadata } from '@/lib/seo/metadata'
import { webApplicationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = generateCalculatorMetadata({
  leaveType: 'Childcare Leave',
  path: '/childcare-leave/calculator',
  description:
    'Calculate your childcare leave entitlement in Singapore. GPCL (6 days for SC/PR children under 7), ECL (2 days for children 7–12), and UICL (12 days unpaid for children under 2). 2026 MOM guidelines.',
})

const faqs = [
  {
    question: 'How many days of childcare leave do I get per year?',
    answer:
      'For each parent: 6 days/year if you have a SC or PR child under 7 (Government-Paid Childcare Leave / GPCL), 2 days/year for Extended Childcare Leave (ECL) for SC/PR children aged 7–12, and 2 days/year for non-SC/PR children under 7. The entitlement is determined by your youngest qualifying child.',
  },
  {
    question: 'Who pays for childcare leave in Singapore?',
    answer:
      'The first 3 days of GPCL are paid by your employer. The last 3 days are government-reimbursed to your employer (capped at $500/day including CPF contributions). ECL (2 days) is fully government-paid.',
  },
  {
    question: 'What is Unpaid Infant Care Leave (UICL)?',
    answer:
      'UICL provides an additional 12 days per year of unpaid leave for each parent with a SC or PR child under 2 years old. This is separate from and in addition to GPCL. It is unpaid — neither employer nor government compensation applies.',
  },
  {
    question: 'Does childcare leave get pro-rated?',
    answer:
      'Yes. GPCL is pro-rated if you have been employed with your current employer for less than 12 months during the year. ECL is not pro-rated. The pro-ration is based on the number of months you have been employed.',
  },
  {
    question: 'Can both parents claim childcare leave?',
    answer:
      'Yes. Each parent is entitled to their own childcare leave entitlement independently. Both the mother and father can each claim up to 6 days of GPCL and 12 days of UICL per year.',
  },
  {
    question: 'What if I have more than one qualifying child?',
    answer:
      'The total childcare leave entitlement per parent per year is capped regardless of how many children you have. Your entitlement is based on your youngest qualifying child. Having multiple qualifying children does not increase your total days.',
  },
]

export default function ChildcareCalculatorPage() {
  const schema = webApplicationSchema({
    name: 'Childcare Leave Calculator Singapore 2026',
    url: 'https://leavecalculator.sg/childcare-leave/calculator',
    description:
      'Free Singapore childcare leave calculator. Calculate GPCL, ECL, and UICL days for all your children. Includes pro-rating for partial year employment.',
  })

  return (
    <>
      <SchemaScript schema={schema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Childcare Leave', href: '/childcare-leave' },
            { label: 'Calculator' },
          ]}
        />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Childcare Leave Calculator Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Calculate your Government-Paid Childcare Leave (GPCL), Extended Childcare Leave (ECL), and Unpaid Infant Care Leave (UICL) entitlement in Singapore. Add all your children below for an accurate total — the calculator handles multiple children, different ages, and pro-ration automatically.
          </p>
        </div>

        <ChildcareLeaveCalculator />

        <div className="mt-12">
          <FAQSection faqs={faqs} />
        </div>

        <RelatedCalculators current="childcare" className="mt-10" />
      </div>
    </>
  )
}
