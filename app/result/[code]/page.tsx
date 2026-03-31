import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'

const leaveTypeLabels: Record<string, string> = {
  maternity: 'Maternity Leave',
  paternity: 'Paternity Leave',
  spl: 'Shared Parental Leave',
  childcare: 'Childcare Leave',
  'baby-bonus': 'Baby Bonus',
  'childcare-subsidy': 'Childcare Subsidy',
  adoption: 'Adoption Leave',
  uicl: 'Unpaid Infant Care Leave',
  pay: 'Leave Pay',
}

const leaveTypeHrefs: Record<string, string> = {
  maternity: '/maternity-leave/calculator',
  paternity: '/paternity-leave/calculator',
  spl: '/shared-parental-leave/calculator',
  childcare: '/childcare-leave/calculator',
  'baby-bonus': '/baby-bonus/calculator',
  'childcare-subsidy': '/childcare-subsidy/calculator',
  adoption: '/adoption-leave/calculator',
  uicl: '/unpaid-infant-care-leave/calculator',
  pay: '/tools/pay-calculator',
}

export async function generateMetadata(
  { params }: { params: { code: string } }
): Promise<Metadata> {
  return {
    title: `Shared Calculation — ${params.code} | ParentalLeaveCalculator.com`,
    description: 'View a shared Singapore parental leave calculation.',
    robots: { index: false, follow: false },
  }
}

async function getCalculation(code: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leavecalculator.sg'
    const res = await fetch(`${baseUrl}/api/calculation/${code}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function ResultPage({ params }: { params: { code: string } }) {
  const data = await getCalculation(params.code)

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Shared Result' }]} />
        <div className="card-surface text-center py-12">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4 block" aria-hidden="true">
            link_off
          </span>
          <h1 className="font-headline font-bold text-xl text-on-surface mb-2">
            Calculation not found
          </h1>
          <p className="text-sm text-on-surface-variant mb-6">
            This shared calculation may have expired (calculations are saved for 90 days) or the link may be incorrect.
          </p>
          <Link href="/" className="btn-primary">
            Go to calculators
          </Link>
        </div>
      </div>
    )
  }

  const leaveLabel = leaveTypeLabels[data.leave_type] ?? data.leave_type
  const calculatorHref = leaveTypeHrefs[data.leave_type] ?? '/'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Shared Result' }]} />

      <div className="mb-6">
        <p className="text-xs text-on-surface-variant mb-2">Shared calculation</p>
        <h1 className="font-headline font-bold text-xl text-on-surface">
          {leaveLabel} — Singapore 2026
        </h1>
      </div>

      <div className="card-surface mb-6">
        <h2 className="font-headline font-semibold text-sm text-on-surface mb-3">Inputs</h2>
        <div className="space-y-2">
          {Object.entries(data.inputs as Record<string, unknown>).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm border-b border-outline-variant/10 last:border-0 pb-2 last:pb-0">
              <span className="text-on-surface-variant capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
              <span className="text-on-surface font-medium">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface mb-6">
        <h2 className="font-headline font-semibold text-sm text-on-surface mb-3">Results</h2>
        <div className="space-y-2">
          {Object.entries(data.results as Record<string, unknown>)
            .filter(([, v]) => typeof v !== 'object' && v !== null)
            .map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm border-b border-outline-variant/10 last:border-0 pb-2 last:pb-0">
                <span className="text-on-surface-variant capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                <span className="text-on-surface font-medium">{String(value)}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="card-surface text-center py-8">
        <p className="text-sm text-on-surface-variant mb-4">
          Want to calculate your own entitlement?
        </p>
        <Link href={calculatorHref} className="btn-primary">
          Open {leaveLabel} Calculator
        </Link>
      </div>
    </div>
  )
}
