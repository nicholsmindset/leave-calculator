'use client'

import { useState, useEffect } from 'react'

type ChecklistItem = { id: string; text: string; category: string }

const CHECKLIST: ChecklistItem[] = [
  // Before leave
  { id: 'b1', category: 'Before leave', text: 'Notify employer in writing of leave dates' },
  { id: 'b2', category: 'Before leave', text: 'Submit maternity / paternity leave application to HR' },
  { id: 'b3', category: 'Before leave', text: 'Confirm salary payment arrangements during leave' },
  { id: 'b4', category: 'Before leave', text: 'Prepare handover notes and brief your cover' },
  { id: 'b5', category: 'Before leave', text: 'Set up out-of-office auto-reply' },
  { id: 'b6', category: 'Before leave', text: 'Check employment contract for contractual top-ups above statutory pay' },
  { id: 'b7', category: 'Before leave', text: 'Confirm your return-to-work date with HR' },
  // After birth
  { id: 'a1', category: 'After birth', text: 'Register birth at ICA (within 42 days of birth)' },
  { id: 'a2', category: 'After birth', text: 'Apply for Baby Bonus on Moments of Life app' },
  { id: 'a3', category: 'After birth', text: 'Open CDA at DBS / OCBC / UOB to receive First Step grant' },
  { id: 'a4', category: 'After birth', text: 'Apply for child\'s NRIC or birth certificate' },
  { id: 'a5', category: 'After birth', text: 'Update CPF beneficiary nomination' },
  { id: 'a6', category: 'After birth', text: 'Apply for Medisave top-up for delivery costs (if applicable)' },
  // Childcare
  { id: 'c1', category: 'Childcare', text: 'Research and shortlist infant care / childcare centres' },
  { id: 'c2', category: 'Childcare', text: 'Submit childcare centre application (early — waiting lists can be 6–12 months)' },
  { id: 'c3', category: 'Childcare', text: 'Apply for childcare subsidy via LifeSG app or ECDA portal' },
  { id: 'c4', category: 'Childcare', text: 'Confirm childcare start date aligns with your return-to-work date' },
  // Return to work
  { id: 'r1', category: 'Return to work', text: 'Confirm return-to-work date with HR (at least 2 weeks before)' },
  { id: 'r2', category: 'Return to work', text: 'Request flexible work arrangements if needed' },
  { id: 'r3', category: 'Return to work', text: 'Check company\'s nursing room policy (if breastfeeding)' },
  { id: 'r4', category: 'Return to work', text: 'Claim childcare leave balance (6 days/year for children under 7)' },
  { id: 'r5', category: 'Return to work', text: 'Check remaining annual leave balance' },
]

const CATEGORIES = ['Before leave', 'After birth', 'Childcare', 'Return to work']
const STORAGE_KEY = 'plc-checklist-v1'

export default function LeaveChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setChecked(new Set(JSON.parse(saved)))
    } catch {}
    setLoaded(true)
  }, [])

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }

  function reset() {
    setChecked(new Set())
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const total = CHECKLIST.length
  const done = checked.size
  const pct = Math.round((done / total) * 100)

  if (!loaded) return null

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="card-surface">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-headline font-bold text-on-surface">{done} of {total} items completed</p>
            <p className="text-xs text-on-surface-variant mt-0.5">Progress is saved automatically in your browser</p>
          </div>
          <button
            onClick={reset}
            className="text-xs text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
          >
            Reset all
          </button>
        </div>
        <div className="w-full bg-surface-container rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-primary font-semibold mt-1.5">{pct}% complete</p>
      </div>

      {/* Categories */}
      {CATEGORIES.map((cat) => {
        const items = CHECKLIST.filter((i) => i.category === cat)
        const catDone = items.filter((i) => checked.has(i.id)).length
        return (
          <div key={cat} className="card-surface space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-semibold text-sm text-on-surface">{cat}</h3>
              <span className="text-xs text-on-surface-variant">{catDone}/{items.length}</span>
            </div>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex items-start gap-3 w-full text-left group"
                    aria-pressed={checked.has(item.id)}
                  >
                    <span
                      className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-colors ${
                        checked.has(item.id)
                          ? 'bg-primary border-primary'
                          : 'border-outline-variant group-hover:border-primary/50'
                      }`}
                    >
                      {checked.has(item.id) && (
                        <span className="material-symbols-outlined text-white text-[14px]" aria-hidden="true">check</span>
                      )}
                    </span>
                    <span className={`text-sm transition-colors ${checked.has(item.id) ? 'line-through text-on-surface-variant/50' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                      {item.text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
