# CLAUDE.md — parentalleavecalculator.com

## Project Overview

**Domain:** parentalleavecalculator.com  
**Purpose:** Singapore's first dedicated interactive parental leave calculator suite — covering maternity, paternity, childcare, shared parental leave, baby bonus, and related tools.  
**Monetisation:** Google AdSense only (no subscriptions, no affiliate links)  
**Target audience:** Singapore employees, employers, HR managers, new/expecting parents  
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase + Vercel

---

## Critical Architecture Rules

### 1. SSR-First — Never Break Indexability

Every `page.tsx` MUST be a Server Component. Interactive calculator logic goes into separate `'use client'` components. This is non-negotiable — the entire SEO strategy depends on Google being able to crawl all pages.

```typescript
// ✅ CORRECT pattern — every calculator page follows this
// app/maternity-leave/calculator/page.tsx
import { Metadata } from 'next'
import MaternityCalculator from '@/components/calculators/MaternityCalculator'

export const metadata: Metadata = {
  title: 'Maternity Leave Calculator Singapore 2026 | Free Tool',
  description: 'Calculate your exact maternity leave entitlement and pay in Singapore. Updated for 2026. Covers employees, self-employed, and contract workers.',
  alternates: {
    canonical: 'https://parentalleavecalculator.com/maternity-leave/calculator'
  }
}

export default function MaternityCalculatorPage() {
  return (
    <main>
      {/* Static SEO content ABOVE the fold — crawlers read this */}
      <h1>Maternity Leave Calculator Singapore 2026</h1>
      <p>Calculate your maternity leave entitlement and estimated pay during leave. Covers Singapore Citizens, PRs, and all employment types. Updated for the latest 2026 MOM guidelines.</p>
      
      {/* Interactive client component BELOW static content */}
      <MaternityCalculator />
      
      {/* More static content below */}
    </main>
  )
}
```

```typescript
// ✅ CORRECT — client component in components/calculators/
// components/calculators/MaternityCalculator.tsx
'use client'
import { useState } from 'react'
// ... interactive calculator logic here
```

```typescript
// ❌ WRONG — never do this
'use client' // at the top of page.tsx — kills SSR and breaks indexing
export default function MaternityCalculatorPage() { ... }
```

### 2. Canonical Tags — Every Page Must Self-Reference

Every page needs an explicit canonical pointing to itself. Use `generateMetadata` for dynamic pages.

```typescript
// Static pages — use export const metadata
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://parentalleavecalculator.com/[exact-path]'
  }
}

// Dynamic programmatic pages — use generateMetadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://parentalleavecalculator.com/childcare-leave/${params.slug}`
    }
  }
}
```

### 3. Static Content Above Interactive Widgets

Every calculator page must have meaningful text content **before** the interactive component in the DOM. Minimum 50 words of static text visible without JS.

### 4. No Dynamic Imports with `ssr: false` at Page Level

Only use `dynamic(() => import(...), { ssr: false })` for specific sub-components that genuinely cannot run server-side (e.g., a chart that uses `window`). Never wrap entire pages.

---

## Design System

### Brand Colours

```css
/* Primary palette */
--color-primary: #0A6E4A;        /* Singapore green — trust, family */
--color-primary-light: #E8F5F0;  /* Light green backgrounds */
--color-primary-dark: #064D34;   /* Darker green for hover states */
--color-accent: #E8632A;         /* Warm orange — approachable CTAs */
--color-accent-light: #FEF0E8;   /* Light orange backgrounds */

/* Neutrals */
--color-bg: #FAFAF8;             /* Warm white background */
--color-surface: #FFFFFF;        /* Card/surface white */
--color-border: #E5E3DC;         /* Subtle warm border */
--color-text-primary: #1A1A18;   /* Near-black text */
--color-text-secondary: #6B6B65; /* Muted text */
--color-text-muted: #9B9B94;     /* Placeholder/caption text */

/* Semantic */
--color-government: #1B4F8A;     /* Blue for government source badges */
--color-success: #2E7D32;        /* Green for valid inputs */
--color-warning: #E65100;        /* Orange for important notes */
```

### Typography

```typescript
// Font: Plus Jakarta Sans (Google Fonts — import in layout.tsx)
// Weights used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

