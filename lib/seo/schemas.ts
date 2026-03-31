/**
 * JSON-LD structured data schema generators.
 * All schemas follow schema.org vocabulary and Google's guidelines.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leavecalculator.sg'
const SITE_NAME = 'Leave Calculator Singapore'
const ORG_NAME = 'leavecalculator.sg'

// ── WebSite ───────────────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Singapore's comprehensive paternity leave calculator suite. Calculate maternity, paternity, childcare, and shared parental leave entitlements.",
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ── Organization ──────────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: BASE_URL,
    description:
      "Singapore's most complete paternity leave calculator suite — maternity, paternity, childcare, SPL, and baby bonus.",
    sameAs: [],
  }
}

// ── WebApplication ────────────────────────────────────────────────────────────

export function webApplicationSchema({
  name,
  url,
  description,
}: {
  name: string
  url: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'SGD',
    },
    provider: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    featureList: [
      'Instant calculations',
      'Based on 2026 MOM guidelines',
      'No registration required',
      'Shareable results',
    ],
  }
}

// ── FAQPage ───────────────────────────────────────────────────────────────────

export function faqPageSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ── Article / Guide ───────────────────────────────────────────────────────────

export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: {
  headline: string
  description: string
  url: string
  datePublished: string    // ISO date string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
  }
}

// ── HowTo ─────────────────────────────────────────────────────────────────────

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}
