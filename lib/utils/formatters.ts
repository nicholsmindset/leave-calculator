/**
 * Formatting utilities for leavecalculator.sg
 * Currency: Singapore Dollars (SGD)
 * Locale: en-SG
 */

// ── Currency ──────────────────────────────────────────────────────────────────

/** Format a number as Singapore Dollars (e.g. $1,234.56) */
export function formatSGD(
  amount: number,
  options?: { decimals?: 0 | 2; showSign?: boolean }
): string {
  const decimals = options?.decimals ?? 2
  const sign = options?.showSign && amount > 0 ? '+' : ''
  return (
    sign +
    new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  )
}

/** Format as whole-dollar SGD (no cents) */
export function formatSGDWhole(amount: number): string {
  return formatSGD(amount, { decimals: 0 })
}

/** Format as compact SGD (e.g. $1.2k, $20k) for charts */
export function formatSGDCompact(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k`
  }
  return formatSGDWhole(amount)
}

// ── Numbers ───────────────────────────────────────────────────────────────────

/** Format integer with commas (e.g. 10000 → "10,000") */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-SG').format(n)
}

/** Format as percentage (e.g. 0.75 → "75%") */
export function formatPercent(ratio: number, decimals = 0): string {
  return `${(ratio * 100).toFixed(decimals)}%`
}

// ── Dates ─────────────────────────────────────────────────────────────────────

/** Format a Date as "1 April 2026" (long form) */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Format a Date as "1 Apr 2026" (short form) */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Format a Date as "Apr 2026" (month and year only) */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'short',
    year: 'numeric',
  })
}

/** Format a Date as "YYYY-MM-DD" (ISO date only) */
export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

/** Format a date range: "1 Apr 2026 – 30 Jul 2026" */
export function formatDateRange(start: Date, end: Date): string {
  return `${formatDateShort(start)} – ${formatDateShort(end)}`
}

// ── Leave durations ───────────────────────────────────────────────────────────

/** Format weeks + optional days: "16 weeks", "8 weeks 3 days" */
export function formatWeeksDays(totalDays: number): string {
  const weeks = Math.floor(totalDays / 7)
  const days = totalDays % 7
  const parts: string[] = []
  if (weeks > 0) parts.push(`${weeks} week${weeks !== 1 ? 's' : ''}`)
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`)
  return parts.join(' ') || '0 days'
}

/** Format as "X weeks (Y days)" */
export function formatWeeksAndDays(totalDays: number): string {
  const weeks = Math.floor(totalDays / 7)
  if (weeks === 0) return `${totalDays} day${totalDays !== 1 ? 's' : ''}`
  return `${weeks} week${weeks !== 1 ? 's' : ''} (${totalDays} days)`
}

// ── Pluralisation ─────────────────────────────────────────────────────────────

/** Simple pluralise: pluralise('child', 2) → 'children' */
export function pluralise(
  singular: string,
  count: number,
  plural?: string
): string {
  if (count === 1) return singular
  return plural ?? `${singular}s`
}

/** e.g. childWord(1) → "child", childWord(2) → "children" */
export function childWord(count: number): string {
  return count === 1 ? 'child' : 'children'
}

// ── Ordinals ──────────────────────────────────────────────────────────────────

/** 1 → "1st", 2 → "2nd", 3 → "3rd", 4 → "4th" */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

/** 1 → "first", 2 → "second", 3 → "third", 4+ → "4th" etc. */
export function ordinalWord(n: number): string {
  const words = ['', 'first', 'second', 'third', 'fourth', 'fifth']
  return words[n] ?? ordinal(n)
}
