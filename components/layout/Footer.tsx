import Link from 'next/link'

const calculatorLinks = [
  { label: 'Maternity Leave Calculator', href: '/maternity-leave/calculator' },
  { label: 'Paternity Leave Calculator', href: '/paternity-leave/calculator' },
  { label: 'Childcare Leave Calculator', href: '/childcare-leave/calculator' },
  { label: 'Shared Parental Leave Planner', href: '/shared-parental-leave/calculator' },
  { label: 'Baby Bonus Calculator', href: '/baby-bonus/calculator' },
  { label: 'Childcare Subsidy Calculator', href: '/childcare-subsidy/calculator' },
]

const toolLinks = [
  { label: 'Leave Planner Calendar', href: '/tools/leave-planner' },
  { label: 'Full Pay Calculator', href: '/tools/pay-calculator' },
  { label: 'Leave Checklist', href: '/tools/leave-checklist' },
  { label: 'Return to Work Calculator', href: '/tools/return-to-work' },
]

const leaveTypeLinks = [
  { label: 'Maternity Leave', href: '/maternity-leave' },
  { label: 'Paternity Leave', href: '/paternity-leave' },
  { label: 'Shared Parental Leave', href: '/shared-parental-leave' },
  { label: 'Childcare Leave', href: '/childcare-leave' },
  { label: 'Extended Childcare Leave', href: '/extended-childcare-leave' },
  { label: 'Unpaid Infant Care Leave', href: '/unpaid-infant-care-leave' },
  { label: 'Adoption Leave', href: '/adoption-leave' },
  { label: 'Baby Bonus', href: '/baby-bonus' },
]

const legalLinks = [
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant/30 mt-auto print:hidden">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]" aria-hidden="true">
                  child_care
                </span>
              </div>
              <span className="font-headline font-bold text-primary text-sm">
                Leave Calculator<br />Singapore
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              Singapore&apos;s most complete parental leave calculator suite. Free, instant, and updated for 2026 MOM guidelines.
            </p>
            <a
              href="https://www.mom.gov.sg/employment-practices/leave"
              target="_blank"
              rel="noopener noreferrer"
              className="gov-badge inline-flex"
            >
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">verified</span>
              Based on MOM 2026 guidelines
            </a>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-3">Calculators</h3>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leave types */}
          <div>
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-3">Leave Types</h3>
            <ul className="space-y-2">
              {leaveTypeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Legal */}
          <div>
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-3">Tools</h3>
            <ul className="space-y-2 mb-6">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-3">Company</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-on-surface-variant text-center sm:text-left">
            © {new Date().getFullYear()} ParentalLeaveCalculator.com. All rights reserved.
          </p>
          <p className="text-xs text-on-surface-variant text-center sm:text-right max-w-md">
            Estimates only — always verify your entitlement with your employer and the{' '}
            <a
              href="https://www.mom.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Ministry of Manpower
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
