import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Singapore Parental Leave Glossary 2026 — Key Terms Explained',
  description: 'Plain-English definitions of every Singapore parental leave term: GPML, GPPL, SPL, GPCL, ECL, UICL, CDA, Baby Bonus, pay cap, and more. Updated for 2026 MOM guidelines.',
  alternates: { canonical: 'https://leavecalculator.sg/glossary' },
}

const terms = [
  // ── A ──────────────────────────────────────────────────────────────────
  {
    id: 'adoption-leave',
    term: 'Adoption Leave',
    category: 'Leave type',
    definition:
      'A 12-week paid leave for eligible adoptive mothers. The first 8 weeks are employer-paid (government-reimbursed); the remaining 4 weeks are flexible and must be used before the child turns 1. The child must be a Singapore Citizen below 12 months old at the point of the formal intent to adopt.',
    link: '/adoption-leave',
  },
  {
    id: 'anchor-operator',
    term: 'Anchor Operator (AO)',
    category: 'Childcare subsidy',
    definition:
      'A preschool or infant care centre that has signed an agreement with ECDA to keep fees low. AO centres have a fee cap of $610/month (2026) before subsidies, making them the most affordable option for working parents.',
  },
  {
    id: 'annual-leave',
    term: 'Annual Leave',
    category: 'Leave type',
    definition:
      'Paid leave for rest and recreation, governed by the Employment Act. Entitlement starts at 7 days in the first year and increases by 1 day per year of service, up to a maximum of 14 days from year 8 onwards. Requires at least 3 months of continuous service to be eligible.',
    link: '/annual-leave',
  },
  // ── B ──────────────────────────────────────────────────────────────────
  {
    id: 'baby-bonus',
    term: 'Baby Bonus Scheme',
    category: 'Government benefit',
    definition:
      'A package of cash and savings incentives for parents of Singapore Citizen children. Comprises three components: (1) Cash Gift — $11,000 for the 1st and 2nd child, $13,000 for the 3rd child onwards; (2) CDA First Step Grant — $5,000 automatically deposited into the Child Development Account ($10,000 for 3rd+ child born on/after 18 Feb 2025); and (3) Government co-matching of CDA top-ups, up to $6,000 for the 1st/2nd child and up to $18,000 for the 5th child.',
    link: '/baby-bonus',
  },
  // ── C ──────────────────────────────────────────────────────────────────
  {
    id: 'cda',
    term: 'Child Development Account (CDA)',
    category: 'Government benefit',
    definition:
      'A special savings account for Singapore Citizen children from birth up to age 12, offered by DBS, OCBC, and UOB. Funds in the CDA can be used at approved institutions including childcare centres, kindergartens, hospitals, and pharmacies. The government deposits the CDA First Step Grant automatically and matches every dollar you save, up to the co-matching cap for your child\'s birth order.',
    link: '/baby-bonus',
  },
  {
    id: 'cda-first-step',
    term: 'CDA First Step Grant',
    category: 'Government benefit',
    definition:
      'A $5,000 grant automatically deposited into the Child Development Account when it is opened, for Singapore Citizen children. For the 3rd child or beyond born on/after 18 February 2025, this is doubled to $10,000 under the Large Families Scheme.',
  },
  {
    id: 'childcare-leave',
    term: 'Childcare Leave (GPCL)',
    category: 'Leave type',
    definition:
      'Government-Paid Childcare Leave (GPCL) gives each parent 6 days of paid leave per year if their youngest qualifying child is a Singapore Citizen or Permanent Resident below 7 years old. Parents with a non-SC/non-PR child get 2 days per year. The first 3 days are employer-paid; the last 3 days are government-reimbursed at up to $500/day. Requires 3 months of continuous service.',
    link: '/childcare-leave',
  },
  {
    id: 'childcare-subsidy',
    term: 'Childcare Subsidy',
    category: 'Government benefit',
    definition:
      'A subsidy from ECDA to reduce the cost of infant care and childcare at licensed centres. Comprises a Basic Subsidy (non-means-tested: $600/month for infant care, $300/month for childcare, for working mothers) and an Additional Subsidy (means-tested, for households earning under $12,000/month gross). Apply via the LifeSG app or ECDA portal.',
    link: '/childcare-subsidy',
  },
  {
    id: 'cpf',
    term: 'CPF (Central Provident Fund)',
    category: 'Key term',
    definition:
      'Singapore\'s mandatory social security savings scheme. CPF contributions apply during paid government-reimbursed leave (GPML, GPPL, SPL, GPCL). The government pay caps — e.g. $10,000 per 4-week period for maternity leave — include the employer\'s CPF contribution, so the actual cash payout to the employee is slightly less than the cap figure.',
  },
  // ── D ──────────────────────────────────────────────────────────────────
  {
    id: 'daily-pay-cap',
    term: 'Daily Pay Cap',
    category: 'Pay',
    definition:
      'The maximum government reimbursement rate of $357.14 per day (calculated as $10,000 ÷ 28 days). This cap applies to GPML, GPPL, SPL, and adoption leave. If your daily salary exceeds $357.14, you receive your full salary from your employer during employer-paid leave weeks; during government-paid weeks, the government reimburses your employer up to the cap.',
  },
  // ── E ──────────────────────────────────────────────────────────────────
  {
    id: 'ecda',
    term: 'ECDA (Early Childhood Development Agency)',
    category: 'Government body',
    definition:
      'The Singapore government agency overseeing the development, licensing, and regulation of early childhood education and care centres. ECDA administers childcare subsidies, sets fee caps for Anchor Operator and Partner Operator centres, and maintains the list of CDA-approved institutions.',
  },
  {
    id: 'ecl',
    term: 'Extended Childcare Leave (ECL)',
    category: 'Leave type',
    definition:
      'Provides 2 days of paid leave per year, per parent, for parents with a Singapore Citizen or PR child aged 7 to 12. ECL is fully government-paid, capped at $500/day. It cannot be carried forward or encashed. ECL bridges the gap after GPCL ends when your youngest qualifying child turns 7.',
    link: '/extended-childcare-leave',
  },
  {
    id: 'employment-act',
    term: 'Employment Act',
    category: 'Legislation',
    definition:
      'Singapore\'s main labour law governing minimum employment terms for most employees, including annual leave, sick leave, and 12 weeks of maternity leave for non-SC babies. Employees with a non-SC baby are covered under the Employment Act rather than the Government-Paid Maternity Leave scheme.',
  },
  // ── G ──────────────────────────────────────────────────────────────────
  {
    id: 'gpcl',
    term: 'GPCL — Government-Paid Childcare Leave',
    category: 'Leave type',
    definition: 'See Childcare Leave. The full name for the 6-days-per-year childcare leave entitlement for parents of SC/PR children under 7.',
    link: '/childcare-leave',
  },
  {
    id: 'gpml',
    term: 'GPML — Government-Paid Maternity Leave',
    category: 'Leave type',
    definition:
      'The government-funded portion of maternity leave for eligible mothers of Singapore Citizen children. For the 1st and 2nd child: the last 8 of 16 total weeks are government-reimbursed (first 8 weeks employer-paid). For the 3rd child onwards: all 16 weeks are government-reimbursed. The government reimburses the employer up to $10,000 per 4-week period.',
    link: '/maternity-leave',
  },
  {
    id: 'gppl',
    term: 'GPPL — Government-Paid Paternity Leave',
    category: 'Leave type',
    definition:
      'Paid paternity leave for fathers of Singapore Citizen children. From 1 April 2025, fathers receive 4 weeks (28 days) of GPPL for an SC baby. Fathers of non-SC babies receive 2 weeks. The government reimburses the employer at $2,500/week, up to $10,000 for 4 weeks. Leave must be taken within 12 months of the child\'s birth and can be split into blocks by mutual agreement with the employer.',
    link: '/paternity-leave',
  },
  {
    id: 'gross-rate-of-pay',
    term: 'Gross Rate of Pay',
    category: 'Pay',
    definition:
      'Your total monthly remuneration including basic salary and fixed allowances (e.g. housing, transport allowances), but excluding overtime pay, variable bonuses, and reimbursements. Childcare leave for the first 3 employer-paid days is paid at the gross rate of pay.',
  },
  // ── L ──────────────────────────────────────────────────────────────────
  {
    id: 'large-families-scheme',
    term: 'Large Families Scheme',
    category: 'Government benefit',
    definition:
      'An enhancement to the Baby Bonus for families with 3 or more children. For the 3rd child born on/after 18 February 2025, the CDA First Step Grant is doubled from $5,000 to $10,000, and the maternity leave for the 3rd child onwards has all 16 weeks government-reimbursed (instead of 8).',
  },
  {
    id: 'lifesg',
    term: 'LifeSG App',
    category: 'Government tool',
    definition:
      'The Singapore government\'s all-in-one app for citizen services. Use it to apply for Baby Bonus, track payouts, apply for childcare subsidies, and access over 100 government services. Available on iOS and Android.',
  },
  // ── M ──────────────────────────────────────────────────────────────────
  {
    id: 'maternity-leave',
    term: 'Maternity Leave',
    category: 'Leave type',
    definition:
      'Paid leave for eligible working mothers following childbirth. For an SC baby: 16 weeks total (8 employer-paid + 8 GPML), capped at $10,000 per 4-week period. For a non-SC baby: 12 weeks under the Employment Act (employer-paid, no government reimbursement). Requires 90 days of continuous service before the expected delivery date.',
    link: '/maternity-leave',
  },
  {
    id: 'medisave',
    term: 'MediSave',
    category: 'Key term',
    definition:
      'The healthcare savings component of CPF. Self-employed persons must have contributed MediSave for at least 3 continuous months before the delivery date to be eligible for government-paid maternity and paternity leave.',
  },
  {
    id: 'mom',
    term: 'MOM — Ministry of Manpower',
    category: 'Government body',
    definition:
      'The Singapore ministry responsible for employment policy, including all workplace leave legislation. MOM sets the rules for maternity, paternity, childcare, and shared parental leave, enforces the Employment Act, and operates the government reimbursement scheme for employers. Official source: mom.gov.sg',
  },
  {
    id: 'msf',
    term: 'MSF — Ministry of Social and Family Development',
    category: 'Government body',
    definition:
      'The Singapore ministry overseeing family and social policy, including the Baby Bonus Scheme, childcare subsidies, and the Made for Families initiative. MSF operates the ProFamilyLeave portal. Official source: madeforfamilies.gov.sg',
  },
  // ── O ──────────────────────────────────────────────────────────────────
  {
    id: 'ordinary-rate-of-pay',
    term: 'Ordinary Rate of Pay',
    category: 'Pay',
    definition:
      'Your basic monthly salary divided by 26 (for daily rate calculations under the Employment Act). Does not include allowances, overtime, or bonuses. Used when calculating pay for certain types of statutory leave under the Employment Act.',
  },
  // ── P ──────────────────────────────────────────────────────────────────
  {
    id: 'partner-operator',
    term: 'Partner Operator (POP)',
    category: 'Childcare subsidy',
    definition:
      'A preschool or infant care centre that partners with ECDA and agrees to a fee cap of $650/month (from January 2026) before subsidies. POP centres are slightly more expensive than Anchor Operator centres but still more affordable than private centres.',
  },
  {
    id: 'paternity-leave',
    term: 'Paternity Leave',
    category: 'Leave type',
    definition:
      'See GPPL. The 4-week (SC baby) or 2-week (non-SC baby) government-paid leave for fathers. From 1 April 2025, all SC-baby paternity leave is fully government-reimbursed at $2,500/week.',
    link: '/paternity-leave',
  },
  {
    id: 'pay-cap',
    term: 'Pay Cap',
    category: 'Pay',
    definition:
      'The ceiling on government reimbursement for leave pay. For maternity, paternity, SPL, and adoption leave: $10,000 per 28-day period ($357.14/day). For childcare leave (GPCL) and extended childcare leave (ECL): $500 per day. Employers pay the full salary; the government reimburses up to the cap. Employers absorb any excess for high-earning employees.',
  },
  {
    id: 'pr',
    term: 'Permanent Resident (PR)',
    category: 'Citizenship',
    definition:
      'A non-citizen who holds Singapore Permanent Residency. A PR child qualifies for GPCL (6 days/year childcare leave) and ECL (2 days/year), but not for GPML, GPPL, SPL, or UICL, which require the child to be a Singapore Citizen.',
  },
  {
    id: 'pro-rated-leave',
    term: 'Pro-rated Leave',
    category: 'Key term',
    definition:
      'When an employee has worked for less than 12 months in a calendar year, their annual and childcare leave entitlement is reduced proportionally based on the number of completed months worked. For example, if you worked 6 of 12 months in a year, you receive 50% of the annual entitlement.',
  },
  // ── S ──────────────────────────────────────────────────────────────────
  {
    id: 'sc',
    term: 'Singapore Citizen (SC)',
    category: 'Citizenship',
    definition:
      'A person who holds Singapore citizenship. Most government-funded parental leave schemes — GPML, GPPL, SPL, UICL, and adoption leave — require the child to be a Singapore Citizen. PR children qualify for GPCL and ECL but not the others.',
  },
  {
    id: 'self-employed',
    term: 'Self-Employed Eligibility',
    category: 'Key term',
    definition:
      'Self-employed mothers and fathers are eligible for GPML and GPPL respectively, provided they have been self-employed for at least 3 continuous months before the delivery date and have made MediSave contributions during that period. They must also demonstrate actual income loss during the leave period.',
  },
  {
    id: 'spl',
    term: 'SPL — Shared Parental Leave',
    category: 'Leave type',
    definition:
      'A separate pool of government-paid leave shared between both parents, on top of their individual GPML/GPPL. SPL requires the child to be a Singapore Citizen. Phase 1 (babies born 1 Apr 2025 – 31 Mar 2026): 6 weeks total, default 3 weeks each. Phase 2 (babies born from 1 Apr 2026): 10 weeks total, default 5 weeks each. Parents can reallocate the full pool between themselves by mutual agreement. Pay cap: $2,500/week.',
    link: '/shared-parental-leave',
  },
  // ── U ──────────────────────────────────────────────────────────────────
  {
    id: 'uicl',
    term: 'UICL — Unpaid Infant Care Leave',
    category: 'Leave type',
    definition:
      'Unpaid leave of 12 days per year for each parent with a Singapore Citizen child below 2 years old. Doubled from 6 to 12 days on 1 January 2024. There is a lifetime cap of 24 days per parent per child. UICL is taken in addition to — not instead of — the 6 days of GPCL. Requires 3 months of continuous service.',
    link: '/unpaid-infant-care-leave',
  },
]

