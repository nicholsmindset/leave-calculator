import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Maternity Leave Checklist Singapore 2026 — Before, During & After',
  description: 'A complete checklist for Singapore maternity leave. What to do before you leave, during leave, and when returning to work. Updated for 2026.',
  alternates: { canonical: 'https://leavecalculator.sg/guides/maternity-leave-checklist' },
}

const beforeLeave = [
  'Notify your employer in writing at least 1 week before your last day',
  'Confirm your expected delivery date with HR and agree on your last working day',
  'Submit your maternity leave application form to HR',
  'Arrange handover documents and brief your cover / team',
  'Check your employment contract for any contractual top-ups above statutory entitlement',
  'Confirm your salary payment schedule during leave with HR',
  'Set up an out-of-office auto-reply and delegate urgent emails',
]

const duringLeave = [
  'Keep your emergency contact details updated with HR',
  'Note your return-to-work date and confirm it with your employer',
  'Decide whether you want to use any remaining annual leave before returning',
  'If planning to breastfeed, check your company\'s nursing room policy before returning',
  'Arrange childcare (infant care, childcare centre, or family caregiver)',
  'Apply for Baby Bonus on the Moments of Life app after delivery',
  'Apply for Child Development Account (CDA) to receive the First Step grant',
]

const afterLeave = [
  'Confirm your return-to-work date with HR at least 2 weeks before',
  'Request a phased return or flexible work arrangement if needed',
  'Update your CPF beneficiary nomination if required',
  'Enrol your child for childcare subsidies via the LifeSG app or ECDA portal',
  'Claim any childcare leave balance if your child is under 7',
]

export default function MaternityLeaveChecklist() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Maternity Leave Checklist' }]} />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <LastUpdated date="January 2026" />
        <GovernmentBadge />
      </div>
      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-4">Maternity Leave Checklist Singapore 2026</h1>
      <p className="text-on-surface-variant mb-8">Use this checklist to make sure you&apos;ve covered everything before, during, and after your maternity leave in Singapore.</p>

      <div className="space-y-6">
        {[
          { title: 'Before you go on leave', items: beforeLeave, icon: 'event_upcoming' },
          { title: 'During your leave', items: duringLeave, icon: 'home' },
          { title: 'Returning to work', items: afterLeave, icon: 'work' },
        ].map(({ title, items, icon }) => (
          <div key={title} className="card-surface space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">{icon}</span>
              <h2 className="font-headline font-bold text-base text-on-surface">{title}</h2>
            </div>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 card-surface">
        <p className="text-sm text-on-surface-variant mb-3">Not sure about your entitlement? Use our calculator:</p>
        <Link href="/maternity-leave/calculator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          Calculate my maternity leave
        </Link>
      </div>

      <RelatedCalculators current="maternity" className="mt-10" />
    </div>
  )
}
