import { type Metadata } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leavecalculator.sg'
const SITE_NAME = 'leavecalculator.sg'
const CURRENT_YEAR = 2026

// ── Common images ─────────────────────────────────────────────────────────────

function ogImageUrl(type: string, title?: string): string {
  const params = new URLSearchParams({ type })
  if (title) params.set('title', title)
  return `${BASE_URL}/api/og?${params.toString()}`
}

// ── Base metadata ─────────────────────────────────────────────────────────────

export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@parentalleavecalc',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

// ── Calculator page metadata ──────────────────────────────────────────────────

export function generateCalculatorMetadata({
  leaveType,
  path,
  description,
  year = CURRENT_YEAR,
}: {
  leaveType: string
  path: string
  description?: string
  year?: number
}): Metadata {
  const title = `${leaveType} Calculator Singapore ${year} | Free Online Tool`
  const desc =
    description ??
    `Calculate your ${leaveType.toLowerCase()} entitlement and estimated pay in Singapore. Updated for ${year} MOM guidelines. Covers employees, self-employed and contract workers. Free, instant results.`
  const url = `${BASE_URL}${path}`

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImageUrl(leaveType, title), width: 1200, height: 630 }],
      type: 'website',
      locale: 'en_SG',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [ogImageUrl(leaveType, title)],
    },
  }
}

// ── Hub page metadata ─────────────────────────────────────────────────────────

export function generateHubMetadata({
  leaveType,
  path,
  description,
  year = CURRENT_YEAR,
}: {
  leaveType: string
  path: string
  description?: string
  year?: number
}): Metadata {
  const title = `${leaveType} Singapore ${year} — Complete Guide`
  const desc =
    description ??
    `Everything you need to know about ${leaveType.toLowerCase()} in Singapore. Entitlement, pay, eligibility, and how to apply. Updated ${year}.`
  const url = `${BASE_URL}${path}`

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImageUrl(leaveType, title), width: 1200, height: 630 }],
      type: 'article',
      locale: 'en_SG',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
    },
  }
}

// ── FAQ page metadata ─────────────────────────────────────────────────────────

export function generateFAQMetadata({
  leaveType,
  path,
  year = CURRENT_YEAR,
}: {
  leaveType: string
  path: string
  year?: number
}): Metadata {
  const title = `${leaveType} FAQs Singapore ${year} — Common Questions Answered`
  const desc = `Answers to the most common questions about ${leaveType.toLowerCase()} in Singapore. Updated for ${year} MOM guidelines.`
  const url = `${BASE_URL}${path}`

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_SG',
    },
  }
}

// ── Guide page metadata ───────────────────────────────────────────────────────

export function generateGuideMetadata({
  title: rawTitle,
  path,
  description,
  year = CURRENT_YEAR,
}: {
  title: string
  path: string
  description: string
  year?: number
}): Metadata {
  const title = rawTitle.includes(year.toString())
    ? rawTitle
    : `${rawTitle} ${year}`
  const url = `${BASE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_SG',
    },
  }
}

// ── Homepage metadata ─────────────────────────────────────────────────────────

export const homepageMetadata: Metadata = {
  title: `Leave Calculator Singapore ${CURRENT_YEAR} — Maternity, Paternity & Childcare`,
  description: `Calculate maternity, paternity, childcare, and shared parental leave entitlements in Singapore. Free, instant results based on ${CURRENT_YEAR} MOM guidelines.`,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: `Leave Calculator Singapore ${CURRENT_YEAR}`,
    description: `Calculate maternity, paternity, childcare, and shared parental leave entitlements. Free and updated for ${CURRENT_YEAR}.`,
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [{ url: ogImageUrl('home'), width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_SG',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Leave Calculator Singapore ${CURRENT_YEAR}`,
    description: `Calculate maternity, paternity, childcare & shared parental leave in Singapore. Free, instant, updated for ${CURRENT_YEAR}.`,
  },
}
