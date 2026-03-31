import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import RelatedCalculators from '@/components/shared/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Going Back to Work After Maternity Leave Singapore 2026',
  description: 'Practical guide to returning to work after maternity leave in Singapore. Childcare options, flexible work arrangements, breastfeeding rights, and financial planning.',
  alternates: { canonical: 'https://leavecalculator.sg/guides/going-back-to-work-after-maternity-leave' },
}

export default function GoingBackToWork() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Going Back to Work After Maternity Leave' }]} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <LastUpdated date="January 2026" />
        <GovernmentBadge />
      </div>
      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-4">Going Back to Work After Maternity Leave Singapore 2026</h1>
      <p className="text-on-surface-variant mb-8 leading-relaxed">Returning to work after maternity leave can feel overwhelming. This guide covers the practical steps — from choosing childcare to negotiating flexible work arrangements and understanding your breastfeeding rights.</p>

      <div className="space-y-6">
        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Childcare options in Singapore</h2>
          <p className="text-sm text-on-surface-variant">The most common options are infant care centres (for babies 2–18 months), childcare centres (18 months–6 years), and family caregivers (parents, in-laws, domestic helpers). Infant care can cost $1,200–$2,000/month before subsidies. Government subsidies can reduce this significantly — use our childcare subsidy calculator to estimate your net cost.</p>
          <Link href="/childcare-subsidy/calculator" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            Calculate childcare subsidy
          </Link>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Flexible work arrangements</h2>
          <p className="text-sm text-on-surface-variant">Under the Tripartite Guidelines on Flexible Work Arrangements (effective 2024), employees can formally request flexible work arrangements (e.g. remote work, reduced hours, staggered start times). Employers must consider requests fairly and respond in writing within 2 months. While not all requests must be granted, employers must provide reasons for rejection.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Breastfeeding at work</h2>
          <p className="text-sm text-on-surface-variant">There is no statutory right to paid breastfeeding breaks in Singapore, but many employers offer nursing rooms and flexible breaks as a matter of policy. Check your employer&apos;s maternity and nursing support policies before returning. The Health Promotion Board recommends at least 6 months of exclusive breastfeeding.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Childcare leave after you return</h2>
          <p className="text-sm text-on-surface-variant">Once you return to work, you are entitled to 6 days of Government-Paid Childcare Leave per year for each Singapore Citizen or PR child under 7 years old. This leave is paid at your usual daily rate and can be taken on any working day throughout the year.</p>
          <Link href="/childcare-leave/calculator" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            Calculate childcare leave
          </Link>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Financial planning after maternity leave</h2>
          <p className="text-sm text-on-surface-variant">Review your monthly budget to account for childcare costs, which can range from $200 (after full subsidies at AO centres) to $1,500+ at private infant care. Factor in CDA contributions to maximise government co-matching under the Baby Bonus scheme.</p>
        </div>
      </div>

      <RelatedCalculators current="maternity" className="mt-10" />
    </div>
  )
}
