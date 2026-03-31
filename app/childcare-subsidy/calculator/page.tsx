import { Metadata } from 'next'
import ChildcareSubsidyCalculator from '@/components/calculators/ChildcareSubsidyCalculator'

export const metadata: Metadata = {
  title: 'Childcare Subsidy Calculator Singapore 2026 | Free Tool',
  description: 'Calculate your childcare and infant care subsidy in Singapore. Covers Basic Subsidy, Additional Subsidy, and means-tested income tiers. Updated for 2026 ECDA guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/childcare-subsidy/calculator',
  },
}

export default function ChildcareSubsidyCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Childcare Subsidy Calculator Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Calculate your government childcare or infant care subsidy in Singapore. The Basic Subsidy applies to all working mothers, while the Additional Subsidy is means-tested based on your household income. Covers anchor operator (AO), partner operator (POP), and private centre fees. Updated for the latest 2026 ECDA guidelines.
        </p>
      </div>

      <ChildcareSubsidyCalculator />

      <div className="mt-8 card-surface space-y-3">
        <h2 className="font-headline font-semibold text-sm text-on-surface">About childcare subsidies in Singapore</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-on-surface-variant">
          <div>
            <p className="font-medium text-on-surface mb-1">Basic Subsidy</p>
            <p>Available to Singapore Citizen children in licensed childcare or infant care centres. The amount depends on whether both parents are working and the type of centre.</p>
          </div>
          <div>
            <p className="font-medium text-on-surface mb-1">Additional Subsidy</p>
            <p>Means-tested and available to households earning up to $12,000/month. It supplements the Basic Subsidy to make childcare more affordable for lower-income families.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
