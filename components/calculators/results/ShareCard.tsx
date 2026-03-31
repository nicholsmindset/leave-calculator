'use client'

import { useState } from 'react'
import { buildShareUrl, buildWhatsAppUrl, copyToClipboard } from '@/lib/utils/share'

interface ShareCardProps {
  leaveType: string
  shareCode?: string
  className?: string
}

export default function ShareCard({ leaveType, shareCode, className = '' }: ShareCardProps) {
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [localShareCode, setLocalShareCode] = useState(shareCode)

  const shareUrl = localShareCode ? buildShareUrl(localShareCode) : null

  async function handleSave() {
    if (saving || localShareCode) return
    setSaving(true)
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaveType }),
      })
      const data = await res.json()
      if (data.shareCode) setLocalShareCode(data.shareCode)
    } catch {
      // fail silently — share is non-critical
    } finally {
      setSaving(false)
    }
  }

  async function handleCopy() {
    if (!shareUrl) return
    const ok = await copyToClipboard(shareUrl)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className={`card-surface space-y-4 ${className}`} role="region" aria-label="Share your results">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">share</span>
        </div>
        <div>
          <h3 className="font-headline font-semibold text-sm text-on-surface">Share your results</h3>
          <p className="text-xs text-on-surface-variant">Save a link or send to your partner</p>
        </div>
      </div>

      {/* Share URL display */}
      {shareUrl && (
        <div className="bg-surface-container rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-xs text-on-surface-variant truncate flex-1 font-mono">{shareUrl}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        {!localShareCode ? (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="col-span-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark disabled:opacity-60 transition-colors"
          >
            {saving ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin" aria-hidden="true">progress_activity</span>
                Saving…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">link</span>
                Get shareable link
              </>
            )}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied!' : 'Copy link'}
            </button>

            <a
              href={buildWhatsAppUrl(leaveType, shareUrl!)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              aria-label="Share on WhatsApp"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">chat</span>
              WhatsApp
            </a>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handlePrint}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-medium hover:border-primary hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">print</span>
        Save as PDF
      </button>
    </div>
  )
}
