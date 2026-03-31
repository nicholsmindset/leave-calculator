import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import FAQSection from '@/components/shared/FAQSection'
import RelatedCalculators from '@/components/shared/RelatedCalculators'
import GovernmentBadge from '@/components/ui/GovernmentBadge'
import LastUpdated from '@/components/ui/LastUpdated'
import SchemaScript from '@/components/seo/SchemaScript'
import { faqPageSchema, breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Baby Bonus Singapore 2026 — Cash Gift, CDA & Co-Matching Guide',
  description:
    'Complete Baby Bonus guide for Singapore 2026. Cash gift up to $13,000, CDA First Step Grant up to $10,000, government co-matching up to $18,000. Includes Large Families Scheme.',
  alternates: {
    canonical: 'https://leavecalculator.sg/baby-bonus',
  },
}

const faqs = [
  {
    question: 'What is the Baby Bonus Scheme?',
    answer:
      'The Baby Bonus Scheme is a government initiative providing financial support to encourage Singaporeans to have children. It has three components: a Cash Gift paid out over 18 months, a CDA First Step Grant automatically credited to your child\'s Child Development Account (CDA), and government dollar-for-dollar co-matching of your CDA savings.',
  },
  {
    question: 'How much is the Baby Bonus cash gift in 2026?',
    answer:
      'The cash gift is $11,000 for the 1st and 2nd child, and $13,000 for the 3rd and subsequent children. It is paid out in 5 instalments via PayNow over 18 months: at birth, 6 months, 12 months, 15 months, and 18 months.',
  },
  {
    question: 'What is the CDA First Step Grant?',
    answer:
      'The standard CDA First Step Grant is $5,000 for all children. Under the Large Families Scheme (for 3rd and subsequent children born on or after 18 February 2025), the CDA First Step Grant is increased to $10,000. It is automatically credited within 2 weeks of the CDA being opened.',
  },
  {
    question: 'How does government CDA co-matching work?',
    answer:
      'The government matches every dollar you deposit into your child\'s CDA up to a cap. The caps are: $6,000 for the 1st child, $6,000 for the 2nd child, $12,000 for the 3rd child, $12,000 for the 4th child, and $18,000 for the 5th and subsequent children. Co-matching applies over the child\'s entire CDA lifetime.',
  },
  {
    question: 'What can I use CDA funds for?',
    answer:
      'CDA funds can be used at approved institutions including childcare centres, kindergartens, early intervention programmes, special education schools, and approved pharmacies and hospitals. Unused CDA funds are transferred to your child\'s Edusave account at age 7.',
  },
]

const bonusTable = [
  { child: '1st', cashGift: '$11,000', cdaFirstStep: '$5,000', coMatchCap: '$6,000', total: 'Up to $22,000' },
  { child: '2nd', cashGift: '$11,000', cdaFirstStep: '$5,000', coMatchCap: '$6,000', total: 'Up to $22,000' },
  { child: '3rd', cashGift: '$13,000', cdaFirstStep: '$10,000*', coMatchCap: '$12,000', total: 'Up to $35,000' },
  { child: '4th', cashGift: '$13,000', cdaFirstStep: '$10,000*', coMatchCap: '$12,000', total: 'Up to $35,000' },
  { child: '5th+', cashGift: '$13,000', cdaFirstStep: '$10,000*', coMatchCap: '$18,000', total: 'Up to $41,000' },
]

export default function BabyBonusHubPage() {
  const schema = faqPageSchema(faqs)
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Baby Bonus', url: 'https://leavecalculator.sg/baby-bonus' },
  ])

  return (
    <>
      <SchemaScript schema={schema} />
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Baby Bonus' }]} />

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <LastUpdated date="April 2025" />
            <GovernmentBadge href="https://life.gov.sg/family-parenting/benefits-support/baby-bonus-scheme" label="Based on LifeSG 2026 rates" />
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Baby Bonus Singapore 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            The Singapore Baby Bonus Scheme provides Cash Gifts, CDA First Step Grants, and government co-matching for your Child Development Account. For a 5th child, the total can reach $41,000. Use our calculator to see your exact package.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/baby-bonus/calculator"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">calculate</span>
            Calculate My Baby Bonus
          </Link>
        </div>

        {/* Bonus table */}
        <div className="card-surface mb-8 overflow-x-auto">
          <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Baby Bonus 2026 — by child order</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="text-left py-2 pr-4 text-on-surface-variant font-medium">Child</th>
                <th className="text-right py-2 pr-4 text-on-surface-variant font-medium">Cash Gift</th>
                <th className="text-right py-2 pr-4 text-on-surface-variant font-medium">CDA First Step</th>
                <th className="text-right py-2 pr-4 text-on-surface-variant font-medium">Co-Match Cap</th>
                <th className="text-right py-2 text-on-surface-variant font-medium">Max Total</th>
              </tr>
            </thead>
            <tbody>
              {bonusTable.map((row) => (
                <tr key={row.child} className="border-b border-outline-variant/10 last:border-0">
                  <td className="py-3 pr-4 font-semibold text-on-surface">{row.child}</td>
                  <td className="py-3 pr-4 text-right text-on-surface">{row.cashGift}</td>
                  <td className="py-3 pr-4 text-right text-on-surface">{row.cdaFirstStep}</td>
                  <td className="py-3 pr-4 text-right text-on-surface">{row.coMatchCap}</td>
                  <td className="py-3 text-right font-semibold text-primary">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-on-surface-variant mt-3">* $10,000 CDA First Step for 3rd+ child born on or after 18 Feb 2025 (Large Families Scheme). Max total assumes full CDA co-matching reached.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { href: '/baby-bonus/calculator', label: 'Baby Bonus Calculator', desc: 'Calculate your exact cash gift, CDA grant, and co-match' },
            { href: '/baby-bonus/payout-schedule', label: 'Payout Schedule', desc: 'When and how the cash gift is paid out over 18 months' },
            { href: '/baby-bonus/cda-account', label: 'CDA Account Guide', desc: 'How to open and use a Child Development Account' },
            { href: '/baby-bonus/faq', label: 'Baby Bonus FAQ', desc: 'Common questions about the Baby Bonus Scheme' },
            { href: '/childcare-subsidy/calculator', label: 'Childcare Subsidy', desc: 'Calculate your childcare subsidy at MOE-registered centres' },
            { href: '/maternity-leave/calculator', label: 'Maternity Leave', desc: 'Calculate your 16-week maternity leave entitlement' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-surface hover:border-primary/30 transition-colors group"
            >
              <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors mb-1">
                {link.label}
              </p>
              <p className="text-xs text-on-surface-variant">{link.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <FAQSection faqs={faqs} />
        </div>

        <RelatedCalculators current="baby-bonus" className="mt-10" />
      </div>
    </>
  )
}
