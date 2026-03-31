'use client'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
  label?: string
}

export default function AdUnit({
  slot,
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdUnitProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  // In development or before AdSense approval: show placeholder
  if (!adsenseClient || process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`bg-surface-container border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center text-on-surface-variant/50 text-xs py-6 print:hidden ${className}`}
        aria-hidden="true"
      >
        Ad [{slot}]
      </div>
    )
  }

  return (
    <div className={`print:hidden ${className}`} aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
