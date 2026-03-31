import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LeaveChecklist from '@/components/tools/LeaveChecklist'

export const metadata: Metadata = {
  title: 'Parental Leave Checklist Singapore 2026 | Free Interactive Checklist',
  description: 'Interactive parental leave checklist for Singapore parents. Covers everything before leave, after birth, childcare, and returning to work. Progress saved in your browser.',
  alternates: { canonical: 'https://leavecalculator.sg/tools/leave-checklist' },
}

export default function LeaveChecklistPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Leave Checklist' }]} />
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Parental Leave Checklist Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Use this interactive checklist to track everything you need to do before, during, and after parental leave in Singapore. Your progress is saved automatically in your browser — no account needed.
        </p>
      </div>
      <LeaveChecklist />
    </main>
  )
}
