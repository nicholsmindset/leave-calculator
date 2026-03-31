import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import RelatedCalculators from '@/components/shared/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Singapore Parental Leave Guide 2026 — Complete Overview',
  description: 'The complete guide to parental leave in Singapore 2026. Covers maternity (16 weeks), paternity (4 weeks), shared parental leave (12 weeks), childcare leave, baby bonus, and more.',
  alternates: { canonical: 'https://leavecalculator.sg/guides/singapore-parental-leave-guide-2026' },
}

export default function ParentalLeaveGuide2026() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Singapore Parental Leave Guide 2026' }]} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <LastUpdated date="April 2025" />
        <GovernmentBadge />
      </div>
      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-4">
        Singapore Parental Leave Guide 2026
      </h1>
      <p className="text-on-surface-variant mb-8 leading-relaxed">
        Singapore has one of the most comprehensive parental leave systems in Asia. This guide covers every leave type available to parents in 2026 — from maternity and paternity leave to shared parental leave, childcare leave, and the baby bonus scheme.
      </p>

      <div className="space-y-8">
        <section className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Maternity Leave — 16 weeks</h2>
          <p className="text-sm text-on-surface-variant">Eligible employees and self-employed mothers receive 16 weeks of maternity leave for a Singapore Citizen baby, or 12 weeks for a non-SC baby. The first 8 weeks are employer-paid (with government reimbursement), and the remaining 8 weeks are Government-Paid Maternity Leave (GPML). Pay is capped at $357.14/day.</p>
          <Link href="/maternity-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            Calculate maternity leave
          </Link>
        </section>

        <section className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Paternity Leave — 4 weeks (from April 2025)</h2>
          <p className="text-sm text-on-surface-variant">From 1 April 2025, fathers are entitled to 4 weeks of Government-Paid Paternity Leave (GPPL) for a Singapore Citizen baby, up from 2 weeks. The leave can be taken in flexible blocks within 12 months of birth. Pay is capped at $357.14/day.</p>
          <Link href="/paternity-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            Calculate paternity leave
          </Link>
        </section>

        <section className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Shared Parental Leave — up to 12 weeks</h2>
          <p className="text-sm text-on-surface-variant">From 1 April 2025, mothers can transfer up to 12 weeks of their maternity leave to their spouse or partner, up from 4 weeks. The mother must retain at least 8 compulsory weeks. SPL applies only for Singapore Citizen babies.</p>
          <Link href="/shared-parental-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            Plan your SPL split
          </Link>
        </section>

        <section className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Childcare Leave — 6 days/year</h2>
          <p className="text-sm text-on-surface-variant">Each parent with a Singapore Citizen or PR child under 7 years old is entitled to 6 days of Government-Paid Childcare Leave (GPCL) per year. For children aged 7–12, parents get 2 days of Extended Childcare Leave (ECL) per year.</p>
          <Link href="/childcare-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            Calculate childcare leave
          </Link>
        </section>

        <section className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Baby Bonus</h2>
          <p className="text-sm text-on-surface-variant">The Baby Bonus scheme provides a cash gift of up to $13,000 for 3rd and subsequent Singapore Citizen children, plus a CDA First Step grant of $5,000 and government co-matching on CDA contributions of up to $15,000.</p>
          <Link href="/baby-bonus/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            Calculate baby bonus
          </Link>
        </section>
      </div>

      <RelatedCalculators current="maternity" className="mt-10" />
    </div>
  )
}
