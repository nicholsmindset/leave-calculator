import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LeavePlanner from '@/components/tools/LeavePlanner'

export const metadata: Metadata = {
  title: 'Leave Planner Singapore 2026 | Calendar with Public Holidays & iCal Export',
  description: 'Plan your parental leave on a calendar with Singapore 2025/2026 public holidays highlighted. Export to iCal or add to Google Calendar. Free, instant, no sign-up.',
  alternates: { canonical: 'https://leavecalculator.sg/tools/leave-planner' },
}

export default function LeavePlannerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Leave Planner' }]} />
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Leave Planner Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Enter your leave start date and duration to see your leave period on a calendar with Singapore public holidays highlighted. Export your leave dates to your calendar app with one click.
        </p>
      </div>
      <LeavePlanner />
    </main>
  )
}
