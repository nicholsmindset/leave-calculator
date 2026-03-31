'use client'

import { useState, useRef, useEffect } from 'react'

interface InfoTooltipProps {
  content: string
  className?: string
}

export default function InfoTooltip({ content, className = '' }: InfoTooltipProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!visible) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setVisible(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [visible])

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        aria-label="More information"
        aria-expanded={visible}
        onClick={() => setVisible(!visible)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="text-on-surface-variant/60 hover:text-primary transition-colors focus:outline-none focus:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          info
        </span>
      </button>

      {visible && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-on-surface text-surface text-xs rounded-xl px-3 py-2 shadow-float leading-relaxed"
        >
          {content}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-on-surface" />
        </div>
      )}
    </div>
  )
}
