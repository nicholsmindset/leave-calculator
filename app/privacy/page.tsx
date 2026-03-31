import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy | ParentalLeaveCalculator.com',
  description: 'Privacy policy for ParentalLeaveCalculator.com. How we collect, use, and protect your data.',
  alternates: {
    canonical: 'https://leavecalculator.sg/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-on-surface-variant">
        <p className="text-xs text-on-surface-variant">Last updated: March 2026</p>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">1. Information we collect</h2>
          <p>
            <strong>Calculator inputs:</strong> When you use our calculators, the inputs you enter (such as salary, leave dates, and citizenship status) are processed in your browser. We do not store this data unless you explicitly choose to share your results.
          </p>
          <p>
            <strong>Shared calculations:</strong> If you click &ldquo;Share results&rdquo;, your anonymous calculator inputs and results are saved to our database with a unique share code. No personal identifiers (name, email, IP address) are attached to saved calculations.
          </p>
          <p>
            <strong>Analytics:</strong> We collect anonymous analytics about calculator usage (leave type, employment type, whether the user has a salary entered) to improve our tools. No personally identifiable information is collected. Session identifiers are randomised and not linked to you.
          </p>
          <p>
            <strong>Cookies:</strong> We use cookies for Google AdSense advertising and Google Analytics 4. These may track your browsing behaviour across websites. See Google&apos;s privacy policy for details.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">2. How we use your information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To operate and improve our calculator tools</li>
            <li>To generate shareable result pages when you request them</li>
            <li>To understand which calculators are most used (anonymous analytics)</li>
            <li>To serve relevant advertisements via Google AdSense</li>
          </ul>
          <p>We do not sell your data to third parties. We do not use your data for direct marketing.</p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">3. Data retention</h2>
          <p>
            Shared calculations are automatically deleted after 90 days. Anonymous analytics events are retained for up to 2 years. You can request deletion of any data associated with a share code by contacting us.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">4. Third-party services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google AdSense:</strong> Advertising, may use cookies for personalised ads</li>
            <li><strong>Google Analytics 4:</strong> Anonymous usage analytics</li>
            <li><strong>Supabase:</strong> Database hosting for shared calculations (servers in Singapore)</li>
            <li><strong>Vercel:</strong> Website hosting and edge functions</li>
          </ul>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">5. Your rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal data. As we collect minimal data and do not link it to personal identifiers, most requests can be addressed by deleting browser cookies and any saved share codes.
          </p>
          <p>
            For data deletion requests or questions about your privacy, contact us via our{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </div>

        <div className="card-surface space-y-3">
          <h2 className="font-headline font-semibold text-base text-on-surface">6. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </div>
      </div>
    </div>
  )
}
