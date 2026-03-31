import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Contact | ParentalLeaveCalculator.com',
  description: 'Contact ParentalLeaveCalculator.com to report errors, suggest improvements, or ask about Singapore parental leave.',
  alternates: {
    canonical: 'https://leavecalculator.sg/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-6">
        Contact Us
      </h1>

      <div className="space-y-6">
        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">Get in touch</h2>
          <p className="text-sm text-on-surface-variant">
            Have a question about our calculators, found an error in our policy data, or want to suggest a new feature? We&apos;d love to hear from you.
          </p>
          <p className="text-sm text-on-surface-variant">
            Email us at{' '}
            <a href="mailto:hello@leavecalculator.sg" className="text-primary hover:underline font-medium">
              hello@leavecalculator.sg
            </a>
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">Common questions</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-sm text-on-surface">Found an error in the policy data?</p>
              <p className="text-sm text-on-surface-variant mt-1">
                Our data is based on MOM guidelines current as of April 2025. If you believe a figure is incorrect, please email us with the specific figure and a link to the official MOM source. We update our data promptly.
              </p>
            </div>
            <div>
              <p className="font-medium text-sm text-on-surface">Need help with your specific situation?</p>
              <p className="text-sm text-on-surface-variant mt-1">
                Our calculators provide general estimates. For advice on your specific situation, contact MOM directly at{' '}
                <a href="https://www.mom.gov.sg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  mom.gov.sg
                </a>{' '}
                or your HR department.
              </p>
            </div>
            <div>
              <p className="font-medium text-sm text-on-surface">Advertising enquiries</p>
              <p className="text-sm text-on-surface-variant mt-1">
                We only serve Google AdSense ads and do not accept direct advertising, sponsored content, or affiliate partnerships. Please do not contact us with advertising proposals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
