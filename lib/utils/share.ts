/**
 * Share code generation and URL building utilities.
 * Share codes are short, memorable identifiers for saved calculator results.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leavecalculator.sg'

// ── Share code ────────────────────────────────────────────────────────────────

const LEAVE_TYPE_PREFIXES: Record<string, string> = {
  maternity: 'ml',
  paternity: 'pl',
  childcare: 'cl',
  spl: 'sp',
  'baby-bonus': 'bb',
  'childcare-subsidy': 'cs',
  pay: 'py',
}

/**
 * Generate a short, URL-safe share code.
 * Format: "{prefix}{YY}-{6-char random}"
 * Example: "ml26-X7K9P2"
 */
export function generateShareCode(leaveType: string): string {
  const prefix = LEAVE_TYPE_PREFIXES[leaveType] ?? leaveType.slice(0, 2).toLowerCase()
  const year = new Date().getFullYear().toString().slice(-2)
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}${year}-${random}`
}

/** Build the full shareable URL for a result */
export function buildShareUrl(shareCode: string): string {
  return `${BASE_URL}/result/${shareCode}`
}

// ── Social sharing ────────────────────────────────────────────────────────────

const LEAVE_TYPE_LABELS: Record<string, string> = {
  maternity: 'maternity leave',
  paternity: 'paternity leave',
  childcare: 'childcare leave',
  spl: 'Shared Parental Leave',
  'baby-bonus': 'Baby Bonus',
  'childcare-subsidy': 'childcare subsidy',
  pay: 'leave pay',
}

/** Build a pre-filled WhatsApp share link */
export function buildWhatsAppUrl(leaveType: string, shareUrl: string): string {
  const label = LEAVE_TYPE_LABELS[leaveType] ?? leaveType
  const message = `Here's my ${label} summary for Singapore:\n${shareUrl}\n\nCalculated with leavecalculator.sg`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

/** Build a Telegram share link */
export function buildTelegramUrl(shareUrl: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out my Singapore parental leave calculation')}`
}

/** Build a native Web Share API payload */
export function buildWebShareData(
  leaveType: string,
  shareUrl: string
): ShareData {
  const label = LEAVE_TYPE_LABELS[leaveType] ?? leaveType
  return {
    title: `My ${label} entitlement — Singapore`,
    text: `My ${label} entitlement has been calculated. Check it out!`,
    url: shareUrl,
  }
}

// ── Clipboard ─────────────────────────────────────────────────────────────────

/** Copy text to clipboard; returns true on success */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}

// ── LocalStorage persistence ───────────────────────────────────────────────────

const STORAGE_KEY_PREFIX = 'plc_last_'

/** Save a calculation to localStorage for "last result" persistence */
export function saveCalculationToStorage(
  leaveType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
): void {
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${leaveType}`,
      JSON.stringify({ ...data, savedAt: new Date().toISOString() })
    )
  } catch {
    // localStorage may be unavailable in SSR or private mode
  }
}

/** Retrieve a previously saved calculation from localStorage */
export function loadCalculationFromStorage(
  leaveType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${leaveType}`)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