// Tailwind custom config additions:
fontFamily: {
  sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
}
```

### Component Standards

- **Cards:** `rounded-xl shadow-sm border border-[#E5E3DC] bg-white p-6`
- **Primary buttons:** `bg-[#0A6E4A] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#064D34] transition-colors`
- **Accent buttons:** `bg-[#E8632A] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#C4521E] transition-colors`
- **Input fields:** `border border-[#E5E3DC] rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#0A6E4A] focus:border-transparent`
- **Section containers:** `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`

### Result Display Cards

Calculator results always display in a styled card:
```typescript
// Standard result card pattern
<div className="bg-[#E8F5F0] border border-[#0A6E4A]/20 rounded-xl p-6 mt-6">
  <h2 className="text-lg font-semibold text-[#064D34]">Your Leave Entitlement</h2>
  {/* result content */}
</div>
```

---

## Project Structure

```
parentalleavecalculator.com/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, global nav, footer, AdSense script
│   ├── page.tsx                      # Homepage: hero + 8 calculator cards
│   ├── globals.css                   # Tailwind base + custom CSS variables
│   │
│   ├── maternity-leave/
│   │   ├── page.tsx                  # Maternity leave hub page
│   │   ├── calculator/page.tsx       # PRIMARY TOOL — maternity calculator
│   │   ├── eligibility/page.tsx
│   │   ├── pay-calculator/page.tsx
│   │   ├── 2025/page.tsx
│   │   ├── 2026/page.tsx
│   │   ├── self-employed/page.tsx
│   │   ├── first-child/page.tsx
│   │   ├── second-child/page.tsx
│   │   ├── third-child/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── paternity-leave/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx       # PRIMARY TOOL
│   │   ├── eligibility/page.tsx
│   │   ├── 2025/page.tsx
│   │   ├── 2026/page.tsx
│   │   ├── citizen/page.tsx
│   │   ├── pr/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── shared-parental-leave/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx       # PRIMARY TOOL — SPL planner with drag slider
│   │   ├── how-to-split/page.tsx
│   │   ├── 2026/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── childcare-leave/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx       # PRIMARY TOOL
│   │   ├── eligibility/page.tsx
│   │   ├── entitlement/page.tsx
│   │   ├── pro-rated/page.tsx
│   │   ├── [variant]/page.tsx        # Dynamic: 1-child, 2-children, 3-children, etc.
│   │   └── faq/page.tsx
│   │
│   ├── extended-childcare-leave/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── adoption-leave/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── unpaid-infant-care-leave/
│   │   ├── page.tsx
│   │   └── calculator/page.tsx
│   │
│   ├── baby-bonus/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx       # BONUS TOOL — high traffic
│   │   ├── payout-schedule/page.tsx
│   │   ├── cda-account/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── childcare-subsidy/
│   │   ├── page.tsx
│   │   ├── calculator/page.tsx
│   │   └── eligibility/page.tsx
│   │
│   ├── annual-leave/
│   │   ├── page.tsx
│   │   └── calculator/page.tsx
│   │
│   ├── tools/
│   │   ├── page.tsx                  # Tools hub
│   │   ├── leave-planner/page.tsx    # STICKINESS TOOL — calendar with iCal export
│   │   ├── pay-calculator/page.tsx   # Full pay calculator
│   │   ├── leave-checklist/page.tsx  # Interactive checklist
│   │   ├── return-to-work/page.tsx   # Return-to-work cost calculator
│   │   └── compare-leave/page.tsx    # Leave package comparison
│   │
│   ├── guides/
│   │   ├── page.tsx
│   │   ├── singapore-parental-leave-guide-2026/page.tsx
│   │   ├── maternity-leave-checklist/page.tsx
│   │   ├── paternity-leave-guide/page.tsx
│   │   ├── shared-parental-leave-explained/page.tsx
│   │   ├── baby-bonus-complete-guide/page.tsx
│   │   └── going-back-to-work/page.tsx
│   │
│   ├── compare/
│   │   ├── maternity-vs-childcare-leave/page.tsx
│   │   ├── paternity-vs-shared-parental-leave/page.tsx
│   │   └── singapore-vs-malaysia/page.tsx
│   │
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── contact/page.tsx
│   │
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   ├── robots.ts                     # Robots.txt
│   └── api/
│       ├── share/route.ts            # Save calculation to Supabase, return share_code
│       ├── calculation/[id]/route.ts # Retrieve saved calculation by share_code
│       └── og/route.tsx              # Dynamic Open Graph image generation
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Nav: Maternity / Paternity / Childcare / SPL / Tools / Guides
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   │
│   ├── calculators/                  # All 'use client' calculator components
│   │   ├── MaternityCalculator.tsx
│   │   ├── PaternityCalculator.tsx
│   │   ├── ChildcareLeaveCalculator.tsx
│   │   ├── SPLPlanner.tsx            # Drag-slider split visualiser
│   │   ├── PayCalculator.tsx
│   │   ├── BabyBonusCalculator.tsx
│   │   ├── ChildcareSubsidyCalculator.tsx
│   │   ├── ReturnToWorkCalculator.tsx
│   │   └── results/
│   │       ├── LeaveResult.tsx       # Standard result display card
│   │       ├── PayResult.tsx         # Pay breakdown display
│   │       └── ShareCard.tsx         # Shareable result card with copy/share buttons
│   │
│   ├── tools/
│   │   ├── LeavePlanner.tsx          # 'use client' — calendar with iCal export
│   │   └── LeaveChecklist.tsx        # 'use client' — interactive checklist
│   │
│   ├── seo/
│   │   ├── SchemaScript.tsx          # JSON-LD structured data renderer
│   │   └── BreadcrumbSchema.tsx
│   │
│   ├── ui/
│   │   ├── AdUnit.tsx                # Reusable AdSense ad unit component
│   │   ├── GovernmentBadge.tsx       # "Based on MOM 2026 guidelines" badge
│   │   ├── LastUpdated.tsx           # "Last updated: March 2026" indicator
│   │   └── InfoTooltip.tsx           # Hover tooltip for policy explanations
│   │
│   └── shared/
│       ├── CalculatorCard.tsx        # Card linking to each calculator on homepage/hub
│       ├── FAQSection.tsx            # Reusable FAQ accordion (with FAQ schema)
│       └── RelatedCalculators.tsx    # "You might also need" internal link section
│
├── lib/
│   ├── calculations/
│   │   ├── maternity.ts              # All maternity leave calculation logic
│   │   ├── paternity.ts              # Paternity leave calculation logic
│   │   ├── childcare.ts              # Childcare leave calculation logic
│   │   ├── spl.ts                    # Shared parental leave calculation logic
│   │   ├── pay.ts                    # Pay calculation formulas
│   │   ├── babyBonus.ts              # Baby bonus calculation logic
│   │   └── childcareSubsidy.ts       # Childcare subsidy calculation logic
│   │
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client
│   │   └── server.ts                 # Server Supabase client (for SSR)
│   │
│   ├── seo/
│   │   ├── metadata.ts               # generateMetadata helper
│   │   └── schemas.ts                # JSON-LD schema generators
│   │
│   ├── utils/
│   │   ├── share.ts                  # Share code generation utilities
│   │   ├── ical.ts                   # iCal (.ics) file generation
│   │   └── formatters.ts             # Currency, date, number formatters
│   │
│   └── constants.ts                  # Singapore leave policy data (2026)
│
├── public/
│   ├── ads.txt                       # Google AdSense verification
│   └── favicon.svg
│
├── supabase/
│   └── migrations/
│       └── 001_initial.sql
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── CLAUDE.md                         # This file
```

---

## Leave Policy Data — Singapore 2026

All calculations must use these values. Stored in `lib/constants.ts` and mirrored in Supabase `leave_policies` table.

```typescript
// lib/constants.ts

export const LEAVE_POLICIES_2026 = {
  
  maternity: {
    // Singapore Citizen (SC) baby
    sc: {
      totalWeeks: 16,
      employerPaidWeeks: 8,  // First 8 weeks — employer pays, government reimburses
      gpmlWeeks: 8,           // Last 8 weeks — government pays directly (GPML)
    },
    // PR or foreigner baby
    nonSc: {
      totalWeeks: 12,
      employerPaidWeeks: 8,
      gpmlWeeks: 4,
    },
    // Pay cap: $10,000 per 28 days
    dailyPayCap: 357.14,       // $10,000 / 28 days
    monthlyPayCap: 10000,
    // Employment eligibility
    minServiceDays: 90,        // Must have worked 90 days before delivery
    selfEmployedEligible: true,
    contractEligible: true,    // If ≥ 90 days with same employer before delivery
  },

  paternity: {
    // Singapore Citizen baby
    sc: {
      totalWeeks: 4,           // From 1 April 2025: increased from 2 to 4 weeks
      gpplWeeks: 4,            // Government pays all (GPPL)
      canSplit: true,          // Can take in blocks (e.g. 1+1+2 weeks)
      mustTakeWithin: 12,      // Months after birth to use leave
    },
    // Non-SC baby (PR or foreigner)
    nonSc: {
      totalWeeks: 2,
      gpplWeeks: 2,
      canSplit: true,
      mustTakeWithin: 12,
    },
    dailyPayCap: 357.14,
    minServiceDays: 90,
    selfEmployedEligible: true,
  },

  sharedParentalLeave: {
    // From 1 April 2025: up to 12 weeks transferable from mother to father
    maxTransferWeeks: 12,
    // Mother must retain minimum 8 compulsory weeks
    motherMinWeeks: 8,
    eligibility: {
      babyMustBe: 'SC',         // SPL only for SC baby
      bothParentsMustBeEligible: true,
    },
    dailyPayCap: 357.14,
  },

  childcareLeave: {
    // Government-Paid Childcare Leave (GPCL) — child under 7
    gpcl: {
      scPrChild: {
        daysPerYear: 6,         // Per parent
        paidDays: 6,            // All 6 days government-paid
      },
      nonScChild: {
        daysPerYear: 2,         // Per parent
        paidDays: 2,
      },
      childAgeLimit: 7,         // Child must be below 7 years old
    },
    // Extended Childcare Leave (ECL) — child 7-12
    ecl: {
      scPrChild: {
        daysPerYear: 2,         // Per parent
        paidDays: 2,
      },
      nonScChild: {
        daysPerYear: 0,         // Not eligible
      },
      childAgeLimit: 12,        // Child must be between 7 and 12
    },
    minServiceMonths: 3,        // Must have worked 3 months with employer
    proRated: true,             // Pro-rated if less than 12 months with employer
  },

  unpaidInfantCareLeave: {
    daysPerYear: 6,             // Per parent
    childAgeLimit: 2,           // Child must be below 2 years old
    paidDays: 0,                // Unpaid
    eligibility: 'scPrBaby',
  },

  adoptionLeave: {
    formalAdoption: {
      weeks: 12,
      gpmlWeeks: 4,
      employerPaidWeeks: 8,
    },
    childMustBe: 'under12months', // Child must be below 12 months at adoption
  },

  babyBonus: {
    // Cash Gift
    cashGift: {
      first: 11000,
      second: 11000,
      third: 13000,
      fourth: 13000,
      fifth: 13000,
    },
    // CDA First Step Grant
    cdaFirstStep: {
      first: 5000,
      second: 5000,
      third: 5000,
      fourth: 5000,
      fifth: 5000,
    },
    // Government CDA co-matching cap
    cdaCoMatchCap: {
      first: 3000,
      second: 9000,
      third: 15000,
      fourth: 15000,
      fifth: 15000,
    },
  },

} as const

// Pay calculation formula
export function calculateDailyRate(monthlySalary: number): number {
  const dailyRate = (monthlySalary * 12) / 365
  return Math.min(dailyRate, LEAVE_POLICIES_2026.maternity.dailyPayCap)
}

export function calculateLeavePayTotal(
  monthlySalary: number,
  leaveDays: number
): number {
  const dailyRate = calculateDailyRate(monthlySalary)
  return dailyRate * leaveDays
}
```

---

## Supabase Schema

Run in Supabase SQL editor (project region: `ap-southeast-1` — Singapore).

```sql
-- Shareable calculation results
CREATE TABLE leave_calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  share_code VARCHAR(12) UNIQUE NOT NULL,
  leave_type VARCHAR(50) NOT NULL,   -- 'maternity' | 'paternity' | 'childcare' | 'spl' | 'baby_bonus'
  inputs JSONB NOT NULL,             -- all calculator inputs
  results JSONB NOT NULL,            -- calculated outputs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '90 days'
);

CREATE UNIQUE INDEX idx_share_code ON leave_calculations(share_code);
CREATE INDEX idx_expires_at ON leave_calculations(expires_at);

-- Policy data (update when MOM changes rates — no redeploy needed)
CREATE TABLE leave_policies (
  id SERIAL PRIMARY KEY,
  leave_type VARCHAR(50) NOT NULL,
  effective_date DATE NOT NULL,
  policy_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Anonymous analytics (no PII stored)
CREATE TABLE calculation_events (
  id SERIAL PRIMARY KEY,
  leave_type VARCHAR(50),
  employment_type VARCHAR(50),
  child_order INT,
  citizenship VARCHAR(10),
  has_salary BOOLEAN,
  result_shared BOOLEAN DEFAULT FALSE,
  session_id VARCHAR(50),            -- random session ID, not tied to user
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email list for annual policy update notification
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  leave_types TEXT[],                -- which leave types they care about
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (enable on all tables)
ALTER TABLE leave_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public can read leave_calculations by share_code
CREATE POLICY "Public read by share_code" ON leave_calculations
  FOR SELECT USING (true);

-- Public can insert their own calculations
CREATE POLICY "Public insert" ON leave_calculations
  FOR INSERT WITH CHECK (true);

-- Public read on policies
CREATE POLICY "Public read policies" ON leave_policies
  FOR SELECT USING (true);

-- Public insert analytics events
CREATE POLICY "Public insert events" ON calculation_events
  FOR INSERT WITH CHECK (true);
```

---

## Share Code Generation

```typescript
// lib/utils/share.ts

// Generate a short memorable share code: 4 chars + 4 chars (e.g. "ml24-x7k9")
export function generateShareCode(leaveType: string): string {
  const prefix = leaveType.slice(0, 2).toLowerCase()
  const year = new Date().getFullYear().toString().slice(-2)
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}${year}-${random}`
}

