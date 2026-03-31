'use client'

import { useState, useMemo } from 'react'

// Singapore public holidays 2025 & 2026
const SG_PUBLIC_HOLIDAYS: Record<string, string> = {
  '2025-01-01': "New Year's Day",
  '2025-01-29': 'Chinese New Year',
  '2025-01-30': 'Chinese New Year',
  '2025-03-31': 'Hari Raya Puasa',
  '2025-04-18': 'Good Friday',
  '2025-05-01': 'Labour Day',
  '2025-05-12': 'Vesak Day',
  '2025-06-07': 'Hari Raya Haji',
  '2025-08-09': 'National Day',
  '2025-10-20': 'Deepavali',
  '2025-12-25': 'Christmas Day',
  '2026-01-01': "New Year's Day",
  '2026-02-17': 'Chinese New Year',
  '2026-02-18': 'Chinese New Year',
  '2026-03-20': 'Hari Raya Puasa',
  '2026-04-03': 'Good Friday',
  '2026-05-01': 'Labour Day',
  '2026-05-31': 'Vesak Day',
  '2026-05-27': 'Hari Raya Haji',
  '2026-08-10': 'National Day',
  '2026-11-09': 'Deepavali',
  '2026-12-25': 'Christmas Day',
}

function toKey(d: Date) {
  return d.toISOString().split('T')[0]
}

function addDays(d: Date, n: number) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

