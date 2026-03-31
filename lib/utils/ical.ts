/**
 * iCal (.ics) file generation for leave planning.
 * Generates RFC 5545-compliant iCalendar data.
 */

import { PUBLIC_HOLIDAYS_2026 } from '@/lib/constants'

// ── Formatters ────────────────────────────────────────────────────────────────

/** Format a Date as iCal DATE-TIME in UTC (e.g. "20260401T000000Z") */
function formatICalDateTime(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/** Format a Date as iCal DATE only (e.g. "20260401") — for all-day events */
function formatICalDate(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '')
}

/** Generate a UUID-like string for VEVENT UIDs */
function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}@leavecalculator.sg`
}

// ── iCal building blocks ──────────────────────────────────────────────────────

interface VEvent {
  summary: string
  dtstart: Date
  dtend: Date
  description?: string
  allDay?: boolean
  url?: string
}

function buildVEvent(event: VEvent): string {
  const uid = generateUID()
  const now = formatICalDateTime(new Date())
  const start = event.allDay
    ? `DTSTART;VALUE=DATE:${formatICalDate(event.dtstart)}`
    : `DTSTART:${formatICalDateTime(event.dtstart)}`
  const end = event.allDay
    ? `DTEND;VALUE=DATE:${formatICalDate(event.dtend)}`
    : `DTEND:${formatICalDateTime(event.dtend)}`

  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    start,
    end,
    `SUMMARY:${event.summary}`,
  ]

  if (event.description) {
    // Fold long lines at 75 chars (RFC 5545)
    const desc = event.description.replace(/\n/g, '\\n')
    lines.push(`DESCRIPTION:${desc}`)
  }

  if (event.url) {
    lines.push(`URL:${event.url}`)
  }

  lines.push('END:VEVENT')
  return lines.join('\r\n')
}

// ── Main generators ───────────────────────────────────────────────────────────

export interface LeaveICalOptions {
  leaveType: string          // e.g. "Maternity Leave"
  startDate: Date
  endDate: Date
  returnToWorkDate?: Date
  includePublicHolidays?: boolean
  shareUrl?: string
}

/** Generate an iCal file string for a leave period */
export function generateLeaveICal(options: LeaveICalOptions): string {
  const events: string[] = []

  // Main leave event
  const leaveEnd = new Date(options.endDate)
  leaveEnd.setDate(leaveEnd.getDate() + 1) // iCal DTEND is exclusive

  events.push(
    buildVEvent({
      summary: `${options.leaveType} — Singapore`,
      dtstart: options.startDate,
      dtend: leaveEnd,
      allDay: true,
      description:
        `Your ${options.leaveType} period (Singapore).` +
        (options.shareUrl
          ? `\\nCalculated at: ${options.shareUrl}`
          : '\\nCalculated at leavecalculator.sg'),
      url: options.shareUrl ?? 'https://leavecalculator.sg',
    })
  )

  // Return to work reminder
  if (options.returnToWorkDate) {
    const rtwEnd = new Date(options.returnToWorkDate)
    rtwEnd.setDate(rtwEnd.getDate() + 1)
    events.push(
      buildVEvent({
        summary: `Return to Work — End of ${options.leaveType}`,
        dtstart: options.returnToWorkDate,
        dtend: rtwEnd,
        allDay: true,
        description: `First day back at work after ${options.leaveType}.\\nPlan ahead with leavecalculator.sg/tools/leave-planner`,
      })
    )
  }

  // Singapore public holidays 2026
  if (options.includePublicHolidays) {
    for (const holiday of PUBLIC_HOLIDAYS_2026) {
      const holidayDate = new Date(holiday.date)
      if (
        holidayDate >= options.startDate &&
        holidayDate <= (options.returnToWorkDate ?? options.endDate)
      ) {
        const hEnd = new Date(holidayDate)
        hEnd.setDate(hEnd.getDate() + 1)
        events.push(
          buildVEvent({
            summary: `🇸🇬 ${holiday.name}`,
            dtstart: holidayDate,
            dtend: hEnd,
            allDay: true,
            description: `Singapore Public Holiday — ${holiday.name}`,
          })
        )
      }
    }
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//leavecalculator.sg//Singapore Parental Leave Calculator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Singapore Parental Leave',
    'X-WR-TIMEZONE:Asia/Singapore',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n')
}

// ── Download trigger (browser only) ──────────────────────────────────────────

/**
 * Trigger a download of an iCal file in the browser.
 * Call only from a 'use client' context.
 */
export function downloadICalFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.ics') ? filename : `${filename}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// ── Google Calendar deeplink ──────────────────────────────────────────────────

/** Build a Google Calendar event creation URL */
export function buildGoogleCalendarUrl(options: {
  title: string
  startDate: Date
  endDate: Date
  description?: string
}): string {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: options.title,
    dates: `${fmt(options.startDate)}/${fmt(options.endDate)}`,
    ...(options.description ? { details: options.description } : {}),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
