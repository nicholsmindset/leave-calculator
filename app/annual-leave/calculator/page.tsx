import { Metadata } from 'next'
import AnnualLeaveCalculator from '@/components/calculators/AnnualLeaveCalculator'

export const metadata: Metadata = {
  title: 'Annual Leave Calculator Singapore 2026 | Free Tool',
  description: 'Calculate your annual leave entitlement in Singapore. Covers statutory minimums by years of service, pro-rated entitlements, and carried-forward days. Based on MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/annual-leave/calculator',
  },
}

export default function AnnualLeaveCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Annual Leave Calculator Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Calculate your annual leave entitlement under the Employment Act. Statutory leave increases from 7 days in year one to 14 days from year eight onwards. If you joined mid-year or changed employers, your leave is pro-rated. Enter your years of service and months employed to get your exact entitlement.
        </p>
      </div>

      <AnnualLeaveCalculator />

      <div className="mt-8 card-surface space-y-3">
        <h2 className="font-headline font-semibold text-sm text-on-surface">How annual leave works in Singapore</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-on-surface-variant">
          <div>
            <p className="font-medium text-on-surface mb-1">Statutory entitlement</p>
            <p>Under the Employment Act, the statutory minimum starts at 7 days in your first year and increases by 1 day each year, capping at 14 days from year 8 onwards.</p>
          </div>
          <div>
            <p className="font-medium text-on-surface mb-1">Pro-rated leave</p>
            <p>If you did not work the full year (e.g. joined mid-year or changed jobs), your annual leave entitlement is pro-rated based on the number of completed months of service.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
