import { Metadata } from 'next'
import AdoptionLeaveCalculator from '@/components/calculators/AdoptionLeaveCalculator'

export const metadata: Metadata = {
  title: 'Adoption Leave Calculator Singapore 2026 | Free Tool',
  description: 'Calculate your adoption leave entitlement and pay in Singapore. 12 weeks for eligible adoptive mothers. Covers eligibility, pay estimates, and government reimbursement. Based on MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/adoption-leave/calculator',
  },
}

export default function AdoptionLeaveCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Adoption Leave Calculator Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Calculate your adoption leave entitlement in Singapore. Eligible adoptive mothers are entitled to 12 weeks of adoption leave — 8 weeks paid by your employer (who is reimbursed by the government) and 4 flexible weeks. The child must be a Singapore Citizen and under 12 months old at the point of formal intent to adopt. You must have at least 3 months of continuous service with your employer.
        </p>
      </div>

      <AdoptionLeaveCalculator />

      <div className="mt-8 card-surface space-y-3">
        <h2 className="font-headline font-semibold text-sm text-on-surface">About adoption leave in Singapore</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-on-surface-variant">
          <div>
            <p className="font-medium text-on-surface mb-1">Eligibility</p>
            <p>You must be the adoptive mother, the child must be a Singapore Citizen under 12 months old at the point of formal intent to adopt, and you must have at least 3 months of continuous service.</p>
          </div>
          <div>
            <p className="font-medium text-on-surface mb-1">Pay during adoption leave</p>
            <p>Your employer pays your salary for the first 8 weeks and claims reimbursement from the government. Pay is capped at $357.14/day ($10,000 per 28-day period).</p>
          </div>
        </div>
      </div>
    </main>
  )
}
