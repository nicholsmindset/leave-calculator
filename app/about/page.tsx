import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import SchemaScript from '@/components/seo/SchemaScript'
import { organizationSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'About | ParentalLeaveCalculator.com',
  description:
    'ParentalLeaveCalculator.com provides free, accurate Singapore parental leave calculators — maternity, paternity, childcare, and more. Updated for 2026 MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/about',
  },
}

export default function AboutPage() {
  const schema = organizationSchema()

  return (
    <>
      <SchemaScript schema={schema} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'About' }]} />

        <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-6">
          About ParentalLeaveCalculator.com
        </h1>

        <div className="space-y-6 text-sm text-on-surface-variant">
          <div className="card-surface">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">What we do</h2>
            <p>
              ParentalLeaveCalculator.com provides free, interactive calculators for Singapore&apos;s parental leave system — covering maternity leave, paternity leave, shared parental leave, childcare leave, the Baby Bonus Scheme, and more.
            </p>
            <p className="mt-3">
              Our goal is to make Singapore&apos;s parental leave entitlements easy to understand and calculate. Whether you&apos;re planning your leave, checking your eligibility, or estimating your pay during leave, our tools give you an instant, accurate answer.
            </p>
          </div>

          <div className="card-surface">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Data accuracy</h2>
            <p>
              All policy data is based on official Ministry of Manpower (MOM) and Ministry of Social and Family Development (MSF) guidelines. We update our calculators whenever Singapore&apos;s parental leave policies change.
            </p>
            <div className="mt-3">
              <GovernmentBadge />
            </div>
            <p className="mt-3">
              Our calculators are intended as estimates to help you understand your entitlements. Always verify your specific situation with your employer, HR department, or MOM directly at{' '}
              <a href="https://www.mom.gov.sg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mom.gov.sg
              </a>.
            </p>
          </div>

          <div className="card-surface">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Our calculators</h2>
            <ul className="space-y-2">
              {[
                { href: '/maternity-leave/calculator', label: 'Maternity Leave Calculator' },
                { href: '/paternity-leave/calculator', label: 'Paternity Leave Calculator' },
                { href: '/shared-parental-leave/calculator', label: 'Shared Parental Leave Planner' },
                { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator' },
                { href: '/baby-bonus/calculator', label: 'Baby Bonus Calculator' },
                { href: '/tools/pay-calculator', label: 'Leave Pay Calculator' },
                { href: '/tools/leave-planner', label: 'Leave Planner Calendar' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-primary hover:underline font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Advertising</h2>
            <p>
              This site is supported by Google AdSense advertising. We do not accept sponsored content, affiliate links, or paid placements. Our calculator results and policy information are never influenced by advertisers.
            </p>
          </div>

          <div className="card-surface">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-3">Contact us</h2>
            <p>
              Have a question, found an error in our data, or want to suggest a new calculator?{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us here
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
