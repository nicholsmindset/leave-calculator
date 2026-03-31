interface RadioCardProps {
  label: string
  description?: string
  checked: boolean
  onClick: () => void
  className?: string
}

export default function RadioCard({ label, description, checked, onClick, className = '' }: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={checked}
      className={`leave-radio-card ${checked ? 'active' : ''} ${className}`}
    >
      {/* Radio dot */}
      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
        checked ? 'border-primary bg-primary' : 'border-outline-variant bg-transparent'
      }`}>
        {checked && <div className="w-2 h-2 rounded-full bg-white m-auto mt-[2px]" />}
      </div>
      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug ${checked ? 'text-primary' : 'text-on-surface'}`}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">{description}</p>
        )}
      </div>
    </button>
  )
}