const alphabet = ['A', 'B', 'C', 'D', 'E', 'G', 'L', 'M', 'O', 'P', 'S', 'U']

export default function GlossaryPage() {
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Glossary', url: 'https://leavecalculator.sg/glossary' },
  ])

  return (
    <>
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Glossary' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="January 2026" />
            <GovernmentBadge />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Singapore Parental Leave Glossary 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">
            Plain-English definitions of every term you&apos;ll encounter when navigating Singapore&apos;s parental leave system — from GPML and GPPL to SPL, CDA, and pay caps. All definitions are based on current MOM and MSF guidelines.
          </p>
        </div>

        {/* Alphabet jump links */}
        <div className="card-surface mb-8">
          <p className="text-xs text-on-surface-variant mb-3 font-semibold uppercase tracking-wide">Jump to</p>
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-primary bg-primary/5 hover:bg-primary/15 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        {/* Terms grouped by first letter */}
        {alphabet.map((letter) => {
          const group = terms.filter((t) => t.term.toUpperCase().startsWith(letter))
          if (group.length === 0) return null
          return (
            <div key={letter} id={letter} className="mb-10 scroll-mt-20">
              <h2 className="font-headline font-bold text-xl text-primary border-b border-primary/20 pb-2 mb-4">
                {letter}
              </h2>
              <div className="space-y-4">
                {group.map((item) => (
                  <div key={item.id} id={item.id} className="card-surface scroll-mt-20">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-headline font-bold text-base text-on-surface">
                        {item.term}
                      </h3>
                      <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {item.definition}
                    </p>
                    {item.link && (
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                      >
                        <span className="material-symbols-outlined text-[13px]" aria-hidden="true">arrow_forward</span>
                        Learn more
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Disclaimer */}
        <div className="card-surface bg-amber-50 border-amber-200 mt-8">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Disclaimer:</strong> These definitions are provided for general information only and are based on MOM and MSF guidelines current as of January 2026. Eligibility and entitlements may vary depending on individual circumstances. Always verify with your employer and the{' '}
            <a href="https://www.mom.gov.sg" target="_blank" rel="noopener noreferrer" className="underline">
              Ministry of Manpower
            </a>
            .
          </p>
        </div>

        {/* CTA links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { href: '/maternity-leave/calculator', label: 'Maternity Leave Calculator' },
            { href: '/paternity-leave/calculator', label: 'Paternity Leave Calculator' },
            { href: '/guides', label: 'All Leave Guides' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-surface hover:border-primary/30 transition-colors group text-center"
            >
              <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">
                {link.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