function getMonthDays(year: number, month: number) {
  const days: (Date | null)[] = []
  const first = new Date(year, month, 1)
  const startDow = (first.getDay() + 6) % 7 // Mon=0
  for (let i = 0; i < startDow; i++) days.push(null)
  const last = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= last; d++) days.push(new Date(year, month, d))
  return days
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function LeavePlanner() {
  const today = new Date()
  const [leaveStartStr, setLeaveStartStr] = useState(toKey(today))
  const [leaveWeeks, setLeaveWeeks] = useState(16)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const leaveStart = useMemo(() => new Date(leaveStartStr + 'T00:00:00'), [leaveStartStr])
  const leaveEnd = useMemo(() => addDays(leaveStart, leaveWeeks * 7 - 1), [leaveStart, leaveWeeks])
  const returnDate = useMemo(() => {
    const d = addDays(leaveEnd, 1)
    // skip to Monday if falls on weekend
    const dow = d.getDay()
    if (dow === 6) return addDays(d, 2)
    if (dow === 0) return addDays(d, 1)
    return d
  }, [leaveEnd])

  const phInLeave = useMemo(() => {
    return Object.entries(SG_PUBLIC_HOLIDAYS)
      .filter(([k]) => {
        const d = new Date(k + 'T00:00:00')
        return d >= leaveStart && d <= leaveEnd
      })
      .sort(([a], [b]) => a.localeCompare(b))
  }, [leaveStart, leaveEnd])

  const calDays = useMemo(() => getMonthDays(viewYear, viewMonth), [viewYear, viewMonth])

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function downloadIcal() {
    const ical = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//leavecalculator.sg//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${toKey(leaveStart).replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${toKey(addDays(leaveEnd, 1)).replace(/-/g, '')}`,
      'SUMMARY:Parental Leave',
      'DESCRIPTION:Your parental leave period — leavecalculator.sg',
      'END:VEVENT',
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${toKey(returnDate).replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${toKey(addDays(returnDate, 1)).replace(/-/g, '')}`,
      'SUMMARY:Return to Work',
      'DESCRIPTION:End of parental leave — return to work date',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ical], { type: 'text/calendar;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'parental-leave.ics'
    a.click()
  }

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Parental+Leave&dates=${toKey(leaveStart).replace(/-/g, '')}/${toKey(addDays(leaveEnd, 1)).replace(/-/g, '')}&details=Parental+leave+planned+at+leavecalculator.sg`

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card-surface space-y-4">
        <h3 className="font-headline font-semibold text-sm text-on-surface">Plan your leave</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lp-start" className="label-stitch block mb-2">Leave start date</label>
            <input
              id="lp-start"
              type="date"
              value={leaveStartStr}
              onChange={e => setLeaveStartStr(e.target.value)}
              className="input-stitch"
            />
          </div>
          <div>
            <label htmlFor="lp-weeks" className="label-stitch block mb-2">Leave duration (weeks)</label>
            <select
              id="lp-weeks"
              value={leaveWeeks}
              onChange={e => setLeaveWeeks(Number(e.target.value))}
              className="input-stitch"
            >
              {[1,2,4,8,12,16,20,24,26].map(w => (
                <option key={w} value={w}>{w} week{w !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-outline-variant/20">
          <div>
            <p className="text-xs text-on-surface-variant mb-1">Leave starts</p>
            <p className="font-headline font-bold text-sm text-primary">{leaveStart.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant mb-1">Leave ends</p>
            <p className="font-headline font-bold text-sm text-primary">{leaveEnd.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant mb-1">Return to work</p>
            <p className="font-headline font-bold text-sm text-primary">{returnDate.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Export buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button onClick={downloadIcal} className="btn-panel-secondary inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">download</span>
            Download .ics
          </button>
          <a href={gcalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">event</span>
            Add to Google Calendar
          </a>
        </div>
      </div>

      {/* Calendar */}
      <div className="card-surface space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-semibold text-sm text-on-surface">
            {MONTHS[viewMonth]} {viewYear}
          </h3>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-primary/5 transition-colors" aria-label="Previous month">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant" aria-hidden="true">chevron_left</span>
            </button>
            <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-primary/5 transition-colors" aria-label="Next month">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/40 inline-block" />Leave</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 inline-block" />Public holiday</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-100 border border-green-400 inline-block" />Return to work</span>
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-center">
          {DOW.map(d => (
            <div key={d} className="text-xs font-semibold text-on-surface-variant py-1">{d}</div>
          ))}
          {calDays.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />
            const key = toKey(day)
            const inLeave = day >= leaveStart && day <= leaveEnd
            const isPH = !!SG_PUBLIC_HOLIDAYS[key]
            const isReturn = toKey(day) === toKey(returnDate)
            const isToday = toKey(day) === toKey(today)
            const isWeekend = day.getDay() === 0 || day.getDay() === 6

            let bg = ''
            if (isReturn) bg = 'bg-green-100 border border-green-400 text-green-800 font-bold'
            else if (isPH && inLeave) bg = 'bg-amber-100 border border-amber-300 text-amber-800'
            else if (isPH) bg = 'bg-amber-50 border border-amber-200 text-amber-700'
            else if (inLeave && isWeekend) bg = 'bg-primary/10 text-primary/60'
            else if (inLeave) bg = 'bg-primary/20 border border-primary/30 text-primary font-medium'
            else if (isWeekend) bg = 'text-on-surface-variant/40'
            else bg = 'text-on-surface-variant hover:bg-surface-container'

            return (
              <div
                key={key}
                className={`rounded-md py-1 text-xs transition-colors relative ${bg} ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                title={isPH ? SG_PUBLIC_HOLIDAYS[key] : isReturn ? 'Return to work' : undefined}
              >
                {day.getDate()}
                {isPH && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* Public holidays in leave */}
      {phInLeave.length > 0 && (
        <div className="card-surface space-y-2">
          <h3 className="font-headline font-semibold text-sm text-on-surface">
            {phInLeave.length} public holiday{phInLeave.length > 1 ? 's' : ''} fall during your leave
          </h3>
          <p className="text-xs text-on-surface-variant">These days are treated as public holidays during parental leave — your employer cannot substitute them for another day off.</p>
          <ul className="space-y-1 mt-2">
            {phInLeave.map(([k, name]) => (
              <li key={k} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px] text-amber-500" aria-hidden="true">event</span>
                <span className="font-medium text-on-surface">{new Date(k + 'T00:00:00').toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span>—</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
