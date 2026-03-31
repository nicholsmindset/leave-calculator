import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import RelatedCalculators from '@/components/shared/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Paternity Leave Guide for Fathers Singapore 2026',
  description: 'Complete guide to 4 weeks of government-paid paternity leave in Singapore. Eligibility, how to apply, flexible blocks, and pay calculation.',
  alternates: { canonical: 'https://leavecalculator.sg/guides/paternity-leave-guide-for-fathers' },
}

export default function PaternityLeaveGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Paternity Leave Guide for Fathers' }]} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <LastUpdated date="April 2025" />
        <GovernmentBadge />
      </div>
      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-4">Paternity Leave Guide for Fathers Singapore 2026</h1>
      <p className="text-on-surface-variant mb-8 leading-relaxed">From 1 April 2025, fathers in Singapore are entitled to 4 weeks of Government-Paid Paternity Leave (GPPL) for a Singapore Citizen baby. This guide explains eligibility, how to apply, and how to take your leave in flexible blocks.</p>

      <div className="space-y-6">
        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">How much paternity leave do I get?</h2>
          <p className="text-sm text-on-surface-variant">If your baby is a <strong>Singapore Citizen</strong>, you get 4 weeks (28 days) of GPPL. If your baby is a PR or foreigner, you get 2 weeks. The leave is paid at your usual daily rate, capped at $357.14/day ($10,000 per 28-day period).</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Eligibility</h2>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            {['You are the father of a Singapore Citizen or PR child', 'You have worked for your employer for at least 90 continuous days before your child\'s birth', 'You are legally married to the child\'s mother at the time of birth', 'Self-employed fathers are also eligible if they have made MediSave contributions for 3 months before the birth'].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0 mt-0.5">check</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Taking leave in flexible blocks</h2>
          <p className="text-sm text-on-surface-variant">Your 4 weeks of GPPL can be taken in one continuous block or in separate blocks (e.g. 1 week at birth + 1 week at 3 months + 2 weeks at 6 months). All leave must be taken within <strong>12 months</strong> of your child&apos;s birth. Any unused leave after 12 months is forfeited.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">How to apply</h2>
          <ol className="space-y-2 text-sm text-on-surface-variant list-decimal list-inside">
            <li>Notify your employer of the planned leave dates as early as possible</li>
            <li>Submit a leave application to HR with your child&apos;s birth certificate</li>
            <li>Your employer pays your salary during the leave</li>
            <li>Your employer claims reimbursement from the government via the GPPL claim portal</li>
          </ol>
        </div>
      </div>

      <div className="mt-8 card-surface">
        <p className="text-sm text-on-surface-variant mb-3">Calculate your exact paternity leave pay:</p>
        <Link href="/paternity-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          Calculate my paternity leave
        </Link>
      </div>

      <RelatedCalculators current="paternity" className="mt-10" />
    </div>
  )
}