// Build shareable URL
export function buildShareUrl(shareCode: string): string {
  return `https://parentalleavecalculator.com/result/${shareCode}`
}

// WhatsApp share message
export function buildWhatsAppMessage(leaveType: string, shareUrl: string): string {
  return encodeURIComponent(
    `Here's my ${leaveType} leave entitlement summary for Singapore:\n${shareUrl}\n\nCalculated with parentalleavecalculator.com`
  )
}
```

---

## iCal Export

```typescript
// lib/utils/ical.ts

export function generateICalFile(
  leaveType: string,
  startDate: Date,
  endDate: Date,
  returnToWorkDate: Date
): string {
  const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//parentalleavecalculator.com//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${leaveType} Leave — Singapore
DESCRIPTION:Your ${leaveType} leave period. Calculated at parentalleavecalculator.com
URL:https://parentalleavecalculator.com
END:VEVENT
BEGIN:VEVENT
DTSTART:${formatDate(returnToWorkDate)}
DTEND:${formatDate(returnToWorkDate)}
SUMMARY:Return to Work
DESCRIPTION:End of ${leaveType} leave — return to work date.
END:VEVENT
END:VCALENDAR`
}

// Trigger download in browser
export function downloadICalFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
```

---

## AdSense Implementation

### Ad Unit Component

```typescript
// components/ui/AdUnit.tsx
'use client'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
}

export default function AdUnit({ slot, format = 'auto', className }: AdUnitProps) {
  // In development, show placeholder
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm rounded ${className}`}
           style={{ minHeight: '90px' }}>
        Ad Unit [{slot}]
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
```

### Ad Placement Rules Per Page Type

**Calculator pages** — 3–4 ad units per page:
```
Position 1: After H1 / before calculator inputs     → horizontal banner (728×90 desktop, 320×50 mobile)
Position 2: Between inputs and results section      → rectangle (300×250)
Position 3: Below results / before FAQ              → rectangle (300×250) or large rectangle (336×280)
Position 4: Mobile sticky footer                    → anchor ad (enable in AdSense dashboard)
```

**Guide pages** — 3 ad units:
```
Position 1: After intro paragraph                   → in-article (300×250)
Position 2: Mid-content after 3rd paragraph         → in-article (300×250)
Position 3: After main content / before related     → rectangle (300×250)
```

**FAQ pages** — 2–3 units:
```
Position 1: After every 2–3 FAQ answers
Position 2: Sticky sidebar (desktop only)
```

### AdSense Script in layout.tsx

```typescript
// Add to app/layout.tsx <head> section
// Replace ca-pub-XXXXXXXXXX with your publisher ID after AdSense approval
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="lazyOnload"
/>
```

### ads.txt file

```
# public/ads.txt
google.com, ca-pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

