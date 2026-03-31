import { MetadataRoute } from 'next'

const BASE_URL = 'https://leavecalculator.sg'

const CHILDCARE_VARIANTS = [
  '1-child',
  '2-children',
  '3-children',
  'child-under-7',
  'child-7-to-12',
  'adopted-child',
  'disabled-child',
  'single-parent',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: Array<{ url: string; priority: number; changeFrequency: 'monthly' | 'yearly' | 'weekly' }> = [
    // Homepage
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },

    // Primary calculator pages
    { url: `${BASE_URL}/maternity-leave/calculator`, priority: 0.95, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave/calculator`, priority: 0.95, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/shared-parental-leave/calculator`, priority: 0.95, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-leave/calculator`, priority: 0.95, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/baby-bonus/calculator`, priority: 0.90, changeFrequency: 'monthly' },

    // Hub pages
    { url: `${BASE_URL}/maternity-leave`, priority: 0.90, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave`, priority: 0.90, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/shared-parental-leave`, priority: 0.90, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-leave`, priority: 0.90, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/baby-bonus`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/extended-childcare-leave`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/adoption-leave`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/unpaid-infant-care-leave`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-subsidy`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/annual-leave`, priority: 0.75, changeFrequency: 'monthly' },

    // Additional calculator pages
    { url: `${BASE_URL}/childcare-subsidy/calculator`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/annual-leave/calculator`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/adoption-leave/calculator`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/unpaid-infant-care-leave/calculator`, priority: 0.80, changeFrequency: 'monthly' },

    // Tools
    { url: `${BASE_URL}/tools`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/tools/leave-planner`, priority: 0.90, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/tools/pay-calculator`, priority: 0.90, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/tools/leave-checklist`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/tools/return-to-work`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/tools/compare-leave`, priority: 0.75, changeFrequency: 'monthly' },

    // Eligibility pages
    { url: `${BASE_URL}/maternity-leave/eligibility`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave/eligibility`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-leave/eligibility`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/shared-parental-leave/how-to-split`, priority: 0.75, changeFrequency: 'monthly' },

    // Year-specific pages
    { url: `${BASE_URL}/maternity-leave/2025`, priority: 0.75, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/maternity-leave/2026`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave/2025`, priority: 0.75, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/paternity-leave/2026`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/shared-parental-leave/2026`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-leave/2025`, priority: 0.75, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/childcare-leave/2026`, priority: 0.80, changeFrequency: 'monthly' },

    // Scenario pages
    { url: `${BASE_URL}/maternity-leave/self-employed`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/maternity-leave/first-child`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/maternity-leave/second-child`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/maternity-leave/third-child`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave/citizen`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave/pr`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-leave/pro-rated`, priority: 0.75, changeFrequency: 'monthly' },

    // FAQ pages
    { url: `${BASE_URL}/maternity-leave/faq`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/paternity-leave/faq`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/shared-parental-leave/faq`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/childcare-leave/faq`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/baby-bonus/faq`, priority: 0.75, changeFrequency: 'monthly' },

    // Baby bonus sub-pages
    { url: `${BASE_URL}/baby-bonus/payout-schedule`, priority: 0.70, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/baby-bonus/cda-account`, priority: 0.70, changeFrequency: 'monthly' },

    // Guides
    { url: `${BASE_URL}/guides`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/guides/singapore-parental-leave-guide-2026`, priority: 0.80, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/guides/maternity-leave-checklist`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/guides/paternity-leave-guide-for-fathers`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/guides/shared-parental-leave-explained`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/guides/baby-bonus-complete-guide`, priority: 0.75, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/guides/going-back-to-work-after-maternity-leave`, priority: 0.75, changeFrequency: 'monthly' },

    // Compare pages
    { url: `${BASE_URL}/compare`, priority: 0.70, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/compare/maternity-vs-childcare-leave`, priority: 0.70, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/compare/paternity-vs-shared-parental-leave`, priority: 0.70, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/compare/singapore-vs-malaysia-parental-leave`, priority: 0.70, changeFrequency: 'monthly' },

    // Glossary
    { url: `${BASE_URL}/glossary`, priority: 0.75, changeFrequency: 'monthly' },

    // Legal / company
    { url: `${BASE_URL}/about`, priority: 0.60, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/privacy`, priority: 0.50, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/terms`, priority: 0.50, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/contact`, priority: 0.50, changeFrequency: 'yearly' },
  ]

  const childcareVariantPages = CHILDCARE_VARIANTS.map((variant) => ({
    url: `${BASE_URL}/childcare-leave/${variant}`,
    priority: 0.75 as const,
    changeFrequency: 'monthly' as const,
  }))

  return [...pages, ...childcareVariantPages].map((page) => ({
    url: page.url,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
