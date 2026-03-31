import { Metadata } from 'next'
import UIClCalculator from '@/components/calculators/UIClCalculator'

export const metadata: Metadata = {
  title: 'Unpaid Infant Care Leave Calculator Singapore 2026 | Free Tool',
  description: 'Calculate your Unpaid Infant Care Leave (UICL) entitlement in Singapore. 12 days per parent per year for children under 2. Check eligibility and lifetime caps. Based on MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/unpaid-infant-care-leave/calculator',
  },
}

export default function UICLCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Unpaid Infant Care Leave Calculator Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Calculate your Unpaid Infant Care Leave (UICL) entitlement in Singapore. Both parents are entitled to 12 days of unpaid leave per year for each Singapore Citizen or Permanent Resident child below 2 years old. UICL is unpaid — there is no government reimbursement. You need at least 3 months of continuous service with your employer to be eligible.
        </p>
      </div>

      <UIClCalculator />

      <div className="mt-8 card-surface space-y-3">
        <h2 className="font-headline font-semibold text-sm text-on-surface">About Unpaid Infant Care Leave</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-on-surface-variant">
          <div>
            <p className="font-medium text-on-surface mb-1">Eligibility</p>
            <p>Your child must be a Singapore Citizen or Permanent Resident below 2 years old. You must have worked for your current employer for at least 3 continuous months.</p>
          </div>
          <div>
            <p className="font-medium text-on-surface mb-1">Entitlement</p>
            <p>Each parent gets 12 days per year (6 days per half-year period). UICL is unpaid — your employer is not required to pay your salary during these days. The leave cannot be encashed.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
