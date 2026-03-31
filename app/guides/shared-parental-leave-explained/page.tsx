import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import RelatedCalculators from '@/components/shared/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Shared Parental Leave Explained Singapore 2026',
  description: 'How to transfer up to 12 weeks of maternity leave to your partner in Singapore. Eligibility, pay, and how to split leave for maximum benefit.',
  alternates: { canonical: 'https://leavecalculator.sg/guides/shared-parental-leave-explained' },
}

export default function SPLExplained() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Shared Parental Leave Explained' }]} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <LastUpdated date="April 2025" />
        <GovernmentBadge />
      </div>
      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-4">Shared Parental Leave Explained Singapore 2026</h1>
      <p className="text-on-surface-variant mb-8 leading-relaxed">From 1 April 2025, mothers can transfer up to 12 weeks of their maternity leave to their spouse or partner — up from 4 weeks previously. This guide explains how Shared Parental Leave (SPL) works and how to plan the split.</p>

      <div className="space-y-6">
        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">What is Shared Parental Leave?</h2>
          <p className="text-sm text-on-surface-variant">SPL allows a mother to transfer a portion of her maternity leave to the child&apos;s father. The transferred weeks are paid at the father&apos;s daily rate (capped at $357.14/day). The mother must retain at least 8 compulsory weeks for herself. SPL only applies for <strong>Singapore Citizen babies</strong>.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">How many weeks can be transferred?</h2>
          <p className="text-sm text-on-surface-variant">Out of 16 weeks total maternity leave, the mother must keep at least 8 weeks. She can transfer up to 12 weeks to the father — but the total taken by both parents cannot exceed 16 weeks. In practice, most families transfer 4–8 weeks to the father.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Who is eligible?</h2>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            {['Baby must be a Singapore Citizen', 'Both parents must meet their respective employment eligibility criteria (90 days\' service)', 'Mother must consent to the transfer in writing', 'Both parents must be legally married'].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0 mt-0.5">check</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">How is SPL paid?</h2>
          <p className="text-sm text-on-surface-variant">The transferred weeks are paid based on the <strong>father&apos;s</strong> gross salary (not the mother&apos;s), capped at $357.14/day. The father&apos;s employer pays and claims reimbursement from the government. This means if the father earns more than the mother, SPL may increase the family&apos;s total leave income.</p>
        </div>
      </div>

      <div className="mt-8 card-surface">
        <p className="text-sm text-on-surface-variant mb-3">Plan your SPL split and compare income:</p>
        <Link href="/shared-parental-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          Plan my SPL split
        </Link>
      </div>

      <RelatedCalculators current="spl" className="mt-10" />
    </div>
  )
}
