import type { Metadata } from 'next'
import SPLPlanner from '@/components/calculators/SPLPlanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { generateCalculatorMetadata } from '@/lib/seo/metadata'
import { webApplicationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = generateCalculatorMetadata({
  leaveType: 'Shared Parental Leave',
  path: '/shared-parental-leave/calculator',
  description:
    'Plan your Shared Parental Leave (SPL) split in Singapore. 10 weeks from April 2026, 6 weeks for earlier births. See pay estimates for every split scenario.',
})

const faqs = [
  {
    question: 'What is Shared Parental Leave (SPL) in Singapore?',
    answer:
      'Shared Parental Leave (SPL) is a separate pool of government-paid leave that parents can split between themselves freely. It is in addition to the mother\'s 16 weeks GPML and the father\'s 4 weeks GPPL. For babies born on/after 1 April 2026 (Phase 2), the SPL pool is 10 weeks, bringing the total family leave to 30 weeks.',
  },
  {
    question: 'How many weeks of SPL are available?',
    answer:
      'Phase 1 (babies born April 2025 – March 2026): 6 weeks of SPL. Phase 2 (babies born from April 2026): 10 weeks of SPL. The total paid leave for a family in Phase 2 is 30 weeks: 16 weeks GPML + 4 weeks GPPL + 10 weeks SPL.',
  },
  {
    question: 'How do parents split Shared Parental Leave?',
    answer:
      'Parents can split the SPL pool in any combination — from all weeks to one parent, to an equal split. The only rule is that the total taken by both parents cannot exceed the total pool (6 or 10 weeks). The default equal split is 3 weeks each (Phase 1) or 5 weeks each (Phase 2).',
  },
  {
    question: 'Is SPL separate from or taken from the mother\'s maternity leave?',
    answer:
      'SPL is completely separate from the mother\'s 16-week GPML. Neither parent needs to give up any of their own leave entitlement to use SPL. It is a new, additional government-funded leave pool.',
  },
  {
    question: 'When can SPL be taken?',
    answer:
      'SPL must be taken within 12 months of your child\'s birth. Each parent should give their employer at least 4 weeks\' notice. SPL is taken after each parent has started or completed their own GPML/GPPL.',
  },
  {
    question: 'How much is paid during SPL?',
    answer:
      'SPL pay is capped at $2,500 per week per parent (equivalent to $357.14/day), including CPF. If your daily rate is below this cap, you receive your full salary rate. Both parents\' SPL pay is fully government-funded.',
  },
]

export default function SPLCalculatorPage() {
  const schema = webApplicationSchema({
    name: 'Shared Parental Leave Calculator Singapore 2026',
    url: 'https://leavecalculator.sg/shared-parental-leave/calculator',
    description:
      'Free Singapore SPL planner. Calculate and split 10 weeks of Shared Parental Leave between parents. See pay estimates for every split scenario. Phase 2 from April 2026.',
  })

  return (
    <>
      <SchemaScript schema={schema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Shared Parental Leave', href: '/shared-parental-leave' },
            { label: 'Calculator' },
          ]}
        />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge />
            <span className="text-xs font-semibold bg-tertiary-fixed-dim/30 text-on-surface px-2 py-0.5 rounded-full">
              Phase 2: 10 weeks from Apr 2026
            </span>
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Shared Parental Leave Planner Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Plan how to split Shared Parental Leave (SPL) between parents. From April 2026 (Phase 2), families get 10 weeks of SPL — bringing total paid leave to 30 weeks. Use the slider to explore different split scenarios and see estimated pay for each parent.
          </p>
        </div>

        <SPLPlanner />

        <div className="mt-12">
          <FAQSection faqs={faqs} />
        </div>

        <RelatedCalculators current="spl" className="mt-10" />
      </div>
    </>
  )
}
