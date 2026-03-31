import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import SchemaScript from '@/components/seo/SchemaScript'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Singapore Parental Leave Guides 2026 | Complete Guides for Parents',
  description:
    'In-depth guides on Singapore maternity leave, paternity leave, shared parental leave, baby bonus, and going back to work. Updated for 2026 MOM guidelines.',
  alternates: {
    canonical: 'https://leavecalculator.sg/guides',
  },
}

const guides = [
  {
    href: '/guides/singapore-parental-leave-guide-2026',
    label: 'Singapore Parental Leave Guide 2026',
    desc: 'The complete overview of all parental leave types in Singapore — maternity, paternity, SPL, childcare leave, and more.',
    readTime: '8 min read',
  },
  {
    href: '/guides/maternity-leave-checklist',
    label: 'Maternity Leave Checklist',
    desc: 'A step-by-step checklist for everything you need to do before, during, and after maternity leave in Singapore.',
    readTime: '5 min read',
  },
  {
    href: '/guides/paternity-leave-guide-for-fathers',
    label: 'Paternity Leave Guide for Fathers',
    desc: 'How to apply for 4 weeks of government-paid paternity leave, split your leave into blocks, and plan the transition.',
    readTime: '6 min read',
  },
  {
    href: '/guides/shared-parental-leave-explained',
    label: 'Shared Parental Leave Explained',
    desc: 'How to transfer up to 12 weeks of maternity leave to your partner and optimise your family\'s total leave.',
    readTime: '7 min read',
  },
  {
    href: '/guides/baby-bonus-complete-guide',
    label: 'Baby Bonus Complete Guide',
    desc: 'Everything about the Baby Bonus scheme — cash gifts, CDA First Step, government co-matching, and payout schedules.',
    readTime: '6 min read',
  },
  {
    href: '/guides/going-back-to-work-after-maternity-leave',
    label: 'Going Back to Work After Maternity Leave',
    desc: 'Practical advice on returning to work, childcare options, and managing the transition back to the workplace.',
    readTime: '7 min read',
  },
]

export default function GuidesHubPage() {
  const crumbSchema = breadcrumbSchema([
    { name: 'Home', url: 'https://leavecalculator.sg' },
    { name: 'Guides', url: 'https://leavecalculator.sg/guides' },
  ])

  return (
    <>
      <SchemaScript schema={crumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Guides' }]} />

        <div className="mb-8">
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3">
            Singapore Parental Leave Guides 2026
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            In-depth guides to help Singapore parents understand and make the most of their leave entitlements. All guides are updated for the latest 2026 MOM and MSF guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="card-surface hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors mb-1">
                    {guide.label}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{guide.desc}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-primary/60 mt-3 font-medium">{guide.readTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
