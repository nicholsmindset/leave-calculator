import type { Metadata } from 'next'
import BabyBonusCalculator from '@/components/calculators/BabyBonusCalculator'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { generateCalculatorMetadata } from '@/lib/seo/metadata'
import { webApplicationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = generateCalculatorMetadata({
  leaveType: 'Baby Bonus',
  path: '/baby-bonus/calculator',
  description:
    'Calculate your Baby Bonus in Singapore — Cash Gift, CDA First Step Grant, and government co-matching. Includes Large Families Scheme for 3rd+ children. 2026 rates.',
})

const faqs = [
  {
    question: 'What is the Baby Bonus Scheme in Singapore?',
    answer:
      'The Baby Bonus Scheme provides financial support to encourage Singaporeans to have children. It has three components: a Cash Gift paid out over 18 months, a CDA First Step Grant automatically credited to the Child Development Account (CDA), and government dollar-for-dollar co-matching of your CDA savings up to a cap.',
  },
  {
    question: 'How much is the Cash Gift?',
    answer:
      'For 2026: $11,000 for the 1st and 2nd child, $13,000 for the 3rd and subsequent children. The cash gift is paid out in 5 instalments via PayNow over 18 months — at birth, 6 months, 12 months, 15 months, and 18 months.',
  },
  {
    question: 'What is the CDA First Step Grant?',
    answer:
      'The standard CDA First Step Grant is $5,000 for all children. Under the Large Families Scheme (for the 3rd and subsequent child born on or after 18 February 2025), the CDA First Step Grant is increased to $10,000. This grant is automatically credited within 2 weeks of the CDA being opened.',
  },
  {
    question: 'How does the government CDA co-matching work?',
    answer:
      'The government matches every dollar you deposit into your child\'s CDA up to a cap. The caps are: $6,000 for the 1st child, $6,000 for the 2nd child, $12,000 for the 3rd child, $12,000 for the 4th child, and $18,000 for the 5th and subsequent children. The co-matching applies over the child\'s entire CDA lifetime.',
  },
  {
    question: 'What can CDA funds be used for?',
    answer:
      'CDA funds can be used at approved institutions for childcare, kindergarten, early intervention programmes, special education, approved pharmacies, and medical expenses at approved hospitals and clinics. Unused funds can be transferred to the child\'s Edusave account at age 7.',
  },
  {
    question: 'How do I apply for Baby Bonus?',
    answer:
      'Apply online through LifeSG app or at life.gov.sg within 12 months of your child\'s birth. You will need to open a CDA at any participating bank (DBS, OCBC, or UOB) to receive the First Step Grant and co-matching.',
  },
]

export default function BabyBonusCalculatorPage() {
  const schema = webApplicationSchema({
    name: 'Baby Bonus Calculator Singapore 2026',
    url: 'https://leavecalculator.sg/baby-bonus/calculator',
    description:
      'Free Singapore Baby Bonus calculator. Calculate Cash Gift, CDA First Step, and government co-matching. Includes Large Families Scheme for 3rd+ children.',
  })

  return (
    <>
      <SchemaScript schema={schema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Baby Bonus', href: '/baby-bonus' },
            { label: 'Calculator' },
          ]}
        />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge href="https://life.gov.sg/family-parenting/benefits-support/baby-bonus-scheme" label="Based on LifeSG 2026 rates" />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Baby Bonus Calculator Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Calculate your total Baby Bonus in Singapore — Cash Gift, CDA First Step Grant, and government co-matching for your Child Development Account (CDA). Includes the enhanced Large Families Scheme rates for 3rd and subsequent children born on or after 18 February 2025.
          </p>
        </div>

        <BabyBonusCalculator />

        <div className="mt-12">
          <FAQSection faqs={faqs} />
        </div>

        <RelatedCalculators current="baby-bonus" className="mt-10" />
      </div>
    </>
  )
}
