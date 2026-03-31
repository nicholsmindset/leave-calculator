import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
type VariantConfig = {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  content: string
  faqs: Array<{ question: string; answer: string }>
}

const variants: Record<string, VariantConfig> = {
  '1-child': {
    slug: '1-child',
    title: 'Childcare Leave with 1 Child Singapore 2026 | GPCL Entitlement',
    description: 'Childcare leave entitlement with one child in Singapore 2026. 6 days GPCL for SC/PR child under 7, or 2 days for non-SC child. Plus 12 days UICL for infants.',
    h1: 'Childcare Leave with 1 Child — Singapore 2026',
    intro: 'With one qualifying child, each parent is entitled to up to 6 days of Government-Paid Childcare Leave (GPCL) per year if the child is a Singapore Citizen or PR under 7. Use our calculator to find your exact entitlement.',
    content: 'For parents with one child, your childcare leave entitlement depends on your child\'s age and citizenship status. If your child is a Singapore Citizen or PR and under 7 years old, each parent gets 6 days of GPCL per year. Once your child turns 7, you move to Extended Childcare Leave (ECL) of 2 days per year. If your child is under 2, you additionally get 12 days of unpaid infant care leave (UICL) on top of GPCL.',
    faqs: [
      {
        question: 'How many days childcare leave do I get with 1 child?',
        answer: 'With one SC or PR child under 7: 6 days GPCL per year per parent. If the child is under 2: also 12 days UICL per year per parent (unpaid). If the child is 7–12: 2 days ECL per year per parent.',
      },
      {
        question: 'Does having only one child affect my entitlement?',
        answer: 'No. Your entitlement is the same as parents with multiple children — it is based on your youngest qualifying child. Having only one child does not reduce or increase your entitlement compared to the standard rates.',
      },
    ],
  },
  '2-children': {
    slug: '2-children',
    title: 'Childcare Leave with 2 Children Singapore 2026 | GPCL Entitlement',
    description: 'Childcare leave entitlement with two children in Singapore 2026. Entitlement based on youngest qualifying child. Calculate GPCL and UICL for multiple children.',
    h1: 'Childcare Leave with 2 Children — Singapore 2026',
    intro: 'With two children, your annual childcare leave entitlement is based on your youngest qualifying child — not the total number of children. Use our calculator to input both children\'s ages and get the correct total.',
    content: 'Having two children does not double your childcare leave. Each parent\'s entitlement is determined by the age and citizenship of the youngest qualifying child. If your younger child is an SC under 7, you get 6 days GPCL; if the younger child is 7–12, you get 2 days ECL. For UICL (12 days unpaid), you qualify if any child is under 2.',
    faqs: [
      {
        question: 'Do I get more childcare leave because I have 2 children?',
        answer: 'No. Your total GPCL entitlement is capped regardless of how many children you have. It is based on your youngest qualifying child\'s age and citizenship. Having 2 children does not give you 12 days instead of 6.',
      },
      {
        question: 'What if my 2 children are different ages and citizenships?',
        answer: 'Use our calculator and enter both children separately. The calculator will determine the correct entitlement based on your youngest qualifying child for GPCL/ECL purposes.',
      },
    ],
  },
  '3-children': {
    slug: '3-children',
    title: 'Childcare Leave with 3 Children Singapore 2026 | GPCL Entitlement',
    description: 'Childcare leave with 3 or more children in Singapore 2026. Entitlement is the same as 1–2 children — based on your youngest qualifying child. Free calculator.',
    h1: 'Childcare Leave with 3 Children — Singapore 2026',
    intro: 'With three children, your childcare leave is still based on your youngest qualifying child. The entitlement does not increase with the number of children. Our calculator handles multiple children with different ages and citizenships.',
    content: 'Parents with 3 or more children in Singapore get the same childcare leave as parents with 1 child — the entitlement is capped per parent per year regardless of family size. What matters is your youngest qualifying child\'s age and citizenship. If your youngest is under 7 and SC/PR, you get 6 days GPCL. If your youngest is under 2, you also get 12 days UICL (unpaid).',
    faqs: [
      {
        question: 'Does having 3 children give me more childcare leave?',
        answer: 'No. The Government-Paid Childcare Leave cap applies per parent per year, regardless of family size. Entitlement is the same for parents with 1 child as for parents with 3 or more children.',
      },
    ],
  },
  'child-under-7': {
    slug: 'child-under-7',
    title: 'Childcare Leave for Child Under 7 Singapore 2026 — 6 Days GPCL',
    description: 'Government-Paid Childcare Leave (GPCL) for parents with a child under 7 in Singapore 2026. 6 days per year for SC/PR child, 2 days for non-SC child.',
    h1: 'Childcare Leave for Child Under 7 — Singapore 2026',
    intro: 'If you have a Singapore Citizen or PR child under 7 years old, each parent is entitled to 6 days of Government-Paid Childcare Leave (GPCL) per year. This is the main childcare leave entitlement under Singapore\'s Employment Act.',
    content: 'Government-Paid Childcare Leave (GPCL) for children under 7 provides 6 days per year for each parent with a SC or PR child. The first 3 days are paid by your employer, and the last 3 days are reimbursed by the government to your employer at up to $500 per day. If your child is not a SC or PR, you get 2 days (all government-paid).',
    faqs: [
      {
        question: 'How many days childcare leave for a child under 7?',
        answer: 'For each parent: 6 days per year if the child is SC or PR; 2 days per year if the child is not SC or PR. The 6 days is the full Government-Paid Childcare Leave (GPCL) entitlement.',
      },
      {
        question: 'What if my child is under 2?',
        answer: 'If your child is under 2 and is SC or PR, you additionally get 12 days of Unpaid Infant Care Leave (UICL) per year, on top of your 6 days GPCL.',
      },
    ],
  },
  'child-7-to-12': {
    slug: 'child-7-to-12',
    title: 'Extended Childcare Leave (ECL) Age 7–12 Singapore 2026 — 2 Days',
    description: 'Extended Childcare Leave (ECL) for parents with a child aged 7–12 in Singapore 2026. 2 days per year for SC/PR children aged 7 to 12. Government-paid.',
    h1: 'Extended Childcare Leave — Child Aged 7 to 12',
    intro: 'Once your youngest Singapore Citizen or PR child turns 7, your Government-Paid Childcare Leave (GPCL) entitlement transitions to Extended Childcare Leave (ECL) — 2 days per year per parent, until the child turns 13.',
    content: 'Extended Childcare Leave (ECL) provides 2 days per year for each parent with a youngest qualifying child aged 7 to 12 (SC or PR only). Both days are fully government-paid. ECL is not pro-rated even if you have worked less than 12 months with your current employer. Non-SC/PR children do not qualify for ECL.',
    faqs: [
      {
        question: 'How many days ECL do I get per year?',
        answer: '2 days per year per parent, if your youngest qualifying SC or PR child is between ages 7 and 12 (i.e., has not yet turned 13).',
      },
      {
        question: 'Is ECL pro-rated if I started a new job?',
        answer: 'No. Extended Childcare Leave (ECL) is not pro-rated based on employment duration. You are entitled to the full 2 days regardless of how long you have been with your current employer.',
      },
    ],
  },
  'adopted-child': {
    slug: 'adopted-child',
    title: 'Childcare Leave for Adopted Child Singapore 2026 | GPCL',
    description: 'Childcare leave entitlement for parents of adopted children in Singapore 2026. GPCL applies if the adopted child is a SC or PR. Same entitlement as biological children.',
    h1: 'Childcare Leave for Adopted Children — Singapore 2026',
    intro: 'Parents of adopted Singapore Citizen or PR children are entitled to the same childcare leave as parents of biological children — 6 days of GPCL per year while the child is under 7, and 2 days of ECL when the child is aged 7–12.',
    content: 'Childcare leave under the Employment Act applies based on the child\'s citizenship and age, regardless of whether the child is biological or adopted. An adoptive parent with a formally adopted SC or PR child under 7 gets 6 days GPCL per year. If the adopted child is a Singapore Citizen or PR and under 2, you also get 12 days of UICL (unpaid).',
    faqs: [
      {
        question: 'Do I get childcare leave for an adopted child?',
        answer: 'Yes. Once a child is formally adopted, the adopting parents are entitled to GPCL and ECL based on the child\'s citizenship and age — the same as biological parents.',
      },
    ],
  },
  'disabled-child': {
    slug: 'disabled-child',
    title: 'Childcare Leave for Disabled Child Singapore 2026 | GPCL',
    description: 'Childcare leave for parents of a child with disabilities in Singapore 2026. Same GPCL entitlement as other children, based on citizenship and age.',
    h1: 'Childcare Leave for a Child with Disabilities — Singapore 2026',
    intro: 'Parents of a child with disabilities are entitled to the same Government-Paid Childcare Leave as any other parent — based on the child\'s citizenship and age. There is no separate or additional childcare leave entitlement specifically for disabled children under standard GPCL/ECL.',
    content: 'Under MOM guidelines, GPCL and ECL entitlements do not vary based on the child\'s health or disability status. If your child is SC or PR and under 7, you get 6 days GPCL. If 7–12, you get 2 days ECL. For additional support, parents may be eligible for the Caregivers Training Grant (CTG) and other MSF social support programmes.',
    faqs: [
      {
        question: 'Do I get extra leave if my child has a disability?',
        answer: 'The standard GPCL and ECL entitlements do not provide additional leave for children with disabilities. You may, however, qualify for caregiver support programmes through MSF. Contact your employer\'s HR or the Ministry of Social and Family Development for more information.',
      },
    ],
  },
  'single-parent': {
    slug: 'single-parent',
    title: 'Childcare Leave for Single Parents Singapore 2026 | GPCL',
    description: 'Childcare leave for single parents in Singapore 2026. Same 6 days GPCL entitlement. Eligible if you are the primary caregiver of a SC or PR child under 7.',
    h1: 'Childcare Leave for Single Parents — Singapore 2026',
    intro: 'Single parents are entitled to the same Government-Paid Childcare Leave as partnered parents — 6 days per year for a SC or PR child under 7. Your marital status does not affect your GPCL entitlement.',
    content: 'GPCL eligibility is based on the child\'s citizenship and age, and the parent\'s employment status — not marital status. As a single parent, you are fully entitled to 6 days GPCL if your SC or PR child is under 7, and 2 days ECL when the child is 7–12. You also qualify for 12 days UICL if your child is under 2. For financial support specific to single parents, see the MSF ComCare programme.',
    faqs: [
      {
        question: 'Can single parents claim childcare leave?',
        answer: 'Yes. GPCL and ECL are available to any parent regardless of marital status. As long as you are employed and have a qualifying child, you are entitled to childcare leave.',
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(variants).map((slug) => ({ variant: slug }))
}

export async function generateMetadata(
  { params }: { params: { variant: string } }
): Promise<Metadata> {
  const config = variants[params.variant]
  if (!config) return {}
  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `https://leavecalculator.sg/childcare-leave/${config.slug}`,
    },
  }
}

export default function ChildcareVariantPage({ params }: { params: { variant: string } }) {
  const config = variants[params.variant]
  if (!config) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Childcare Leave', href: '/childcare-leave' },
          { label: config.h1.split('—')[0].trim() },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <LastUpdated date="April 2025" />
          <GovernmentBadge />
        </div>
        <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
          {config.h1}
        </h1>
        <p className="text-on-surface-variant max-w-2xl">{config.intro}</p>
      </div>

      <div className="mb-8">
        <Link
          href="/childcare-leave/calculator"
          className="btn-primary inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
          Calculate My Childcare Leave
        </Link>
      </div>

      <div className="card-surface mb-8">
        <h2 className="font-headline font-bold text-lg text-on-surface mb-3">About this entitlement</h2>
        <p className="text-sm text-on-surface-variant">{config.content}</p>
      </div>

      <FAQSection faqs={config.faqs} />

      <div className="card-surface mt-8">
        <h3 className="font-headline font-semibold text-sm text-on-surface mb-3">Related childcare leave pages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(variants)
            .filter((v) => v.slug !== config.slug)
            .slice(0, 6)
            .map((v) => (
              <Link
                key={v.slug}
                href={`/childcare-leave/${v.slug}`}
                className="text-sm text-primary hover:underline py-1"
              >
                {v.h1.split('—')[0].trim()}
              </Link>
            ))}
        </div>
      </div>

      <RelatedCalculators current="childcare" className="mt-10" />
    </div>
  )
}
