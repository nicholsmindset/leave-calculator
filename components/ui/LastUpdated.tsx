interface LastUpdatedProps {
  date?: string
  className?: string
}

export default function LastUpdated({
  date = 'April 2025',
  className = '',
}: LastUpdatedProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs text-on-surface-variant ${className}`}
    >
      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
        update
      </span>
      Updated {date}
    </span>
  )
}
