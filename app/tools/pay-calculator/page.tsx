import { Metadata } from 'next'
import PayCalculator from '@/components/calculators/PayCalculator'

export const metadata: Metadata = {
  title: 'Parental Leave Pay Calculator Singapore 2026 | Free Tool',
  description: 'Calculate your total income during parental leave in Singapore. Enter your salary, bonus, and leave types to get a month-by-month income breakdown. Covers maternity, paternity, and shared parental leave pay.',
  alternates: {
    canonical: 'https://leavecalculator.sg/tools/pay-calculator',
  },
}

export default function PayCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
          Parental Leave Pay Calculator Singapore 2026
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
          Calculate your total income during parental leave in Singapore. Enter your gross monthly salary, any annual bonus or AWS, and select which leave types you plan to take. The calculator shows a month-by-month breakdown of your income, distinguishing between employer-paid and government-paid portions. Government-paid leave is capped at $357.14/day ($10,000 per 28-day period).
        </p>
      </div>

      <PayCalculator />

      <div className="mt-8 card-surface space-y-3">
        <h2 className="font-headline font-semibold text-sm text-on-surface">How parental leave pay works in Singapore</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-on-surface-variant">
          <div>
            <p className="font-medium text-on-surface mb-1">Pay formula</p>
            <p>Your daily leave pay is calculated as (Monthly Salary × 12) ÷ 365. For government-paid leave, this is capped at $357.14/day ($10,000 per 28 days).</p>
          </div>
          <div>
            <p className="font-medium text-on-surface mb-1">CPF contributions</p>
            <p>CPF is deducted from leave pay just as it is from regular salary. Both employee and employer CPF contributions continue during paid parental leave.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
