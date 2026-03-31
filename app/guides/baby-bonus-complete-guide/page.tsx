import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import RelatedCalculators from '@/components/shared/RelatedCalculators'

export const metadata: Metadata = {
  title: 'Baby Bonus Complete Guide Singapore 2026 — Cash Gift, CDA & Co-match',
  description: 'Everything about the Singapore Baby Bonus scheme. Cash gift amounts, CDA First Step grant, government co-matching cap, and payout schedule for 2026.',
  alternates: { canonical: 'https://leavecalculator.sg/guides/baby-bonus-complete-guide' },
}

const cashGift = [
  { order: '1st child', gift: '$11,000', schedule: '$3,000 at birth, $1,500 at 6/12 months, $2,500 at 15/18 months' },
  { order: '2nd child', gift: '$11,000', schedule: '$3,000 at birth, $1,500 at 6/12 months, $2,500 at 15/18 months' },
  { order: '3rd child', gift: '$13,000', schedule: '$4,000 at birth, $2,000 at 6/12 months, $2,500 at 15/18 months' },
  { order: '4th+ child', gift: '$13,000', schedule: '$4,000 at birth, $2,000 at 6/12 months, $2,500 at 15/18 months' },
]

export default function BabyBonusGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Baby Bonus Complete Guide' }]} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <LastUpdated date="January 2026" />
        <GovernmentBadge />
      </div>
      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-4">Baby Bonus Complete Guide Singapore 2026</h1>
      <p className="text-on-surface-variant mb-8 leading-relaxed">The Baby Bonus scheme provides cash gifts and Child Development Account (CDA) grants for Singapore Citizen babies. This guide covers every component — cash gift, CDA First Step, and government co-matching.</p>

      <div className="space-y-6">
        <div className="card-surface space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">Cash Gift by birth order</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="text-left py-2 pr-4 text-on-surface-variant font-medium">Child order</th>
                  <th className="text-left py-2 pr-4 text-on-surface-variant font-medium">Total gift</th>
                  <th className="text-left py-2 text-on-surface-variant font-medium">Payout schedule</th>
                </tr>
              </thead>
              <tbody>
                {cashGift.map((row) => (
                  <tr key={row.order} className="border-b border-outline-variant/15 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-on-surface">{row.order}</td>
                    <td className="py-3 pr-4 font-bold text-primary">{row.gift}</td>
                    <td className="py-3 text-on-surface-variant">{row.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">CDA First Step Grant</h2>
          <p className="text-sm text-on-surface-variant">All Singapore Citizen babies receive a <strong>$5,000 CDA First Step Grant</strong> automatically deposited into their Child Development Account (CDA) when it is opened. No action is required from parents beyond opening the CDA — which can be done via participating banks (DBS, OCBC, UOB).</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">Government co-matching on CDA savings</h2>
          <p className="text-sm text-on-surface-variant">For every dollar you save in your child&apos;s CDA, the government matches it dollar-for-dollar, up to the co-matching cap. The cap increases with birth order: $3,000 for the 1st child, $9,000 for the 2nd, and $15,000 for the 3rd and subsequent children.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-bold text-lg text-on-surface">How to apply</h2>
          <p className="text-sm text-on-surface-variant">Apply for the Baby Bonus on the <strong>Moments of Life app</strong> within 12 months of your child&apos;s birth. You will need to open a CDA at DBS, OCBC, or UOB to receive the First Step Grant and co-matching. The cash gift is paid directly to your designated bank account.</p>
        </div>
      </div>

      <div className="mt-8 card-surface">
        <p className="text-sm text-on-surface-variant mb-3">Calculate your total baby bonus:</p>
        <Link href="/baby-bonus/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          Calculate baby bonus
        </Link>
      </div>

      <RelatedCalculators current="maternity" className="mt-10" />
    </div>
  )
}