---

## SEO Standards

### Metadata Templates

```typescript
// lib/seo/metadata.ts

const BASE_URL = 'https://parentalleavecalculator.com'
const CURRENT_YEAR = 2026

export function generateCalculatorMetadata(
  leaveType: string,
  path: string,
  customDescription?: string
): Metadata {
  const title = `${leaveType} Calculator Singapore ${CURRENT_YEAR} | Free Online Tool`
  const description = customDescription ?? 
    `Calculate your ${leaveType.toLowerCase()} entitlement and estimated pay in Singapore. Updated for ${CURRENT_YEAR} MOM guidelines. Free, instant results.`
  
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}${path}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'ParentalLeaveCalculator.com',
      images: [{ url: `${BASE_URL}/api/og?type=${encodeURIComponent(leaveType)}&year=${CURRENT_YEAR}` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
```

### JSON-LD Schemas

```typescript
// lib/seo/schemas.ts

export function webApplicationSchema(name: string, url: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD' },
    provider: {
      '@type': 'Organization',
      name: 'ParentalLeaveCalculator.com',
      url: 'https://parentalleavecalculator.com'
    }
  }
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Parental Leave Calculator Singapore',
    url: 'https://parentalleavecalculator.com',
    description: 'Singapore\'s comprehensive parental leave calculator suite. Calculate maternity, paternity, childcare, and shared parental leave entitlements.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://parentalleavecalculator.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

const BASE_URL = 'https://parentalleavecalculator.com'

// Childcare leave variants for programmatic pages
const CHILDCARE_VARIANTS = [
  '1-child', '2-children', '3-children',
  'child-under-7', 'child-7-to-12',
  'adopted-child', 'disabled-child', 'single-parent'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  
  const staticPages = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/maternity-leave/calculator`, priority: 0.95 },
    { url: `${BASE_URL}/paternity-leave/calculator`, priority: 0.95 },
    { url: `${BASE_URL}/shared-parental-leave/calculator`, priority: 0.95 },
    { url: `${BASE_URL}/childcare-leave/calculator`, priority: 0.95 },
    { url: `${BASE_URL}/baby-bonus/calculator`, priority: 0.90 },
    { url: `${BASE_URL}/tools/leave-planner`, priority: 0.90 },
    { url: `${BASE_URL}/tools/pay-calculator`, priority: 0.90 },
    // ... all static pages
  ].map(page => ({
    ...page,
    lastModified: now,
    changeFrequency: 'monthly' as const,
  }))

  const childcareVariants = CHILDCARE_VARIANTS.map(variant => ({
    url: `${BASE_URL}/childcare-leave/${variant}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...childcareVariants]
}
```

---

## Stickiness & Shareability Feature Checklist

Implement ALL of these features across the site:

### Per Calculator (every tool)
- [ ] **Unique shareable URL** — every result gets `parentalleavecalculator.com/result/[code]`
- [ ] **WhatsApp share button** — pre-filled message with result summary + URL
- [ ] **Copy link button** — one-click copy of the result URL
- [ ] **"Share with partner" CTA** — on SPL calculator, paternity, and maternity tools
- [ ] **Save as PDF** — `window.print()` with print-specific CSS that hides ads and nav
- [ ] **"Save to browser" button** — localStorage persistence of last calculation

### Leave Planner Tool
- [ ] **iCal export** — `.ics` file download of leave period + return-to-work date
- [ ] **"Add to Google Calendar" button** — deeplink to Google Calendar with pre-filled event
- [ ] **Public holiday integration** — Singapore 2026 public holidays highlighted automatically
- [ ] **"Best time to start" feature** — algorithm finds optimal start date around long weekends

### Site-Wide
- [ ] **"Last updated" indicator** — shows "Updated March 2026" on every page
- [ ] **"Government source" badge** — links to MOM/MSF for every policy claim
- [ ] **Year-in-title pattern** — all pages include current year in H1 and title tag
- [ ] **Email subscription** — "Get notified when Singapore parental leave changes" opt-in

---

## Internal Linking Rules

Every page must link to:
1. Its primary calculator (main CTA)
2. The parent leave type hub (`/maternity-leave/`, `/paternity-leave/`, etc.)
3. 2–3 related variant pages (e.g. from `/childcare-leave/1-child` → link to `2-children`, `3-children`)
4. The `/tools/leave-planner` from every calculator result page
5. At least 1 relevant guide page

### Anchor Text Rules
- Use exact-match or near-match keywords in anchor text
- Never use "click here" or "learn more" — always descriptive
- "maternity leave calculator" not "calculator"
- "childcare leave for 2 children" not "this page"

### Related Calculators Component

```typescript
// components/shared/RelatedCalculators.tsx
// Display at bottom of every calculator result page

const relatedLinks = {
  maternity: [
    { href: '/paternity-leave/calculator', label: 'Paternity Leave Calculator' },
    { href: '/shared-parental-leave/calculator', label: 'Shared Parental Leave Planner' },
    { href: '/tools/leave-planner', label: 'Leave Planner Calendar' },
  ],
  paternity: [
    { href: '/maternity-leave/calculator', label: 'Maternity Leave Calculator' },
    { href: '/shared-parental-leave/calculator', label: 'Shared Parental Leave Planner' },
    { href: '/childcare-leave/calculator', label: 'Childcare Leave Calculator' },
  ],
  // ... etc
}
```

---

## Content Guidelines

### Voice & Tone
- Address the reader as **"you"** — never "the employee" or "workers"
- Lead with the direct answer, then explain
- Use plain English — never legislative language
- Include concrete dollar examples: *"If your monthly salary is $5,000, you'll receive approximately $4,521/month during the government-paid portion"*
- Always link to MOM/MSF as the source for policy claims

### Standard Disclaimer (add to all calculator pages)
```
This calculator provides estimates based on MOM guidelines current as of [date]. 
Actual entitlements may vary. Always verify with your employer and the 
Ministry of Manpower at mom.gov.sg.
```

### Government Source Badge HTML
```typescript
// components/ui/GovernmentBadge.tsx
<a href="https://www.mom.gov.sg/employment-practices/leave" 
   target="_blank" rel="noopener noreferrer"
   className="inline-flex items-center gap-1.5 text-xs text-[#1B4F8A] bg-blue-50 
              border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-100">
  <span>🔗</span>
  Based on MOM 2026 guidelines
</a>
```

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
SUPABASE_SERVICE_ROLE_KEY=[service_role_key]
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX    # Add after AdSense approval
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX                  # Google Analytics 4
NEXT_PUBLIC_BASE_URL=https://parentalleavecalculator.com
```

---

## Build Order (Sequential — follow this exactly)

### Phase 1 — Foundation (Build first, everything depends on this)
1. Project scaffold: `npx create-next-app@latest` with TypeScript + Tailwind
2. `lib/constants.ts` — all Singapore 2026 leave policy data
3. `lib/calculations/` — all calculation logic (pure functions, no UI)
4. `lib/supabase/client.ts` + `lib/supabase/server.ts`
5. Supabase schema — run migration SQL
6. `app/layout.tsx` — fonts, global nav, footer, AdSense script placeholder
7. `components/layout/Header.tsx` + `Footer.tsx`
8. `app/globals.css` — Tailwind + CSS custom properties
9. `tailwind.config.ts` — custom colours and fonts
10. `app/page.tsx` — homepage with 8 calculator cards

### Phase 2 — Core Calculators (Build in this order)
11. `components/calculators/MaternityCalculator.tsx` + `app/maternity-leave/calculator/page.tsx`
12. `components/calculators/PaternityCalculator.tsx` + `app/paternity-leave/calculator/page.tsx`
13. `components/calculators/ChildcareLeaveCalculator.tsx` + `app/childcare-leave/calculator/page.tsx`
14. `components/calculators/SPLPlanner.tsx` + `app/shared-parental-leave/calculator/page.tsx`
15. `components/calculators/results/ShareCard.tsx` + `app/api/share/route.ts`

### Phase 3 — Pay & Planning Tools
16. `components/calculators/PayCalculator.tsx` + `app/tools/pay-calculator/page.tsx`
17. `components/tools/LeavePlanner.tsx` + `app/tools/leave-planner/page.tsx` (with iCal)
18. `lib/utils/ical.ts` — iCal generation utility
19. `lib/utils/share.ts` — share code utilities

### Phase 4 — Bonus Tools
20. `components/calculators/BabyBonusCalculator.tsx` + `app/baby-bonus/calculator/page.tsx`
21. `components/calculators/ChildcareSubsidyCalculator.tsx` + `app/childcare-subsidy/calculator/page.tsx`
22. `components/calculators/ReturnToWorkCalculator.tsx` + `app/tools/return-to-work/page.tsx`

### Phase 5 — Programmatic Pages
23. Leave hub pages (maternity, paternity, childcare, SPL, adoption, unpaid infant care)
24. `app/childcare-leave/[variant]/page.tsx` — dynamic variant pages
25. Year-specific pages (2025, 2026 variants for all leave types)
26. FAQ pages for each leave type
27. Comparison pages

### Phase 6 — SEO & Infrastructure
28. `app/sitemap.ts` — dynamic sitemap
29. `app/robots.ts`
30. `app/api/og/route.tsx` — dynamic OG images
31. `lib/seo/schemas.ts` — JSON-LD schemas
32. `components/seo/SchemaScript.tsx`
33. Guide pages (long-form content)
34. `about/`, `privacy/`, `terms/`, `contact/` pages (needed for AdSense)

### Phase 7 — AdSense & Launch
35. `public/ads.txt` — with publisher ID
36. Add AdSense script to `layout.tsx`
37. `components/ui/AdUnit.tsx` — replace placeholders with real units
38. Verify all canonicals with Screaming Frog
39. Submit sitemap to Google Search Console
40. Apply for AdSense (minimum: 100 sessions/day, privacy policy, about page live)

---

## Verification Commands

Run these before any deployment:

```bash
# Check all pages render HTML with content (not blank)
curl -s https://parentalleavecalculator.com/maternity-leave/calculator | grep -c "<h1"

# Verify canonical tags are present
curl -s https://parentalleavecalculator.com/maternity-leave/calculator | grep "canonical"

# Check sitemap generates
curl -s https://parentalleavecalculator.com/sitemap.xml | head -20

# Verify robots.txt
curl -s https://parentalleavecalculator.com/robots.txt
```

---

## Key SEO Targets (Track in Google Search Console)

| URL | Target Keyword | SG Volume | Current KD |
|---|---|---|---|
| /paternity-leave/calculator | paternity leave singapore | 4,000 | 0 |
| /maternity-leave/calculator | maternity leave singapore | 4,100 | 19 |
| /shared-parental-leave/calculator | shared parental leave singapore | 2,900 | 8 |
| /childcare-leave/calculator | childcare leave singapore | 1,800 | 12 |
| /maternity-leave/calculator | maternity leave calculator singapore | 150 | 9 |
| /baby-bonus/calculator | baby bonus singapore | 900 | 42 |
| /tools/leave-planner | leave calculator singapore | 40 | 3 |
| /childcare-leave/entitlement | childcare leave singapore entitlement | 60 | 4 |
| /childcare-subsidy/calculator | childcare subsidy singapore | 250 | 3 |
| /annual-leave/calculator | annual leave singapore | 450 | 3 |

---

## Important Policy Notes

1. **April 2025 update:** Paternity leave increased to 4 weeks (SC baby). Always show "Updated April 2025" on paternity pages.
2. **SPL expansion:** Shared Parental Leave now allows up to 12 weeks transfer from mother to father (from April 2025). This is a major change — make it prominent.
3. **Pay cap:** $10,000 per 28 days is the government-paid leave cap (both GPML and GPPL). This applies to shared weeks too.
4. **Self-employed:** Self-employed persons are eligible for GPML/GPPL provided they have been self-employed and made MediSave contributions for 3 continuous months before delivery.
5. **Contract workers:** Eligible if they have worked for the same employer for at least 90 days before the expected delivery date.

---

*CLAUDE.md last updated: March 2026*  
*Policy data source: Ministry of Manpower (mom.gov.sg) and MSF ProFamilyLeave portal*
