import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Terms of Use | ParentalLeaveCalculator.com',
  description: 'Terms of use for ParentalLeaveCalculator.com. Disclaimer and limitations of liability.',
  alternates: {
    canonical: 'https://leavecalculator.sg/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Terms of Use' }]} />

      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-6">
        Terms of Use
      </h1>

      <div className="space-y-6 text-sm text-on-surface-variant">
        <p className="text-xs text-on-surface-variant">Last updated: March 2026</p>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">1. Estimates only — not legal advice</h2>
          <p>
            The calculators and information on ParentalLeaveCalculator.com provide estimates based on Singapore Ministry of Manpower (MOM) guidelines. Results are for informational purposes only and do not constitute legal, financial, or HR advice.
          </p>
          <p>
            Your actual entitlements may differ based on your specific employment contract, company policies, collective agreements, or individual circumstances. Always verify your entitlements with your employer, HR department, or MOM directly.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">2. Accuracy of information</h2>
          <p>
            We make reasonable efforts to keep our policy data accurate and up to date. However, Singapore&apos;s parental leave policies change periodically. We do not guarantee that the information on this site is current, complete, or accurate at all times.
          </p>
          <p>
            Policy data is sourced from MOM and MSF publications. When in doubt, always refer to the official MOM website at{' '}
            <a href="https://www.mom.gov.sg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mom.gov.sg
            </a>.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">3. Limitation of liability</h2>
          <p>
            ParentalLeaveCalculator.com and its operators are not liable for any errors, omissions, or inaccuracies in the calculator results. We are not liable for any loss or damage arising from your reliance on information provided on this site.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">4. Intellectual property</h2>
          <p>
            All content on this site, including calculator logic, design, and written content, is the property of ParentalLeaveCalculator.com unless otherwise stated. Government policy data is reproduced for informational purposes under fair use.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use automated tools to scrape or bulk-download content from this site</li>
            <li>Attempt to circumvent any security measures on the site</li>
            <li>Use the site for any unlawful purpose</li>
          </ul>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">6. Changes to terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.
          </p>
        </div>
      </div>
    </div>
  )
}
